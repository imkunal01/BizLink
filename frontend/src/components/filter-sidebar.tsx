import { useState } from "react";
import { Slider } from "./ui/slider";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { X } from "lucide-react";

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface FilterSidebarProps {
  categories?: FilterOption[];
  brands?: FilterOption[];
  onClose?: () => void;
  isMobile?: boolean;
}

export function FilterSidebar({
  categories = [],
  brands = [],
  onClose,
  isMobile = false,
}: FilterSidebarProps) {
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);

  const toggleCategory = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const toggleBrand = (id: string) => {
    setSelectedBrands((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const clearFilters = () => {
    setPriceRange([0, 5000]);
    setSelectedCategories([]);
    setSelectedBrands([]);
    setInStockOnly(false);
  };

  return (
    <div
      className={`bg-white rounded-3xl p-6 space-y-8 ${
        isMobile ? "h-full" : ""
      }`}
      style={{ boxShadow: "var(--shadow-soft)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3>Filters</h3>
        {isMobile && onClose && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        )}
      </div>

      {/* Price Range */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Price Range</Label>
          <span className="text-sm text-muted-foreground">
            ${priceRange[0]} - ${priceRange[1]}
          </span>
        </div>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={5000}
          step={50}
          className="w-full"
        />
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div className="space-y-3">
          <Label>Categories</Label>
          <div className="space-y-3">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center gap-3">
                <Checkbox
                  id={category.id}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={() => toggleCategory(category.id)}
                />
                <label
                  htmlFor={category.id}
                  className="flex-1 cursor-pointer text-sm"
                >
                  {category.label}
                  {category.count !== undefined && (
                    <span className="text-muted-foreground ml-2">
                      ({category.count})
                    </span>
                  )}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Brands */}
      {brands.length > 0 && (
        <div className="space-y-3">
          <Label>Brands</Label>
          <div className="space-y-3">
            {brands.map((brand) => (
              <div key={brand.id} className="flex items-center gap-3">
                <Checkbox
                  id={brand.id}
                  checked={selectedBrands.includes(brand.id)}
                  onCheckedChange={() => toggleBrand(brand.id)}
                />
                <label
                  htmlFor={brand.id}
                  className="flex-1 cursor-pointer text-sm"
                >
                  {brand.label}
                  {brand.count !== undefined && (
                    <span className="text-muted-foreground ml-2">
                      ({brand.count})
                    </span>
                  )}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Availability */}
      <div className="space-y-3">
        <Label>Availability</Label>
        <div className="flex items-center gap-3">
          <Checkbox
            id="in-stock"
            checked={inStockOnly}
            onCheckedChange={(checked) => setInStockOnly(checked as boolean)}
          />
          <label htmlFor="in-stock" className="cursor-pointer text-sm">
            In Stock Only
          </label>
        </div>
      </div>

      {/* Clear Filters */}
      <Button
        variant="outline"
        className="w-full rounded-xl"
        onClick={clearFilters}
      >
        Clear All Filters
      </Button>
    </div>
  );
}
