# Hawthorne East Village Milton — Lead Generation Site

Static lead-gen site for **Hawthorne East Village by Mattamy Homes** in Milton, Ontario. Independently marketed by authorized VIP real estate professionals.

**Canonical domain:** [hawthorneeastvillagemilton.com](https://hawthorneeastvillagemilton.com)

## Tech Stack

- [Astro](https://astro.build) (static output)
- Tailwind CSS v4
- Minimal client JS (forms, modals, exit-intent)
- Self-hosted fonts via Fontsource (Cormorant Garamond + Montserrat)

## Quick Start

```bash
npm install
cp .env.example .env
# Set SUPABASE_SERVICE_ROLE_KEY (same Supabase project as Enclave Site A)
npm run dev
```

Open `http://localhost:4321`

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `SUPABASE_URL` | Yes (production) | Supabase project URL (`https://cfzuypbljirmibmxpabi.supabase.co`) |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes (production) | Server-only service role key — copy from Enclave Site A Vercel env |
| `REGISTRATION_WEBHOOK_URL` | Optional | POST lead JSON to n8n / CRM after Supabase save |
| `PUBLIC_N8N_WEBHOOK_URL` | Optional | Legacy alias for webhook URL |

Example `.env`:

```
SUPABASE_URL=https://cfzuypbljirmibmxpabi.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
REGISTRATION_WEBHOOK_URL=https://your-n8n.example.com/webhook/hawthorne-leads
```

## Supabase table setup

Leads are stored in **`public.hawthorne_east_village`** (separate from Enclave's `enclave` table).

**Option A — SQL Editor:** paste and run `supabase/RUN_IN_DASHBOARD.sql` in [Supabase SQL Editor](https://supabase.com/dashboard/project/cfzuypbljirmibmxpabi/sql/new).

**Option B — CLI:**

```bash
# Add SUPABASE_DB_URL to .env (Database → Connection string URI)
npm run supabase:setup-table
```

## Lead Flow

Forms POST to `/api/register` (serverless on Vercel). The API:

1. Validates and saves the lead to Supabase `hawthorne_east_village`
2. Optionally forwards JSON to `REGISTRATION_WEBHOOK_URL` (n8n → Follow Up Boss → Twilio)

Payload fields: `firstName`, `lastName`, `email`, `phone`, `interest`, `budget`, `timeline`, `source`, `page_path`, `form_type`, `timestamp`, UTM params.

On success, the browser redirects to `/thank-you/` and fires `generate_lead` (when GA4 is enabled).

## Build & Deploy

```bash
npm run build    # generates images + static dist/
npm run preview  # serve dist/
```

Deploy `dist/` to **Vercel** (recommended). The `/api/register` serverless function deploys automatically alongside the static site.

For local API testing: `npx vercel dev` (plain `npm run dev` serves pages only).

## Secondary Domain 301 Redirects

Consolidate SEO equity on `hawthorneeastvillagemilton.com`:

| Secondary domain | Action |
|------------------|--------|
| `hawthorneeastvillage.com` | 301 → canonical |
| `hawthroneeast-village.com` | 301 → canonical |

### Vercel

`vercel.json` includes host-based 301 rules. Add all domains in the Vercel project settings.

### Netlify

In **Domain management**, set each secondary domain to redirect to the primary site. See comments in `public/_redirects`.

### Cloudflare

Create Page Rules or Redirect Rules: `*hawthorneeastvillage.com/*` → `https://hawthorneeastvillagemilton.com/$1` (301).

## Routes

| Path | Purpose |
|------|---------|
| `/` | Master landing + hero form |
| `/floor-plans/` | Sizes, gallery, gated floor plan download |
| `/prices/` | Price table, deposits, incentives |
| `/townhomes/` | Village & rear lane detail |
| `/detached/` | Detached home detail |
| `/location/` | Milton location & investment story |
| `/faq/` | Full FAQ (AEO) |
| `/register/` | VIP registration (lead scoring fields) |
| `/thank-you/` | Confirmation + conversion event |

## Analytics Placeholders

Edit `src/components/AnalyticsPlaceholder.astro`:

- Google Analytics 4 (`G-XXXXXXXXXX`)
- Google Tag Manager
- Meta Pixel

`/thank-you/` fires `generate_lead` via `gtag` and `fbq` when configured.

## Images

Placeholder hero/OG images are generated at build time (`npm run prebuild`). Replace files in `public/images/` with professional Mattamy/community photography before launch.

## Compliance

Every page includes RECO/TRESA footer disclaimer. This is **not** the official builder website.

## License

Private — Hawthorne East Village VIP Sales
