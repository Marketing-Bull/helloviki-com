# Hello Viki .AI

**Remote Assistants Powered by AI** — AI-powered assistants for healthcare and law professionals.

## Stack
- Static HTML/CSS/JS + Tailwind CSS (CDN)
- Cloudflare Pages (helloviki.com + helloviki.ai)
- GHL for lead capture + career applications
- GTM (GTM-PWWLC2S6) + GA4 (G-BHYMZ3NJHF) + Meta Pixel (3523277067895188)

## Pages
- `/` — Homepage
- `/doctors/` — For Doctors
- `/lawyers/` — For Lawyers
- `/personal-injury/` — PI Law Firm landing page
- `/contact/` — Contact form (→ GHL) + Calendly
- `/careers/` — Overview + open roles
- `/careers/medical-virtual-assistant/` — Job posting
- `/careers/legal-virtual-assistant/` — Job posting
- `/careers/dental-virtual-assistant/` — Job posting
- `/careers/ghl-automation-specialist/` — Job posting
- `/careers/ai-developer/` — Job posting
- `/careers/thank-you/` — Post-application conversion page
- `/privacy-policy/`
- `/terms-of-service/`
- `/accessibility/`

## Brand
- **Primary:** #7C3AED (purple)
- **Accent:** #EC4899 (pink), #06B6D4 (cyan)
- **Fonts:** Plus Jakarta Sans, Inter, JetBrains Mono

## Deploy
```bash
CLOUDFLARE_API_TOKEN="<token>" NODE_OPTIONS="--dns-result-order=ipv4first" npx wrangler pages deploy . --project-name helloviki-com --branch main --commit-dirty=true
```

## Completed ✅
- [x] Full static site rebuild (15+ pages)
- [x] GHL contact form (serverless proxy, tag: `website-contact`)
- [x] GHL career application forms (embedded iframe)
- [x] Careers thank-you page with GA4 + Meta conversion tracking
- [x] GTM + GA4 + Meta Pixel across all pages
- [x] Analytics wrapper (`js/analytics.js`) — auto-tracks clicks, forms, outbound links
- [x] Social links in footer (Facebook, Instagram, LinkedIn)
- [x] "A Marketing Bull Company" footer badge with UTM
- [x] PI landing page (1,700+ words, SEO-optimized)
- [x] GHL workflow: `website-contact` tag → email notification
- [x] 3-email nurture sequence (medical + legal versions)
- [x] DNS cleanup (removed 7 stale records)
- [x] Career pages: form moved below job description, Apply Now anchor in sidebar

## Future Tasks 🔮
- [ ] **SEO/Schema Audit** — Full technical SEO pass: unique titles/descriptions, Organization + Service + LocalBusiness + BreadcrumbList + FAQPage JSON-LD schemas, heading hierarchy audit
- [ ] **LLM Optimization (AEO)** — Semantic HTML cleanup, speakable schema, answer-engine-optimized meta tags, structured Q&A content
- [ ] **GTM/GA4/Meta Pixel QA** — Validate all tags firing in live environment, test conversion events end-to-end via Tag Assistant + GA4 Realtime + Meta Events Manager
- [ ] **A2P 10DLC Disclaimers** — SMS consent language for privacy policy, terms of service, and GHL forms (Max has been tasked)
- [ ] **GHL Career Form Redirect** — Set GHL form `zL9S8H0zdeptM4JGyqEj` redirect URL to `https://helloviki.com/careers/thank-you/`
- [ ] **Canonical URLs** — Decide primary domain (helloviki.ai vs helloviki.com), update all canonicals + OG URLs to match
- [ ] **Google Search Console** — Verify helloviki.ai, submit sitemap
- [ ] **Internal Linking Strategy** — Cross-link PI page from doctors/lawyers pages, add contextual links throughout content
- [ ] **Contact Form → GHL Form Swap** — Alex may replace custom contact form with embedded GHL form (like careers)
- [ ] **Logo** — Replace CSS text logo with actual logo files when available
- [ ] **Cancel Cloudways** — Old WordPress hosting no longer needed
