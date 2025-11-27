import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, ShoppingCart, Star, SlidersHorizontal, Grid3x3, List, ChevronDown } from 'lucide-react';
import { Button } from '../Button';
import { Badge } from '../Badge';
import { Card } from '../Card';
import { Select } from '../Select';
import { Checkbox } from '../Checkbox';
import { ImageWithFallback } from '../figma/ImageWithFallback';

const products = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    category: 'Audio',
    price: 299,
    originalPrice: 399,
    rating: 4.8,
    reviews: 1250,
    image: 'https://images.unsplash.com/photo-1695028644151-1ec92bae9fb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXMlMjBtb2Rlcm58ZW58MXx8fHwxNzY0MDU5NzE4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    inStock: true
  },
  {
    id: 2,
    name: 'Ultra-Thin Laptop Pro',
    category: 'Computers',
    price: 1299,
    originalPrice: 1599,
    rating: 4.9,
    reviews: 890,
    image: 'https://images.unsplash.com/photo-1642943038577-eb4a59549766?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlciUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzY0MDA5NTYzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    inStock: true
  },
  {
    id: 3,
    name: 'Smart Watch Series 9',
    category: 'Wearables',
    price: 449,
    originalPrice: 549,
    rating: 4.7,
    reviews: 2100,
    image: 'https://images.unsplash.com/photo-1719744755528-797de46cbbff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHdhdGNoJTIwd2VhcmFibGUlMjB0ZWNofGVufDF8fHx8MTc2NDAzMjY0NXww&ixlib=rb-4.1.0&q=80&w=1080',
    inStock: true
  },
  {
    id: 4,
    name: 'Professional Camera Kit',
    category: 'Photography',
    price: 1899,
    originalPrice: 2299,
    rating: 4.9,
    reviews: 450,
    image: 'https://images.unsplash.com/photo-1760259203822-30265e7e4da8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjBwaG90b2dyYXBoeSUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NjM5OTEzMzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    inStock: true
  },
  {
    id: 5,
    name: 'Gaming Console X1',
    category: 'Gaming',
    price: 499,
    originalPrice: 599,
    rating: 4.8,
    reviews: 3200,
    image: 'https://images.unsplash.com/photo-1695028644151-1ec92bae9fb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb25zb2xlJTIwY29udHJvbGxlcnxlbnwxfHx8fDE3NjM5OTAwMzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    inStock: true
  },
  {
    id: 6,
    name: 'Smartphone Pro Max',
    category: 'Mobile',
    price: 999,
    originalPrice: 1199,
    rating: 4.9,
    reviews: 5400,
    image: 'https://images.unsplash.com/photo-1727093493864-0bcbd16c7e6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwc21hcnRwaG9uZSUyMGVsZWN0cm9uaWNzfGVufDF8fHx8MTc2NDA1OTcxN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    inStock: true
  }
];

const categories = ['All', 'Mobile', 'Audio', 'Computers', 'Wearables', 'Photography', 'Gaming'];
const brands = ['Apple', 'Samsung', 'Sony', 'LG', 'Dell', 'HP', 'Canon', 'Nikon'];

