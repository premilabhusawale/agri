import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

// Wheat Logo Component
const WheatLogo = ({ size = 24 }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 200 200" 
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Gradient for wheat */}
        <linearGradient id="wheatGradientFooter" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F4D03F" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
        
        {/* Gradient for leaves */}
        <linearGradient id="leafGradientFooter" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2D5016" />
          <stop offset="100%" stopColor="#1A5D1A" />
        </linearGradient>
      </defs>
      
      {/* Central wheat bundle - 5 stalks */}
      
      {/* Left wheat stalk */}
      <g transform="translate(65, 40)">
        {/* Stem */}
        <path d="M 15 140 Q 10 100 8 60 Q 7 30 10 0" 
              stroke="url(#leafGradientFooter)" 
              strokeWidth="3" 
              fill="none"
              strokeLinecap="round"/>
        
        {/* Wheat grains */}
        <ellipse cx="6" cy="15" rx="5" ry="8" fill="url(#wheatGradientFooter)" opacity="0.95"/>
        <ellipse cx="11" cy="22" rx="5" ry="8" fill="url(#wheatGradientFooter)" opacity="0.95"/>
        <ellipse cx="5" cy="30" rx="5" ry="8" fill="url(#wheatGradientFooter)" opacity="0.9"/>
        <ellipse cx="10" cy="38" rx="5" ry="8" fill="url(#wheatGradientFooter)" opacity="0.9"/>
        <ellipse cx="6" cy="46" rx="5" ry="7" fill="url(#wheatGradientFooter)" opacity="0.85"/>
        <ellipse cx="9" cy="54" rx="4.5" ry="7" fill="url(#wheatGradientFooter)" opacity="0.85"/>
        
        {/* Awns (whiskers) */}
        <line x1="11" y1="15" x2="16" y2="8" stroke="#D4AF37" strokeWidth="0.8" opacity="0.7"/>
        <line x1="16" y1="22" x2="22" y2="16" stroke="#D4AF37" strokeWidth="0.8" opacity="0.7"/>
        <line x1="10" y1="30" x2="15" y2="24" stroke="#D4AF37" strokeWidth="0.8" opacity="0.6"/>
      </g>
      
      {/* Left-center wheat stalk */}
      <g transform="translate(80, 30)">
        <path d="M 10 150 Q 8 110 7 70 Q 6 35 8 0" 
              stroke="url(#leafGradientFooter)" 
              strokeWidth="3.5" 
              fill="none"
              strokeLinecap="round"/>
        
        <ellipse cx="5" cy="10" rx="5.5" ry="9" fill="url(#wheatGradientFooter)"/>
        <ellipse cx="10" cy="18" rx="5.5" ry="9" fill="url(#wheatGradientFooter)"/>
        <ellipse cx="5" cy="27" rx="5.5" ry="9" fill="url(#wheatGradientFooter)"/>
        <ellipse cx="9" cy="36" rx="5.5" ry="9" fill="url(#wheatGradientFooter)"/>
        <ellipse cx="6" cy="45" rx="5" ry="8" fill="url(#wheatGradientFooter)" opacity="0.95"/>
        <ellipse cx="8" cy="54" rx="5" ry="8" fill="url(#wheatGradientFooter)" opacity="0.95"/>
        <ellipse cx="7" cy="63" rx="4.5" ry="7" fill="url(#wheatGradientFooter)" opacity="0.9"/>
        
        <line x1="10" y1="10" x2="16" y2="3" stroke="#D4AF37" strokeWidth="1" opacity="0.8"/>
        <line x1="15" y1="18" x2="21" y2="12" stroke="#D4AF37" strokeWidth="1" opacity="0.8"/>
        <line x1="10" y1="27" x2="16" y2="21" stroke="#D4AF37" strokeWidth="1" opacity="0.7"/>
        <line x1="14" y1="36" x2="20" y2="30" stroke="#D4AF37" strokeWidth="1" opacity="0.7"/>
      </g>
      
      {/* Center wheat stalk - tallest and most prominent */}
      <g transform="translate(95, 20)">
        <path d="M 5 160 Q 4 115 3 70 Q 2 30 5 0" 
              stroke="url(#leafGradientFooter)" 
              strokeWidth="4" 
              fill="none"
              strokeLinecap="round"/>
        
        <ellipse cx="2" cy="8" rx="6" ry="10" fill="url(#wheatGradientFooter)"/>
        <ellipse cx="7" cy="17" rx="6" ry="10" fill="url(#wheatGradientFooter)"/>
        <ellipse cx="2" cy="27" rx="6" ry="10" fill="url(#wheatGradientFooter)"/>
        <ellipse cx="6" cy="37" rx="6" ry="10" fill="url(#wheatGradientFooter)"/>
        <ellipse cx="3" cy="47" rx="5.5" ry="9" fill="url(#wheatGradientFooter)"/>
        <ellipse cx="5" cy="57" rx="5.5" ry="9" fill="url(#wheatGradientFooter)"/>
        <ellipse cx="4" cy="67" rx="5" ry="8" fill="url(#wheatGradientFooter)" opacity="0.95"/>
        <ellipse cx="5" cy="77" rx="5" ry="8" fill="url(#wheatGradientFooter)" opacity="0.95"/>
        
        <line x1="8" y1="8" x2="15" y2="0" stroke="#D4AF37" strokeWidth="1.2" opacity="0.8"/>
        <line x1="13" y1="17" x2="20" y2="10" stroke="#D4AF37" strokeWidth="1.2" opacity="0.8"/>
        <line x1="8" y1="27" x2="15" y2="20" stroke="#D4AF37" strokeWidth="1.2" opacity="0.8"/>
        <line x1="12" y1="37" x2="19" y2="30" stroke="#D4AF37" strokeWidth="1.2" opacity="0.8"/>
        <line x1="9" y1="47" x2="16" y2="40" stroke="#D4AF37" strokeWidth="1" opacity="0.7"/>
      </g>
      
      {/* Right-center wheat stalk */}
      <g transform="translate(110, 30)">
        <path d="M 0 150 Q 2 110 3 70 Q 4 35 2 0" 
              stroke="url(#leafGradientFooter)" 
              strokeWidth="3.5" 
              fill="none"
              strokeLinecap="round"/>
        
        <ellipse cx="5" cy="10" rx="5.5" ry="9" fill="url(#wheatGradientFooter)"/>
        <ellipse cx="0" cy="18" rx="5.5" ry="9" fill="url(#wheatGradientFooter)"/>
        <ellipse cx="5" cy="27" rx="5.5" ry="9" fill="url(#wheatGradientFooter)"/>
        <ellipse cx="1" cy="36" rx="5.5" ry="9" fill="url(#wheatGradientFooter)"/>
        <ellipse cx="4" cy="45" rx="5" ry="8" fill="url(#wheatGradientFooter)" opacity="0.95"/>
        <ellipse cx="2" cy="54" rx="5" ry="8" fill="url(#wheatGradientFooter)" opacity="0.95"/>
        <ellipse cx="3" cy="63" rx="4.5" ry="7" fill="url(#wheatGradientFooter)" opacity="0.9"/>
        
        <line x1="0" y1="10" x2="-6" y2="3" stroke="#D4AF37" strokeWidth="1" opacity="0.8"/>
        <line x1="-5" y1="18" x2="-11" y2="12" stroke="#D4AF37" strokeWidth="1" opacity="0.8"/>
        <line x1="0" y1="27" x2="-6" y2="21" stroke="#D4AF37" strokeWidth="1" opacity="0.7"/>
        <line x1="-4" y1="36" x2="-10" y2="30" stroke="#D4AF37" strokeWidth="1" opacity="0.7"/>
      </g>
      
      {/* Right wheat stalk */}
      <g transform="translate(125, 40)">
        <path d="M -5 140 Q 0 100 2 60 Q 3 30 0 0" 
              stroke="url(#leafGradientFooter)" 
              strokeWidth="3" 
              fill="none"
              strokeLinecap="round"/>
        
        <ellipse cx="4" cy="15" rx="5" ry="8" fill="url(#wheatGradientFooter)" opacity="0.95"/>
        <ellipse cx="-1" cy="22" rx="5" ry="8" fill="url(#wheatGradientFooter)" opacity="0.95"/>
        <ellipse cx="5" cy="30" rx="5" ry="8" fill="url(#wheatGradientFooter)" opacity="0.9"/>
        <ellipse cx="0" cy="38" rx="5" ry="8" fill="url(#wheatGradientFooter)" opacity="0.9"/>
        <ellipse cx="4" cy="46" rx="5" ry="7" fill="url(#wheatGradientFooter)" opacity="0.85"/>
        <ellipse cx="1" cy="54" rx="4.5" ry="7" fill="url(#wheatGradientFooter)" opacity="0.85"/>
        
        <line x1="-1" y1="15" x2="-6" y2="8" stroke="#D4AF37" strokeWidth="0.8" opacity="0.7"/>
        <line x1="-6" y1="22" x2="-12" y2="16" stroke="#D4AF37" strokeWidth="0.8" opacity="0.7"/>
        <line x1="0" y1="30" x2="-5" y2="24" stroke="#D4AF37" strokeWidth="0.8" opacity="0.6"/>
      </g>
      
      {/* Decorative leaves at the base */}
      <g opacity="0.7">
        <path d="M 70 170 Q 60 165 55 155" 
              stroke="url(#leafGradientFooter)" 
              strokeWidth="2.5" 
              fill="none"
              strokeLinecap="round"/>
        <path d="M 130 170 Q 140 165 145 155" 
              stroke="url(#leafGradientFooter)" 
              strokeWidth="2.5" 
              fill="none"
              strokeLinecap="round"/>
      </g>
    </svg>
  )
}

