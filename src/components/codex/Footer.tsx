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
    <footer className="bg-[#001a3d] text-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <Image src="/logo.png" alt="Codex" width={34} height={34} className="rounded-lg" />
              <span className="text-xl font-bold">Codex</span>
            </div>
            <p className="text-white/60 text-[14px] leading-relaxed mb-5">
              {t('footer_brand')}
            </p>
            <div className="flex items-center gap-2.5">
              <a href="https://instagram.com/codex_ma" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#00B0F0] flex items-center justify-center transition-colors duration-200">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#00B0F0] flex items-center justify-center transition-colors duration-200">
                <Linkedin size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#00B0F0] flex items-center justify-center transition-colors duration-200">
                <Twitter size={16} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-[15px] font-bold mb-4">{t('footer_links')}</h3>
            <ul className="space-y-2.5">
              {linkKeys.map((l) => (
                <li key={l.page}>
                  <button onClick={() => nav(l.page)} className="text-white/60 hover:text-[#00B0F0] transition-colors text-[14px] cursor-pointer">{t(l.key)}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-[15px] font-bold mb-4">{t('footer_services')}</h3>
            <ul className="space-y-2.5">
              {serviceKeys.map((key) => (
                <li key={key}><span className="text-white/60 text-[14px]">{t(key)}</span></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[15px] font-bold mb-4">{t('footer_contact')}</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5 text-white/60 text-[14px]">
                <Phone size={14} className="text-[#00B0F0] shrink-0" />
                <span dir="ltr">+212 600 000 000</span>
              </li>
              <li className="flex items-center gap-2.5 text-white/60 text-[14px]">
                <Mail size={14} className="text-[#00B0F0] shrink-0" />
                <span dir="ltr">{t('ci_email_val')}</span>
              </li>
              <li className="flex items-start gap-2.5 text-white/60 text-[14px]">
                <MapPin size={14} className="text-[#00B0F0] shrink-0 mt-0.5" />
                <span>{t('ci_address_val')}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-5 flex items-center justify-between">
          <p className="text-white/40 text-[13px]">&copy; {new Date().getFullYear()} Codex. {t('footer_copyright')}</p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={goUp}
            className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#00B0F0] flex items-center justify-center transition-colors duration-200 cursor-pointer"
          >
            <ArrowUp size={16} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
