export async function onRequestPost(context) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const body = await context.request.json();

    // Validate required fields
    if (!body.firstName || !body.email) {
      return new Response(JSON.stringify({ error: 'First name and email are required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Build GHL payload
    const ghlPayload = {
      firstName: body.firstName,
      lastName: body.lastName || '',
      email: body.email,
      phone: body.phone || '',
      locationId: context.env.GHL_LOCATION_ID,
      tags: body.tags || ['website-contact'],
      source: body.source || 'HelloViki Website',
    };

    if (body.customFields) {
      ghlPayload.customFields = body.customFields;
    }

    // Send GHL request and email notification in parallel
    const [ghlResponse, emailResult] = await Promise.allSettled([
      // 1. Create GHL contact
      fetch('https://services.leadconnectorhq.com/contacts/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${context.env.GHL_API_KEY}`,
          'Version': '2021-07-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ghlPayload),
      }),

      // 2. Send email notification
      sendLeadEmail(body),
    ]);

    const ghlOk = ghlResponse.status === 'fulfilled' && ghlResponse.value.ok;
    const emailOk = emailResult.status === 'fulfilled' && emailResult.value;

    // As long as at least one succeeded, report success
    if (ghlOk || emailOk) {
      return new Response(JSON.stringify({
        success: true,
        ghl: ghlOk,
        email: emailOk,
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } else {
      console.error('Both GHL and email failed');
      return new Response(JSON.stringify({ error: 'Failed to submit' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  } catch (err) {
    console.error('Server error:', err);
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

async function sendLeadEmail(lead) {
  const name = `${lead.firstName} ${lead.lastName || ''}`.trim();
  const phone = lead.phone || 'Not provided';
  const message = lead.message || 'No message';
  const service = lead.service || 'Not specified';
  const timestamp = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });

  const subject = `🔔 New Lead: ${name} — HelloViki.com`;
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #7C3AED, #EC4899); padding: 20px; border-radius: 12px 12px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 20px;">New Website Lead</h1>
        <p style="color: rgba(255,255,255,0.8); margin: 4px 0 0; font-size: 14px;">HelloViki.com Contact Form</p>
      </div>
      <div style="border: 1px solid #e5e7eb; border-top: none; padding: 24px; border-radius: 0 0 12px 12px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #6b7280; width: 120px;">Name</td><td style="padding: 8px 0; font-weight: 600;">${name}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;">Email</td><td style="padding: 8px 0;"><a href="mailto:${lead.email}">${lead.email}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;">Phone</td><td style="padding: 8px 0;"><a href="tel:${phone}">${phone}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;">Service</td><td style="padding: 8px 0;">${service}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280; vertical-align: top;">Message</td><td style="padding: 8px 0;">${message}</td></tr>
        </table>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;">
        <p style="color: #9ca3af; font-size: 12px; margin: 0;">Received ${timestamp} EST via helloviki.com</p>
      </div>
    </div>
  `;

  const textBody = `New Lead from HelloViki.com\n\nName: ${name}\nEmail: ${lead.email}\nPhone: ${phone}\nService: ${service}\nMessage: ${message}\n\nReceived: ${timestamp} EST`;

  try {
    const res = await fetch('https://api.mailchannels.net/tx/v1/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        personalizations: [
          {
            to: [
              { email: 'hi@helloviki.com', name: 'Hello Viki' },
              { email: 'hello@getmarketingbull.com', name: 'Marketing Bull' },
            ],
          },
        ],
        from: {
          email: 'noreply@helloviki.com',
          name: 'HelloViki.com',
        },
        reply_to: {
          email: lead.email,
          name: name,
        },
        subject: subject,
        content: [
          { type: 'text/plain', value: textBody },
          { type: 'text/html', value: htmlBody },
        ],
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('MailChannels error:', err);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Email send error:', err);
    return false;
  }
}

// Handle CORS preflight
export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
