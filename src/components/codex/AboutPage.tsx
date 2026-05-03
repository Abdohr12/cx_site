'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Target, Heart } from 'lucide-react';
import Image from 'next/image';
import { useLang } from '@/lib/LanguageContext';
import type { TranslationKey } from '@/lib/i18n';

function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: 'easeOut' }} className={className}>
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
    <span ref={ref} className="text-4xl lg:text-5xl font-extrabold text-[#00B0F0]">
      {count}{suffix}
    </span>
  );
}

export default function AboutPage() {
  const { t } = useLang();

  const teamNames: TranslationKey[] = ['team_1_name', 'team_2_name', 'team_3_name', 'team_4_name'];
  const teamRoles: TranslationKey[] = ['team_1_role', 'team_2_role', 'team_3_role', 'team_4_role'];
  const teamBgs = ['bg-[#002A5C]', 'bg-[#00B0F0]', 'bg-[#002A5C]', 'bg-[#00B0F0]'];

  const valueIconPaths = ['/icons/3d/innovation.png', '/icons/3d/trust.png', '/icons/3d/dashboard.png'];
  const valueTitleKeys: TranslationKey[] = ['val_1_title', 'val_2_title', 'val_3_title'];
  const valueDescKeys: TranslationKey[] = ['val_1_desc', 'val_2_desc', 'val_3_desc'];

  const statLabelKeys: TranslationKey[] = ['stat_1', 'stat_2', 'stat_3', 'stat_4'];

  return (
    <div className="pt-[68px]">
      {/* Header */}
      <section className="hero-gradient py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#00B0F0]/10 rounded-full blur-[120px]" />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-block bg-white/10 backdrop-blur-sm text-white/90 px-4 py-2 rounded-full text-sm font-medium mb-5 border border-white/15">{t('about_badge')}</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-5 leading-tight">
              {t('about_title')} <span className="text-[#00B0F0]">{t('about_title_hl')}</span>
            </h1>
            <p className="text-lg text-white/75 max-w-xl mx-auto leading-relaxed">
              {t('about_desc')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <span className="inline-block text-[#00B0F0] text-sm font-bold mb-2">{t('story_badge')}</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#002A5C] mb-6 leading-tight">{t('story_title')}</h2>
              <div className="space-y-4 text-[#5a6a7e] leading-[1.9] text-[15px]">
                <p>{t('story_p1')}</p>
                <p>{t('story_p2')}</p>
                <p>{t('story_p3')}</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="relative">
                <div className="bg-gradient-to-br from-[#002A5C] to-[#005a9e] rounded-3xl p-8 lg:p-10 text-white">
                  <div className="w-14 h-14 rounded-xl bg-[#00B0F0]/20 flex items-center justify-center mb-5">
                    <Image src="/icons/3d/rocket.png" alt="Rocket" width={36} height={36} className="drop-shadow-md" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{t('story_mission')}</h3>
                  <p className="text-white/75 leading-[1.9] mb-5 text-[15px]">
                    &ldquo;{t('story_mission_text')}&rdquo;
                  </p>
                  <p className="text-sm text-white/50">{t('story_team')}</p>
                </div>
                <div className="absolute -top-3 -right-3 w-20 h-20 bg-[#00B0F0]/10 rounded-2xl -z-10" />
                <div className="absolute -bottom-3 -left-3 w-28 h-28 bg-[#002A5C]/10 rounded-2xl -z-10" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 lg:py-24 bg-[#f8fafc]">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <FadeIn className="text-center mb-14">
            <span className="inline-block text-[#00B0F0] text-sm font-bold mb-2">{t('vm_badge')}</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#002A5C] mb-4">{t('vm_title')}</h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">
            <FadeIn delay={0.1}>
              <div className="bg-white rounded-2xl p-7 shadow-sm border border-[#e0e7ef] h-full hover:translate-y-[-4px] transition-all duration-300 hover:[transform:perspective(1000px)_rotateY(2deg)]">
                <div className="w-11 h-11 rounded-lg bg-[#002A5C] flex items-center justify-center mb-4"><Target className="w-5 h-5 text-white" /></div>
                <h3 className="text-lg font-bold text-[#002A5C] mb-3">{t('vm_vision_title')}</h3>
                <p className="text-[#5a6a7e] leading-relaxed text-[15px]">{t('vm_vision')}</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="bg-white rounded-2xl p-7 shadow-sm border border-[#e0e7ef] h-full hover:translate-y-[-4px] transition-all duration-300 hover:[transform:perspective(1000px)_rotateY(-2deg)]">
                <div className="w-11 h-11 rounded-lg bg-[#00B0F0] flex items-center justify-center mb-4"><Heart className="w-5 h-5 text-white" /></div>
                <h3 className="text-lg font-bold text-[#002A5C] mb-3">{t('vm_mission_title')}</h3>
                <p className="text-[#5a6a7e] leading-relaxed text-[15px]">{t('vm_mission')}</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <FadeIn className="text-center mb-14">
            <span className="inline-block text-[#00B0F0] text-sm font-bold mb-2">{t('values_badge')}</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#002A5C] mb-4">{t('values_title')}</h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-5">
            {valueIconPaths.map((icon, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-gradient-to-br from-[#002A5C]/[0.03] to-[#00B0F0]/[0.05] rounded-2xl p-6 border border-[#00B0F0]/10 h-full group hover:translate-y-[-4px] transition-all duration-300 hover:[transform:perspective(1000px)_rotateY(2deg)]">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00B0F0]/15 to-[#00B0F0]/5 flex items-center justify-center mb-4 group-hover:from-[#00B0F0]/25 group-hover:to-[#00B0F0]/10 transition-all duration-300">
                    <Image src={icon} alt="" width={32} height={32} className="drop-shadow-md" />
                  </div>
                  <h3 className="text-lg font-bold text-[#002A5C] mb-2">{t(valueTitleKeys[i])}</h3>
                  <p className="text-[#5a6a7e] leading-relaxed text-[15px]">{t(valueDescKeys[i])}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 lg:py-24 bg-[#f8fafc]">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <FadeIn className="text-center mb-14">
            <span className="inline-block text-[#00B0F0] text-sm font-bold mb-2">{t('team_badge')}</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#002A5C] mb-4">{t('team_title')}</h2>
            <p className="text-[#5a6a7e] max-w-xl mx-auto text-[17px] leading-relaxed">{t('team_desc')}</p>
          </FadeIn>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {teamNames.map((nameKey, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-[#e0e7ef] text-center hover:translate-y-[-4px]">
                  <div className={`w-16 h-16 ${teamBgs[i]} rounded-2xl flex items-center justify-center text-white text-xl font-bold mx-auto mb-4`}>
                    {t(nameKey).charAt(0)}
                  </div>
                  <h3 className="font-bold text-[#002A5C] text-[15px] mb-1">{t(nameKey)}</h3>
                  <p className="text-[#5a6a7e] text-[13px]">{t(teamRoles[i])}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="cta-gradient py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white/[0.04] rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#00B0F0]/10 rounded-full blur-[100px]" />
        </div>
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }} />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-6">
          <FadeIn>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { number: 50, suffix: '+' },
                { number: 200, suffix: '+' },
                { number: 98, suffix: '%' },
                { number: 5, suffix: '+' },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <AnimatedCounter target={s.number} suffix={s.suffix} />
                  <p className="text-white/75 mt-2 text-[15px]">{t(statLabelKeys[i])}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
