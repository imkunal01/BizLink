import { useState } from "react";
import { Navbar } from "./navbar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Checkbox } from "./ui/checkbox";
import { Check, MapPin, CreditCard, Package, ChevronRight } from "lucide-react";

type CheckoutStep = "shipping" | "payment" | "review" | "confirmation";

export function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("shipping");
  const [saveAddress, setSaveAddress] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const steps = [
    { id: "shipping", label: "Shipping", icon: MapPin },
    { id: "payment", label: "Payment", icon: CreditCard },
    { id: "review", label: "Review", icon: Package },
  ];

  const cartItems = [
    {
      id: "1",
      name: "Premium Wireless Headphones",
      price: 299.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1738920424218-3d28b951740a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwd2lyZWxlc3MlMjBoZWFkcGhvbmVzfGVufDF8fHx8MTc2Mzk3NTc0N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: "2",
      name: "Modern Smartphone Pro Max",
      price: 1099.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1761907174062-c8baf8b7edb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwbW9kZXJufGVufDF8fHx8MTc2Mzk3OTU4NHww&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const getCurrentStepIndex = () => {
    return steps.findIndex((step) => step.id === currentStep);
  };

  if (currentStep === "confirmation") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <Navbar />
        <div className="max-w-2xl mx-auto px-6 py-16 text-center">
          <div
            className="bg-white rounded-3xl p-12"
            style={{ boxShadow: "var(--shadow-large)" }}
          >
            {/* Success Animation */}
            <div
              className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[var(--lime-primary)] to-[var(--lime-dark)] flex items-center justify-center"
              style={{ boxShadow: "var(--shadow-glow)" }}
            >
              <Check className="w-12 h-12 text-black" />
            </div>

            <h1 className="text-4xl mb-4">Order Confirmed!</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Thank you for your purchase
            </p>

            <div
              className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Order Number</span>
                <span className="font-mono">#KC-2024-001234</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Order Date</span>
                <span>November 25, 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Amount</span>
                <span className="text-2xl">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-3 mb-8">
              <p className="text-muted-foreground">
                We've sent a confirmation email to <strong>john@example.com</strong>
              </p>
              <p className="text-muted-foreground">
                Your order will be delivered within 2-3 business days
              </p>
            </div>

            <div className="flex gap-4">
              <Button
                size="lg"
                className="flex-1 rounded-2xl py-6 bg-[var(--lime-primary)] text-black hover:bg-[var(--lime-dark)]"
              >
                Track Order
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="flex-1 rounded-2xl py-6"
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <a href="#" className="hover:text-foreground">Home</a>
          <span>/</span>
          <a href="#" className="hover:text-foreground">Cart</a>
          <span>/</span>
          <span>Checkout</span>
        </div>

        {/* Progress Stepper */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-4">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = index <= getCurrentStepIndex();
              const isCurrent = step.id === currentStep;

              return (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? "bg-[var(--lime-primary)] text-black shadow-[var(--shadow-glow)]"
                          : "bg-white text-gray-400"
                      } ${isCurrent ? "scale-110" : ""}`}
                      style={!isActive ? { boxShadow: "var(--shadow-soft)" } : {}}
                    >
                      <StepIcon className="w-6 h-6" />
                    </div>
                    <span
                      className={`text-sm ${
                        isActive ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <ChevronRight
                      className={`w-6 h-6 mx-4 ${
                        isActive ? "text-foreground" : "text-gray-300"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-[1fr_400px] gap-8">
          {/* Form Section */}
          <div>
            {/* Shipping Information */}
            {currentStep === "shipping" && (
              <div
                className="bg-white rounded-3xl p-8"
                style={{ boxShadow: "var(--shadow-soft)" }}
              >
                <h2 className="text-2xl mb-6">Shipping Information</h2>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        className="rounded-xl bg-gray-50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        className="rounded-xl bg-gray-50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      className="rounded-xl bg-gray-50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="rounded-xl bg-gray-50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address</Label>
                    <Input
                      id="address"
                      placeholder="123 Main Street"
                      className="rounded-xl bg-gray-50"
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        placeholder="New York"
                        className="rounded-xl bg-gray-50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        placeholder="NY"
                        className="rounded-xl bg-gray-50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input
                        id="zip"
                        placeholder="10001"
                        className="rounded-xl bg-gray-50"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="save-address"
                      checked={saveAddress}
                      onCheckedChange={(checked) =>
                        setSaveAddress(checked as boolean)
                      }
                    />
                    <label htmlFor="save-address" className="text-sm cursor-pointer">
                      Save this address for future orders
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Method */}
            {currentStep === "payment" && (
              <div
                className="bg-white rounded-3xl p-8"
                style={{ boxShadow: "var(--shadow-soft)" }}
              >
                <h2 className="text-2xl mb-6">Payment Method</h2>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="space-y-4">
                    {/* Cash on Delivery */}
                    <label
                      className={`flex items-start gap-4 p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                        paymentMethod === "cod"
                          ? "border-[var(--lime-primary)] bg-[var(--lime-primary)]/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <RadioGroupItem value="cod" id="cod" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span>💵</span>
                          <span>Cash on Delivery</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Pay when you receive your order
                        </p>
                      </div>
                    </label>

                    {/* Online Payment (Placeholder) */}
                    <label
                      className={`flex items-start gap-4 p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                        paymentMethod === "online"
                          ? "border-[var(--lime-primary)] bg-[var(--lime-primary)]/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <RadioGroupItem value="online" id="online" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span>💳</span>
                          <span>Online Payment</span>
                          <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full">
                            Coming Soon
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Pay securely online with card or UPI
                        </p>
                      </div>
                    </label>
                  </div>
                </RadioGroup>

                {paymentMethod === "online" && (
                  <div className="mt-6 p-4 rounded-2xl bg-blue-50 border border-blue-200">
                    <p className="text-sm text-blue-700">
                      Online payment integration coming soon. Please use Cash on
                      Delivery for now.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Review Order */}
            {currentStep === "review" && (
              <div
                className="bg-white rounded-3xl p-8"
                style={{ boxShadow: "var(--shadow-soft)" }}
              >
                <h2 className="text-2xl mb-6">Review Your Order</h2>

                {/* Shipping Address */}
                <div className="mb-6 p-6 rounded-2xl bg-gray-50">
                  <h3 className="mb-3">Shipping Address</h3>
                  <p className="text-sm">
                    John Doe<br />
                    123 Main Street<br />
                    New York, NY 10001<br />
                    +1 (555) 000-0000
                  </p>
                  <Button variant="link" className="p-0 h-auto text-[var(--blue-primary)] mt-2">
                    Edit
                  </Button>
                </div>

                {/* Payment Method */}
                <div className="mb-6 p-6 rounded-2xl bg-gray-50">
                  <h3 className="mb-3">Payment Method</h3>
                  <p className="text-sm">Cash on Delivery</p>
                  <Button variant="link" className="p-0 h-auto text-[var(--blue-primary)] mt-2">
                    Edit
                  </Button>
                </div>

                {/* Order Items */}
                <div>
                  <h3 className="mb-4">Order Items</h3>
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="w-20 h-20 rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm mb-1">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <span className="text-sm">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-6">
              {currentStep !== "shipping" && (
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1 rounded-2xl py-6"
                  onClick={() => {
                    const currentIndex = getCurrentStepIndex();
                    if (currentIndex > 0) {
                      setCurrentStep(steps[currentIndex - 1].id as CheckoutStep);
                    }
                  }}
                >
                  Back
                </Button>
              )}
              <Button
                size="lg"
                className="flex-1 rounded-2xl py-6 bg-[var(--lime-primary)] text-black hover:bg-[var(--lime-dark)]"
                onClick={() => {
                  if (currentStep === "review") {
                    setCurrentStep("confirmation");
                  } else {
                    const currentIndex = getCurrentStepIndex();
                    if (currentIndex < steps.length - 1) {
                      setCurrentStep(steps[currentIndex + 1].id as CheckoutStep);
                    }
                  }
                }}
              >
                {currentStep === "review" ? "Place Order" : "Continue"}
              </Button>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <div
              className="bg-white rounded-3xl p-6 sticky top-24"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <h3 className="mb-6">Order Summary</h3>

              {/* Cart Items Preview */}
              <div className="space-y-4 mb-6 pb-6 border-b">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm line-clamp-1 mb-1">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="text-sm">${item.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6 pb-6 border-b">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between text-xl mb-6">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              {/* Security Badge */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-green-50 to-teal-50">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm">Secure Checkout</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Your payment information is encrypted and secure
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
