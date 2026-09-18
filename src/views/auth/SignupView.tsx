import React, { useState } from "react";
import { User, Mail, Lock, ShieldCheck, ArrowRight, Flag } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { GolflyLogo } from "../../components/GolflyLogo";
import { LAHORE_CLUBS } from "../../data/clubs";

export const SignupView: React.FC = () => {
  const { signup, navigate } = useApp();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [homeClub, setHomeClub] = useState(LAHORE_CLUBS[0].name);
  const [handicap, setHandicap] = useState(14.0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) {
      setError("Please fill in your full name and email address.");
      return;
    }
    setError("");
    setLoading(true);
    await signup({
      fullName: fullName.trim(),
      email: email.trim(),
      homeClub,
      handicap: Number(handicap)
    });
    setLoading(false);
    navigate("/auth/onboarding");
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xl space-y-6">
        <div className="text-center">
          <GolflyLogo size="md" className="justify-center mb-3" />
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Create Your Golfer Profile
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Join golfers across Defence Raya, Garrison, Gymkhana, Royal Palm, Skyview & Oasis
          </p>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Full Name & Title</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Asad Malik or Dr. Daniyal"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>
          </div>

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
            <label className="block text-xs font-bold text-slate-700 mb-1">Choose Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Primary Lahore Club</label>
              <select
                value={homeClub}
                onChange={(e) => setHomeClub(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden bg-white"
              >
                {LAHORE_CLUBS.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.shortName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Current Handicap Index</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="54"
                required
                value={handicap}
                onChange={(e) => setHandicap(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>
          </div>

          <div className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl flex items-center gap-2 text-xs text-emerald-950">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>Dedicated community network for Lahore golf club members.</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <span>{loading ? "Creating Account..." : "Create Account & Continue"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-500">
          Already a member?{" "}
          <button
            onClick={() => navigate("/auth/login")}
            className="font-bold text-emerald-800 hover:underline cursor-pointer"
          >
            Sign In Here
          </button>
        </div>
      </div>
    </div>
  );
};
