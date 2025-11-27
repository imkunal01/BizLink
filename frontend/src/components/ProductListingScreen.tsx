import React, { useState } from 'react';
import { ShoppingCart, User, Heart, Menu, SlidersHorizontal, ChevronDown, X, Filter } from 'lucide-react';
import { Logo } from './Logo';
import { ProductCard } from './ProductCard';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { Slider } from './ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export function ProductListingScreen() {
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [selectedBrands, setSelectedBrands] = useState<Set<string>>(new Set());

  const toggleWishlist = (id: string) => {
    setWishlist(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => {
      const newSet = new Set(prev);
      if (newSet.has(brand)) {
        newSet.delete(brand);
      } else {
        newSet.add(brand);
      }
      return newSet;
    });
  };

  const products = [
    {
      id: '1',
      name: 'Premium Wireless Headphones with Active Noise Cancellation',
      price: 12999,
      originalPrice: 16999,
      image: 'https://images.unsplash.com/photo-1763822129929-bba1b521c8e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwaGVhZHBob25lcyUyMGVsZWN0cm9uaWNzfGVufDF8fHx8MTc2NDA2MDE3NHww&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.8,
      reviews: 256,
      badge: 'Trending',
    },
    {
      id: '2',
      name: 'Latest 5G Smartphone with 108MP Camera',
      price: 45999,
      originalPrice: 54999,
      image: 'https://images.unsplash.com/photo-1676173646307-d050e097d181?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwbW9kZXJuJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjQwNDI3MjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.6,
      reviews: 189,
      badge: 'New',
    },
    {
      id: '3',
      name: 'Ultra-Thin Gaming Laptop with RTX Graphics',
      price: 89999,
      originalPrice: 109999,
      image: 'https://images.unsplash.com/photo-1706735733956-deebaf5d001c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlciUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NjQwMjA3OTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.9,
      reviews: 342,
      badge: 'Hot Deal',
    },
    {
      id: '4',
      name: 'Smart Fitness Watch with Health Tracking',
      price: 8999,
      originalPrice: 12999,
      image: 'https://images.unsplash.com/photo-1758525747606-bd5d801ca87b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHdhdGNoJTIwd2VhcmFibGUlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2NDA1MTIzNHww&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.5,
      reviews: 178,
    },
    {
      id: '5',
      name: 'Professional DSLR Camera Kit',
      price: 67999,
      originalPrice: 79999,
      image: 'https://images.unsplash.com/photo-1760259203822-30265e7e4da8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjBwaG90b2dyYXBoeSUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NjM5OTEzMzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.7,
      reviews: 203,
    },
    {
      id: '6',
      name: 'Next-Gen Gaming Console Bundle',
      price: 49999,
      image: 'https://images.unsplash.com/photo-1695028644151-1ec92bae9fb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb25zb2xlJTIwY29udHJvbGxlcnxlbnwxfHx8fDE3NjM5OTAwMzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.9,
      reviews: 412,
      badge: 'Bestseller',
    },
    {
      id: '7',
      name: 'Premium Android Tablet with Stylus',
      price: 34999,
      originalPrice: 42999,
      image: 'https://images.unsplash.com/photo-1740637977676-c8040b41dc7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWJsZXQlMjBkZXZpY2UlMjBzY3JlZW58ZW58MXx8fHwxNzY0MDU1NDU5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.6,
      reviews: 167,
    },
    {
      id: '8',
      name: 'True Wireless Earbuds Pro',
      price: 5999,
      originalPrice: 8999,
      image: 'https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGVhcmJ1ZHN8ZW58MXx8fHwxNzY0MDU4NjI4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.4,
      reviews: 298,
      badge: 'Deal',
    },
    {
      id: '9',
      name: 'Premium Wireless Headphones with Active Noise Cancellation',
      price: 12999,
      originalPrice: 16999,
      image: 'https://images.unsplash.com/photo-1763822129929-bba1b521c8e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwaGVhZHBob25lcyUyMGVsZWN0cm9uaWNzfGVufDF8fHx8MTc2NDA2MDE3NHww&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.8,
      reviews: 256,
    },
    {
      id: '10',
      name: 'Latest 5G Smartphone with 108MP Camera',
      price: 45999,
      originalPrice: 54999,
      image: 'https://images.unsplash.com/photo-1676173646307-d050e097d181?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwbW9kZXJuJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjQwNDI3MjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.6,
      reviews: 189,
    },
    {
      id: '11',
      name: 'Ultra-Thin Gaming Laptop with RTX Graphics',
      price: 89999,
      originalPrice: 109999,
      image: 'https://images.unsplash.com/photo-1706735733956-deebaf5d001c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlciUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NjQwMjA3OTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.9,
      reviews: 342,
    },
    {
      id: '12',
      name: 'Smart Fitness Watch with Health Tracking',
      price: 8999,
      originalPrice: 12999,
      image: 'https://images.unsplash.com/photo-1758525747606-bd5d801ca87b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHdhdGNoJTIwd2VhcmFibGUlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2NDA1MTIzNHww&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.5,
      reviews: 178,
    },
  ];

  const categories = [
    { id: 'smartphones', name: 'Smartphones', count: 145 },
    { id: 'laptops', name: 'Laptops', count: 89 },
    { id: 'audio', name: 'Audio Devices', count: 234 },
    { id: 'cameras', name: 'Cameras', count: 67 },
    { id: 'wearables', name: 'Wearables', count: 123 },
    { id: 'gaming', name: 'Gaming', count: 178 },
  ];

  const brands = [
    { id: 'apple', name: 'Apple', count: 56 },
    { id: 'samsung', name: 'Samsung', count: 78 },
    { id: 'sony', name: 'Sony', count: 45 },
    { id: 'dell', name: 'Dell', count: 34 },
    { id: 'lg', name: 'LG', count: 29 },
    { id: 'xiaomi', name: 'Xiaomi', count: 67 },
  ];

  const FilterSection = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100" style={{ boxShadow: 'var(--shadow-sm)' }}>
        <h3 className="mb-4 flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Categories
        </h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <label key={category.id} className="flex items-center gap-3 cursor-pointer group">
              <Checkbox
                checked={selectedCategories.has(category.id)}
                onCheckedChange={() => toggleCategory(category.id)}
              />
              <span className="flex-1 text-sm group-hover:text-lime-500 transition-colors">
                {category.name}
              </span>
              <span className="text-xs text-muted-foreground">({category.count})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100" style={{ boxShadow: 'var(--shadow-sm)' }}>
        <h3 className="mb-4">Price Range</h3>
        <div className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            min={0}
            max={100000}
            step={1000}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm">
            <span>₹{priceRange[0].toLocaleString()}</span>
            <span>₹{priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Brands */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100" style={{ boxShadow: 'var(--shadow-sm)' }}>
        <h3 className="mb-4">Brands</h3>
        <div className="space-y-3">
          {brands.map((brand) => (
            <label key={brand.id} className="flex items-center gap-3 cursor-pointer group">
              <Checkbox
                checked={selectedBrands.has(brand.id)}
                onCheckedChange={() => toggleBrand(brand.id)}
              />
              <span className="flex-1 text-sm group-hover:text-lime-500 transition-colors">
                {brand.name}
              </span>
              <span className="text-xs text-muted-foreground">({brand.count})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100" style={{ boxShadow: 'var(--shadow-sm)' }}>
        <h3 className="mb-4">Availability</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <Checkbox />
            <span className="text-sm">In Stock</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <Checkbox />
            <span className="text-sm">Same Day Delivery</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <Checkbox />
            <span className="text-sm">On Sale</span>
          </label>
        </div>
      </div>

      {/* Clear Filters */}
      <Button variant="outline" className="w-full">
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <button className="lg:hidden" onClick={() => setShowFilters(!showFilters)}>
                <Menu className="w-6 h-6" />
              </button>
              <Logo />
            </div>
            
            <nav className="hidden lg:flex items-center gap-8">
              <a href="#" className="text-sm hover:text-lime-500 transition-colors">Home</a>
              <a href="#" className="text-sm text-lime-500">Products</a>
              <a href="#" className="text-sm hover:text-lime-500 transition-colors">Deals</a>
              <a href="#" className="text-sm hover:text-lime-500 transition-colors">B2B</a>
            </nav>
            
            <div className="flex items-center gap-4">
              <button className="relative">
                <Heart className="w-6 h-6 text-gray-700 hover:text-red-500 transition-colors" />
                {wishlist.size > 0 && (
                  <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                    {wishlist.size}
                  </Badge>
                )}
              </button>
              <button className="relative">
                <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-lime-500 transition-colors" />
                <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center bg-lime-400 text-black text-xs">
                  0
                </Badge>
              </button>
              <button className="w-9 h-9 rounded-full bg-gradient-to-r from-lime-400 to-teal-400 flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <a href="#" className="hover:text-lime-500">Home</a>
            <span>/</span>
            <span className="text-foreground">All Products</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24">
              <FilterSection />
            </div>
          </aside>

          {/* Mobile Filter Drawer */}
          {showFilters && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="absolute inset-0 bg-black/50" onClick={() => setShowFilters(false)} />
              <div className="absolute left-0 top-0 bottom-0 w-80 bg-white p-6 overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl">Filters</h2>
                  <button onClick={() => setShowFilters(false)}>
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <FilterSection />
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-2xl p-4 mb-6 flex flex-wrap items-center justify-between gap-4 border border-gray-100" style={{ boxShadow: 'var(--shadow-sm)' }}>
              <div className="flex items-center gap-4">
                <button
                  className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 hover:border-lime-400 transition-colors"
                  onClick={() => setShowFilters(true)}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </button>
                <p className="text-sm text-muted-foreground">
                  Showing <span className="text-foreground">{products.length}</span> products
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <Select defaultValue="relevance">
                  <SelectTrigger className="w-[180px] rounded-xl">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Most Relevant</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Active Filters */}
            {(selectedCategories.size > 0 || selectedBrands.size > 0) && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                {Array.from(selectedCategories).map(cat => (
                  <Badge
                    key={cat}
                    variant="secondary"
                    className="gap-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => toggleCategory(cat)}
                  >
                    {categories.find(c => c.id === cat)?.name}
                    <X className="w-3 h-3" />
                  </Badge>
                ))}
                {Array.from(selectedBrands).map(brand => (
                  <Badge
                    key={brand}
                    variant="secondary"
                    className="gap-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => toggleBrand(brand)}
                  >
                    {brands.find(b => b.id === brand)?.name}
                    <X className="w-3 h-3" />
                  </Badge>
                ))}
              </div>
            )}

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  inWishlist={wishlist.has(product.id)}
                  onToggleWishlist={() => toggleWishlist(product.id)}
                  onAddToCart={() => console.log('Add to cart:', product.id)}
                  onClick={() => console.log('View product:', product.id)}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex items-center justify-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              {[1, 2, 3, 4, 5].map((page) => (
                <Button
                  key={page}
                  variant={page === 1 ? 'default' : 'outline'}
                  size="sm"
                  className={page === 1 ? 'bg-gradient-to-r from-lime-400 to-teal-400 text-black' : ''}
                >
                  {page}
                </Button>
              ))}
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
