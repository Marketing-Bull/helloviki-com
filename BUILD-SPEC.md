# HelloViki.com Build Specification

## Overview
Build a complete static website for **Hello Viki .AI** — a remote staffing company that provides AI-powered assistants to healthcare and law professionals.

**Brand:** "Hello Viki .AI" — Remote Assistants Powered by AI
**Tagline:** "We don't replace your staff with AI. We give your remote staff AI superpowers."
**Stack:** Static HTML/CSS/JS with Tailwind CSS (CDN), deployable to Cloudflare Pages

## Brand Guide
See `brand-guide-reference.html` for the complete brand system including:
- Colors: Purple core #7C3AED, pink accent #EC4899, cyan accent #06B6D4
- Fonts: Plus Jakarta Sans (display), Inter (body), JetBrains Mono (code)
- Components: Buttons, cards, badges, forms — all with Tailwind classes
- Logo: "Hello Viki" wordmark + gradient ".AI" pill badge (text-based, no image file)
- Page section templates: Hero, features grid, testimonials, CTA banner, pricing

**IMPORTANT:** Follow the brand guide exactly for colors, fonts, spacing, border radius, and component styles. Use the exact Tailwind config from the guide.

## Site Map (11 pages)

### 1. Homepage (`/index.html`)
- Hero section with tagline "Remote Assistants Powered by AI"
- Subhead: "HIPAA-trained professionals equipped with AI tools — so one assistant does the work of three."
- Trust badges: Free Trial, HIPAA Compliant, 24-hour Onboarding, US-Based Management
- "How It Works" 3-step process (Discovery Call → Screening & Onboarding → Breathe a sigh of relief)
- Services overview cards (Administrative, Prior Auth, Patient Communication, Billing, Medical Scribe, Project Management)
- "Who We Serve" section linking to /doctors/ and /lawyers/
- Testimonials carousel/grid (use these real testimonials):
  - Bryant M. — "Hiring an Assistant from HelloViki has been one of my best decisions so far. I now have more time to spend with my children while I'm assured that my inbox is being taken care of."
  - Abby H. — "HelloViki is one of the best investments I have ever made. I've been very pleased with the results have spent a great deal of time working on the big picture while my assistant takes care of the details."
  - Jason M. — "Working with HelloViki has given our small and rapidly growing business the ability to move faster while simultaneously freeing up many hours a week. As a result, we can now focus on our strategy."
  - Cameron P. — "From the very first interaction with my account manager, it became clear that HelloViki has a large staff of professionals that can handle every need a small business has."
  - Amy M. — "I cannot recommend HelloViki more highly. Once you have their support for a few tasks, you will wonder how you got along without them."
  - Daniel L. — "I am truly satisfied with the VA experience from HelloViki. I can now focus my energy on more strategic business thinking while the details are being managed by my VA's."
- CTA banner: "Ready to Transform Your Practice?" → Book a Call
- Footer with company info, nav links, contact

### 2. For Doctors (`/doctors/index.html`)
- Hero: "AI-Powered Assistants for Medical Practices"
- Pain points: missed calls, prior auth delays, billing backlogs, overwhelmed staff
- Services specific to medical: Patient Communication, Prior Authorizations, Medical Scribe, Billing & Collections, EMR/EHR Integration
- EMR/EHR compatibility section (mention they work with any system)
- HIPAA compliance section
- Medical-specific testimonials
- CTA: Book a Call

### 3. For Lawyers (`/lawyers/index.html`)
- Hero: "AI-Powered Assistants for Law Firms"
- Pain points: missed intake calls, slow follow-up, case management overhead
- Services specific to legal: Intake Management, Case Management Support, Client Communication, Document Preparation, Calendar & Scheduling
- Mention compatibility with legal software (Clio, MyCase, etc.)
- CTA: Book a Call

### 4. Contact (`/contact/index.html`)
- Calendly embed: https://calendly.com/alexbaben/30min
- Company info: Hello Viki AI, 319 Clematis St, Suite 300, West Palm Beach, FL 33401
- Phone: (866) 798-8872
- Email: hello@helloviki.ai
- Simple contact form (name, email, phone, message) that submits to GHL API

### 5. Careers Overview (`/careers/index.html`)
- Hero: "Join Hello Viki AI — Work with Cutting-Edge AI Tools"
- Why work here: AI-assisted workflows, remote flexibility, growth opportunities, US-based management
- Grid of open positions (cards linking to individual job pages)
- Each card shows: title, location (Remote), type (Full-time)

### 6-10. Individual Job Pages
Each job page has: title, description, requirements, benefits, application form, and **JobPosting JSON-LD schema**.

#### `/careers/medical-virtual-assistant/index.html`
- Title: Bilingual Medical Virtual Assistant
- Type: Full-time, Remote
- Requirements: EMR/EHR experience, HIPAA knowledge, bilingual English/Spanish preferred, prior auth experience
- Benefits: AI tools provided, US-based management, flexible hours, training included

#### `/careers/legal-virtual-assistant/index.html`
- Title: Legal Virtual Assistant
- Type: Full-time, Remote
- Requirements: Legal intake experience, case management software (Clio, MyCase), client communication, English fluency
- Benefits: Same as above

#### `/careers/dental-virtual-assistant/index.html`
- Title: Dental Virtual Assistant
- Type: Full-time, Remote
- Requirements: Dental office admin experience, insurance verification, patient scheduling
- Benefits: Same as above

