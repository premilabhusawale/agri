import { 
  Leaf, TrendingUp, Users, Wallet, Truck, 
  Shield, BarChart3, MessageSquare, CheckCircle2,
  ArrowRight, Star
} from 'lucide-react';

const ForFarmers = () => {
  const benefits = [
    {
      icon: Wallet,
      title: 'Better Prices',
      description: 'Earn up to 40% more by selling directly to consumers. No middlemen taking your profits.',
      stat: '40%',
      statLabel: 'Higher earnings',
    },
    {
      icon: Users,
      title: 'Direct Access to Buyers',
      description: 'Connect with thousands of consumers actively looking for fresh, local produce.',
      stat: '50K+',
      statLabel: 'Active buyers',
    },
    {
      icon: Truck,
      title: 'Flexible Delivery',
      description: 'Choose your delivery zones and schedules. We help coordinate logistics.',
      stat: '100+',
      statLabel: 'Delivery zones',
    },
    {
      icon: BarChart3,
      title: 'Smart Dashboard',
      description: 'Track orders, manage inventory, and analyze sales with our intuitive dashboard.',
      stat: 'Real-time',
      statLabel: 'Analytics',
    },
    {
      icon: MessageSquare,
      title: 'Direct Communication',
      description: 'Chat directly with buyers. Build relationships and get feedback on your produce.',
      stat: 'Instant',
      statLabel: 'Messaging',
    },
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'Get paid directly to your bank account. Secure, reliable, and on time.',
      stat: '100%',
      statLabel: 'Payment security',
    },
  ];

  const steps = [
    {
      step: '01',
      title: 'Create Your Account',
      description: 'Sign up for free and set up your farmer profile with your farm details.',
    },
    {
      step: '02',
      title: 'List Your Products',
      description: 'Add your produce with photos, prices, and available quantities.',
    },
    {
      step: '03',
      title: 'Receive Orders',
      description: 'Get notified when buyers place orders and manage them from your dashboard.',
    },
    {
      step: '04',
      title: 'Deliver & Get Paid',
      description: 'Fulfill orders and receive payments directly to your account.',
    },
  ];

  const testimonials = [
    {
      name: 'Ramesh Yadav',
      farm: 'Green Valley Farms, Punjab',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      quote: 'Since joining AgriConnect, my income has increased by 35%. I now sell directly to families who appreciate quality produce.',
      rating: 5,
    },
    {
      name: 'Lakshmi Devi',
      farm: 'Organic Fields, Karnataka',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      quote: 'The platform is so easy to use. I can manage all my orders from my phone while working in the fields.',
      rating: 5,
    },
    {
      name: 'Suresh Patel',
      farm: 'Fresh Harvest, Gujarat',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      quote: 'No more haggling with middlemen. I set my prices, and customers pay fairly for my hard work.',
      rating: 5,
    },
  ];

  const faqs = [
    {
      question: 'Is it free to join AgriConnect?',
      answer: 'Yes! Creating an account and listing your products is completely free. We only charge a small commission on successful sales.',
    },
    {
      question: 'How do I get paid?',
      answer: 'Payments are transferred directly to your bank account within 2-3 business days after order delivery is confirmed.',
    },
    {
      question: 'Do I need to handle delivery?',
      answer: 'You can choose to deliver yourself within your preferred zones, or use our partner logistics network for wider reach.',
    },
    {
      question: 'What products can I sell?',
      answer: 'You can sell fresh vegetables, fruits, grains, dairy products, and other farm produce. All products must meet our quality guidelines.',
    },
  ];

  const handleNavigateToAuth = () => {
    window.location.href = '/auth';
  };

  const scrollToHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1920)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/80" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-6">
                <Leaf className="h-4 w-4" />
                For Farmers
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Grow Your Farm,{' '}
                <span className="text-green-600">Grow Your Income</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-lg">
                Join thousands of farmers who are earning more by selling directly to consumers. 
                No middlemen, fair prices, and a platform that works for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                  onClick={handleNavigateToAuth}
                >
                  Start Selling Today
                  <ArrowRight className="h-5 w-5" />
                </button>
                <button 
                  className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium"
                  onClick={scrollToHowItWorks}
                >
                  See How It Works
                </button>
              </div>
              
              <div className="flex items-center gap-8 mt-10 pt-8 border-t border-gray-200">
                <div>
                  <p className="text-3xl font-bold text-gray-900">5,000+</p>
                  <p className="text-sm text-gray-600">Farmers joined</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">₹2Cr+</p>
                  <p className="text-sm text-gray-600">Paid to farmers</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">4.9★</p>
                  <p className="text-sm text-gray-600">Farmer rating</p>
                </div>
              </div>
            </div>
            
            <div className="hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=600"
                alt="Happy farmer"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Farmers Choose AgriConnect
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Everything you need to grow your farming business and reach more customers.
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="bg-white p-6 rounded-2xl border border-gray-200 hover:shadow-xl transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                      <Icon className="h-7 w-7 text-green-600" />
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">{benefit.stat}</p>
                      <p className="text-xs text-gray-600">{benefit.statLabel}</p>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                How It Works
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Get started in minutes and start selling your produce today.
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={step.step}
                className="relative"
              >
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gray-200 -translate-x-1/2" />
                )}
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-green-600 text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Hear From Our Farmers
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Real stories from farmers who transformed their business with AgriConnect.
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="bg-white p-6 rounded-2xl border border-gray-200"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-900 mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.farm}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
            </div>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={faq.question}
                  className="bg-white border border-gray-200 rounded-xl p-6"
                >
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 pl-8">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ready to Grow Your Income?
            </h2>
            <p className="text-gray-600 mb-8">
              Join 5,000+ farmers already selling on AgriConnect. 
              It's free to sign up and takes less than 5 minutes.
            </p>
            <button 
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium text-lg"
              onClick={handleNavigateToAuth}
            >
              <Leaf className="h-5 w-5" />
              Join as a Farmer
              <ArrowRight className="h-5 w-5" />
            </button>
            <p className="text-sm text-gray-600 mt-4">
              No credit card required • Free to join • Start selling today
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForFarmers;