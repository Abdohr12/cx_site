'use client';

import { motion, useInView, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, MouseEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Check, ArrowLeft, ArrowRight, Zap, Crown, Building2,
  Sparkles, ArrowUpRight, Globe, Quote, Code2, Smartphone,
  Users, ShoppingCart, Palette, Headphones,
} from 'lucide-react';
import Image from 'next/image';
import { useLang } from '@/lib/LanguageContext';
import type { TranslationKey } from '@/lib/i18n';

interface ServicesPageProps {
  onNavigate: (page: string) => void;
}

/* ─── Reusable Animations ──────────────────────────────────────── */

function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.23, 1, 0.32, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-6, 6]);
  const handleMouse = (e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleLeave = () => { x.set(0); y.set(0); };
  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── 3D Floating Cube ──────────────────────────────────────────── */

function FloatingCube({ size = 50, color = '#00B0F0', className = '' }: { size?: number; color?: string; className?: string }) {
  const half = size / 2;
  const faceStyle = (transform: string) => ({
    position: 'absolute' as const,
    width: size,
    height: size,
    transform,
    borderRadius: size * 0.15,
    background: `linear-gradient(135deg, ${color}40, ${color}18)`,
    border: `1px solid ${color}30`,
    backdropFilter: 'blur(4px)',
  });
  return (
    <div className={className} style={{ width: size, height: size, transformStyle: 'preserve-3d' }}>
      <div style={faceStyle(`translateZ(${half}px)`)} />
      <div style={faceStyle(`rotateY(180deg) translateZ(${half}px)`)} />
      <div style={faceStyle(`rotateY(-90deg) translateZ(${half}px)`)} />
      <div style={faceStyle(`rotateY(90deg) translateZ(${half}px)`)} />
      <div style={faceStyle(`rotateX(90deg) translateZ(${half}px)`)} />
      <div style={faceStyle(`rotateX(-90deg) translateZ(${half}px)`)} />
    </div>
  );
}

/* ─── Particle Field ────────────────────────────────────────────── */

function ParticleField({ count = 18, className = '' }: { count?: number; className?: string }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 4,
    duration: 4 + Math.random() * 6,
    delay: Math.random() * 5,
    px: (Math.random() - 0.5) * 40,
    py: -(80 + Math.random() * 120),
    pz: (Math.random() - 0.5) * 60,
    opacity: 0.15 + Math.random() * 0.35,
  }));

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle-3d absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: `rgba(0, 176, 240, ${p.opacity})`,
            '--duration': `${p.duration}s`,
            '--delay': `${p.delay}s`,
            '--px': `${p.px}px`,
            '--py': `${p.py}px`,
            '--pz': `${p.pz}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

/* ─── Glass Highlight Lines ─────────────────────────────────────── */

function GlassHighlightLines() {
  return (
    <>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00B0F0]/60 to-transparent" />
      <div className="absolute top-[1px] left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#002A5C]/40 to-transparent" />
    </>
  );
}

/* ─── Main Component ────────────────────────────────────────────── */

export default function ServicesPage({ onNavigate }: ServicesPageProps) {
  const { t, lang, isRTL } = useLang();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  /* ── Service card data ──────────────────────────────────────── */

  const serviceIcons = [
    '/icons/3d/web-dev.png',
    '/icons/3d/mobile.png',
    '/icons/3d/users.png',
    '/icons/3d/ecommerce.png',
    '/icons/3d/design.png',
    '/icons/3d/support.png',
  ];

  const serviceTitleKeys: TranslationKey[] = [
    'svc_web_title', 'svc_mobile_title', 'svc_trainees_title',
    'svc_ecommerce_title', 'svc_design_title', 'svc_support_title',
  ];

  const serviceDescKeys: TranslationKey[] = [
    'svc_web_desc', 'svc_mobile_desc', 'svc_trainees_desc',
    'svc_ecommerce_desc', 'svc_design_desc', 'svc_support_desc',
  ];

  const serviceFeatureKeys: TranslationKey[] = [
    'svc_web_features', 'svc_mobile_features', 'svc_trainees_features',
    'svc_ecommerce_features', 'svc_design_features', 'svc_support_features',
  ];

  /* ── Plan data ──────────────────────────────────────────────── */

  const planFeaturesRaw = t('plan_features') as string;
  const planFeatureGroups = planFeaturesRaw.split('|').map(group =>
    group.split(',').map(f => f.trim()).filter(Boolean)
  );

  // Fallback enterprise features if translation key doesn't exist
  const enterpriseFeaturesFallback = lang === 'ar'
    ? ['فريق مخصص لمشروعك', 'بنية تحتية مستقلة', 'SLA مخصص (99.9%)', 'تكاملات مخصصة', 'دعم VIP أولوي']
    : ['Équipe dédiée à votre projet', 'Infrastructure privée', 'SLA personnalisé (99.9%)', 'Intégrations sur mesure', 'Support VIP prioritaire'];

  const plans = [
    {
      nameKey: 'plan_basic' as TranslationKey,
      descKey: 'plan_basic_desc' as TranslationKey,
      icon: <Zap className="w-5 h-5" />,
      recommended: false,
      isEnterprise: false,
      price: lang === 'ar' ? '1,500' : '1 500',
      period: lang === 'ar' ? 'درهم/شهر' : 'MAD/mois',
      features: planFeatureGroups[0] || [],
      cta: t('plan_start'),
      badge: null,
    },
    {
      nameKey: 'plan_pro' as TranslationKey,
      descKey: 'plan_pro_desc' as TranslationKey,
      icon: <Crown className="w-5 h-5" />,
      recommended: true,
      isEnterprise: false,
      price: lang === 'ar' ? '15,000' : '15 000',
      period: lang === 'ar' ? 'درهم/سنة' : 'MAD/an',
      features: planFeatureGroups[1] || [],
      cta: t('plan_start'),
      badge: t('plan_pro_badge'),
    },
    {
      nameKey: 'plan_enterprise' as TranslationKey,
      descKey: 'plan_enterprise_desc' as TranslationKey,
      icon: <Building2 className="w-5 h-5" />,
      recommended: false,
      isEnterprise: true,
      price: lang === 'ar' ? 'حسب الطلب' : 'Sur devis',
      period: '',
      features: enterpriseFeaturesFallback,
      cta: lang === 'ar' ? 'تواصل معنا' : 'Nous contacter',
      badge: lang === 'ar' ? 'مخصص' : 'Personnalisé',
    },
  ];

  /* ── Render ─────────────────────────────────────────────────── */

  return (
    <div className="pt-[72px]">
      {/* ═══════════════════════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════════════════════ */}
      <section className="aurora-bg py-24 lg:py-32 relative overflow-hidden">
        {/* Orbs */}
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#00B0F0]/15 rounded-full blur-[140px] orb" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-[#00D4FF]/8 rounded-full blur-[120px] orb-delay" />
        <div className="absolute top-[30%] left-[20%] w-[300px] h-[300px] bg-[#002A5C]/20 rounded-full blur-[100px] orb-slow" />

        {/* Grid overlay */}
        <div className="absolute inset-0 grid-pattern opacity-[0.25]" />

        {/* 3D Scene — floating cubes, rings, particles */}
        <div className="absolute inset-0 scene-3d pointer-events-none">
          <div className="absolute top-[12%] right-[8%] float-3d-1 hidden lg:block">
            <FloatingCube size={60} color="#00B0F0" />
          </div>
          <div className="absolute top-[55%] left-[6%] float-3d-2 hidden lg:block">
            <FloatingCube size={45} color="#00D4FF" />
          </div>
          <div className="absolute bottom-[20%] right-[15%] float-3d-3 hidden lg:block">
            <FloatingCube size={38} color="#002A5C" />
          </div>
          <div className="absolute top-[25%] left-[15%] w-28 h-28 ring-3d hidden lg:block" />
          <div className="absolute bottom-[30%] right-[10%] w-20 h-20 ring-3d hidden lg:block" style={{ animationDelay: '-5s', borderColor: 'rgba(0,42,92,0.25)' }} />
          <div className="absolute top-[60%] right-[30%] float-3d-5 hidden lg:block">
            <FloatingCube size={30} color="#00B0F0" />
          </div>
          {/* Morph sphere */}
          <div className="absolute bottom-[15%] left-[25%] w-16 h-16 bg-gradient-to-br from-[#00B0F0]/10 to-[#00D4FF]/5 morph-sphere hidden lg:block" style={{ border: '1px solid rgba(0,176,240,0.15)' }} />
        </div>

        {/* Particle field */}
        <ParticleField count={20} className="opacity-60" />

        {/* Floating glass icon containers (background decoration) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute top-[18%] left-[8%] w-14 h-14 rounded-2xl glass flex items-center justify-center float-3d-3 hidden md:flex"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          >
            <Code2 className="w-6 h-6 text-[#00B0F0]/40" />
          </motion.div>
          <motion.div
            className="absolute bottom-[22%] right-[7%] w-12 h-12 rounded-xl glass flex items-center justify-center float-3d-1 hidden md:flex"
            animate={{ rotate: [360, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          >
            <Globe className="w-5 h-5 text-[#00D4FF]/30" />
          </motion.div>
          <motion.div
            className="absolute top-[40%] right-[12%] w-10 h-10 rounded-lg glass flex items-center justify-center float-3d-4 hidden lg:flex"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <Smartphone className="w-4 h-4 text-[#00B0F0]/30" />
          </motion.div>
        </div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Sparkle badge */}
            <motion.span
              className="inline-flex items-center gap-2.5 glass-strong text-white px-5 py-2.5 rounded-full text-sm font-bold mb-8 shadow-lg shadow-[#00B0F0]/10 cursor-default"
              animate={{ rotate: [0, 1, -1, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <motion.span
                animate={{ rotate: [0, 180, 360], scale: [1, 1.15, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="inline-block"
              >
                <Sparkles className="w-4 h-4 text-[#00D4FF]" />
              </motion.span>
              {t('services_badge')}
            </motion.span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.4rem] font-extrabold text-white mb-6 leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]">
              {t('services_title')}{' '}
              <span className="text-[#00D4FF] drop-shadow-[0_2px_14px_rgba(0,176,240,0.5)]">{t('services_title_hl')}</span>
            </h1>

            <p className="text-lg sm:text-xl text-white/85 max-w-2xl mx-auto leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]">
              {t('services_desc')}
            </p>
          </motion.div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full">
            <path d="M0 60V30C240 0 480 50 720 30C960 10 1200 50 1440 30V60H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SERVICES GRID
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceIcons.map((icon, i) => {
              const features = (t(serviceFeatureKeys[i]) as string).split(',').map(f => f.trim()).filter(Boolean);
              return (
                <FadeIn key={i} delay={i * 0.08}>
                  <TiltCard>
                    <div className="card-3d bg-white rounded-3xl p-7 shadow-sm border border-[#e0e7ef]/80 h-full group relative overflow-hidden hover:border-[#00B0F0]/30">
                      {/* Holographic overlay on hover */}
                      <div className="absolute inset-0 holographic opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />

                      {/* Glass highlight lines */}
                      <div className="absolute top-0 left-[5%] right-[5%] h-px bg-gradient-to-r from-transparent via-[#00B0F0]/0 group-hover:via-[#00B0F0]/40 to-transparent transition-all duration-500" />
                      <div className="absolute bottom-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[#002A5C]/0 group-hover:via-[#002A5C]/20 to-transparent transition-all duration-500" />

                      {/* Subtle gradient bg on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#00B0F0]/0 to-[#002A5C]/0 group-hover:from-[#00B0F0]/[0.03] group-hover:to-[#002A5C]/[0.02] transition-all duration-500 rounded-3xl" />

                      <div className="relative flex items-start justify-between mb-5">
                        <div
                          className="w-16 h-16 rounded-2xl icon-container flex items-center justify-center"
                          style={{ transform: 'translateZ(30px)' }}
                        >
                          <Image src={icon} alt="" width={36} height={36} className="drop-shadow-lg" />
                        </div>
                        <div className="w-8 h-8 rounded-lg bg-[#f0f4f8] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                          <ArrowUpRight className="w-4 h-4 text-[#00B0F0]" />
                        </div>
                      </div>

                      <h3 className="text-lg font-extrabold text-[#002A5C] mb-3">{t(serviceTitleKeys[i])}</h3>
                      <p className="text-[#5a6a7e] text-[15px] leading-relaxed mb-5">{t(serviceDescKeys[i])}</p>

                      <div className="flex flex-wrap gap-2">
                        {features.map((f, j) => (
                          <Badge
                            key={j}
                            variant="secondary"
                            className="text-[11px] font-semibold bg-[#002A5C]/[0.04] text-[#002A5C]/80 hover:bg-[#00B0F0]/10 hover:text-[#00B0F0] border border-[#e0e7ef]/60 transition-colors duration-200"
                          >
                            {f}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </TiltCard>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          PRICING SECTION — STUNNING 3-COLUMN DESIGN
          ═══════════════════════════════════════════════════════════ */}
      <section
        className="py-28 lg:py-36 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #001020 0%, #002A5C 25%, #003d7a 50%, #002A5C 75%, #001529 100%)' }}
      >
        {/* Background 3D elements */}
        <div className="absolute inset-0 scene-3d pointer-events-none">
          <div className="absolute top-[8%] right-[6%] float-3d-1 hidden lg:block">
            <FloatingCube size={60} color="#00B0F0" />
          </div>
          <div className="absolute top-[50%] left-[4%] float-3d-2 hidden lg:block">
            <FloatingCube size={50} color="#002A5C" />
          </div>
          <div className="absolute bottom-[15%] right-[12%] float-3d-3 hidden lg:block">
            <FloatingCube size={42} color="#00D4FF" />
          </div>
          <div className="absolute top-[35%] right-[22%] w-28 h-28 ring-3d hidden lg:block" />
          <div className="absolute bottom-[25%] left-[8%] w-22 h-22 ring-3d hidden lg:block" style={{ animationDelay: '-5s', borderColor: 'rgba(0,42,92,0.2)', width: '5.5rem', height: '5.5rem' }} />
          <div className="absolute top-[70%] right-[5%] float-3d-5 hidden lg:block">
            <FloatingCube size={35} color="#00B0F0" />
          </div>
          <div className="absolute top-[15%] left-[20%] w-14 h-14 bg-gradient-to-br from-[#00B0F0]/8 to-[#00D4FF]/4 morph-sphere hidden lg:block" style={{ border: '1px solid rgba(0,176,240,0.1)' }} />
          <div className="absolute bottom-[10%] right-[30%] w-10 h-10 bg-gradient-to-br from-[#002A5C]/10 to-[#00B0F0]/5 morph-sphere hidden lg:block" style={{ border: '1px solid rgba(0,42,92,0.12)', animationDelay: '-3s' }} />
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 grid-pattern opacity-[0.18]" />

        {/* Particle field */}
        <ParticleField count={24} className="opacity-40" />

        {/* Large ambient orb glow behind cards */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#00B0F0]/[0.06] rounded-full blur-[160px] pointer-events-none" />

        {/* Section content — extra padding-top for badges that overflow above cards */}
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-4">
          {/* Header */}
          <FadeIn className="text-center mb-16 lg:mb-20">
            <span className="inline-flex items-center gap-2.5 text-[#00D4FF] text-sm font-bold mb-3 uppercase tracking-wider">
              <Crown className="w-4 h-4" />
              {t('pricing_badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.8rem] font-extrabold text-white mb-5 leading-tight">
              {t('pricing_title')}
            </h2>
            <p className="text-white/65 max-w-2xl mx-auto text-[17px] leading-relaxed">
              {t('pricing_desc')}
            </p>
          </FadeIn>

          {/* Pricing Grid — 3 columns, responsive + overflow visible for badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7 max-w-6xl mx-auto overflow-visible">
            {plans.map((plan, i) => (
              <FadeIn key={i} delay={i * 0.12}>
                <TiltCard className="overflow-visible">
                  <div
                    className={`relative rounded-3xl overflow-visible flex flex-col h-full ${
                      plan.recommended
                        ? 'glass-strong glow-pulse-3d'
                        : 'glass'
                    }`}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Inner card background with overflow hidden for effects */}
                    <div className={`absolute inset-0 rounded-3xl overflow-hidden pointer-events-none`}>
                      {/* Grid pattern overlay inside card */}
                      <div className="absolute inset-0 grid-pattern opacity-[0.15]" />

                      {/* Shimmer effect for recommended */}
                      {plan.recommended && (
                        <div className="absolute inset-0 shimmer rounded-3xl" />
                      )}

                      {/* Glass highlight lines */}
                      <GlassHighlightLines />
                    </div>

                    {/* Badge */}
                    {plan.badge && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
                        <Badge
                          className={`text-[11px] font-bold px-4 py-1.5 shadow-lg border-0 whitespace-nowrap ${
                            plan.recommended
                              ? 'bg-gradient-to-l from-[#00D4FF] to-[#00B0F0] text-white shadow-[#00B0F0]/30'
                              : 'bg-white/15 backdrop-blur-xl text-white/90 shadow-white/10 border border-white/20'
                          }`}
                        >
                          {plan.badge}
                        </Badge>
                      </div>
                    )}

                    <div className="relative p-8 lg:p-9 flex flex-col flex-1" style={{ transform: 'translateZ(20px)' }}>
                      {/* Icon + Title */}
                      <div className={`mb-6 ${plan.badge ? 'mt-3' : 'mt-1'}`}>
                        <div
                          className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 ${
                            plan.recommended
                              ? 'bg-gradient-to-br from-[#00B0F0]/25 to-[#00D4FF]/15 text-[#00D4FF] shadow-lg shadow-[#00B0F0]/15'
                              : plan.isEnterprise
                                ? 'bg-gradient-to-br from-white/15 to-white/8 text-[#00B0F0]'
                                : 'bg-white/10 text-[#00D4FF]'
                          }`}
                        >
                          {plan.icon}
                        </div>
                        <h3 className="text-xl font-extrabold text-white mb-2">
                          {t(plan.nameKey)}
                        </h3>
                        <p className={`text-[14px] leading-relaxed ${plan.recommended ? 'text-white/75' : 'text-white/55'}`}>
                          {t(plan.descKey)}
                        </p>
                      </div>

                      {/* Price display */}
                      <div className={`mb-6 flex items-baseline gap-2 pb-6 border-b ${
                        plan.recommended ? 'border-white/15' : 'border-white/10'
                      }`}>
                        <span className="font-extrabold tracking-tight text-white text-4xl">
                          {plan.price}
                        </span>
                        {plan.period && (
                          <span className={`text-[14px] ${plan.recommended ? 'text-white/70' : 'text-white/55'}`}>
                            {plan.period}
                          </span>
                        )}
                      </div>

                      {/* Features list */}
                      <ul className="space-y-3 mb-8 flex-1">
                        {plan.features.map((feature, j) => (
                          <li key={j} className="flex items-start gap-3">
                            <div
                              className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-colors duration-200 ${
                                plan.recommended
                                  ? 'bg-[#00B0F0]/20'
                                  : plan.isEnterprise
                                    ? 'bg-white/10'
                                    : 'bg-white/[0.08]'
                              }`}
                            >
                              <Check className={`w-3 h-3 ${plan.recommended ? 'text-[#00D4FF]' : 'text-[#00B0F0]/80'}`} />
                            </div>
                            <span className={`text-[14px] leading-relaxed ${
                              plan.recommended ? 'text-white/85' : 'text-white/65'
                            }`}>
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA Button */}
                      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="mt-auto pt-2">
                        <Button
                          onClick={() => onNavigate('contact')}
                          className={`w-full font-bold rounded-2xl py-3.5 cursor-pointer transition-all duration-300 text-[15px] ${
                            plan.recommended
                              ? 'bg-gradient-to-l from-[#00D4FF] to-[#00B0F0] hover:from-[#00e8ff] hover:to-[#00c4ff] text-white shadow-lg shadow-[#00B0F0]/25 hover:shadow-xl hover:shadow-[#00B0F0]/35'
                              : plan.isEnterprise
                                ? 'bg-white/[0.08] hover:bg-white/[0.14] text-white border border-white/[0.18] hover:border-white/[0.28]'
                                : 'bg-white/[0.08] hover:bg-white/[0.14] text-white border border-white/[0.15] hover:border-white/[0.25]'
                          }`}
                        >
                          {plan.cta}
                          <ArrowIcon className="w-4 h-4 ms-1.5" />
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </TiltCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          BOTTOM CTA SECTION
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-28 mesh-gradient relative overflow-hidden">
        {/* 3D background elements */}
        <div className="absolute inset-0 scene-3d pointer-events-none">
          <div className="absolute top-[15%] right-[8%] float-3d-2 hidden lg:block">
            <FloatingCube size={50} color="#00B0F0" />
          </div>
          <div className="absolute bottom-[12%] left-[6%] float-3d-4 hidden lg:block">
            <FloatingCube size={40} color="#002A5C" />
          </div>
          <div className="absolute top-[45%] left-[15%] w-16 h-16 ring-3d hidden lg:block" style={{ animationDelay: '-7s', borderColor: 'rgba(0,176,240,0.15)' }} />
          <div className="absolute bottom-[25%] right-[20%] float-3d-3 hidden lg:block">
            <FloatingCube size={30} color="#00D4FF" />
          </div>
        </div>

        {/* Particle field */}
        <ParticleField count={10} className="opacity-30" />

        <div className="relative max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <FadeIn>
            <TiltCard>
              <div
                className="bg-white rounded-3xl p-10 lg:p-14 shadow-xl shadow-[#002A5C]/[0.06] border border-[#e0e7ef]/80 relative overflow-hidden"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Glass highlight lines */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00B0F0]/30 to-transparent" />
                <div className="absolute top-[1px] left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-[#00D4FF]/15 to-transparent" />

                <div style={{ transform: 'translateZ(20px)' }}>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#002A5C] to-[#004d8a] flex items-center justify-center text-white mx-auto mb-5 shadow-lg shadow-[#002A5C]/20">
                    <Quote className="w-7 h-7" />
                  </div>
                  <h2 className="text-3xl font-extrabold text-[#002A5C] mb-4">
                    {t('pricing_cta_title')}
                  </h2>
                  <p className="text-[#5a6a7e] text-[17px] mb-8 leading-relaxed">
                    {t('pricing_cta_desc')}
                  </p>
                  <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      size="lg"
                      onClick={() => onNavigate('contact')}
                      className="bg-gradient-to-l from-[#00B0F0] to-[#0098d4] hover:from-[#00c4ff] hover:to-[#00B0F0] text-white font-bold rounded-2xl px-8 py-4 text-[16px] shadow-xl shadow-[#00B0F0]/25 cursor-pointer transition-all duration-300"
                    >
                      {t('pricing_cta_btn')} <ArrowIcon className="w-5 h-5 ms-2" />
                    </Button>
                  </motion.div>
                </div>
              </div>
            </TiltCard>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
