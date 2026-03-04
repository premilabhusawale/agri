import { motion } from "framer-motion";
import { UserPlus, Search, ShoppingCart, Truck } from "lucide-react";
import { useTranslation } from "react-i18next";

const HowItWorks = () => {
  const { t } = useTranslation();
  const steps = [
    {
      icon: UserPlus,
      title: t('step1Title'),
      description: t('step1Desc'),
      color: "from-blue-500 to-blue-600",
      lightColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      icon: Search,
      title: t('step2Title'),
      description: t('step2Desc'),
      color: "from-green-500 to-green-600",
      lightColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      icon: ShoppingCart,
      title: t('step3Title'),
      description: t('step3Desc'),
      color: "from-amber-500 to-amber-600",
      lightColor: "bg-amber-50",
      iconColor: "text-amber-600",
    },
    {
      icon: Truck,
      title: t('step4Title'),
      description: t('step4Desc'),
      color: "from-emerald-500 to-emerald-600",
      lightColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-green-50 text-green-700 text-xs font-black uppercase tracking-widest mb-6 border border-green-100 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            {t('howItWorksBadge')}
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
            Ready in <span className="text-green-600">4 Simple Steps</span>
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
            {t('howItWorksDesc')}
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-24 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent -z-10" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative group"
            >
              <div className="text-center">
                {/* Icon Container with Floating Animation */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
                  className="relative mb-10"
                >
                  {/* Step Number Badge */}
                  <div className={`absolute -top-4 -right-4 w-10 h-10 rounded-2xl bg-gradient-to-br ${step.color} text-white text-lg font-black flex items-center justify-center z-20 shadow-xl border-4 border-white transform -rotate-12 group-hover:rotate-0 transition-transform duration-500`}>
                    {index + 1}
                  </div>

                  {/* Icon Circle */}
                  <div className={`w-36 h-36 mx-auto rounded-[2.5rem] ${step.lightColor} flex items-center justify-center p-8 relative overflow-hidden group-hover:scale-105 transition-all duration-500 shadow-2xl shadow-black/5`}>
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
                    <step.icon size={48} className={`${step.iconColor} relative z-10 group-hover:scale-110 transition-transform duration-500`} />
                  </div>
                </motion.div>

                {/* Content */}
                <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight group-hover:text-green-600 transition-colors">{step.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed px-4">{step.description}</p>

                {/* Bottom Marker (Desktop) */}
                <div className="hidden lg:flex justify-center mt-12">
                  <div className={`w-3 h-3 rounded-full ${step.lightColor} border-2 border-white shadow-md group-hover:scale-150 transition-transform duration-500`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;