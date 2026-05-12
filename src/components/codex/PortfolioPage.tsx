'use client';

import { useState, useRef, useEffect, MouseEvent } from 'react';
import { motion, AnimatePresence, useInView, useMotionValue, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft, ArrowRight, Sparkles, ExternalLink,
  GraduationCap, Receipt, Check, Star, Shield,
  Zap, Users, BarChart3, FileText, Clock, Award,
  Globe, ChevronLeft, ChevronRight, Layers,
} from 'lucide-react';
import Image from 'next/image';
import { useLang } from '@/lib/LanguageContext';
import type { TranslationKey } from '@/lib/i18n';

/* ===== HELPER: FadeIn on Scroll ===== */
function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay, ease: [0.23, 1, 0.32, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

/* ===== HELPER: Animated Counter ===== */
function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.max(1, Math.floor(target / 60));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 25);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span ref={ref} className="text-4xl lg:text-5xl font-extrabold text-white">{count}{suffix}</span>;
}

/* ===== 3D Floating Cube ===== */
function FloatingCube({ size = 60, color = '#00B0F0', className = '' }: { size?: number; color?: string; className?: string }) {
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

/* ===== 3D Particle Field ===== */
function ParticleField() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 6 + 4,
    delay: Math.random() * 5,
    px: (Math.random() - 0.5) * 60,
    py: -(Math.random() * 150 + 50),
    pz: (Math.random() - 0.5) * 80,
    opacity: Math.random() * 0.5 + 0.2,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ perspective: 800 }}>
      {particles.map(p => (
        <div key={p.id} className="absolute rounded-full particle-3d"
          style={{
            left: `${p.x}%`, top: `${p.y}%`,
            width: p.size, height: p.size,
            background: `radial-gradient(circle, ${p.size > 4 ? '#00D4FF' : '#00B0F0'} 0%, transparent 70%)`,
            opacity: p.opacity,
            '--px': `${p.px}px`, '--py': `${p.py}px`, '--pz': `${p.pz}px`,
            '--duration': `${p.duration}s`, '--delay': `${p.delay}s`,
          } as React.CSSProperties} />
      ))}
    </div>
  );
}

