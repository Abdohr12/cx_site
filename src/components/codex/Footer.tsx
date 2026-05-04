'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram, Linkedin, Twitter, ArrowUp } from 'lucide-react';
import Image from 'next/image';
import { useLang } from '@/lib/LanguageContext';
import type { TranslationKey } from '@/lib/i18n';

interface FooterProps {
  onNavigate: (page: string) => void;
}

const linkKeys: { page: string; key: TranslationKey }[] = [
  { page: 'home', key: 'nav_home' },
  { page: 'services', key: 'nav_services' },
  { page: 'portfolio', key: 'nav_portfolio' },
  { page: 'about', key: 'nav_about' },
  { page: 'contact', key: 'nav_contact' },
];

const serviceKeys: TranslationKey[] = [
  'svc_web_title', 'svc_mobile_title', 'svc_trainees_title',
  'svc_ecommerce_title', 'svc_design_title', 'svc_support_title',
];

export default function Footer({ onNavigate }: FooterProps) {
  const { t } = useLang();
  const goUp = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const nav = (page: string) => { onNavigate(page); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return (
    <footer className="relative overflow-hidden">
      {/* Top gradient divider */}
      <div className="h-1 bg-gradient-to-l from-[#00B0F0] via-[#004d8a] to-[#002A5C]" />

      <div className="bg-gradient-to-b from-[#001a3d] to-[#000d1a] text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00B0F0] to-[#0098d4] flex items-center justify-center shadow-lg shadow-[#00B0F0]/20">
                  <Image src="/logo.png" alt="Codex" width={26} height={26} className="rounded-md" />
                </div>
                <span className="text-[22px] font-extrabold">Codex</span>
              </div>
              <p className="text-white/50 text-[14px] leading-relaxed mb-6">
                {t('footer_brand')}
              </p>
              <div className="flex items-center gap-2.5">
                {[
                  { icon: <Instagram size={16} />, href: 'https://instagram.com/codex_ma' },
                  { icon: <Linkedin size={16} />, href: '#' },
                  { icon: <Twitter size={16} />, href: '#' },
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 rounded-xl bg-white/[0.06] hover:bg-[#00B0F0] flex items-center justify-center transition-all duration-300 border border-white/[0.06] hover:border-[#00B0F0]"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Links */}
            <div>
              <h3 className="text-[15px] font-extrabold mb-6 uppercase tracking-wider text-white/70">{t('footer_links')}</h3>
              <ul className="space-y-3">
                {linkKeys.map((l) => (
                  <li key={l.page}>
                    <button onClick={() => nav(l.page)} className="text-white/50 hover:text-[#00B0F0] transition-colors text-[14px] font-medium cursor-pointer hover:translate-x-1 transform inline-block">{t(l.key)}</button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-[15px] font-extrabold mb-6 uppercase tracking-wider text-white/70">{t('footer_services')}</h3>
              <ul className="space-y-3">
                {serviceKeys.map((key) => (
                  <li key={key}><span className="text-white/50 text-[14px] font-medium hover:text-[#00B0F0] transition-colors cursor-default">{t(key)}</span></li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-[15px] font-extrabold mb-6 uppercase tracking-wider text-white/70">{t('footer_contact')}</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-white/50 text-[14px]">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0">
                    <Phone size={14} className="text-[#00B0F0]" />
                  </div>
                  <span dir="ltr">+212 600 000 000</span>
                </li>
                <li className="flex items-center gap-3 text-white/50 text-[14px]">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0">
                    <Mail size={14} className="text-[#00B0F0]" />
                  </div>
                  <span dir="ltr">{t('ci_email_val')}</span>
                </li>
                <li className="flex items-start gap-3 text-white/50 text-[14px]">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin size={14} className="text-[#00B0F0]" />
                  </div>
                  <span>{t('ci_address_val')}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex items-center justify-between">
            <p className="text-white/30 text-[13px]">&copy; {new Date().getFullYear()} Codex. {t('footer_copyright')}</p>
            <motion.button
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              onClick={goUp}
              className="w-10 h-10 rounded-xl bg-white/[0.06] hover:bg-[#00B0F0] flex items-center justify-center transition-all duration-300 cursor-pointer border border-white/[0.06] hover:border-[#00B0F0]"
            >
              <ArrowUp size={16} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
