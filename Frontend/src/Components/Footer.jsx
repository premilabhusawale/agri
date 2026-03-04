import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, CheckCircle, AlertCircle, Send, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

// Wheat Logo Component
const WheatLogo = ({ size = 24 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="wheatGradientFooter" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F4D03F" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
        <linearGradient id="leafGradientFooter" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2D5016" />
          <stop offset="100%" stopColor="#1A5D1A" />
        </linearGradient>
      </defs>
      <g transform="translate(65, 40)">
        <path d="M 15 140 Q 10 100 8 60 Q 7 30 10 0" stroke="url(#leafGradientFooter)" strokeWidth="3" fill="none" strokeLinecap="round" />
        <ellipse cx="6" cy="15" rx="5" ry="8" fill="url(#wheatGradientFooter)" opacity="0.95" />
        <ellipse cx="11" cy="22" rx="5" ry="8" fill="url(#wheatGradientFooter)" opacity="0.95" />
        <ellipse cx="5" cy="30" rx="5" ry="8" fill="url(#wheatGradientFooter)" opacity="0.9" />
        <ellipse cx="10" cy="38" rx="5" ry="8" fill="url(#wheatGradientFooter)" opacity="0.9" />
        <ellipse cx="6" cy="46" rx="5" ry="7" fill="url(#wheatGradientFooter)" opacity="0.85" />
        <ellipse cx="9" cy="54" rx="4.5" ry="7" fill="url(#wheatGradientFooter)" opacity="0.85" />
        <line x1="11" y1="15" x2="16" y2="8" stroke="#D4AF37" strokeWidth="0.8" opacity="0.7" />
        <line x1="16" y1="22" x2="22" y2="16" stroke="#D4AF37" strokeWidth="0.8" opacity="0.7" />
        <line x1="10" y1="30" x2="15" y2="24" stroke="#D4AF37" strokeWidth="0.8" opacity="0.6" />
      </g>
      <g transform="translate(80, 30)">
        <path d="M 10 150 Q 8 110 7 70 Q 6 35 8 0" stroke="url(#leafGradientFooter)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <ellipse cx="5" cy="10" rx="5.5" ry="9" fill="url(#wheatGradientFooter)" />
        <ellipse cx="10" cy="18" rx="5.5" ry="9" fill="url(#wheatGradientFooter)" />
        <ellipse cx="5" cy="27" rx="5.5" ry="9" fill="url(#wheatGradientFooter)" />
        <ellipse cx="9" cy="36" rx="5.5" ry="9" fill="url(#wheatGradientFooter)" />
        <ellipse cx="6" cy="45" rx="5" ry="8" fill="url(#wheatGradientFooter)" opacity="0.95" />
        <ellipse cx="8" cy="54" rx="5" ry="8" fill="url(#wheatGradientFooter)" opacity="0.95" />
        <ellipse cx="7" cy="63" rx="4.5" ry="7" fill="url(#wheatGradientFooter)" opacity="0.9" />
        <line x1="10" y1="10" x2="16" y2="3" stroke="#D4AF37" strokeWidth="1" opacity="0.8" />
        <line x1="15" y1="18" x2="21" y2="12" stroke="#D4AF37" strokeWidth="1" opacity="0.8" />
        <line x1="10" y1="27" x2="16" y2="21" stroke="#D4AF37" strokeWidth="1" opacity="0.7" />
        <line x1="14" y1="36" x2="20" y2="30" stroke="#D4AF37" strokeWidth="1" opacity="0.7" />
      </g>
      <g transform="translate(95, 20)">
        <path d="M 5 160 Q 4 115 3 70 Q 2 30 5 0" stroke="url(#leafGradientFooter)" strokeWidth="4" fill="none" strokeLinecap="round" />
        <ellipse cx="2" cy="8" rx="6" ry="10" fill="url(#wheatGradientFooter)" />
        <ellipse cx="7" cy="17" rx="6" ry="10" fill="url(#wheatGradientFooter)" />
        <ellipse cx="2" cy="27" rx="6" ry="10" fill="url(#wheatGradientFooter)" />
        <ellipse cx="6" cy="37" rx="6" ry="10" fill="url(#wheatGradientFooter)" />
        <ellipse cx="3" cy="47" rx="5.5" ry="9" fill="url(#wheatGradientFooter)" />
        <ellipse cx="5" cy="57" rx="5.5" ry="9" fill="url(#wheatGradientFooter)" />
        <ellipse cx="4" cy="67" rx="5" ry="8" fill="url(#wheatGradientFooter)" opacity="0.95" />
        <ellipse cx="5" cy="77" rx="5" ry="8" fill="url(#wheatGradientFooter)" opacity="0.95" />
        <line x1="8" y1="8" x2="15" y2="0" stroke="#D4AF37" strokeWidth="1.2" opacity="0.8" />
        <line x1="13" y1="17" x2="20" y2="10" stroke="#D4AF37" strokeWidth="1.2" opacity="0.8" />
        <line x1="8" y1="27" x2="15" y2="20" stroke="#D4AF37" strokeWidth="1.2" opacity="0.8" />
        <line x1="12" y1="37" x2="19" y2="30" stroke="#D4AF37" strokeWidth="1.2" opacity="0.8" />
        <line x1="9" y1="47" x2="16" y2="40" stroke="#D4AF37" strokeWidth="1" opacity="0.7" />
      </g>
      <g transform="translate(110, 30)">
        <path d="M 0 150 Q 2 110 3 70 Q 4 35 2 0" stroke="url(#leafGradientFooter)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <ellipse cx="5" cy="10" rx="5.5" ry="9" fill="url(#wheatGradientFooter)" />
        <ellipse cx="0" cy="18" rx="5.5" ry="9" fill="url(#wheatGradientFooter)" />
        <ellipse cx="5" cy="27" rx="5.5" ry="9" fill="url(#wheatGradientFooter)" />
        <ellipse cx="1" cy="36" rx="5.5" ry="9" fill="url(#wheatGradientFooter)" />
        <ellipse cx="4" cy="45" rx="5" ry="8" fill="url(#wheatGradientFooter)" opacity="0.95" />
        <ellipse cx="2" cy="54" rx="5" ry="8" fill="url(#wheatGradientFooter)" opacity="0.95" />
        <ellipse cx="3" cy="63" rx="4.5" ry="7" fill="url(#wheatGradientFooter)" opacity="0.9" />
        <line x1="0" y1="10" x2="-6" y2="3" stroke="#D4AF37" strokeWidth="1" opacity="0.8" />
        <line x1="-5" y1="18" x2="-11" y2="12" stroke="#D4AF37" strokeWidth="1" opacity="0.8" />
        <line x1="0" y1="27" x2="-6" y2="21" stroke="#D4AF37" strokeWidth="1" opacity="0.7" />
        <line x1="-4" y1="36" x2="-10" y2="30" stroke="#D4AF37" strokeWidth="1" opacity="0.7" />
      </g>
      <g transform="translate(125, 40)">
        <path d="M -5 140 Q 0 100 2 60 Q 3 30 0 0" stroke="url(#leafGradientFooter)" strokeWidth="3" fill="none" strokeLinecap="round" />
        <ellipse cx="4" cy="15" rx="5" ry="8" fill="url(#wheatGradientFooter)" opacity="0.95" />
        <ellipse cx="-1" cy="22" rx="5" ry="8" fill="url(#wheatGradientFooter)" opacity="0.95" />
        <ellipse cx="5" cy="30" rx="5" ry="8" fill="url(#wheatGradientFooter)" opacity="0.9" />
        <ellipse cx="0" cy="38" rx="5" ry="8" fill="url(#wheatGradientFooter)" opacity="0.9" />
        <ellipse cx="4" cy="46" rx="5" ry="7" fill="url(#wheatGradientFooter)" opacity="0.85" />
        <ellipse cx="1" cy="54" rx="4.5" ry="7" fill="url(#wheatGradientFooter)" opacity="0.85" />
        <line x1="-1" y1="15" x2="-6" y2="8" stroke="#D4AF37" strokeWidth="0.8" opacity="0.7" />
        <line x1="-6" y1="22" x2="-12" y2="16" stroke="#D4AF37" strokeWidth="0.8" opacity="0.7" />
        <line x1="0" y1="30" x2="-5" y2="24" stroke="#D4AF37" strokeWidth="0.8" opacity="0.6" />
      </g>
      <g opacity="0.7">
        <path d="M 70 170 Q 60 165 55 155" stroke="url(#leafGradientFooter)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M 130 170 Q 140 165 145 155" stroke="url(#leafGradientFooter)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
};

const Footer = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubscribe = async () => {
    setErrorMsg("");
    if (!email.trim()) { setStatus("error"); setErrorMsg(t('enterEmail')); return; }
    if (!validateEmail(email)) { setStatus("error"); setErrorMsg(t('invalidEmail')); return; }
    setStatus("loading");
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setStatus("success");
    setEmail("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubscribe();
  };

  // ✅ Routes match exactly what's defined in App.jsx
  const links = {
    marketplace: [
      { label: t("browseProducts"), to: "/MarketPlace" },
      { label: t("categories"), to: "/MarketPlace" },
      { label: t("featuredFarms"), to: "/MarketPlace" },
      { label: t("organicProduce"), to: "/MarketPlace" },
    ],
    farmers: [
      { label: t("sellProduce"), to: "/ForFarmers" },
      { label: t("pricingPlans"), to: "/ForFarmers" },
      { label: t("successStories"), to: "/ForFarmers" },
      { label: t("partnerWithUs"), to: "/ForFarmers" },
    ],
    support: [
      { label: t("helpCenter"), to: "/FAQs" },
      { label: t("contactUs"), to: "/ContactUs" },
      { label: t("FAQs"), to: "/FAQs" },
      { label: t("shippingInfo"), to: "/FAQs" },
    ],
    legal: [
      { label: t("privacyPolicy"), to: "/PrivacyPolicy" },
      { label: t("termsOfService"), to: "/TermsOfService" },
      { label: t("refundPolicy"), to: "/RefundPolicy" },
      { label: t("cookiePolicy"), to: "/CookiePolicy" },
    ],
  };

  return (
    <footer className="bg-gradient-to-br from-[#133928] via-[#1a4d35] to-[#133928] text-white overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-emerald-500 to-amber-400 opacity-50" />
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />


      {/* Newsletter Section */}
      <div className="relative border-b border-white/5">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-emerald-500/20 transition-colors" />

            <div className="flex flex-col lg:flex-row items-center gap-8 relative z-10">
              <div className="lg:w-1/2 text-center lg:text-left">
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4">
                  Newsletter
                </span>
                <h3 className="text-3xl font-black mb-3">{t('stayUpdated')}</h3>
                <p className="text-emerald-100/70 text-lg leading-relaxed">
                  {t('dailyAlerts')}
                </p>
              </div>

              <div className="lg:w-1/2 w-full">
                {status === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center gap-3 p-6 bg-emerald-500/20 rounded-2xl border border-emerald-500/30"
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/40">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-bold text-emerald-300">{t('subscribed')}</span>
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-3 p-2 bg-white/10 rounded-2xl border border-white/10 focus-within:border-emerald-500/50 transition-all shadow-inner">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); if (status === "error") setStatus("idle"); }}
                        onKeyDown={handleKeyDown}
                        placeholder={t('enterEmail')}
                        disabled={status === "loading"}
                        className="flex-1 px-4 py-3 bg-transparent text-white placeholder:text-white/40 rounded-xl focus:outline-none"
                      />
                      <button
                        onClick={handleSubscribe}
                        disabled={status === "loading"}
                        className="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-800 disabled:cursor-not-allowed text-[#133928] rounded-xl font-black transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 justify-center"
                      >
                        {status === "loading" ? (
                          <RefreshCw className="w-5 h-5 animate-spin" />
                        ) : (
                          <>
                            {t("subscribe")}
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                    {status === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-rose-400 text-xs font-semibold px-2"
                      >
                        <AlertCircle className="w-4 h-4" /><span>{errorMsg}</span>
                      </motion.div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-gradient-to-br from-amber-50 to-amber-100 p-2 rounded-full border border-amber-200/50">
                <WheatLogo size={24} />
              </span>
              <span className="text-xl font-bold">AgriConnect</span>
            </div>
            <p className="text-primary-foreground/70 text-sm mb-6">
              {t('empoweringFarmers')}
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-primary-foreground/70"><Mail className="w-4 h-4" />agriconnets@gmail.com</div>
              <div className="flex items-center gap-2 text-primary-foreground/70"><Phone className="w-4 h-4" />+91 1800-123-4567</div>
              <div className="flex items-center gap-2 text-primary-foreground/70"><MapPin className="w-4 h-4" />{t('mumbaiIndia')}</div>
            </div>
          </div>

          {/* Marketplace */}
          <div>
            <h4 className="font-semibold mb-4">{t('marketplace')}</h4>
            <ul className="space-y-2">
              {links.marketplace.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="text-sm text-primary-foreground/70 hover:text-primary-foreground hover:underline underline-offset-2 transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Farmers */}
          <div>
            <h4 className="font-semibold mb-4">{t('forFarmers')}</h4>
            <ul className="space-y-2">
              {links.farmers.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="text-sm text-primary-foreground/70 hover:text-primary-foreground hover:underline underline-offset-2 transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">{t('support')}</h4>
            <ul className="space-y-2">
              {links.support.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="text-sm text-primary-foreground/70 hover:text-primary-foreground hover:underline underline-offset-2 transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-emerald-400 mb-6 text-sm uppercase tracking-widest">{t('legal')}</h4>
            <ul className="space-y-3">
              {links.legal.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="text-sm text-emerald-100/60 hover:text-white transition-colors flex items-center gap-2 group">
                    <div className="w-1 h-1 rounded-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 bg-black/10">
        <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <p className="text-sm text-emerald-100/40">
              © 2026 AgriConnect. {t('allRightsReserved')}
            </p>
            <p className="text-[10px] text-emerald-100/20 uppercase tracking-[0.2em]">
              Designed for a Sustainable Future
            </p>
          </div>

          <div className="flex items-center gap-3">
            {[
              { Icon: Facebook, href: "https://facebook.com", color: "hover:bg-blue-600" },
              { Icon: Twitter, href: "https://twitter.com", color: "hover:bg-sky-500" },
              { Icon: Instagram, href: "https://instagram.com", color: "hover:bg-gradient-to-tr hover:from-yellow-500 hover:via-red-500 hover:to-purple-500" },
              { Icon: Youtube, href: "https://youtube.com", color: "hover:bg-red-600" }
            ].map(({ Icon, href, color }, i) => (
              <motion.a
                key={i}
                href={href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -4, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center transition-all duration-300 border border-white/5 ${color} hover:border-transparent hover:shadow-xl hover:shadow-black/20 group`}
              >
                <Icon className="w-5 h-5 text-emerald-100/60 group-hover:text-white transition-colors" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;