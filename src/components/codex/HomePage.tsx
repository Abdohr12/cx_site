'use client';

import { motion, useInView, useMotionValue, useTransform } from 'framer-motion';
import { useRef, useState, useEffect, MouseEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Star, ArrowLeft, ArrowRight, Building2, GraduationCap, Store, Laptop,
  Sparkles, Shield, Zap, ArrowUpRight, Code, Smartphone, Palette,
  HeadphonesIcon, ShoppingCart, Quote,
  Search, Layout, Rocket, Award, TrendingUp, Heart, Users, MessageCircle,
} from 'lucide-react';
import Image from 'next/image';
import { useLang } from '@/lib/LanguageContext';
import type { TranslationKey } from '@/lib/i18n';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
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

function FadeInScale({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.23, 1, 0.32, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ===== 3D Tilt Card ===== */
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10]);

  const handleMouse = (e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div ref={ref} style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouse} onMouseLeave={handleLeave}
      className={className}>
      {children}
    </motion.div>
  );
}

/* ===== 3D Floating Cube ===== */
function FloatingCube({ size = 50, color = '#00B0F0', className = '' }: { size?: number; color?: string; className?: string }) {
  const half = size / 2;
  const faceStyle = (transform: string) => ({
    position: 'absolute' as const, width: size, height: size,
    transform, borderRadius: size * 0.15,
    background: `linear-gradient(135deg, ${color}40, ${color}20)`,
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

/* ===== 3D Particle Field ===== */
function ParticleField({ count = 15 }: { count?: number }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) {
    return <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ perspective: 800 }} />;
  }

  const particles = Array.from({ length: count }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100,
    size: Math.random() * 4 + 2, duration: Math.random() * 6 + 4,
    delay: Math.random() * 5, px: (Math.random() - 0.5) * 60,
    py: -(Math.random() * 150 + 50), pz: (Math.random() - 0.5) * 80,
    opacity: Math.random() * 0.4 + 0.1,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ perspective: 800 }}>
      {particles.map(p => (
        <div key={p.id} className="absolute rounded-full particle-3d"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size,
            background: `radial-gradient(circle, ${p.size > 4 ? '#00D4FF' : '#00B0F0'} 0%, transparent 70%)`,
            opacity: p.opacity, '--px': `${p.px}px`, '--py': `${p.py}px`, '--pz': `${p.pz}px`,
            '--duration': `${p.duration}s`, '--delay': `${p.delay}s`,
          } as React.CSSProperties} />
      ))}
    </div>
  );
}

/* ===== Stat Counter with IntersectionObserver ===== */
function StatCounter({ target, suffix = '', label, icon, delay = 0 }: { target: number; suffix?: string; label: string; icon: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const stepTime = 25;
    const steps = duration / stepTime;
    const increment = target / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, stepTime);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <FadeIn delay={delay} className="text-center">
      <div ref={ref} className="flex flex-col items-center">
        <div className="w-14 h-14 rounded-2xl bg-[#00B0F0]/15 flex items-center justify-center text-[#00D4FF] mx-auto mb-4 backdrop-blur-sm border border-[#00B0F0]/20">
          {icon}
        </div>
        <span className="text-4xl lg:text-5xl font-extrabold text-white mb-2">
          {count}{suffix}
        </span>
        <span className="text-white/60 text-[14px] font-semibold">{label}</span>
      </div>
    </FadeIn>
  );
}

