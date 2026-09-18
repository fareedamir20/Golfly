import React from "react";
import { ArrowRight } from "lucide-react";
import { GolflyLogo } from "./GolflyLogo";
import { useApp } from "../context/AppContext";

export const Footer: React.FC = () => {
  const { navigate, isAuthenticated } = useApp();

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top SaaS CTA Banner */}
        <div className="bg-gradient-to-r from-emerald-950 to-slate-900 border border-emerald-800/40 rounded-3xl p-6 sm:p-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="text-white font-bold text-lg sm:text-xl">
              Elevate your golf experience with Golfly
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl leading-relaxed">
              Match with golfers at your skill level, track real-time course weather telemetry, and discover local tournaments in one platform.
            </p>
          </div>

          <button
            onClick={() => navigate(isAuthenticated ? "/dashboard" : "/auth/signup")}
            className="shrink-0 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-md cursor-pointer flex items-center gap-2"
          >
            <span>{isAuthenticated ? "Go to Dashboard" : "Get Started"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="col-span-2 md:col-span-1">
            <GolflyLogo variant="light" size="lg" className="mb-4" />
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              The modern player companion and course management platform. Track handicaps, analyze playing conditions, and discover competitive fixtures.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">
              Product
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => navigate("/features")} className="hover:text-emerald-300 transition-colors cursor-pointer">
                  Platform Overview
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/partners")} className="hover:text-emerald-300 transition-colors cursor-pointer">
                  Partner Matching
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/ai-caddie")} className="hover:text-emerald-300 transition-colors cursor-pointer">
                  Course Caddie
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/ai-coach")} className="hover:text-emerald-300 transition-colors cursor-pointer">
                  Swing Coach
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/clubs")} className="hover:text-emerald-300 transition-colors cursor-pointer">
                  Course Directory
                </button>
              </li>
            </ul>
          </div>

          {/* Features & Hub */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">
              Features
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => navigate("/tournaments")} className="hover:text-emerald-300 transition-colors cursor-pointer">
                  Tournaments & Fixtures
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/marketplace")} className="hover:text-emerald-300 transition-colors cursor-pointer">
                  Member Gear Exchange
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/leaderboards")} className="hover:text-emerald-300 transition-colors cursor-pointer">
                  Rankings & Leaderboards
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/profile/honours")} className="hover:text-emerald-300 transition-colors cursor-pointer">
                  Player Honours
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/messages")} className="hover:text-emerald-300 transition-colors cursor-pointer">
                  Direct Messages
                </button>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">
              Company
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => navigate("/company/founder")} className="hover:text-emerald-300 transition-colors cursor-pointer">
                  Founder
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/company/solution")} className="hover:text-emerald-300 transition-colors cursor-pointer">
                  Solution
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/company/terms")} className="hover:text-emerald-300 transition-colors cursor-pointer">
                  Terms
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/company/privacy")} className="hover:text-emerald-300 transition-colors cursor-pointer">
                  Privacy
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/company/about")} className="hover:text-emerald-300 transition-colors cursor-pointer">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/company/contact")} className="hover:text-emerald-300 transition-colors cursor-pointer">
                  Contact
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col items-center justify-center text-center text-xs text-slate-500 gap-3">
          <div className="text-slate-400 font-medium">
            &copy; {new Date().getFullYear()} Golfly. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400">
            <button onClick={() => navigate("/company/privacy")} className="hover:text-emerald-300 transition-colors cursor-pointer">
              Privacy Policy
            </button>
            <button onClick={() => navigate("/company/contact")} className="hover:text-emerald-300 transition-colors cursor-pointer">
              Support
            </button>
            <button onClick={() => navigate("/company/about")} className="hover:text-emerald-300 transition-colors cursor-pointer">
              About
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
