'use client';

import { motion, useInView, useMotionValue, useTransform } from 'framer-motion';
import { useRef, useState, useEffect, MouseEvent } from 'react';
import { Button } from '@/components/ui/button';
import {
  Phone, Mail, MapPin, Send, CheckCircle2,
  MessageCircle, Instagram, Linkedin, Twitter, Clock,
  Sparkles, ArrowUpRight, Globe, Zap, Shield, Rocket,
} from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';

/* ===== FadeIn Animation ===== */
function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.23, 1, 0.32, 1] }}
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

/* ===== 3D Floating Cube ===== */
function FloatingCube({ size = 60, color = '#00B0F0', className = '' }: { size?: number; color?: string; className?: string }) {
  const half = size / 2;
  const faceStyle = (transform: string) => ({
    position: 'absolute' as const,
    width: size,
    height: size,
    transform,
    borderRadius: size * 0.15,
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
function ParticleField() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) {
    return <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ perspective: 800 }} />;
  }

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
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full particle-3d"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, ${p.size > 4 ? '#00D4FF' : '#00B0F0'} 0%, transparent 70%)`,
            opacity: p.opacity,
            '--px': `${p.px}px`,
            '--py': `${p.py}px`,
            '--pz': `${p.pz}px`,
            '--duration': `${p.duration}s`,
            '--delay': `${p.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}



export default function ContactPage() {
  const { t } = useLang();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
        setForm({ name: '', email: '', phone: '', company: '', message: '' });
        setTimeout(() => setSubmitted(false), 6000);
      } else {
        setError(data.message || 'Error');
      }
    } catch {
      setError('Error');
    } finally {
      setLoading(false);
    }
  };

  const handleMailto = () => {
    const subject = encodeURIComponent(`Contact from ${form.name || 'Website visitor'} - Codex`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone || 'N/A'}\nCompany: ${form.company || 'N/A'}\n\nMessage:\n${form.message}`
    );
    window.open(`mailto:contactcodex.ma@gmail.com?subject=${subject}&body=${body}`, '_blank');
  };

  const contactChannels = [
    {
      icon: <Mail className="w-6 h-6" />,
      titleKey: 'ci_email' as const,
      valueKey: 'ci_email_val' as const,
      subKey: 'ci_email_sub' as const,
      gradient: 'from-[#00B0F0] to-[#0098d4]',
      glowColor: 'rgba(0, 176, 240, 0.3)',
      href: 'mailto:contactcodex.ma@gmail.com',
    },
    {
      icon: <Phone className="w-6 h-6" />,
      titleKey: 'ci_phone' as const,
      valueKey: 'ci_phone_val' as const,
      subKey: 'ci_phone_sub' as const,
      gradient: 'from-[#002A5C] to-[#004d8a]',
      glowColor: 'rgba(0, 42, 92, 0.3)',
      href: 'tel:+212600000000',
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      titleKey: 'ci_address' as const,
      valueKey: 'ci_address_val' as const,
      subKey: 'ci_address_sub' as const,
      gradient: 'from-[#00B0F0] to-[#0088cc]',
      glowColor: 'rgba(0, 176, 240, 0.25)',
      href: '#',
    },
    {
      icon: <Clock className="w-6 h-6" />,
      titleKey: 'ci_hours' as const,
      valueKey: 'ci_hours_val' as const,
      subKey: 'ci_hours_sub' as const,
      gradient: 'from-[#002A5C] to-[#003d7a]',
      glowColor: 'rgba(0, 42, 92, 0.25)',
      href: '#',
    },
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

          {/* Floating icons */}
          <div className="absolute top-[20%] right-[15%] float-3d-5 hidden xl:block">
            <div className="w-14 h-14 rounded-2xl glass-strong flex items-center justify-center text-[#00D4FF] shadow-xl shadow-[#00B0F0]/10">
              <Mail className="w-7 h-7" />
            </div>
          </div>
          <div className="absolute bottom-[25%] left-[8%] float-3d-1 hidden xl:block">
            <div className="w-14 h-14 rounded-2xl glass-strong flex items-center justify-center text-[#00D4FF] shadow-xl shadow-[#00B0F0]/10">
              <Phone className="w-7 h-7" />
            </div>
          </div>
          <div className="absolute top-[50%] right-[10%] float-3d-3 hidden xl:block">
            <div className="w-14 h-14 rounded-2xl glass-strong flex items-center justify-center text-[#00D4FF] shadow-xl shadow-[#00B0F0]/10">
              <Send className="w-7 h-7" />
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
                <Sparkles className="w-4 h-4 text-[#00D4FF]" />
              </motion.span>
              {t('contact_badge')}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-[3.5rem] font-extrabold text-white mb-6 leading-[1.15] drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
              {t('contact_title')}{' '}
              <span className="text-[#00D4FF] drop-shadow-[0_2px_15px_rgba(0,176,240,0.6)]">{t('contact_title_hl')}</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto leading-[1.9] drop-shadow-[0_1px_6px_rgba(0,0,0,0.4)]">
              {t('contact_desc')}
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

      {/* ===== CONTACT CHANNELS — 3D Tilt Cards ===== */}
      <section className="py-20 lg:py-24 bg-white relative overflow-hidden">
        {/* Subtle holographic overlay */}
        <div className="absolute inset-0 holographic" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactChannels.map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <TiltCard className="group h-full">
                  <motion.a
                    href={item.href}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="relative bg-gradient-to-br from-white to-[#f8fafc] rounded-2xl p-6 border border-[#e0e7ef]/80 block h-full overflow-hidden shadow-lg shadow-[#002A5C]/[0.04] hover:shadow-2xl hover:shadow-[#002A5C]/[0.1] transition-all duration-500"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Holographic hover overlay */}
                    <div className="absolute inset-0 holographic opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl" />

                    {/* Corner glow */}
                    <div
                      className="absolute top-0 right-0 w-28 h-28 rounded-bl-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                      style={{ background: `radial-gradient(circle at top right, ${item.glowColor}, transparent 70%)` }}
                    />

                    {/* Top highlight line */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div style={{ transform: 'translateZ(30px)' }}>
                      {/* Icon container */}
                      <div className="relative mb-5">
                        <div
                          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
                        >
                          {item.icon}
                        </div>
                        {/* Icon glow behind */}
                        <div
                          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"
                          style={{ background: `${item.glowColor}` }}
                        />
                      </div>

                      <h3 className="font-extrabold text-[#002A5C] text-[14px] mb-1.5 tracking-tight">{t(item.titleKey)}</h3>
                      <p className="text-[#3a4a5c] text-[13px] font-semibold leading-snug">{t(item.valueKey)}</p>
                      <p className="text-[#8a96a8] text-[12px] mt-2">{t(item.subKey)}</p>
                    </div>

                    {/* Bottom border glow on hover */}
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00B0F0]/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                  </motion.a>
                </TiltCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MAIN FORM SECTION — Split Layout with 3D Scene ===== */}
      <section className="py-24 lg:py-32 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #001529 0%, #002A5C 30%, #003d7a 60%, #002A5C 100%)' }}>

        {/* 3D Background Scene */}
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
          {/* Additional floating icon decorations */}
          <div className="absolute top-[15%] left-[8%] float-3d-5 hidden xl:block">
            <div className="w-12 h-12 rounded-xl glass-strong flex items-center justify-center text-[#00D4FF]/60 shadow-lg">
              <Zap className="w-6 h-6" />
            </div>
          </div>
          <div className="absolute bottom-[20%] right-[6%] float-3d-3 hidden xl:block">
            <div className="w-12 h-12 rounded-xl glass-strong flex items-center justify-center text-[#00D4FF]/60 shadow-lg">
              <Rocket className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Particles */}
        <ParticleField />

        {/* Grid */}
        <div className="absolute inset-0 grid-pattern opacity-[0.2]" />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8 items-start">

            {/* ===== LEFT SIDE — Info Panel (2 cols) ===== */}
            <div className="lg:col-span-2 space-y-6">

              {/* Location Card */}
              <FadeIn>
                <TiltCard>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className="relative bg-gradient-to-br from-[#0a1628] via-[#002A5C] to-[#004080] rounded-3xl p-8 text-white overflow-hidden shadow-2xl shadow-[#002A5C]/30 glow-pulse-3d"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Glass highlights */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    <div className="absolute inset-0 grid-pattern opacity-[0.12]" />
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#00B0F0]/[0.08] rounded-full blur-[60px]" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#00D4FF]/[0.05] rounded-full blur-[50px]" />

                    <div style={{ transform: 'translateZ(30px)' }}>
                      <div className="w-14 h-14 rounded-2xl bg-[#00B0F0]/15 flex items-center justify-center mb-5 backdrop-blur-sm border border-[#00B0F0]/20">
                        <MapPin className="w-7 h-7 text-[#00D4FF]" />
                      </div>
                      <h3 className="text-xl font-extrabold mb-3">{t('contact_location')}</h3>
                      <p className="text-white/80 text-[15px] mb-1.5 leading-relaxed">{t('ci_address_val')}</p>
                      <p className="text-white/50 text-[13px] mb-6">{t('ci_address_sub')}</p>
                      <div className="flex items-center gap-3 bg-white/[0.06] rounded-xl px-4 py-3 border border-white/[0.08] backdrop-blur-sm">
                        <span className="relative flex items-center justify-center">
                          <span className="w-3 h-3 rounded-full bg-emerald-400" />
                          <span className="absolute w-3 h-3 rounded-full bg-emerald-400 animate-ping opacity-40" />
                          <span className="absolute w-3 h-3 rounded-full bg-emerald-400 animate-ping opacity-20" style={{ animationDelay: '0.6s' }} />
                        </span>
                        <span className="text-white/70 text-[13px] font-medium">{t('contact_open')}</span>
                      </div>
                    </div>
                  </motion.div>
                </TiltCard>
              </FadeIn>

              {/* WhatsApp Card */}
              <FadeIn delay={0.1}>
                <TiltCard>
                  <motion.a
                    href="https://wa.me/212600000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative bg-gradient-to-br from-emerald-500 via-emerald-600 to-green-700 rounded-3xl p-7 flex items-center gap-5 block overflow-hidden group shadow-2xl shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-shadow duration-500"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Glass shimmer */}
                    <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                    <div style={{ transform: 'translateZ(25px)' }} className="flex items-center gap-5 w-full relative">
                      <div className="relative w-16 h-16 bg-white/[0.15] rounded-2xl flex items-center justify-center shrink-0 backdrop-blur-sm border border-white/[0.15]">
                        <MessageCircle className="w-7 h-7 text-white" />
                        <div className="absolute inset-0 rounded-2xl bg-white/0 group-hover:bg-white/10 transition-colors duration-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-extrabold text-white text-[17px] mb-0.5">{t('contact_wa_title')}</h3>
                        <p className="text-white/75 text-[13px] leading-relaxed">{t('contact_wa_desc')}</p>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-white/40 shrink-0 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white/70 transition-all duration-300" />
                    </div>
                  </motion.a>
                </TiltCard>
              </FadeIn>

              {/* Social Media Card */}
              <FadeIn delay={0.2}>
                <TiltCard>
                  <div
                    className="glass-strong rounded-3xl p-7 hover:bg-white/[0.15] transition-all duration-500"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div style={{ transform: 'translateZ(25px)' }}>
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 rounded-xl bg-[#00B0F0]/15 flex items-center justify-center border border-[#00B0F0]/20">
                          <Globe className="w-5 h-5 text-[#00D4FF]" />
                        </div>
                        <h3 className="font-extrabold text-white text-[16px]">{t('contact_social')}</h3>
                      </div>
                      <div className="flex items-center gap-3">
                        {[
                          { icon: <Instagram size={20} />, href: 'https://instagram.com/codex_ma', gradient: 'from-purple-500 to-pink-500', shadow: 'shadow-purple-500/30' },
                          { icon: <Linkedin size={20} />, href: '#', gradient: 'from-blue-600 to-blue-700', shadow: 'shadow-blue-600/30' },
                          { icon: <Twitter size={20} />, href: '#', gradient: 'from-gray-700 to-gray-900', shadow: 'shadow-gray-700/30' },
                          { icon: <Globe size={20} />, href: '#', gradient: 'from-[#00B0F0] to-[#0098d4]', shadow: 'shadow-[#00B0F0]/30' },
                        ].map((social, i) => (
                          <motion.a
                            key={i}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.15, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${social.gradient} flex items-center justify-center text-white shadow-lg ${social.shadow} transition-all duration-300 backdrop-blur-sm`}
                          >
                            {social.icon}
                          </motion.a>
                        ))}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </FadeIn>
            </div>

            {/* ===== RIGHT SIDE — Contact Form (3 cols) ===== */}
            <div className="lg:col-span-3">
              <FadeIn delay={0.05}>
                <div
                  className="glass-strong rounded-[2rem] p-8 lg:p-10 relative overflow-hidden glow-pulse-3d"
                >
                  {/* Glass highlights */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00B0F0]/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00D4FF]/20 to-transparent" />
                  <div className="absolute inset-0 grid-pattern opacity-[0.06]" />

                  {/* Decorative corner glow */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-[#00B0F0]/[0.06] rounded-full blur-[80px]" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#00D4FF]/[0.04] rounded-full blur-[60px]" />

                  {/* Form header */}
                  <div className="relative mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00B0F0] to-[#0098d4] flex items-center justify-center shadow-lg shadow-[#00B0F0]/30">
                        <Send className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-extrabold text-white">{t('contact_form_title')}</h2>
                      </div>
                    </div>
                    <p className="text-white/60 text-[15px] leading-relaxed">{t('contact_form_desc')}</p>
                  </div>

                  {/* Error state */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 p-4 rounded-xl bg-red-500/10 backdrop-blur-sm border border-red-400/20 text-red-300 text-[14px] font-medium"
                    >
                      {error}
                    </motion.div>
                  )}

                  {/* Success state */}
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center py-20 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                        className="relative mb-6"
                      >
                        <div className="w-24 h-24 rounded-full bg-emerald-500/15 flex items-center justify-center backdrop-blur-sm border border-emerald-400/20">
                          <CheckCircle2 className="w-12 h-12 text-emerald-400" />
                        </div>
                        <div className="absolute inset-0 rounded-full bg-emerald-400/10 blur-xl -z-10" />
                      </motion.div>
                      <h3 className="text-2xl font-extrabold text-white mb-3">{t('form_success')}</h3>
                      <p className="text-white/60 text-[15px] max-w-sm">{t('form_success_desc')}</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5 relative">
                      {/* Name & Email */}
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-[13px] font-bold text-white/80 mb-2">{t('form_name')}</label>
                          <input
                            id="name"
                            required
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full rounded-xl bg-white/[0.06] border border-white/[0.1] h-12 px-4 text-white text-[14px] outline-none placeholder:text-white/30 backdrop-blur-sm"
                            placeholder={t('form_name').replace(' *', '')
                          />
                        </div>
                        <div>
                          <label className="block text-[13px] font-bold text-white/80 mb-2">{t('form_email')}</label>
                          <input
                            id="email"
                            type="email"
                            required
                            dir="ltr"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="w-full rounded-xl bg-white/[0.06] border border-white/[0.1] h-12 px-4 text-white text-[14px] outline-none placeholder:text-white/30 backdrop-blur-sm"
                            placeholder="email@example.com"
                          />
                        </div>
                      </div>

                      {/* Phone & Company */}
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-[13px] font-bold text-white/80 mb-2">{t('form_phone')}</label>
                          <input
                            id="phone"
                            type="tel"
                            dir="ltr"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            className="w-full rounded-xl bg-white/[0.06] border border-white/[0.1] h-12 px-4 text-white text-[14px] outline-none placeholder:text-white/30 backdrop-blur-sm"
                            placeholder="+212 6XX XXX XXX"
                          />
                        </div>
                        <div>
                          <label className="block text-[13px] font-bold text-white/80 mb-2">{t('form_company')}</label>
                          <input
                            id="company"
                            value={form.company}
                            onChange={(e) => setForm({ ...form, company: e.target.value })}
                            className="w-full rounded-xl bg-white/[0.06] border border-white/[0.1] h-12 px-4 text-white text-[14px] outline-none placeholder:text-white/30 backdrop-blur-sm"
                            placeholder={t('form_company')}
                          />
                        </div>
                      </div>

                      {/* Message */}
                        <div>
                          <label className="block text-[13px] font-bold text-white/80 mb-2">{t('form_message')}</label>
                          <textarea
                            id="message"
                            required
                            rows={5}
                            value={form.message}
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                            className="w-full rounded-xl bg-white/[0.06] border border-white/[0.1] px-4 py-3 text-white text-[14px] outline-none resize-none placeholder:text-white/30 leading-relaxed backdrop-blur-sm"
                            placeholder={t('form_message').replace(' *', '')}
                          />
                        </div>

                      {/* Submit buttons */}
                      <div className="flex flex-col sm:flex-row gap-3 pt-3">
                        <motion.div whileHover={{ scale: loading ? 1 : 1.03 }} whileTap={{ scale: loading ? 1 : 0.97 }} className="flex-1">
                          <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-l from-[#00B0F0] to-[#0098d4] hover:from-[#00c4ff] hover:to-[#00B0F0] text-white font-bold rounded-2xl py-4 shadow-xl shadow-[#00B0F0]/25 hover:shadow-2xl hover:shadow-[#00B0F0]/40 transition-all duration-300 text-[15px] cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden group/btn"
                          >
                            {/* Button shimmer effect */}
                            <div className="absolute inset-0 shimmer opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                            <span className="relative">
                              {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                  <motion.span
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                    className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                  />
                                  {t('form_submit')}
                                </span>
                              ) : (
                                <span>
                                  <Send className="w-5 h-5 me-2 inline-block" />
                                  {t('form_submit')}
                                </span>
                              )}
                            </span>
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                          <Button
                            type="button"
                            onClick={handleMailto}
                            className="w-full sm:w-auto glass-strong hover:bg-white/[0.15] text-white font-bold rounded-2xl py-4 px-6 shadow-lg transition-all duration-300 text-[15px] cursor-pointer border border-white/[0.1]"
                          >
                            <Mail className="w-5 h-5 me-2 text-[#00D4FF]" />
                            Email
                          </Button>
                        </motion.div>
                      </div>
                    </form>
                  )}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
