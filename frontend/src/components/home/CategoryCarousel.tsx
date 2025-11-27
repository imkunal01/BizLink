import React from 'react';
import { motion } from 'motion/react';
import { Smartphone, Headphones, Laptop, Watch, Camera, Gamepad2, Tablet, Speaker } from 'lucide-react';

const categories = [
  { id: 1, name: 'Smartphones', icon: Smartphone, gradient: 'from-lime-400 to-cyan-400', count: 250 },
  { id: 2, name: 'Headphones', icon: Headphones, gradient: 'from-blue-400 to-purple-400', count: 180 },
  { id: 3, name: 'Laptops', icon: Laptop, gradient: 'from-pink-400 to-rose-400', count: 120 },
  { id: 4, name: 'Smartwatches', icon: Watch, gradient: 'from-amber-400 to-orange-400', count: 95 },
  { id: 5, name: 'Cameras', icon: Camera, gradient: 'from-cyan-400 to-blue-400', count: 75 },
  { id: 6, name: 'Gaming', icon: Gamepad2, gradient: 'from-purple-400 to-pink-400', count: 200 },
  { id: 7, name: 'Tablets', icon: Tablet, gradient: 'from-green-400 to-emerald-400', count: 85 },
  { id: 8, name: 'Speakers', icon: Speaker, gradient: 'from-orange-400 to-red-400', count: 110 }
];

export function CategoryCarousel() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-neutral-900 mb-3">Browse by Category</h2>
          <p className="text-neutral-600 text-lg">Explore our wide range of electronics</p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 lg:gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group cursor-pointer"
              >
                <div className="relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border border-neutral-100">
                  {/* Icon Background */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${category.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Content */}
                  <div>
                    <h5 className="text-neutral-900 mb-1">{category.name}</h5>
                    <p className="text-sm text-neutral-500">{category.count} Products</p>
                  </div>
                  
                  {/* Hover indicator */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-lime-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
