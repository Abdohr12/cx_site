'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Target, Heart, Sparkles, Award } from 'lucide-react';
import Image from 'next/image';
import { useLang } from '@/lib/LanguageContext';
import type { TranslationKey } from '@/lib/i18n';

function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.23, 1, 0.32, 1] }} className={className}>
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
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 25);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} className="text-4xl lg:text-5xl font-extrabold gradient-text">
      {count}{suffix}
    </span>
  );
}

export default function AboutPage() {
  const { t } = useLang();

  const teamNames: TranslationKey[] = ['team_1_name', 'team_2_name', 'team_3_name', 'team_4_name'];
  const teamRoles: TranslationKey[] = ['team_1_role', 'team_2_role', 'team_3_role', 'team_4_role'];
  const teamBgs = [
    'from-[#002A5C] to-[#004d8a]',
    'from-[#00B0F0] to-[#0098d4]',
    'from-[#002A5C] to-[#004d8a]',
    'from-[#00B0F0] to-[#0098d4]',
  ];

  const valueIconPaths = ['/icons/3d/innovation.png', '/icons/3d/trust.png', '/icons/3d/dashboard.png'];
  const valueTitleKeys: TranslationKey[] = ['val_1_title', 'val_2_title', 'val_3_title'];
  const valueDescKeys: TranslationKey[] = ['val_1_desc', 'val_2_desc', 'val_3_desc'];

  const statLabelKeys: TranslationKey[] = ['stat_1', 'stat_2', 'stat_3', 'stat_4'];

  return (
    <div className="pt-[72px]">
      {/* Header */}
      <section className="hero-gradient py-20 lg:py-28 relative overflow-hidden">
        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/10 to-black/25 pointer-events-none" />
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#00B0F0]/15 rounded-full blur-[140px] orb" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-[#00B0F0]/8 rounded-full blur-[120px] orb-delay" />
        <div className="absolute inset-0 grid-pattern opacity-[0.3]" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}>
            <span className="inline-flex items-center gap-2 bg-white/[0.12] backdrop-blur-xl border border-white/[0.2] text-white px-5 py-2.5 rounded-full text-sm font-semibold mb-6 shadow-lg">
              <Award className="w-4 h-4 text-[#00D4FF]" />
              {t('about_badge')}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">
              {t('about_title')}{' '}
              <span className="text-[#00D4FF] drop-shadow-[0_2px_12px_rgba(0,176,240,0.5)]">{t('about_title_hl')}</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]">
              {t('about_desc')}
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full">
            <path d="M0 60V30C240 0 480 50 720 30C960 10 1200 50 1440 30V60H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <FadeIn>
              <span className="inline-flex items-center gap-2 text-[#00B0F0] text-sm font-bold mb-3 uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                {t('story_badge')}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#002A5C] mb-7 leading-tight">{t('story_title')}</h2>
              <div className="space-y-5 text-[#5a6a7e] leading-[1.9] text-[15px]">
                <p>{t('story_p1')}</p>
                <p>{t('story_p2')}</p>
                <p>{t('story_p3')}</p>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="relative">
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-gradient-to-br from-[#001a3d] via-[#002A5C] to-[#004d8a] rounded-3xl p-9 lg:p-11 text-white relative overflow-hidden noise">
                    <div className="absolute inset-0 grid-pattern opacity-[0.2]" />
                    <div className="relative">
                      <div className="w-16 h-16 rounded-2xl bg-[#00B0F0]/15 flex items-center justify-center mb-6">
                        <Image src="/icons/3d/rocket.png" alt="Rocket" width={40} height={40} className="drop-shadow-lg" />
                      </div>
                      <h3 className="text-2xl font-extrabold mb-4">{t('story_mission')}</h3>
                      <p className="text-white/70 leading-[1.9] mb-6 text-[15px]">
                        &ldquo;{t('story_mission_text')}&rdquo;
                      </p>
                      <p className="text-sm text-white/40 font-medium">{t('story_team')}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#00B0F0]/10 rounded-3xl -z-10" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#002A5C]/8 rounded-3xl -z-10" />
                <motion.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-3 -left-3 w-10 h-10 rounded-xl bg-gradient-to-br from-[#00B0F0] to-[#0098d4] -z-10 flex items-center justify-center"
                >
                  <Award className="w-5 h-5 text-white" />
                </motion.div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 lg:py-28 mesh-gradient">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-[#00B0F0] text-sm font-bold mb-3 uppercase tracking-wider">
              <Target className="w-4 h-4" />
              {t('vm_badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.8rem] font-extrabold text-[#002A5C] mb-5 leading-tight">{t('vm_title')}</h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-7 max-w-4xl mx-auto">
            <FadeIn delay={0.1}>
              <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.3 }}>
                <div className="card-3d bg-white rounded-3xl p-8 shadow-sm border border-[#e0e7ef]/80 h-full">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#002A5C] to-[#004d8a] flex items-center justify-center mb-6 shadow-lg shadow-[#002A5C]/15">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-extrabold text-[#002A5C] mb-4">{t('vm_vision_title')}</h3>
                  <p className="text-[#5a6a7e] leading-relaxed text-[15px]">{t('vm_vision')}</p>
                </div>
              </motion.div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.3 }}>
                <div className="card-3d bg-white rounded-3xl p-8 shadow-sm border border-[#e0e7ef]/80 h-full">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00B0F0] to-[#0098d4] flex items-center justify-center mb-6 shadow-lg shadow-[#00B0F0]/20">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-extrabold text-[#002A5C] mb-4">{t('vm_mission_title')}</h3>
                  <p className="text-[#5a6a7e] leading-relaxed text-[15px]">{t('vm_mission')}</p>
                </div>
              </motion.div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-[#00B0F0] text-sm font-bold mb-3 uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              {t('values_badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.8rem] font-extrabold text-[#002A5C] mb-5 leading-tight">{t('values_title')}</h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-7">
            {valueIconPaths.map((icon, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.23, 1, 0.32, 1] }}
                whileHover={{ y: -6 }}
              >
                <div className="card-3d bg-gradient-to-br from-[#f8fafc] to-white rounded-3xl p-8 border border-[#e0e7ef]/60 h-full group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00B0F0]/0 to-[#002A5C]/0 group-hover:from-[#00B0F0]/4 group-hover:to-[#002A5C]/3 transition-all duration-500 rounded-3xl" />
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl icon-container flex items-center justify-center mb-6 group-hover:icon-container-hover">
                      <Image src={icon} alt="" width={36} height={36} className="drop-shadow-lg" />
                    </div>
                    <h3 className="text-xl font-extrabold text-[#002A5C] mb-3">{t(valueTitleKeys[i])}</h3>
                    <p className="text-[#5a6a7e] leading-relaxed text-[15px]">{t(valueDescKeys[i])}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 lg:py-28 mesh-gradient">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-[#00B0F0] text-sm font-bold mb-3 uppercase tracking-wider">
              <Award className="w-4 h-4" />
              {t('team_badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.8rem] font-extrabold text-[#002A5C] mb-5 leading-tight">{t('team_title')}</h2>
            <p className="text-[#5a6a7e] max-w-2xl mx-auto text-[18px] leading-relaxed">{t('team_desc')}</p>
          </FadeIn>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {teamNames.map((nameKey, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
                whileHover={{ y: -6 }}
              >
                <div className="bg-white rounded-3xl p-7 shadow-sm border border-[#e0e7ef]/80 text-center group hover:border-[#00B0F0]/20 transition-all duration-300">
                  <div className={`w-20 h-20 bg-gradient-to-br ${teamBgs[i]} rounded-3xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-5 shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                    {t(nameKey).charAt(0)}
                  </div>
                  <h3 className="font-extrabold text-[#002A5C] text-[16px] mb-1">{t(nameKey)}</h3>
                  <p className="text-[#8a96a8] text-[13px] font-medium">{t(teamRoles[i])}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="cta-gradient py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-[120px] orb" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-[#00B0F0]/8 rounded-full blur-[150px] orb-delay" />
        <div className="absolute inset-0 grid-pattern opacity-[0.3]" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
              {[
                { number: 50, suffix: '+' },
                { number: 200, suffix: '+' },
                { number: 98, suffix: '%' },
                { number: 5, suffix: '+' },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <AnimatedCounter target={s.number} suffix={s.suffix} />
                  <p className="text-white/60 mt-3 text-[15px] font-medium">{t(statLabelKeys[i])}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        <div className="absolute top-0 left-0 right-0 rotate-180">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full">
            <path d="M0 60V30C240 0 480 50 720 30C960 10 1200 50 1440 30V60H0Z" fill="#f8fafc" />
          </svg>
        </div>
      </section>
    </div>
  );
}
