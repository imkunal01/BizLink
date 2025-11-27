import { ShoppingCart, Heart, User, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export function Navbar() {
  return (
    <nav
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100"
      style={{ boxShadow: "var(--shadow-soft)" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <div className="text-2xl">
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-primary)" }}>
                Kripa Connect
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <a href="#" className="text-sm hover:text-[var(--lime-primary)] transition-colors">
                Home
              </a>
              <a href="#" className="text-sm hover:text-[var(--lime-primary)] transition-colors">
                Products
              </a>
              <a href="#" className="text-sm hover:text-[var(--lime-primary)] transition-colors">
                Categories
              </a>
              <a href="#" className="text-sm hover:text-[var(--lime-primary)] transition-colors">
                Deals
              </a>
              <a href="#" className="text-sm hover:text-[var(--lime-primary)] transition-colors">
                For Retailers
              </a>
            </nav>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Wishlist */}
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full hover:bg-gray-100"
            >
              <Heart className="w-5 h-5" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-[var(--blue-primary)] text-white text-xs">
                3
              </Badge>
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full hover:bg-gray-100"
            >
              <ShoppingCart className="w-5 h-5" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-[var(--lime-primary)] text-black text-xs">
                5
              </Badge>
            </Button>

            {/* User Account */}
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-gray-100"
            >
              <User className="w-5 h-5" />
            </Button>

            {/* Mobile Menu */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden rounded-full hover:bg-gray-100"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
