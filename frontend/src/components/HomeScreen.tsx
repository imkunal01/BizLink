import React, { useState } from 'react';
import { ShoppingCart, User, Heart, Menu, Facebook, Instagram, Twitter, Youtube, ArrowRight, TrendingUp } from 'lucide-react';
import { Logo } from './Logo';
import { SearchBar } from './SearchBar';
import { CategoryCard } from './CategoryCard';
import { ProductCard } from './ProductCard';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export function HomeScreen() {
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());

  const toggleWishlist = (id: string) => {
    setWishlist(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const categories = [
    { id: 1, name: 'Smartphones', icon: '📱', count: 250, gradient: 'bg-gradient-to-br from-blue-500 to-purple-600' },
    { id: 2, name: 'Laptops', icon: '💻', count: 180, gradient: 'bg-gradient-to-br from-purple-500 to-pink-600' },
    { id: 3, name: 'Audio', icon: '🎧', count: 320, gradient: 'bg-gradient-to-br from-pink-500 to-orange-500' },
    { id: 4, name: 'Cameras', icon: '📷', count: 140, gradient: 'bg-gradient-to-br from-teal-500 to-cyan-600' },
    { id: 5, name: 'Gaming', icon: '🎮', count: 210, gradient: 'bg-gradient-to-br from-green-500 to-teal-500' },
    { id: 6, name: 'Wearables', icon: '⌚', count: 160, gradient: 'bg-gradient-to-br from-orange-500 to-red-500' },
    { id: 7, name: 'Tablets', icon: '📟', count: 95, gradient: 'bg-gradient-to-br from-cyan-500 to-blue-600' },
  ];

  const trendingProducts = [
    {
      id: '1',
      name: 'Premium Wireless Headphones with Active Noise Cancellation',
      price: 12999,
      originalPrice: 16999,
      image: 'https://images.unsplash.com/photo-1763822129929-bba1b521c8e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwaGVhZHBob25lcyUyMGVsZWN0cm9uaWNzfGVufDF8fHx8MTc2NDA2MDE3NHww&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.8,
      reviews: 256,
      badge: 'Trending',
    },
    {
      id: '2',
      name: 'Latest 5G Smartphone with 108MP Camera',
      price: 45999,
      originalPrice: 54999,
      image: 'https://images.unsplash.com/photo-1676173646307-d050e097d181?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwbW9kZXJuJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjQwNDI3MjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.6,
      reviews: 189,
      badge: 'New',
    },
    {
      id: '3',
      name: 'Ultra-Thin Gaming Laptop with RTX Graphics',
      price: 89999,
      originalPrice: 109999,
      image: 'https://images.unsplash.com/photo-1706735733956-deebaf5d001c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlciUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NjQwMjA3OTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.9,
      reviews: 342,
      badge: 'Hot Deal',
    },
    {
      id: '4',
      name: 'Smart Fitness Watch with Health Tracking',
      price: 8999,
      originalPrice: 12999,
      image: 'https://images.unsplash.com/photo-1758525747606-bd5d801ca87b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHdhdGNoJTIwd2VhcmFibGUlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2NDA1MTIzNHww&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.5,
      reviews: 178,
    },
    {
      id: '5',
      name: 'Professional DSLR Camera Kit',
      price: 67999,
      originalPrice: 79999,
      image: 'https://images.unsplash.com/photo-1760259203822-30265e7e4da8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjBwaG90b2dyYXBoeSUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NjM5OTEzMzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.7,
      reviews: 203,
    },
    {
      id: '6',
      name: 'Next-Gen Gaming Console Bundle',
      price: 49999,
      image: 'https://images.unsplash.com/photo-1695028644151-1ec92bae9fb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb25zb2xlJTIwY29udHJvbGxlcnxlbnwxfHx8fDE3NjM5OTAwMzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.9,
      reviews: 412,
      badge: 'Bestseller',
    },
    {
      id: '7',
      name: 'Premium Android Tablet with Stylus',
      price: 34999,
      originalPrice: 42999,
      image: 'https://images.unsplash.com/photo-1740637977676-c8040b41dc7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWJsZXQlMjBkZXZpY2UlMjBzY3JlZW58ZW58MXx8fHwxNzY0MDU1NDU5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.6,
      reviews: 167,
    },
    {
      id: '8',
      name: 'True Wireless Earbuds Pro',
      price: 5999,
      originalPrice: 8999,
      image: 'https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGVhcmJ1ZHN8ZW58MXx8fHwxNzY0MDU4NjI4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.4,
      reviews: 298,
      badge: 'Deal',
    },
  ];

  const featuredProducts = [
    { icon: '⚡', title: 'Fast Delivery', description: 'Same day in metro cities' },
    { icon: '🎁', title: 'Gift Cards', description: 'Perfect for any occasion' },
    { icon: '💳', title: 'Easy EMI', description: 'No cost EMI available' },
    { icon: '🔒', title: 'Secure Payment', description: '100% secure transactions' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <button className="lg:hidden">
                <Menu className="w-6 h-6" />
              </button>
              <Logo />
            </div>
            
            <nav className="hidden lg:flex items-center gap-8">
              <a href="#" className="text-sm hover:text-lime-500 transition-colors">Home</a>
              <a href="#" className="text-sm hover:text-lime-500 transition-colors">Categories</a>
              <a href="#" className="text-sm hover:text-lime-500 transition-colors">Deals</a>
              <a href="#" className="text-sm hover:text-lime-500 transition-colors">B2B</a>
            </nav>
            
            <div className="flex items-center gap-4">
              <button className="relative">
                <Heart className="w-6 h-6 text-gray-700 hover:text-red-500 transition-colors" />
                {wishlist.size > 0 && (
                  <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                    {wishlist.size}
                  </Badge>
                )}
              </button>
              <button className="relative">
                <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-lime-500 transition-colors" />
                <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center bg-lime-400 text-black text-xs">
                  0
                </Badge>
              </button>
              <button className="w-9 h-9 rounded-full bg-gradient-to-r from-lime-400 to-teal-400 flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          {/* Decorative circles */}
          <div className="absolute top-20 right-20 w-72 h-72 bg-lime-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
          
          <div className="relative grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl leading-tight">
                  Premium Electronics
                  <br />
                  <span className="bg-gradient-to-r from-lime-400 to-teal-500 bg-clip-text text-transparent">
                    Delivered Fast
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-md">
                  Discover the latest in technology with unbeatable prices and lightning-fast delivery
                </p>
              </div>
              
              {/* Search Bar */}
              <SearchBar />
              
              <div className="flex items-center gap-4">
                <Button size="lg" className="bg-gradient-to-r from-lime-400 to-teal-400 text-black hover:shadow-lg">
                  Shop Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button size="lg" variant="outline">
                  View Deals
                </Button>
              </div>
              
              {/* Social Links */}
              <div className="flex items-center gap-4 pt-4">
                <span className="text-sm text-muted-foreground">Follow us:</span>
                <div className="flex gap-3">
                  {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                    <button
                      key={i}
                      className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-lime-400 hover:text-lime-500 transition-all"
                    >
                      <Icon className="w-4 h-4" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right Product Showcase */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-8">
                <img
                  src="https://images.unsplash.com/photo-1763822129929-bba1b521c8e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwaGVhZHBob25lcyUyMGVsZWN0cm9uaWNzfGVufDF8fHx8MTc2NDA2MDE3NHww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Featured Product"
                  className="w-full h-[400px] object-cover rounded-2xl"
                />
                
                {/* Color Selector */}
                <div className="absolute top-8 right-8 flex flex-col gap-3">
                  {['#000000', '#FFFFFF', '#FF6B9D', '#4A90FF'].map((color, i) => (
                    <button
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-white shadow-lg hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                
                {/* Floating Badge */}
                <div className="absolute bottom-8 left-8 bg-white rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-lime-400 to-teal-400 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Trending</p>
                      <p className="font-semibold">Best Seller</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative circles around product */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-300 rounded-full opacity-50 blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-pink-300 rounded-full opacity-50 blur-xl" />
            </div>
          </div>
          
          {/* Featured Products Info Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
            {featuredProducts.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 hover-lift border border-gray-100"
                style={{ boxShadow: 'var(--shadow-sm)' }}
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h4 className="text-sm mb-1">{item.title}</h4>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl mb-2">Shop by Category</h2>
              <p className="text-muted-foreground">Find exactly what you're looking for</p>
            </div>
            <Button variant="ghost">
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
            {categories.map((category) => (
              <CategoryCard key={category.id} {...category} />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl mb-2">Trending Products</h2>
              <p className="text-muted-foreground">Most popular items this week</p>
            </div>
            <Button variant="ghost">
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                inWishlist={wishlist.has(product.id)}
                onToggleWishlist={() => toggleWishlist(product.id)}
                onAddToCart={() => console.log('Add to cart:', product.id)}
                onClick={() => console.log('View product:', product.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Banner Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white space-y-6">
            <h2 className="text-4xl lg:text-5xl">Special Offer Just For You</h2>
            <p className="text-xl opacity-90">Get up to 40% off on selected electronics</p>
            <div className="flex items-center justify-center gap-4">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                Shop Now
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Logo className="mb-4" />
              <p className="text-sm text-gray-400">
                Your trusted destination for premium electronics
              </p>
            </div>
            <div>
              <h4 className="mb-4">Shop</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-lime-400">All Products</a></li>
                <li><a href="#" className="hover:text-lime-400">Categories</a></li>
                <li><a href="#" className="hover:text-lime-400">Deals</a></li>
                <li><a href="#" className="hover:text-lime-400">New Arrivals</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-lime-400">Help Center</a></li>
                <li><a href="#" className="hover:text-lime-400">Track Order</a></li>
                <li><a href="#" className="hover:text-lime-400">Returns</a></li>
                <li><a href="#" className="hover:text-lime-400">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-lime-400">About Us</a></li>
                <li><a href="#" className="hover:text-lime-400">Careers</a></li>
                <li><a href="#" className="hover:text-lime-400">B2B Portal</a></li>
                <li><a href="#" className="hover:text-lime-400">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 Kripa Connect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
