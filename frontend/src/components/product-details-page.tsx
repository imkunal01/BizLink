import { useState } from "react";
import { Navbar } from "./navbar";
import { ProductCard } from "./product-card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Heart,
  Share2,
  Star,
  Truck,
  Shield,
  RotateCcw,
  Plus,
  Minus,
} from "lucide-react";

const productImages = [
  "https://images.unsplash.com/photo-1738920424218-3d28b951740a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwd2lyZWxlc3MlMjBoZWFkcGhvbmVzfGVufDF8fHx8MTc2Mzk3NTc0N3ww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1738920424218-3d28b951740a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwd2lyZWxlc3MlMjBoZWFkcGhvbmVzfGVufDF8fHx8MTc2Mzk3NTc0N3ww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1738920424218-3d28b951740a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwd2lyZWxlc3MlMjBoZWFkcGhvbmVzfGVufDF8fHx8MTc2Mzk3NTc0N3ww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1738920424218-3d28b951740a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwd2lyZWxlc3MlMjBoZWFkcGhvbmVzfGVufDF8fHx8MTc2Mzk3NTc0N3ww&ixlib=rb-4.1.0&q=80&w=1080",
];

const colors = [
  { name: "Black", hex: "#000000" },
  { name: "White", hex: "#ffffff" },
  { name: "Blue", hex: "#5b9cfb" },
  { name: "Green", hex: "#c2fb5b" },
];

const reviews = [
  {
    id: 1,
    author: "John Doe",
    rating: 5,
    date: "2 days ago",
    comment:
      "Excellent product! The sound quality is amazing and the noise cancellation works perfectly. Highly recommended!",
    verified: true,
  },
  {
    id: 2,
    author: "Jane Smith",
    rating: 4,
    date: "1 week ago",
    comment:
      "Great headphones overall. The battery life is impressive. Only minor issue is they can feel a bit tight after long use.",
    verified: true,
  },
  {
    id: 3,
    author: "Mike Johnson",
    rating: 5,
    date: "2 weeks ago",
    comment:
      "Best purchase I've made this year. Worth every penny. The build quality is premium and they're super comfortable.",
    verified: false,
  },
];

const recommendedProducts = [
  {
    id: "rec1",
    name: "Wireless Earbuds Pro",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1761907174062-c8baf8b7edb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwbW9kZXJufGVufDF8fHx8MTc2Mzk3OTU4NHww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.6,
    reviews: 324,
  },
  {
    id: "rec2",
    name: "Premium Audio Cable",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1511385348-a52b4a160dc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlcnxlbnwxfHx8fDE3NjQwMTc5ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.3,
    reviews: 156,
  },
  {
    id: "rec3",
    name: "Headphone Stand",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1739287700815-7eef4abaab4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHdhdGNoJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjM5OTk4NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.7,
    reviews: 89,
  },
  {
    id: "rec4",
    name: "Carrying Case Premium",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1604846887565-640d2f52d564?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb25zb2xlfGVufDF8fHx8MTc2NDA1NzI0Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.5,
    reviews: 234,
  },
];

