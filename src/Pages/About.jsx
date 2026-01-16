import React from 'react';
import { 
  Leaf, Users, TrendingUp, Shield, 
  MapPin, Heart, Award, Truck, User 
} from 'lucide-react';

const Header = () => (
  <header className="bg-white border-b border-gray-200 py-4">
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Leaf className="h-8 w-8 text-green-600" />
          <span className="text-xl font-bold text-gray-900">AgriConnect</span>
        </div>
        <nav className="hidden md:flex gap-6">
          <a href="/" className="text-gray-600 hover:text-gray-900">Home</a>
          <a href="/about" className="text-gray-900 font-medium">About</a>
          <a href="/marketplace" className="text-gray-600 hover:text-gray-900">Marketplace</a>
        </nav>
      </div>
    </div>
  </header>
);

const Footer = () => (
  <footer className="bg-gray-900 text-white py-8">
    <div className="container mx-auto px-4 text-center">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Leaf className="h-6 w-6 text-green-500" />
        <span className="text-lg font-bold">AgriConnect</span>
      </div>
      <p className="text-gray-400 text-sm">© 2024 AgriConnect. All rights reserved.</p>
    </div>
  </footer>
);

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
      name: 'Rajesh Kumar',
      role: 'Founder & CEO',
      bio: 'Former agricultural officer with 15 years of experience in rural development.',
    },
    {
      name: 'Priya Sharma',
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
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-green-100 to-emerald-50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-6">
              <Leaf className="h-4 w-4" />
              About AgriConnect
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Bridging the Gap Between{' '}
              <span className="text-green-600">Farms</span> and{' '}
              <span className="text-green-600">Families</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              AgriConnect is revolutionizing how fresh produce reaches your table. 
              We connect farmers directly with consumers, ensuring fair prices, 
              fresher food, and a sustainable future for agriculture.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-3">
                  <stat.icon className="h-6 w-6" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  AgriConnect was born from a simple observation: farmers struggle to get 
                  fair prices for their produce, while consumers pay inflated prices for 
                  food that's been through multiple middlemen.
                </p>
                <p>
                  Founded in 2023, we set out to change this by creating a direct 
                  marketplace where farmers can list their produce and consumers can 
                  buy fresh, local food at fair prices.
                </p>
                <p>
                  Today, we work with thousands of farmers across India, helping them 
                  reach customers directly and build sustainable livelihoods while 
                  ensuring families get the freshest produce possible.
                </p>
              </div>
              <div className="flex items-center gap-2 mt-6 text-green-600">
                <MapPin className="h-5 w-5" />
                <span className="font-medium">Serving farmers and families across India</span>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-green-200 via-green-300 to-emerald-300 rounded-2xl shadow-xl flex items-center justify-center">
                <div className="text-center">
                  <Leaf className="h-24 w-24 mx-auto mb-4 text-green-700/40" />
                  <p className="text-lg font-semibold text-green-800">Farmer in Field</p>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-gray-200">
                <p className="text-2xl font-bold text-green-600">Since 2023</p>
                <p className="text-sm text-gray-600">Empowering farmers daily</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These core principles guide everything we do at AgriConnect.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                  <value.icon className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Passionate individuals committed to transforming agriculture.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <div key={member.name} className="text-center">
                <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-gradient-to-br from-green-200 to-green-400 flex items-center justify-center border-4 border-green-100">
                  <User className="h-16 w-16 text-green-700" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                <p className="text-green-600 text-sm font-medium mb-2">{member.role}</p>
                <p className="text-sm text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4 text-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Join the Revolution?
            </h2>
            <p className="text-gray-600 mb-8 max-w-xl mx-auto">
              Whether you're a farmer looking to sell directly or a consumer seeking 
              fresh, local produce, AgriConnect is here for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/auth"
                className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors"
              >
                Join as Farmer
              </a>
              <a
                href="/#marketplace"
                className="inline-flex items-center justify-center px-8 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 font-semibold hover:bg-gray-50 transition-colors"
              >
                Start Shopping
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;