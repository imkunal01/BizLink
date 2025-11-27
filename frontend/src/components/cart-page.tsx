import { useState } from "react";
import { Navbar } from "./navbar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Trash2, Plus, Minus, Tag, ArrowRight } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  color?: string;
  inStock: boolean;
}

export function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Premium Wireless Headphones",
      price: 299.99,
      image: "https://images.unsplash.com/photo-1738920424218-3d28b951740a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwd2lyZWxlc3MlMjBoZWFkcGhvbmVzfGVufDF8fHx8MTc2Mzk3NTc0N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      quantity: 1,
      color: "Black",
      inStock: true,
    },
    {
      id: "2",
      name: "Modern Smartphone Pro Max",
      price: 1099.99,
      image: "https://images.unsplash.com/photo-1761907174062-c8baf8b7edb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwbW9kZXJufGVufDF8fHx8MTc2Mzk3OTU4NHww&ixlib=rb-4.1.0&q=80&w=1080",
      quantity: 1,
      color: "Blue",
      inStock: true,
    },
    {
      id: "3",
      name: "Smart Watch Series X",
      price: 399.99,
      image: "https://images.unsplash.com/photo-1739287700815-7eef4abaab4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHdhdGNoJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjM5OTk4NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      quantity: 2,
      inStock: true,
    },
  ]);

  const [couponCode, setCouponCode] = useState("");

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 500 ? 0 : 25;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <a href="#" className="hover:text-foreground">
              Home
            </a>
            <span>/</span>
            <span>Shopping Cart</span>
          </div>
          <h1 className="text-4xl mb-2">Shopping Cart</h1>
          <p className="text-muted-foreground">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in
            your cart
          </p>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart State */
          <div
            className="text-center py-20 bg-white rounded-3xl"
            style={{ boxShadow: "var(--shadow-soft)" }}
          >
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <span className="text-6xl">🛒</span>
            </div>
            <h2 className="text-2xl mb-3">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Add some products to get started
            </p>
            <Button
              size="lg"
              className="rounded-2xl bg-[var(--lime-primary)] text-black hover:bg-[var(--lime-dark)]"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_400px] gap-8">
            {/* Cart Items */}
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl p-6 flex gap-6 transition-all duration-300 hover:shadow-[var(--shadow-medium)]"
                  style={{ boxShadow: "var(--shadow-soft)" }}
                >
                  {/* Product Image */}
                  <div className="w-32 h-32 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="mb-2">{item.name}</h3>
                      {item.color && (
                        <p className="text-sm text-muted-foreground mb-2">
                          Color: {item.color}
                        </p>
                      )}
                      {!item.inStock && (
                        <p className="text-sm text-red-500">Out of Stock</p>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Quantity Controls */}
                      <div
                        className="inline-flex items-center gap-3 bg-gray-50 rounded-2xl p-2"
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-xl"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-xl"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-4">
                        <span className="text-2xl">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-xl text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Continue Shopping Button */}
              <Button
                variant="outline"
                className="w-full rounded-2xl py-6"
              >
                Continue Shopping
              </Button>
            </div>

            {/* Order Summary */}
            <div>
              <div
                className="bg-white rounded-3xl p-6 sticky top-24"
                style={{ boxShadow: "var(--shadow-soft)" }}
              >
                <h2 className="text-2xl mb-6">Order Summary</h2>

                {/* Coupon Code */}
                <div className="mb-6">
                  <label className="block mb-2 text-sm">
                    Have a coupon code?
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="Enter code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="pl-10 rounded-xl bg-gray-50"
                      />
                    </div>
                    <Button
                      variant="outline"
                      className="rounded-xl px-6"
                    >
                      Apply
                    </Button>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-4 mb-6 pb-6 border-b">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between mb-6 text-xl">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                {/* Free Shipping Banner */}
                {shipping > 0 && (
                  <div className="mb-6 p-4 rounded-2xl bg-blue-50 border border-blue-200">
                    <p className="text-sm text-blue-700">
                      Add ${(500 - subtotal).toFixed(2)} more to get{" "}
                      <span className="font-medium">FREE SHIPPING</span>
                    </p>
                    <div className="mt-2 h-2 bg-blue-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 transition-all duration-300"
                        style={{ width: `${(subtotal / 500) * 100}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Checkout Button */}
                <Button
                  size="lg"
                  className="w-full rounded-2xl py-6 bg-[var(--lime-primary)] text-black hover:bg-[var(--lime-dark)] group"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>

                {/* Delivery Info */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-start gap-3 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                      ✓
                    </div>
                    <div>
                      <p className="font-medium">Fast Delivery</p>
                      <p className="text-muted-foreground">
                        Ships within 24-48 hours
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                      🔒
                    </div>
                    <div>
                      <p className="font-medium">Secure Payment</p>
                      <p className="text-muted-foreground">
                        Your data is protected
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                      ↩️
                    </div>
                    <div>
                      <p className="font-medium">Easy Returns</p>
                      <p className="text-muted-foreground">
                        30-day return policy
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
