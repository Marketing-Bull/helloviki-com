export async function onRequestPost(context) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const body = await context.request.json();

    if (!body.firstName || !body.email) {
      return new Response(JSON.stringify({ error: 'First name and email are required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const ghlPayload = {
      firstName: body.firstName,
      lastName: body.lastName || '',
      email: body.email,
      phone: body.phone || '',
      locationId: context.env.GHL_LOCATION_ID,
      tags: body.tags || ['website-contact'],
      source: body.source || 'HelloViki Website',
      customFields: [],
    };

    // Pass message and service as custom field notes
    if (body.message) {
      ghlPayload.notes = [`Service: ${body.service || 'Not specified'}\nMessage: ${body.message}`];
    }

    const response = await fetch('https://services.leadconnectorhq.com/contacts/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${context.env.GHL_API_KEY}`,
        'Version': '2021-07-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ghlPayload),
    });

    if (response.ok) {
      const data = await response.json();
      return new Response(JSON.stringify({ success: true, contactId: data.contact?.id }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } else {
      const errText = await response.text();
      console.error('GHL error:', errText);
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

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
