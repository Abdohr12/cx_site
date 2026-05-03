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
