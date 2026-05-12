'use client';

import { motion, useInView, useMotionValue, useTransform } from 'framer-motion';
import { useRef, useState, useEffect, MouseEvent } from 'react';
import { Target, Heart, Sparkles, Award, Users, Zap, Shield, TrendingUp, Rocket, ArrowUpRight, Code, Smartphone, Globe2, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLang } from '@/lib/LanguageContext';
import type { TranslationKey } from '@/lib/i18n';

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

/* ===== 3D Floating Cube Component ===== */
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
    <div className={`shape-cube ${className}`} style={{ width: size, height: size, transformStyle: 'preserve-3d' }}>
      <div style={faceStyle(`translateZ(${half}px)`)} />
      <div style={faceStyle(`rotateY(180deg) translateZ(${half}px)`)} />
      <div style={faceStyle(`rotateY(-90deg) translateZ(${half}px)`)} />
      <div style={faceStyle(`rotateY(90deg) translateZ(${half}px)`)} />
      <div style={faceStyle(`rotateX(90deg) translateZ(${half}px)`)} />
      <div style={faceStyle(`rotateX(-90deg) translateZ(${half}px)`)} />
    </div>
  );
}

/* ===== 3D Tilt Card Component ===== */
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-12, 12]);

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

export default function AboutPage() {
  const { t } = useLang();

  const teamNames: TranslationKey[] = ['team_1_name', 'team_2_name', 'team_3_name', 'team_4_name'];
  const teamRoles: TranslationKey[] = ['team_1_role', 'team_2_role', 'team_3_role', 'team_4_role'];
  const teamBgs = ['from-[#002A5C] to-[#004d8a]', 'from-[#00B0F0] to-[#0098d4]', 'from-[#002A5C] to-[#004d8a]', 'from-[#00B0F0] to-[#0098d4]'];
  const teamIcons = [<Zap className="w-6 h-6" />, <Heart className="w-6 h-6" />, <Shield className="w-6 h-6" />, <TrendingUp className="w-6 h-6" />];

  const valueTitleKeys: TranslationKey[] = ['val_1_title', 'val_2_title', 'val_3_title'];
  const valueDescKeys: TranslationKey[] = ['val_1_desc', 'val_2_desc', 'val_3_desc'];
  const valueIcons = [<Zap className="w-6 h-6" />, <Shield className="w-6 h-6" />, <Target className="w-6 h-6" />];
  const valueColors = ['from-[#00B0F0] to-[#0098d4]', 'from-[#002A5C] to-[#004d8a]', 'from-[#00B0F0] to-[#0098d4]'];

  const statLabelKeys: TranslationKey[] = ['stat_1', 'stat_2', 'stat_3', 'stat_4'];
  const statIcons = [<Users className="w-6 h-6" />, <Rocket className="w-6 h-6" />, <TrendingUp className="w-6 h-6" />, <Award className="w-6 h-6" />];
  const statNumbers = [{ number: 50, suffix: '+' }, { number: 200, suffix: '+' }, { number: 98, suffix: '%' }, { number: 5, suffix: '+' }];

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

          {/* Floating service icons */}
          <div className="absolute top-[20%] right-[15%] float-3d-5 hidden xl:block">
            <div className="w-14 h-14 rounded-2xl glass-strong flex items-center justify-center text-[#00D4FF] shadow-xl shadow-[#00B0F0]/10">
              <Code className="w-7 h-7" />
            </div>
          </div>
          <div className="absolute bottom-[25%] left-[8%] float-3d-1 hidden xl:block">
            <div className="w-14 h-14 rounded-2xl glass-strong flex items-center justify-center text-[#00D4FF] shadow-xl shadow-[#00B0F0]/10">
              <Smartphone className="w-7 h-7" />
            </div>
          </div>
          <div className="absolute top-[50%] right-[10%] float-3d-3 hidden xl:block">
            <div className="w-14 h-14 rounded-2xl glass-strong flex items-center justify-center text-[#00D4FF] shadow-xl shadow-[#00B0F0]/10">
              <Globe2 className="w-7 h-7" />
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
            <span className="inline-flex items-center gap-2.5 bg-white/[0.12] backdrop-blur-xl border border-white/[0.2] text-white px-5 py-2.5 rounded-full text-sm font-semibold mb-7 shadow-lg">
              <motion.span animate={{ rotate: [0, 360] }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}>
                <Award className="w-4 h-4 text-[#00D4FF]" />
              </motion.span>
              {t('about_badge')}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-[3.5rem] font-extrabold text-white mb-6 leading-[1.15] drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
              {t('about_title')}{' '}
              <span className="text-[#00D4FF] drop-shadow-[0_2px_15px_rgba(0,176,240,0.6)]">{t('about_title_hl')}</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto leading-[1.9] drop-shadow-[0_1px_6px_rgba(0,0,0,0.4)]">
              {t('about_desc')}
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
            {statNumbers.map((s, i) => (
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
                      {statIcons[i]}
                    </div>
                    <AnimatedCounter target={s.number} suffix={s.suffix} />
                    <p className="text-white/70 mt-2 text-[13px] font-semibold">{t(statLabelKeys[i])}</p>
                  </div>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STORY — Split with 3D Scene ===== */}
      <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
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

            {/* 3D Interactive Scene */}
            <FadeIn delay={0.2}>
              <div className="relative scene-3d-deep" style={{ minHeight: 420 }}>
                {/* Main mission card */}
                <TiltCard className="relative z-10">
                  <div className="bg-gradient-to-br from-[#0a1628] via-[#002A5C] to-[#004080] rounded-3xl p-10 text-white relative overflow-hidden shadow-2xl shadow-[#002A5C]/30"
                    style={{ transformStyle: 'preserve-3d' }}>
                    <div className="absolute inset-0 grid-pattern opacity-[0.12]" />
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#00B0F0]/[0.08] rounded-full blur-[60px]" />
                    <div style={{ transform: 'translateZ(30px)' }}>
                      <div className="w-16 h-16 rounded-2xl bg-[#00B0F0]/15 flex items-center justify-center mb-6 backdrop-blur-sm border border-[#00B0F0]/20">
                        <Rocket className="w-8 h-8 text-[#00D4FF]" />
                      </div>
                      <h3 className="text-2xl font-extrabold mb-4">{t('story_mission')}</h3>
                      <p className="text-white/75 leading-[1.9] mb-6 text-[15px]">
                        &ldquo;{t('story_mission_text')}&rdquo;
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="h-px flex-1 bg-white/10" />
                        <p className="text-sm text-white/40 font-medium">{t('story_team')}</p>
                      </div>
                    </div>
                  </div>
                </TiltCard>

                {/* Floating 3D elements around the card */}
                <div className="absolute -top-6 -right-6 float-3d-1 z-20 hidden lg:block">
                  <FloatingCube size={50} color="#00B0F0" />
                </div>
                <div className="absolute -bottom-4 -left-4 float-3d-2 z-20 hidden lg:block">
                  <FloatingCube size={40} color="#002A5C" />
                </div>
                <div className="absolute top-1/2 -right-8 float-3d-3 z-20 hidden lg:block">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00B0F0] to-[#0098d4] flex items-center justify-center shadow-lg shadow-[#00B0F0]/30">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="absolute -top-3 -left-8 float-3d-4 z-20 hidden lg:block">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#002A5C] to-[#004d8a] flex items-center justify-center shadow-lg shadow-[#002A5C]/30">
                    <Lightbulb className="w-5 h-5 text-[#00D4FF]" />
                  </div>
                </div>

                {/* Morphing sphere decoration */}
                <div className="absolute -bottom-8 -right-8 w-28 h-28 bg-gradient-to-br from-[#00B0F0]/10 to-[#002A5C]/10 morph-sphere -z-10 hidden lg:block" />
                <div className="absolute -top-6 left-1/4 w-20 h-20 bg-gradient-to-br from-[#00D4FF]/8 to-transparent morph-sphere -z-10 hidden lg:block" style={{ animationDelay: '-3s' }} />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ===== VISION & MISSION — 3D Glass Cards ===== */}
      <section className="py-24 lg:py-32 mesh-gradient relative overflow-hidden">
        {/* 3D Background elements */}
        <div className="absolute inset-0 scene-3d pointer-events-none">
          <div className="absolute top-[10%] right-[5%] float-3d-2 hidden lg:block">
            <FloatingCube size={50} color="#00B0F0" />
          </div>
          <div className="absolute bottom-[15%] left-[5%] float-3d-4 hidden lg:block">
            <FloatingCube size={40} color="#002A5C" />
          </div>
          <div className="absolute top-[50%] right-[15%] w-24 h-24 ring-3d hidden lg:block" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-[#00B0F0] text-sm font-bold mb-3 uppercase tracking-wider">
              <Target className="w-4 h-4" />
              {t('vm_badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.8rem] font-extrabold text-[#002A5C] mb-5 leading-tight">{t('vm_title')}</h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <FadeIn delay={0.1}>
              <TiltCard>
                <div className="bg-white rounded-3xl p-9 shadow-xl shadow-[#002A5C]/[0.08] border border-[#e0e7ef]/80 h-full relative overflow-hidden group holographic"
                  style={{ transformStyle: 'preserve-3d' }}>
                  <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-[#002A5C]/[0.04] to-transparent rounded-bl-[60px]" />
                  <div style={{ transform: 'translateZ(25px)' }}>
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#002A5C] to-[#004d8a] flex items-center justify-center mb-6 shadow-lg shadow-[#002A5C]/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                      <Target className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-extrabold text-[#002A5C] mb-4">{t('vm_vision_title')}</h3>
                    <p className="text-[#5a6a7e] leading-[1.8] text-[15px]">{t('vm_vision')}</p>
                  </div>
                </div>
              </TiltCard>
            </FadeIn>

            <FadeIn delay={0.2}>
              <TiltCard>
                <div className="bg-white rounded-3xl p-9 shadow-xl shadow-[#002A5C]/[0.08] border border-[#e0e7ef]/80 h-full relative overflow-hidden group holographic"
                  style={{ transformStyle: 'preserve-3d' }}>
                  <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-[#00B0F0]/[0.04] to-transparent rounded-bl-[60px]" />
                  <div style={{ transform: 'translateZ(25px)' }}>
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00B0F0] to-[#0098d4] flex items-center justify-center mb-6 shadow-lg shadow-[#00B0F0]/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                      <Heart className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-extrabold text-[#002A5C] mb-4">{t('vm_mission_title')}</h3>
                    <p className="text-[#5a6a7e] leading-[1.8] text-[15px]">{t('vm_mission')}</p>
                  </div>
                </div>
              </TiltCard>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ===== VALUES — 3D Interactive Cards ===== */}
      <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
        {/* 3D Background */}
        <div className="absolute inset-0 scene-3d pointer-events-none">
          <div className="absolute top-[20%] left-[3%] float-3d-3 hidden lg:block">
            <FloatingCube size={45} color="#00B0F0" />
          </div>
          <div className="absolute bottom-[20%] right-[5%] float-3d-1 hidden lg:block">
            <FloatingCube size={55} color="#002A5C" />
          </div>
          <div className="absolute top-[50%] left-[15%] w-20 h-20 ring-3d hidden lg:block" style={{ animationDelay: '-6s' }} />
          <div className="absolute top-[10%] right-[25%] w-16 h-16 ring-3d hidden lg:block" style={{ animationDelay: '-2s', borderColor: 'rgba(0,42,92,0.15)' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-[#00B0F0] text-sm font-bold mb-3 uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              {t('values_badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.8rem] font-extrabold text-[#002A5C] mb-5 leading-tight">{t('values_title')}</h2>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {valueTitleKeys.map((titleKey, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <TiltCard>
                  <div className="bg-white rounded-3xl p-8 border border-[#e0e7ef]/60 h-full relative overflow-hidden group shadow-lg shadow-[#002A5C]/[0.04] hover:shadow-xl hover:shadow-[#002A5C]/[0.08] transition-shadow duration-500"
                    style={{ transformStyle: 'preserve-3d' }}>
                    {/* Holographic overlay */}
                    <div className="absolute inset-0 holographic opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl" />
                    {/* Corner decoration */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#00B0F0]/[0.06] to-transparent rounded-bl-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div style={{ transform: 'translateZ(25px)' }}>
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${valueColors[i]} flex items-center justify-center mb-6 text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                        {valueIcons[i]}
                      </div>
                      <h3 className="text-xl font-extrabold text-[#002A5C] mb-3">{t(titleKey)}</h3>
                      <p className="text-[#5a6a7e] leading-relaxed text-[15px]">{t(valueDescKeys[i])}</p>
                    </div>
                  </div>
                </TiltCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TEAM — 3D Floating Cards ===== */}
      <section className="py-24 lg:py-32 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #001529 0%, #002A5C 30%, #003d7a 60%, #002A5C 100%)' }}>
        {/* 3D floating shapes */}
        <div className="absolute inset-0 scene-3d pointer-events-none">
          <div className="absolute top-[10%] right-[8%] float-3d-1 hidden lg:block">
            <FloatingCube size={60} color="#00B0F0" />
          </div>
          <div className="absolute top-[40%] left-[5%] float-3d-2 hidden lg:block">
            <FloatingCube size={50} color="#00D4FF" />
          </div>
          <div className="absolute bottom-[15%] right-[12%] float-3d-4 hidden lg:block">
            <FloatingCube size={45} color="#002A5C" />
          </div>
          <div className="absolute top-[60%] right-[20%] w-28 h-28 ring-3d hidden lg:block" style={{ borderColor: 'rgba(0,176,240,0.2)' }} />
          <div className="absolute bottom-[30%] left-[15%] w-20 h-20 ring-3d hidden lg:block" style={{ animationDelay: '-5s', borderColor: 'rgba(255,255,255,0.1)' }} />
          <div className="absolute top-[20%] left-[20%] w-32 h-32 morph-sphere bg-[#00B0F0]/5 hidden lg:block" />
        </div>

        {/* Particles */}
        <ParticleField />

        {/* Grid */}
        <div className="absolute inset-0 grid-pattern opacity-[0.2]" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-[#00D4FF] text-sm font-bold mb-3 uppercase tracking-wider">
              <Users className="w-4 h-4" />
              {t('team_badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.8rem] font-extrabold text-white mb-5 leading-tight">{t('team_title')}</h2>
            <p className="text-white/70 max-w-2xl mx-auto text-[18px] leading-relaxed">{t('team_desc')}</p>
          </FadeIn>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {teamNames.map((nameKey, i) => (
              <FadeIn key={i} delay={i * 0.12}>
                <TiltCard>
                  <div className="glass-strong rounded-3xl p-7 text-center group cursor-default hover:bg-white/[0.15] transition-all duration-500"
                    style={{ transformStyle: 'preserve-3d' }}>
                    <div style={{ transform: 'translateZ(30px)' }}>
                      <div className={`w-20 h-20 bg-gradient-to-br ${teamBgs[i]} rounded-3xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-5 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 relative`}>
                        {/* Glow effect behind avatar */}
                        <div className="absolute inset-0 rounded-3xl bg-white/0 group-hover:bg-white/10 transition-colors duration-500" />
                        <div className="relative">{teamIcons[i]}</div>
                      </div>
                      <h3 className="font-extrabold text-white text-[16px] mb-1">{t(nameKey)}</h3>
                      <p className="text-white/50 text-[13px] font-medium">{t(teamRoles[i])}</p>
                    </div>
                  </div>
                </TiltCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA — Aurora 3D ===== */}
      <section className="aurora-bg py-24 lg:py-32 relative overflow-hidden">
        {/* 3D shapes */}
        <div className="absolute inset-0 scene-3d pointer-events-none">
          <div className="absolute top-[15%] right-[10%] float-3d-2 hidden lg:block">
            <FloatingCube size={55} color="#00B0F0" />
          </div>
          <div className="absolute bottom-[20%] left-[8%] float-3d-3 hidden lg:block">
            <FloatingCube size={45} color="#002A5C" />
          </div>
          <div className="absolute top-[50%] right-[25%] w-24 h-24 ring-3d hidden lg:block" />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none" />
        <div className="absolute inset-0 grid-pattern opacity-[0.25]" />
        <ParticleField />

        <div className="relative max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <FadeIn>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center gap-2 bg-white/[0.1] backdrop-blur-xl border border-white/[0.15] px-4 py-2 rounded-full text-white/80 text-sm font-semibold mb-8"
            >
              <Sparkles className="w-4 h-4 text-[#00D4FF]" />
              {t('cta_get_started')}
            </motion.div>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.8rem] font-extrabold text-white mb-6 leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]">
              {t('cta_title')}
            </h2>
            <p className="text-lg sm:text-xl text-white/85 mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.3)]">
              {t('cta_desc')}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Button size="lg" className="bg-white text-[#002A5C] hover:bg-white/95 font-bold rounded-2xl px-8 py-4 text-[17px] shadow-2xl transition-all duration-300 cursor-pointer">
                  {t('cta_btn')}
                  <ArrowUpRight className="w-5 h-5 ms-2" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Button variant="outline" size="lg" className="bg-white/[0.08] backdrop-blur-xl border-white/20 text-white hover:bg-white/15 font-semibold rounded-2xl px-8 py-4 text-[17px] transition-all duration-300 cursor-pointer">
                  {t('cta_btn2')}
                </Button>
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
