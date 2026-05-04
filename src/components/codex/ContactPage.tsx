'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Phone, Mail, MapPin, Send, CheckCircle2,
  MessageCircle, Instagram, Linkedin, Twitter, Clock,
  Sparkles, ArrowUpRight, Globe,
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
      } else if (data.useMailto) {
        // Auto-open mailto when API fails
        handleMailto();
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
      color: 'from-[#00B0F0] to-[#0098d4]',
      href: 'mailto:contactcodex.ma@gmail.com',
    },
    {
      icon: <Phone className="w-6 h-6" />,
      titleKey: 'ci_phone' as const,
      valueKey: 'ci_phone_val' as const,
      subKey: 'ci_phone_sub' as const,
      color: 'from-[#002A5C] to-[#004d8a]',
      href: 'tel:+212600000000',
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      titleKey: 'ci_address' as const,
      valueKey: 'ci_address_val' as const,
      subKey: 'ci_address_sub' as const,
      color: 'from-[#00B0F0] to-[#0098d4]',
      href: '#',
    },
    {
      icon: <Clock className="w-6 h-6" />,
      titleKey: 'ci_hours' as const,
      valueKey: 'ci_hours_val' as const,
      subKey: 'ci_hours_sub' as const,
      color: 'from-[#002A5C] to-[#004d8a]',
      href: '#',
    },
  ];

  return (
    <div className="pt-[72px]">
      {/* Header */}
      <section className="hero-gradient py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/30 pointer-events-none" />
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#00B0F0]/15 rounded-full blur-[140px] orb" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-[#00B0F0]/8 rounded-full blur-[120px] orb-delay" />
        <div className="absolute inset-0 grid-pattern opacity-[0.3]" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}>
            <span className="inline-flex items-center gap-2 bg-white/[0.12] backdrop-blur-xl border border-white/[0.2] text-white px-5 py-2.5 rounded-full text-sm font-semibold mb-6 shadow-lg">
              <Sparkles className="w-4 h-4 text-[#00D4FF]" />
              {t('contact_badge')}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
              {t('contact_title')}{' '}
              <span className="text-[#00D4FF] drop-shadow-[0_2px_12px_rgba(0,176,240,0.5)]">{t('contact_title_hl')}</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]">
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

      {/* Contact Channels - Horizontal Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {contactChannels.map((item, i) => (
              <motion.a
                key={i}
                href={item.href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group relative bg-gradient-to-br from-white to-[#f8fafc] rounded-2xl p-6 border border-[#e0e7ef]/80 block hover:shadow-2xl hover:shadow-[#002A5C]/[0.08] hover:border-[#00B0F0]/30 transition-all duration-400 h-full overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#00B0F0]/[0.06] to-transparent rounded-bl-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-400`}>
                    {item.icon}
                  </div>
                  <h3 className="font-extrabold text-[#002A5C] text-[14px] mb-1">{t(item.titleKey)}</h3>
                  <p className="text-[#3a4a5c] text-[13px] font-semibold leading-snug">{t(item.valueKey)}</p>
                  <p className="text-[#8a96a8] text-[12px] mt-1.5">{t(item.subKey)}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Main Form Section - Split Layout */}
      <section className="py-24 lg:py-28 mesh-gradient relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8 items-start">

            {/* Left Side - Info Panel (2 cols) */}
            <div className="lg:col-span-2 space-y-6">
              <FadeIn>
                {/* Location Card */}
                <motion.div whileHover={{ y: -3 }} className="relative bg-gradient-to-br from-[#0f2847] via-[#002A5C] to-[#004080] rounded-3xl p-8 text-white overflow-hidden shadow-xl shadow-[#002A5C]/20">
                  <div className="absolute inset-0 grid-pattern opacity-[0.12]" />
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#00B0F0]/[0.08] rounded-full blur-[60px]" />
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-[#00B0F0]/15 flex items-center justify-center mb-5">
                      <MapPin className="w-7 h-7 text-[#00D4FF]" />
                    </div>
                    <h3 className="text-xl font-extrabold mb-3">{t('contact_location')}</h3>
                    <p className="text-white/80 text-[15px] mb-1">{t('ci_address_val')}</p>
                    <p className="text-white/50 text-[13px] mb-6">{t('ci_address_sub')}</p>
                    <div className="flex items-center gap-3 bg-white/[0.06] rounded-xl px-4 py-3 border border-white/[0.08]">
                      <span className="relative flex items-center justify-center">
                        <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="absolute w-3 h-3 rounded-full bg-emerald-400 animate-ping opacity-30" />
                      </span>
                      <span className="text-white/70 text-[13px] font-medium">{t('contact_open')}</span>
                    </div>
                  </div>
                </motion.div>
              </FadeIn>

              <FadeIn delay={0.08}>
                {/* WhatsApp Card */}
                <motion.a
                  href="https://wa.me/212600000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.01 }}
                  className="relative bg-gradient-to-br from-emerald-500 via-emerald-600 to-green-700 rounded-3xl p-7 flex items-center gap-5 hover:shadow-2xl hover:shadow-emerald-500/25 transition-all duration-400 block overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative w-16 h-16 bg-white/[0.15] rounded-2xl flex items-center justify-center shrink-0 backdrop-blur-sm border border-white/[0.15]">
                    <MessageCircle className="w-7 h-7 text-white" />
                  </div>
                  <div className="relative">
                    <h3 className="font-extrabold text-white text-[17px] mb-0.5">{t('contact_wa_title')}</h3>
                    <p className="text-white/75 text-[13px]">{t('contact_wa_desc')}</p>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-white/40 ms-auto relative shrink-0 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </motion.a>
              </FadeIn>

              <FadeIn delay={0.15}>
                {/* Social Media Card */}
                <div className="bg-white rounded-3xl p-7 shadow-sm border border-[#e0e7ef]/80">
                  <h3 className="font-extrabold text-[#002A5C] mb-5 text-[16px]">{t('contact_social')}</h3>
                  <div className="flex items-center gap-3">
                    {[
                      { icon: <Instagram size={20} />, href: 'https://instagram.com/codex_ma', bg: 'from-purple-500 to-pink-500', shadow: 'shadow-purple-500/25' },
                      { icon: <Linkedin size={20} />, href: '#', bg: 'from-blue-600 to-blue-700', shadow: 'shadow-blue-600/25' },
                      { icon: <Twitter size={20} />, href: '#', bg: 'from-gray-800 to-black', shadow: 'shadow-gray-800/25' },
                      { icon: <Globe size={20} />, href: '#', bg: 'from-[#00B0F0] to-[#0098d4]', shadow: 'shadow-[#00B0F0]/25' },
                    ].map((social, i) => (
                      <motion.a
                        key={i}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.12, y: -4 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${social.bg} flex items-center justify-center text-white shadow-lg ${social.shadow} transition-all duration-300`}
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Right Side - Contact Form (3 cols) */}
            <div className="lg:col-span-3">
              <FadeIn delay={0.05}>
                <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-xl shadow-[#002A5C]/[0.06] border border-[#e0e7ef]/80 relative overflow-hidden">
                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#00B0F0]/[0.04] to-transparent rounded-bl-[80px]" />

                  <div className="relative mb-8">
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
                        <div>
                          <label className="block text-[13px] font-bold text-[#002A5C] mb-2">{t('form_name')}</label>
                          <input
                            id="name"
                            required
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full rounded-xl border border-[#e0e7ef] focus:border-[#00B0F0] focus:ring-2 focus:ring-[#00B0F0]/15 h-12 bg-[#fafbfc] px-4 text-[#002A5C] text-[14px] outline-none transition-all duration-200 placeholder:text-[#a0aab8]"
                            placeholder={t('form_name').replace(' *', '')}
                          />
                        </div>
                        <div>
                          <label className="block text-[13px] font-bold text-[#002A5C] mb-2">{t('form_email')}</label>
                          <input
                            id="email"
                            type="email"
                            required
                            dir="ltr"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="w-full rounded-xl border border-[#e0e7ef] focus:border-[#00B0F0] focus:ring-2 focus:ring-[#00B0F0]/15 h-12 bg-[#fafbfc] px-4 text-[#002A5C] text-[14px] outline-none transition-all duration-200 placeholder:text-[#a0aab8]"
                            placeholder="email@example.com"
                          />
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-[13px] font-bold text-[#002A5C] mb-2">{t('form_phone')}</label>
                          <input
                            id="phone"
                            type="tel"
                            dir="ltr"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            className="w-full rounded-xl border border-[#e0e7ef] focus:border-[#00B0F0] focus:ring-2 focus:ring-[#00B0F0]/15 h-12 bg-[#fafbfc] px-4 text-[#002A5C] text-[14px] outline-none transition-all duration-200 placeholder:text-[#a0aab8]"
                            placeholder="+212 6XX XXX XXX"
                          />
                        </div>
                        <div>
                          <label className="block text-[13px] font-bold text-[#002A5C] mb-2">{t('form_company')}</label>
                          <input
                            id="company"
                            value={form.company}
                            onChange={(e) => setForm({ ...form, company: e.target.value })}
                            className="w-full rounded-xl border border-[#e0e7ef] focus:border-[#00B0F0] focus:ring-2 focus:ring-[#00B0F0]/15 h-12 bg-[#fafbfc] px-4 text-[#002A5C] text-[14px] outline-none transition-all duration-200 placeholder:text-[#a0aab8]"
                            placeholder={t('form_company')}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[13px] font-bold text-[#002A5C] mb-2">{t('form_message')}</label>
                        <textarea
                          id="message"
                          required
                          rows={5}
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          className="w-full rounded-xl border border-[#e0e7ef] focus:border-[#00B0F0] focus:ring-2 focus:ring-[#00B0F0]/15 bg-[#fafbfc] px-4 py-3 text-[#002A5C] text-[14px] outline-none transition-all duration-200 resize-none placeholder:text-[#a0aab8] leading-relaxed"
                          placeholder={t('form_message').replace(' *', '')}
                        />
                      </div>

                      {/* Submit buttons */}
                      <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <motion.div whileHover={{ scale: loading ? 1 : 1.02 }} whileTap={{ scale: loading ? 1 : 0.98 }} className="flex-1">
                          <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-l from-[#00B0F0] to-[#0098d4] hover:from-[#00c4ff] hover:to-[#00B0F0] text-white font-bold rounded-2xl py-4 shadow-xl shadow-[#00B0F0]/25 hover:shadow-2xl hover:shadow-[#00B0F0]/35 transition-all duration-300 text-[15px] cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                          >
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
                              <span><Send className="w-5 h-5 me-2" />{t('form_submit')}</span>
                            )}
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            type="button"
                            onClick={handleMailto}
                            className="w-full sm:w-auto bg-white hover:bg-[#f8fafc] text-[#002A5C] font-bold rounded-2xl py-4 px-6 shadow-md border border-[#e0e7ef] hover:border-[#00B0F0]/30 transition-all duration-300 text-[15px] cursor-pointer"
                          >
                            <Mail className="w-5 h-5 me-2 text-[#00B0F0]" />
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
