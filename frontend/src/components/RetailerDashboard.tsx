import React, { useState } from 'react';
import { Package, TrendingUp, DollarSign, ShoppingBag, Menu, User, Plus, Search, Download, Filter } from 'lucide-react';
import { Logo } from './Logo';
import { MetricCard } from './MetricCard';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export function RetailerDashboard() {
  const [selectedProducts, setSelectedProducts] = useState<{ [key: string]: number }>({});

  const metrics = [
    {
      title: 'Total Orders',
      value: '234',
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: Package,
      gradient: 'bg-gradient-to-br from-blue-500 to-purple-600',
    },
    {
      title: 'Active Deals',
      value: '18',
      change: '+3',
      changeType: 'positive' as const,
      icon: TrendingUp,
      gradient: 'bg-gradient-to-br from-lime-400 to-teal-500',
    },
    {
      title: 'Total Revenue',
      value: '₹12.4L',
      change: '+18.2%',
      changeType: 'positive' as const,
      icon: DollarSign,
      gradient: 'bg-gradient-to-br from-pink-500 to-orange-500',
    },
    {
      title: 'Pending Payouts',
      value: '₹45.2K',
      change: 'Due in 3 days',
      changeType: 'neutral' as const,
      icon: ShoppingBag,
      gradient: 'bg-gradient-to-br from-purple-500 to-pink-600',
    },
  ];

  const recentOrders = [
    {
      id: 'BO-2024-001',
      date: '2024-11-24',
      items: 15,
      total: 234500,
      status: 'processing',
    },
    {
      id: 'BO-2024-002',
      date: '2024-11-23',
      items: 24,
      total: 456780,
      status: 'shipped',
    },
    {
      id: 'BO-2024-003',
      date: '2024-11-22',
      items: 8,
      total: 123450,
      status: 'delivered',
    },
  ];

  const bulkProducts = [
    {
      id: '1',
      name: 'Premium Wireless Headphones',
      sku: 'PWH-001',
      retailPrice: 12999,
      bulkPrice: 10999,
      image: 'https://images.unsplash.com/photo-1763822129929-bba1b521c8e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwaGVhZHBob25lcyUyMGVsZWN0cm9uaWNzfGVufDF8fHx8MTc2NDA2MDE3NHww&ixlib=rb-4.1.0&q=80&w=1080',
      minOrder: 5,
      stock: 450,
    },
    {
      id: '2',
      name: 'Latest 5G Smartphone',
      sku: 'LSM-002',
      retailPrice: 45999,
      bulkPrice: 42999,
      image: 'https://images.unsplash.com/photo-1676173646307-d050e097d181?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwbW9kZXJuJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjQwNDI3MjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      minOrder: 3,
      stock: 280,
    },
    {
      id: '3',
      name: 'Gaming Laptop RTX',
      sku: 'GLR-003',
      retailPrice: 89999,
      bulkPrice: 82999,
      image: 'https://images.unsplash.com/photo-1706735733956-deebaf5d001c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlciUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NjQwMjA3OTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      minOrder: 2,
      stock: 120,
    },
    {
      id: '4',
      name: 'Smart Fitness Watch',
      sku: 'SFW-004',
      retailPrice: 8999,
      bulkPrice: 7499,
      image: 'https://images.unsplash.com/photo-1758525747606-bd5d801ca87b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHdhdGNoJTIwd2VhcmFibGUlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2NDA1MTIzNHww&ixlib=rb-4.1.0&q=80&w=1080',
      minOrder: 10,
      stock: 650,
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
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity > 0) {
      setSelectedProducts({ ...selectedProducts, [productId]: quantity });
    } else {
      const newSelected = { ...selectedProducts };
      delete newSelected[productId];
      setSelectedProducts(newSelected);
    }
  };

  const calculateBulkTotal = () => {
    return Object.entries(selectedProducts).reduce((total, [id, qty]) => {
      const product = bulkProducts.find(p => p.id === id);
      return total + (product?.bulkPrice || 0) * qty;
    }, 0);
  };

  const totalItems = Object.values(selectedProducts).reduce((sum, qty) => sum + qty, 0);

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
              <Badge className="bg-blue-100 text-blue-700 border-0">B2B Portal</Badge>
            </div>
            
            <nav className="hidden lg:flex items-center gap-8">
              <a href="#" className="text-sm hover:text-lime-500 transition-colors">Dashboard</a>
              <a href="#" className="text-sm hover:text-lime-500 transition-colors">Bulk Orders</a>
              <a href="#" className="text-sm hover:text-lime-500 transition-colors">Deals</a>
              <a href="#" className="text-sm hover:text-lime-500 transition-colors">Reports</a>
            </nav>
            
            <div className="flex items-center gap-4">
              <button className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl mb-2">Welcome back, Retailer!</h1>
          <p className="text-muted-foreground">Manage your bulk orders and track performance</p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {metrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>

        {/* Bulk Order Builder */}
        <div className="bg-white rounded-2xl p-8 border border-gray-100 mb-8" style={{ boxShadow: 'var(--shadow-md)' }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl mb-2">Bulk Order Builder</h2>
              <p className="text-muted-foreground">Build your bulk order with exclusive B2B pricing</p>
            </div>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input placeholder="Search products..." className="pl-10 w-64 rounded-xl" />
              </div>
              <Button variant="outline" className="rounded-xl">
                <Filter className="w-5 h-5 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="space-y-4 mb-6">
            {bulkProducts.map((product) => (
              <div
                key={product.id}
                className={`border-2 rounded-2xl p-6 transition-all ${
                  selectedProducts[product.id]
                    ? 'border-lime-400 bg-lime-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex gap-6">
                  <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="mb-1">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
                      </div>
                      <Badge className="bg-green-100 text-green-700 border-0">
                        {product.stock} in stock
                      </Badge>
                    </div>

                    <div className="grid grid-cols-4 gap-4 mt-4">
                      <div>
                        <Label className="text-xs text-muted-foreground">Retail Price</Label>
                        <p className="text-sm line-through text-gray-400">
                          ₹{product.retailPrice.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Bulk Price</Label>
                        <p className="text-lg text-lime-600">
                          ₹{product.bulkPrice.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Min. Order</Label>
                        <p className="text-sm">{product.minOrder} units</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground mb-2">Quantity</Label>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-8 h-8 p-0 rounded-lg"
                            onClick={() => updateQuantity(product.id, (selectedProducts[product.id] || 0) - 1)}
                          >
                            -
                          </Button>
                          <Input
                            type="number"
                            value={selectedProducts[product.id] || 0}
                            onChange={(e) => updateQuantity(product.id, parseInt(e.target.value) || 0)}
                            className="w-16 h-8 text-center rounded-lg"
                            min={0}
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-8 h-8 p-0 rounded-lg"
                            onClick={() => updateQuantity(product.id, (selectedProducts[product.id] || 0) + 1)}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          {totalItems > 0 && (
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="mb-1">Order Summary</h3>
                  <p className="text-sm text-muted-foreground">{totalItems} items selected</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
                  <p className="text-3xl">₹{calculateBulkTotal().toLocaleString()}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Button className="flex-1 bg-gradient-to-r from-lime-400 to-teal-400 text-black hover:shadow-lg h-12 rounded-xl">
                  Place Bulk Order
                </Button>
                <Button variant="outline" className="h-12 rounded-xl">
                  Save as Draft
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl p-8 border border-gray-100" style={{ boxShadow: 'var(--shadow-md)' }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl mb-2">Recent Bulk Orders</h2>
              <p className="text-muted-foreground">Track your recent bulk purchases</p>
            </div>
            <Button variant="outline" className="rounded-xl">
              <Download className="w-5 h-5 mr-2" />
              Export
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 text-sm text-muted-foreground">Order ID</th>
                  <th className="text-left py-4 px-4 text-sm text-muted-foreground">Date</th>
                  <th className="text-left py-4 px-4 text-sm text-muted-foreground">Items</th>
                  <th className="text-left py-4 px-4 text-sm text-muted-foreground">Total</th>
                  <th className="text-left py-4 px-4 text-sm text-muted-foreground">Status</th>
                  <th className="text-left py-4 px-4 text-sm text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">{order.id}</td>
                    <td className="py-4 px-4 text-sm text-muted-foreground">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4">{order.items}</td>
                    <td className="py-4 px-4">₹{order.total.toLocaleString()}</td>
                    <td className="py-4 px-4">
                      <Badge className={`${getStatusColor(order.status)} border-0`}>
                        {order.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <Button variant="ghost" size="sm" className="rounded-xl">
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
