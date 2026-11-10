# SKINORA

A responsive skincare e-commerce storefront built with **Next.js (App Router, JavaScript)** and **Tailwind CSS**.

## Features

- Home page with hero, deals and sets, featured products and shop-by-ritual categories
- Shop page with category filter and price sorting (saved in the URL)
- Product pages with photo, price, benefits, ingredients and customer reviews
- Deal pages for product sets (`/deals/hydration-duo`, `/deals/glow-trio`) with add to bag and wishlist
- Shopping bag with item selection and quantity, and a checkout form with validation
- Wishlist, skin finder quiz with personalised results, account page and a demo admin dashboard
- Bag, wishlist, profile, orders and reviews are saved in the browser (localStorage)
- SEO: page metadata, Open Graph and Twitter preview image, favicon, sitemap and robots

> This is a demo storefront. There is no real payment or backend: orders and admin data are for demonstration only.

## Tech stack

- Next.js 15 (App Router) and React 19
- Tailwind CSS 3
- lucide-react icons
- next/font (local Cormorant Garamond and Inter)

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000

Production build:

```bash
npm run build
npm start
```

## Environment variables

Copy `.env.example` to `.env.local` and set your live URL (used for SEO, sitemap and the social preview):

```
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
```

## Images

All images go in `public/images` with these exact names:

- Products: `serum-hydrating.jpg`, `serum-vitamin-c.jpg`, `cream-barrier.jpg`, `cleanser-gel.jpg`, `sunscreen-spf50.jpg`, `night-oil.jpg`, `eye-cream.jpg`, `clay-mask.jpg`, `rose-mist.jpg`, `toner-radiance.jpg`, `body-lotion.jpg`, `lip-treatment.jpg`, `serum-peptide.jpg`, `gel-centella.jpg`, `cleansing-balm.jpg`, `sun-fluid.jpg`, `cream-renewal.jpg`, `mask-sleeping.jpg`, `body-oil.jpg`, `serum-pore.jpg`
- Sets: `bundle-hydration-duo.jpg`, `bundle-glow-trio.jpg`
- Other: `hero-main.jpg`, `og-image.jpg` (social preview), `logo-mark.png` (logo and favicon)

## Project structure

```
src/
├─ app/          pages, layout, global styles, sitemap, robots, social preview
├─ components/   reusable UI (Header, Footer, ProductCard, BundleCard, DealView ...)
├─ context/      StoreContext (bag, wishlist, profile, orders)
├─ data/         products.js, site.js (all content in one place)
└─ lib/          helpers (prices, validation, social image)
```

## Deploy

1. Push the project to GitHub.
2. Import the repository on [Vercel](https://vercel.com) (**Add New → Project**).
3. Add the `NEXT_PUBLIC_SITE_URL` environment variable.
4. Click **Deploy**. Every push to `main` redeploys automatically.