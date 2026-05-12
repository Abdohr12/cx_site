'use client';

import { useState, useRef, useEffect, MouseEvent } from 'react';
import { motion, AnimatePresence, useInView, useMotionValue, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft, ArrowRight, Sparkles, ExternalLink,
  Layers, Smartphone, ShoppingBag, Palette, Server,
  Code, Globe, Layout, FolderOpen,
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

/* ===== DATA ===== */
interface PortfolioPageProps {
  onNavigate: (page: string) => void;
}

const projectScreenshots: Record<number, string[]> = {
  1: ['/portfolio/partier-portfolio/pp_1.png', '/portfolio/partier-portfolio/pp_2.png', '/portfolio/partier-portfolio/pp_3.png'],
  2: ['/portfolio/partier-portfolio/pp_4.png', '/portfolio/partier-portfolio/pp_5.png', '/portfolio/partier-portfolio/pp_6.png'],
  3: ['/portfolio/saas-factures/image1.png', '/portfolio/saas-factures/image2.png', '/portfolio/saas-factures/image3.png'],
  4: ['/portfolio/saas-factures/image4.png', '/portfolio/saas-factures/image5.png'],
  5: ['/portfolio/partier-portfolio/pp_7.png', '/portfolio/partier-portfolio/pp_8.png'],
  6: ['/portfolio/partier-portfolio/pp_3.png'],
};
const projectIcons = ['/icons/3d/users.png', '/icons/3d/ecommerce.png', '/icons/3d/mobile.png', '/icons/3d/web-dev.png', '/icons/3d/dashboard.png', '/icons/3d/design.png'];
const projectGradients = [
  'from-[#002A5C] via-[#004d8a] to-[#00B0F0]',
  'from-[#00B0F0] via-[#0098d4] to-[#004d8a]',
  'from-[#002A5C] via-[#003d7a] to-[#00B0F0]',
  'from-[#00B0F0] via-[#00d4ff] to-[#002A5C]',
  'from-[#001a3d] via-[#004d8a] to-[#0088cc]',
  'from-[#002A5C] via-[#0066aa] to-[#00d4ff]',
];

const filterOptions = [
  { id: 'all', key: 'portfolio_filter_all' as TranslationKey, icon: <Layers className="w-4 h-4" /> },
  { id: 'web', key: 'portfolio_filter_web' as TranslationKey, icon: <ExternalLink className="w-4 h-4" /> },
  { id: 'mobile', key: 'portfolio_filter_mobile' as TranslationKey, icon: <Smartphone className="w-4 h-4" /> },
  { id: 'ecommerce', key: 'portfolio_filter_ecommerce' as TranslationKey, icon: <ShoppingBag className="w-4 h-4" /> },
  { id: 'design', key: 'portfolio_filter_design' as TranslationKey, icon: <Palette className="w-4 h-4" /> },
  { id: 'system', key: 'portfolio_filter_system' as TranslationKey, icon: <Server className="w-4 h-4" /> },
];



/* ===== MAIN COMPONENT ===== */
export default function PortfolioPage({ onNavigate }: PortfolioPageProps) {
  const { t, isRTL } = useLang();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;
  const [activeFilter, setActiveFilter] = useState('all');

  const [activeScreenshot, setActiveScreenshot] = useState<Record<number, number>>({});

  const projects = [1, 2, 3, 4, 5, 6].map((i) => ({
    num: i,
    titleKey: `pf_${i}_title` as TranslationKey,
    descKey: `pf_${i}_desc` as TranslationKey,
    catKey: `pf_${i}_cat` as TranslationKey,
    techKey: `pf_${i}_tech` as TranslationKey,
    clientKey: `pf_${i}_client` as TranslationKey,
  }));

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter((p) => t(p.catKey) === activeFilter);

  const statData = [
    { number: 50, suffix: '+', icon: <FolderOpen className="w-6 h-6" /> },
    { number: 30, suffix: '+', icon: <Globe className="w-6 h-6" /> },
    { number: 5, suffix: '+', icon: <Sparkles className="w-6 h-6" /> },
    { number: 100, suffix: '%', icon: <ExternalLink className="w-6 h-6" /> },
  ];

  return (
    <div className="pt-[72px]">
      {/* ===== HERO — Aurora 3D Scene ===== */}
      <section className="aurora-bg py-24 lg:py-36 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40 pointer-events-none" />

        {/* 3D Scene container */}
        <div className="absolute inset-0 scene-3d pointer-events-none">
          {/* Floating 3D Cubes */}
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

          {/* Morphing sphere */}
          <div className="absolute top-[15%] left-[20%] w-24 h-24 bg-gradient-to-br from-[#00B0F0]/20 to-[#002A5C]/20 morph-sphere float-3d-2 hidden lg:block" />

          {/* 3D Rings */}
          <div className="absolute top-[30%] right-[20%] w-20 h-20 ring-3d hidden lg:block" />
          <div className="absolute bottom-[30%] right-[30%] w-32 h-32 ring-3d hidden lg:block" style={{ animationDelay: '-4s', borderColor: 'rgba(0,42,92,0.2)' }} />

          {/* Floating glass icon containers */}
          <div className="absolute top-[20%] right-[15%] float-3d-5 hidden xl:block">
            <div className="w-14 h-14 rounded-2xl glass-strong flex items-center justify-center text-[#00D4FF] shadow-xl shadow-[#00B0F0]/10">
              <Code className="w-7 h-7" />
            </div>
          </div>
          <div className="absolute bottom-[25%] left-[8%] float-3d-1 hidden xl:block">
            <div className="w-14 h-14 rounded-2xl glass-strong flex items-center justify-center text-[#00D4FF] shadow-xl shadow-[#00B0F0]/10">
              <Layout className="w-7 h-7" />
            </div>
          </div>
          <div className="absolute top-[50%] right-[10%] float-3d-3 hidden xl:block">
            <div className="w-14 h-14 rounded-2xl glass-strong flex items-center justify-center text-[#00D4FF] shadow-xl shadow-[#00B0F0]/10">
              <Globe className="w-7 h-7" />
            </div>
          </div>
        </div>

        {/* Particles */}
        <ParticleField />

        {/* Grid pattern */}
        <div className="absolute inset-0 grid-pattern opacity-[0.3]" />

        {/* Main content */}
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 40, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}>
            {/* Sparkle badge */}
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
                  {/* Glass highlight */}
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

      {/* ===== FILTER + PROJECTS ===== */}
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
          {/* Filter Tabs — Glassmorphism */}
          <FadeIn className="mb-14">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {filterOptions.map((f) => {
                const isActive = activeFilter === f.id;
                return (
                  <motion.button
                    key={f.id}
                    onClick={() => setActiveFilter(f.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative flex items-center gap-2.5 px-6 py-3 rounded-2xl text-[14px] font-semibold transition-all duration-400 cursor-pointer ${
                      isActive
                        ? 'text-white shadow-xl shadow-[#00B0F0]/25'
                        : 'bg-gradient-to-br from-[#001d42]/80 to-[#002A5C]/80 backdrop-blur-xl border border-white/[0.08] text-white/70 hover:text-white hover:bg-gradient-to-br hover:from-[#002A5C]/90 hover:to-[#004080]/90 hover:border-[#00B0F0]/20 hover:shadow-lg hover:shadow-[#00B0F0]/10'
                    }`}
                  >
                    {isActive && (
                      <>
                        {/* Glowing background */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#00B0F0] via-[#0088cc] to-[#00B0F0]" />
                        {/* Animated glow border */}
                        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-[#00D4FF] via-[#00B0F0] to-[#00D4FF] opacity-60 animate-pulse" />
                        {/* Shimmer overlay */}
                        <div className="absolute inset-0 rounded-2xl shimmer" />
                      </>
                    )}
                    <span className="relative z-10 flex items-center gap-2.5">
                      {f.icon}
                      {t(f.key)}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </FadeIn>

          {/* Projects Grid */}
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <motion.div
                  key={p.num}
                  layout
                  initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
                  animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                  exit={{ opacity: 0, scale: 0.9, rotateX: -10 }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
                >
                  <TiltCard className="group h-full">
                    <div
                      className="bg-white rounded-3xl overflow-hidden h-full relative border border-[#e0e7ef]/60 shadow-lg shadow-[#002A5C]/[0.04] hover:shadow-2xl hover:shadow-[#00B0F0]/[0.12] transition-shadow duration-700"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      {/* Top glass highlight line */}
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00B0F0]/40 to-transparent z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Bottom glass highlight line */}
                      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00B0F0]/30 to-transparent z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Holographic overlay on hover */}
                      <div className="absolute inset-0 holographic opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl z-10 pointer-events-none" />

                      {/* Project Visual Area */}
                      <div className={`relative h-56 bg-gradient-to-br ${projectGradients[p.num - 1]} overflow-hidden`}>
                        {/* Grid pattern overlay */}
                        <div className="absolute inset-0 grid-pattern opacity-[0.15]" />

                        {/* Actual screenshots with fade animation */}
                        {projectScreenshots[p.num] && projectScreenshots[p.num].length > 0 && (
                          <div className="absolute inset-0 z-10">
                            <AnimatePresence mode="wait">
                              <motion.div
                                key={activeScreenshot[p.num] || 0}
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.6, ease: 'easeInOut' }}
                                className="absolute inset-0"
                              >
                                <Image
                                  src={projectScreenshots[p.num][activeScreenshot[p.num] || 0]}
                                  alt={t(p.titleKey)}
                                  fill
                                  className="object-cover object-top"
                                  sizes="(max-width: 768px) 100vw, 33vw"
                                />
                              </motion.div>
                            </AnimatePresence>
                            {/* Bottom gradient for readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-20" />
                            {/* Screenshot dots indicator */}
                            {projectScreenshots[p.num].length > 1 && (
                              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5">
                                {projectScreenshots[p.num].map((_, si) => (
                                  <button
                                    key={si}
                                    onClick={(e) => { e.stopPropagation(); setActiveScreenshot(prev => ({ ...prev, [p.num]: si })); }}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                      (activeScreenshot[p.num] || 0) === si
                                        ? 'bg-white w-5'
                                        : 'bg-white/50 hover:bg-white/70'
                                    }`}
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Fallback: Floating icon if no screenshots */}
                        {!projectScreenshots[p.num] && (
                          <>
                            {/* Glassmorphism overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/[0.06]" />
                            <motion.div
                              animate={{ y: [-6, 6, -6], rotate: [-2, 2, -2] }}
                              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                              className="absolute inset-0 flex items-center justify-center z-10"
                            >
                              <div className="w-24 h-24 rounded-3xl glass flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-700">
                                <Image src={projectIcons[p.num - 1]} alt="" width={52} height={52} className="drop-shadow-2xl" />
                              </div>
                            </motion.div>
                          </>
                        )}

                        {/* Category badge — glass-strong */}
                        <div className="absolute top-4 right-4 z-20">
                          <span className="glass-strong text-white/90 text-[11px] font-bold px-3.5 py-1.5 rounded-full shadow-lg">
                            {t(filterOptions.find(fo => fo.id === t(p.catKey))?.key || 'portfolio_filter_all')}
                          </span>
                        </div>

                        {/* Hover overlay — glass effect View Project */}
                        <div className="absolute inset-0 z-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
                          <motion.div
                            initial={{ y: 20, scale: 0.9 }}
                            animate={false}
                            whileHover={{ scale: 1.05 }}
                            className="relative glass-strong text-white font-bold text-[13px] px-6 py-3 rounded-2xl shadow-2xl cursor-pointer flex items-center gap-2 border border-white/20"
                          >
                            <ExternalLink className="w-4 h-4" />
                            {t('pf_view')}
                          </motion.div>
                        </div>
                      </div>

                      {/* Project Info */}
                      <div className="p-6 relative">
                        {/* Project title */}
                        <h3 className="text-lg font-extrabold text-[#002A5C] mb-2 group-hover:text-[#00B0F0] transition-colors duration-300" style={{ transform: 'translateZ(15px)' }}>
                          {t(p.titleKey)}
                        </h3>
                        <p className="text-[#5a6a7e] text-[14px] leading-relaxed mb-4" style={{ transform: 'translateZ(10px)' }}>
                          {t(p.descKey)}
                        </p>

                        {/* Client */}
                        <div className="flex items-center gap-2 mb-3" style={{ transform: 'translateZ(10px)' }}>
                          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#002A5C] to-[#004d8a] flex items-center justify-center shadow-sm">
                            <span className="text-[10px] font-bold text-white">C</span>
                          </div>
                          <span className="text-[12px] text-[#8a96a8] font-medium">{t('pf_client')}</span>
                          <span className="text-[12px] text-[#3a4a5c] font-semibold">{t(p.clientKey)}</span>
                        </div>

                        {/* Tech stack */}
                        <div className="flex flex-wrap gap-1.5" style={{ transform: 'translateZ(10px)' }}>
                          {(t(p.techKey) as string).split(', ').map((tech, j) => (
                            <span key={j} className="text-[11px] font-semibold bg-gradient-to-br from-[#f0f4f8] to-[#e8eef4] text-[#5a6a7e] px-2.5 py-1 rounded-lg border border-[#e0e7ef]/60">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 rounded-3xl bg-[#f0f4f8] flex items-center justify-center mx-auto mb-5">
                <Layers className="w-8 h-8 text-[#8a96a8]" />
              </div>
              <p className="text-[#8a96a8] text-[16px]">No projects found</p>
            </motion.div>
          )}
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

          {/* Morphing sphere */}
          <div className="absolute top-[10%] left-[15%] w-28 h-28 bg-gradient-to-br from-[#00B0F0]/15 to-[#002A5C]/10 morph-sphere hidden lg:block" />

          {/* Floating glass icons */}
          <div className="absolute top-[25%] right-[18%] float-3d-5 hidden xl:block">
            <div className="w-12 h-12 rounded-xl glass-strong flex items-center justify-center text-[#00D4FF]/70 shadow-lg">
              <Code className="w-6 h-6" />
            </div>
          </div>
          <div className="absolute bottom-[30%] left-[12%] float-3d-4 hidden xl:block">
            <div className="w-12 h-12 rounded-xl glass-strong flex items-center justify-center text-[#00D4FF]/70 shadow-lg">
              <Palette className="w-6 h-6" />
            </div>
          </div>
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
