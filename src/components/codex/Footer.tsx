'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram, Linkedin, Twitter, ArrowUp } from 'lucide-react';
import Image from 'next/image';

interface FooterProps {
  onNavigate: (page: string) => void;
}

const links = [
  { label: 'الرئيسية', page: 'home' },
  { label: 'خدماتنا', page: 'services' },
  { label: 'من نحن', page: 'about' },
  { label: 'اتصل بنا', page: 'contact' },
];

const services = [
  'تطوير مواقع الويب',
  'تطبيقات الموبايل',
  'أنظمة إدارة المتدربين',
  'حلول التجارة الإلكترونية',
  'تصميم واجهات المستخدم',
  'الدعم التقني والصيانة',
];

export default function Footer({ onNavigate }: FooterProps) {
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
              وكالة برمجة مغربية متخصصة في تطوير الحلول الرقمية المتكاملة للشركات الصغيرة والمتوسطة.
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
            <h3 className="text-[15px] font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-2.5">
              {links.map((l) => (
                <li key={l.page}>
                  <button onClick={() => nav(l.page)} className="text-white/60 hover:text-[#00B0F0] transition-colors text-[14px] cursor-pointer">{l.label}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-[15px] font-bold mb-4">خدماتنا</h3>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s}><span className="text-white/60 text-[14px]">{s}</span></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[15px] font-bold mb-4">تواصل معنا</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5 text-white/60 text-[14px]">
                <Phone size={14} className="text-[#00B0F0] shrink-0" />
                <span dir="ltr">+212 600 000 000</span>
              </li>
              <li className="flex items-center gap-2.5 text-white/60 text-[14px]">
                <Mail size={14} className="text-[#00B0F0] shrink-0" />
                <span>contact@codex.ma</span>
              </li>
              <li className="flex items-start gap-2.5 text-white/60 text-[14px]">
                <MapPin size={14} className="text-[#00B0F0] shrink-0 mt-0.5" />
                <span>الدار البيضاء، المغرب</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-5 flex items-center justify-between">
          <p className="text-white/40 text-[13px]">&copy; {new Date().getFullYear()} Codex. جميع الحقوق محفوظة.</p>
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
