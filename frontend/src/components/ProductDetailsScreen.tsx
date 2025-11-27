import React, { useState } from 'react';
import { ShoppingCart, User, Heart, Menu, Star, Truck, Shield, RefreshCw, Award, ChevronRight, Minus, Plus } from 'lucide-react';
import { Logo } from './Logo';
import { ProductCard } from './ProductCard';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar } from './ui/avatar';

export function ProductDetailsScreen() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedStorage, setSelectedStorage] = useState('128GB');
  const [quantity, setQuantity] = useState(1);
  const [inWishlist, setInWishlist] = useState(false);

  const product = {
    id: '1',
    name: 'Premium Wireless Headphones with Active Noise Cancellation',
    price: 12999,
    originalPrice: 16999,
    rating: 4.8,
    reviews: 256,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1763822129929-bba1b521c8e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwaGVhZHBob25lcyUyMGVsZWN0cm9uaWNzfGVufDF8fHx8MTc2NDA2MDE3NHww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGVhcmJ1ZHN8ZW58MXx8fHwxNzY0MDU4NjI4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1706735733956-deebaf5d001c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlciUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NjQwMjA3OTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1676173646307-d050e097d181?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwbW9kZXJuJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjQwNDI3MjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    colors: [
      { id: 'black', name: 'Midnight Black', hex: '#000000' },
      { id: 'white', name: 'Pearl White', hex: '#FFFFFF' },
      { id: 'blue', name: 'Ocean Blue', hex: '#4A90FF' },
      { id: 'pink', name: 'Rose Pink', hex: '#FF6B9D' },
    ],
    storage: ['64GB', '128GB', '256GB', '512GB'],
    features: [
      'Active Noise Cancellation (ANC)',
      '40 Hours Battery Life',
      'Premium Audio Quality',
      'Wireless Charging',
      'Multi-device Connectivity',
      'Touch Controls',
    ],
    specs: {
      'Brand': 'Premium Audio Co.',
      'Model': 'PAC-ANC-Pro',
      'Connectivity': 'Bluetooth 5.3',
      'Battery': '40 Hours',
      'Charging': 'USB-C + Wireless',
      'Weight': '250g',
      'Drivers': '40mm Dynamic',
      'Frequency': '20Hz - 20kHz',
    },
  };

  const reviews = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      rating: 5,
      date: '2 days ago',
      comment: 'Absolutely amazing sound quality! The noise cancellation is top-notch. Best purchase this year.',
      verified: true,
      helpful: 24,
    },
    {
      id: 2,
      name: 'Priya Sharma',
      rating: 4,
      date: '1 week ago',
      comment: 'Great headphones for the price. Battery life is impressive. Only wish it came in more colors.',
      verified: true,
      helpful: 18,
    },
    {
      id: 3,
      name: 'Amit Patel',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Perfect for work from home. The ANC blocks out all distractions. Highly recommended!',
      verified: true,
      helpful: 31,
    },
  ];

  const recommendedProducts = [
    {
      id: '2',
      name: 'Latest 5G Smartphone with 108MP Camera',
      price: 45999,
      originalPrice: 54999,
      image: 'https://images.unsplash.com/photo-1676173646307-d050e097d181?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwbW9kZXJuJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjQwNDI3MjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.6,
      reviews: 189,
    },
    {
      id: '3',
      name: 'Ultra-Thin Gaming Laptop with RTX Graphics',
      price: 89999,
      originalPrice: 109999,
      image: 'https://images.unsplash.com/photo-1706735733956-deebaf5d001c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlciUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NjQwMjA3OTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.9,
      reviews: 342,
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
  ];

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
            
            <nav className="hidden lg:flex items-center gap-8">
              <a href="#" className="text-sm hover:text-lime-500 transition-colors">Home</a>
              <a href="#" className="text-sm hover:text-lime-500 transition-colors">Products</a>
              <a href="#" className="text-sm hover:text-lime-500 transition-colors">Deals</a>
              <a href="#" className="text-sm hover:text-lime-500 transition-colors">B2B</a>
            </nav>
            
            <div className="flex items-center gap-4">
              <button className="relative">
                <Heart className="w-6 h-6 text-gray-700 hover:text-red-500 transition-colors" />
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
            <ChevronRight className="w-4 h-4" />
            <a href="#" className="hover:text-lime-500">Audio Devices</a>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-white rounded-3xl overflow-hidden border border-gray-200" style={{ boxShadow: 'var(--shadow-lg)' }}>
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.inStock && (
                <Badge className="absolute top-4 left-4 bg-green-500 text-white border-0">
                  In Stock
                </Badge>
              )}
              <button
                onClick={() => setInWishlist(!inWishlist)}
                className={`absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  inWishlist
                    ? 'bg-red-500 text-white'
                    : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-red-500 hover:text-white'
                }`}
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
              </button>
            </div>
            
            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? 'border-lime-400 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`Product ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl mb-4">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${
                          star <= Math.round(product.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm">{product.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-4xl text-black">₹{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                    <Badge className="bg-green-100 text-green-700 border-0">
                      Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </Badge>
                  </>
                )}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <label className="block text-sm mb-3">
                Color: <span className="text-muted-foreground">{product.colors.find(c => c.id === selectedColor)?.name}</span>
              </label>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color.id)}
                    className={`w-12 h-12 rounded-full border-2 transition-all hover:scale-110 ${
                      selectedColor === color.id
                        ? 'border-lime-400 shadow-lg'
                        : 'border-gray-200'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  >
                    {color.hex === '#FFFFFF' && (
                      <div className="w-full h-full rounded-full border border-gray-300" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Storage Selection */}
            <div>
              <label className="block text-sm mb-3">Storage</label>
              <div className="flex gap-3">
                {product.storage.map((storage) => (
                  <button
                    key={storage}
                    onClick={() => setSelectedStorage(storage)}
                    className={`px-6 py-3 rounded-xl border-2 transition-all ${
                      selectedStorage === storage
                        ? 'border-lime-400 bg-lime-50 text-black'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {storage}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm mb-3">Quantity</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 bg-white rounded-xl border border-gray-200 p-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                {product.inStock && (
                  <span className="text-sm text-green-600">Only 5 left in stock!</span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button size="lg" className="flex-1 bg-gradient-to-r from-lime-400 to-teal-400 text-black hover:shadow-lg h-14 text-lg">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button size="lg" variant="outline" className="flex-1 h-14 text-lg">
                Buy Now
              </Button>
            </div>

            {/* Features */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6">
              <h3 className="mb-4">Key Features</h3>
              <ul className="grid grid-cols-2 gap-3">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-lime-400" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-4 gap-4">
              <div className="flex flex-col items-center text-center p-4 bg-white rounded-xl border border-gray-100">
                <Truck className="w-8 h-8 text-lime-500 mb-2" />
                <span className="text-xs text-muted-foreground">Free Delivery</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-white rounded-xl border border-gray-100">
                <Shield className="w-8 h-8 text-blue-500 mb-2" />
                <span className="text-xs text-muted-foreground">1 Year Warranty</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-white rounded-xl border border-gray-100">
                <RefreshCw className="w-8 h-8 text-purple-500 mb-2" />
                <span className="text-xs text-muted-foreground">Easy Returns</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-white rounded-xl border border-gray-100">
                <Award className="w-8 h-8 text-teal-500 mb-2" />
                <span className="text-xs text-muted-foreground">Premium Quality</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full justify-start border-b border-gray-200 bg-transparent h-auto p-0 rounded-none">
              <TabsTrigger value="description" className="rounded-t-xl data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-lime-400">
                Description
              </TabsTrigger>
              <TabsTrigger value="specifications" className="rounded-t-xl data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-lime-400">
                Specifications
              </TabsTrigger>
              <TabsTrigger value="reviews" className="rounded-t-xl data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-lime-400">
                Reviews ({product.reviews})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6">
              <div className="bg-white rounded-2xl p-8 border border-gray-100" style={{ boxShadow: 'var(--shadow-sm)' }}>
                <h3 className="mb-4">Product Description</h3>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Experience audio perfection with our Premium Wireless Headphones featuring state-of-the-art Active Noise Cancellation technology. 
                    Immerse yourself in pure, uninterrupted sound whether you're working, traveling, or simply relaxing.
                  </p>
                  <p>
                    With an impressive 40-hour battery life, these headphones keep up with your longest days. The premium build quality 
                    combines comfort with durability, featuring plush memory foam ear cushions and an adjustable headband for the perfect fit.
                  </p>
                  <p>
                    Advanced Bluetooth 5.3 connectivity ensures stable, low-latency audio transmission, while the multi-device capability 
                    lets you seamlessly switch between your phone, tablet, and laptop. Touch controls provide intuitive access to all 
                    functions, and wireless charging adds convenience to your daily routine.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="specifications" className="mt-6">
              <div className="bg-white rounded-2xl p-8 border border-gray-100" style={{ boxShadow: 'var(--shadow-sm)' }}>
                <h3 className="mb-6">Technical Specifications</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-3 border-b border-gray-100">
                      <span className="text-muted-foreground">{key}</span>
                      <span className="text-right">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <div className="bg-white rounded-2xl p-8 border border-gray-100" style={{ boxShadow: 'var(--shadow-sm)' }}>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="mb-2">Customer Reviews</h3>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-4xl">{product.rating}</span>
                        <div>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= Math.round(product.rating)
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-sm text-muted-foreground">{product.reviews} reviews</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button>Write a Review</Button>
                </div>

                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="pb-6 border-b border-gray-100 last:border-0">
                      <div className="flex items-start gap-4">
                        <Avatar className="w-12 h-12 bg-gradient-to-r from-lime-400 to-teal-400" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <span>{review.name}</span>
                                {review.verified && (
                                  <Badge variant="secondary" className="text-xs">
                                    Verified Purchase
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">{review.date}</p>
                            </div>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-4 h-4 ${
                                    star <= review.rating
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-muted-foreground mb-3">{review.comment}</p>
                          <div className="flex items-center gap-4">
                            <button className="text-sm text-muted-foreground hover:text-foreground">
                              Helpful ({review.helpful})
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Recommended Products */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl mb-2">You May Also Like</h2>
              <p className="text-muted-foreground">Similar products that might interest you</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onAddToCart={() => console.log('Add to cart:', product.id)}
                onClick={() => console.log('View product:', product.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
