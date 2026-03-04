import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users, TrendingUp, Shield,
  MapPin, Heart, Award, Truck, User, ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';

// Wheat Logo Component
const WheatLogo = ({ size = 24, className = "" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="wheatGradientAbout" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F4D03F" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
        <linearGradient id="leafGradientAbout" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2D5016" />
          <stop offset="100%" stopColor="#1A5D1A" />
        </linearGradient>
      </defs>
      <g transform="translate(65, 40)">
        <path d="M 15 140 Q 10 100 8 60 Q 7 30 10 0" stroke="url(#leafGradientAbout)" strokeWidth="3" fill="none" strokeLinecap="round" />
        <ellipse cx="6" cy="15" rx="5" ry="8" fill="url(#wheatGradientAbout)" opacity="0.95" />
        <ellipse cx="11" cy="22" rx="5" ry="8" fill="url(#wheatGradientAbout)" opacity="0.95" />
        <ellipse cx="5" cy="30" rx="5" ry="8" fill="url(#wheatGradientAbout)" opacity="0.9" />
        <ellipse cx="10" cy="38" rx="5" ry="8" fill="url(#wheatGradientAbout)" opacity="0.9" />
        <ellipse cx="6" cy="46" rx="5" ry="7" fill="url(#wheatGradientAbout)" opacity="0.85" />
        <ellipse cx="9" cy="54" rx="4.5" ry="7" fill="url(#wheatGradientAbout)" opacity="0.85" />
        <line x1="11" y1="15" x2="16" y2="8" stroke="#D4AF37" strokeWidth="0.8" opacity="0.7" />
        <line x1="16" y1="22" x2="22" y2="16" stroke="#D4AF37" strokeWidth="0.8" opacity="0.7" />
        <line x1="10" y1="30" x2="15" y2="24" stroke="#D4AF37" strokeWidth="0.8" opacity="0.6" />
      </g>
      <g transform="translate(80, 30)">
        <path d="M 10 150 Q 8 110 7 70 Q 6 35 8 0" stroke="url(#leafGradientAbout)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <ellipse cx="5" cy="10" rx="5.5" ry="9" fill="url(#wheatGradientAbout)" />
        <ellipse cx="10" cy="18" rx="5.5" ry="9" fill="url(#wheatGradientAbout)" />
        <ellipse cx="5" cy="27" rx="5.5" ry="9" fill="url(#wheatGradientAbout)" />
        <ellipse cx="9" cy="36" rx="5.5" ry="9" fill="url(#wheatGradientAbout)" />
        <ellipse cx="6" cy="45" rx="5" ry="8" fill="url(#wheatGradientAbout)" opacity="0.95" />
        <ellipse cx="8" cy="54" rx="5" ry="8" fill="url(#wheatGradientAbout)" opacity="0.95" />
        <ellipse cx="7" cy="63" rx="4.5" ry="7" fill="url(#wheatGradientAbout)" opacity="0.9" />
        <line x1="10" y1="10" x2="16" y2="3" stroke="#D4AF37" strokeWidth="1" opacity="0.8" />
        <line x1="15" y1="18" x2="21" y2="12" stroke="#D4AF37" strokeWidth="1" opacity="0.8" />
        <line x1="10" y1="27" x2="16" y2="21" stroke="#D4AF37" strokeWidth="1" opacity="0.7" />
        <line x1="14" y1="36" x2="20" y2="30" stroke="#D4AF37" strokeWidth="1" opacity="0.7" />
      </g>
      <g transform="translate(95, 20)">
        <path d="M 5 160 Q 4 115 3 70 Q 2 30 5 0" stroke="url(#leafGradientAbout)" strokeWidth="4" fill="none" strokeLinecap="round" />
        <ellipse cx="2" cy="8" rx="6" ry="10" fill="url(#wheatGradientAbout)" />
        <ellipse cx="7" cy="17" rx="6" ry="10" fill="url(#wheatGradientAbout)" />
        <ellipse cx="2" cy="27" rx="6" ry="10" fill="url(#wheatGradientAbout)" />
        <ellipse cx="6" cy="37" rx="6" ry="10" fill="url(#wheatGradientAbout)" />
        <ellipse cx="3" cy="47" rx="5.5" ry="9" fill="url(#wheatGradientAbout)" />
        <ellipse cx="5" cy="57" rx="5.5" ry="9" fill="url(#wheatGradientAbout)" />
        <ellipse cx="4" cy="67" rx="5" ry="8" fill="url(#wheatGradientAbout)" opacity="0.95" />
        <ellipse cx="5" cy="77" rx="5" ry="8" fill="url(#wheatGradientAbout)" opacity="0.95" />
        <line x1="8" y1="8" x2="15" y2="0" stroke="#D4AF37" strokeWidth="1.2" opacity="0.8" />
        <line x1="13" y1="17" x2="20" y2="10" stroke="#D4AF37" strokeWidth="1.2" opacity="0.8" />
        <line x1="8" y1="27" x2="15" y2="20" stroke="#D4AF37" strokeWidth="1.2" opacity="0.8" />
        <line x1="12" y1="37" x2="19" y2="30" stroke="#D4AF37" strokeWidth="1.2" opacity="0.8" />
        <line x1="9" y1="47" x2="16" y2="40" stroke="#D4AF37" strokeWidth="1" opacity="0.7" />
      </g>
      <g transform="translate(110, 30)">
        <path d="M 0 150 Q 2 110 3 70 Q 4 35 2 0" stroke="url(#leafGradientAbout)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <ellipse cx="5" cy="10" rx="5.5" ry="9" fill="url(#wheatGradientAbout)" />
        <ellipse cx="0" cy="18" rx="5.5" ry="9" fill="url(#wheatGradientAbout)" />
        <ellipse cx="5" cy="27" rx="5.5" ry="9" fill="url(#wheatGradientAbout)" />
        <ellipse cx="1" cy="36" rx="5.5" ry="9" fill="url(#wheatGradientAbout)" />
        <ellipse cx="4" cy="45" rx="5" ry="8" fill="url(#wheatGradientAbout)" opacity="0.95" />
        <ellipse cx="2" cy="54" rx="5" ry="8" fill="url(#wheatGradientAbout)" opacity="0.95" />
        <ellipse cx="3" cy="63" rx="4.5" ry="7" fill="url(#wheatGradientAbout)" opacity="0.9" />
        <line x1="0" y1="10" x2="-6" y2="3" stroke="#D4AF37" strokeWidth="1" opacity="0.8" />
        <line x1="-5" y1="18" x2="-11" y2="12" stroke="#D4AF37" strokeWidth="1" opacity="0.8" />
        <line x1="0" y1="27" x2="-6" y2="21" stroke="#D4AF37" strokeWidth="1" opacity="0.7" />
        <line x1="-4" y1="36" x2="-10" y2="30" stroke="#D4AF37" strokeWidth="1" opacity="0.7" />
      </g>
      <g transform="translate(125, 40)">
        <path d="M -5 140 Q 0 100 2 60 Q 3 30 0 0" stroke="url(#leafGradientAbout)" strokeWidth="3" fill="none" strokeLinecap="round" />
        <ellipse cx="4" cy="15" rx="5" ry="8" fill="url(#wheatGradientAbout)" opacity="0.95" />
        <ellipse cx="-1" cy="22" rx="5" ry="8" fill="url(#wheatGradientAbout)" opacity="0.95" />
        <ellipse cx="5" cy="30" rx="5" ry="8" fill="url(#wheatGradientAbout)" opacity="0.9" />
        <ellipse cx="0" cy="38" rx="5" ry="8" fill="url(#wheatGradientAbout)" opacity="0.9" />
        <ellipse cx="4" cy="46" rx="5" ry="7" fill="url(#wheatGradientAbout)" opacity="0.85" />
        <ellipse cx="1" cy="54" rx="4.5" ry="7" fill="url(#wheatGradientAbout)" opacity="0.85" />
        <line x1="-1" y1="15" x2="-6" y2="8" stroke="#D4AF37" strokeWidth="0.8" opacity="0.7" />
        <line x1="-6" y1="22" x2="-12" y2="16" stroke="#D4AF37" strokeWidth="0.8" opacity="0.7" />
        <line x1="0" y1="30" x2="-5" y2="24" stroke="#D4AF37" strokeWidth="0.8" opacity="0.6" />
      </g>
      <g opacity="0.7">
        <path d="M 70 170 Q 60 165 55 155" stroke="url(#leafGradientAbout)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M 130 170 Q 140 165 145 155" stroke="url(#leafGradientAbout)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  )
}

const About = () => {
  const stats = [
    { label: 'Farmers Connected', value: '5,000+', icon: Users },
    { label: 'Products Listed', value: '25,000+', icon: WheatLogo },
    { label: 'Orders Delivered', value: '100,000+', icon: Truck },
    { label: 'Customer Satisfaction', value: '98%', icon: Heart },
  ];

  const values = [
    {
      icon: WheatLogo,
      title: 'Sustainability First',
      description: 'We promote organic farming practices and reduce food miles by connecting local farmers directly with consumers.',
    },
    {
      icon: Shield,
      title: 'Trust & Transparency',
      description: 'Every product is traceable to its source. Know exactly where your food comes from and who grew it.',
    },
    {
      icon: TrendingUp,
      title: 'Fair Pricing',
      description: 'By eliminating middlemen, farmers earn more while consumers pay less for fresher produce.',
    },
    {
      icon: Award,
      title: 'Quality Assured',
      description: 'We verify all farmers and ensure only the highest quality produce reaches your doorstep.',
    },
  ];

  const team = [
    {
      name: 'Sakshi Bhusawale',
      role: 'Founder & CEO',
      bio: 'Former agricultural officer with 15 years of experience in rural development.',
    },
    {
      name: 'Premila Bhusawale',
      role: 'Head of Operations',
      bio: 'Supply chain expert passionate about connecting farmers to markets.',
    },
    {
      name: 'Amit Patel',
      role: 'CTO',
      bio: 'Tech entrepreneur building platforms that empower rural communities.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-green-100 to-emerald-50" />
        <div className="absolute inset-0 opacity-20">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-10 w-72 h-72 bg-green-200 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-200 rounded-full blur-3xl"
          />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/60 backdrop-blur-md text-green-700 text-sm font-bold uppercase tracking-wider mb-8 border border-white shadow-sm">
                <WheatLogo size={16} />
                About AgriConnect
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-black text-gray-900 mb-8 leading-tight tracking-tight"
            >
              Bridging the Gap Between <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">Farms</span> and <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-600">Families</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-10"
            >
              AgriConnect is revolutionizing how fresh produce reaches your table.
              We connect farmers directly with consumers, ensuring fair prices,
              fresher food, and a sustainable future for agriculture.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex justify-center gap-4"
            >
              <Link to="/marketplace" className="px-8 py-4 bg-green-600 text-white rounded-2xl font-bold text-lg hover:bg-green-700 transition-all shadow-xl shadow-green-600/20 hover:-translate-y-1 flex items-center gap-2">
                Explore Marketplace <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 relative bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center group p-8 rounded-[2rem] hover:bg-green-50 transition-colors duration-500"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-green-500 to-emerald-600 text-white mb-6 shadow-2xl shadow-green-600/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <stat.icon size={32} />
                </div>
                <div className="text-5xl font-black text-gray-900 mb-2 tracking-tighter">{stat.value}</div>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>AgriConnect was born from a simple observation: farmers struggle to get fair prices for their produce, while consumers pay inflated prices for food that has been through multiple middlemen.</p>
                <p>Founded in 2026, we set out to change this by creating a direct marketplace where farmers can list their produce and consumers can buy fresh, local food at fair prices.</p>
                <p>Today, we work with thousands of farmers across India, helping them reach customers directly and build sustainable livelihoods while ensuring families get the freshest produce possible.</p>
              </div>
              <div className="flex items-center gap-2 mt-6 text-green-600">
                <MapPin className="h-5 w-5" />
                <span className="font-medium">Serving farmers and families across India</span>
              </div>
            </div>
            <div className="relative group">
              <div className="aspect-video bg-gradient-to-br from-green-400 via-green-500 to-green-600 rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden relative">
                <div className="absolute inset-0 bg-black/5"></div>
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white via-transparent to-transparent"></div>
                </div>
                <div className="text-center relative z-10 group-hover:scale-105 transition-transform duration-300">
                  <WheatLogo size={128} className="mx-auto mb-4 opacity-60 drop-shadow-lg" />
                  <p className="text-xl font-semibold text-white drop-shadow">Fresh from the Farm</p>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
                <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">Since 2026</p>
                <p className="text-sm text-gray-600 mt-1">Empowering farmers daily</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">These core principles guide everything we do at AgriConnect.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.title} className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-50 to-green-100 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -mr-16 -mt-16"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <value.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">Meet Our Leadership</h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium">Passionate individuals committed to transforming agriculture for a sustainable future.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {team.map((member, idx) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="group relative"
              >
                <div className="relative mb-8 aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-700 transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-20 transition-opacity duration-700 group-hover:opacity-40">
                    <User size={160} className="text-white" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-10 flex flex-col justify-end">
                    <h3 className="text-2xl font-black text-white mb-1 group-hover:translate-x-2 transition-transform duration-500">{member.name}</h3>
                    <p className="text-green-400 font-bold uppercase tracking-widest text-xs group-hover:translate-x-2 transition-transform duration-500 delay-75">{member.role}</p>
                  </div>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed font-medium px-4">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-green-500 via-green-600 to-green-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-96 h-96 bg-green-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">Ready to Join the Revolution?</h2>
          <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto drop-shadow">Whether you are a farmer looking to sell directly or a consumer seeking fresh, local produce, AgriConnect is here for you.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/Auth" className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white text-green-600 font-bold hover:bg-gray-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105">Join as Farmer</Link>
            <Link to="/marketplace" className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-white bg-white/10 backdrop-blur-sm text-white font-bold hover:bg-white/20 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105">Start Shopping</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;