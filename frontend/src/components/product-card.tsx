import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useState } from "react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  retailerPrice?: number;
  image: string;
  rating?: number;
  reviews?: number;
  inStock?: boolean;
  discount?: number;
  isNew?: boolean;
}

export function ProductCard({
  name,
  price,
  retailerPrice,
  image,
  rating = 4.5,
  reviews = 0,
  inStock = true,
  discount,
  isNew,
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative bg-white rounded-3xl p-4 transition-all duration-300 hover:shadow-[var(--shadow-medium)] cursor-pointer"
      style={{ boxShadow: "var(--shadow-soft)" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges */}
      <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
        {isNew && (
          <Badge className="bg-[var(--lime-primary)] text-black hover:bg-[var(--lime-dark)] rounded-full px-3 py-1">
            New
          </Badge>
        )}
        {discount && (
          <Badge className="bg-[var(--blue-primary)] text-white hover:bg-[var(--blue-primary)] rounded-full px-3 py-1">
            -{discount}%
          </Badge>
        )}
        {!inStock && (
          <Badge variant="destructive" className="rounded-full px-3 py-1">
            Out of Stock
          </Badge>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={() => setIsWishlisted(!isWishlisted)}
        className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110"
        style={{ boxShadow: "var(--shadow-soft)" }}
      >
        <Heart
          className={`w-5 h-5 transition-colors ${
            isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"
          }`}
        />
      </button>

      {/* Product Image */}
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 mb-4">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <h3 className="line-clamp-2 min-h-[3rem]">{name}</h3>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm">{rating}</span>
          </div>
          {reviews > 0 && (
            <span className="text-sm text-muted-foreground">({reviews})</span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-2xl">${price.toFixed(2)}</span>
          {discount && (
            <span className="text-sm text-muted-foreground line-through">
              ${(price / (1 - discount / 100)).toFixed(2)}
            </span>
          )}
        </div>

        {retailerPrice && (
          <div className="text-sm text-[var(--blue-primary)] bg-blue-50 rounded-lg px-3 py-1 inline-block">
            Wholesale: ${retailerPrice.toFixed(2)}
          </div>
        )}

        {/* Add to Cart Button */}
        <Button
          className={`w-full rounded-xl transition-all duration-300 ${
            isHovered
              ? "bg-[var(--lime-primary)] text-black hover:bg-[var(--lime-dark)]"
              : "bg-gray-900 text-white hover:bg-gray-800"
          }`}
          disabled={!inStock}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </div>
    </div>
  );
}
