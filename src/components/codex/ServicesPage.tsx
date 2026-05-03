'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Globe,
  Smartphone,
  Users,
  ShoppingCart,
  Palette,
  Headphones,
  Check,
  ChevronLeft,
  Star,
  Zap,
  Crown,
} from 'lucide-react';

interface ServicesPageProps {
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

export default function ServicesPage({ onNavigate }: ServicesPageProps) {
  const services = [
    {
      icon: <Globe className="w-8 h-8 text-codex-accent" />,
      title: 'تطوير مواقع الويب',
      description:
        'نصمم ونطور مواقع ويب احترافية وسريعة ومتجاوبة. من المواقع البسيطة للمنصات المعقدة، كلشي ممكن.',
      features: ['مواقع تجارية', 'منصات SaaS', 'لوحات التحكم', 'تحسين SEO'],
    },
    {
      icon: <Smartphone className="w-8 h-8 text-codex-accent" />,
      title: 'تطبيقات الموبايل',
      description:
        'تطبيقات موبايل عصرية لنظامي iOS و Android. أداء ممتاز وتجربة مستخدم رائعة.',
      features: ['iOS & Android', 'تطبيقات أصلية', 'PWA', 'إشعارات فورية'],
    },
    {
      icon: <Users className="w-8 h-8 text-codex-accent" />,
      title: 'أنظمة إدارة المتدربين',
      description:
        'نظام شامل لتدبير المتدربين، الحضور، النقاط، والشهادات. مصمم خصيصاً لمراكز التكوين.',
      features: ['تتبع الحضور', 'إدارة النقاط', 'إصدار الشهادات', 'تقارير مفصلة'],
    },
    {
      icon: <ShoppingCart className="w-8 h-8 text-codex-accent" />,
      title: 'حلول التجارة الإلكترونية',
      description:
        'متاجر إلكترونية متكاملة مع طرق دفع محلية وخدمة توصيل. بيع منتجاتك على الإنترنت بسهولة.',
      features: ['متاجر إلكترونية', 'دفع محلي', 'إدارة المخزون', 'تحليلات المبيعات'],
    },
    {
      icon: <Palette className="w-8 h-8 text-codex-accent" />,
      title: 'تصميم واجهات المستخدم',
      description:
        'تصميم واجهات عصرية وجميلة تحسن تجربة المستخدم. من الهوية البصرية للنماذج التفاعلية.',
      features: ['UI/UX Design', 'تصميم الهوية', 'نماذج أولية', 'تصميم متجاوب'],
    },
    {
      icon: <Headphones className="w-8 h-8 text-codex-accent" />,
      title: 'الدعم التقني والصيانة',
      description:
        'دعم تقني 24/7 وصيانة مستمرة لمشاريعك الرقمية. كن مطمئن، كينا هنا من أجلك.',
      features: ['دعم 24/7', 'صيانة دورية', 'تحديثات أمنية', 'نسخ احتياطي'],
    },
  ];

  const pricingPlans = [
    {
      name: 'أساسي',
      price: '1,500',
      period: 'درهم/شهر',
      description: 'مثالي للشركات الصغيرة اللي غادي تبدأ',
      icon: <Zap className="w-6 h-6" />,
      features: [
        'موقع ويب احترافي',
        'تصميم متجاوب',
        'حتى 5 صفحات',
        'نموذج اتصال',
        'تحسين SEO أساسي',
        'دعم عبر البريد',
      ],
      recommended: false,
    },
    {
      name: 'احترافي',
      price: '3,500',
      period: 'درهم/شهر',
      description: 'الأكثر طلباً للشركات المتوسطة',
      icon: <Star className="w-6 h-6" />,
      features: [
        'كل شي في الباقة الأساسية',
        'تطبيق موبايل',
        'لوحة تحكم',
        'حتى 20 صفحة',
        'تكامل مع وسائل التواصل',
        'نظام إدارة المحتوى',
        'تقارير وإحصائيات',
        'دعم أولوي 24/7',
      ],
      recommended: true,
    },
    {
      name: 'مؤسسات',
      price: 'حسب',
      period: 'الاحتياج',
      description: 'مخصص للشركات الكبيرة والمؤسسات',
      icon: <Crown className="w-6 h-6" />,
      features: [
        'كل شي في الباقة الاحترافية',
        'حلول مخصصة بالكامل',
        'فريق مخصص',
        'SLA مضمون',
        'تكاملات متقدمة',
        'تدريب الفريق',
        'دعم مخصص على مدار الساعة',
        'صيانة وتحديثات مستمرة',
      ],
      recommended: false,
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
              خدماتنا
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              خدمات مصممة{' '}
              <span className="text-codex-accent">للشركات المغربية</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              نقدم مجموعة واسعة من الخدمات الرقمية المتكاملة لمساعدتك تنمو وتتطور في
              العالم الرقمي
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, i) => (
              <FadeInSection key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-border/50 h-full group"
                >
                  <div className="w-14 h-14 rounded-xl bg-codex-accent/10 flex items-center justify-center mb-5 group-hover:bg-codex-accent/20 transition-colors duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-codex-dark mb-3">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-5">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature, j) => (
                      <Badge
                        key={j}
                        variant="secondary"
                        className="text-xs bg-codex-dark/5 text-codex-dark hover:bg-codex-dark/10"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 lg:py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-12 lg:mb-16">
            <span className="inline-block text-codex-accent text-sm font-semibold mb-3">
              الأسعار
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-codex-dark mb-4">
              باقات تناسب جميع الميزانيات
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              اختار الباقة اللي تناسب احتياجاتك. كل الباقات فيها دعم تقني وضمان الجودة.
            </p>
          </FadeInSection>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, i) => (
              <FadeInSection key={i} delay={i * 0.15}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className={`relative rounded-2xl p-6 lg:p-8 h-full flex flex-col ${
                    plan.recommended
                      ? 'bg-codex-dark text-white shadow-2xl shadow-codex-dark/30 scale-105 border-2 border-codex-accent'
                      : 'bg-white shadow-sm hover:shadow-xl border border-border/50'
                  }`}
                >
                  {plan.recommended && (
                    <div className="absolute -top-3 right-1/2 translate-x-1/2">
                      <Badge className="bg-codex-accent text-white text-xs font-bold px-3 py-1">
                        الأكثر طلباً
                      </Badge>
                    </div>
                  )}

                  <div className="mb-6">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                        plan.recommended
                          ? 'bg-codex-accent/20 text-codex-accent'
                          : 'bg-codex-accent/10 text-codex-accent'
                      }`}
                    >
                      {plan.icon}
                    </div>
                    <h3
                      className={`text-xl font-bold mb-1 ${
                        plan.recommended ? 'text-white' : 'text-codex-dark'
                      }`}
                    >
                      {plan.name}
                    </h3>
                    <p
                      className={`text-sm ${
                        plan.recommended ? 'text-white/70' : 'text-muted-foreground'
                      }`}
                    >
                      {plan.description}
                    </p>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span
                        className={`text-4xl font-bold ${
                          plan.recommended ? 'text-white' : 'text-codex-dark'
                        }`}
                      >
                        {plan.price}
                      </span>
                      <span
                        className={`text-sm ${
                          plan.recommended ? 'text-white/70' : 'text-muted-foreground'
                        }`}
                      >
                        {plan.period}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <Check
                          className={`w-5 h-5 shrink-0 mt-0.5 ${
                            plan.recommended ? 'text-codex-accent' : 'text-green-500'
                          }`}
                        />
                        <span
                          className={`text-sm ${
                            plan.recommended ? 'text-white/90' : 'text-muted-foreground'
                          }`}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => onNavigate('contact')}
                    className={`w-full font-semibold rounded-xl py-3 transition-all duration-300 ${
                      plan.recommended
                        ? 'bg-codex-accent hover:bg-codex-accent/90 text-white shadow-lg shadow-codex-accent/25'
                        : 'bg-codex-dark hover:bg-codex-dark/90 text-white'
                    }`}
                  >
                    ابدأ الآن
                    <ChevronLeft className="w-4 h-4 mr-1" />
                  </Button>
                </motion.div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeInSection>
            <h2 className="text-3xl sm:text-4xl font-bold text-codex-dark mb-4">
              محتار في الباقة اللي تناسبك؟
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              تواصل معنا واحنا نساعدك تختار الأفضل لمشروعك. الاستشارة مجانية!
            </p>
            <Button
              size="lg"
              onClick={() => onNavigate('contact')}
              className="bg-codex-accent hover:bg-codex-accent/90 text-white font-bold rounded-xl px-8 py-6 text-base shadow-xl shadow-codex-accent/25 hover:shadow-2xl hover:shadow-codex-accent/30 transition-all duration-300 hover:scale-105"
            >
              تواصل معنا مجاناً
              <ChevronLeft className="w-5 h-5 mr-2" />
            </Button>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
}
