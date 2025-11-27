import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Checkbox } from "./ui/checkbox";
import { User, Store, Mail, Lock, Eye, EyeOff } from "lucide-react";

export function AuthPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<"customer" | "retailer">("customer");

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[var(--lime-primary)] rounded-full blur-[150px] opacity-20 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--blue-primary)] rounded-full blur-[150px] opacity-20 translate-x-1/2 translate-y-1/2" />
      <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-[var(--teal-primary)] rounded-full blur-[120px] opacity-10" />

      {/* Auth Card */}
      <div
        className="relative w-full max-w-md bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-10"
        style={{ boxShadow: "var(--shadow-large)" }}
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl mb-2">
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "var(--gradient-primary)" }}
            >
              Kripa Connect
            </span>
          </h1>
          <p className="text-muted-foreground">
            Welcome back! Please login to your account
          </p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-100 rounded-2xl p-1">
            <TabsTrigger value="login" className="rounded-xl">
              Login
            </TabsTrigger>
            <TabsTrigger value="register" className="rounded-xl">
              Register
            </TabsTrigger>
          </TabsList>

          {/* Login Tab */}
          <TabsContent value="login" className="space-y-6">
            {/* User Type Selection */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                onClick={() => setUserType("customer")}
                className={`flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all duration-300 ${
                  userType === "customer"
                    ? "border-[var(--lime-primary)] bg-[var(--lime-primary)]/10"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <User
                  className={`w-8 h-8 ${
                    userType === "customer"
                      ? "text-[var(--lime-primary)]"
                      : "text-gray-400"
                  }`}
                />
                <span className="text-sm">Customer</span>
              </button>
              <button
                onClick={() => setUserType("retailer")}
                className={`flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all duration-300 ${
                  userType === "retailer"
                    ? "border-[var(--blue-primary)] bg-[var(--blue-primary)]/10"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Store
                  className={`w-8 h-8 ${
                    userType === "retailer"
                      ? "text-[var(--blue-primary)]"
                      : "text-gray-400"
                  }`}
                />
                <span className="text-sm">Retailer</span>
              </button>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-12 py-6 rounded-2xl bg-gray-50 border-gray-200 focus:border-[var(--lime-primary)] focus:ring-[var(--lime-primary)]"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-12 pr-12 py-6 rounded-2xl bg-gray-50 border-gray-200 focus:border-[var(--lime-primary)] focus:ring-[var(--lime-primary)]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <label htmlFor="remember" className="text-sm cursor-pointer">
                  Remember me
                </label>
              </div>
              <a
                href="#"
                className="text-sm text-[var(--blue-primary)] hover:underline"
              >
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <Button
              size="lg"
              className="w-full rounded-2xl py-6 bg-[var(--lime-primary)] text-black hover:bg-[var(--lime-dark)]"
            >
              Login
            </Button>

            {/* Social Login */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="rounded-2xl py-6"
                style={{ boxShadow: "var(--shadow-soft)" }}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </Button>
              <Button
                variant="outline"
                className="rounded-2xl py-6"
                style={{ boxShadow: "var(--shadow-soft)" }}
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </Button>
            </div>
          </TabsContent>

          {/* Register Tab */}
          <TabsContent value="register" className="space-y-6">
            {/* User Type Selection */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                onClick={() => setUserType("customer")}
                className={`flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all duration-300 ${
                  userType === "customer"
                    ? "border-[var(--lime-primary)] bg-[var(--lime-primary)]/10"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <User
                  className={`w-8 h-8 ${
                    userType === "customer"
                      ? "text-[var(--lime-primary)]"
                      : "text-gray-400"
                  }`}
                />
                <span className="text-sm">Customer</span>
              </button>
              <button
                onClick={() => setUserType("retailer")}
                className={`flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all duration-300 ${
                  userType === "retailer"
                    ? "border-[var(--blue-primary)] bg-[var(--blue-primary)]/10"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Store
                  className={`w-8 h-8 ${
                    userType === "retailer"
                      ? "text-[var(--blue-primary)]"
                      : "text-gray-400"
                  }`}
                />
                <span className="text-sm">Retailer</span>
              </button>
            </div>

            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="name">
                {userType === "retailer" ? "Business Name" : "Full Name"}
              </Label>
              <Input
                id="name"
                type="text"
                placeholder={
                  userType === "retailer" ? "Your Business Name" : "John Doe"
                }
                className="py-6 rounded-2xl bg-gray-50 border-gray-200"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="reg-email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="reg-email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-12 py-6 rounded-2xl bg-gray-50 border-gray-200"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="reg-password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="reg-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-12 pr-12 py-6 rounded-2xl bg-gray-50 border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start gap-2">
              <Checkbox id="terms" className="mt-1" />
              <label htmlFor="terms" className="text-sm cursor-pointer">
                I agree to the{" "}
                <a href="#" className="text-[var(--blue-primary)] hover:underline">
                  Terms & Conditions
                </a>{" "}
                and{" "}
                <a href="#" className="text-[var(--blue-primary)] hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Register Button */}
            <Button
              size="lg"
              className="w-full rounded-2xl py-6 bg-[var(--lime-primary)] text-black hover:bg-[var(--lime-dark)]"
            >
              Create Account
            </Button>

            {/* Social Register */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-muted-foreground">
                  Or register with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="rounded-2xl py-6"
                style={{ boxShadow: "var(--shadow-soft)" }}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </Button>
              <Button
                variant="outline"
                className="rounded-2xl py-6"
                style={{ boxShadow: "var(--shadow-soft)" }}
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
