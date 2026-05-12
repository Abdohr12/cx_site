'use client';

import { useState, useRef, useEffect, MouseEvent } from 'react';
import { motion, useInView, useMotionValue, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft, ArrowRight, Sparkles, ExternalLink,
  GraduationCap, Receipt, Check, Star, Shield, Award,
  Zap, Users, BarChart3, FileText, Layers, Globe,
} from 'lucide-react';
import Image from 'next/image';
import { useLang } from '@/lib/LanguageContext';
import type { TranslationKey } from '@/lib/i18n';

/* ===== HELPERS ===== */
function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay, ease: [0.23, 1, 0.32, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

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

function ParticleField() {
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100,
    size: Math.random() * 4 + 2, duration: Math.random() * 6 + 4,
    delay: Math.random() * 5, opacity: Math.random() * 0.4 + 0.2,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ perspective: 800 }}>
      {particles.map(p => (
        <div key={p.id} className="absolute rounded-full particle-3d"
          style={{
            left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size,
            background: `radial-gradient(circle, #00D4FF 0%, transparent 70%)`,
            opacity: p.opacity,
            '--px': '0px', '--py': '-100px', '--pz': '0px',
            '--duration': `${p.duration}s`, '--delay': `${p.delay}s`,
          } as React.CSSProperties} />
      ))}
    </div>
  );
}

/* ===== DATA ===== */
interface PortfolioPageProps {
  onNavigate: (page: string, data?: number) => void;
}

