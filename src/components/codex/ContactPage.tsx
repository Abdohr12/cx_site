'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Phone, Mail, MapPin, Send, CheckCircle2,
  MessageCircle, Instagram, Linkedin, Twitter, Clock,
  Sparkles,
} from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';

function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.23, 1, 0.32, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

export default function ContactPage() {
  const { t } = useLang();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
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
        setTimeout(() => setSubmitted(false), 5000);
        setForm({ name: '', email: '', phone: '', company: '', message: '' });
      } else {
        setError(data.message || 'Erreur');
      }
    } catch {
      setError('Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  const info = [
    { icon: <Phone className="w-5 h-5" />, titleKey: 'ci_phone' as const, valueKey: 'ci_phone_val' as const, subKey: 'ci_phone_sub' as const, href: 'tel:+212600000000', color: 'from-[#00B0F0] to-[#0098d4]' },
    { icon: <Mail className="w-5 h-5" />, titleKey: 'ci_email' as const, valueKey: 'ci_email_val' as const, subKey: 'ci_email_sub' as const, href: 'mailto:contactcodex.ma@gmail.com', color: 'from-[#002A5C] to-[#004d8a]' },
    { icon: <MapPin className="w-5 h-5" />, titleKey: 'ci_address' as const, valueKey: 'ci_address_val' as const, subKey: 'ci_address_sub' as const, href: '#', color: 'from-[#00B0F0] to-[#0098d4]' },
    { icon: <Clock className="w-5 h-5" />, titleKey: 'ci_hours' as const, valueKey: 'ci_hours_val' as const, subKey: 'ci_hours_sub' as const, href: '#', color: 'from-[#002A5C] to-[#004d8a]' },
  ];

  const inputCls = 'rounded-xl border-[#e0e7ef] focus:border-[#00B0F0] focus:ring-[#00B0F0]/20 h-11 bg-white';

  return (
    <div className="pt-[72px]">
      {/* Header */}
      <section className="hero-gradient py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#00B0F0]/15 rounded-full blur-[140px] orb" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-[#00B0F0]/8 rounded-full blur-[120px] orb-delay" />
        <div className="absolute inset-0 grid-pattern opacity-[0.3]" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}>
            <span className="inline-flex items-center gap-2 glass text-white/90 px-5 py-2.5 rounded-full text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4 text-[#00D4FF]" />
              {t('contact_badge')}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
              {t('contact_title')}{' '}
              <span className="gradient-text">{t('contact_title_hl')}</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/65 max-w-2xl mx-auto leading-relaxed">
              {t('contact_desc')}
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full">
            <path d="M0 60V30C240 0 480 50 720 30C960 10 1200 50 1440 30V60H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {info.map((item, i) => (
              <motion.a
                key={i}
                href={item.href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
                whileHover={{ y: -4 }}
                className="bg-[#f8fafc] rounded-2xl p-6 border border-[#e0e7ef]/60 block hover:shadow-lg hover:border-[#00B0F0]/20 transition-all duration-300 h-full group"
              >
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
                </div>
                <h3 className="font-extrabold text-[#002A5C] text-[14px] mb-1">{t(item.titleKey)}</h3>
                <p className="text-[#3a4a5c] text-[13px] font-semibold">{t(item.valueKey)}</p>
                <p className="text-[#8a96a8] text-[12px] mt-1">{t(item.subKey)}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Form & Map */}
      <section className="py-24 lg:py-28 mesh-gradient">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form */}
            <FadeIn>
              <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-sm border border-[#e0e7ef]/80">
                <div className="mb-8">
                  <h2 className="text-2xl font-extrabold text-[#002A5C] mb-2">{t('contact_form_title')}</h2>
                  <p className="text-[#5a6a7e] text-[15px]">{t('contact_form_desc')}</p>
                </div>

                {error && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-5 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-[14px] font-medium">
                    {error}
                  </motion.div>
                )}

                {submitted ? (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-20 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                      className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mb-6"
                    >
                      <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                    </motion.div>
                    <h3 className="text-xl font-extrabold text-[#002A5C] mb-2">{t('form_success')}</h3>
                    <p className="text-[#5a6a7e] text-[15px]">{t('form_success_desc')}</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-[14px] font-semibold text-[#002A5C]">{t('form_name')}</Label>
                        <Input id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-[14px] font-semibold text-[#002A5C]">{t('form_email')}</Label>
                        <Input id="email" type="email" required dir="ltr" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-[14px] font-semibold text-[#002A5C]">{t('form_phone')}</Label>
                        <Input id="phone" type="tel" dir="ltr" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputCls} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company" className="text-[14px] font-semibold text-[#002A5C]">{t('form_company')}</Label>
                        <Input id="company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className={inputCls} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-[14px] font-semibold text-[#002A5C]">{t('form_message')}</Label>
                      <Textarea id="message" required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${inputCls} resize-none`} />
                    </div>
                    <motion.div whileHover={{ scale: loading ? 1 : 1.01 }} whileTap={{ scale: loading ? 1 : 0.99 }}>
                      <Button type="submit" disabled={loading} className="w-full bg-gradient-to-l from-[#00B0F0] to-[#0098d4] hover:from-[#00c4ff] hover:to-[#00B0F0] text-white font-bold rounded-2xl py-4 shadow-xl shadow-[#00B0F0]/25 hover:shadow-2xl hover:shadow-[#00B0F0]/35 transition-all duration-300 text-[15px] cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed">
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
                          <span><Send className="w-5 h-5 me-2" /> {t('form_submit')}</span>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                )}
              </div>
            </FadeIn>

            {/* Map & Social */}
            <FadeIn delay={0.12}>
              <div className="space-y-6">
                {/* Map */}
                <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.3 }}>
                  <div className="bg-gradient-to-br from-[#001a3d] via-[#002A5C] to-[#004d8a] rounded-3xl p-8 lg:p-10 text-white relative overflow-hidden noise">
                    <div className="absolute inset-0 grid-pattern opacity-[0.15]" />
                    <div className="relative">
                      <div className="w-12 h-12 rounded-2xl bg-[#00B0F0]/15 flex items-center justify-center mb-5">
                        <MapPin className="w-6 h-6 text-[#00D4FF]" />
                      </div>
                      <h3 className="text-xl font-extrabold mb-2">{t('contact_location')}</h3>
                      <p className="text-white/75 text-[15px] mb-1">{t('ci_address_val')}</p>
                      <p className="text-white/45 text-[13px] mb-6">{t('ci_address_sub')}</p>
                      <div className="flex items-center gap-3">
                        <span className="relative flex items-center justify-center">
                          <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="absolute w-3 h-3 rounded-full bg-emerald-400 animate-ping opacity-30" />
                        </span>
                        <span className="text-white/55 text-[14px] font-medium">{t('ci_hours_avail')}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* WhatsApp */}
                <motion.a
                  href="https://wa.me/212600000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2, scale: 1.01 }}
                  className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl p-6 border border-emerald-200/40 flex items-center gap-5 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 block"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/25">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-[#002A5C] text-[16px] mb-0.5">{t('contact_wa_title')}</h3>
                    <p className="text-[#5a6a7e] text-[13px]">{t('contact_wa_desc')}</p>
                  </div>
                </motion.a>

                {/* Social */}
                <div className="bg-white rounded-3xl p-7 shadow-sm border border-[#e0e7ef]/80">
                  <h3 className="font-extrabold text-[#002A5C] mb-5 text-[16px]">{t('contact_social')}</h3>
                  <div className="flex items-center gap-3">
                    {[
                      { icon: <Instagram size={20} />, href: 'https://instagram.com/codex_ma', bg: 'from-purple-500 to-pink-500', shadow: 'shadow-purple-500/25' },
                      { icon: <Linkedin size={20} />, href: '#', bg: 'from-blue-600 to-blue-700', shadow: 'shadow-blue-600/25' },
                      { icon: <Twitter size={20} />, href: '#', bg: 'from-gray-800 to-black', shadow: 'shadow-gray-800/25' },
                    ].map((social, i) => (
                      <motion.a
                        key={i}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${social.bg} flex items-center justify-center text-white shadow-lg ${social.shadow} transition-all duration-300`}
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
