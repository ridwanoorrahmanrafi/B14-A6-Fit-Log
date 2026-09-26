# 🏋️ FitLog — Train With Intent. Log Every Set.

FitLog is a dark, high-performance gym companion web application built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, and **DaisyUI**. It empowers fitness enthusiasts to explore curated lifts, schedule a targeted 5-lift daily plan, calculate live training metrics (exercises, minutes, calories burned), track completed exercises, and save workouts for future sessions.

---

## 🚀 Live Demo & Repository
- **Live Demo Link:** [https://fitlog-app.vercel.app](https://fitlog-app.vercel.app) *(Replace with your deployed URL)*
- **GitHub Repository:** [https://github.com/your-username/fitlog](https://github.com/your-username/fitlog) *(Replace with your repo URL)*

---

## 🛠️ Technologies Used
- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict mode, full type-safety)
- **Styling:** [Tailwind CSS 3](https://tailwindcss.com/) & [DaisyUI 4](https://daisyui.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Typography:** Google Fonts ([Oswald](https://fonts.google.com/specimen/Oswald) for uppercase gym display headings, [Inter](https://fonts.google.com/specimen/Inter) for clean body text)
- **State & Storage:** React Context API + LocalStorage persistence (SSR hydration-safe)
- **Data Source:** [FitLog Worker API](https://api.abcz.workers.dev/api/fitlog) with automated resilient fallback

---

## ✨ 5 Key Features

### 1. ⚡ Dynamic Workout Library with Multi-Criteria Sorting & Live Search
- Displays 12 major lifts covering every muscle group in an ultra-responsive 3x4 grid on desktop, scaling smoothly to mobile and tablet.
- **Challenge C1 Implemented:** Custom **"Sort By"** dropdown allowing instant client-side sorting by **Duration** (fastest to longest), **Calories** (highest burn first), or **Rating** (top-rated first).
- Instant live search by workout title, targeted muscle group, or required equipment with one-click category filtering pills (Chest, Arms, Legs, Core, etc.).

### 2. 📋 Daily 5-Lift Routine System & Live Metrics Dashboard
- Enforces a practical **cap of 5 lifts per day** to maximize workout intensity and prevent overtraining.
- **Live Metrics Summary Row:** Dynamically calculates:
  - **Exercises Count:** Shows scheduled lifts vs. the 5-lift cap.
  - **Total Minutes:** Live summation of estimated workout duration.
  - **Total Calories Burned:** Live summation of projected energy expenditure.
- Values start at 0 and update immediately in real-time as lifts are added or removed.

### 3. ✅ Interactive Plan Log with "Mark as Done" & Fast Removal (Challenge C3)
- Dedicated `/my-plan` page with smooth tab switching between **Today's Plan** and **Saved Workouts**.
- **Mark as Done:** Click the check button to mark any workout completed, updating its visual state with a completion badge, subtle green border, and strike-through text, paired with an interactive toast notification.
- **One-Click Removal (X):** Cleanly remove workouts from either the daily plan or saved list with instant toast feedback.
- Contextual empty states with direct CTA back to the workout library when no exercises are scheduled.

### 4. 🧭 Deep Workout Inspection & Dual Action Workflow
- Individual workout dynamic detail pages (`/workout/[id]`) with a clean two-column layout:
  - **Left Column:** High-resolution exercise visual media with category tag pills and floating stat badges.
  - **Right Column:** Full exercise description, structured **Key Specs Panel** (Equipment, Difficulty, Sets, Reps, Duration, Calories, Rating), and a numbered 4-step instruction sequence.
- **Dual CTAs:**
  - *"Add to today's plan"*: Automatically registers the workout to Today's Plan, enforces the 5-lift cap, increments the navbar badge, and alerts the user via animated toasts.
  - *"Save for later"*: Archives the exercise in the Saved tab for future training planning.

### 5. 🏷️ Real-Time Navbar Badges & Safe LocalStorage Persistence
- Sticky header featuring an active-route navigation indicator and real-time status badges:
  - **Plan Badge:** Filled pill with accent volt/lime styling (`#ccff00`) displaying live count of today's lifts.
  - **Saved Badge:** Sleek outlined pill displaying total saved lifts.
- Both badges link directly to `/my-plan`.
- **LocalStorage Sync:** All scheduled exercises, saved routines, and completion states survive browser reloads and tab closures without hydration mismatches.

---

## 🏛️ Architecture: Server vs. Client Component Separation

Following strict Next.js App Router best practices, client-side interactivity (`"use client"`) is isolated to interactive leaves while pages and layouts remain Server Components for maximum speed, SEO, and lightweight bundle delivery:

| Component / File | Type | Purpose |
|---|---|---|
| `app/layout.tsx` | **Server Component** | Global layout, Google Fonts (Oswald & Inter), PlanProvider wrapper, footer |
| `app/page.tsx` | **Server Component** | Prerenders Hero Section & fetches all workout data from API |
| `app/workout/[id]/page.tsx` | **Server Component** | Prerenders workout details, specs table, and instructions via `generateStaticParams` |
| `app/my-plan/page.tsx` | **Server Component** | Page skeleton for plan header and subtitle |
| `components/layout/Navbar.tsx` | **Server Component** | Brand logo and layout container |
| `components/layout/NavbarNavLinks.tsx` | **Client Component** | Active route tracking (`usePathname()`) |
| `components/layout/NavbarBadges.tsx` | **Client Component** | Live badge count subscribers |
| `components/home/HeroCtaButton.tsx` | **Client Component** | Smooth scroll anchor handler to `#library` |
| `components/home/LibraryGrid.tsx` | **Client Component** | Real-time sorting, search filtering, and responsive grid |
| `components/workout/WorkoutActionButtons.tsx` | **Client Component** | Plan / Saved trigger buttons with toast hooks |
| `components/plan/PlanMetricsSummary.tsx` | **Client Component** | Live reactive calculations for exercises, minutes, and calories |
| `components/plan/PlanTabsAndList.tsx` | **Client Component** | Tab switching, search filtering, and list rendering |
| `components/plan/PlanItemCard.tsx` | **Client Component** | Mark as Done, Remove (X), and status toggle actions |
| `components/ui/ToastContainer.tsx` | **Client Component** | Fixed floating toast alerts container |

---

## 📂 Project Directory Structure

```text
fitlog/
├── app/
│   ├── layout.tsx             # Root layout with fonts, provider, navbar, footer
│   ├── page.tsx               # Home page (Server Component)
│   ├── loading.tsx            # Animated dumbbell & card skeleton loader
│   ├── not-found.tsx          # Custom dark-themed 404 page
│   ├── error.tsx              # Error boundary with retry action
│   ├── globals.css            # Tailwind directives & dark gym styles
│   ├── workout/
│   │   └── [id]/
│   │       └── page.tsx       # Dynamic Workout Detail page (Server Component)
│   └── my-plan/
│       └── page.tsx           # My Plan page (Server Component)
├── components/
│   ├── home/
│   │   ├── HeroSection.tsx    # Server component: Hero title, banner, subtitle
│   │   ├── HeroCtaButton.tsx  # Client component: Smooth scroll to #library
│   │   ├── LibrarySection.tsx # Server component: Section container
│   │   └── LibraryGrid.tsx    # Client component: Sort dropdown & search filter
│   ├── layout/
│   │   ├── Navbar.tsx         # Server component: Navbar layout
│   │   ├── NavbarNavLinks.tsx # Client component: Active route link highlights
│   │   ├── NavbarBadges.tsx   # Client component: Live Plan & Saved counters
│   │   └── Footer.tsx         # Server component: Dark branded footer
│   ├── plan/
│   │   ├── PlanMetricsSummary.tsx # Client component: Live metrics row
│   │   ├── PlanTabsAndList.tsx    # Client component: Plan vs Saved tabs
│   │   └── PlanItemCard.tsx       # Client component: Mark Done & Remove actions
│   ├── ui/
│   │   └── ToastContainer.tsx # Client component: Animated toast alerts
│   └── workout/
│       ├── WorkoutCard.tsx    # Responsive workout card for grid
│       └── WorkoutActionButtons.tsx # Client component: Add to plan / Save buttons
├── context/
│   └── PlanContext.tsx        # Global state with LocalStorage sync & toast system
├── lib/
│   └── api.ts                 # API fetch routines with fallback data resilience
├── public/
│   ├── banner.png             # Hero section banner visual
│   └── logo.png               # FitLog brand icon
├── types/
│   └── workout.ts             # TypeScript definitions for Workout & Sort options
├── next.config.ts             # Next.js config with remote image patterns
├── tailwind.config.ts         # Tailwind config extended with DaisyUI & custom tokens
├── postcss.config.mjs         # PostCSS config
├── tsconfig.json              # TypeScript compiler configuration
└── package.json               # Dependencies & build scripts
```

---

## 🏃 Local Development & Installation

1. **Clone or Extract the Project:**
   ```bash
   cd fitlog
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Run the Development Server:**
   ```bash
   npm run dev
   ```

4. **Open in Browser:**
   Visit [http://localhost:3000](http://localhost:3000).

5. **Build for Production:**
   ```bash
   npm run build
   npm run start
   ```

---

## 🌐 Deployment Guidelines

This project is fully optimized for **Vercel**, **Netlify**, or **Cloudflare Pages**:
- **Framework Preset:** Next.js
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- All static pages and dynamic routes (`/workout/[id]`) are prerendered and statically optimized, guaranteeing high performance and zero reload 404 errors.

---

© 2026 FitLog — Workout Library. Train hard, log honest.