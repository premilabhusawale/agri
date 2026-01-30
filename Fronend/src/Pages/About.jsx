import React from 'react';
import { 
  Leaf, Users, TrendingUp, Shield, 
  MapPin, Heart, Award, Truck, User 
} from 'lucide-react';

const About = () => {
  const stats = [
    { label: 'Farmers Connected', value: '5,000+', icon: Users },
    { label: 'Products Listed', value: '25,000+', icon: Leaf },
    { label: 'Orders Delivered', value: '100,000+', icon: Truck },
    { label: 'Customer Satisfaction', value: '98%', icon: Heart },
  ];

  const values = [
    {
      icon: Leaf,
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
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-200 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-200 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-6 border border-green-200">
              <Leaf className="h-4 w-4" />
              About AgriConnect
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Bridging the Gap Between <span className="text-green-600">Farms</span> and <span className="text-green-600">Families</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              AgriConnect is revolutionizing how fresh produce reaches your table. 
              We connect farmers directly with consumers, ensuring fair prices, 
              fresher food, and a sustainable future for agriculture.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 text-white mb-4 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                  <stat.icon className="h-8 w-8" />
                </div>
                <p className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">{stat.value}</p>
                <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
              </div>
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
                  <Leaf className="h-32 w-32 mx-auto mb-4 text-white/60 drop-shadow-lg" />
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

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Passionate individuals committed to transforming agriculture.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member) => (
              <div key={member.name} className="text-center group">
                <div className="w-36 h-36 rounded-full mx-auto mb-4 bg-gradient-to-br from-green-400 via-green-500 to-green-600 flex items-center justify-center border-4 border-white shadow-xl group-hover:shadow-2xl group-hover:scale-105 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                  <User className="h-20 w-20 text-white relative z-10" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                <p className="text-green-600 text-sm font-semibold mb-2">{member.role}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{member.bio}</p>
              </div>
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
            <a href="/Auth" className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white text-green-600 font-bold hover:bg-gray-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105">Join as Farmer</a>
            <a href="/#marketplace" className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-white bg-white/10 backdrop-blur-sm text-white font-bold hover:bg-white/20 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105">Start Shopping</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;