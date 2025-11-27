import { Search, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function HomeHero() {
  return (
    <section className="relative px-6 py-12 md:py-20 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[var(--lime-primary)] rounded-full blur-[120px] opacity-20 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--blue-primary)] rounded-full blur-[120px] opacity-20 translate-x-1/2 translate-y-1/2" />

      <div className="relative max-w-7xl mx-auto">
        {/* Search Bar */}
        <div className="mb-12 max-w-3xl mx-auto">
          <div
            className="relative flex items-center bg-white rounded-full p-2 pr-3 transition-all duration-300 hover:shadow-[var(--shadow-glow)]"
            style={{ boxShadow: "var(--shadow-medium)" }}
          >
            <Search className="absolute left-6 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search for electronics, gadgets, and more..."
              className="flex-1 pl-14 pr-4 py-3 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button className="rounded-full bg-[var(--lime-primary)] text-black hover:bg-[var(--lime-dark)] px-8">
              Search
            </Button>
          </div>
        </div>

        {/* Hero Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl leading-tight">
                Premium Electronics
                <br />
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: "var(--gradient-primary)",
                  }}
                >
                  Delivered Fast
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Discover the latest tech gadgets with exclusive deals for both
                customers and retailers. Quality products, unbeatable prices.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="rounded-full bg-[var(--lime-primary)] text-black hover:bg-[var(--lime-dark)] px-8 py-6 text-lg"
              >
                Shop Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-2 px-8 py-6 text-lg"
              >
                Become a Retailer
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-4">
              <span className="text-sm text-muted-foreground">Follow us:</span>
              <div className="flex gap-3">
                {[
                  { icon: Facebook, href: "#" },
                  { icon: Instagram, href: "#" },
                  { icon: Twitter, href: "#" },
                  { icon: Linkedin, href: "#" },
                ].map(({ icon: Icon, href }, index) => (
                  <a
                    key={index}
                    href={href}
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-[var(--lime-primary)]"
                    style={{ boxShadow: "var(--shadow-soft)" }}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Featured Product */}
          <div className="relative">
            {/* Decorative Circles */}
            <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full border-2 border-[var(--lime-primary)] opacity-20" />
            <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full border-2 border-[var(--blue-primary)] opacity-20" />
            
            {/* Accent Bubbles */}
            <div className="absolute top-1/4 -left-8 w-16 h-16 rounded-full bg-[var(--lime-primary)] blur-xl opacity-50" />
            <div className="absolute bottom-1/4 -right-8 w-20 h-20 rounded-full bg-[var(--blue-primary)] blur-xl opacity-50" />

            {/* Product Card */}
            <div
              className="relative bg-white rounded-[3rem] p-8 backdrop-blur-sm"
              style={{ boxShadow: "var(--shadow-large)" }}
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 mb-6">
                <img
                  src="https://images.unsplash.com/photo-1738920424218-3d28b951740a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwd2lyZWxlc3MlMjBoZWFkcGhvbmVzfGVufDF8fHx8MTc2Mzk3NTc0N3ww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Featured Product"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl mb-2">Premium Wireless Headphones</h3>
                  <p className="text-muted-foreground">
                    Experience crystal-clear audio with active noise cancellation
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-3xl">$299.99</span>
                  <Button
                    className="rounded-full bg-[var(--lime-primary)] text-black hover:bg-[var(--lime-dark)]"
                    size="lg"
                  >
                    Buy Now
                  </Button>
                </div>
              </div>

              {/* Color Selector */}
              <div className="absolute -right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3">
                {["#000000", "#ffffff", "#c2fb5b", "#5b9cfb"].map((color, index) => (
                  <button
                    key={index}
                    className="w-12 h-12 rounded-full border-4 border-white transition-all duration-300 hover:scale-110"
                    style={{
                      backgroundColor: color,
                      boxShadow: "var(--shadow-medium)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
