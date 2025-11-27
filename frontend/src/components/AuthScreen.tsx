import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Phone, Building2, FileText, Facebook, Chrome } from 'lucide-react';
import { Logo } from './Logo';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Checkbox } from './ui/checkbox';

export function AuthScreen() {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [userType, setUserType] = useState<'customer' | 'retailer'>('customer');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    businessName: '',
    gstNumber: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-4">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-lime-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-400/10 rounded-full blur-3xl" />

      <div className="relative w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex flex-col justify-center p-12 text-center">
          <div className="space-y-6">
            <div className="flex justify-center">
              <Logo className="scale-150" />
            </div>
            <h1 className="text-5xl">Welcome to Kripa Connect</h1>
            <p className="text-xl text-muted-foreground">
              Your trusted destination for premium electronics
            </p>
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="space-y-2">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-lime-400 to-teal-500 flex items-center justify-center text-3xl">
                  🛒
                </div>
                <p className="text-sm">Easy Shopping</p>
              </div>
              <div className="space-y-2">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl">
                  🚚
                </div>
                <p className="text-sm">Fast Delivery</p>
              </div>
              <div className="space-y-2">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center text-3xl">
                  💳
                </div>
                <p className="text-sm">Secure Payment</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="relative">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-gray-200 shadow-2xl">
            <Tabs value={authMode} onValueChange={(v) => setAuthMode(v as 'login' | 'register')} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-100 p-1 rounded-2xl h-12">
                <TabsTrigger value="login" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md">
                  Login
                </TabsTrigger>
                <TabsTrigger value="register" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md">
                  Sign Up
                </TabsTrigger>
              </TabsList>

              {/* User Type Toggle */}
              <div className="mb-6">
                <Label className="block mb-3">I am a</Label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setUserType('customer')}
                    className={`p-4 rounded-2xl border-2 transition-all ${
                      userType === 'customer'
                        ? 'border-lime-400 bg-lime-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <User className="w-6 h-6 mx-auto mb-2" />
                    <span className="text-sm">Customer</span>
                  </button>
                  <button
                    onClick={() => setUserType('retailer')}
                    className={`p-4 rounded-2xl border-2 transition-all ${
                      userType === 'retailer'
                        ? 'border-lime-400 bg-lime-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Building2 className="w-6 h-6 mx-auto mb-2" />
                    <span className="text-sm">Retailer</span>
                  </button>
                </div>
              </div>

              {/* Login Form */}
              <TabsContent value="login" className="space-y-6 mt-0">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="you@example.com"
                        className="pl-12 h-12 rounded-xl"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="login-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        className="pl-12 pr-12 h-12 rounded-xl"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <Checkbox />
                      <span className="text-sm">Remember me</span>
                    </label>
                    <a href="#" className="text-sm text-lime-600 hover:text-lime-700">
                      Forgot Password?
                    </a>
                  </div>
                </div>

                <Button className="w-full h-12 bg-gradient-to-r from-lime-400 to-teal-400 text-black hover:shadow-lg text-lg rounded-xl">
                  Sign In
                </Button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-12 rounded-xl">
                    <Chrome className="w-5 h-5 mr-2" />
                    Google
                  </Button>
                  <Button variant="outline" className="h-12 rounded-xl">
                    <Facebook className="w-5 h-5 mr-2" />
                    Facebook
                  </Button>
                </div>
              </TabsContent>

              {/* Register Form */}
              <TabsContent value="register" className="space-y-6 mt-0">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">
                      {userType === 'customer' ? 'Full Name' : 'Contact Person Name'}
                    </Label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="register-name"
                        type="text"
                        placeholder="John Doe"
                        className="pl-12 h-12 rounded-xl"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                      />
                    </div>
                  </div>

                  {userType === 'retailer' && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="business-name">Business Name</Label>
                        <div className="relative">
                          <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            id="business-name"
                            type="text"
                            placeholder="Your Business Name"
                            className="pl-12 h-12 rounded-xl"
                            value={formData.businessName}
                            onChange={(e) => handleInputChange('businessName', e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="gst-number">GST Number (Optional)</Label>
                        <div className="relative">
                          <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            id="gst-number"
                            type="text"
                            placeholder="22AAAAA0000A1Z5"
                            className="pl-12 h-12 rounded-xl"
                            value={formData.gstNumber}
                            onChange={(e) => handleInputChange('gstNumber', e.target.value)}
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="register-phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="register-phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        className="pl-12 h-12 rounded-xl"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="you@example.com"
                        className="pl-12 h-12 rounded-xl"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="register-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        className="pl-12 pr-12 h-12 rounded-xl"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <label className="flex items-start gap-2 cursor-pointer">
                    <Checkbox className="mt-1" />
                    <span className="text-sm text-muted-foreground">
                      I agree to the <a href="#" className="text-lime-600 hover:text-lime-700">Terms of Service</a> and <a href="#" className="text-lime-600 hover:text-lime-700">Privacy Policy</a>
                    </span>
                  </label>
                </div>

                <Button className="w-full h-12 bg-gradient-to-r from-lime-400 to-teal-400 text-black hover:shadow-lg text-lg rounded-xl">
                  Create Account
                </Button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-12 rounded-xl">
                    <Chrome className="w-5 h-5 mr-2" />
                    Google
                  </Button>
                  <Button variant="outline" className="h-12 rounded-xl">
                    <Facebook className="w-5 h-5 mr-2" />
                    Facebook
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
