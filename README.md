# C3 Community — Code • Compete • Conquer

A premium, professional 3D web platform built for college tech communities, hackathons, competitions, workshops, events, and student achievements.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/TailwindCSS-4-38BDF8?style=for-the-badge&logo=tailwindcss)
![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?style=for-the-badge&logo=prisma)
![Three.js](https://img.shields.io/badge/Three.js-R3F-black?style=for-the-badge&logo=three.js)

---

## ✨ Features

### 🌐 Public Pages
- **Home** — Stunning 3D particle hero, animated statistics, upcoming events, leaderboard preview
- **About** — Team showcase, mission, vision, timeline
- **Events** — Browse, search, and register for events (workshops, hackathons, seminars, quizzes)
- **Competitions** — Active/past competitions with registration and submission tracking
- **Leaderboard** — 3D podium for top 3, searchable ranked list with trend indicators
- **Achievements** — Grid of badges (unlocked/locked) with 3D badge display
- **Prizes** — Prize catalog, reward tiers, and redemption system
- **Team** — Faculty & student organizers displayed by department/role
- **Gallery** — Filterable photo gallery with lightbox viewer
- **Notices** — Priority-colored announcements with urgency levels
- **Results** — Filterable event and competition results
- **Contact** — Form submissions with validation

### 🔐 Auth & Security
- NextAuth v5 with credential-based login
- Role-based access control (Participant, Moderator, Organizer, Faculty, Admin, Super Admin)
- Protected dashboard and admin routes via middleware
- Password hashing with bcryptjs
- Security headers (X-Frame-Options, CSP, etc.)

### 📊 Dashboard (User)
- Profile management with avatar
- Personal certificate repository with QR verification
- Achievement progress tracking
- Event registration history

### 🛡️ Admin Portal
- Full CRUD for all models (events, competitions, users, teams, notices, gallery, certificates, etc.)
- Analytics charts (Recharts) — registration trends, event type distribution
- Leaderboard and score management
- Certificate and prize generation

### 🎮 3D Components
- Interactive particle network hero (GPU-tier adaptive)
- 3D leaderboard podium with metallic materials
- Floating geometric wireframe shapes
- Achievement badges with spin animation
- Ambient particle field backgrounds
- Performance-optimized with device capability detection

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router, Turbopack) |
| UI | React 19, TypeScript 5 |
| Styling | Tailwind CSS v4 (custom `@theme` tokens) |
| 3D | Three.js, @react-three/fiber, @react-three/drei |
| Animation | Framer Motion (motion/react) |
| Database | PostgreSQL via Prisma ORM 6 |
| Auth | NextAuth v5 (next-auth@beta) |
| Charts | Recharts |
| Validation | Zod |
| Icons | Lucide React |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- PostgreSQL database (or [Neon](https://neon.tech/) / [Supabase](https://supabase.com/))
- npm 10+

### 1. Clone & Install

```bash
git clone https://github.com/<your-username>/c3-community.git
cd c3-community
npm install
```

### 2. Environment Setup

Copy the template and fill in your values:

```bash
cp .env.example .env
```

Required variables:
```env
DATABASE_URL="postgresql://user:password@host:5432/c3community"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Database Setup

```bash
# Push schema to database
npx prisma db push

# Generate Prisma client
npx prisma generate

# Seed demo data (optional)
npx prisma db seed
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 📁 Project Structure

```
c3-community/
├── app/                    # Next.js App Router pages
│   ├── (auth)/             # Login, Register, Forgot Password
│   ├── admin/              # Admin portal (protected)
│   ├── dashboard/          # User dashboard (protected)
│   ├── api/                # API routes (REST endpoints)
│   └── [public pages]      # Home, About, Events, etc.
├── components/
│   ├── 3d/                 # Three.js/R3F components
│   ├── features/           # Feature-specific components
│   ├── layout/             # Navbar, Footer, Sidebar
│   └── ui/                 # Reusable UI primitives
├── hooks/                  # Custom React hooks
├── lib/                    # Utilities, auth, Prisma, validations
├── prisma/
│   ├── schema.prisma       # Database schema (20+ models)
│   └── seed.ts             # Demo data seeder
├── public/                 # Static assets
└── middleware.ts            # Route protection & security headers
```

---

## 🌍 Deploy to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: C3 Community Platform"
git remote add origin https://github.com/<your-username>/c3-community.git
git push -u origin main
```

### 2. Connect to Vercel

1. Go to [vercel.com](https://vercel.com) → **New Project**
2. Import your GitHub repository
3. Set **Framework Preset** to **Next.js**
4. Add environment variables:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | Your PostgreSQL connection string |
| `NEXTAUTH_SECRET` | `openssl rand -base64 32` |
| `NEXTAUTH_URL` | `https://your-domain.vercel.app` |
| `NEXT_PUBLIC_APP_URL` | `https://your-domain.vercel.app` |

5. Click **Deploy** ✅

### 3. Post-Deploy

After initial deployment, run the database migration:

```bash
npx prisma db push
npx prisma db seed
```

---

## 🔑 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | ✅ | PostgreSQL connection string |
| `NEXTAUTH_SECRET` | ✅ | Random secret for JWT signing |
| `NEXTAUTH_URL` | ✅ | Full URL of your deployment |
| `NEXT_PUBLIC_APP_URL` | ⬜ | Public URL (defaults to localhost) |

---

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| `navy-950` | `#0a0e1a` | Primary background |
| `navy-900` | `#0f1629` | Card/surface background |
| `electric` | `#3b82f6` | Primary accent (blue) |
| `violet` | `#8b5cf6` | Secondary accent (purple) |
| `cyan` | `#06b6d4` | Tertiary accent |
| `neon-green` | `#22d3ee` | Highlights |

Typography: **Inter** (body), **JetBrains Mono** (code)

---

## 📜 Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:push` | Push Prisma schema to DB |
| `npm run db:seed` | Seed database with demo data |
| `npm run db:studio` | Open Prisma Studio |

---

## 🧑‍💻 Default Seed Credentials

| Role | Email | Password |
|------|-------|----------|
| Super Admin | `admin@c3community.com` | `Admin@123456` |
| Faculty | `faculty@c3community.com` | `Admin@123456` |
| Participant | `alice@example.com` | `Admin@123456` |

---

## 📄 License

MIT License © 2026 C3 Community

---

Built with ❤️ by the C3 Community Team
