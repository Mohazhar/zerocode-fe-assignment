import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ThemeToggle } from "../components/ui/ThemeToggle";
import { AnimatedBackground } from "../components/ui/AnimatedBackground";
import { GlassCard } from "../components/ui/GlassCard";
import { TypingAnimation } from "../components/ui/TypingAnimation";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Eye, EyeOff, MessageCircle, Mail, Lock, Sparkles } from "lucide-react";

export default function Login() {
  const { user, signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (user) {
    return <Navigate to="/chat" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await signIn(email, password);

    if (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  return (
    <AnimatedBackground variant="mesh">
      <div className="min-h-screen flex items-center justify-center p-4 relative">
        {/* Floating sparkles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <Sparkles
              key={i}
              className="absolute text-primary-400/30 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="absolute top-4 right-4 z-20 animate-slide-down">
          <ThemeToggle />
        </div>

        <div className="w-full max-w-md animate-fade-in">
          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-600 to-purple-600 rounded-3xl mb-6 animate-float shadow-2xl">
              <MessageCircle className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-display font-bold bg-gradient-to-r from-gray-900 via-primary-600 to-purple-600 dark:from-white dark:via-primary-400 dark:to-purple-400 bg-clip-text text-transparent mb-2">
              <TypingAnimation text="ChatBot AI" speed={100} />
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2 animate-slide-up font-medium">
              Welcome back! Please sign in to continue.
            </p>
          </div>

          {/* Login Form */}
          <GlassCard variant="intense" className="p-8 animate-scale">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
                  <AlertDescription className="text-red-700 dark:text-red-300">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <div
                className="space-y-2 animate-slide-up"
                style={{ animationDelay: "0.1s" }}
              >
                <Label
                  htmlFor="email"
                  className="text-gray-700 dark:text-gray-300 font-semibold font-display"
                >
                  Email address
                </Label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-primary-500 transition-colors duration-200" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-14 bg-white/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:text-white backdrop-blur-sm transition-all duration-300 hover:shadow-lg focus:shadow-xl font-medium"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div
                className="space-y-2 animate-slide-up"
                style={{ animationDelay: "0.2s" }}
              >
                <Label
                  htmlFor="password"
                  className="text-gray-700 dark:text-gray-300 font-semibold font-display"
                >
                  Password
                </Label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-primary-500 transition-colors duration-200" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-12 h-14 bg-white/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:text-white backdrop-blur-sm transition-all duration-300 hover:shadow-lg focus:shadow-xl font-medium"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-all duration-200 hover:scale-110"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div
                className="animate-slide-up"
                style={{ animationDelay: "0.3s" }}
              >
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-14 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white font-bold font-display rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] backdrop-blur-sm"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                      <TypingAnimation
                        text="Signing in..."
                        speed={100}
                        cursor={false}
                      />
                    </div>
                  ) : (
                    <span className="flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Sign In
                    </span>
                  )}
                </Button>
              </div>
            </form>

            <div
              className="mt-8 text-center animate-slide-up"
              style={{ animationDelay: "0.4s" }}
            >
              <p className="text-gray-600 dark:text-gray-400 font-medium">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-primary-600 hover:text-purple-600 dark:text-primary-400 dark:hover:text-purple-400 font-bold font-display transition-all duration-200 hover:scale-105 inline-block"
                >
                  Sign up here
                </Link>
              </p>
            </div>
          </GlassCard>
        </div>
      </div>
    </AnimatedBackground>
  );
}
