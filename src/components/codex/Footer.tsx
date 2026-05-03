'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram, Linkedin, Twitter, ArrowUp } from 'lucide-react';
import Image from 'next/image';

interface FooterProps {
  onNavigate: (page: string) => void;
}

const quickLinks = [
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
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (page: string) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-codex-dark text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/logo.png"
                alt="Codex"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <span className="text-2xl font-bold">Codex</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              وكالة برمجة مغربية متخصصة في تطوير الحلول الرقمية المتكاملة للشركات الصغيرة والمتوسطة. نساعدك تنتقل للعالم الرقمي بذكاء وسهولة.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/codex_ma"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-codex-accent flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-codex-accent flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-codex-accent flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.page}>
                  <button
                    onClick={() => handleNav(link.page)}
                    className="text-white/70 hover:text-codex-accent transition-colors text-sm cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-4">خدماتنا</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-white/70 text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">تواصل معنا</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-white/70 text-sm">
                <Phone size={16} className="text-codex-accent shrink-0" />
                <span dir="ltr">+212 600 000 000</span>
              </li>
              <li className="flex items-center gap-3 text-white/70 text-sm">
                <Mail size={16} className="text-codex-accent shrink-0" />
                <span>contact@codex.ma</span>
              </li>
              <li className="flex items-start gap-3 text-white/70 text-sm">
                <MapPin size={16} className="text-codex-accent shrink-0 mt-0.5" />
                <span>الدار البيضاء، المغرب</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} Codex. جميع الحقوق محفوظة.
          </p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-codex-accent flex items-center justify-center transition-all duration-300 cursor-pointer"
          >
            <ArrowUp size={18} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
