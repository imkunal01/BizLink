import React, { useState } from 'react';
import { ShoppingCart, User, Heart, Menu, Minus, Plus, Trash2, ArrowRight, Tag, Shield, Truck } from 'lucide-react';
import { Logo } from './Logo';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Separator } from './ui/separator';

interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  color?: string;
  storage?: string;
}

export function CartScreen() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Premium Wireless Headphones with Active Noise Cancellation',
      price: 12999,
      originalPrice: 16999,
      image: 'https://images.unsplash.com/photo-1763822129929-bba1b521c8e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwaGVhZHBob25lcyUyMGVsZWN0cm9uaWNzfGVufDF8fHx8MTc2NDA2MDE3NHww&ixlib=rb-4.1.0&q=80&w=1080',
      quantity: 1,
      color: 'Midnight Black',
    },
    {
      id: '2',
      name: 'Latest 5G Smartphone with 108MP Camera',
      price: 45999,
      originalPrice: 54999,
      image: 'https://images.unsplash.com/photo-1676173646307-d050e097d181?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwbW9kZXJuJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjQwNDI3MjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      quantity: 1,
      color: 'Ocean Blue',
      storage: '128GB',
    },
    {
      id: '3',
      name: 'Smart Fitness Watch with Health Tracking',
      price: 8999,
      originalPrice: 12999,
      image: 'https://images.unsplash.com/photo-1758525747606-bd5d801ca87b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHdhdGNoJTIwd2VhcmFibGUlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2NDA1MTIzNHww&ixlib=rb-4.1.0&q=80&w=1080',
      quantity: 2,
      color: 'Space Gray',
    },
  ]);

  const [couponCode, setCouponCode] = useState('');

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const savings = cartItems.reduce(
    (sum, item) => sum + ((item.originalPrice || item.price) - item.price) * item.quantity,
    0
  );
  const shipping = subtotal > 50000 ? 0 : 200;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gray-50">
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
              <a href="#" className="text-sm hover:text-lime-500 transition-colors">Products</a>
              <a href="#" className="text-sm hover:text-lime-500 transition-colors">Deals</a>
              <a href="#" className="text-sm hover:text-lime-500 transition-colors">B2B</a>
            </nav>
            
            <div className="flex items-center gap-4">
              <button className="relative">
                <Heart className="w-6 h-6 text-gray-700 hover:text-red-500 transition-colors" />
              </button>
              <button className="relative">
                <ShoppingCart className="w-6 h-6 text-lime-500" />
                <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center bg-lime-400 text-black text-xs">
                  {cartItems.length}
                </Badge>
              </button>
              <button className="w-9 h-9 rounded-full bg-gradient-to-r from-lime-400 to-teal-400 flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl mb-2">Shopping Cart</h1>
          <p className="text-muted-foreground">{cartItems.length} items in your cart</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-gray-100" style={{ boxShadow: 'var(--shadow-md)' }}>
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-lime-400 to-teal-400 flex items-center justify-center">
              <ShoppingCart className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">Add some products to get started</p>
            <Button size="lg" className="bg-gradient-to-r from-lime-400 to-teal-400 text-black hover:shadow-lg">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-6 border border-gray-100 hover-lift"
                  style={{ boxShadow: 'var(--shadow-sm)' }}
                >
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <div className="w-32 h-32 rounded-xl overflow-hidden bg-gray-100">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-4 mb-2">
                        <h3 className="text-lg line-clamp-2">{item.name}</h3>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="flex-shrink-0 w-9 h-9 rounded-lg hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Variants */}
                      {(item.color || item.storage) && (
                        <div className="flex gap-4 text-sm text-muted-foreground mb-3">
                          {item.color && <span>Color: {item.color}</span>}
                          {item.storage && <span>Storage: {item.storage}</span>}
                        </div>
                      )}

                      {/* Price and Quantity */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl">₹{item.price.toLocaleString()}</span>
                          {item.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              ₹{item.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>

                        {/* Quantity Control */}
                        <div className="flex items-center gap-3 bg-gray-100 rounded-xl p-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-lg bg-white hover:bg-gray-50 flex items-center justify-center transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-lg bg-white hover:bg-gray-50 flex items-center justify-center transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Coupon Code */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100" style={{ boxShadow: 'var(--shadow-sm)' }}>
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-5 h-5 text-lime-500" />
                  <h3>Apply Coupon Code</h3>
                </div>
                <div className="flex gap-3">
                  <Input
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 h-12 rounded-xl"
                  />
                  <Button className="px-8 h-12 bg-gradient-to-r from-lime-400 to-teal-400 text-black hover:shadow-lg rounded-xl">
                    Apply
                  </Button>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Summary Card */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100" style={{ boxShadow: 'var(--shadow-md)' }}>
                  <h3 className="mb-6">Order Summary</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>₹{subtotal.toLocaleString()}</span>
                    </div>
                    {savings > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Savings</span>
                        <span>- ₹{savings.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      {shipping === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        <span>₹{shipping}</span>
                      )}
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between">
                      <span>Total</span>
                      <span className="text-2xl">₹{total.toLocaleString()}</span>
                    </div>
                  </div>

                  <Button className="w-full h-12 bg-gradient-to-r from-lime-400 to-teal-400 text-black hover:shadow-lg text-lg rounded-xl mb-4">
                    Proceed to Checkout
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>

                  <Button variant="outline" className="w-full h-12 rounded-xl">
                    Continue Shopping
                  </Button>
                </div>

                {/* Benefits */}
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6">
                  <h4 className="mb-4">Why Shop With Us</h4>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center flex-shrink-0">
                        <Truck className="w-5 h-5 text-lime-500" />
                      </div>
                      <div>
                        <p className="text-sm mb-1">Free Shipping</p>
                        <p className="text-xs text-muted-foreground">On orders above ₹50,000</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center flex-shrink-0">
                        <Shield className="w-5 h-5 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-sm mb-1">Secure Payment</p>
                        <p className="text-xs text-muted-foreground">100% secure transactions</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center flex-shrink-0">
                        <ShoppingCart className="w-5 h-5 text-purple-500" />
                      </div>
                      <div>
                        <p className="text-sm mb-1">Easy Returns</p>
                        <p className="text-xs text-muted-foreground">7-day return policy</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
