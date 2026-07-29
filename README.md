# Adlane — Luxury Interior Showroom

A cinematic, minimal e-commerce platform for luxury interiors built with Next.js 16, React 19, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, GSAP, React Three Fiber and NextAuth.

## Features

- Cinematic homepage with parallax hero, scroll reveals, collections, products and testimonials
- Curated room collections with individual collection detail pages
- Shop with category filters, product variants, wishlist and cart
- Immersive 360°/3D showroom built with React Three Fiber (orbit controls, day/night mode, finish/wall customization, hotspots, save/share, PDF quote)
- Projects, gallery, about, contact and booking pages
- Cart, wishlist, checkout and account flows
- Admin dashboard with analytics, orders, customers, bookings, products, collections and more
- NextAuth credentials authentication with role-based admin middleware

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Demo Accounts

- Admin: `admin@adlane.com` / `admin123`
- Customer: `user@adlane.com` / `user123`

Admin routes (`/admin/*`) and `/account` are protected by NextAuth middleware.

## Environment Variables

Create a `.env.local` file. See `env.example` for the full template.

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=change-me-to-a-random-32-char-string
ADMIN_PASSWORD=admin123
USER_PASSWORD=user123

# Prisma + PostgreSQL
DATABASE_URL=postgresql://adlane:adlane_secret@localhost:5432/adlane
```

Optional integrations: Stripe (`STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLIC_KEY`) and Cloudinary (`NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`).

## Database Setup

Start PostgreSQL locally with Docker:

```bash
docker compose up -d
```

Push the Prisma schema and seed the demo data:

```bash
npx prisma generate
npx prisma migrate dev --name init
npm run db:seed
```

The app falls back to the local mock data set if `DATABASE_URL` is not configured, so admin pages still work without a database.

## Build

```bash
npm run build
```

## Tech Stack

- Next.js 16 App Router + Turbopack
- React 19 + TypeScript
- Tailwind CSS 4 + shadcn/ui
- Framer Motion + GSAP
- React Three Fiber / Three.js
- Zustand + React Query
- NextAuth 4
- Recharts (admin analytics)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
