# Tracy's Kitchen — Premium Food Ordering Website

A full-stack Next.js 15 (App Router) + Supabase food pre-ordering site, styled
in Tracy's Kitchen's black-and-gold brand. Customers browse the menu, build an
order, and submit it — the order is saved to Supabase **and** opens a
pre-filled WhatsApp message to the business. No online payment.

## Tech stack
Next.js 15, TypeScript, Tailwind CSS, Framer Motion, Supabase (Auth, Postgres,
Storage), React Hook Form + Zod, Lucide Icons, react-hot-toast, Google Maps
embed, WhatsApp deep link.

## Project structure
```
app/         routes (pages, layouts, admin, SEO metadata routes)
components/  UI components (+ components/admin for the dashboard)
lib/         Supabase client/server/middleware helpers
hooks/       useCart (client-side order builder)
services/    read-only Supabase data fetchers
actions/     Server Actions (place order, admin CRUD, image upload)
types/       shared TypeScript types
utils/       WhatsApp message builder, formatting helpers
```
No `/src` folder, per spec.

## 1. Set up Supabase
1. Create a project at supabase.com.
2. Open the SQL Editor and run `supabase-schema.sql` from this repo — it
   creates all four tables, enables Row Level Security with sensible public
   read / admin-only write policies, creates the `foods` storage bucket, and
   seeds the five starter categories.
3. Under **Authentication → Users**, manually create one admin user (email +
   password) — this is who logs into `/admin`. Sign-ups are not exposed on the
   site, so this is the only account with dashboard access.
4. Under **Project Settings → API**, copy your Project URL and anon public key.

## 2. Configure environment variables
Copy `.env.example` to `.env.local` and fill in:
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_WHATSAPP_NUMBER=13012567848
NEXT_PUBLIC_SITE_URL=https://your-site.netlify.app
```

## 3. Run locally
```
npm install
npm run dev
```
Visit http://localhost:3000. Add categories and menu items at
`/admin` (log in with the user you created in Supabase) before the homepage
and menu page will show real dishes — until then they render an empty state.

## 4. Deploy to Netlify
This project is pre-configured for Netlify (`netlify.toml` + the official
Next.js runtime plugin):
1. Push this project to a GitHub repo.
2. In Netlify, "Add new site → Import an existing project" and pick the repo.
3. Netlify auto-detects the build command (`npm run build`) and publish
   directory from `netlify.toml`.
4. Add the same environment variables from step 2 under **Site settings →
   Environment variables**.
5. Deploy. Netlify's Next.js plugin handles Server Components, Server
   Actions, and image optimization automatically.

(The brief originally referenced Vercel — Netlify works identically for this
codebase since it's a standard Next.js App Router project; only the
`netlify.toml` deploy config differs.)

## Notes on food photography
No image files were attached to the brief, so menu item photos are meant to
be uploaded per-dish from `/admin` (stored in the Supabase `foods` bucket).
The homepage hero and category tiles currently use placeholder stock photos
— swap `components/Hero.tsx` and `components/Categories.tsx` for your own
photography whenever you're ready, or upload Tracy's Kitchen's real photos as
menu item images from the dashboard.

## What's included vs. left for you
- ✅ Full customer flow: home, menu (search/filter/tabs), food detail,
  cart, checkout with pickup/delivery, Supabase order save + WhatsApp handoff.
- ✅ Admin dashboard: stats, menu CRUD with image upload, category CRUD,
  order list with search/filter/status updates, Supabase-authenticated.
- ✅ SEO: metadata, Open Graph/Twitter cards, `robots.txt`, `sitemap.xml`,
  LocalBusiness JSON-LD.
- ⚠️ Real food photography — add your own images via the admin dashboard.
- ⚠️ Email/SMS order confirmations — not in the original spec, so not built;
  ask if you'd like this added.
