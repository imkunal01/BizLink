import React, { useState } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { ProductListingScreen } from './components/ProductListingScreen';
import { ProductDetailsScreen } from './components/ProductDetailsScreen';
import { AuthScreen } from './components/AuthScreen';
import { CartScreen } from './components/CartScreen';
import { CheckoutScreen } from './components/CheckoutScreen';
import { CustomerDashboard } from './components/CustomerDashboard';
import { RetailerDashboard } from './components/RetailerDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { Button } from './components/ui/button';
import { Home, ShoppingBag, Package, LogIn, ShoppingCart, CreditCard, User, Store, Shield, Menu, X } from 'lucide-react';

type Screen =
  | 'home'
  | 'products'
  | 'product-details'
  | 'auth'
  | 'cart'
  | 'checkout'
  | 'customer-dashboard'
  | 'retailer-dashboard'
  | 'admin-dashboard';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [showMenu, setShowMenu] = useState(false);

  const screens = [
    { id: 'home', name: 'Home', icon: Home },
    { id: 'products', name: 'Product Listing', icon: ShoppingBag },
    { id: 'product-details', name: 'Product Details', icon: Package },
    { id: 'auth', name: 'Login/Register', icon: LogIn },
    { id: 'cart', name: 'Shopping Cart', icon: ShoppingCart },
    { id: 'checkout', name: 'Checkout', icon: CreditCard },
    { id: 'customer-dashboard', name: 'Customer Dashboard', icon: User },
    { id: 'retailer-dashboard', name: 'Retailer Portal', icon: Store },
    { id: 'admin-dashboard', name: 'Admin Panel', icon: Shield },
  ];

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen />;
      case 'products':
        return <ProductListingScreen />;
      case 'product-details':
        return <ProductDetailsScreen />;
      case 'auth':
        return <AuthScreen />;
      case 'cart':
        return <CartScreen />;
      case 'checkout':
        return <CheckoutScreen />;
      case 'customer-dashboard':
        return <CustomerDashboard />;
      case 'retailer-dashboard':
        return <RetailerDashboard />;
      case 'admin-dashboard':
        return <AdminDashboard />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Demo Navigation Bar */}
      <div className="fixed top-4 right-4 z-[100]">
        <Button
          onClick={() => setShowMenu(!showMenu)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-2xl shadow-lg flex items-center justify-center"
        >
          {showMenu ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
        </Button>
      </div>

      {/* Navigation Menu */}
      {showMenu && (
        <div className="fixed inset-0 z-[99] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto shadow-2xl">
            <div className="mb-6">
              <h2 className="text-3xl mb-2 bg-gradient-to-r from-lime-400 to-teal-500 bg-clip-text text-transparent">
                Kripa Connect Demo
              </h2>
              <p className="text-muted-foreground">Navigate between different screens and features</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {screens.map((screen) => {
                const Icon = screen.icon;
                return (
                  <button
                    key={screen.id}
                    onClick={() => {
                      setCurrentScreen(screen.id as Screen);
                      setShowMenu(false);
                    }}
                    className={`p-6 rounded-2xl border-2 transition-all hover:scale-105 ${
                      currentScreen === screen.id
                        ? 'border-lime-400 bg-lime-50'
                        : 'border-gray-200 hover:border-lime-400'
                    }`}
                  >
                    <div className={`w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center ${
                      currentScreen === screen.id
                        ? 'bg-gradient-to-r from-lime-400 to-teal-400'
                        : 'bg-gray-100'
                    }`}>
                      <Icon className={`w-6 h-6 ${
                        currentScreen === screen.id ? 'text-white' : 'text-gray-600'
                      }`} />
                    </div>
                    <h3 className="text-sm text-center">{screen.name}</h3>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6">
                <h3 className="mb-3">About Kripa Connect</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  A complete e-commerce platform featuring customer shopping, B2B retailer portal, and comprehensive admin management. 
                  Built with modern design principles and premium aesthetics.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-white rounded-full text-xs">React</span>
                  <span className="px-3 py-1 bg-white rounded-full text-xs">Tailwind CSS</span>
                  <span className="px-3 py-1 bg-white rounded-full text-xs">Shadcn UI</span>
                  <span className="px-3 py-1 bg-white rounded-full text-xs">Recharts</span>
                  <span className="px-3 py-1 bg-white rounded-full text-xs">Responsive</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Current Screen */}
      <div className="min-h-screen">
        {renderScreen()}
      </div>
    </div>
  );
}
