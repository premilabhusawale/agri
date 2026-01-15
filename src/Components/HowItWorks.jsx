import { motion } from "framer-motion";
import { UserPlus, Search, ShoppingCart, Truck } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "Create Account",
      description: "Sign up as a farmer or buyer in just 2 minutes. Verify your identity to start trading.",
      color: "bg-primary/10 text-primary",
    },
    {
      icon: Search,
      title: "Browse or List",
      description: "Farmers list their produce with photos and prices. Buyers browse fresh products nearby.",
      color: "bg-harvest/10 text-harvest",
    },
    {
      icon: ShoppingCart,
      title: "Place Order",
      description: "Buyers add items to cart and checkout securely. Farmers receive instant notifications.",
      color: "bg-accent/10 text-accent",
    },
    {
      icon: Truck,
      title: "Get Delivery",
      description: "Choose pickup or delivery. Track your order in real-time until it arrives fresh.",
      color: "bg-earth/10 text-earth",
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            🚀 Simple & Easy
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get started in minutes. Whether you're selling fresh produce or looking for the best
            local farms, we've got you covered.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-border to-transparent" />
              )}

              <div className="text-center">
                {/* Step Number */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center z-10">
                  {index + 1}
                </div>

                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-24 h-24 mx-auto rounded-2xl ${step.color} flex items-center justify-center mb-6 shadow-soft`}
                >
                  <step.icon className="w-10 h-10" />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;