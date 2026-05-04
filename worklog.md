---
Task ID: 1
Agent: Main
Task: Implement all requested website changes

Work Log:
- Read all project files to understand current state (Next.js 16, Tailwind CSS 4, Framer Motion, bilingual AR/FR)
- Created /api/contact/route.ts - API endpoint using FormSubmit.co to forward messages to contactcodex.ma@gmail.com
- Rewrote HomePage.tsx - removed 3D dashboard mockup and stats, added 6 interactive service cards with hover effects, fixed "Get Started Today" hardcoded English text
- Updated i18n.ts - added cta_get_started key, changed pricing from 3 plans (basic/pro/enterprise) to 2 plans (monthly/annual), updated all AR/FR translations
- Updated ServicesPage.tsx - changed pricing grid from 3 to 2 plans, added language-aware prices (MAD/mois, MAD/an), removed 3rd plan
- Updated ContactPage.tsx - implemented real email submission via API route, added loading spinner and error handling
- Verified build passes successfully (Next.js 16 Turbopack build)

Stage Summary:
- All 4 requested changes implemented
- Build compiles without errors
- Dev server running on port 3000
- Preview URL: https://preview-web-f2b4a3b6-b8cf-478f-9019-ad645bff8508.space.chatglm.site/