#### `/careers/ghl-automation-specialist/index.html`
- Title: Expert GHL Automation Specialist (Legal/Medical)
- Type: Full-time or Contract, Remote
- Requirements: GoHighLevel power user, workflow automation, experience in legal or medical vertical, API integrations
- Benefits: Work on cutting-edge AI + automation projects

#### `/careers/ai-developer/index.html`
- Title: AI/ML Developer (Node.js / Python)
- Type: Full-time or Contract, Remote
- Requirements: Python + Node.js, RAG pipelines, LLM integration, API development, experience with OpenAI/Anthropic/etc.
- Benefits: Build AI products, flexible schedule, competitive pay

### 11. Privacy Policy (`/privacy-policy/index.html`)
- Standard privacy policy for a staffing/services company
- HIPAA-aware language
- Data collection, usage, cookies, third-party services

### 12. Terms of Service (`/terms-of-service/index.html`)
- Standard terms for a staffing/services company

## Technical Requirements

### File Structure
```
/
├── index.html (homepage)
├── doctors/index.html
├── lawyers/index.html
├── contact/index.html
├── careers/
│   ├── index.html (overview)
│   ├── medical-virtual-assistant/index.html
│   ├── legal-virtual-assistant/index.html
│   ├── dental-virtual-assistant/index.html
│   ├── ghl-automation-specialist/index.html
│   └── ai-developer/index.html
├── privacy-policy/index.html
├── terms-of-service/index.html
├── css/
│   └── custom.css (any non-Tailwind styles)
├── js/
│   └── main.js (form handling, mobile menu, etc.)
└── assets/
    └── (any static assets)
```

### Shared Components
- **Header/Nav:** Logo (text-based "Hello Viki .AI"), links to Home, For Doctors, For Lawyers, Careers, Contact. Mobile hamburger menu. Sticky on scroll.
- **Footer:** Logo, nav links, contact info, social links (placeholder), copyright, links to Privacy Policy & Terms
- **CTA Banner:** Reusable gradient banner with "Book a Call" button

### Forms
All forms submit to GHL API via JavaScript fetch:

**Contact form fields:** First Name, Last Name, Email, Phone, Message
**Career application fields:** First Name, Last Name, Email, Phone, Position (auto-filled from page), Resume Link (URL), Cover Message

**GHL API endpoint:** `https://services.leadconnectorhq.com/contacts/`
**Method:** POST
**Headers:**
```
Authorization: Bearer pit-f59ec7e9-42d4-44c3-b12d-dcdd199861e0
Version: 2021-07-28
Content-Type: application/json
```
**Body for contact form:**
```json
{
  "firstName": "...",
  "lastName": "...",
  "email": "...",
  "phone": "...",
  "locationId": "eKD6Wc81KqpIDGuym6kh",
  "tags": ["website-contact"],
  "source": "HelloViki Website"
}
```
**Body for career applications:**
```json
{
  "firstName": "...",
  "lastName": "...",
  "email": "...",
  "phone": "...",
  "locationId": "eKD6Wc81KqpIDGuym6kh",
  "tags": ["applicant", "applicant-{role-slug}"],
  "source": "HelloViki Careers",
  "customFields": [
    {"key": "resume_link", "value": "..."},
    {"key": "cover_message", "value": "..."},
    {"key": "position_applied", "value": "..."}
  ]
}
```

On successful submission, show a success message inline (no page redirect).
On error, show a user-friendly error message.

### JobPosting Schema (JSON-LD)
Every job page must include JobPosting structured data in a `<script type="application/ld+json">` tag:

```json
{
  "@context": "https://schema.org/",
  "@type": "JobPosting",
  "title": "Job Title",
  "description": "Full HTML job description",
  "datePosted": "2026-03-05",
  "validThrough": "2026-09-05",
  "employmentType": "FULL_TIME",
  "jobLocationType": "TELECOMMUTE",
  "applicantLocationRequirements": {
    "@type": "Country",
    "name": "Worldwide"
  },
  "hiringOrganization": {
    "@type": "Organization",
    "name": "Hello Viki AI",
    "sameAs": "https://helloviki.com",
    "logo": "https://helloviki.com/assets/logo.png"
  },
  "baseSalary": {
    "@type": "MonetaryAmount",
    "currency": "USD",
    "value": {
      "@type": "QuantitativeValue",
      "value": "Competitive",
      "unitText": "MONTH"
    }
  }
}
```

### SEO
- Unique `<title>` and `<meta name="description">` for every page
- Open Graph tags (og:title, og:description, og:image, og:url)
- Canonical URLs
- Sitemap.xml
- robots.txt

### Performance
- Tailwind via CDN (no build step)
- Lazy load images
- Minimal custom JS
- No jQuery or heavy frameworks

### Responsive
- Mobile-first
- Breakpoints: sm (640), md (768), lg (1024), xl (1280)
- Mobile hamburger menu
- Stack layouts on small screens

### Accessibility
- WCAG AA contrast (verified in brand guide)
- Semantic HTML (nav, main, section, article, footer)
- Alt text on images
- Focus states on interactive elements
- Skip to content link

## Company Contact Info
- **Name:** Hello Viki AI
- **Address:** 319 Clematis St, Suite 300, West Palm Beach, FL 33401
- **Phone:** (866) 798-8872
- **Email:** hello@helloviki.ai
- **Website:** helloviki.com

## What NOT to include
- No blog
- No pricing page (yet)
- No individual candidate profiles
- No WordPress, no CMS
- No complex animations or heavy JS
