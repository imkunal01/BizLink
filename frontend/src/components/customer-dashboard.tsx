import { useState } from "react";
import { Navbar } from "./navbar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { StatusBadge } from "./status-badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Package,
  User,
  MapPin,
  Heart,
  Settings,
  LogOut,
  Eye,
  Download,
  Search,
} from "lucide-react";

type TabType = "orders" | "profile" | "addresses" | "wishlist";

const orders = [
  {
    id: "KC-001234",
    date: "Nov 20, 2024",
    total: 1399.98,
    status: "delivered" as const,
    items: 2,
    image: "https://images.unsplash.com/photo-1738920424218-3d28b951740a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwd2lyZWxlc3MlMjBoZWFkcGhvbmVzfGVufDF8fHx8MTc2Mzk3NTc0N3ww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "KC-001189",
    date: "Nov 15, 2024",
    total: 299.99,
    status: "shipped" as const,
    items: 1,
    image: "https://images.unsplash.com/photo-1739287700815-7eef4abaab4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHdhdGNoJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjM5OTk4NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "KC-001056",
    date: "Nov 10, 2024",
    total: 499.99,
    status: "processing" as const,
    items: 1,
    image: "https://images.unsplash.com/photo-1604846887565-640d2f52d564?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb25zb2xlfGVufDF8fHx8MTc2NDA1NzI0Nnww&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

const addresses = [
  {
    id: "1",
    type: "Home",
    name: "John Doe",
    address: "123 Main Street, Apt 4B",
    city: "New York, NY 10001",
    phone: "+1 (555) 000-0000",
    isDefault: true,
  },
  {
    id: "2",
    type: "Office",
    name: "John Doe",
    address: "456 Business Ave, Suite 200",
    city: "New York, NY 10002",
    phone: "+1 (555) 111-1111",
    isDefault: false,
  },
];

const wishlistItems = [
  {
    id: "1",
    name: "Professional Camera Kit",
    price: 1899.99,
    image: "https://images.unsplash.com/photo-1532272278764-53cd1fe53f72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYzOTQzODEyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    inStock: true,
  },
  {
    id: "2",
    name: "Gaming Laptop Pro",
    price: 2499.99,
    image: "https://images.unsplash.com/photo-1511385348-a52b4a160dc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlcnxlbnwxfHx8fDE3NjQwMTc5ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    inStock: true,
  },
  {
    id: "3",
    name: "Wireless Earbuds Pro",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1761907174062-c8baf8b7edb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwbW9kZXJufGVufDF8fHx8MTc2Mzk3OTU4NHww&ixlib=rb-4.1.0&q=80&w=1080",
    inStock: false,
  },
];

export function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("orders");

  const sidebarItems = [
    { id: "orders" as TabType, label: "My Orders", icon: Package },
    { id: "profile" as TabType, label: "Profile", icon: User },
    { id: "addresses" as TabType, label: "Addresses", icon: MapPin },
    { id: "wishlist" as TabType, label: "Wishlist", icon: Heart },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl mb-2">My Account</h1>
          <p className="text-muted-foreground">
            Manage your orders, profile, and preferences
          </p>
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar */}
          <aside>
            <div
              className="bg-white rounded-3xl p-6 sticky top-24"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              {/* User Info */}
              <div className="flex items-center gap-4 pb-6 mb-6 border-b">
                <Avatar className="w-16 h-16">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-gradient-to-br from-[var(--lime-primary)] to-[var(--lime-dark)] text-black text-xl">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="mb-1">John Doe</h3>
                  <p className="text-sm text-muted-foreground">
                    john@example.com
                  </p>
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
                        activeTab === item.id
                          ? "bg-[var(--lime-primary)] text-black"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}

                <hr className="my-4" />

                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-gray-50 transition-all duration-300">
                  <Settings className="w-5 h-5" />
                  <span>Settings</span>
                </button>

                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-red-50 text-red-600 transition-all duration-300">
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main>
            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div className="space-y-6">
                {/* Search and Filter */}
                <div
                  className="bg-white rounded-3xl p-6"
                  style={{ boxShadow: "var(--shadow-soft)" }}
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        placeholder="Search orders..."
                        className="pl-12 rounded-xl bg-gray-50"
                      />
                    </div>
                    <Button variant="outline" className="rounded-xl">
                      Filter
                    </Button>
                  </div>
                </div>

                {/* Orders List */}
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-3xl p-6 transition-all duration-300 hover:shadow-[var(--shadow-medium)]"
                    style={{ boxShadow: "var(--shadow-soft)" }}
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 flex-shrink-0">
                        <img
                          src={order.image}
                          alt="Order"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h3>Order #{order.id}</h3>
                              <StatusBadge status={order.status} />
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Placed on {order.date} • {order.items} item
                              {order.items > 1 ? "s" : ""}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground mb-1">
                              Total Amount
                            </p>
                            <p className="text-2xl">${order.total.toFixed(2)}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-xl"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                          {order.status === "delivered" && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                className="rounded-xl"
                              >
                                <Download className="w-4 h-4 mr-2" />
                                Invoice
                              </Button>
                              <Button
                                size="sm"
                                className="rounded-xl bg-[var(--lime-primary)] text-black hover:bg-[var(--lime-dark)]"
                              >
                                Buy Again
                              </Button>
                            </>
                          )}
                          {order.status === "shipped" && (
                            <Button
                              size="sm"
                              className="rounded-xl bg-[var(--blue-primary)] text-white hover:bg-[var(--blue-primary)]/90"
                            >
                              Track Order
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div
                className="bg-white rounded-3xl p-8"
                style={{ boxShadow: "var(--shadow-soft)" }}
              >
                <h2 className="text-2xl mb-6">Profile Information</h2>
                <div className="space-y-6">
                  <div className="flex items-center gap-6 pb-6 border-b">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-gradient-to-br from-[var(--lime-primary)] to-[var(--lime-dark)] text-black text-3xl">
                        JD
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-xl mb-2"
                      >
                        Change Photo
                      </Button>
                      <p className="text-sm text-muted-foreground">
                        JPG, PNG or GIF. Max size 2MB
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input
                        id="first-name"
                        defaultValue="John"
                        className="rounded-xl bg-gray-50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input
                        id="last-name"
                        defaultValue="Doe"
                        className="rounded-xl bg-gray-50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue="john@example.com"
                      className="rounded-xl bg-gray-50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      defaultValue="+1 (555) 000-0000"
                      className="rounded-xl bg-gray-50"
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button
                      size="lg"
                      className="rounded-2xl bg-[var(--lime-primary)] text-black hover:bg-[var(--lime-dark)]"
                    >
                      Save Changes
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-2xl"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === "addresses" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl mb-2">Saved Addresses</h2>
                    <p className="text-muted-foreground">
                      Manage your delivery addresses
                    </p>
                  </div>
                  <Button className="rounded-2xl bg-[var(--lime-primary)] text-black hover:bg-[var(--lime-dark)]">
                    Add New Address
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      className="bg-white rounded-3xl p-6"
                      style={{ boxShadow: "var(--shadow-soft)" }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <h3>{address.type}</h3>
                          {address.isDefault && (
                            <span className="px-3 py-1 text-xs bg-[var(--lime-primary)] text-black rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                        <Button variant="ghost" size="sm" className="rounded-xl">
                          Edit
                        </Button>
                      </div>

                      <div className="space-y-2 text-sm">
                        <p>{address.name}</p>
                        <p className="text-muted-foreground">
                          {address.address}
                        </p>
                        <p className="text-muted-foreground">{address.city}</p>
                        <p className="text-muted-foreground">{address.phone}</p>
                      </div>

                      <div className="flex gap-3 mt-4 pt-4 border-t">
                        {!address.isDefault && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-xl flex-1"
                          >
                            Set as Default
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-xl text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === "wishlist" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl mb-2">My Wishlist</h2>
                  <p className="text-muted-foreground">
                    {wishlistItems.length} items saved
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlistItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-3xl p-4 transition-all duration-300 hover:shadow-[var(--shadow-medium)]"
                      style={{ boxShadow: "var(--shadow-soft)" }}
                    >
                      <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 mb-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                        <button className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform">
                          <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                        </button>
                        {!item.inStock && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="px-4 py-2 bg-white rounded-full text-sm">
                              Out of Stock
                            </span>
                          </div>
                        )}
                      </div>

                      <h4 className="mb-2 line-clamp-2">{item.name}</h4>
                      <p className="text-2xl mb-4">${item.price.toFixed(2)}</p>

                      <Button
                        className="w-full rounded-xl bg-[var(--lime-primary)] text-black hover:bg-[var(--lime-dark)]"
                        disabled={!item.inStock}
                      >
                        {item.inStock ? "Add to Cart" : "Out of Stock"}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