const Footer = () => {
  const links = {
    marketplace: ["Browse Products", "Categories", "Featured Farms", "Organic Produce"],
    farmers: ["Sell Your Produce", "Pricing Plans", "Success Stories", "Partner With Us"],
    support: ["Help Center", "Contact Us", "FAQs", "Shipping Info"],
    legal: ["Privacy Policy", "Terms of Service", "Refund Policy", "Cookie Policy"],
  };

  return (
   <footer className="bg-[#133928] text-white text-primary-foreground">
      
      {/* Newsletter Section */}
<div className="border-b border-primary-foreground/10">
  <div className="container mx-auto px-4 py-12">
    <div className="max-w-2xl mx-auto text-center
                    bg-primary-foreground/5
                    rounded-xl
                    p-8">
      <h3 className="text-2xl font-bold mb-2">
        Stay Updated with Market Prices
      </h3>
      <p className="text-primary-foreground/70 mb-6">
        Get daily price alerts and farming tips delivered to your inbox.
      </p>
      {/* Added newsletter form */}
      <form className="flex gap-3 max-w-md mx-auto">
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-1 px-4 py-2 bg-white/10 border border-white/20 text-white placeholder:text-white/50 rounded"
        />
        <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-medium">
          Subscribe
        </button>
      </form>
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
              Empowering farmers with real-time market prices and direct access to buyers.
              Building a fair and transparent agricultural ecosystem.
            </p>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-primary-foreground/70">
                <Mail className="w-4 h-4" />
                support@agriconnect.in
              </div>
              <div className="flex items-center gap-2 text-primary-foreground/70">
                <Phone className="w-4 h-4" />
                +91 1800-123-4567
              </div>
              <div className="flex items-center gap-2 text-primary-foreground/70">
                <MapPin className="w-4 h-4" />
                Mumbai, Maharashtra, India
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Marketplace</h4>
            <ul className="space-y-2">
              {links.marketplace.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">For Farmers</h4>
            <ul className="space-y-2">
              {links.farmers.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              {links.support.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {links.legal.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-foreground/60">
            © 2026 AgriConnect. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <a href="https://www.facebook.com" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://twitter.com" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://www.youtube.com" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;