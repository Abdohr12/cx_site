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
} from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';

function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: 'easeOut' }} className={className}>
      {children}
    </motion.div>
  );
}

export default function ContactPage() {
  const { t } = useLang();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: '', email: '', phone: '', company: '', message: '' });
  };

  const info = [
    { icon: <Phone className="w-5 h-5 text-[#00B0F0]" />, titleKey: 'ci_phone' as const, valueKey: 'ci_phone_val' as const, subKey: 'ci_phone_sub' as const, href: 'tel:+212600000000' },
    { icon: <Mail className="w-5 h-5 text-[#00B0F0]" />, titleKey: 'ci_email' as const, valueKey: 'ci_email_val' as const, subKey: 'ci_email_sub' as const, href: 'mailto:contactcodex.ma@gmail.com' },
    { icon: <MapPin className="w-5 h-5 text-[#00B0F0]" />, titleKey: 'ci_address' as const, valueKey: 'ci_address_val' as const, subKey: 'ci_address_sub' as const, href: '#' },
    { icon: <Clock className="w-5 h-5 text-[#00B0F0]" />, titleKey: 'ci_hours' as const, valueKey: 'ci_hours_val' as const, subKey: 'ci_hours_sub' as const, href: '#' },
  ];

  const inputCls = 'rounded-xl border-[#e0e7ef] focus:border-[#00B0F0] focus:ring-[#00B0F0]/20';

  return (
    <div className="pt-[68px]">
      {/* Header */}
      <section className="hero-gradient py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#00B0F0]/10 rounded-full blur-[120px]" />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-block bg-white/10 backdrop-blur-sm text-white/90 px-4 py-2 rounded-full text-sm font-medium mb-5 border border-white/15">{t('contact_badge')}</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-5 leading-tight">
              {t('contact_title')} <span className="text-[#00B0F0]">{t('contact_title_hl')}</span>
            </h1>
            <p className="text-lg text-white/75 max-w-xl mx-auto leading-relaxed">
              {t('contact_desc')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {info.map((item, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <a href={item.href} className="bg-[#f8fafc] rounded-2xl p-5 border border-[#e0e7ef] block hover:shadow-md transition-all duration-200 h-full hover:translate-y-[-2px]">
                  <div className="w-9 h-9 rounded-lg bg-[#00B0F0]/10 flex items-center justify-center mb-3">{item.icon}</div>
                  <h3 className="font-bold text-[#002A5C] text-[14px] mb-0.5">{t(item.titleKey)}</h3>
                  <p className="text-[#3a4a5c] text-[13px] font-medium">{t(item.valueKey)}</p>
                  <p className="text-[#8a96a8] text-[12px] mt-0.5">{t(item.subKey)}</p>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Form & Map */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form */}
            <FadeIn>
              <div className="bg-white rounded-2xl p-7 lg:p-9 shadow-sm border border-[#e0e7ef]">
                <h2 className="text-2xl font-extrabold text-[#002A5C] mb-1">{t('contact_form_title')}</h2>
                <p className="text-[#5a6a7e] text-[15px] mb-7">{t('contact_form_desc')}</p>

                {submitted ? (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-16 text-center">
                    <CheckCircle2 className="w-14 h-14 text-green-500 mb-4" />
                    <h3 className="text-xl font-bold text-[#002A5C] mb-2">{t('form_success')}</h3>
                    <p className="text-[#5a6a7e] text-[15px]">{t('form_success_desc')}</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="name" className="text-[14px] font-medium text-[#002A5C]">{t('form_name')}</Label>
                        <Input id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="email" className="text-[14px] font-medium text-[#002A5C]">{t('form_email')}</Label>
                        <Input id="email" type="email" required dir="ltr" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="phone" className="text-[14px] font-medium text-[#002A5C]">{t('form_phone')}</Label>
                        <Input id="phone" type="tel" dir="ltr" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputCls} />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="company" className="text-[14px] font-medium text-[#002A5C]">{t('form_company')}</Label>
                        <Input id="company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className={inputCls} />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="message" className="text-[14px] font-medium text-[#002A5C]">{t('form_message')}</Label>
                      <Textarea id="message" required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${inputCls} resize-none`} />
                    </div>
                    <Button type="submit" className="w-full bg-[#00B0F0] hover:bg-[#009ad6] text-white font-bold rounded-xl py-3.5 shadow-lg shadow-[#00B0F0]/20 hover:shadow-xl transition-all duration-200 text-[15px] cursor-pointer">
                      <Send className="w-5 h-5 me-2" /> {t('form_submit')}
                    </Button>
                  </form>
                )}
              </div>
            </FadeIn>

            {/* Map & Social */}
            <FadeIn delay={0.12}>
              <div className="space-y-5">
                {/* Map */}
                <div className="bg-gradient-to-br from-[#002A5C] to-[#003d7a] rounded-2xl p-8 text-white relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10">
                    <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,176,240,0.4),transparent_70%)]" />
                  </div>
                  <div className="relative">
                    <MapPin className="w-9 h-9 text-[#00B0F0] mb-3" />
                    <h3 className="text-lg font-bold mb-1">{t('contact_location')}</h3>
                    <p className="text-white/80 text-[15px]">{t('ci_address_val')}</p>
                    <p className="text-white/55 text-[13px]">{t('ci_address_sub')}</p>
                    <div className="mt-5 flex items-center gap-2.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-white/65 text-[13px]">{t('ci_hours_avail')}</span>
                    </div>
                  </div>
                </div>

                {/* WhatsApp */}
                <a href="https://wa.me/212600000000" target="_blank" rel="noopener noreferrer" className="bg-green-50 rounded-2xl p-5 border border-green-200/50 flex items-center gap-4 hover:shadow-md transition-all duration-200 hover:translate-y-[-2px]">
                  <div className="w-11 h-11 rounded-xl bg-green-500 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#002A5C] text-[15px]">{t('contact_wa_title')}</h3>
                    <p className="text-[#5a6a7e] text-[13px]">{t('contact_wa_desc')}</p>
                  </div>
                </a>

                {/* Social */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e0e7ef]">
                  <h3 className="font-bold text-[#002A5C] mb-4 text-[15px]">{t('contact_social')}</h3>
                  <div className="flex items-center gap-3">
                    <a href="https://instagram.com/codex_ma" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-md shadow-purple-500/20 hover:scale-105 transition-transform duration-200">
                      <Instagram size={20} />
                    </a>
                    <a href="#" className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/20 hover:scale-105 transition-transform duration-200">
                      <Linkedin size={20} />
                    </a>
                    <a href="#" className="w-11 h-11 rounded-xl bg-black flex items-center justify-center text-white shadow-md shadow-black/20 hover:scale-105 transition-transform duration-200">
                      <Twitter size={20} />
                    </a>
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