export function ProductListingPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-neutral-900 mb-2">All Products</h2>
          <p className="text-neutral-600">Showing 1-6 of 1,234 products</p>
        </div>
        
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              icon={<SlidersHorizontal className="w-4 h-4" />}
            >
              Filters
            </Button>
            <Badge variant="neutral">6 products</Badge>
          </div>
          
          <div className="flex items-center gap-4 w-full sm:w-auto">
            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 bg-neutral-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-neutral-400'
                }`}
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'list' ? 'bg-white shadow-sm' : 'text-neutral-400'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
            
            {/* Sort Dropdown */}
            <Select
              options={[
                { value: 'popularity', label: 'Popularity' },
                { value: 'price-low', label: 'Price: Low to High' },
                { value: 'price-high', label: 'Price: High to Low' },
                { value: 'rating', label: 'Highest Rated' },
                { value: 'newest', label: 'Newest First' }
              ]}
              className="min-w-[200px]"
            />
          </div>
        </div>
        
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden lg:block w-64 flex-shrink-0"
            >
              <Card className="sticky top-24">
                <div className="space-y-6">
                  {/* Category Filter */}
                  <div>
                    <h6 className="mb-3 text-neutral-900">Categories</h6>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <Checkbox
                          key={category}
                          label={category}
                          defaultChecked={category === 'All'}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Price Range */}
                  <div className="pt-6 border-t border-neutral-200">
                    <h6 className="mb-3 text-neutral-900">Price Range</h6>
                    <div className="space-y-4">
                      <input
                        type="range"
                        min="0"
                        max="2000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full"
                      />
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-neutral-600">$0</span>
                        <span className="text-neutral-900">${priceRange[1]}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Brand Filter */}
                  <div className="pt-6 border-t border-neutral-200">
                    <h6 className="mb-3 text-neutral-900">Brands</h6>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {brands.map((brand) => (
                        <Checkbox key={brand} label={brand} />
                      ))}
                    </div>
                  </div>
                  
                  {/* Availability */}
                  <div className="pt-6 border-t border-neutral-200">
                    <h6 className="mb-3 text-neutral-900">Availability</h6>
                    <div className="space-y-2">
                      <Checkbox label="In Stock" defaultChecked />
                      <Checkbox label="Out of Stock" />
                    </div>
                  </div>
                  
                  {/* Reset Filters */}
                  <div className="pt-6 border-t border-neutral-200">
                    <Button variant="outline" size="sm" fullWidth>
                      Reset Filters
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.aside>
          )}
          
          {/* Products Grid */}
          <div className="flex-1">
            <div className={`grid gap-6 ${
              viewMode === 'grid'
                ? 'sm:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-1'
            }`}>
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group"
                >
                  <div className={`bg-white rounded-2xl shadow-md hover:shadow-xl transition-all border border-neutral-100 ${
                    viewMode === 'list' ? 'flex gap-6' : ''
                  }`}>
                    {/* Image */}
                    <div className={`relative bg-neutral-50 overflow-hidden ${
                      viewMode === 'list' 
                        ? 'w-48 rounded-l-2xl' 
                        : 'aspect-square rounded-t-2xl p-6'
                    }`}>
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                      />
                      
                      {/* Quick Actions */}
                      <div className={`absolute flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity ${
                        viewMode === 'list' ? 'top-4 right-4 flex-col' : 'top-4 right-4 flex-col'
                      }`}>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-neutral-600 hover:text-red-500 transition-colors"
                        >
                          <Heart className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className={`p-5 ${viewMode === 'list' ? 'flex-1 flex flex-col justify-between' : ''}`}>
                      <div>
                        <Badge variant="neutral" size="sm" className="mb-2">
                          {product.category}
                        </Badge>
                        <h5 className="text-neutral-900 mb-2">{product.name}</h5>
                        
                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                            <span className="text-sm text-neutral-900">{product.rating}</span>
                          </div>
                          <span className="text-sm text-neutral-400">({product.reviews})</span>
                        </div>
                      </div>
                      
                      {/* Price & Action */}
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <span className="text-2xl text-neutral-900">${product.price}</span>
                            <span className="text-sm text-neutral-400 line-through ml-2">${product.originalPrice}</span>
                          </div>
                          {product.inStock && (
                            <Badge variant="success" size="sm">In Stock</Badge>
                          )}
                        </div>
                        
                        <div className={`flex gap-2 ${viewMode === 'list' ? 'flex-row' : 'flex-col sm:flex-row'}`}>
                          <Button variant="primary" size="sm" fullWidth>
                            Add to Cart
                          </Button>
                          <Button variant="outline" size="sm" className={viewMode === 'list' ? 'w-auto' : 'w-full sm:w-auto'}>
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Pagination */}
            <div className="mt-12 flex items-center justify-center gap-2">
              <Button variant="outline" size="sm">Previous</Button>
              <Button variant="primary" size="sm">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <span className="px-3 text-neutral-400">...</span>
              <Button variant="outline" size="sm">10</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
