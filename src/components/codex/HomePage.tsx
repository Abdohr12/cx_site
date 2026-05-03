'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  Star,
  ArrowLeft,
  ArrowRight,
  Building2,
  GraduationCap,
  Store,
  Laptop,
  Sparkles,
  Shield,
  Zap,
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

export default function HomePage({ onNavigate }: HomePageProps) {
  const { t, isRTL } = useLang();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const featureIconPaths = ['/icons/3d/users.png', '/icons/3d/scheduling.png', '/icons/3d/reports.png'];
  const featureKeys: (TranslationKey)[] = ['feature_1_title', 'feature_2_title', 'feature_3_title'];
  const featureDescKeys: (TranslationKey)[] = ['feature_1_desc', 'feature_2_desc', 'feature_3_desc'];

  const trustedBy = [
    { icon: <GraduationCap className="w-5 h-5" />, key: 'trusted_1' as TranslationKey },
    { icon: <Building2 className="w-5 h-5" />, key: 'trusted_2' as TranslationKey },
    { icon: <Store className="w-5 h-5" />, key: 'trusted_3' as TranslationKey },
    { icon: <Laptop className="w-5 h-5" />, key: 'trusted_4' as TranslationKey },
  ];

  return (
    <div className="pt-[72px]">
      {/* ===== HERO ===== */}
      <section className="hero-gradient relative min-h-[95vh] flex items-center overflow-hidden">
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

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-0">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text side */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                className="mb-7"
              >
                <span className="inline-flex items-center gap-2.5 glass text-white/90 px-5 py-2.5 rounded-full text-sm font-semibold">
                  <motion.span
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  >
                    <Sparkles className="w-4 h-4 text-[#00D4FF]" />
                  </motion.span>
                  {t('hero_badge')}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
                className="text-[2.8rem] sm:text-[3.5rem] lg:text-[4rem] font-extrabold text-white leading-[1.15] mb-7"
              >
                {t('hero_title_1')}{' '}
                <span className="gradient-text">{t('hero_title_highlight')}</span>
                <br />
                {t('hero_title_2')}{' '}
                <span className="relative inline-block">
                  <span className="text-white">Codex</span>
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.8, delay: 0.8, ease: [0.23, 1, 0.32, 1] }}
                    className="absolute -bottom-1.5 right-0 h-[4px] bg-gradient-to-l from-[#00B0F0] to-[#00D4FF] rounded-full"
                  />
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
                className="text-lg sm:text-xl text-white/70 leading-[1.85] mb-10 max-w-lg"
              >
                {t('hero_desc')}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35, ease: [0.23, 1, 0.32, 1] }}
                className="flex flex-wrap gap-4 mb-10"
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
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex items-center gap-8 text-white/60 text-sm"
              >
                <span className="flex items-center gap-2.5">
                  <span className="relative flex items-center justify-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="absolute w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping opacity-30" />
                  </span>
                  {t('hero_support')}
                </span>
                <span className="flex items-center gap-2.5">
                  <Shield className="w-4 h-4 text-[#00B0F0]/70" />
                  {t('hero_no_commit')}
                </span>
              </motion.div>
            </div>

            {/* Visual side - Premium dashboard mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.23, 1, 0.32, 1] }}
              className="hidden lg:block"
            >
              <div className="relative">
                {/* Main card */}
                <motion.div
                  animate={{ y: [-4, 4, -4] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div className="glass-strong rounded-3xl p-8 relative noise">
                    <div className="shimmer absolute inset-0 rounded-3xl pointer-events-none" />

                    {/* Top stat */}
                    <div className="bg-white/[0.06] rounded-2xl p-6 mb-5 border border-white/[0.06]">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-white/60 text-sm font-medium">{t('hero_stat_month')}</span>
                        <span className="text-[#00D4FF] text-xs font-bold bg-[#00D4FF]/10 px-3 py-1.5 rounded-full border border-[#00D4FF]/20">
                          {t('hero_stat_period')}
                        </span>
                      </div>
                      <div className="text-[3rem] font-extrabold text-white leading-none mb-2 tracking-tight">
                        +127<span className="text-[#00D4FF]">%</span>
                      </div>
                      <p className="text-white/45 text-sm">{t('hero_stat_growth')}</p>
                      {/* Mini bar chart */}
                      <div className="flex items-end gap-1.5 mt-4 h-10">
                        {[40, 55, 35, 65, 50, 80, 95, 70, 85, 100, 75, 90].map((h, i) => (
                          <motion.div
                            key={i}
                            initial={{ height: 0 }}
                            animate={{ height: `${h}%` }}
                            transition={{ duration: 0.5, delay: 1 + i * 0.05, ease: [0.23, 1, 0.32, 1] }}
                            className={`flex-1 rounded-t-md ${i === 11 ? 'bg-[#00D4FF]' : 'bg-white/15'}`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Bottom stats */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/[0.06] rounded-xl p-5 border border-white/[0.06] hover:bg-white/[0.1] transition-colors duration-300">
                        <div className="flex items-center justify-between mb-3">
                          <Image src="/icons/3d/users.png" alt="" width={24} height={24} className="drop-shadow-md" />
                          <Zap className="w-4 h-4 text-emerald-400" />
                        </div>
                        <div className="text-2xl font-extrabold text-white mb-0.5">485</div>
                        <div className="text-white/40 text-xs">{t('hero_stat_trainees')}</div>
                      </div>
                      <div className="bg-white/[0.06] rounded-xl p-5 border border-white/[0.06] hover:bg-white/[0.1] transition-colors duration-300">
                        <div className="flex items-center justify-between mb-3">
                          <Image src="/icons/3d/scheduling.png" alt="" width={24} height={24} className="drop-shadow-md" />
                          <Zap className="w-4 h-4 text-emerald-400" />
                        </div>
                        <div className="text-2xl font-extrabold text-white mb-0.5">32</div>
                        <div className="text-white/40 text-xs">{t('hero_stat_sessions')}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating elements */}
                <motion.div
                  animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-6 -right-6 z-10"
                >
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#00B0F0]/30 to-[#00B0F0]/10 backdrop-blur-md border border-white/15 flex items-center justify-center p-3 shadow-xl shadow-[#00B0F0]/10">
                    <Image src="/icons/3d/hero-visual.png" alt="Dashboard" width={44} height={44} className="drop-shadow-lg" />
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [8, -8, 8], rotate: [0, -3, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-4 -left-4 z-10 glass-strong rounded-2xl px-4 py-3 shadow-xl"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-white text-xs font-bold">99.9% Uptime</div>
                      <div className="text-white/40 text-[10px]">Server Status</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
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

      {/* ===== FEATURES ===== */}
      <section className="py-24 lg:py-32 mesh-gradient relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-[#00B0F0] text-sm font-bold mb-3 uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              {t('features_badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.8rem] font-extrabold text-[#002A5C] mb-5 leading-tight">
              {t('features_title')}
            </h2>
            <p className="text-[#5a6a7e] max-w-2xl mx-auto text-[18px] leading-relaxed">
              {t('features_desc')}
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-7">
            {[0, 1, 2].map((i) => (
              <FadeInScale key={i} delay={i * 0.15}>
                <div className="card-3d bg-white rounded-3xl p-8 shadow-sm border border-[#e0e7ef]/80 h-full group relative overflow-hidden">
                  {/* Subtle gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00B0F0]/0 to-[#002A5C]/0 group-hover:from-[#00B0F0]/3 group-hover:to-[#002A5C]/2 transition-all duration-500 rounded-3xl" />

                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl icon-container flex items-center justify-center mb-6 group-hover:icon-container-hover">
                      <Image src={featureIconPaths[i]} alt="" width={36} height={36} className="drop-shadow-lg" />
                    </div>
                    <h3 className="text-xl font-extrabold text-[#002A5C] mb-3 group-hover:text-[#002A5C] transition-colors">
                      {t(featureKeys[i])}
                    </h3>
                    <p className="text-[#5a6a7e] leading-relaxed text-[15px]">
                      {t(featureDescKeys[i])}
                    </p>
                  </div>
                </div>
              </FadeInScale>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIAL ===== */}
      <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
        {/* Decorative bg elements */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#00B0F0]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#002A5C]/5 rounded-full blur-[100px]" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <div className="relative bg-gradient-to-br from-[#f8fafc] to-white rounded-[2rem] p-10 lg:p-14 border border-[#e0e7ef]/60 shadow-lg shadow-[#002A5C]/[0.04]">
                {/* Quote decoration */}
                <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#002A5C] to-[#004d8a] flex items-center justify-center shadow-lg shadow-[#002A5C]/20">
                    <span className="text-white text-lg font-bold">&ldquo;</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-1.5 mb-7">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                    >
                      <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                    </motion.div>
                  ))}
                </div>

                <p className="text-xl lg:text-[22px] font-medium text-[#002A5C] leading-[2] mb-8">
                  {t('testimonial_text')}
                </p>

                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#002A5C] to-[#004d8a] flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-[#002A5C]/20">
                    {t('testimonial_name').charAt(0)}
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-[#002A5C] text-[15px]">{t('testimonial_name')}</div>
                    <div className="text-[#8a96a8] text-[13px]">{t('testimonial_role')}</div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
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
              Get Started Today
            </motion.div>

            <h2 className="text-3xl sm:text-4xl lg:text-[2.8rem] font-extrabold text-white mb-6 leading-tight">
              {t('cta_title')}
            </h2>
            <p className="text-lg sm:text-xl text-white/65 mb-10 max-w-2xl mx-auto leading-relaxed">
              {t('cta_desc')}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Button
                  size="lg"
                  onClick={() => onNavigate('contact')}
                  className="bg-white text-[#002A5C] hover:bg-white/95 font-bold rounded-2xl px-8 py-4 text-[17px] shadow-2xl transition-all duration-300 cursor-pointer"
                >
                  {t('cta_btn')}
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
                  {t('cta_btn2')}
                </Button>
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
