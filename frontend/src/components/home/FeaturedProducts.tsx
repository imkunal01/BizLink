import React from 'react';
import { motion } from 'motion/react';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from '../Button';
import { Badge } from '../Badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';

const products = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    price: 299,
    originalPrice: 399,
    rating: 4.8,
    reviews: 1250,
    image: 'https://images.unsplash.com/photo-1695028644151-1ec92bae9fb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXMlMjBtb2Rlcm58ZW58MXx8fHwxNzY0MDU5NzE4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    badge: 'Best Seller',
    inStock: true
  },
  {
    id: 2,
    name: 'Ultra-Thin Laptop Pro',
    price: 1299,
    originalPrice: 1599,
    rating: 4.9,
    reviews: 890,
    image: 'https://images.unsplash.com/photo-1642943038577-eb4a59549766?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlciUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzY0MDA5NTYzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    badge: 'New Arrival',
    inStock: true
  },
  {
    id: 3,
    name: 'Smart Watch Series 9',
    price: 449,
    originalPrice: 549,
    rating: 4.7,
    reviews: 2100,
    image: 'https://images.unsplash.com/photo-1719744755528-797de46cbbff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHdhdGNoJTIwd2VhcmFibGUlMjB0ZWNofGVufDF8fHx8MTc2NDAzMjY0NXww&ixlib=rb-4.1.0&q=80&w=1080',
    badge: 'Hot Deal',
    inStock: true
  },
  {
    id: 4,
    name: 'Professional Camera Kit',
    price: 1899,
    originalPrice: 2299,
    rating: 4.9,
    reviews: 450,
    image: 'https://images.unsplash.com/photo-1760259203822-30265e7e4da8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjBwaG90b2dyYXBoeSUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NjM5OTEzMzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    badge: 'Pro Choice',
    inStock: true
  }
];

export function FeaturedProducts() {
  return (
    <section className="py-16 bg-gradient-to-br from-neutral-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-neutral-900 mb-2">Featured Products</h2>
            <p className="text-neutral-600 text-lg">Handpicked products just for you</p>
          </div>
          <Button variant="outline">View All</Button>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-neutral-100">
                {/* Image Container */}
                <div className="relative bg-neutral-50 p-6 aspect-square overflow-hidden">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge variant="primary">{product.badge}</Badge>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-neutral-600 hover:text-red-500 transition-colors"
                    >
                      <Heart className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-neutral-600 hover:text-lime-600 transition-colors"
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </motion.button>
                  </div>
                  
                  {/* Stock Status */}
                  {product.inStock && (
                    <div className="absolute bottom-4 left-4 px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                      In Stock
                    </div>
                  )}
                </div>
                
                {/* Content */}
                <div className="p-5">
                  <h5 className="text-neutral-900 mb-2 line-clamp-1">{product.name}</h5>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm text-neutral-900">{product.rating}</span>
                    </div>
                    <span className="text-sm text-neutral-400">({product.reviews})</span>
                  </div>
                  
                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl text-neutral-900">${product.price}</span>
                      <span className="text-sm text-neutral-400 line-through ml-2">${product.originalPrice}</span>
                    </div>
                    <div className="px-2 py-1 bg-lime-100 text-lime-700 text-xs rounded">
                      Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </div>
                  </div>
                  
                  {/* Add to Cart Button */}
                  <Button variant="primary" size="sm" fullWidth>
                    Add to Cart
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
