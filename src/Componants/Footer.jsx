// Footer.jsx
import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react'; // Importing social media icons from lucide-react

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        {/* First Section: AgriConnect Logo and Description */}
        <div className="flex flex-col md:flex-row justify-between gap-16 mb-8">
          {/* AgriConnect Logo and Description */}
          <div className="flex flex-col md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-3xl font-bold">AgriConnect</h2>
            <p className="mt-2 text-lg">Bridging the gap between farmers and buyers with real-time market intelligence and direct trade.</p>
          </div>
        </div>

        {/* Social Media Icons Section: Positioned directly below AgriConnect */}
        <div className="flex justify-start space-x-8 mb-8">
          <a href="https://facebook.com" className="text-white hover:text-green-500">
            <Facebook size={32} />
          </a>
          <a href="https://twitter.com" className="text-white hover:text-green-500">
            <Twitter size={32} />
          </a>
          <a href="https://instagram.com" className="text-white hover:text-green-500">
            <Instagram size={32} />
          </a>
          <a href="https://youtube.com" className="text-white hover:text-green-500">
            <Youtube size={32} />
          </a>
        </div>

        {/* Divider Between AgriConnect and Quick Links */}
        <div className="border-t border-gray-700 mb-8"></div>

        {/* Second Section: Quick Links */}
        <div className="flex flex-col md:w-1/2 mb-8">
          <h3 className="font-bold text-xl mb-4">Quick Links</h3>
          <ul>
            <li className="mb-4"><a href="/" className="hover:text-green-500">Home</a></li>
            <li className="mb-4"><a href="/market-prices" className="hover:text-green-500">Market Prices</a></li>
            <li className="mb-4"><a href="/marketplace" className="hover:text-green-500">Marketplace</a></li>
            <li className="mb-4"><a href="/how-it-works" className="hover:text-green-500">How It Works</a></li>
            <li className="mb-4"><a href="/about-us" className="hover:text-green-500">About Us</a></li>
          </ul>
        </div>

        {/* Divider Between Quick Links and Resources */}
        <div className="border-t border-gray-700 mb-8"></div>

        {/* Third Section: Resources */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-8">
          <div>
            <h3 className="font-bold text-xl mb-4">Resources</h3>
            <ul>
              <li className="mb-4"><a href="/farmer-guide" className="hover:text-green-500">Farmer Guide</a></li>
              <li className="mb-4"><a href="/buyer-guide" className="hover:text-green-500">Buyer Guide</a></li>
              <li className="mb-4"><a href="/api-docs" className="hover:text-green-500">API Documentation</a></li>
              <li className="mb-4"><a href="/help-center" className="hover:text-green-500">Help Center</a></li>
              <li className="mb-4"><a href="/blog" className="hover:text-green-500">Blog</a></li>
            </ul>
          </div>
        </div>

        {/* Fourth Section: Contact Us */}
        <div className="grid md:grid-cols-2 gap-16 mb-8">
          <div>
            <h3 className="font-bold text-xl mb-4">Contact Us</h3>
            <ul>
              <li className="mb-4">123 AgriTech Hub, Sector 62, Noida, UP 201301</li>
              <li className="mb-4"><a href="tel:+911234567890" className="hover:text-green-500">+91 123 456 7890</a></li>
              <li className="mb-4"><a href="mailto:support@agriconnect.in" className="hover:text-green-500">support@agriconnect.in</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: Legal Links */}
        <div className="border-t border-gray-700 pt-4 mt-8 text-center">
          <p className="text-sm">
            &copy; 2024 AgriConnect. All rights reserved.
          </p>
          <div className="mt-4">
            <a href="/privacy-policy" className="text-sm hover:text-green-500">Privacy Policy</a>
            <span className="mx-2">|</span>
            <a href="/terms-of-service" className="text-sm hover:text-green-500">Terms of Service</a>
            <span className="mx-2">|</span>
            <a href="/cookie-policy" className="text-sm hover:text-green-500">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
