import React from 'react';
import { Leaf, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  const links = {
    marketplace: ["Browse Products", "Categories", "Featured Farms", "Organic Produce"],
    farmers: ["Sell Your Produce", "Pricing Plans", "Success Stories", "Partner With Us"],
    support: ["Help Center", "Contact Us", "FAQs", "Shipping Info"],
    legal: ["Privacy Policy", "Terms of Service", "Refund Policy", "Cookie Policy"],
  };

  return (
   <footer className="bg-[#133928]  text-white text-primary-foreground">
      
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
      <p className="text-primary-foreground/70">
        Get daily price alerts and farming tips delivered to your inbox.
      </p>
    </div>
  </div>
</div>


      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-harvest flex items-center justify-center">
                <Leaf className="w-6 h-6 text-forest-dark" />
              </div>
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
            © 2024 AgriConnect. All rights reserved.
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
