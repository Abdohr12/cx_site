'use client';

import { useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import {
  ArrowLeft, ArrowRight, Sparkles, ExternalLink, Check,
  Star, Shield, Zap, Clock, Users, BarChart3, FileText,
  ChevronLeft, ChevronRight, Award, Layers, GraduationCap, Receipt,
} from 'lucide-react';
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
const projectIcons = {
  1: { component: GraduationCap, gradient: 'from-[#002A5C] via-[#004d8a] to-[#00B0F0]', accent: '#00B0F0' },
  2: { component: Receipt, gradient: 'from-[#00B0F0] via-[#0098d4] to-[#002A5C]', accent: '#00D4FF' },
} as const;

const projectsData: Record<number, {
  titleKey: TranslationKey; descKey: TranslationKey; techKey: TranslationKey; clientKey: TranslationKey;
  screenshots: string[]; featureKeys: TranslationKey[]; featureIcons: typeof Users[];
  gradient: string; accentColor: string;
}> = {
  1: {
    titleKey: 'pf_1_title', descKey: 'pf_1_desc', techKey: 'pf_1_tech', clientKey: 'pf_1_client',
    screenshots: [
      '/portfolio/partier-portfolio/pp_1.png', '/portfolio/partier-portfolio/pp_2.png',
      '/portfolio/partier-portfolio/pp_3.png', '/portfolio/partier-portfolio/pp_4.png',
      '/portfolio/partier-portfolio/pp_7.png', '/portfolio/partier-portfolio/pp_8.png',
    ],
    featureKeys: ['pf_1_feat_1', 'pf_1_feat_2', 'pf_1_feat_3', 'pf_1_feat_4'],
    featureIcons: [Users, Clock, FileText, BarChart3],
    gradient: 'from-[#002A5C] via-[#004d8a] to-[#00B0F0]', accentColor: '#00B0F0',
  },
  2: {
    titleKey: 'pf_2_title', descKey: 'pf_2_desc', techKey: 'pf_2_tech', clientKey: 'pf_2_client',
    screenshots: [
      '/portfolio/saas-factures/image1.png', '/portfolio/saas-factures/image2.png',
      '/portfolio/saas-factures/image3.png', '/portfolio/saas-factures/image4.png',
      '/portfolio/saas-factures/image5.png',
    ],
    featureKeys: ['pf_2_feat_1', 'pf_2_feat_2', 'pf_2_feat_3', 'pf_2_feat_4'],
    featureIcons: [FileText, BarChart3, Users, Shield],
    gradient: 'from-[#00B0F0] via-[#0098d4] to-[#002A5C]', accentColor: '#00D4FF',
  },
};

interface ProjectDetailPageProps {
  projectId: number;
  onNavigate: (page: string) => void;
}

/* ===== MAIN ===== */
export default function ProjectDetailPage({ projectId, onNavigate }: ProjectDetailPageProps) {
  const { t, isRTL } = useLang();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;
  const BackArrow = isRTL ? ArrowRight : ArrowLeft;
  const project = projectsData[projectId];
  const iconData = projectIcons[projectId];
  const IconComp = iconData.component;

  if (!project) {
    return (
      <div className="pt-[72px] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Layers className="w-16 h-16 text-[#8a96a8] mx-auto mb-4" />
          <p className="text-[#8a96a8] text-lg">Project not found</p>
          <Button onClick={() => onNavigate('portfolio')} className="mt-4 cursor-pointer">Back to Portfolio</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-[72px]">
      {/* ===== HERO ===== */}
      <section className={`aurora-bg py-20 lg:py-28 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50 pointer-events-none" />

        {/* 3D shapes */}
        <div className="absolute inset-0 scene-3d pointer-events-none">
          <div className="absolute top-[15%] right-[8%] float-3d-1 hidden lg:block">
            <FloatingCube size={60} color={iconData.accent} />
          </div>
          <div className="absolute top-[60%] right-[5%] float-3d-2 hidden lg:block">
            <FloatingCube size={40} color="#002A5C" />
          </div>
          <div className="absolute top-[20%] left-[8%] float-3d-3 hidden lg:block">
            <FloatingCube size={50} color="#00D4FF" />
          </div>
          <div className="absolute bottom-[15%] left-[5%] float-3d-4 hidden lg:block">
            <FloatingCube size={35} color={iconData.accent} />
          </div>
          <div className="absolute top-[40%] right-[20%] w-20 h-20 ring-3d hidden lg:block" />
        </div>

        <ParticleField />
        <div className="absolute inset-0 grid-pattern opacity-[0.2]" />

        {/* Back button */}
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.button
            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => onNavigate('portfolio')}
            className="inline-flex items-center gap-2.5 glass-strong text-white px-5 py-2.5 rounded-xl text-sm font-semibold mb-8 shadow-lg hover:bg-white/20 transition-all duration-300 cursor-pointer border border-white/10"
          >
            <BackArrow className="w-4 h-4" />
            {isRTL ? 'العودة للمشاريع' : 'Retour aux projets'}
          </motion.button>

          {/* Title area */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12"
          >
            {/* Circular icon */}
            <div className="relative flex-shrink-0">
              <div className="absolute inset-[-10px] rounded-full bg-gradient-to-br from-white/10 to-transparent animate-pulse" />
              <div className="absolute inset-[-5px] rounded-full border-2 border-dashed border-white/20" style={{ animation: 'spin 20s linear infinite' }} />
              <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${iconData.gradient} flex items-center justify-center shadow-2xl relative z-10`}>
                <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-sm" />
                <IconComp className="w-14 h-14 text-white relative z-10 drop-shadow-lg" />
              </div>
              <motion.div
                animate={{ y: [-3, 3, -3], rotate: [0, 15, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-1 -right-1 z-20"
              >
                <div className="w-8 h-8 rounded-full bg-[#00D4FF] flex items-center justify-center shadow-lg">
                  <Star className="w-4 h-4 text-white fill-white" />
                </div>
              </motion.div>
            </div>

            {/* Text */}
            <div className="text-center lg:text-left text-white">
              <div className="flex items-center gap-3 justify-center lg:justify-start mb-4">
                <span className="glass-strong text-[#00D4FF] text-sm font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                  #{String(projectId).padStart(2, '0')} {isRTL ? 'مشروع' : 'Projet'}
                </span>
                <span className="glass-strong text-white/90 text-sm font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#00D4FF]" />
                  {isRTL ? 'مشروع مميز' : 'Projet phare'}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-[3rem] font-extrabold mb-4 leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
                {t(project.titleKey)}
              </h1>
              <p className="text-lg text-white/85 max-w-2xl leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.3)]">
                {t(project.descKey)}
              </p>
              {/* Tech stack */}
              <div className="flex flex-wrap gap-2 mt-6 justify-center lg:justify-start">
                {(t(project.techKey) as string).split(', ').map((tech, i) => (
                  <span key={i} className="text-[12px] font-bold bg-white/15 backdrop-blur-sm text-white px-3.5 py-1.5 rounded-lg border border-white/20">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full">
            <path d="M0 80V40C180 0 360 60 540 40C720 20 900 70 1080 40C1260 10 1380 50 1440 40V80H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ===== SCREENSHOTS GALLERY ===== */}
      <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-[#002A5C]/5 px-4 py-2 rounded-full mb-4">
                <Sparkles className="w-4 h-4 text-[#00B0F0]" />
                <span className="text-sm font-bold text-[#002A5C]">
                  {isRTL ? 'معرض الصور' : 'Galerie de captures'}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002A5C]">
                {isRTL ? 'شوف المشروع من قريب' : 'Découvrez le projet en détail'}
              </h2>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {project.screenshots.map((src, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className={`group relative rounded-2xl overflow-hidden shadow-lg border border-[#e0e7ef]/50 hover:shadow-2xl hover:shadow-[#00B0F0]/10 transition-all duration-500 hover:-translate-y-1 cursor-pointer ${
                    i === 0 ? 'sm:col-span-2 lg:col-span-2 aspect-[16/9]' : 'aspect-[4/3]'
                  }`}
                >
                  <Image
                    src={src}
                    alt={`${t(project.titleKey)} - ${i + 1}`}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    sizes={i === 0 ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="glass-strong text-white text-[11px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                      <ExternalLink className="w-3 h-3" />
                      #{i + 1}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-[#f8fafc] relative overflow-hidden">
        <div className="absolute inset-0 holographic opacity-50" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-[#002A5C]/5 px-4 py-2 rounded-full mb-4">
                <Zap className="w-4 h-4 text-[#00B0F0]" />
                <span className="text-sm font-bold text-[#002A5C]">{t('pf_features' as TranslationKey)}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002A5C]">
                {isRTL ? 'الميزات الرئيسية' : 'Fonctionnalités principales'}
              </h2>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {project.featureKeys.map((featKey, i) => {
              const FeatIcon = project.featureIcons[i];
              return (
                <FadeIn key={featKey} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -4, scale: 1.01 }}
                    className="bg-white rounded-2xl p-6 border border-[#e0e7ef]/50 shadow-md hover:shadow-xl hover:shadow-[#00B0F0]/8 transition-all duration-500 group relative overflow-hidden"
                  >
                    {/* Subtle gradient accent on hover */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#002A5C] via-[#00B0F0] to-[#00D4FF] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#002A5C] to-[#004d8a] flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg group-hover:shadow-[#00B0F0]/15 transition-shadow">
                        <FeatIcon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-[15px] font-bold text-[#002A5C] mb-1.5 group-hover:text-[#00B0F0] transition-colors">
                          {t(featKey)}
                        </h3>
                        <p className="text-[13px] text-[#8a96a8] leading-relaxed">
                          {i === 0 && (isRTL ? 'إدارة كاملة للمستخدمين مع لوحة تحكم متقدمة' : 'Gestion complète des utilisateurs avec tableau de bord avancé')}
                          {i === 1 && (isRTL ? 'تتبع شامل ومتقدم لجميع العمليات الحية' : 'Suivi complet et avancé de toutes les opérations en temps réel')}
                          {i === 2 && (isRTL ? 'نظام ذكي لإدارة البيانات والتقارير التفصيلية' : 'Système intelligent de gestion des données et rapports détaillés')}
                          {i === 3 && (isRTL ? 'تحليلات متقدمة مع تصدير تقارير متنوعة' : 'Analyses avancées avec export de rapports variés')}
                        </p>
                      </div>
                    </div>
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <Check className="w-4 h-4 text-[#00B0F0]" />
                    </div>
                  </motion.div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== CLIENT INFO + PRICING ===== */}
      <section className="py-16 lg:py-20 bg-white relative">
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="bg-gradient-to-br from-[#001d42] via-[#002A5C] to-[#004080] rounded-3xl p-8 lg:p-12 relative overflow-hidden shadow-2xl">
              {/* Background decorations */}
              <div className="absolute inset-0 grid-pattern opacity-[0.08]" />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#00B0F0]/10 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-[#00D4FF]/10 blur-3xl" />

              <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
                {/* Client info */}
                <div className="text-center lg:text-left">
                  <p className="text-white/50 text-[12px] font-semibold uppercase tracking-wider mb-3">{t('pf_client')}</p>
                  <div className="flex items-center gap-3 justify-center lg:justify-start mb-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/10">
                      <Users className="w-5 h-5 text-[#00D4FF]" />
                    </div>
                    <span className="text-white text-lg font-bold">{t(project.clientKey)}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4 justify-center lg:justify-start">
                    {(t(project.techKey) as string).split(', ').map((tech, i) => (
                      <span key={i} className="text-[11px] font-bold bg-white/10 text-white/80 px-3 py-1 rounded-lg">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="hidden lg:block w-px h-24 bg-white/10" />
                <div className="lg:hidden w-48 h-px bg-white/10" />

                {/* Price */}
                <div className="text-center">
                  <motion.div
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="glass-strong rounded-2xl px-8 py-6 border border-white/10 inline-block"
                  >
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#00B0F0] to-[#00D4FF] flex items-center justify-center mx-auto mb-3 shadow-lg shadow-[#00B0F0]/30">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-[11px] text-white/50 font-semibold uppercase tracking-wider mb-1">{t('pf_price_label' as TranslationKey)}</p>
                    <p className="text-xl font-extrabold text-white">{t('pf_price_value' as TranslationKey)}</p>
                  </motion.div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="aurora-bg py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none" />
        <div className="absolute inset-0 grid-pattern opacity-[0.2]" />
        <ParticleField />

        {/* Top wave */}
        <div className="absolute top-0 left-0 right-0 rotate-180">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full">
            <path d="M0 80V40C180 0 360 60 540 40C720 20 900 70 1080 40C1260 10 1380 50 1440 40V80H0Z" fill="white" />
          </svg>
        </div>

        <div className="relative max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]">
              {t('portfolio_cta_title')}
            </h2>
            <p className="text-lg text-white/85 mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.3)]">
              {t('portfolio_cta_desc')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Button
                  size="lg"
                  onClick={() => onNavigate('contact')}
                  className="bg-white text-[#002A5C] hover:bg-white/95 font-bold rounded-2xl px-8 py-4 text-[16px] shadow-2xl transition-all duration-300 cursor-pointer flex items-center gap-2"
                >
                  {t('portfolio_cta_btn')}
                  <ArrowIcon className="w-5 h-5" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => onNavigate('portfolio')}
                  className="bg-transparent border-2 border-white/30 text-white hover:bg-white/10 font-bold rounded-2xl px-8 py-4 text-[16px] transition-all duration-300 cursor-pointer flex items-center gap-2"
                >
                  <BackArrow className="w-5 h-5" />
                  {isRTL ? 'جميع المشاريع' : 'Tous les projets'}
                </Button>
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
