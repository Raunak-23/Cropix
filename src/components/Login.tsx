import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ThemeToggle } from "./ThemeToggle";

interface LoginProps {
  onLogin: () => void;
  onShowPricing: () => void;
}

export function Login({ onLogin, onShowPricing }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0e13] flex relative">
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-500 to-emerald-700 p-12 flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center">
              <span className="text-emerald-600 text-2xl">C</span>
            </div>
            <span className="text-white text-3xl">Cropix</span>
          </div>
          <h1 className="text-white text-5xl mb-6">
            Bloomberg Terminal
            <br />
            for Agriculture
          </h1>
          <p className="text-emerald-100 text-xl">
            Manage farmers, track markets, and optimize logistics from one powerful platform.
          </p>
        </div>
        <div className="text-emerald-100">
          <p>"Cropix transformed how we manage our wholesale operations. It's a game-changer."</p>
          <p className="mt-2">— Rajesh Kumar, FPO Director</p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center">
                <span className="text-white text-xl">C</span>
              </div>
              <span className="text-gray-900 dark:text-white text-2xl">Cropix</span>
            </div>
          </div>

          <h2 className="text-gray-900 dark:text-white text-3xl mb-2">Welcome back</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Sign in to your account to continue</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                <input type="checkbox" className="rounded border-gray-300 dark:border-gray-700" />
                Remember me
              </label>
              <a href="#" className="text-emerald-500 text-sm hover:text-emerald-400">
                Forgot password?
              </a>
            </div>

            <Button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white">
              Sign In
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <button
                onClick={onShowPricing}
                className="text-emerald-500 hover:text-emerald-400"
              >
                View Pricing
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
