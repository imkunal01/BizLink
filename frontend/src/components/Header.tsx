import React, { useState } from 'react';
import { Search, ShoppingCart, User, Heart, Menu, X } from 'lucide-react';
import { Button } from './Button';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  cartCount?: number;
  wishlistCount?: number;
  onCartClick?: () => void;
  onWishlistClick?: () => void;
  onProfileClick?: () => void;
  userRole?: 'customer' | 'retailer' | 'admin' | null;
}

export function Header({
  cartCount = 0,
  wishlistCount = 0,
  onCartClick,
  onWishlistClick,
  onProfileClick,
  userRole = null
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-lime-400 to-cyan-400 rounded-xl flex items-center justify-center">
                <span className="text-neutral-900">KC</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-gradient">Kripa Connect</span>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              <a href="#home" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                Home
              </a>
              <a href="#products" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                Products
              </a>
              <a href="#categories" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                Categories
              </a>
              {userRole === 'retailer' && (
                <a href="#bulk-orders" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                  Bulk Orders
                </a>
              )}
              {userRole === 'admin' && (
                <a href="#admin" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                  Admin Panel
                </a>
              )}
            </nav>
          </div>
          
          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full pl-12 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all"
              />
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Wishlist */}
            <button
              onClick={onWishlistClick}
              className="hidden sm:flex relative p-2.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-xl transition-all"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>
            
            {/* Cart */}
            <button
              onClick={onCartClick}
              className="relative p-2.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-xl transition-all"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-lime-400 text-neutral-900 text-xs rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            
            {/* Profile */}
            <button
              onClick={onProfileClick}
              className="hidden sm:flex p-2.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-xl transition-all"
            >
              <User className="w-5 h-5" />
            </button>
            
            {/* Login/Signup */}
            {!userRole && (
              <div className="hidden sm:block">
                <Button variant="primary" size="sm">Sign In</Button>
              </div>
            )}
            
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-xl transition-all"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-12 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-neutral-200 bg-white"
          >
            <nav className="px-4 py-4 space-y-2">
              <a href="#home" className="block px-4 py-3 text-neutral-600 hover:bg-neutral-50 rounded-lg transition-colors">
                Home
              </a>
              <a href="#products" className="block px-4 py-3 text-neutral-600 hover:bg-neutral-50 rounded-lg transition-colors">
                Products
              </a>
              <a href="#categories" className="block px-4 py-3 text-neutral-600 hover:bg-neutral-50 rounded-lg transition-colors">
                Categories
              </a>
              {userRole === 'retailer' && (
                <a href="#bulk-orders" className="block px-4 py-3 text-neutral-600 hover:bg-neutral-50 rounded-lg transition-colors">
                  Bulk Orders
                </a>
              )}
              {userRole === 'admin' && (
                <a href="#admin" className="block px-4 py-3 text-neutral-600 hover:bg-neutral-50 rounded-lg transition-colors">
                  Admin Panel
                </a>
              )}
              <div className="pt-2">
                {!userRole ? (
                  <Button variant="primary" size="md" fullWidth>Sign In</Button>
                ) : (
                  <button className="w-full flex items-center gap-3 px-4 py-3 text-neutral-600 hover:bg-neutral-50 rounded-lg transition-colors">
                    <User className="w-5 h-5" />
                    <span>My Profile</span>
                  </button>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
