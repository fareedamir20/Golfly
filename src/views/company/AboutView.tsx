import React from "react";
import { Compass, Target, Heart, Users, Flag, Sparkles } from "lucide-react";
import { useApp } from "../../context/AppContext";

export const AboutView: React.FC = () => {
  const { navigate } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-800">
          About Golfly
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Mission, Vision & Platform Stewardship
        </h1>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          Uniting golfers and courses through modern technology, real-time analytics, and community connection.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs space-y-8">
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Target className="w-5 h-5 text-emerald-700" />
            Our Mission
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Golfly was founded to elevate the everyday golf experience. From storied club courses to modern championship layouts, golfers deserve seamless tools to find balanced partners, obtain real-time turf and weather conditions, log official rounds, and trade verified equipment with complete trust.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Compass className="w-5 h-5 text-emerald-700" />
            Our Vision
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            We envision an accessible, high-performance golfing ecosystem where players—from scratch champions to weekend newcomers—can connect effortlessly, improve their performance with real-time course intelligence, track their tournaments, and enjoy the game they love.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <h3 className="font-bold text-sm text-slate-900 mb-1">Player Focused</h3>
            <p className="text-xs text-slate-600">Built to serve golfers with intuitive tee-time, matchmaking, and scoring tools.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <h3 className="font-bold text-sm text-slate-900 mb-1">Course Intelligence</h3>
            <p className="text-xs text-slate-600">Real-time green speeds, weather forecasts, wind tracking, and pin positions.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <h3 className="font-bold text-sm text-slate-900 mb-1">Open Community</h3>
            <p className="text-xs text-slate-600">Connecting club members and independent golfers without friction.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
