import React from "react";
import {
  Users,
  Bot,
  Flame,
  ShoppingBag,
  Award,
  CloudFog,
  Trophy,
  Calendar,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Sliders,
  Sparkles
} from "lucide-react";
import { useApp } from "../context/AppContext";

export const FeaturesView: React.FC = () => {
  const { navigate, isAuthenticated } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
          <span>Complete Platform Capabilities</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
          Built Exclusively for Golf in Lahore
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Every tool is custom tailored to local Lahore courses, winter atmospheric conditions, and golf club community etiquette.
        </p>
      </div>

      {/* Deep-Dive Feature 1: 1-Click Partner Match */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-5">
            <Users className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest block mb-1">
            Engine #1
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4">
            1-Click Lahore Golf Partner Matchmaker
          </h2>
          <p className="text-sm text-slate-600 mb-6 leading-relaxed">
            Eliminate awkward WhatsApp broadcast messages. Our partner discovery engine filters verified golfers across Lahore by skill level (Handicap Scratch to 28+), home club affinity, and exact tee-time preference.
          </p>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-700 mb-8">
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Filter by specific Lahore club (Raya, Garrison, Gymkhana, Royal Palm, Skyview, Oasis)</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Handicap parity matching to ensure balanced, enjoyable games</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Time slot filter: Early morning fog-breakers vs. afternoon twilight players</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Integrated direct messaging to coordinate tee times in seconds</span>
            </li>
          </ul>
          <button
            onClick={() => navigate(isAuthenticated ? "/partners" : "/auth/signup")}
            className="px-6 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Launch Partner Match</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <span className="text-xs font-bold text-slate-800">Quick Teammate Filter</span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
              Live Algorithm
            </span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">Brig. (R) Tariq Mahmood</p>
                <p className="text-[11px] text-slate-500">Lahore Garrison · Hcp 8.2 · Morning walker</p>
              </div>
              <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                96% Match
              </span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">Zainab Chaudhry</p>
                <p className="text-[11px] text-slate-500">Defence Raya · Hcp 12.0 · Twilight 9-holes</p>
              </div>
              <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                92% Match
              </span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">Mian Hamza Rasheed</p>
                <p className="text-[11px] text-slate-500">Lahore Gymkhana · Hcp 4.6 · Medal rounds</p>
              </div>
              <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                88% Match
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Deep-Dive Feature 2: Course Caddie & Coach */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="order-2 lg:order-1 bg-gradient-to-br from-slate-900 to-emerald-950 text-white rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-emerald-800/80 pb-3">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold">Course Caddie · Telemetry Feed</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-300">Tactical Engine</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="bg-emerald-900/40 border border-emerald-700/60 rounded-xl p-3">
              <p className="text-emerald-300 font-bold mb-1">Target: Defence Raya Hole 7 (185 yds)</p>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                "Lahore winter air density is high today (18°C, 65% humidity). Crosswind 12 km/h from the canal. Club up from 6-Iron to 5-Iron. Aim 5 yards left of flag to avoid the lake runoff on the right."
              </p>
            </div>
            <div className="bg-emerald-900/40 border border-emerald-700/60 rounded-xl p-3">
              <p className="text-emerald-300 font-bold mb-1">Swing Drill: Garrison Range Anti-Slice</p>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                "Use alignment rod gate drill 4 inches outside ball path. Focus on right forearm soft release through impact zone."
              </p>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center mb-5">
            <Bot className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold text-teal-800 uppercase tracking-widest block mb-1">
            Engine #2
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4">
            Course Caddie & Swing Coach Tools
          </h2>
          <p className="text-sm text-slate-600 mb-6 leading-relaxed">
            Generic golf apps don't know that dense Lahore winter fog shortens ball carry by 6 yards or how water hazards play along the Lahore canal. Our Course Caddie is customized with local architectural intelligence.
          </p>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-700 mb-8">
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
              <span>Real-time club selection taking into account air density, temperature & wind</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
              <span>Hole-by-hole tactical advice for all 6 Lahore championship courses</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
              <span>Instant swing diagnostics for slices, hooks, and driving range practice</span>
            </li>
          </ul>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/ai-caddie")}
              className="px-6 py-3 rounded-xl bg-teal-800 hover:bg-teal-700 text-white font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Consult Caddie</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate("/ai-coach")}
              className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              <span>Swing Coach</span>
            </button>
          </div>
        </div>
      </div>

      {/* Deep-Dive Feature 3: Member Pro Shop Marketplace */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div>
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-5">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold text-amber-800 uppercase tracking-widest block mb-1">
            Engine #3
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4">
            Member Peer-to-Peer Pro Shop
          </h2>
          <p className="text-sm text-slate-600 mb-6 leading-relaxed">
            Upgrade your bag without middlemen or commercial transaction cuts. Buy, sell, or trade authentic drivers, irons, wedges, putters, bags, and golf apparel directly with Lahore players.
          </p>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-700 mb-8">
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Direct member posting and local clubhouse exchanges</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Direct member-to-member handshakes at Lahore club driving ranges</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Free Trade & Junior Golfer Gift tag for donated equipment</span>
            </li>
          </ul>
          <button
            onClick={() => navigate("/marketplace")}
            className="px-6 py-3 rounded-xl bg-amber-800 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Browse Lahore Pro Shop</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold uppercase bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-md">
                Verified Lahore Listing
              </span>
              <span className="text-xs font-bold text-slate-900">PKR 85,000</span>
            </div>
            <h4 className="font-bold text-sm text-slate-900 mb-1">
              TaylorMade Stealth 2 Plus Driver 9.0°
            </h4>
            <p className="text-[11px] text-slate-500 mb-3">
              Location: Defence Raya Golf Club · Stiff Ventus Red Shaft
            </p>
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-600">
              <span>Seller: Fareed Amir (Hcp 10.4)</span>
              <span className="font-bold text-emerald-800">0% Commission</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
