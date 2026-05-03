'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  MessageCircle,
  Instagram,
  Linkedin,
  Twitter,
  Clock,
} from 'lucide-react';

function FadeInSection({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', email: '', phone: '', company: '', message: '' });
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6 text-codex-accent" />,
      title: 'الهاتف',
      value: '+212 600 000 000',
      subValue: 'متاح من الإثنين للجمعة، 9ص - 6م',
      href: 'tel:+212600000000',
    },
    {
      icon: <Mail className="w-6 h-6 text-codex-accent" />,
      title: 'البريد الإلكتروني',
      value: 'contact@codex.ma',
      subValue: 'نرد خلال 24 ساعة',
      href: 'mailto:contact@codex.ma',
    },
    {
      icon: <MapPin className="w-6 h-6 text-codex-accent" />,
      title: 'العنوان',
      value: 'الدار البيضاء، المغرب',
      subValue: 'حي المعاريف، شارع محمد الخامس',
      href: '#',
    },
    {
      icon: <Clock className="w-6 h-6 text-codex-accent" />,
      title: 'ساعات العمل',
      value: 'الإثنين - الجمعة',
      subValue: '9:00 صباحاً - 6:00 مساءً',
      href: '#',
    },
  ];

  return (
    <div className="pt-16 lg:pt-20">
      {/* Header Section */}
      <section className="hero-gradient py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-codex-accent/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-white/10 backdrop-blur-sm text-white/90 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/10">
              اتصل بنا
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              عندك سؤال؟ <span className="text-codex-accent">مرحبا بك</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              كنا هنا لمساعدتك. سواء عندك مشروع جديد أو عندك سؤال، لا تتردد تتواصل معنا.
              الفريق جاهز!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {contactInfo.map((info, i) => (
              <FadeInSection key={i} delay={i * 0.1}>
                <motion.a
                  href={info.href}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="bg-gray-50/80 rounded-2xl p-5 lg:p-6 border border-border/50 block h-full hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-codex-accent/10 flex items-center justify-center mb-3">
                    {info.icon}
                  </div>
                  <h3 className="font-bold text-codex-dark text-sm lg:text-base mb-1">
                    {info.title}
                  </h3>
                  <p className="text-muted-foreground text-sm font-medium">{info.value}</p>
                  <p className="text-muted-foreground/70 text-xs mt-1">{info.subValue}</p>
                </motion.a>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 lg:py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <FadeInSection>
              <div className="bg-white rounded-2xl p-6 lg:p-10 shadow-sm border border-border/50">
                <h2 className="text-2xl lg:text-3xl font-bold text-codex-dark mb-2">
                  أرسل رسالة
                </h2>
                <p className="text-muted-foreground mb-8">
                  كمل الفورم هنا وسنرد عليك في أقرب وقت ممكن.
                </p>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
                    <h3 className="text-xl font-bold text-codex-dark mb-2">
                      تم إرسال رسالتك بنجاح!
                    </h3>
                    <p className="text-muted-foreground">
                      سنتواصل معك خلال 24 ساعة. شكراً لتواصلك مع Codex!
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium text-codex-dark">
                          الاسم الكامل *
                        </Label>
                        <Input
                          id="name"
                          required
                          placeholder="مثال: أحمد العلوي"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="rounded-xl border-border/80 focus:border-codex-accent focus:ring-codex-accent/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-codex-dark">
                          البريد الإلكتروني *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          placeholder="example@email.com"
                          dir="ltr"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="rounded-xl border-border/80 focus:border-codex-accent focus:ring-codex-accent/20 text-right"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-medium text-codex-dark">
                          رقم الهاتف
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+212 600 000 000"
                          dir="ltr"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className="rounded-xl border-border/80 focus:border-codex-accent focus:ring-codex-accent/20 text-right"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="company"
                          className="text-sm font-medium text-codex-dark"
                        >
                          اسم الشركة
                        </Label>
                        <Input
                          id="company"
                          placeholder="مثال: مركز التكوين المهني"
                          value={formData.company}
                          onChange={(e) =>
                            setFormData({ ...formData, company: e.target.value })
                          }
                          className="rounded-xl border-border/80 focus:border-codex-accent focus:ring-codex-accent/20"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="message"
                        className="text-sm font-medium text-codex-dark"
                      >
                        الرسالة *
                      </Label>
                      <Textarea
                        id="message"
                        required
                        placeholder="اوصف مشروعك أو سؤالك هنا..."
                        rows={5}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className="rounded-xl border-border/80 focus:border-codex-accent focus:ring-codex-accent/20 resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-codex-accent hover:bg-codex-accent/90 text-white font-bold rounded-xl py-3.5 shadow-lg shadow-codex-accent/25 hover:shadow-xl hover:shadow-codex-accent/30 transition-all duration-300 text-base"
                    >
                      <Send className="w-5 h-5 ml-2" />
                      أرسل الرسالة
                    </Button>
                  </form>
                )}
              </div>
            </FadeInSection>

            {/* Map & Social */}
            <FadeInSection delay={0.2}>
              <div className="space-y-6">
                {/* Map Placeholder */}
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="bg-gradient-to-br from-codex-dark to-codex-dark/90 rounded-2xl p-8 lg:p-10 text-white relative overflow-hidden"
                >
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,176,240,0.3),transparent_70%)]" />
                  </div>
                  <div className="relative">
                    <MapPin className="w-10 h-10 text-codex-accent mb-4" />
                    <h3 className="text-xl font-bold mb-2">موقعنا</h3>
                    <p className="text-white/80 mb-1">الدار البيضاء، المغرب</p>
                    <p className="text-white/60 text-sm">حي المعاريف، شارع محمد الخامس</p>
                    <div className="mt-6 flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-white/70 text-sm">مفتوح الآن - ساعات العمل: 9ص - 6م</span>
                    </div>
                  </div>
                </motion.div>

                {/* WhatsApp Quick Contact */}
                <motion.a
                  href="https://wa.me/212600000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="bg-green-50 rounded-2xl p-6 border border-green-200/50 flex items-center gap-4 block hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-codex-dark">تواصل عبر WhatsApp</h3>
                    <p className="text-muted-foreground text-sm">
                      أسرع طريقة للتواصل معنا. رد فوري!
                    </p>
                  </div>
                </motion.a>

                {/* Social Links */}
                <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-border/50">
                  <h3 className="font-bold text-codex-dark mb-4">تابعنا على السوشيال ميديا</h3>
                  <div className="flex items-center gap-3">
                    <motion.a
                      href="https://instagram.com/codex_ma"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/20 transition-all duration-300"
                    >
                      <Instagram size={22} />
                    </motion.a>
                    <motion.a
                      href="#"
                      whileHover={{ scale: 1.1 }}
                      className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20 transition-all duration-300"
                    >
                      <Linkedin size={22} />
                    </motion.a>
                    <motion.a
                      href="#"
                      whileHover={{ scale: 1.1 }}
                      className="w-12 h-12 rounded-xl bg-black flex items-center justify-center text-white shadow-lg shadow-black/20 transition-all duration-300"
                    >
                      <Twitter size={22} />
                    </motion.a>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>
    </div>
  );
}
