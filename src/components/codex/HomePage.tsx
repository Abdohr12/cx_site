'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  Users,
  CalendarCheck,
  BarChart3,
  Star,
  ArrowLeft,
  Building2,
  GraduationCap,
  Store,
  Laptop,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const features = [
    {
      icon: <Users className="w-7 h-7 text-[#00B0F0]" />,
      title: 'إدارة المتدربين',
      description: 'تتبع حضور المتدربين، نقاطهم، وتقدمهم في مكان واحد. كلشي منظّم وسهل الاستخدام.',
    },
    {
      icon: <CalendarCheck className="w-7 h-7 text-[#00B0F0]" />,
      title: 'الجدولة الذكية',
      description: 'نظّم الحصص والمواعيد تلقائياً بلا تعقيد. وفّر وقتك وركّز على اللي يهمك فعلاً.',
    },
    {
      icon: <BarChart3 className="w-7 h-7 text-[#00B0F0]" />,
      title: 'تقارير مفصّلة',
      description: 'احصل على تقارير واضحة تساعدك تتخذ قرارات أحسن. إحصائيات دقيقة في الوقت الحقيقي.',
    },
  ];

  const trustedBy = [
    { icon: <GraduationCap className="w-5 h-5" />, name: 'مراكز التكوين' },
    { icon: <Building2 className="w-5 h-5" />, name: 'الشركات الناشئة' },
    { icon: <Store className="w-5 h-5" />, name: 'المتاجر الإلكترونية' },
    { icon: <Laptop className="w-5 h-5" />, name: 'الوكالات الرقمية' },
  ];

  return (
    <div className="pt-[68px]">
      {/* ===== HERO ===== */}
      <section className="hero-gradient relative min-h-[92vh] flex items-center overflow-hidden">
        {/* Decorative blurs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00B0F0]/15 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />

        <div className="relative max-w-6xl mx-auto px-5 sm:px-6 py-20 lg:py-0">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Text side */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6"
              >
                <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 px-4 py-2 rounded-full text-sm font-medium border border-white/15">
                  <Star className="w-4 h-4 text-[#00B0F0] fill-[#00B0F0]" />
                  الوكالة رقم 1 في المغرب للحلول الرقمية
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-[2.5rem] sm:text-5xl lg:text-[3.5rem] font-extrabold text-white leading-[1.2] mb-6"
              >
                نظّم شركتك{' '}
                <span className="text-[#00B0F0]">بذكاء</span>...
                <br />
                مع{' '}
                <span className="relative inline-block">
                  Codex
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.7, delay: 0.7 }}
                    className="absolute bottom-1 right-0 h-[3px] bg-[#00B0F0] rounded-full"
                  />
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-white/75 leading-[1.8] mb-8 max-w-lg"
              >
                حلول رقمية متكاملة مصممة خصيصاً للشركات المغربية الصغيرة والمتوسطة.
                وفّر الوقت، حسّن الإنتاجية، وركّز على اللي يهمك.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap gap-3 mb-10"
              >
                <Button
                  size="lg"
                  onClick={() => onNavigate('contact')}
                  className="bg-[#00B0F0] hover:bg-[#009ad6] text-white font-bold rounded-xl px-7 py-[14px] text-[16px] shadow-lg shadow-[#00B0F0]/25 hover:shadow-xl transition-all duration-200 cursor-pointer"
                >
                  جرب Codex مجاناً
                  <ArrowLeft className="w-5 h-5 mr-2" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => onNavigate('services')}
                  className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:text-white font-semibold rounded-xl px-7 py-[14px] text-[16px] transition-all duration-200 cursor-pointer"
                >
                  شوف كيفاش كتخدم
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex items-center gap-6 text-white/65 text-sm"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  دعم تقني 24/7
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00B0F0]" />
                  بدون التزام
                </span>
              </motion.div>
            </div>

            {/* Visual side */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="glass rounded-3xl p-7">
                  <div className="bg-white/[0.07] rounded-2xl p-5 mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-white/65 text-sm">إحصائيات الشهر</span>
                      <span className="text-[#00B0F0] text-xs font-medium bg-[#00B0F0]/10 px-2.5 py-1 rounded-full">هذا الشهر</span>
                    </div>
                    <div className="text-[2.5rem] font-extrabold text-white leading-none mb-1">+127%</div>
                    <p className="text-white/55 text-sm">نمو في الإنتاجية</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/[0.07] rounded-xl p-4">
                      <Users className="w-5 h-5 text-[#00B0F0] mb-2" />
                      <div className="text-xl font-bold text-white">485</div>
                      <div className="text-white/50 text-xs">متدرب نشط</div>
                    </div>
                    <div className="bg-white/[0.07] rounded-xl p-4">
                      <CalendarCheck className="w-5 h-5 text-[#00B0F0] mb-2" />
                      <div className="text-xl font-bold text-white">32</div>
                      <div className="text-white/50 text-xs">حصة هاد الأسبوع</div>
                    </div>
                  </div>
                </div>

                <motion.div
                  animate={{ y: [-8, 8, -8] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-5 -right-5 glass rounded-2xl p-3.5 shadow-xl"
                >
                  <BarChart3 className="w-6 h-6 text-[#00B0F0]" />
                </motion.div>
                <motion.div
                  animate={{ y: [8, -8, 8] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-5 -left-5 glass rounded-2xl p-3.5 shadow-xl"
                >
                  <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== TRUSTED BY ===== */}
      <section className="py-10 bg-white border-b border-[#e0e7ef]">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <FadeIn>
            <p className="text-center text-[#5a6a7e] text-sm font-medium mb-7">
              أكثر من 50 شركة مغربية تثق في Codex
            </p>
            <div className="flex flex-wrap items-center justify-center gap-7 sm:gap-12">
              {trustedBy.map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 text-[#8a96a8]">
                  {item.icon}
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="py-20 lg:py-28 bg-[#f8fafc]">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <FadeIn className="text-center mb-14">
            <span className="inline-block text-[#00B0F0] text-sm font-bold mb-2">الميزات</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#002A5C] mb-4">
              كل اللي تحتاجه في مكان واحد
            </h2>
            <p className="text-[#5a6a7e] max-w-xl mx-auto text-[17px] leading-relaxed">
              أدوات قوية مصممة خصيصاً للشركات المغربية. سهلة الاستخدام، فعّالة، وموثوقة.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <FadeIn key={i} delay={i * 0.12}>
                <div className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-lg transition-all duration-300 border border-[#e0e7ef] h-full group">
                  <div className="w-13 h-13 rounded-xl bg-[#00B0F0]/10 flex items-center justify-center mb-5 group-hover:bg-[#00B0F0]/20 transition-colors">
                    {f.icon}
                  </div>
                  <h3 className="text-lg font-bold text-[#002A5C] mb-3">{f.title}</h3>
                  <p className="text-[#5a6a7e] leading-relaxed text-[15px]">{f.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIAL ===== */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <FadeIn>
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-gradient-to-br from-[#002A5C]/[0.03] to-[#00B0F0]/[0.06] rounded-3xl p-8 lg:p-12 border border-[#00B0F0]/10">
                <div className="flex items-center justify-center gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-xl lg:text-[22px] font-medium text-[#002A5C] leading-[1.9] mb-8">
                  &ldquo;من وقت اللي بدأنا نستخدم Codex، الإنتاجية تزاودت بـ 200%. النظام سهل بزاف،
                  والدعم التقني سريع ومتجاوب. أنصح أي شركة مغربية تجربهم.&rdquo;
                </p>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#002A5C] flex items-center justify-center text-white font-bold text-base">
                    أ
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-[#002A5C] text-[15px]">أحمد بنعلي</div>
                    <div className="text-[13px] text-[#5a6a7e]">مدير مركز التكوين المهني، الدار البيضاء</div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="cta-gradient py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/[0.04] rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#00B0F0]/10 rounded-full blur-[120px]" />
        </div>
        <div className="relative max-w-3xl mx-auto px-5 sm:px-6 text-center">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-5 leading-tight">
              جاهز تبدأ رحلتك الرقمية؟
            </h2>
            <p className="text-lg text-white/75 mb-8 max-w-xl mx-auto leading-relaxed">
              انضم لأكثر من 50 شركة مغربية كتستفيد من حلول Codex الرقمية. ابدأ اليوم مجاناً!
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button
                size="lg"
                onClick={() => onNavigate('contact')}
                className="bg-white text-[#002A5C] hover:bg-white/90 font-bold rounded-xl px-7 py-[14px] text-[16px] shadow-xl transition-all duration-200 cursor-pointer"
              >
                ابدأ مجاناً الآن
                <ArrowLeft className="w-5 h-5 mr-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => onNavigate('services')}
                className="bg-transparent border-white/25 text-white hover:bg-white/10 hover:text-white font-semibold rounded-xl px-7 py-[14px] text-[16px] transition-all duration-200 cursor-pointer"
              >
                اطلع على الأسعار
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
