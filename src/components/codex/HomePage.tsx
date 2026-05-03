'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  Users,
  CalendarCheck,
  BarChart3,
  Star,
  ChevronLeft,
  ArrowLeft,
  Building2,
  GraduationCap,
  Store,
  Laptop,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

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

export default function HomePage({ onNavigate }: HomePageProps) {
  const features = [
    {
      icon: <Users className="w-8 h-8 text-codex-accent" />,
      title: 'إدارة المتدربين',
      description: 'تتبع حضور المتدربين، نقاطهم، وتقدمهم في مكان واحد. كلشي منظّم وسهل.',
    },
    {
      icon: <CalendarCheck className="w-8 h-8 text-codex-accent" />,
      title: 'الجدولة الذكية',
      description: 'نظّم الحصص والمواعيد تلقائياً بلا تعقيد. وفّر وقتك وركّز على اللي يهمك.',
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-codex-accent" />,
      title: 'تقارير مفصّلة',
      description: 'احصل على تقارير واضحة تساعدك تتخذ قرارات أحسن. إحصائيات دقيقة في الوقت الحقيقي.',
    },
  ];

  const trustedBy = [
    { icon: <GraduationCap className="w-6 h-6" />, name: 'مراكز التكوين' },
    { icon: <Building2 className="w-6 h-6" />, name: 'الشركات الناشئة' },
    { icon: <Store className="w-6 h-6" />, name: 'المتاجر الإلكترونية' },
    { icon: <Laptop className="w-6 h-6" />, name: 'الوكالات الرقمية' },
  ];

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="relative hero-gradient min-h-[90vh] flex items-center overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-codex-accent/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-codex-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/10">
                  <Star className="w-4 h-4 text-codex-accent" />
                  الوكالة رقم 1 في المغرب للحلول الرقمية
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
              >
                نظّم شركتك{' '}
                <span className="text-codex-accent">بذكاء</span>...
                <br />
                مع{' '}
                <span className="relative inline-block">
                  Codex
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="absolute -bottom-2 right-0 h-1 bg-codex-accent rounded-full"
                  />
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg text-white/80 leading-relaxed mb-8 max-w-xl"
              >
                حلول رقمية متكاملة مصممة خصيصاً للشركات المغربية الصغيرة والمتوسطة.
                وفّر الوقت، حسّن الإنتاجية، وركّز على اللي يهمك.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="flex flex-wrap gap-4"
              >
                <Button
                  size="lg"
                  onClick={() => onNavigate('contact')}
                  className="bg-codex-accent hover:bg-codex-accent/90 text-white font-bold rounded-xl px-8 py-6 text-base shadow-xl shadow-codex-accent/30 hover:shadow-2xl hover:shadow-codex-accent/40 transition-all duration-300 hover:scale-105"
                >
                  جرب Codex مجاناً
                  <ChevronLeft className="w-5 h-5 mr-2" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => onNavigate('services')}
                  className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:text-white font-semibold rounded-xl px-8 py-6 text-base transition-all duration-300"
                >
                  شوف كيفاش كتخدم
                  <ArrowLeft className="w-5 h-5 mr-2" />
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex items-center gap-6 mt-10 text-white/70 text-sm"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span>دعم تقني 24/7</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-codex-accent" />
                  <span>بدون التزام</span>
                </div>
              </motion.div>
            </div>

            {/* Hero Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:block"
            >
              <div className="relative">
                {/* Main card */}
                <div className="glass rounded-3xl p-8 shadow-2xl">
                  <div className="bg-white/10 rounded-2xl p-6 mb-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-white/70 text-sm">إحصائيات الشهر</span>
                      <span className="text-codex-accent text-xs font-medium">هذا الشهر</span>
                    </div>
                    <div className="text-4xl font-bold text-white mb-1">+127%</div>
                    <p className="text-white/60 text-sm">نمو في الإنتاجية</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/10 rounded-xl p-4">
                      <Users className="w-5 h-5 text-codex-accent mb-2" />
                      <div className="text-xl font-bold text-white">485</div>
                      <div className="text-white/60 text-xs">متدرب نشط</div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4">
                      <CalendarCheck className="w-5 h-5 text-codex-accent mb-2" />
                      <div className="text-xl font-bold text-white">32</div>
                      <div className="text-white/60 text-xs">حصة هاد الأسبوع</div>
                    </div>
                  </div>
                </div>

                {/* Floating elements */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-4 -left-4 glass rounded-2xl p-4 shadow-xl"
                >
                  <BarChart3 className="w-6 h-6 text-codex-accent" />
                </motion.div>
                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-4 -right-4 glass rounded-2xl p-4 shadow-xl"
                >
                  <Star className="w-6 h-6 text-yellow-400" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-12 lg:py-16 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <p className="text-center text-muted-foreground text-sm font-medium mb-8">
              أكثر من 50 شركة مغربية تثق في Codex
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
              {trustedBy.map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-3 text-muted-foreground/60"
                >
                  {item.icon}
                  <span className="text-sm font-medium">{item.name}</span>
                </motion.div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-12 lg:mb-16">
            <span className="inline-block text-codex-accent text-sm font-semibold mb-3">
              الميزات
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-codex-dark mb-4">
              كل اللي تحتاجه في مكان واحد
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              أدوات قوية مصممة خصيصاً للشركات المغربية. سهلة الاستخدام، فعّالة، وموثوقة.
            </p>
          </FadeInSection>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, i) => (
              <FadeInSection key={i} delay={i * 0.15}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-border/50 h-full"
                >
                  <div className="w-14 h-14 rounded-xl bg-codex-accent/10 flex items-center justify-center mb-5">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-codex-dark mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </motion.div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-codex-dark/5 to-codex-accent/5 rounded-3xl p-8 lg:p-12 border border-codex-accent/10"
              >
                <div className="flex items-center justify-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-xl lg:text-2xl font-medium text-codex-dark leading-relaxed mb-8">
                  &ldquo;من وقت اللي بدأنا نستخدم Codex، الإنتاجية تزاودت بـ 200%. النظام سهل بزاف،
                  والدعم التقني سريع ومتجاوب. أنصح أي شركة مغربية تجربهم.&rdquo;
                </blockquote>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-codex-dark flex items-center justify-center text-white font-bold text-lg">
                    أ
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-codex-dark">أحمد بنعلي</div>
                    <div className="text-sm text-muted-foreground">
                      مدير مركز التكوين المهني، الدار البيضاء
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 cta-gradient relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-codex-accent/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeInSection>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              جاهز تبدأ رحلتك الرقمية؟
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              انضم لأكثر من 50 شركة مغربية كتستفيد من حلول Codex الرقمية. ابدأ اليوم مجاناً!
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={() => onNavigate('contact')}
                className="bg-white text-codex-dark hover:bg-white/90 font-bold rounded-xl px-8 py-6 text-base shadow-xl transition-all duration-300 hover:scale-105"
              >
                ابدأ مجاناً الآن
                <ChevronLeft className="w-5 h-5 mr-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => onNavigate('services')}
                className="bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white font-semibold rounded-xl px-8 py-6 text-base transition-all duration-300"
              >
                اطلع على الأسعار
              </Button>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
}
