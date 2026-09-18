import React from "react";
import { ShieldCheck, CheckCircle2, HeartHandshake, Sparkles, ArrowRight, Lock, Ban } from "lucide-react";
import { useApp } from "../context/AppContext";

export const FreePromiseView: React.FC = () => {
  const { navigate, isAuthenticated } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
      {/* Header Banner */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-2 shadow-xs">
          <ShieldCheck className="w-9 h-9" />
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-800">
          The Community Charter of Golfly
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Built for Dedicated Golfers
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Uniting players for matches, course telemetry, tournament tracking, and verified equipment exchange.
        </p>
      </div>

      {/* The 5 Core Community Commitments */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs space-y-8">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 border-b border-slate-100 pb-4">
          Core Community Principles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-2">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>1. Open Golfer Networking</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every golfer—whether a scratch club champion or a beginner—has open access to partner matching and community discussion.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-2">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>2. Direct Member Marketplace</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Sell a driver, trade an iron set, or pass down equipment directly to fellow golfers with zero middleman commissions.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-2">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>3. Course Caddie & Strategy Tools</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tactical hole management, atmospheric adjustments, and wind calculations tailored for local courses.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-2">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>4. Tournament Hub & Event RSVPs</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Keep tabs on club medals, captain's cups, and weekend invitationals with instant RSVP tracking.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-2 md:col-span-2">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>5. Respectful & Safe Community</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Strict adherence to golf etiquette on and off the course, verified player profiles, and direct connection between respectful golfers.
            </p>
          </div>
        </div>

        {/* Our Purpose */}
        <div className="pt-6 border-t border-slate-100 space-y-3">
          <h3 className="text-base font-bold text-slate-900">Our Purpose</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Golf has historically suffered from fragmented networking across disjointed group chats and inaccessible directories. Our sole objective is to unite golfers across clubs, fostering companionship, tournament excitement, and lifelong sportsmanship.
          </p>
        </div>
      </div>

      {/* Verification summary */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div>
          <h3 className="text-lg font-bold text-white mb-1">
            Ready to connect with golfers?
          </h3>
          <p className="text-xs text-slate-300">
            Set up your verified golfer profile in moments.
          </p>
        </div>

        <button
          onClick={() => navigate(isAuthenticated ? "/dashboard" : "/auth/signup")}
          className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-black text-xs uppercase tracking-wider transition-colors shrink-0 cursor-pointer"
        >
          {isAuthenticated ? "Go to Dashboard" : "Create Account"}
        </button>
      </div>
    </div>
  );
};
