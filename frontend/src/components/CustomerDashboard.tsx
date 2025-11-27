import React, { useState } from 'react';
import { Package, User, MapPin, Heart, Settings, LogOut, ShoppingCart, Menu, Search, Plus, Edit, Trash2, Check, X } from 'lucide-react';
import { Logo } from './Logo';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar } from './ui/avatar';
import { Separator } from './ui/separator';

export function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState('orders');
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  const orders = [
    {
      id: 'ORD-2024-001',
      date: '2024-11-20',
      status: 'delivered',
      total: 58998,
      items: 3,
      products: [
        {
          name: 'Premium Wireless Headphones',
          image: 'https://images.unsplash.com/photo-1763822129929-bba1b521c8e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwaGVhZHBob25lcyUyMGVsZWN0cm9uaWNzfGVufDF8fHx8MTc2NDA2MDE3NHww&ixlib=rb-4.1.0&q=80&w=1080',
        },
      ],
    },
    {
      id: 'ORD-2024-002',
      date: '2024-11-18',
      status: 'shipped',
      total: 45999,
      items: 1,
      products: [
        {
          name: 'Latest 5G Smartphone',
          image: 'https://images.unsplash.com/photo-1676173646307-d050e097d181?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwbW9kZXJuJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjQwNDI3MjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
        },
      ],
    },
    {
      id: 'ORD-2024-003',
      date: '2024-11-15',
      status: 'processing',
      total: 89999,
      items: 1,
      products: [
        {
          name: 'Gaming Laptop',
          image: 'https://images.unsplash.com/photo-1706735733956-deebaf5d001c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlciUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NjQwMjA3OTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
        },
      ],
    },
  ];

  const addresses = [
    {
      id: '1',
      type: 'Home',
      name: 'John Doe',
      phone: '+91 98765 43210',
      address: '123 Main Street, Andheri West',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400058',
      isDefault: true,
    },
    {
      id: '2',
      type: 'Office',
      name: 'John Doe',
      phone: '+91 98765 43211',
      address: '456 Business Park, BKC',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400051',
      isDefault: false,
    },
  ];

  const wishlist = [
    {
      id: '1',
      name: 'Professional DSLR Camera Kit',
      price: 67999,
      originalPrice: 79999,
      image: 'https://images.unsplash.com/photo-1760259203822-30265e7e4da8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjBwaG90b2dyYXBoeSUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NjM5OTEzMzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      inStock: true,
    },
    {
      id: '2',
      name: 'Premium Android Tablet with Stylus',
      price: 34999,
      originalPrice: 42999,
      image: 'https://images.unsplash.com/photo-1740637977676-c8040b41dc7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWJsZXQlMjBkZXZpY2UlMjBzY3JlZW58ZW58MXx8fHwxNzY0MDU1NDU5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      inStock: true,
    },
    {
      id: '3',
      name: 'Smart Fitness Watch',
      price: 8999,
      originalPrice: 12999,
      image: 'https://images.unsplash.com/photo-1758525747606-bd5d801ca87b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHdhdGNoJTIwd2VhcmFibGUlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2NDA1MTIzNHww&ixlib=rb-4.1.0&q=80&w=1080',
      inStock: false,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-700';
      case 'shipped':
        return 'bg-blue-100 text-blue-700';
      case 'processing':
        return 'bg-yellow-100 text-yellow-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const Sidebar = () => (
    <div className="space-y-2">
      <button
        onClick={() => setActiveTab('orders')}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
          activeTab === 'orders'
            ? 'bg-gradient-to-r from-lime-400 to-teal-400 text-black'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <Package className="w-5 h-5" />
        <span>My Orders</span>
      </button>
      <button
        onClick={() => setActiveTab('profile')}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
          activeTab === 'profile'
            ? 'bg-gradient-to-r from-lime-400 to-teal-400 text-black'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <User className="w-5 h-5" />
        <span>Profile</span>
      </button>
      <button
        onClick={() => setActiveTab('addresses')}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
          activeTab === 'addresses'
            ? 'bg-gradient-to-r from-lime-400 to-teal-400 text-black'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <MapPin className="w-5 h-5" />
        <span>Addresses</span>
      </button>
      <button
        onClick={() => setActiveTab('wishlist')}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
          activeTab === 'wishlist'
            ? 'bg-gradient-to-r from-lime-400 to-teal-400 text-black'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <Heart className="w-5 h-5" />
        <span>Wishlist</span>
      </button>
      
      <Separator className="my-4" />
      
      <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-all">
        <Settings className="w-5 h-5" />
        <span>Settings</span>
      </button>
      <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all">
        <LogOut className="w-5 h-5" />
        <span>Logout</span>
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <button className="lg:hidden" onClick={() => setShowMobileSidebar(!showMobileSidebar)}>
                <Menu className="w-6 h-6" />
              </button>
              <Logo />
            </div>
            
            <nav className="hidden lg:flex items-center gap-8">
              <a href="#" className="text-sm hover:text-lime-500 transition-colors">Home</a>
              <a href="#" className="text-sm hover:text-lime-500 transition-colors">Products</a>
              <a href="#" className="text-sm hover:text-lime-500 transition-colors">Deals</a>
            </nav>
            
            <div className="flex items-center gap-4">
              <button className="relative">
                <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-lime-500 transition-colors" />
              </button>
              <button className="w-9 h-9 rounded-full bg-gradient-to-r from-lime-400 to-teal-400 flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      {showMobileSidebar && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileSidebar(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-80 bg-white p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl">Menu</h2>
              <button onClick={() => setShowMobileSidebar(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 sticky top-24" style={{ boxShadow: 'var(--shadow-md)' }}>
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                <Avatar className="w-16 h-16 bg-gradient-to-r from-lime-400 to-teal-400" />
                <div>
                  <h3>John Doe</h3>
                  <p className="text-sm text-muted-foreground">john@example.com</p>
                </div>
              </div>
              <Sidebar />
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 border border-gray-100" style={{ boxShadow: 'var(--shadow-md)' }}>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl mb-2">My Orders</h2>
                      <p className="text-muted-foreground">{orders.length} orders placed</p>
                    </div>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input placeholder="Search orders..." className="pl-10 w-64 rounded-xl" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="border border-gray-200 rounded-2xl p-6 hover:border-lime-400 transition-all"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h3>{order.id}</h3>
                              <Badge className={`${getStatusColor(order.status)} border-0`}>
                                {order.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Placed on {new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl mb-1">₹{order.total.toLocaleString()}</p>
                            <p className="text-sm text-muted-foreground">{order.items} items</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 mb-4">
                          {order.products.map((product, idx) => (
                            <div key={idx} className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>

                        <div className="flex gap-3">
                          <Button variant="outline" className="flex-1 rounded-xl">
                            View Details
                          </Button>
                          {order.status === 'delivered' && (
                            <Button className="flex-1 bg-gradient-to-r from-lime-400 to-teal-400 text-black hover:shadow-lg rounded-xl">
                              Buy Again
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-2xl p-8 border border-gray-100" style={{ boxShadow: 'var(--shadow-md)' }}>
                <h2 className="text-2xl mb-6">Profile Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-6">
                    <Avatar className="w-24 h-24 bg-gradient-to-r from-lime-400 to-teal-400" />
                    <div>
                      <Button variant="outline" size="sm" className="rounded-xl">
                        Change Photo
                      </Button>
                      <p className="text-xs text-muted-foreground mt-2">
                        JPG, PNG or GIF. Max size 2MB
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Full Name</Label>
                      <Input defaultValue="John Doe" className="h-12 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <Label>Email Address</Label>
                      <Input defaultValue="john@example.com" type="email" className="h-12 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone Number</Label>
                      <Input defaultValue="+91 98765 43210" type="tel" className="h-12 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <Label>Date of Birth</Label>
                      <Input type="date" defaultValue="1990-01-15" className="h-12 rounded-xl" />
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button className="bg-gradient-to-r from-lime-400 to-teal-400 text-black hover:shadow-lg h-12 px-8 rounded-xl">
                      Save Changes
                    </Button>
                    <Button variant="outline" className="h-12 px-8 rounded-xl">
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 border border-gray-100" style={{ boxShadow: 'var(--shadow-md)' }}>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl mb-2">Saved Addresses</h2>
                      <p className="text-muted-foreground">{addresses.length} addresses saved</p>
                    </div>
                    <Button className="bg-gradient-to-r from-lime-400 to-teal-400 text-black hover:shadow-lg rounded-xl">
                      <Plus className="w-5 h-5 mr-2" />
                      Add New
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {addresses.map((address) => (
                      <div
                        key={address.id}
                        className="border border-gray-200 rounded-2xl p-6 relative"
                      >
                        {address.isDefault && (
                          <Badge className="absolute top-4 right-4 bg-lime-400 text-black border-0">
                            Default
                          </Badge>
                        )}
                        
                        <div className="mb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <MapPin className="w-5 h-5 text-lime-500" />
                            <h3>{address.type}</h3>
                          </div>
                          <p className="text-sm mb-1">{address.name}</p>
                          <p className="text-sm text-muted-foreground mb-1">{address.phone}</p>
                          <p className="text-sm text-muted-foreground">
                            {address.address}, {address.city}, {address.state} - {address.pincode}
                          </p>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1 rounded-xl">
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" className="rounded-xl text-red-600 hover:bg-red-50">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100" style={{ boxShadow: 'var(--shadow-md)' }}>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl mb-2">My Wishlist</h2>
                    <p className="text-muted-foreground">{wishlist.length} items saved</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlist.map((item) => (
                    <div
                      key={item.id}
                      className="border border-gray-200 rounded-2xl overflow-hidden hover:border-lime-400 transition-all"
                    >
                      <div className="relative aspect-square bg-gray-100">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                        <button className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-red-50 transition-colors">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                        {!item.inStock && (
                          <Badge className="absolute top-3 left-3 bg-red-500 text-white border-0">
                            Out of Stock
                          </Badge>
                        )}
                      </div>
                      <div className="p-4">
                        <h4 className="text-sm mb-2 line-clamp-2">{item.name}</h4>
                        <div className="flex items-baseline gap-2 mb-4">
                          <span>₹{item.price.toLocaleString()}</span>
                          {item.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              ₹{item.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                        <Button
                          className="w-full bg-gradient-to-r from-lime-400 to-teal-400 text-black hover:shadow-lg rounded-xl"
                          disabled={!item.inStock}
                        >
                          {item.inStock ? 'Add to Cart' : 'Notify Me'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
