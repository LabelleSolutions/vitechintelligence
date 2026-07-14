# ViTech Marketing OS

## Purpose

The Marketing OS is an internal, mobile-friendly workspace for coordinating ViTech's public communication across consulting, leadership, workforce, communication training, business software, EdTech and Halibut OS.

It prevents the public brand from appearing as a disconnected catalogue. Campaigns begin with one audience problem, introduce the most relevant ViTech capability, and finish with a measurable consultation, diagnostic or demonstration offer.

## Public solution architecture

1. Business & Leadership Intelligence
2. Communication & Workforce Capability
3. Business Software & Automation
4. Operational & Workforce Intelligence
5. Future Workforce & Education

## Weekly operating rhythm

- Monday: authority and founder insight
- Tuesday: education and practical frameworks
- Wednesday: product or workflow demonstration
- Thursday: proof, scenario or case narrative
- Friday: lead-generation offer
- Saturday: human story, English or communication content
- Sunday: community, K12 or future-workforce content

Use one weekly campaign theme. Do not rotate randomly between products.

## Current prototype capabilities

- English and Vietnamese interface
- Vietnam-first weekly content plan
- Social caption generator
- LinkedIn, Facebook and WhatsApp supported share flows
- Downloadable text drafts
- Browser-local lead capture
- Vietnam SEO keyword clusters
- Responsive browser interface

Direct publishing to LinkedIn, Meta or Zalo requires their official business APIs and approved application permissions. The current interface intentionally uses supported share links rather than pretending to publish directly.

## Route

Local development: `/marketing-os`

## Validation

```bash
npm install
npm run check
```

The repository's `check` command runs tests, type generation, TypeScript validation, a production build and a Cloudflare dry run.

## Cloudflare deployment

The project already uses React Router, Vite and Wrangler. Validate the authenticated Cloudflare account before deployment:

```bash
npx wrangler --version
npx wrangler whoami
npm run check
npm run deploy
```

Use a preview or staging environment before connecting a production route or custom domain.

## Production expansion

The next production phase should add:

- authenticated staff roles and approval workflow
- persistent lead and campaign database
- R2 media storage
- campaign attribution and UTM builder
- Search Console and analytics integration
- approved Zalo OA, Meta and LinkedIn API integrations
- AI generation through controlled ViTech prompt templates
- consent, privacy and audit records

Operational loop: **Plan → Create → Review → Publish → Capture → Follow up → Learn.**
