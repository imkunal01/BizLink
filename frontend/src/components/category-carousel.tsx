import { Smartphone, Laptop, Headphones, Watch, Camera, Gamepad2 } from "lucide-react";

const categories = [
  { name: "Smartphones", icon: Smartphone, gradient: "from-blue-400 to-blue-600" },
  { name: "Laptops", icon: Laptop, gradient: "from-purple-400 to-purple-600" },
  { name: "Audio", icon: Headphones, gradient: "from-pink-400 to-pink-600" },
  { name: "Wearables", icon: Watch, gradient: "from-green-400 to-green-600" },
  { name: "Cameras", icon: Camera, gradient: "from-orange-400 to-orange-600" },
  { name: "Gaming", icon: Gamepad2, gradient: "from-red-400 to-red-600" },
];

export function CategoryCarousel() {
  return (
    <section className="px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl mb-2">Shop by Category</h2>
          <p className="text-muted-foreground">
            Browse our wide range of electronics
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <button
                key={index}
                className="group relative bg-white rounded-3xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-[var(--shadow-medium)]"
                style={{ boxShadow: "var(--shadow-soft)" }}
              >
                <div className="flex flex-col items-center gap-4">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center transition-transform duration-300 group-hover:rotate-6`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-center">{category.name}</span>
                </div>

                {/* Hover Accent */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-transparent to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