export function ProductDetailsPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <a href="#" className="hover:text-foreground">Home</a>
          <span>/</span>
          <a href="#" className="hover:text-foreground">Audio</a>
          <span>/</span>
          <span>Premium Wireless Headphones</span>
        </div>

        {/* Product Main Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div
              className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 group"
              style={{ boxShadow: "var(--shadow-medium)" }}
            >
              <img
                src={productImages[selectedImage]}
                alt="Product"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Badges */}
              <div className="absolute top-6 left-6 flex gap-2">
                <Badge className="bg-[var(--lime-primary)] text-black hover:bg-[var(--lime-dark)] rounded-full px-4 py-2">
                  New Arrival
                </Badge>
                <Badge className="bg-[var(--blue-primary)] text-white hover:bg-[var(--blue-primary)] rounded-full px-4 py-2">
                  -15% OFF
                </Badge>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 transition-all duration-300 ${
                    selectedImage === index
                      ? "ring-4 ring-[var(--lime-primary)] scale-105"
                      : "hover:scale-105"
                  }`}
                  style={{ boxShadow: "var(--shadow-soft)" }}
                >
                  <img
                    src={image}
                    alt={`Product view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl mb-3">Premium Wireless Headphones</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < 4
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span>4.8</span>
                </div>
                <span className="text-muted-foreground">(234 reviews)</span>
                <Badge variant="outline" className="rounded-full">
                  In Stock
                </Badge>
              </div>
              <p className="text-muted-foreground text-lg">
                Experience premium audio quality with active noise cancellation,
                40-hour battery life, and ultra-comfortable design. Perfect for
                music lovers and professionals.
              </p>
            </div>

            {/* Price */}
            <div
              className="p-6 rounded-3xl bg-gradient-to-br from-white to-gray-50"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-5xl">$299.99</span>
                <span className="text-2xl text-muted-foreground line-through">
                  $349.99
                </span>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                  Save $50
                </Badge>
              </div>
              <div className="text-sm text-[var(--blue-primary)] bg-blue-50 rounded-lg px-4 py-2 inline-block">
                Wholesale Price: $249.99 (for retailers)
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <label className="block mb-3">Color:</label>
              <div className="flex gap-3">
                {colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(index)}
                    className={`w-14 h-14 rounded-full border-4 transition-all duration-300 hover:scale-110 ${
                      selectedColor === index
                        ? "border-[var(--lime-primary)] scale-110"
                        : "border-gray-200"
                    }`}
                    style={{
                      backgroundColor: color.hex,
                      boxShadow: "var(--shadow-soft)",
                    }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block mb-3">Quantity:</label>
              <div
                className="inline-flex items-center gap-4 bg-white rounded-2xl p-2"
                style={{ boxShadow: "var(--shadow-soft)" }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="rounded-xl"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-12 text-center text-xl">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  className="rounded-xl"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                size="lg"
                className="flex-1 rounded-2xl bg-[var(--lime-primary)] text-black hover:bg-[var(--lime-dark)] py-6"
              >
                Add to Cart
              </Button>
              <Button
                size="lg"
                className="flex-1 rounded-2xl bg-gray-900 text-white hover:bg-gray-800 py-6"
              >
                Buy Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-2xl px-6"
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <Heart
                  className={`w-5 h-5 ${
                    isWishlisted ? "fill-red-500 text-red-500" : ""
                  }`}
                />
              </Button>
              <Button size="lg" variant="outline" className="rounded-2xl px-6">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Truck, text: "Free Shipping" },
                { icon: Shield, text: "2 Year Warranty" },
                { icon: RotateCcw, text: "30 Day Returns" },
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white"
                    style={{ boxShadow: "var(--shadow-soft)" }}
                  >
                    <Icon className="w-6 h-6 text-[var(--blue-primary)]" />
                    <span className="text-sm text-center">{feature.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div
          className="mb-16 bg-white rounded-3xl p-8"
          style={{ boxShadow: "var(--shadow-soft)" }}
        >
          <Tabs defaultValue="specs" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
              <TabsTrigger
                value="specs"
                className="rounded-none border-b-2 data-[state=active]:border-[var(--lime-primary)] data-[state=active]:bg-transparent px-6 py-4"
              >
                Specifications
              </TabsTrigger>
              <TabsTrigger
                value="description"
                className="rounded-none border-b-2 data-[state=active]:border-[var(--lime-primary)] data-[state=active]:bg-transparent px-6 py-4"
              >
                Description
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="rounded-none border-b-2 data-[state=active]:border-[var(--lime-primary)] data-[state=active]:bg-transparent px-6 py-4"
              >
                Reviews (234)
              </TabsTrigger>
            </TabsList>

            <TabsContent value="specs" className="pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { label: "Brand", value: "Premium Audio Co." },
                  { label: "Model", value: "PA-WH2024" },
                  { label: "Connectivity", value: "Bluetooth 5.3, 3.5mm jack" },
                  { label: "Battery Life", value: "40 hours" },
                  { label: "Charging Time", value: "2 hours (USB-C)" },
                  { label: "Weight", value: "250g" },
                  { label: "Driver Size", value: "40mm" },
                  { label: "Frequency Response", value: "20Hz - 20kHz" },
                  { label: "Noise Cancellation", value: "Active (ANC)" },
                  { label: "Warranty", value: "2 years" },
                ].map((spec, index) => (
                  <div
                    key={index}
                    className="flex justify-between py-3 border-b"
                  >
                    <span className="text-muted-foreground">{spec.label}</span>
                    <span>{spec.value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="description" className="pt-6">
              <div className="prose max-w-none">
                <p className="text-lg mb-4">
                  The Premium Wireless Headphones deliver an exceptional audio
                  experience with cutting-edge technology and premium materials.
                  Designed for audiophiles and professionals, these headphones
                  combine superior sound quality with all-day comfort.
                </p>
                <h3 className="mb-3">Key Features:</h3>
                <ul className="space-y-2 mb-6">
                  <li>
                    Active Noise Cancellation (ANC) blocks out unwanted ambient
                    noise
                  </li>
                  <li>
                    40mm custom-tuned drivers deliver rich, detailed sound
                  </li>
                  <li>Ultra-soft memory foam ear cushions for extended comfort</li>
                  <li>
                    40-hour battery life with quick charge (10 min = 5 hours)
                  </li>
                  <li>Multipoint connectivity - connect to two devices at once</li>
                  <li>Premium aluminum and leather construction</li>
                  <li>Voice assistant compatible (Siri, Google Assistant)</li>
                </ul>
                <p>
                  Whether you're commuting, working, or relaxing at home, these
                  headphones provide the perfect soundtrack to your day.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="pt-6">
              <div className="space-y-6">
                {/* Rating Summary */}
                <div
                  className="p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white"
                  style={{ boxShadow: "var(--shadow-soft)" }}
                >
                  <div className="flex items-start gap-8">
                    <div className="text-center">
                      <div className="text-6xl mb-2">4.8</div>
                      <div className="flex mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < 5
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        234 reviews
                      </p>
                    </div>
                    <div className="flex-1 space-y-2">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center gap-3">
                          <span className="text-sm w-12">{rating} stars</span>
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[var(--lime-primary)]"
                              style={{
                                width: `${rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 5 : rating === 2 ? 3 : 2}%`,
                              }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground w-12">
                            {rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 5 : rating === 2 ? 3 : 2}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Individual Reviews */}
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="p-6 rounded-2xl bg-white"
                      style={{ boxShadow: "var(--shadow-soft)" }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span>{review.author}</span>
                            {review.verified && (
                              <Badge
                                variant="outline"
                                className="text-xs rounded-full"
                              >
                                Verified Purchase
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {review.date}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full rounded-2xl py-6">
                  Load More Reviews
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Recommended Products */}
        <section>
          <div className="mb-8">
            <h2 className="text-3xl mb-2">You May Also Like</h2>
            <p className="text-muted-foreground">
              Complete your audio setup with these products
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
