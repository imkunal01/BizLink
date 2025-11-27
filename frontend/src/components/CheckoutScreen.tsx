import React, { useState } from 'react';
import { ShoppingCart, User, Heart, Menu, ArrowLeft, Check, CreditCard, Wallet, Building2, MapPin, Phone, Mail } from 'lucide-react';
import { Logo } from './Logo';
import { StepIndicator } from './StepIndicator';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

export function CheckoutScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [shippingData, setShippingData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const steps = [
    { label: 'Shipping', description: 'Delivery address' },
    { label: 'Payment', description: 'Payment method' },
    { label: 'Confirmation', description: 'Review order' },
  ];

  const cartItems = [
    {
      id: '1',
      name: 'Premium Wireless Headphones with Active Noise Cancellation',
      price: 12999,
      image: 'https://images.unsplash.com/photo-1763822129929-bba1b521c8e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwaGVhZHBob25lcyUyMGVsZWN0cm9uaWNzfGVufDF8fHx8MTc2NDA2MDE3NHww&ixlib=rb-4.1.0&q=80&w=1080',
      quantity: 1,
    },
    {
      id: '2',
      name: 'Latest 5G Smartphone with 108MP Camera',
      price: 45999,
      image: 'https://images.unsplash.com/photo-1676173646307-d050e097d181?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwbW9kZXJuJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjQwNDI3MjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      quantity: 1,
    },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0;
  const total = subtotal + shipping;

  const handleInputChange = (field: string, value: string) => {
    setShippingData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

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
            
            <div className="flex items-center gap-4">
              <button className="relative">
                <Heart className="w-6 h-6 text-gray-700 hover:text-red-500 transition-colors" />
              </button>
              <button className="relative">
                <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-lime-500 transition-colors" />
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
        {/* Back Button */}
        <button onClick={handleBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          {currentStep === 0 ? 'Back to Cart' : 'Back'}
        </button>

        {/* Step Indicator */}
        <div className="mb-12">
          <StepIndicator steps={steps} currentStep={currentStep} />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 0: Shipping Information */}
            {currentStep === 0 && (
              <div className="bg-white rounded-2xl p-8 border border-gray-100" style={{ boxShadow: 'var(--shadow-md)' }}>
                <h2 className="text-2xl mb-6">Shipping Information</h2>
                
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        placeholder="John Doe"
                        value={shippingData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        className="h-12 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={shippingData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="h-12 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={shippingData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="h-12 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address *</Label>
                    <Input
                      id="address"
                      placeholder="House No., Building Name, Street"
                      value={shippingData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="h-12 rounded-xl"
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        placeholder="Mumbai"
                        value={shippingData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="h-12 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        placeholder="Maharashtra"
                        value={shippingData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        className="h-12 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pincode">Pincode *</Label>
                      <Input
                        id="pincode"
                        placeholder="400001"
                        value={shippingData.pincode}
                        onChange={(e) => handleInputChange('pincode', e.target.value)}
                        className="h-12 rounded-xl"
                      />
                    </div>
                  </div>
                </div>

                <Separator className="my-8" />

                <div className="flex justify-end">
                  <Button onClick={handleNext} size="lg" className="bg-gradient-to-r from-lime-400 to-teal-400 text-black hover:shadow-lg h-12 px-8 rounded-xl">
                    Continue to Payment
                  </Button>
                </div>
              </div>
            )}

            {/* Step 1: Payment Method */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-8 border border-gray-100" style={{ boxShadow: 'var(--shadow-md)' }}>
                  <h2 className="text-2xl mb-6">Payment Method</h2>
                  
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                    {/* Cash on Delivery */}
                    <label
                      className={`flex items-center gap-4 p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                        paymentMethod === 'cod'
                          ? 'border-lime-400 bg-lime-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <RadioGroupItem value="cod" id="cod" />
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-400 to-teal-500 flex items-center justify-center">
                          <Wallet className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="mb-1">Cash on Delivery</h3>
                          <p className="text-sm text-muted-foreground">Pay when you receive your order</p>
                        </div>
                        {paymentMethod === 'cod' && (
                          <Check className="w-6 h-6 text-lime-500" />
                        )}
                      </div>
                    </label>

                    {/* Credit/Debit Card */}
                    <label
                      className={`flex items-center gap-4 p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                        paymentMethod === 'card'
                          ? 'border-lime-400 bg-lime-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <RadioGroupItem value="card" id="card" />
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                          <CreditCard className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="mb-1">Credit / Debit Card</h3>
                          <p className="text-sm text-muted-foreground">Pay securely with your card</p>
                          <Badge variant="secondary" className="mt-2">Coming Soon</Badge>
                        </div>
                        {paymentMethod === 'card' && (
                          <Check className="w-6 h-6 text-lime-500" />
                        )}
                      </div>
                    </label>

                    {/* UPI */}
                    <label
                      className={`flex items-center gap-4 p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                        paymentMethod === 'upi'
                          ? 'border-lime-400 bg-lime-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <RadioGroupItem value="upi" id="upi" />
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-400 to-pink-500 flex items-center justify-center">
                          <Building2 className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="mb-1">UPI Payment</h3>
                          <p className="text-sm text-muted-foreground">Pay using UPI apps</p>
                          <Badge variant="secondary" className="mt-2">Coming Soon</Badge>
                        </div>
                        {paymentMethod === 'upi' && (
                          <Check className="w-6 h-6 text-lime-500" />
                        )}
                      </div>
                    </label>
                  </RadioGroup>
                </div>

                <div className="flex justify-between">
                  <Button onClick={handleBack} variant="outline" size="lg" className="h-12 px-8 rounded-xl">
                    Back
                  </Button>
                  <Button onClick={handleNext} size="lg" className="bg-gradient-to-r from-lime-400 to-teal-400 text-black hover:shadow-lg h-12 px-8 rounded-xl">
                    Review Order
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Confirmation */}
            {currentStep === 2 && (
              <div className="space-y-6">
                {/* Shipping Address Review */}
                <div className="bg-white rounded-2xl p-8 border border-gray-100" style={{ boxShadow: 'var(--shadow-md)' }}>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl">Shipping Address</h3>
                    <Button variant="ghost" size="sm" onClick={() => setCurrentStep(0)}>
                      Edit
                    </Button>
                  </div>
                  <div className="space-y-2 text-muted-foreground">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 mt-0.5" />
                      <div>
                        <p>{shippingData.fullName || 'John Doe'}</p>
                        <p>{shippingData.address || '123 Main Street'}</p>
                        <p>{shippingData.city || 'Mumbai'}, {shippingData.state || 'Maharashtra'} - {shippingData.pincode || '400001'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5" />
                      <p>{shippingData.phone || '+91 98765 43210'}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5" />
                      <p>{shippingData.email || 'john@example.com'}</p>
                    </div>
                  </div>
                </div>

                {/* Payment Method Review */}
                <div className="bg-white rounded-2xl p-8 border border-gray-100" style={{ boxShadow: 'var(--shadow-md)' }}>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl">Payment Method</h3>
                    <Button variant="ghost" size="sm" onClick={() => setCurrentStep(1)}>
                      Edit
                    </Button>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-400 to-teal-500 flex items-center justify-center">
                      <Wallet className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p>Cash on Delivery</p>
                      <p className="text-sm text-muted-foreground">Pay when you receive your order</p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="bg-white rounded-2xl p-8 border border-gray-100" style={{ boxShadow: 'var(--shadow-md)' }}>
                  <h3 className="text-xl mb-6">Order Items ({cartItems.length})</h3>
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-100 last:border-0">
                        <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm mb-2 line-clamp-2">{item.name}</h4>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Qty: {item.quantity}</span>
                            <span>₹{item.price.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button onClick={handleBack} variant="outline" size="lg" className="h-12 px-8 rounded-xl">
                    Back
                  </Button>
                  <Button size="lg" className="bg-gradient-to-r from-lime-400 to-teal-400 text-black hover:shadow-lg h-12 px-8 rounded-xl">
                    Place Order
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl p-6 border border-gray-100" style={{ boxShadow: 'var(--shadow-md)' }}>
                <h3 className="mb-6">Order Summary</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-green-600">FREE</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between">
                    <span>Total</span>
                    <span className="text-2xl">₹{total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Order Items Summary */}
                <div className="pt-6 border-t border-gray-100">
                  <p className="text-sm text-muted-foreground mb-4">{cartItems.length} items</p>
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm line-clamp-2 mb-1">{item.name}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
