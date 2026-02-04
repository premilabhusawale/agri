import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, Users, Wallet, Truck, 
  Shield, BarChart3, MessageSquare, CheckCircle2,
  ArrowRight, Star
} from 'lucide-react';

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
        {/* Gradient for wheat */}
        <linearGradient id="wheatGradientForFarmers" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F4D03F" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
        
        {/* Gradient for leaves */}
        <linearGradient id="leafGradientForFarmers" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2D5016" />
          <stop offset="100%" stopColor="#1A5D1A" />
        </linearGradient>
      </defs>
      
      {/* Central wheat bundle - 5 stalks */}
      
      {/* Left wheat stalk */}
      <g transform="translate(65, 40)">
        {/* Stem */}
        <path d="M 15 140 Q 10 100 8 60 Q 7 30 10 0" 
              stroke="url(#leafGradientForFarmers)" 
              strokeWidth="3" 
              fill="none"
              strokeLinecap="round"/>
        
        {/* Wheat grains */}
        <ellipse cx="6" cy="15" rx="5" ry="8" fill="url(#wheatGradientForFarmers)" opacity="0.95"/>
        <ellipse cx="11" cy="22" rx="5" ry="8" fill="url(#wheatGradientForFarmers)" opacity="0.95"/>
        <ellipse cx="5" cy="30" rx="5" ry="8" fill="url(#wheatGradientForFarmers)" opacity="0.9"/>
        <ellipse cx="10" cy="38" rx="5" ry="8" fill="url(#wheatGradientForFarmers)" opacity="0.9"/>
        <ellipse cx="6" cy="46" rx="5" ry="7" fill="url(#wheatGradientForFarmers)" opacity="0.85"/>
        <ellipse cx="9" cy="54" rx="4.5" ry="7" fill="url(#wheatGradientForFarmers)" opacity="0.85"/>
        
        {/* Awns (whiskers) */}
        <line x1="11" y1="15" x2="16" y2="8" stroke="#D4AF37" strokeWidth="0.8" opacity="0.7"/>
        <line x1="16" y1="22" x2="22" y2="16" stroke="#D4AF37" strokeWidth="0.8" opacity="0.7"/>
        <line x1="10" y1="30" x2="15" y2="24" stroke="#D4AF37" strokeWidth="0.8" opacity="0.6"/>
      </g>
      
      {/* Left-center wheat stalk */}
      <g transform="translate(80, 30)">
        <path d="M 10 150 Q 8 110 7 70 Q 6 35 8 0" 
              stroke="url(#leafGradientForFarmers)" 
              strokeWidth="3.5" 
              fill="none"
              strokeLinecap="round"/>
        
        <ellipse cx="5" cy="10" rx="5.5" ry="9" fill="url(#wheatGradientForFarmers)"/>
        <ellipse cx="10" cy="18" rx="5.5" ry="9" fill="url(#wheatGradientForFarmers)"/>
        <ellipse cx="5" cy="27" rx="5.5" ry="9" fill="url(#wheatGradientForFarmers)"/>
        <ellipse cx="9" cy="36" rx="5.5" ry="9" fill="url(#wheatGradientForFarmers)"/>
        <ellipse cx="6" cy="45" rx="5" ry="8" fill="url(#wheatGradientForFarmers)" opacity="0.95"/>
        <ellipse cx="8" cy="54" rx="5" ry="8" fill="url(#wheatGradientForFarmers)" opacity="0.95"/>
        <ellipse cx="7" cy="63" rx="4.5" ry="7" fill="url(#wheatGradientForFarmers)" opacity="0.9"/>
        
        <line x1="10" y1="10" x2="16" y2="3" stroke="#D4AF37" strokeWidth="1" opacity="0.8"/>
        <line x1="15" y1="18" x2="21" y2="12" stroke="#D4AF37" strokeWidth="1" opacity="0.8"/>
        <line x1="10" y1="27" x2="16" y2="21" stroke="#D4AF37" strokeWidth="1" opacity="0.7"/>
        <line x1="14" y1="36" x2="20" y2="30" stroke="#D4AF37" strokeWidth="1" opacity="0.7"/>
      </g>
      
      {/* Center wheat stalk - tallest and most prominent */}
      <g transform="translate(95, 20)">
        <path d="M 5 160 Q 4 115 3 70 Q 2 30 5 0" 
              stroke="url(#leafGradientForFarmers)" 
              strokeWidth="4" 
              fill="none"
              strokeLinecap="round"/>
        
        <ellipse cx="2" cy="8" rx="6" ry="10" fill="url(#wheatGradientForFarmers)"/>
        <ellipse cx="7" cy="17" rx="6" ry="10" fill="url(#wheatGradientForFarmers)"/>
        <ellipse cx="2" cy="27" rx="6" ry="10" fill="url(#wheatGradientForFarmers)"/>
        <ellipse cx="6" cy="37" rx="6" ry="10" fill="url(#wheatGradientForFarmers)"/>
        <ellipse cx="3" cy="47" rx="5.5" ry="9" fill="url(#wheatGradientForFarmers)"/>
        <ellipse cx="5" cy="57" rx="5.5" ry="9" fill="url(#wheatGradientForFarmers)"/>
        <ellipse cx="4" cy="67" rx="5" ry="8" fill="url(#wheatGradientForFarmers)" opacity="0.95"/>
        <ellipse cx="5" cy="77" rx="5" ry="8" fill="url(#wheatGradientForFarmers)" opacity="0.95"/>
        
        <line x1="8" y1="8" x2="15" y2="0" stroke="#D4AF37" strokeWidth="1.2" opacity="0.8"/>
        <line x1="13" y1="17" x2="20" y2="10" stroke="#D4AF37" strokeWidth="1.2" opacity="0.8"/>
        <line x1="8" y1="27" x2="15" y2="20" stroke="#D4AF37" strokeWidth="1.2" opacity="0.8"/>
        <line x1="12" y1="37" x2="19" y2="30" stroke="#D4AF37" strokeWidth="1.2" opacity="0.8"/>
        <line x1="9" y1="47" x2="16" y2="40" stroke="#D4AF37" strokeWidth="1" opacity="0.7"/>
      </g>
      
      {/* Right-center wheat stalk */}
      <g transform="translate(110, 30)">
        <path d="M 0 150 Q 2 110 3 70 Q 4 35 2 0" 
              stroke="url(#leafGradientForFarmers)" 
              strokeWidth="3.5" 
              fill="none"
              strokeLinecap="round"/>
        
        <ellipse cx="5" cy="10" rx="5.5" ry="9" fill="url(#wheatGradientForFarmers)"/>
        <ellipse cx="0" cy="18" rx="5.5" ry="9" fill="url(#wheatGradientForFarmers)"/>
        <ellipse cx="5" cy="27" rx="5.5" ry="9" fill="url(#wheatGradientForFarmers)"/>
        <ellipse cx="1" cy="36" rx="5.5" ry="9" fill="url(#wheatGradientForFarmers)"/>
        <ellipse cx="4" cy="45" rx="5" ry="8" fill="url(#wheatGradientForFarmers)" opacity="0.95"/>
        <ellipse cx="2" cy="54" rx="5" ry="8" fill="url(#wheatGradientForFarmers)" opacity="0.95"/>
        <ellipse cx="3" cy="63" rx="4.5" ry="7" fill="url(#wheatGradientForFarmers)" opacity="0.9"/>
        
        <line x1="0" y1="10" x2="-6" y2="3" stroke="#D4AF37" strokeWidth="1" opacity="0.8"/>
        <line x1="-5" y1="18" x2="-11" y2="12" stroke="#D4AF37" strokeWidth="1" opacity="0.8"/>
        <line x1="0" y1="27" x2="-6" y2="21" stroke="#D4AF37" strokeWidth="1" opacity="0.7"/>
        <line x1="-4" y1="36" x2="-10" y2="30" stroke="#D4AF37" strokeWidth="1" opacity="0.7"/>
      </g>
      
      {/* Right wheat stalk */}
      <g transform="translate(125, 40)">
        <path d="M -5 140 Q 0 100 2 60 Q 3 30 0 0" 
              stroke="url(#leafGradientForFarmers)" 
              strokeWidth="3" 
              fill="none"
              strokeLinecap="round"/>
        
        <ellipse cx="4" cy="15" rx="5" ry="8" fill="url(#wheatGradientForFarmers)" opacity="0.95"/>
        <ellipse cx="-1" cy="22" rx="5" ry="8" fill="url(#wheatGradientForFarmers)" opacity="0.95"/>
        <ellipse cx="5" cy="30" rx="5" ry="8" fill="url(#wheatGradientForFarmers)" opacity="0.9"/>
        <ellipse cx="0" cy="38" rx="5" ry="8" fill="url(#wheatGradientForFarmers)" opacity="0.9"/>
        <ellipse cx="4" cy="46" rx="5" ry="7" fill="url(#wheatGradientForFarmers)" opacity="0.85"/>
        <ellipse cx="1" cy="54" rx="4.5" ry="7" fill="url(#wheatGradientForFarmers)" opacity="0.85"/>
        
        <line x1="-1" y1="15" x2="-6" y2="8" stroke="#D4AF37" strokeWidth="0.8" opacity="0.7"/>
        <line x1="-6" y1="22" x2="-12" y2="16" stroke="#D4AF37" strokeWidth="0.8" opacity="0.7"/>
        <line x1="0" y1="30" x2="-5" y2="24" stroke="#D4AF37" strokeWidth="0.8" opacity="0.6"/>
      </g>
      
      {/* Decorative leaves at the base */}
      <g opacity="0.7">
        <path d="M 70 170 Q 60 165 55 155" 
              stroke="url(#leafGradientForFarmers)" 
              strokeWidth="2.5" 
              fill="none"
              strokeLinecap="round"/>
        <path d="M 130 170 Q 140 165 145 155" 
              stroke="url(#leafGradientForFarmers)" 
              strokeWidth="2.5" 
              fill="none"
              strokeLinecap="round"/>
      </g>
    </svg>
  )
}

