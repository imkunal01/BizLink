import React, { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingBag,
  Users,
  Store,
  Archive,
  CreditCard,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  Search,
  Bell,
  Download,
  TrendingUp,
  TrendingDown,
  DollarSign,
  AlertTriangle,
} from 'lucide-react';
import { Logo } from './Logo';
import { MetricCard } from './MetricCard';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  const metrics = [
    {
      title: 'Total Revenue',
      value: '₹24.8L',
      change: '+24.5%',
      changeType: 'positive' as const,
      icon: DollarSign,
      gradient: 'bg-gradient-to-br from-lime-400 to-teal-500',
    },
    {
      title: 'Total Orders',
      value: '1,234',
      change: '+12.8%',
      changeType: 'positive' as const,
      icon: ShoppingBag,
      gradient: 'bg-gradient-to-br from-blue-500 to-purple-600',
    },
    {
      title: 'Total Customers',
      value: '8,456',
      change: '+18.2%',
      changeType: 'positive' as const,
      icon: Users,
      gradient: 'bg-gradient-to-br from-pink-500 to-orange-500',
    },
    {
      title: 'Active Retailers',
      value: '142',
      change: '+8',
      changeType: 'positive' as const,
      icon: Store,
      gradient: 'bg-gradient-to-br from-purple-500 to-pink-600',
    },
  ];

  const salesData = [
    { name: 'Jan', sales: 65000, orders: 145 },
    { name: 'Feb', sales: 72000, orders: 168 },
    { name: 'Mar', sales: 81000, orders: 192 },
    { name: 'Apr', sales: 78000, orders: 178 },
    { name: 'May', sales: 95000, orders: 225 },
    { name: 'Jun', sales: 112000, orders: 268 },
    { name: 'Jul', sales: 128000, orders: 302 },
    { name: 'Aug', sales: 135000, orders: 318 },
    { name: 'Sep', sales: 148000, orders: 345 },
    { name: 'Oct', sales: 162000, orders: 378 },
    { name: 'Nov', sales: 185000, orders: 425 },
  ];

  const categoryData = [
    { name: 'Smartphones', value: 35, color: '#4A90FF' },
    { name: 'Laptops', value: 25, color: '#B794F6' },
    { name: 'Audio', value: 20, color: '#FF6B9D' },
    { name: 'Cameras', value: 12, color: '#00D9D9' },
    { name: 'Others', value: 8, color: '#D4FF00' },
  ];

  const recentOrders = [
    { id: 'ORD-001', customer: 'Rajesh Kumar', date: '2024-11-25', total: 45999, status: 'processing', items: 2 },
    { id: 'ORD-002', customer: 'Priya Sharma', date: '2024-11-25', total: 12999, status: 'shipped', items: 1 },
    { id: 'ORD-003', customer: 'Amit Patel', date: '2024-11-24', total: 89999, status: 'delivered', items: 1 },
    { id: 'ORD-004', customer: 'Sneha Reddy', date: '2024-11-24', total: 34999, status: 'processing', items: 3 },
    { id: 'ORD-005', customer: 'Vikram Singh', date: '2024-11-24', total: 67999, status: 'shipped', items: 2 },
  ];

  const lowStockProducts = [
    { name: 'Premium Wireless Headphones', sku: 'PWH-001', stock: 5, reorderLevel: 20 },
    { name: 'Gaming Console Pro', sku: 'GCP-002', stock: 3, reorderLevel: 15 },
    { name: 'Smart Fitness Watch', sku: 'SFW-003', stock: 8, reorderLevel: 25 },
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
    <div className="space-y-1">
      <button
        onClick={() => setActiveSection('dashboard')}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
          activeSection === 'dashboard'
            ? 'bg-gradient-to-r from-lime-400 to-teal-400 text-black'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <LayoutDashboard className="w-5 h-5" />
        <span>Dashboard</span>
      </button>
      
      <button
        onClick={() => setActiveSection('products')}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
          activeSection === 'products'
            ? 'bg-gradient-to-r from-lime-400 to-teal-400 text-black'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <Package className="w-5 h-5" />
        <span>Products</span>
      </button>
      
      <button
        onClick={() => setActiveSection('categories')}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
          activeSection === 'categories'
            ? 'bg-gradient-to-r from-lime-400 to-teal-400 text-black'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <FolderTree className="w-5 h-5" />
        <span>Categories</span>
      </button>
      
      <button
        onClick={() => setActiveSection('orders')}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
          activeSection === 'orders'
            ? 'bg-gradient-to-r from-lime-400 to-teal-400 text-black'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <ShoppingBag className="w-5 h-5" />
        <span>Orders</span>
      </button>
      
      <button
        onClick={() => setActiveSection('customers')}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
          activeSection === 'customers'
            ? 'bg-gradient-to-r from-lime-400 to-teal-400 text-black'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <Users className="w-5 h-5" />
        <span>Customers</span>
      </button>
      
      <button
        onClick={() => setActiveSection('retailers')}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
          activeSection === 'retailers'
            ? 'bg-gradient-to-r from-lime-400 to-teal-400 text-black'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <Store className="w-5 h-5" />
        <span>Retailers</span>
      </button>
      
      <button
        onClick={() => setActiveSection('inventory')}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
          activeSection === 'inventory'
            ? 'bg-gradient-to-r from-lime-400 to-teal-400 text-black'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <Archive className="w-5 h-5" />
        <span>Inventory</span>
      </button>
      
      <button
        onClick={() => setActiveSection('payments')}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
          activeSection === 'payments'
            ? 'bg-gradient-to-r from-lime-400 to-teal-400 text-black'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <CreditCard className="w-5 h-5" />
        <span>Payments</span>
      </button>
      
      <button
        onClick={() => setActiveSection('analytics')}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
          activeSection === 'analytics'
            ? 'bg-gradient-to-r from-lime-400 to-teal-400 text-black'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <BarChart3 className="w-5 h-5" />
        <span>Analytics</span>
      </button>

      <div className="pt-4 mt-4 border-t border-gray-200">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-all">
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6">
              <button className="lg:hidden" onClick={() => setShowMobileSidebar(!showMobileSidebar)}>
                <Menu className="w-6 h-6" />
              </button>
              <Logo />
              <Badge className="bg-purple-100 text-purple-700 border-0">Admin Panel</Badge>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input placeholder="Search..." className="pl-10 w-64 rounded-xl border-gray-200" />
              </div>
              
              <button className="relative w-10 h-10 rounded-xl hover:bg-gray-100 flex items-center justify-center">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center text-white">
                A
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-72 bg-white border-r border-gray-200 min-h-screen sticky top-16">
          <div className="p-6">
            <Sidebar />
          </div>
        </aside>

        {/* Mobile Sidebar */}
        {showMobileSidebar && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileSidebar(false)} />
            <div className="absolute left-0 top-0 bottom-0 w-80 bg-white p-6 overflow-y-auto">
              <Sidebar />
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          {activeSection === 'dashboard' && (
            <div className="space-y-8">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl mb-2">Dashboard Overview</h1>
                  <p className="text-muted-foreground">Welcome back, Admin! Here's what's happening today.</p>
                </div>
                <Button className="bg-gradient-to-r from-lime-400 to-teal-400 text-black hover:shadow-lg rounded-xl">
                  <Download className="w-5 h-5 mr-2" />
                  Export Report
                </Button>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map((metric, index) => (
                  <MetricCard key={index} {...metric} />
                ))}
              </div>

              {/* Charts */}
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Sales Chart */}
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100" style={{ boxShadow: 'var(--shadow-md)' }}>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="mb-1">Sales Overview</h3>
                      <p className="text-sm text-muted-foreground">Monthly revenue trends</p>
                    </div>
                    <div className="flex items-center gap-2 text-green-600">
                      <TrendingUp className="w-5 h-5" />
                      <span className="text-sm">+24.5%</span>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={salesData}>
                      <defs>
                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#d4ff00" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#d4ff00" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" stroke="#999" />
                      <YAxis stroke="#999" />
                      <Tooltip />
                      <Area type="monotone" dataKey="sales" stroke="#d4ff00" fillOpacity={1} fill="url(#colorSales)" strokeWidth={3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Category Distribution */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100" style={{ boxShadow: 'var(--shadow-md)' }}>
                  <h3 className="mb-1">Category Distribution</h3>
                  <p className="text-sm text-muted-foreground mb-6">Sales by category</p>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="mt-4 space-y-2">
                    {categoryData.map((cat, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                          <span>{cat.name}</span>
                        </div>
                        <span>{cat.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tables */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Orders */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100" style={{ boxShadow: 'var(--shadow-md)' }}>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="mb-1">Recent Orders</h3>
                      <p className="text-sm text-muted-foreground">Latest customer orders</p>
                    </div>
                    <Button variant="ghost" size="sm" className="rounded-xl">
                      View All
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-0">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-sm">{order.id}</h4>
                            <Badge className={`${getStatusColor(order.status)} border-0 text-xs`}>
                              {order.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{order.customer}</p>
                        </div>
                        <div className="text-right">
                          <p className="mb-1">₹{order.total.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">{order.items} items</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Low Stock Alerts */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100" style={{ boxShadow: 'var(--shadow-md)' }}>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="mb-1">Low Stock Alerts</h3>
                      <p className="text-sm text-muted-foreground">Products need restocking</p>
                    </div>
                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                  </div>
                  <div className="space-y-4">
                    {lowStockProducts.map((product, idx) => (
                      <div key={idx} className="pb-4 border-b border-gray-100 last:border-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h4 className="text-sm mb-1">{product.name}</h4>
                            <p className="text-xs text-muted-foreground">SKU: {product.sku}</p>
                          </div>
                          <Badge className="bg-orange-100 text-orange-700 border-0">
                            {product.stock} left
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-orange-500 rounded-full"
                              style={{ width: `${(product.stock / product.reorderLevel) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {product.reorderLevel} min
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4 rounded-xl">
                    View All Alerts
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Other sections would be implemented here with similar structure */}
          {activeSection !== 'dashboard' && (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-100" style={{ boxShadow: 'var(--shadow-md)' }}>
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-lime-400 to-teal-400 flex items-center justify-center">
                <Package className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl mb-2">{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Management</h2>
              <p className="text-muted-foreground mb-6">
                This section contains management tools for {activeSection}
              </p>
              <Button className="bg-gradient-to-r from-lime-400 to-teal-400 text-black hover:shadow-lg rounded-xl">
                View {activeSection}
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
