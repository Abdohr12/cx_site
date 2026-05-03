# Codex Agency Website - Worklog

## Date: 2026-05-03

## Project Overview
Built a complete professional multi-page website for **Codex**, a Moroccan programming agency targeting SMBs. The site is built with Next.js 16, Tailwind CSS 4, shadcn/ui, and framer-motion.

## Completed Tasks

### 1. Project Setup
- Initialized fullstack dev environment
- Copied logo from `/upload/pasted_image_1777837352810.png` to `/public/logo.png`

### 2. Theme & Styling (`globals.css`)
- Overrode CSS variables for Codex brand identity:
  - Primary: #002A5C (Dark Navy Blue)
  - Accent: #00B0F0 (Light Blue)
  - Custom dark mode support
- Added utility classes: `.glass`, `.glass-dark`, `.gradient-text`, `.hero-gradient`, `.cta-gradient`
- Custom scrollbar styling
- Smooth scrolling and RTL support

### 3. Layout (`layout.tsx`)
- Set `lang="ar"` and `dir="rtl"` for Arabic RTL support
- Updated metadata with Codex branding
- Set favicon to `/logo.png`

### 4. Components Created (`src/components/codex/`)

#### Navbar.tsx
- Fixed navbar with glassmorphism effect
- Desktop navigation with animated active indicator (framer-motion layoutId)
- Mobile hamburger menu with AnimatePresence
- Logo + navigation links + CTA button "ابدأ الآن"

#### Footer.tsx
- 4-column grid: Company info, Quick links, Services, Contact info
- Social media links (Instagram, LinkedIn, Twitter)
- Back-to-top button
- Copyright with dynamic year

#### HomePage.tsx
- Hero section with gradient background, floating decorations, and glassmorphism card
- Trusted By section with Moroccan business type logos
- Features section (3 cards): Trainee Management, Smart Scheduling, Detailed Reports
- Testimonial section with Moroccan business owner quote
- CTA section with gradient background

#### ServicesPage.tsx
- Header with gradient background
- 6 service cards in responsive grid
- Pricing section (3 tiers): Basic (1,500 MAD), Professional (3,500 MAD, recommended), Enterprise (Custom)
- Bottom CTA for consultation

#### AboutPage.tsx
- Story section with company history
- Vision & Mission cards
- Values section (Innovation, Trust, Local Focus)
- Team section (4 members with avatar placeholders)
- Stats section with animated counters

#### ContactPage.tsx
- Contact info cards (Phone, Email, Address, Working Hours)
- Contact form (Name, Email, Phone, Company, Message) with success state
- Map placeholder with location info
- WhatsApp quick contact link
- Social media links

### 5. Main Page (`page.tsx`)
- Client-side routing using useState for 4 pages
- AnimatePresence for smooth page transitions
- Navbar + dynamic content + Footer layout

## Technical Highlights
- **RTL Support**: Full Arabic RTL layout with `dir="rtl"`
- **Animations**: Scroll-triggered fade-in animations using framer-motion's `useInView`
- **Responsive Design**: Mobile-first with breakpoints for sm, md, lg
- **Glassmorphism**: Used in hero section cards and navbar
- **Gradient backgrounds**: Hero and CTA sections with dark blue to light blue gradients
- **Interactive elements**: Hover effects on all cards and buttons
- **All text in Moroccan Darija (Arabic script)**
- **ESLint**: Passes with 0 errors
- **Dev server**: Running and compiling successfully

---

## Date: 2026-05-04

## Bilingual Support, 3D Icons, and Email Update

### Changes Made

#### 1. Bilingual Support (Arabic/French) — NEW
- Created `src/lib/i18n.ts` — comprehensive translation system with 100+ translation keys
  - Full Arabic (Moroccan Darija) and French translations
  - Service feature badges as comma-separated strings for both languages
  - Plan features organized with pipe separators for 3 pricing tiers
  - Helper `getArray()` function for parsing feature arrays
- Created `src/lib/LanguageContext.tsx` — React Context-based language management
  - `useLang()` hook providing `t()`, `toggleLang()`, `isRTL`
  - Automatic `dir` and `lang` attribute updates on document root
- Updated `src/app/layout.tsx` — wrapped children with `<LanguageProvider>`

#### 2. Updated ALL Components for Bilingual Support
- **Navbar.tsx**: Language toggle button (Globe icon + FR/AR), all nav text via `t()`
- **HomePage.tsx**: All text translated, arrow icons flip based on RTL/LTR
- **ServicesPage.tsx**: All services, features, pricing text translated; feature badges use comma-separated translation keys
- **AboutPage.tsx**: All story, vision/mission, values, team text translated
- **ContactPage.tsx**: All contact info, form labels, success messages translated
- **Footer.tsx**: All footer text, links, services, copyright translated

#### 3. 3D Icons Integration
- Replaced Lucide icons in key sections with 3D PNG icons:
  - **Hero**: `hero-visual.png` as floating decorative element
  - **Features**: `users.png`, `scheduling.png`, `reports.png` with gradient icon containers
  - **Services**: `web-dev.png`, `mobile.png`, `users.png`, `ecommerce.png`, `design.png`, `support.png`
  - **About**: `rocket.png` (mission card), `innovation.png`, `trust.png`, `dashboard.png` (values)
- Used `next/image` for all 3D icons with proper sizing
- Added gradient background containers for icons (`bg-gradient-to-br from-[#00B0F0]/15 to-[#00B0F0]/5`)

#### 4. Updated Email
- Replaced all occurrences of `contact@codex.ma` → `contactcodex.ma@gmail.com`
- Updated in ContactPage (contact card + mailto link) and Footer

#### 5. Design Improvements
- **3D Perspective Transforms**: Cards have hover `perspective(1000px) rotateY(2deg)` effect
- **Floating Animations**: 3D hero visual bobs gently with framer-motion
- **Gradient Icon Containers**: Icons use gradient backgrounds instead of flat colors
- **Dot Pattern Backgrounds**: Added subtle radial dot patterns to hero, CTA, and stats sections
- **Hover Lift Effects**: All cards lift on hover with `translate-y-[-4px]`
- **CSS Animations**: Added `.animate-float`, `.card-3d-hover`, `.icon-gradient` utility classes
- **RTL-aware 3D transforms**: CSS handles LTR/RTL flip for perspective effects

#### 6. Service Feature Badges (French)
- Added complete French translations for service feature badges:
  - Web: Sites commerciaux, Plateformes SaaS, Tableaux de bord, SEO
  - Mobile: iOS & Android, Apps natives, PWA, Notifications push
  - Trainees: Suivi de présence, Gestion des notes, Certificats, Rapports détaillés
  - E-commerce: Boutiques en ligne, Paiement local, Gestion de stock, Analytics
  - Design: UI/UX Design, Identité visuelle, Prototypes, Design responsif
  - Support: Support 24/7, Maintenance, Mises à jour, Sauvegarde

### Technical Notes
- ESLint: Passes with 0 errors
- All text uses translation system — zero hardcoded strings
- RTL/LTR switching handled dynamically
- 3D icons already existed in `/public/icons/3d/`
