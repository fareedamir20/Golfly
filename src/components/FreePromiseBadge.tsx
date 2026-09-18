import React from "react";
import { ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";
import { useApp } from "../context/AppContext";

interface FreePromiseBadgeProps {
  variant?: "pill" | "banner" | "card";
  className?: string;
}

export const FreePromiseBadge: React.FC<FreePromiseBadgeProps> = ({
  variant = "pill",
  className = ""
}) => {
  const { navigate } = useApp();

  if (variant === "banner") {
    // Banner disabled per user request
    return null;
  }

  if (variant === "card") {
    return (
      <div
        id="golfly-community-charter-card"
        className={`bg-gradient-to-br from-emerald-900 to-slate-900 text-white rounded-2xl p-6 border border-emerald-700/50 shadow-xl ${className}`}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-lg text-white">The Golfly Community Charter</h4>
            <p className="text-xs text-emerald-300 font-medium">Uniting Golfers Across Lahore</p>
          </div>
        </div>
        <p className="text-sm text-slate-300 mb-4 leading-relaxed">
          Golfly was founded to connect players across Lahore Gymkhana, Defence Raya, Garrison, Royal Palm, Skyview, and Oasis for competitive matches, score tracking, and equipment trading.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-5 text-xs">
          <div className="bg-emerald-950/60 border border-emerald-800/60 rounded-lg p-2.5 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-slate-200">Open Access</span>
          </div>
          <div className="bg-emerald-950/60 border border-emerald-800/60 rounded-lg p-2.5 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-slate-200">Direct Matchmaking</span>
          </div>
          <div className="bg-emerald-950/60 border border-emerald-800/60 rounded-lg p-2.5 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-slate-200">Member Exchange</span>
          </div>
        </div>
        <button
          onClick={() => navigate("/free-promise")}
          className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
        >
          Read Community Charter
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => navigate("/free-promise")}
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-900 border border-emerald-300/80 hover:bg-emerald-200 transition-colors cursor-pointer ${className}`}
      title="Lahore Golf Community"
    >
      <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
      <span>Lahore Golf Community</span>
    </button>
  );
};
