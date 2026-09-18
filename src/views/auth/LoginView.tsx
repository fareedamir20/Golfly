import React, { useState } from "react";
import { Mail, Lock, ShieldCheck, ArrowRight } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { GolflyLogo } from "../../components/GolflyLogo";

export const LoginView: React.FC = () => {
  const { login, navigate } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    setLoading(true);
    login(email);
    setLoading(false);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xl space-y-6">
        <div className="text-center">
          <GolflyLogo size="md" className="justify-center mb-3" />
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Welcome Back
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Access your player profile, matches, and course intelligence
          </p>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <span>{loading ? "Signing In..." : "Sign In to Golfly"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Community Note */}
        <div className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl flex items-center gap-2 text-xs text-emerald-950">
          <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>Secure Golfer Companion Platform</span>
        </div>

        <div className="text-center text-xs text-slate-500">
          Don't have an account yet?{" "}
          <button
            onClick={() => navigate("/auth/signup")}
            className="font-bold text-emerald-800 hover:underline cursor-pointer"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};
