import { Navbar } from "./navbar";
import { HomeHero } from "./home-hero";
import { CategoryCarousel } from "./category-carousel";
import { ProductCard } from "./product-card";
import { Zap, TrendingUp, Package } from "lucide-react";

const trendingProducts = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 299.99,
    retailerPrice: 249.99,
    image: "https://images.unsplash.com/photo-1738920424218-3d28b951740a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwd2lyZWxlc3MlMjBoZWFkcGhvbmVzfGVufDF8fHx8MTc2Mzk3NTc0N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.8,
    reviews: 234,
    isNew: true,
  },
  {
    id: "2",
    name: "Modern Smartphone Pro Max",
    price: 1099.99,
    retailerPrice: 949.99,
    image: "https://images.unsplash.com/photo-1761907174062-c8baf8b7edb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwbW9kZXJufGVufDF8fHx8MTc2Mzk3OTU4NHww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.9,
    reviews: 567,
    discount: 15,
  },
  {
    id: "3",
    name: "Professional Laptop Ultra",
    price: 1499.99,
    retailerPrice: 1299.99,
    image: "https://images.unsplash.com/photo-1511385348-a52b4a160dc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlcnxlbnwxfHx8fDE3NjQwMTc5ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.7,
    reviews: 189,
    isNew: true,
  },
  {
    id: "4",
    name: "Smart Watch Series X",
    price: 399.99,
    retailerPrice: 349.99,
    image: "https://images.unsplash.com/photo-1739287700815-7eef4abaab4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHdhdGNoJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjM5OTk4NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.6,
    reviews: 421,
    discount: 10,
  },
];

const featuredDeals = [
  {
    id: "5",
    name: "Gaming Console Pro",
    price: 499.99,
    retailerPrice: 449.99,
    image: "https://images.unsplash.com/photo-1604846887565-640d2f52d564?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb25zb2xlfGVufDF8fHx8MTc2NDA1NzI0Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.9,
    reviews: 892,
    discount: 20,
  },
  {
    id: "6",
    name: "Professional Camera Kit",
    price: 1899.99,
    retailerPrice: 1699.99,
    image: "https://images.unsplash.com/photo-1532272278764-53cd1fe53f72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYzOTQzODEyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.8,
    reviews: 234,
    isNew: true,
  },
];

const infoCards = [
  {
    icon: Zap,
    title: "Fast Delivery",
    description: "Get your products delivered in 24-48 hours",
    gradient: "from-yellow-400 to-orange-500",
  },
  {
    icon: Package,
    title: "Bulk Orders",
    description: "Special pricing for retailers and businesses",
    gradient: "from-blue-400 to-purple-500",
  },
  {
    icon: TrendingUp,
    title: "Best Prices",
    description: "Competitive pricing guaranteed",
    gradient: "from-green-400 to-teal-500",
  },
];

export function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HomeHero />
      
      {/* Info Cards */}
      <section className="px-6 py-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {infoCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-3xl p-6 flex items-start gap-4 transition-all duration-300 hover:scale-105"
                  style={{ boxShadow: "var(--shadow-soft)" }}
                >
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center flex-shrink-0`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h4 className="mb-1">{card.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {card.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CategoryCarousel />

      {/* Trending Products */}
      <section className="px-6 py-12 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl mb-2">Trending Products</h2>
            <p className="text-muted-foreground">
              Most popular items this week
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Deals */}
      <section className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl mb-2">Featured Deals</h2>
            <p className="text-muted-foreground">
              Limited time offers you don't want to miss
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {featuredDeals.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white px-6 py-12 mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl mb-4">
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-primary)" }}>
                  Kripa Connect
                </span>
              </h3>
              <p className="text-gray-400">
                Your trusted partner for premium electronics and technology.
              </p>
            </div>
            <div>
              <h4 className="mb-4">Shop</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">All Products</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Categories</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Deals</a></li>
                <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">For Retailers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Kripa Connect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