/* ===== Testimonial Infinite Scroll Ticker (Pure CSS, RTL/LTR) ===== */
function TestimonialTicker() {
  const { t, isRTL } = useLang();
  const total = 8;

  const testimonialColors = [
    'from-[#00B0F0] to-[#0098d4]', 'from-[#002A5C] to-[#004d8a]', 'from-[#00B0F0] to-[#0088cc]',
    'from-[#004d8a] to-[#002A5C]', 'from-[#0098d4] to-[#00B0F0]', 'from-[#002A5C] to-[#003d7a]',
    'from-[#00B0F0] to-[#0098d4]', 'from-[#004d8a] to-[#002A5C]',
  ];

  const Card = ({ idx }: { idx: number }) => (
    <div className="flex-shrink-0 w-[280px] sm:w-[340px] lg:w-[400px] px-2.5" data-card>
      <div className="glass-strong rounded-2xl p-5 sm:p-6 relative overflow-hidden h-full group/card hover:bg-white/[0.14] transition-all duration-500">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00B0F0]/25 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00D4FF]/15 to-transparent" />
        <div className="absolute inset-0 grid-pattern opacity-[0.04]" />

        <div className="mb-3.5">
          <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${testimonialColors[idx]} flex items-center justify-center shadow-lg`}
            style={{ boxShadow: `0 4px 20px ${idx % 2 === 0 ? 'rgba(0,176,240,0.25)' : 'rgba(0,42,92,0.25)'}` }}>
            <Quote className="w-4 h-4 text-white" />
          </div>
        </div>

        <div className="flex items-center gap-0.5 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400 drop-shadow-[0_0_4px_rgba(251,191,36,0.3)]" />
          ))}
        </div>

        <p className="text-[13px] sm:text-[14px] leading-[1.8] text-white/90 mb-4 min-h-[80px]">
          &ldquo;{t(`testimonial_${idx + 1}_text` as TranslationKey)}&rdquo;
        </p>

        <div className="flex items-center gap-3 mt-auto pt-3 border-t border-white/[0.08]">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${testimonialColors[idx]} flex items-center justify-center text-white font-bold text-sm shadow-md`}>
            {t(`testimonial_${idx + 1}_name` as TranslationKey).charAt(0)}
          </div>
          <div className="min-w-0">
            <div className="font-bold text-white text-[12.5px] truncate">{t(`testimonial_${idx + 1}_name` as TranslationKey)}</div>
            <div className="text-white/45 text-[11px] truncate">{t(`testimonial_${idx + 1}_role` as TranslationKey)}</div>
          </div>
        </div>
      </div>
    </div>
  );

  // Exactly 2 copies: original (8) + clone (8) = 16 cards total
  // The CSS animation scrolls by -50% (LTR) or +50% (RTL), which = exactly one full set
  const items = Array.from({ length: total * 2 }, (_, i) => ({ index: i % total, key: i }));

  return (
    <div className="relative w-full">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-16 md:w-24 bg-gradient-to-r from-[#001529] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-16 md:w-24 bg-gradient-to-l from-[#001529] to-transparent z-10 pointer-events-none" />

      {/* Marquee container */}
      <div className="overflow-hidden w-full">
        {/* Track: direction:ltr prevents RTL from reversing flex order.
            CSS animation class handles LTR vs RTL scrolling direction. */}
        <div
          className={`flex ${isRTL ? 'marquee-track-rtl' : 'marquee-track-ltr'}`}
          style={{ width: 'max-content', direction: 'ltr' }}
        >
          {items.map((item) => (
            <Card key={item.key} idx={item.index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const { t, isRTL } = useLang();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const featureCards = [
    { icon: '/icons/3d/web-dev.png', titleKey: 'svc_web_title' as TranslationKey, descKey: 'svc_web_desc' as TranslationKey, featuresKey: 'svc_web_features' as TranslationKey, lucideIcon: <Code className="w-6 h-6" /> },
    { icon: '/icons/3d/mobile.png', titleKey: 'svc_mobile_title' as TranslationKey, descKey: 'svc_mobile_desc' as TranslationKey, featuresKey: 'svc_mobile_features' as TranslationKey, lucideIcon: <Smartphone className="w-6 h-6" /> },
    { icon: '/icons/3d/users.png', titleKey: 'svc_trainees_title' as TranslationKey, descKey: 'svc_trainees_desc' as TranslationKey, featuresKey: 'svc_trainees_features' as TranslationKey, lucideIcon: <GraduationCap className="w-6 h-6" /> },
    { icon: '/icons/3d/ecommerce.png', titleKey: 'svc_ecommerce_title' as TranslationKey, descKey: 'svc_ecommerce_desc' as TranslationKey, featuresKey: 'svc_ecommerce_features' as TranslationKey, lucideIcon: <ShoppingCart className="w-6 h-6" /> },
    { icon: '/icons/3d/design.png', titleKey: 'svc_design_title' as TranslationKey, descKey: 'svc_design_desc' as TranslationKey, featuresKey: 'svc_design_features' as TranslationKey, lucideIcon: <Palette className="w-6 h-6" /> },
    { icon: '/icons/3d/support.png', titleKey: 'svc_support_title' as TranslationKey, descKey: 'svc_support_desc' as TranslationKey, featuresKey: 'svc_support_features' as TranslationKey, lucideIcon: <HeadphonesIcon className="w-6 h-6" /> },
  ];

  const trustedBy = [
    { icon: <GraduationCap className="w-5 h-5" />, key: 'trusted_1' as TranslationKey },
    { icon: <Building2 className="w-5 h-5" />, key: 'trusted_2' as TranslationKey },
    { icon: <Store className="w-5 h-5" />, key: 'trusted_3' as TranslationKey },
    { icon: <Laptop className="w-5 h-5" />, key: 'trusted_4' as TranslationKey },
  ];

  return (
    <div className="pt-[72px]">
      {/* ===== HERO ===== */}
      <section className="hero-gradient relative min-h-[88vh] flex items-center overflow-hidden">
        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/30 pointer-events-none" />
        {/* Animated mesh orbs */}
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#00B0F0]/20 rounded-full blur-[150px] orb" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#00B0F0]/10 rounded-full blur-[130px] orb-delay" />
        <div className="absolute top-[30%] left-[40%] w-[300px] h-[300px] bg-white/[0.03] rounded-full blur-[100px] orb-slow" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 grid-pattern opacity-[0.4]" />

        {/* Floating geometric elements */}
        <motion.div
          animate={{ y: [-15, 15, -15], rotate: [0, 5, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[15%] right-[8%] w-3 h-3 rounded-full bg-[#00B0F0]/40 hidden lg:block"
        />
        <motion.div
          animate={{ y: [10, -10, 10], rotate: [0, -8, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[60%] right-[15%] w-2 h-2 rounded-full bg-white/30 hidden lg:block"
        />
        <motion.div
          animate={{ y: [-8, 12, -8], x: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[25%] left-[12%] w-4 h-4 rounded-lg bg-[#00B0F0]/20 rotate-45 hidden lg:block"
        />
        <motion.div
          animate={{ y: [12, -12, 12], rotate: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-[20%] right-[25%] w-3 h-3 rounded-full bg-white/20 hidden lg:block"
        />
        <motion.div
          animate={{ y: [-10, 8, -10], x: [3, -3, 3] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[45%] left-[8%] w-2 h-2 rounded-lg bg-[#00D4FF]/30 rotate-12 hidden lg:block"
        />

        {/* Floating service icons around edges */}
        <motion.div
          animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[20%] right-[5%] hidden xl:block"
        >
          <div className="w-14 h-14 rounded-2xl glass-strong flex items-center justify-center text-[#00D4FF] shadow-xl shadow-[#00B0F0]/10">
            <Code className="w-7 h-7" />
          </div>
        </motion.div>
        <motion.div
          animate={{ y: [8, -8, 8], rotate: [0, -4, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: -2 }}
          className="absolute top-[40%] left-[4%] hidden xl:block"
        >
          <div className="w-14 h-14 rounded-2xl glass-strong flex items-center justify-center text-[#00D4FF] shadow-xl shadow-[#00B0F0]/10">
            <Smartphone className="w-7 h-7" />
          </div>
        </motion.div>
        <motion.div
          animate={{ y: [-12, 8, -12], rotate: [0, 6, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: -4 }}
          className="absolute bottom-[25%] right-[8%] hidden xl:block"
        >
          <div className="w-14 h-14 rounded-2xl glass-strong flex items-center justify-center text-[#00D4FF] shadow-xl shadow-[#00B0F0]/10">
            <Palette className="w-7 h-7" />
          </div>
        </motion.div>
        <motion.div
          animate={{ y: [6, -10, 6], rotate: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: -1 }}
          className="absolute bottom-[30%] left-[6%] hidden xl:block"
        >
          <div className="w-14 h-14 rounded-2xl glass-strong flex items-center justify-center text-[#00D4FF] shadow-xl shadow-[#00B0F0]/10">
            <ShoppingCart className="w-7 h-7" />
          </div>
        </motion.div>

        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 py-20 text-center">
          {/* Badge */}
          <div
            className="mb-7"
          >
            <span className="inline-flex items-center gap-2.5 bg-white/[0.12] backdrop-blur-xl border border-white/[0.2] text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg">
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles className="w-4 h-4 text-[#00D4FF]" />
              </motion.span>
              {t('hero_badge')}
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-[2.8rem] sm:text-[3.5rem] lg:text-[4.2rem] font-extrabold text-white leading-[1.15] mb-7 drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]"
          >
            {t('hero_title_1')}{' '}
            <span className="text-[#00D4FF] drop-shadow-[0_2px_12px_rgba(0,176,240,0.5)]">{t('hero_title_highlight')}</span>
            <br />
            {t('hero_title_2')}{' '}
            <span className="relative inline-block">
              <span className="text-white">Codex</span>
              <span
                className="absolute -bottom-1.5 right-0 h-[4px] bg-gradient-to-l from-[#00B0F0] to-[#00D4FF] rounded-full w-full"
              />
            </span>
          </h1>

          {/* Description */}
          <p
            className="text-lg sm:text-xl text-white/90 leading-[1.85] mb-10 max-w-2xl mx-auto drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]"
          >
            {t('hero_desc')}
          </p>

          {/* CTAs */}
          <div
            className="flex flex-wrap items-center justify-center gap-4 mb-10"
          >
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Button
                size="lg"
                onClick={() => onNavigate('contact')}
                className="bg-gradient-to-l from-[#00B0F0] to-[#0098d4] hover:from-[#00c4ff] hover:to-[#00B0F0] text-white font-bold rounded-2xl px-8 py-4 text-[17px] shadow-xl shadow-[#00B0F0]/30 hover:shadow-2xl hover:shadow-[#00B0F0]/40 transition-all duration-300 cursor-pointer"
              >
                {t('hero_cta')}
                <ArrowIcon className="w-5 h-5 ms-2" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Button
                variant="outline"
                size="lg"
                onClick={() => onNavigate('services')}
                className="glass-strong border-white/20 text-white hover:bg-white/15 font-semibold rounded-2xl px-8 py-4 text-[17px] transition-all duration-300 cursor-pointer"
              >
                {t('hero_cta2')}
              </Button>
            </motion.div>
          </div>

          {/* Social proof badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {[
              { num: t('hero_sp1' as TranslationKey), label: t('hero_sp1_label' as TranslationKey) },
              { num: t('hero_sp2' as TranslationKey), label: t('hero_sp2_label' as TranslationKey) },
              { num: t('hero_sp3' as TranslationKey), label: t('hero_sp3_label' as TranslationKey) },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-2 bg-white/[0.08] backdrop-blur-sm border border-white/[0.12] rounded-2xl px-5 py-2.5">
                <span className="text-[#00D4FF] font-extrabold text-lg">{stat.num}</span>
                <span className="text-white/70 text-[13px] font-medium">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full">
            <path d="M0 60V30C240 0 480 50 720 30C960 10 1200 50 1440 30V60H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ===== TRUSTED BY ===== */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <p className="text-center text-[#8a96a8] text-sm font-semibold mb-8 tracking-wide uppercase">
              {t('trusted_title')}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14">
              {trustedBy.map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-[#a0aab8] hover:text-[#002A5C] transition-colors duration-300">
                  <div className="w-10 h-10 rounded-xl bg-[#f0f4f8] flex items-center justify-center text-[#5a6a7e]">
                    {item.icon}
                  </div>
                  <span className="text-[15px] font-semibold">{t(item.key)}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== SERVICES / FEATURES - 6 Interactive Cards ===== */}
      <section className="py-24 lg:py-32 mesh-gradient relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-[#00B0F0] text-sm font-bold mb-3 uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              {t('services_badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.8rem] font-extrabold text-[#002A5C] mb-5 leading-tight">
              {t('features_title')}
            </h2>
            <p className="text-[#5a6a7e] max-w-2xl mx-auto text-[18px] leading-relaxed">
              {t('features_desc')}
            </p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {featureCards.map((card, i) => {
              const features = (t(card.featuresKey) as string).split(',');
              return (
                <FadeInScale key={i} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                    className="bg-white rounded-3xl p-8 shadow-sm border border-[#e0e7ef]/80 h-full group relative overflow-hidden cursor-pointer hover:border-[#00B0F0]/30 hover:shadow-xl hover:shadow-[#002A5C]/[0.08] transition-all duration-400"
                    onClick={() => onNavigate('services')}
                  >
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00B0F0]/0 to-[#002A5C]/0 group-hover:from-[#00B0F0]/[0.03] group-hover:to-[#002A5C]/[0.02] transition-all duration-500 rounded-3xl" />

                    <div className="relative">
                      {/* Header: icon + arrow */}
                      <div className="flex items-start justify-between mb-6">
                        <motion.div
                          className="w-16 h-16 rounded-2xl icon-container flex items-center justify-center"
                          whileHover={{ scale: 1.1, rotate: -5 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        >
                          <Image src={card.icon} alt="" width={36} height={36} className="drop-shadow-lg" />
                        </motion.div>
                        <div className="w-10 h-10 rounded-xl bg-[#f0f4f8] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 text-[#00B0F0]">
                          <ArrowUpRight className="w-5 h-5" />
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-extrabold text-[#002A5C] mb-3 group-hover:text-[#001d42] transition-colors">
                        {t(card.titleKey)}
                      </h3>

                      {/* Description */}
                      <p className="text-[#5a6a7e] leading-relaxed text-[15px] mb-5">
                        {t(card.descKey)}
                      </p>

                      {/* Feature tags */}
                      <div className="flex flex-wrap gap-2 pt-3 border-t border-[#e0e7ef]/60">
                        {features.slice(0, 3).map((f, j) => (
                          <Badge
                            key={j}
                            variant="secondary"
                            className="text-[11px] font-semibold bg-[#002A5C]/[0.04] text-[#002A5C]/70 hover:bg-[#00B0F0]/10 hover:text-[#00B0F0] border border-[#e0e7ef]/60 transition-colors duration-200"
                          >
                            {f.trim()}
                          </Badge>
                        ))}
                        {features.length > 3 && (
                          <Badge
                            variant="secondary"
                            className="text-[11px] font-semibold bg-[#00B0F0]/10 text-[#00B0F0] border border-[#00B0F0]/20"
                          >
                            +{features.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </FadeInScale>
              );
            })}
          </div>

          {/* View all services CTA */}
          <FadeIn className="text-center mt-12">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Button
                onClick={() => onNavigate('services')}
                className="bg-[#002A5C] hover:bg-[#001d42] text-white font-bold rounded-2xl px-8 py-3.5 shadow-lg shadow-[#002A5C]/15 hover:shadow-xl transition-all duration-300 text-[15px] cursor-pointer"
              >
                {t('hero_cta2')}
                <ArrowIcon className="w-4 h-4 ms-2" />
              </Button>
            </motion.div>
          </FadeIn>
        </div>
      </section>

      {/* ===== PROCESS — Comment nous travaillons ===== */}
      <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 holographic" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-[#00B0F0] text-sm font-bold mb-3 uppercase tracking-wider">
              <Zap className="w-4 h-4" />
              {t('process_badge' as TranslationKey)}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.8rem] font-extrabold text-[#002A5C] mb-5 leading-tight">
              {t('process_title' as TranslationKey)}
            </h2>
            <p className="text-[#5a6a7e] max-w-2xl mx-auto text-[18px] leading-relaxed">
              {t('process_desc' as TranslationKey)}
            </p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Search className="w-7 h-7" />, title: 'process_step_1_title' as TranslationKey, desc: 'process_step_1_desc' as TranslationKey, num: '01', gradient: 'from-[#00B0F0] to-[#0098d4]' },
              { icon: <Layout className="w-7 h-7" />, title: 'process_step_2_title' as TranslationKey, desc: 'process_step_2_desc' as TranslationKey, num: '02', gradient: 'from-[#002A5C] to-[#004d8a]' },
              { icon: <Code className="w-7 h-7" />, title: 'process_step_3_title' as TranslationKey, desc: 'process_step_3_desc' as TranslationKey, num: '03', gradient: 'from-[#00B0F0] to-[#0088cc]' },
              { icon: <Rocket className="w-7 h-7" />, title: 'process_step_4_title' as TranslationKey, desc: 'process_step_4_desc' as TranslationKey, num: '04', gradient: 'from-[#002A5C] to-[#003d7a]' },
            ].map((step, i) => (
              <FadeInScale key={i} delay={i * 0.12}>
                <div className="relative bg-white rounded-3xl p-7 border border-[#e0e7ef]/80 h-full group hover:shadow-xl hover:shadow-[#00B0F0]/[0.08] hover:border-[#00B0F0]/20 transition-all duration-500">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#00B0F0]/[0.04] to-transparent rounded-bl-[50px]" />
                  <div className="text-[#e0e7ef] font-extrabold text-[42px] leading-none mb-4">{step.num}</div>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white mb-5 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-extrabold text-[#002A5C] mb-3">{t(step.title)}</h3>
                  <p className="text-[#5a6a7e] leading-relaxed text-[14px]">{t(step.desc)}</p>
                </div>
              </FadeInScale>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATS — Counter Animation ===== */}
      <section className="py-20 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-[0.08]" />
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#00B0F0]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-[#00B0F0]/5 rounded-full blur-[120px]" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { num: 3, suffix: '+', label: 'stats_years_label' as TranslationKey, icon: <Award className="w-6 h-6" /> },
              { num: 50, suffix: '+', label: 'stats_projects_label' as TranslationKey, icon: <Rocket className="w-6 h-6" /> },
              { num: 98, suffix: '%', label: 'stats_satisfaction_label' as TranslationKey, icon: <TrendingUp className="w-6 h-6" /> },
              { num: 24, suffix: '/7', label: 'stats_support_label' as TranslationKey, icon: <HeadphonesIcon className="w-6 h-6" /> },
            ].map((stat, i) => (
              <StatCounter key={i} target={stat.num} suffix={stat.suffix} label={t(stat.label)} icon={stat.icon} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS — Full-Width Infinite Scroll Ticker ===== */}
      <section className="py-20 lg:py-28 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #001529 0%, #002A5C 30%, #003d7a 60%, #002A5C 100%)' }}>
        {/* 3D Background Scene */}
        <div className="absolute inset-0 scene-3d pointer-events-none">
          <div className="absolute top-[10%] right-[8%] float-3d-1 hidden lg:block"><FloatingCube size={55} color="#00B0F0" /></div>
          <div className="absolute top-[55%] right-[5%] float-3d-2 hidden lg:block"><FloatingCube size={40} color="#002A5C" /></div>
          <div className="absolute top-[25%] left-[6%] float-3d-3 hidden lg:block"><FloatingCube size={50} color="#00D4FF" /></div>
          <div className="absolute bottom-[20%] left-[10%] float-3d-4 hidden lg:block"><FloatingCube size={35} color="#00B0F0" /></div>
          <div className="absolute top-[20%] right-[20%] w-24 h-24 ring-3d hidden lg:block" />
          <div className="absolute bottom-[25%] right-[15%] w-20 h-20 ring-3d hidden lg:block" style={{ animationDelay: '-5s', borderColor: 'rgba(0,42,92,0.25)' }} />
          <div className="absolute top-[40%] left-[15%] w-28 h-28 morph-sphere bg-[#00B0F0]/5 hidden lg:block" />
        </div>
        <ParticleField count={20} />
        <div className="absolute inset-0 grid-pattern opacity-[0.25]" />

        {/* Heading — centered */}
        <div className="relative max-w-5xl mx-auto px-6 lg:px-8 mb-12">
          <FadeIn>
            <div className="text-center">
              <span className="inline-flex items-center gap-2 text-[#00D4FF] text-sm font-bold uppercase tracking-wider mb-3">
                <Star className="w-4 h-4 fill-[#00D4FF] text-[#00D4FF]" />
                {isRTL ? 'آراء عملائنا' : 'Témoignages'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-tight">
                {isRTL ? 'ماذا يقول عملاؤنا عنا' : 'Ce que disent nos clients'}
              </h2>
            </div>
          </FadeIn>
        </div>

        {/* Full-width ticker — no container constraint */}
        <div className="relative">
          <TestimonialTicker />
        </div>
      </section>

      {/* ===== TEAM — Home ===== */}
      <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 holographic" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-[#00B0F0] text-sm font-bold mb-3 uppercase tracking-wider">
              <Users className="w-4 h-4" />
              {t('team_home_badge' as TranslationKey)}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.8rem] font-extrabold text-[#002A5C] mb-5 leading-tight">{t('team_home_title' as TranslationKey)}</h2>
            <p className="text-[#5a6a7e] max-w-2xl mx-auto text-[18px] leading-relaxed">{t('team_home_desc' as TranslationKey)}</p>
          </FadeIn>
          {(() => {
            const teamBgs = ['from-[#002A5C] to-[#004d8a]', 'from-[#00B0F0] to-[#0098d4]', 'from-[#002A5C] to-[#004d8a]', 'from-[#00B0F0] to-[#0098d4]'];
            const teamIcons = [<Zap key="zap" className="w-6 h-6" />, <Heart key="heart" className="w-6 h-6" />, <Shield key="shield" className="w-6 h-6" />, <TrendingUp key="trending" className="w-6 h-6" />];
            return (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {(['team_1_name', 'team_2_name', 'team_3_name', 'team_4_name'] as TranslationKey[]).map((nameKey, i) => {
              const roleKey = `team_${i + 1}_role` as TranslationKey;
              return (
                <FadeIn key={i} delay={i * 0.12}>
                  <TiltCard>
                    <div className="bg-white rounded-3xl p-7 text-center group cursor-default h-full relative overflow-hidden border border-[#e0e7ef]/60 hover:shadow-xl hover:shadow-[#00B0F0]/[0.08] hover:border-[#00B0F0]/20 transition-all duration-500"
                      style={{ transformStyle: 'preserve-3d' }}>
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00B0F0]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div style={{ transform: 'translateZ(30px)' }}>
                        <div className={`w-20 h-20 bg-gradient-to-br ${teamBgs[i]} rounded-3xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-5 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 relative`}>
                          <div className="absolute inset-0 rounded-3xl bg-white/0 group-hover:bg-white/10 transition-colors duration-500" />
                          <div className="relative">{teamIcons[i]}</div>
                        </div>
                        <h3 className="font-extrabold text-[#002A5C] text-[16px] mb-1">{t(nameKey)}</h3>
                        <p className="text-[#8a96a8] text-[13px] font-medium">{t(roleKey)}</p>
                      </div>
                    </div>
                  </TiltCard>
                </FadeIn>
              );
            })}
          </div>
            );
          })()}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="cta-gradient py-24 lg:py-32 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-[120px] orb" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#00B0F0]/8 rounded-full blur-[150px] orb-delay" />
        <div className="absolute inset-0 grid-pattern opacity-[0.3]" />

        <div className="relative max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <FadeIn>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-white/80 text-sm font-semibold mb-8"
            >
              <Zap className="w-4 h-4 text-[#00D4FF]" />
              {t('cta_get_started')}
            </motion.div>

            <h2 className="text-3xl sm:text-4xl lg:text-[2.8rem] font-extrabold text-white mb-6 leading-tight">
              {t('cta_title')}
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]">
              {t('cta_desc')}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Button size="lg" onClick={() => onNavigate('contact')}
                  className="bg-white text-[#002A5C] hover:bg-white/95 font-bold rounded-2xl px-8 py-4 text-[17px] shadow-2xl transition-all duration-300 cursor-pointer">
                  {t('cta_btn' as TranslationKey)}
                  <ArrowIcon className="w-5 h-5 ms-2" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Button variant="outline" size="lg"
                  className="glass-strong border-white/20 text-white hover:bg-white/15 font-semibold rounded-2xl px-8 py-4 text-[17px] transition-all duration-300 cursor-pointer">
                  {t('cta_btn2' as TranslationKey)}
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <a href="https://wa.me/212600000000" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl px-8 py-4 text-[17px] shadow-xl shadow-emerald-500/25 hover:shadow-2xl hover:shadow-emerald-500/35 transition-all duration-300">
                  <MessageCircle className="w-5 h-5" />
                  {t('cta_wa' as TranslationKey)}
                </a>
              </motion.div>
            </div>
          </FadeIn>
        </div>

        {/* Top wave */}
        <div className="absolute top-0 left-0 right-0 rotate-180">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full">
            <path d="M0 60V30C240 0 480 50 720 30C960 10 1200 50 1440 30V60H0Z" fill="white" />
          </svg>
        </div>
      </section>
    </div>
  );
}