const ForFarmers = () => {
  const navigate = useNavigate();

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
      image: 'https://i.pinimg.com/736x/c3/13/a9/c313a9e98737a3972160ac2ce20b10fe.jpg',
      quote: 'Since joining AgriConnect, my income has increased by 35%. I now sell directly to families who appreciate quality produce.',
      rating: 5,
    },
    {
      name: 'Lakshmi Devi',
      farm: 'Organic Fields, Karnataka',
      image: 'https://i.pinimg.com/736x/7b/92/61/7b9261741456fbd2ad1cd24658758041.jpg',
      quote: 'The platform is so easy to use. I can manage all my orders from my phone while working in the fields.',
      rating: 5,
    },
    {
      name: 'Suresh Patel',
      farm: 'Fresh Harvest, Gujarat',
      image: 'https://i.pinimg.com/736x/67/39/18/6739180698b78019b9e96148e47f2ba2.jpg',
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
    navigate('/Auth');
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
                <WheatLogo size={16} />
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
                src="https://i.pinimg.com/736x/95/58/c6/9558c6ed6831cc65c27bb3e926462eba.jpg"
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
            {benefits.map((benefit) => {
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
            {testimonials.map((testimonial) => (
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
              {faqs.map((faq) => (
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
              <WheatLogo size={20} />
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