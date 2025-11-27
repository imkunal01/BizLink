import React from 'react';
import { motion } from 'motion/react';
import { Button } from '../Button';
import { Search, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function HeroSection() {
  const colors = ['#a3e635', '#3b82f6', '#ec4899', '#f59e0b', '#06b6d4'];
  
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-neutral-50 via-blue-50/30 to-lime-50/30">
      {/* Decorative circles */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-lime-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-neutral-400" />
            <input
              type="text"
              placeholder="Search for products, categories..."
              className="w-full pl-16 pr-6 py-5 bg-white border-2 border-neutral-200 rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-lime-400/20 focus:border-lime-400 transition-all text-lg"
            />
          </div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-6">
              <div className="inline-block">
                <span className="px-4 py-2 bg-lime-100 text-lime-700 rounded-full text-sm">
                  🎉 New Arrivals
                </span>
              </div>
              
              <h1 className="text-neutral-900 leading-tight">
                Discover Premium
                <br />
                <span className="text-gradient">Electronics</span>
              </h1>
              
              <p className="text-xl text-neutral-600 max-w-lg">
                Shop the latest gadgets and tech accessories from top brands. Quality products with unbeatable prices.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" size="lg">
                  Shop Now
                </Button>
                <Button variant="outline" size="lg">
                  View Categories
                </Button>
              </div>
              
              {/* Stats */}
              <div className="flex flex-wrap gap-8 pt-4">
                <div>
                  <div className="text-3xl text-neutral-900">10K+</div>
                  <div className="text-sm text-neutral-500">Products</div>
                </div>
                <div>
                  <div className="text-3xl text-neutral-900">5K+</div>
                  <div className="text-sm text-neutral-500">Happy Customers</div>
                </div>
                <div>
                  <div className="text-3xl text-neutral-900">100+</div>
                  <div className="text-sm text-neutral-500">Brands</div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Right Content - Featured Product */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Decorative circles around product */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-gradient-to-br from-lime-400 to-cyan-400 rounded-full opacity-20 blur-2xl" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-20 blur-2xl" />
            
            {/* Main Product Card */}
            <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
              <div className="relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1727093493864-0bcbd16c7e6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwc21hcnRwaG9uZSUyMGVsZWN0cm9uaWNzfGVufDF8fHx8MTc2NDA1OTcxN3ww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Premium Smartphone"
                  className="w-full h-80 object-contain"
                />
                
                {/* Color Selector */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-3">
                  {colors.map((color, index) => (
                    <motion.button
                      key={color}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 rounded-full border-2 border-white shadow-lg"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
              
              <div className="mt-6 space-y-3">
                <h4 className="text-neutral-900">Premium Smartphone X1</h4>
                <p className="text-neutral-600">Latest flagship with cutting-edge features</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-3xl text-neutral-900">$799</span>
                    <span className="text-lg text-neutral-400 line-through ml-2">$999</span>
                  </div>
                  <Button variant="primary">Add to Cart</Button>
                </div>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-neutral-600 hover:text-blue-500 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-neutral-600 hover:text-pink-500 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-neutral-600 hover:text-blue-400 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-neutral-600 hover:text-blue-600 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
