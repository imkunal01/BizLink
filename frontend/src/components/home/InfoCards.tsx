import React from 'react';
import { motion } from 'motion/react';
import { Truck, Shield, Headphones, CreditCard } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'On orders over $100',
    gradient: 'from-lime-400 to-cyan-400'
  },
  {
    icon: Shield,
    title: 'Secure Payment',
    description: '100% protected payments',
    gradient: 'from-blue-400 to-purple-400'
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Dedicated customer service',
    gradient: 'from-pink-400 to-rose-400'
  },
  {
    icon: CreditCard,
    title: 'Easy Returns',
    description: '30-day return policy',
    gradient: 'from-amber-400 to-orange-400'
  }
];

export function InfoCards() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-gradient-to-br from-white to-neutral-50 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border border-neutral-100">
                  <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h5 className="text-neutral-900 mb-2">{feature.title}</h5>
                  <p className="text-sm text-neutral-600">{feature.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