/* ===== Screenshot Carousel ===== */
function ScreenshotCarousel({ screenshots, title }: { screenshots: string[]; title: string }) {
  const [active, setActive] = useState(0);
  const [isRTL] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive(prev => (prev + 1) % screenshots.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [screenshots.length]);

  const goNext = () => setActive(prev => (prev + 1) % screenshots.length);
  const goPrev = () => setActive(prev => (prev - 1 + screenshots.length) % screenshots.length);

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden group/carousel">
      {/* Screenshots */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={screenshots[active]}
            alt={`${title} - ${active + 1}`}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#002A5C]/30 via-transparent to-[#002A5C]/10 pointer-events-none z-10" />

      {/* Navigation arrows */}
      {screenshots.length > 1 && (
        <>
          <button
            onClick={goPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full glass-strong flex items-center justify-center text-white opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:bg-white/20 cursor-pointer"
          >
            {isRTL ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
          <button
            onClick={goNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full glass-strong flex items-center justify-center text-white opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:bg-white/20 cursor-pointer"
          >
            {isRTL ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </>
      )}

      {/* Dots indicator */}
      {screenshots.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {screenshots.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`rounded-full transition-all duration-300 ${
                i === active ? 'bg-[#00D4FF] w-6 h-2' : 'bg-white/40 hover:bg-white/60 w-2 h-2'
              } cursor-pointer`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ===== DATA ===== */
interface PortfolioPageProps {
  onNavigate: (page: string) => void;
}

const projects = [
  {
    id: 1,
    titleKey: 'pf_1_title' as TranslationKey,
    descKey: 'pf_1_desc' as TranslationKey,
    techKey: 'pf_1_tech' as TranslationKey,
    clientKey: 'pf_1_client' as TranslationKey,
    IconComponent: GraduationCap,
    screenshots: [
      '/portfolio/partier-portfolio/pp_1.png',
      '/portfolio/partier-portfolio/pp_2.png',
      '/portfolio/partier-portfolio/pp_3.png',
      '/portfolio/partier-portfolio/pp_4.png',
      '/portfolio/partier-portfolio/pp_7.png',
      '/portfolio/partier-portfolio/pp_8.png',
    ],
    featureKeys: [
      'pf_1_feat_1' as TranslationKey,
      'pf_1_feat_2' as TranslationKey,
      'pf_1_feat_3' as TranslationKey,
      'pf_1_feat_4' as TranslationKey,
    ],
    featureIcons: [Users, Clock, FileText, BarChart3],
    gradient: 'from-[#002A5C] via-[#004d8a] to-[#00B0F0]',
    accentColor: '#00B0F0',
    iconBg: 'from-[#002A5C] to-[#00B0F0]',
  },
  {
    id: 2,
    titleKey: 'pf_2_title' as TranslationKey,
    descKey: 'pf_2_desc' as TranslationKey,
    techKey: 'pf_2_tech' as TranslationKey,
    clientKey: 'pf_2_client' as TranslationKey,
    IconComponent: Receipt,
    screenshots: [
      '/portfolio/saas-factures/image1.png',
      '/portfolio/saas-factures/image2.png',
      '/portfolio/saas-factures/image3.png',
      '/portfolio/saas-factures/image4.png',
      '/portfolio/saas-factures/image5.png',
    ],
    featureKeys: [
      'pf_2_feat_1' as TranslationKey,
      'pf_2_feat_2' as TranslationKey,
      'pf_2_feat_3' as TranslationKey,
      'pf_2_feat_4' as TranslationKey,
    ],
    featureIcons: [FileText, BarChart3, Users, Shield],
    gradient: 'from-[#00B0F0] via-[#0098d4] to-[#002A5C]',
    accentColor: '#00D4FF',
    iconBg: 'from-[#00B0F0] to-[#0098d4]',
  },
];

const statData = [
  { number: 50, suffix: '+', icon: <Layers className="w-6 h-6" /> },
  { number: 30, suffix: '+', icon: <Globe className="w-6 h-6" /> },
  { number: 5, suffix: '+', icon: <Sparkles className="w-6 h-6" /> },
  { number: 100, suffix: '%', icon: <ExternalLink className="w-6 h-6" /> },
];


/* ===== MAIN COMPONENT ===== */
export default function PortfolioPage({ onNavigate }: PortfolioPageProps) {
  const { t, isRTL } = useLang();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div className="pt-[72px]">
      {/* ===== HERO — Aurora 3D Scene ===== */}
      <section className="aurora-bg py-24 lg:py-36 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40 pointer-events-none" />

        {/* 3D Scene container */}
        <div className="absolute inset-0 scene-3d pointer-events-none">
          <div className="absolute top-[10%] right-[8%] float-3d-1 hidden lg:block">
            <FloatingCube size={70} color="#00B0F0" />
          </div>
          <div className="absolute top-[55%] right-[5%] float-3d-2 hidden lg:block">
            <FloatingCube size={45} color="#002A5C" />
          </div>
          <div className="absolute top-[25%] left-[6%] float-3d-3 hidden lg:block">
            <FloatingCube size={55} color="#00D4FF" />
          </div>
          <div className="absolute bottom-[20%] left-[10%] float-3d-4 hidden lg:block">
            <FloatingCube size={40} color="#00B0F0" />
          </div>
          <div className="absolute top-[15%] left-[20%] w-24 h-24 bg-gradient-to-br from-[#00B0F0]/20 to-[#002A5C]/20 morph-sphere float-3d-2 hidden lg:block" />
          <div className="absolute top-[30%] right-[20%] w-20 h-20 ring-3d hidden lg:block" />
          <div className="absolute bottom-[30%] right-[30%] w-32 h-32 ring-3d hidden lg:block" style={{ animationDelay: '-4s', borderColor: 'rgba(0,42,92,0.2)' }} />

          {/* Floating glass icons */}
          <div className="absolute top-[20%] right-[15%] float-3d-5 hidden xl:block">
            <div className="w-14 h-14 rounded-2xl glass-strong flex items-center justify-center text-[#00D4FF] shadow-xl shadow-[#00B0F0]/10">
              <GraduationCap className="w-7 h-7" />
            </div>
          </div>
          <div className="absolute bottom-[25%] left-[8%] float-3d-1 hidden xl:block">
            <div className="w-14 h-14 rounded-2xl glass-strong flex items-center justify-center text-[#00D4FF] shadow-xl shadow-[#00B0F0]/10">
              <Receipt className="w-7 h-7" />
            </div>
          </div>
        </div>

        <ParticleField />
        <div className="absolute inset-0 grid-pattern opacity-[0.3]" />

        {/* Main content */}
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 40, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}>
            <span className="inline-flex items-center gap-2.5 bg-white/[0.12] backdrop-blur-xl border border-white/[0.2] text-white px-5 py-2.5 rounded-full text-sm font-semibold mb-7 shadow-lg">
              <motion.span animate={{ rotate: [0, 360] }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}>
                <Sparkles className="w-4 h-4 text-[#00D4FF]" />
              </motion.span>
              {t('portfolio_badge')}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-[3.5rem] font-extrabold text-white mb-6 leading-[1.15] drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
              {t('portfolio_title')}{' '}
              <span className="text-[#00D4FF] drop-shadow-[0_2px_15px_rgba(0,176,240,0.6)]">{t('portfolio_title_hl')}</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto leading-[1.9] drop-shadow-[0_1px_6px_rgba(0,0,0,0.4)]">
              {t('portfolio_desc')}
            </p>
          </motion.div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full">
            <path d="M0 80V40C180 0 360 60 540 40C720 20 900 70 1080 40C1260 10 1380 50 1440 40V80H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ===== STATS — 3D Glass Cards ===== */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="absolute inset-0 holographic" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {statData.map((s, i) => (
              <TiltCard key={i} className="group">
                <motion.div
                  initial={{ opacity: 0, y: 40, rotateX: 15 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
                  className="bg-gradient-to-br from-[#001d42] via-[#002A5C] to-[#004080] rounded-2xl p-7 text-center relative overflow-hidden glow-pulse-3d cursor-default"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  <div className="absolute inset-0 grid-pattern opacity-[0.1]" />
                  <div style={{ transform: 'translateZ(30px)' }}>
                    <div className="w-12 h-12 rounded-xl bg-[#00B0F0]/15 flex items-center justify-center text-[#00D4FF] mx-auto mb-3 backdrop-blur-sm border border-[#00B0F0]/20">
                      {s.icon}
                    </div>
                    <AnimatedCounter target={s.number} suffix={s.suffix} />
                    <p className="text-white/70 mt-2 text-[13px] font-semibold">
                      {i === 0 && (isRTL ? 'مشروع' : 'Projects')}
                      {i === 1 && (isRTL ? 'عميل' : 'Clients')}
                      {i === 2 && (isRTL ? 'سنوات خبرة' : 'Years Exp.')}
                      {i === 3 && (isRTL ? 'رضا العملاء' : 'Satisfaction')}
                    </p>
                  </div>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROJECTS — Alternating Layout ===== */}
      <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
        {/* Subtle 3D background */}
        <div className="absolute inset-0 scene-3d pointer-events-none">
          <div className="absolute top-[10%] right-[3%] float-3d-2 hidden lg:block">
            <FloatingCube size={40} color="#00B0F0" />
          </div>
          <div className="absolute bottom-[15%] left-[3%] float-3d-4 hidden lg:block">
            <FloatingCube size={35} color="#002A5C" />
          </div>
          <div className="absolute top-[50%] left-[10%] w-16 h-16 ring-3d hidden lg:block" style={{ animationDelay: '-6s' }} />
        </div>
        <div className="absolute inset-0 holographic" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          {/* Projects */}
          <div className="space-y-24 lg:space-y-32">
            {projects.map((project, index) => {
              const isReversed = index % 2 !== 0;
              const IconComp = project.IconComponent;

              return (
                <FadeIn key={project.id} delay={0.1}>
                  <div className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-10 lg:gap-16 items-center`}>
                    {/* ===== Screenshot Section ===== */}
                    <div className="w-full lg:w-1/2">
                      <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-[#002A5C]/10 border border-[#e0e7ef]/40 group">
                        {/* Top glass highlight */}
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00B0F0]/40 to-transparent z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Screenshot carousel */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`}>
                          <div className="absolute inset-0 grid-pattern opacity-[0.1]" />
                        </div>
                        <div className="absolute inset-0 z-10">
                          <ScreenshotCarousel screenshots={project.screenshots} title={t(project.titleKey)} />
                        </div>

                        {/* Project number badge */}
                        <div className="absolute top-4 left-4 z-20">
                          <span className="glass-strong text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                            <span className="text-[#00D4FF]">#{String(project.id).padStart(2, '0')}</span>
                            <span className="text-white/80">Projet</span>
                          </span>
                        </div>

                        {/* Recognition badge */}
                        <div className="absolute top-4 right-4 z-20">
                          <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                            className="glass-strong text-[#00D4FF] px-3 py-2 rounded-full shadow-lg flex items-center gap-1.5"
                          >
                            <Award className="w-4 h-4" />
                            <span className="text-[11px] font-bold">{isRTL ? 'مشروع مميز' : 'Projet phare'}</span>
                          </motion.div>
                        </div>
                      </div>
                    </div>

                    {/* ===== Info Section ===== */}
                    <div className="w-full lg:w-1/2">
                      <div className={`${isReversed ? 'lg:text-right' : 'lg:text-left'} text-center`}>
                        {/* Circular icon */}
                        <div className={`flex ${isReversed ? 'lg:justify-end' : 'lg:justify-start'} justify-center mb-8`}>
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            whileInView={{ scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, type: 'spring', stiffness: 150 }}
                            className="relative"
                          >
                            {/* Outer glow ring */}
                            <div className="absolute inset-[-8px] rounded-full bg-gradient-to-br from-[#00B0F0]/20 to-[#00D4FF]/10 animate-pulse" />
                            {/* Spinning ring */}
                            <div className="absolute inset-[-4px] rounded-full border-2 border-dashed border-[#00B0F0]/30" style={{ animation: 'spin 20s linear infinite' }} />
                            {/* Main circular icon */}
                            <div className={`w-28 h-28 rounded-full bg-gradient-to-br ${project.iconBg} flex items-center justify-center shadow-2xl shadow-[#00B0F0]/20 relative z-10`}>
                              <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-sm" />
                              <IconComp className="w-12 h-12 text-white relative z-10 drop-shadow-lg" />
                            </div>
                            {/* Small floating star */}
                            <motion.div
                              animate={{ y: [-3, 3, -3], rotate: [0, 15, 0] }}
                              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                              className="absolute -top-2 -right-2 z-20"
                            >
                              <div className="w-7 h-7 rounded-full bg-[#00D4FF] flex items-center justify-center shadow-lg shadow-[#00D4FF]/30">
                                <Star className="w-3.5 h-3.5 text-white fill-white" />
                              </div>
                            </motion.div>
                          </motion.div>
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#002A5C] mb-4 leading-tight">
                          {t(project.titleKey)}
                        </h3>

                        {/* Description */}
                        <p className="text-[#5a6a7e] text-[15px] sm:text-base leading-[1.8] mb-6 max-w-lg mx-auto lg:mx-0">
                          {t(project.descKey)}
                        </p>

                        {/* Features */}
                        <div className={`mb-8 ${isReversed ? 'lg:space-x-reverse' : ''}`}>
                          <h4 className="text-sm font-bold text-[#002A5C] mb-4 uppercase tracking-wider flex items-center gap-2 justify-center lg:justify-start">
                            <Zap className="w-4 h-4 text-[#00B0F0]" />
                            {t('pf_features' as TranslationKey)}
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {project.featureKeys.map((featKey, fi) => {
                              const FeatIcon = project.featureIcons[fi];
                              return (
                                <motion.div
                                  key={featKey}
                                  initial={{ opacity: 0, x: isReversed ? 20 : -20 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ delay: 0.3 + fi * 0.1 }}
                                  className="flex items-center gap-3 bg-gradient-to-br from-[#f8fafc] to-[#f0f4f8] rounded-xl px-4 py-3 border border-[#e0e7ef]/50 group/feat hover:border-[#00B0F0]/30 hover:shadow-md hover:shadow-[#00B0F0]/5 transition-all duration-300"
                                >
                                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#002A5C] to-[#004d8a] flex items-center justify-center flex-shrink-0 shadow-sm group-hover/feat:shadow-md group-hover/feat:shadow-[#00B0F0]/20 transition-shadow">
                                    <FeatIcon className="w-4 h-4 text-white" />
                                  </div>
                                  <span className="text-[13px] font-semibold text-[#3a4a5c]">{t(featKey)}</span>
                                </motion.div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Tech stack + Price row */}
                        <div className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8 ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
                          {/* Tech stack */}
                          <div className="flex flex-wrap gap-2">
                            {(t(project.techKey) as string).split(', ').map((tech, ti) => (
                              <span key={ti} className="text-[11px] font-bold bg-gradient-to-br from-[#002A5C] to-[#004d8a] text-white px-3 py-1.5 rounded-lg shadow-sm">
                                {tech}
                              </span>
                            ))}
                          </div>

                          {/* Price badge */}
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="glass-strong rounded-xl px-5 py-2.5 flex items-center gap-2.5 shadow-lg border border-[#00B0F0]/20"
                          >
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00B0F0] to-[#00D4FF] flex items-center justify-center">
                              <Sparkles className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <p className="text-[10px] text-[#8a96a8] font-semibold uppercase tracking-wide">{t('pf_price_label' as TranslationKey)}</p>
                              <p className="text-sm font-extrabold text-[#002A5C]">{t('pf_price_value' as TranslationKey)}</p>
                            </div>
                          </motion.div>
                        </div>

                        {/* Client info */}
                        <div className={`flex items-center gap-3 mb-8 ${isReversed ? 'lg:justify-end' : 'lg:justify-start'} justify-center`}>
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#002A5C] to-[#004d8a] flex items-center justify-center shadow-sm">
                            <Users className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="text-[11px] text-[#8a96a8] font-medium">{t('pf_client')}</p>
                            <p className="text-[13px] text-[#3a4a5c] font-semibold">{t(project.clientKey)}</p>
                          </div>
                        </div>

                        {/* CTA Button */}
                        <div className={`flex ${isReversed ? 'lg:justify-end' : 'lg:justify-start'} justify-center`}>
                          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                            <Button
                              size="lg"
                              onClick={() => onNavigate('contact')}
                              className={`bg-gradient-to-r ${project.gradient} text-white font-bold rounded-2xl px-8 py-4 text-[15px] shadow-xl shadow-[#002A5C]/15 hover:shadow-2xl hover:shadow-[#00B0F0]/20 transition-all duration-300 cursor-pointer flex items-center gap-2.5`}
                            >
                              <ExternalLink className="w-4 h-4" />
                              {t('pf_view')}
                              <ArrowIcon className="w-4 h-4" />
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Divider between projects */}
                  {index < projects.length - 1 && (
                    <div className="mt-24 lg:mt-32 flex items-center justify-center">
                      <div className="h-px bg-gradient-to-r from-transparent via-[#00B0F0]/30 to-transparent w-full max-w-md" />
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                        className="mx-4 w-10 h-10 rounded-full bg-gradient-to-br from-[#002A5C] to-[#00B0F0] flex items-center justify-center shadow-lg shadow-[#00B0F0]/10"
                      >
                        <Zap className="w-5 h-5 text-white" />
                      </motion.div>
                      <div className="h-px bg-gradient-to-r from-transparent via-[#00B0F0]/30 to-transparent w-full max-w-md" />
                    </div>
                  )}
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== CTA — Aurora 3D Scene ===== */}
      <section className="aurora-bg py-24 lg:py-32 relative overflow-hidden">
        {/* 3D shapes */}
        <div className="absolute inset-0 scene-3d pointer-events-none">
          <div className="absolute top-[15%] right-[10%] float-3d-2 hidden lg:block">
            <FloatingCube size={55} color="#00B0F0" />
          </div>
          <div className="absolute bottom-[20%] left-[8%] float-3d-3 hidden lg:block">
            <FloatingCube size={45} color="#002A5C" />
          </div>
          <div className="absolute top-[40%] left-[15%] float-3d-1 hidden lg:block">
            <FloatingCube size={35} color="#00D4FF" />
          </div>
          <div className="absolute top-[50%] right-[25%] w-24 h-24 ring-3d hidden lg:block" />
          <div className="absolute bottom-[25%] right-[15%] w-16 h-16 ring-3d hidden lg:block" style={{ animationDelay: '-5s', borderColor: 'rgba(0,42,92,0.2)' }} />
          <div className="absolute top-[10%] left-[15%] w-28 h-28 bg-gradient-to-br from-[#00B0F0]/15 to-[#002A5C]/10 morph-sphere hidden lg:block" />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none" />
        <div className="absolute inset-0 grid-pattern opacity-[0.25]" />
        <ParticleField />

        {/* Top wave */}
        <div className="absolute top-0 left-0 right-0 rotate-180">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full">
            <path d="M0 80V40C180 0 360 60 540 40C720 20 900 70 1080 40C1260 10 1380 50 1440 40V80H0Z" fill="white" />
          </svg>
        </div>

        <div className="relative max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <FadeIn>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center gap-2 bg-white/[0.1] backdrop-blur-xl border border-white/[0.15] px-4 py-2 rounded-full text-white/80 text-sm font-semibold mb-8"
            >
              <Sparkles className="w-4 h-4 text-[#00D4FF]" />
              {t('portfolio_badge')}
            </motion.div>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.8rem] font-extrabold text-white mb-6 leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]">
              {t('portfolio_cta_title')}
            </h2>
            <p className="text-lg sm:text-xl text-white/85 mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.3)]">
              {t('portfolio_cta_desc')}
            </p>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Button
                size="lg"
                onClick={() => onNavigate('contact')}
                className="bg-white text-[#002A5C] hover:bg-white/95 font-bold rounded-2xl px-8 py-4 text-[17px] shadow-2xl transition-all duration-300 cursor-pointer"
              >
                {t('portfolio_cta_btn')}
                <ArrowIcon className="w-5 h-5 ms-2" />
              </Button>
            </motion.div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