const projects = [
  {
    id: 1,
    titleKey: 'pf_1_title' as TranslationKey,
    descKey: 'pf_1_desc' as TranslationKey,
    techKey: 'pf_1_tech' as TranslationKey,
    clientKey: 'pf_1_client' as TranslationKey,
    IconComponent: GraduationCap,
    screenshots: ['/portfolio/partier-portfolio/pp_1.png', '/portfolio/partier-portfolio/pp_2.png', '/portfolio/partier-portfolio/pp_3.png'],
    featureKeys: ['pf_1_feat_1', 'pf_1_feat_2', 'pf_1_feat_3', 'pf_1_feat_4'] as TranslationKey[],
    featureIcons: [Users, FileText, Shield, BarChart3],
    gradient: 'from-[#002A5C] via-[#004d8a] to-[#00B0F0]',
    accent: '#00B0F0',
  },
  {
    id: 2,
    titleKey: 'pf_2_title' as TranslationKey,
    descKey: 'pf_2_desc' as TranslationKey,
    techKey: 'pf_2_tech' as TranslationKey,
    clientKey: 'pf_2_client' as TranslationKey,
    IconComponent: Receipt,
    screenshots: ['/portfolio/saas-factures/image1.png', '/portfolio/saas-factures/image2.png', '/portfolio/saas-factures/image3.png'],
    featureKeys: ['pf_2_feat_1', 'pf_2_feat_2', 'pf_2_feat_3', 'pf_2_feat_4'] as TranslationKey[],
    featureIcons: [FileText, BarChart3, Users, Shield],
    gradient: 'from-[#00B0F0] via-[#0098d4] to-[#002A5C]',
    accent: '#00D4FF',
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
      {/* ===== HERO ===== */}
      <section className="aurora-bg py-24 lg:py-36 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40 pointer-events-none" />

        {/* 3D Scene */}
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
        </div>

        <ParticleField />
        <div className="absolute inset-0 grid-pattern opacity-[0.3]" />

        {/* Content */}
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

      {/* ===== STATS ===== */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="absolute inset-0 holographic" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {statData.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-gradient-to-br from-[#001d42] via-[#002A5C] to-[#004080] rounded-2xl p-7 text-center relative overflow-hidden glow-pulse-3d cursor-default"
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <div className="absolute inset-0 grid-pattern opacity-[0.1]" />
                <div className="relative">
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
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROJECTS ===== */}
      <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
        {/* Subtle background */}
        <div className="absolute inset-0 scene-3d pointer-events-none">
          <div className="absolute top-[10%] right-[3%] float-3d-2 hidden lg:block">
            <FloatingCube size={40} color="#00B0F0" />
          </div>
          <div className="absolute bottom-[15%] left-[3%] float-3d-4 hidden lg:block">
            <FloatingCube size={35} color="#002A5C" />
          </div>
        </div>
        <div className="absolute inset-0 holographic" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section header */}
          <FadeIn className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#002A5C]/5 px-4 py-2 rounded-full mb-4">
              <Star className="w-4 h-4 text-[#00B0F0]" />
              <span className="text-sm font-bold text-[#002A5C]">
                {isRTL ? 'مشاريعنا' : 'Nos Projets'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002A5C] mb-4">
              {isRTL ? 'تعرّف على مشاريعنا' : 'Découvrez nos projets'}
            </h2>
            <p className="text-[#5a6a7e] max-w-xl mx-auto">
              {isRTL ? 'هذه المشاريع تعكس خبرتنا وجودة عملنا' : 'Ces projets reflètent notre expertise et la qualité de notre travail'}
            </p>
          </FadeIn>

          {/* Project Cards */}
          <div className="space-y-12 lg:space-y-16">
            {projects.map((project, index) => {
              const isReversed = index % 2 !== 0;
              const IconComp = project.IconComponent;

              return (
                <FadeIn key={project.id} delay={0.1}>
                  <motion.div
                    onClick={() => onNavigate('project-detail', project.id)}
                    className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-12 items-stretch cursor-pointer group`}
                  >
                    {/* ===== Screenshot Card ===== */}
                    <div className="w-full lg:w-1/2">
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl shadow-[#002A5C]/8 border border-[#e0e7ef]/40 group-hover:shadow-2xl group-hover:shadow-[#00B0F0]/12 transition-all duration-700">
                        {/* Background gradient */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />
                        <div className="absolute inset-0 grid-pattern opacity-[0.08]" />

                        {/* Screenshot */}
                        <div className="absolute inset-0 z-10">
                          <Image
                            src={project.screenshots[0]}
                            alt={t(project.titleKey)}
                            fill
                            className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/5" />
                        </div>

                        {/* Badges */}
                        <div className="absolute top-4 left-4 z-20">
                          <span className="glass-strong text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                            <span className="text-[#00D4FF]">#{String(project.id).padStart(2, '0')}</span>
                          </span>
                        </div>
                        <div className="absolute top-4 right-4 z-20">
                          <span className="glass-strong text-[#00D4FF] px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 text-[11px] font-bold">
                            <Award className="w-3.5 h-3.5" />
                            {isRTL ? 'مميز' : 'Phare'}
                          </span>
                        </div>

                        {/* Hover overlay with "See details" */}
                        <div className="absolute inset-0 z-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                          <div className="absolute inset-0 bg-[#002A5C]/40 backdrop-blur-sm" />
                          <motion.div
                            initial={{ y: 15, scale: 0.95 }}
                            whileHover={{ scale: 1.05 }}
                            className="relative bg-white text-[#002A5C] font-bold text-[14px] px-7 py-3.5 rounded-2xl shadow-2xl flex items-center gap-2.5"
                          >
                            {isRTL ? 'شوف التفاصيل' : 'Voir les détails'}
                            <ArrowIcon className="w-4 h-4" />
                          </motion.div>
                        </div>
                      </div>
                    </div>

                    {/* ===== Info Card ===== */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center">
                      <div className={`${isReversed ? 'lg:text-right' : 'lg:text-left'} text-center`}>
                        {/* Circular icon */}
                        <div className={`flex ${isReversed ? 'lg:justify-end' : 'lg:justify-start'} justify-center mb-6`}>
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            whileInView={{ scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, type: 'spring', stiffness: 150 }}
                            className="relative"
                          >
                            <div className="absolute inset-[-6px] rounded-full bg-gradient-to-br from-[#00B0F0]/15 to-transparent animate-pulse" />
                            <div className="absolute inset-[-3px] rounded-full border-2 border-dashed border-[#00B0F0]/20" style={{ animation: 'spin 20s linear infinite' }} />
                            <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${project.gradient} flex items-center justify-center shadow-xl relative z-10`}>
                              <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-sm" />
                              <IconComp className="w-10 h-10 text-white relative z-10 drop-shadow-lg" />
                            </div>
                            <motion.div
                              animate={{ y: [-2, 2, -2], rotate: [0, 10, 0] }}
                              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                              className="absolute -top-1 -right-1 z-20"
                            >
                              <div className="w-6 h-6 rounded-full bg-[#00D4FF] flex items-center justify-center shadow-md shadow-[#00D4FF]/30">
                                <Star className="w-3 h-3 text-white fill-white" />
                              </div>
                            </motion.div>
                          </motion.div>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl sm:text-2xl lg:text-[1.75rem] font-extrabold text-[#002A5C] mb-3 leading-tight group-hover:text-[#00B0F0] transition-colors duration-300">
                          {t(project.titleKey)}
                        </h3>

                        {/* Description */}
                        <p className="text-[#5a6a7e] text-[14px] sm:text-[15px] leading-[1.8] mb-6 max-w-lg mx-auto lg:mx-0">
                          {t(project.descKey)}
                        </p>

                        {/* Features mini list */}
                        <div className={`flex flex-wrap gap-2 mb-6 ${isReversed ? 'lg:justify-end' : 'lg:justify-start'} justify-center`}>
                          {project.featureKeys.map((featKey, fi) => {
                            const FeatIcon = project.featureIcons[fi];
                            return (
                              <div
                                key={featKey}
                                className="flex items-center gap-2 bg-[#f8fafc] rounded-lg px-3 py-2 border border-[#e0e7ef]/40 group-hover:border-[#00B0F0]/20 transition-colors duration-300"
                              >
                                <FeatIcon className="w-3.5 h-3.5 text-[#00B0F0] flex-shrink-0" />
                                <span className="text-[12px] font-semibold text-[#3a4a5c]">{t(featKey)}</span>
                              </div>
                            );
                          })}
                        </div>

                        {/* Tech + Client + Price */}
                        <div className={`flex flex-wrap items-center gap-3 mb-6 ${isReversed ? 'lg:justify-end' : 'lg:justify-start'} justify-center`}>
                          {(t(project.techKey) as string).split(', ').map((tech, ti) => (
                            <span key={ti} className="text-[11px] font-bold bg-[#002A5C] text-white px-2.5 py-1 rounded-md">
                              {tech}
                            </span>
                          ))}
                          <span className="text-[#c0c8d4]">|</span>
                          <span className="text-[12px] text-[#8a96a8]">{t('pf_client')}: <strong className="text-[#3a4a5c]">{t(project.clientKey)}</strong></span>
                        </div>

                        {/* CTA */}
                        <div className={`flex items-center gap-3 ${isReversed ? 'lg:justify-end' : 'lg:justify-start'} justify-center`}>
                          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                            <Button
                              size="lg"
                              onClick={(e) => { e.stopPropagation(); onNavigate('project-detail', project.id); }}
                              className={`bg-gradient-to-r ${project.gradient} text-white font-bold rounded-xl px-7 py-3 text-[14px] shadow-lg shadow-[#002A5C]/10 hover:shadow-xl hover:shadow-[#00B0F0]/15 transition-all duration-300 cursor-pointer flex items-center gap-2`}
                            >
                              {isRTL ? 'شوف التفاصيل' : 'Voir les détails'}
                              <ArrowIcon className="w-4 h-4" />
                            </Button>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                            <Button
                              size="lg"
                              variant="outline"
                              onClick={(e) => { e.stopPropagation(); onNavigate('contact'); }}
                              className="border-2 border-[#002A5C]/15 text-[#002A5C] hover:bg-[#002A5C] hover:text-white font-bold rounded-xl px-7 py-3 text-[14px] transition-all duration-300 cursor-pointer flex items-center gap-2"
                            >
                              {t('pf_price_label' as TranslationKey)}: {t('pf_price_value' as TranslationKey)}
                              <Sparkles className="w-4 h-4 text-[#00B0F0]" />
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Divider */}
                  {index < projects.length - 1 && (
                    <div className="flex items-center justify-center mt-12 lg:mt-16">
                      <div className="h-px bg-gradient-to-r from-transparent via-[#00B0F0]/20 to-transparent w-full max-w-sm" />
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                        className="mx-4 w-8 h-8 rounded-full bg-gradient-to-br from-[#002A5C] to-[#00B0F0] flex items-center justify-center shadow-md"
                      >
                        <Zap className="w-4 h-4 text-white" />
                      </motion.div>
                      <div className="h-px bg-gradient-to-r from-transparent via-[#00B0F0]/20 to-transparent w-full max-w-sm" />
                    </div>
                  )}
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="aurora-bg py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 scene-3d pointer-events-none">
          <div className="absolute top-[15%] right-[10%] float-3d-2 hidden lg:block">
            <FloatingCube size={55} color="#00B0F0" />
          </div>
          <div className="absolute bottom-[20%] left-[8%] float-3d-3 hidden lg:block">
            <FloatingCube size={45} color="#002A5C" />
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none" />
        <div className="absolute inset-0 grid-pattern opacity-[0.25]" />
        <ParticleField />

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
