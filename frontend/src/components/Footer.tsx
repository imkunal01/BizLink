import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-neutral-900 to-neutral-800 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-lime-400 to-cyan-400 rounded-xl flex items-center justify-center">
                <span className="text-neutral-900">KC</span>
              </div>
              <span className="text-xl text-gradient">Kripa Connect</span>
            </div>
            <p className="text-neutral-400 mb-4">
              Your trusted destination for premium electronics. Quality products, competitive prices, and exceptional service.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-10 h-10 bg-neutral-800 hover:bg-lime-400 rounded-lg flex items-center justify-center transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-neutral-800 hover:bg-lime-400 rounded-lg flex items-center justify-center transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-neutral-800 hover:bg-lime-400 rounded-lg flex items-center justify-center transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-neutral-800 hover:bg-lime-400 rounded-lg flex items-center justify-center transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h6 className="mb-4 text-white">Quick Links</h6>
            <ul className="space-y-2">
              <li><a href="#" className="text-neutral-400 hover:text-lime-400 transition-colors">About Us</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-lime-400 transition-colors">Products</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-lime-400 transition-colors">Categories</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-lime-400 transition-colors">Bulk Orders</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-lime-400 transition-colors">Become a Retailer</a></li>
            </ul>
          </div>
          
          {/* Customer Service */}
          <div>
            <h6 className="mb-4 text-white">Customer Service</h6>
            <ul className="space-y-2">
              <li><a href="#" className="text-neutral-400 hover:text-lime-400 transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-lime-400 transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-lime-400 transition-colors">Returns & Refunds</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-lime-400 transition-colors">Track Order</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-lime-400 transition-colors">FAQs</a></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h6 className="mb-4 text-white">Contact Us</h6>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-lime-400 flex-shrink-0 mt-0.5" />
                <span className="text-neutral-400">
                  123 Electronics Street, Tech City, TC 12345
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-lime-400 flex-shrink-0" />
                <span className="text-neutral-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-lime-400 flex-shrink-0" />
                <span className="text-neutral-400">support@kripaconnect.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-700">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-neutral-400 text-sm">
              © 2024 Kripa Connect. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-neutral-400 hover:text-lime-400 text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-neutral-400 hover:text-lime-400 text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-neutral-400 hover:text-lime-400 text-sm transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
