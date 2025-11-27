import { useState } from "react";
import { Navbar } from "./navbar";
import { FilterSidebar } from "./filter-sidebar";
import { ProductCard } from "./product-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { SlidersHorizontal, Grid3x3, LayoutGrid } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const categories = [
  { id: "smartphones", label: "Smartphones", count: 156 },
  { id: "laptops", label: "Laptops", count: 89 },
  { id: "audio", label: "Audio", count: 234 },
  { id: "wearables", label: "Wearables", count: 112 },
  { id: "cameras", label: "Cameras", count: 67 },
  { id: "gaming", label: "Gaming", count: 145 },
];

const brands = [
  { id: "apple", label: "Apple", count: 78 },
  { id: "samsung", label: "Samsung", count: 92 },
  { id: "sony", label: "Sony", count: 64 },
  { id: "dell", label: "Dell", count: 43 },
  { id: "hp", label: "HP", count: 51 },
  { id: "lg", label: "LG", count: 39 },
];

const products = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 299.99,
    retailerPrice: 249.99,
    image: "https://images.unsplash.com/photo-1738920424218-3d28b951740a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwd2lyZWxlc3MlMjBoZWFkcGhvbmVzfGVufDF8fHx8MTc2Mzk3NTc0N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.8,
    reviews: 234,
    isNew: true,
    inStock: true,
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
    inStock: true,
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
    inStock: true,
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
    inStock: true,
  },
  {
    id: "5",
    name: "Gaming Console Pro",
    price: 499.99,
    retailerPrice: 449.99,
    image: "https://images.unsplash.com/photo-1604846887565-640d2f52d564?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb25zb2xlfGVufDF8fHx8MTc2NDA1NzI0Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.9,
    reviews: 892,
    discount: 20,
    inStock: true,
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
    inStock: true,
  },
  {
    id: "7",
    name: "Wireless Earbuds Pro",
    price: 199.99,
    retailerPrice: 169.99,
    image: "https://images.unsplash.com/photo-1738920424218-3d28b951740a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwd2lyZWxlc3MlMjBoZWFkcGhvbmVzfGVufDF8fHx8MTc2Mzk3NTc0N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.5,
    reviews: 456,
    inStock: false,
  },
  {
    id: "8",
    name: "Tablet Pro 12.9",
    price: 899.99,
    retailerPrice: 799.99,
    image: "https://images.unsplash.com/photo-1511385348-a52b4a160dc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlcnxlbnwxfHx8fDE3NjQwMTc5ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.7,
    reviews: 321,
    discount: 12,
    inStock: true,
  },
];

export function ProductListingPage() {
  const [gridView, setGridView] = useState<"3" | "4">("4");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <a href="#" className="hover:text-foreground">Home</a>
            <span>/</span>
            <span>Products</span>
          </div>
          <h1 className="text-4xl mb-2">All Products</h1>
          <p className="text-muted-foreground">
            Showing 1,234 products
          </p>
        </div>

        {/* Filters and Controls Bar */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Mobile Filter Trigger */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden rounded-xl">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0">
                <div className="p-6">
                  <FilterSidebar
                    categories={categories}
                    brands={brands}
                    isMobile={true}
                  />
                </div>
              </SheetContent>
            </Sheet>

            {/* View Toggle */}
            <div
              className="hidden sm:flex items-center gap-1 bg-white rounded-xl p-1"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <Button
                variant={gridView === "3" ? "default" : "ghost"}
                size="icon"
                className="rounded-lg"
                onClick={() => setGridView("3")}
              >
                <Grid3x3 className="w-4 h-4" />
              </Button>
              <Button
                variant={gridView === "4" ? "default" : "ghost"}
                size="icon"
                className="rounded-lg"
                onClick={() => setGridView("4")}
              >
                <LayoutGrid className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <Select defaultValue="featured">
              <SelectTrigger className="w-48 rounded-xl bg-white" style={{ boxShadow: "var(--shadow-soft)" }}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-[300px_1fr] gap-6">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block">
            <FilterSidebar categories={categories} brands={brands} />
          </aside>

          {/* Products Grid */}
          <div>
            <div
              className={`grid ${
                gridView === "3"
                  ? "sm:grid-cols-2 xl:grid-cols-3"
                  : "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              } gap-6`}
            >
              {products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex items-center justify-center gap-2">
              <Button variant="outline" className="rounded-xl">
                Previous
              </Button>
              {[1, 2, 3, 4, 5].map((page) => (
                <Button
                  key={page}
                  variant={page === 1 ? "default" : "outline"}
                  className="rounded-xl w-10 h-10"
                >
                  {page}
                </Button>
              ))}
              <Button variant="outline" className="rounded-xl">
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
