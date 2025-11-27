import React from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating?: number;
  reviews?: number;
  badge?: string;
  inWishlist?: boolean;
  onAddToCart?: () => void;
  onToggleWishlist?: () => void;
  onClick?: () => void;
}

export function ProductCard({
  name,
  price,
  originalPrice,
  image,
  rating = 4.5,
  reviews = 0,
  badge,
  inWishlist = false,
  onAddToCart,
  onToggleWishlist,
  onClick,
}: ProductCardProps) {
  return (
    <div 
      className="group relative bg-white rounded-2xl overflow-hidden hover-lift cursor-pointer border border-gray-100"
      style={{ boxShadow: 'var(--shadow-md)' }}
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Badge */}
        {badge && (
          <Badge className="absolute top-3 left-3 bg-lime-400 text-black border-0">
            {badge}
          </Badge>
        )}
        
        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist?.();
          }}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
            inWishlist
              ? 'bg-red-500 text-white'
              : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-red-500 hover:text-white'
          }`}
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
        </button>
        
        {/* Quick Add to Cart */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            size="sm"
            className="w-full bg-white text-black hover:bg-lime-400 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart?.();
            }}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-4 space-y-2">
        <h3 className="text-sm line-clamp-2 min-h-[2.5rem]">
          {name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm">{rating}</span>
          </div>
          {reviews > 0 && (
            <span className="text-xs text-muted-foreground">({reviews})</span>
          )}
        </div>
        
        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-lg text-black">₹{price.toLocaleString()}</span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ₹{originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
