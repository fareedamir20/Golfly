import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Users,
  Compass,
  ShoppingBag,
  Award,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  MapPin,
  ChevronRight,
  Trophy,
  Star,
  Activity,
  Layers,
  Sun,
  Target,
  Flag,
  Radar,
  Wind,
  ShieldCheck,
  Zap,
  TrendingUp,
  Sliders,
  Maximize2
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { LAHORE_CLUBS } from "../data/clubs";
import { WeatherWidget } from "../components/WeatherWidget";

export const LandingView: React.FC = () => {
  const { navigate, isAuthenticated } = useApp();
  const [activeClubId, setActiveClubId] = useState<string>("defence-raya");
  const [activeBentoTab, setActiveBentoTab] = useState<"match" | "caddie" | "gear" | "tournaments">("match");

  const selectedClub = LAHORE_CLUBS.find((c) => c.id === activeClubId) || LAHORE_CLUBS[0];

  return (
    <div className="space-y-20 sm:space-y-28 pb-20 overflow-x-hidden bg-slate-950 text-white">
      {/* Hero Section with Cinematic Background & Glassmorphic Components */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden text-white pt-16 sm:pt-24 pb-20 sm:pb-32">
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <img
            src="/landing_hero_bg.jpg"
            alt="Golf Course Fairway Background"
            className="w-full h-full object-cover object-center scale-105 filter saturate-[1.15]"
          />
          {/* Multi-layered Glass Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-emerald-950/80 to-slate-950/98 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-radial from-emerald-500/20 via-transparent to-slate-950/95 pointer-events-none" />
        </div>

        {/* Ambient Glowing Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-emerald-500/15 rounded-full blur-[150px] pointer-events-none z-0" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-teal-400/10 rounded-full blur-[130px] pointer-events-none z-0" />

        {/* Geometric Grid Texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98112_1px,transparent_1px),linear-gradient(to_bottom,#10b98112_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_80%,transparent_100%)] pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Copy & Animated Action Triggers */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 text-center lg:text-left space-y-6"
            >
              {/* SaaS Pill Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold tracking-widest uppercase backdrop-blur-md shadow-lg"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
                <span>Next-Gen Golf Operating System</span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.06]"
              >
                PLAY GOLF. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-200 drop-shadow-sm">
                  MEET PEOPLE. HAVE FUN.
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium"
              >
                Golfly is the all-in-one companion platform connecting you with compatible playing partners, real-time course weather telemetry, hole-by-hole tactical strategy, and active tournament tracking across Lahore.
              </motion.p>

              {/* Primary Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2"
              >
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate(isAuthenticated ? "/dashboard" : "/auth/signup")}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-xl hover:shadow-emerald-500/30 flex items-center justify-center gap-2.5 cursor-pointer"
                  id="hero-match-cta"
                >
                  <Users className="w-4 h-4 text-slate-950" />
                  <span>{isAuthenticated ? "Launch Dashboard" : "Get Started Now"}</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    const el = document.getElementById("find-club-section");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                    else navigate("/clubs");
                  }}
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-emerald-200 border border-emerald-500/40 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer backdrop-blur-md shadow-md"
                  id="hero-find-club-btn"
                >
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span>Find Golf Clubs</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate("/ai-caddie")}
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-slate-950/80 hover:bg-slate-900 text-slate-200 border border-slate-700/80 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer backdrop-blur-md"
                >
                  <Compass className="w-4 h-4 text-emerald-400" />
                  <span>Course Strategy</span>
                </motion.button>
              </motion.div>

              {/* Verified Highlights */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-slate-300 font-semibold pt-2"
              >
                <span className="flex items-center gap-1.5 bg-slate-900/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Instant Matchmaking
                </span>
                <span className="flex items-center gap-1.5 bg-slate-900/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Live Course Telemetry
                </span>
                <span className="flex items-center gap-1.5 bg-slate-900/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Member Gear Exchange
                </span>
              </motion.div>
            </motion.div>

            {/* Right Column: Floating Dark Glassmorphic Interactive Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 space-y-4 relative"
            >
              {/* Card 1: Live Radar Teammate Match Card (NO STOCK PERSON PHOTOS - Monogram Badges) */}
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="bg-slate-900/90 border border-emerald-500/30 rounded-3xl p-5 backdrop-blur-xl shadow-2xl space-y-3 relative overflow-hidden"
              >
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                      <Radar className="w-4 h-4 animate-spin" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-white uppercase tracking-wider">1-Click Match Radar</h4>
                      <p className="text-[10px] text-slate-400">Defence Raya Golf & Country Club</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                    98% Compatibility
                  </span>
                </div>

                <div className="flex items-center gap-3 bg-slate-950/80 rounded-2xl p-3 border border-slate-800/90">
                  {/* Clean Monogram Badge instead of person photo */}
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-950 to-slate-900 border border-emerald-500/50 text-emerald-300 font-black text-sm flex items-center justify-center shrink-0 shadow-md">
                    AK
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-xs text-white truncate">Ahmad Yar Khan</h5>
                      <span className="text-[10px] font-bold text-emerald-400">Hcp 4.2</span>
                    </div>
                    <p className="text-[10px] text-slate-400 truncate mt-0.5">Competitive Matchplay • Morning Tee</p>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/partners")}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Connect & Form Pair</span>
                </button>
              </motion.div>

              {/* Card 2: Live Course Conditions Badge */}
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 backdrop-blur-xl shadow-xl flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20 shrink-0">
                    <Sun className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>Defence Raya Weather</span>
                      <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded font-mono">Optimal</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5">26°C • Clear Sky • Wind 8 km/h NW</p>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/ai-caddie")}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Floating Weather & Telemetry Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 relative z-20"
      >
        <WeatherWidget />
      </motion.div>

      {/* Metrics & Impact Counter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <div className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
              10,000+
            </div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Rounds Logged</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
              6
            </div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Mapped Championship Courses</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
              98%
            </div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Partner Compatibility</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
              Real-Time
            </div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Wind & Density Telemetry</div>
          </div>
        </div>
      </section>

      {/* Astra6 Interactive Bento Grid Feature Matrix */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto space-y-3"
        >
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block">
            Platform Capabilities
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Built For Every Phase Of Your Game
          </h2>
          <p className="text-sm text-slate-400">
            Select a core module below to test its capabilities directly inside this interactive showcase.
          </p>
        </motion.div>

        {/* Bento Interactive Tab Switcher */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setActiveBentoTab("match")}
            className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeBentoTab === "match"
                ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20"
                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>1-Click Matchmaker</span>
          </button>

          <button
            onClick={() => setActiveBentoTab("caddie")}
            className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeBentoTab === "caddie"
                ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20"
                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>AI Caddie Strategy</span>
          </button>

          <button
            onClick={() => setActiveBentoTab("gear")}
            className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeBentoTab === "gear"
                ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20"
                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Member Gear Exchange</span>
          </button>

          <button
            onClick={() => setActiveBentoTab("tournaments")}
            className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeBentoTab === "tournaments"
                ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20"
                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Honours & Tournaments</span>
          </button>
        </div>

        {/* Interactive Bento Showcase Box */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 backdrop-blur-xl relative overflow-hidden">
          <AnimatePresence mode="wait">
            {activeBentoTab === "match" && (
              <motion.div
                key="match"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-6 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Instant Partner Finder</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">Smart Matchmaking Engine</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Filter golfers by home club, handicap bracket, preferred time slots, and playing styles. Send direct game invites or join active four-ball tee slots.
                  </p>
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Verified member profiles & handicap indexes</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Geographic proximity filters for Lahore clubs</span>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate("/partners")}
                    className="mt-4 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Find Partners Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="lg:col-span-6 bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Live Match Simulation</span>
                    <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full">Radar Active</span>
                  </div>
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-slate-800 text-emerald-400 font-bold text-xs flex items-center justify-center border border-slate-700">
                          AK
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">Ahmad Yar Khan</div>
                          <div className="text-[10px] text-slate-400">Defence Raya • Hcp 4.2</div>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-emerald-400">98% Match</span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-slate-800 text-emerald-400 font-bold text-xs flex items-center justify-center border border-slate-700">
                          KH
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">Kamran Hassan</div>
                          <div className="text-[10px] text-slate-400">Lahore Gymkhana • Hcp 9.8</div>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-emerald-400">94% Match</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeBentoTab === "caddie" && (
              <motion.div
                key="caddie"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-6 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold">
                    <Wind className="w-3.5 h-3.5" />
                    <span>Atmospheric Telemetry</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">Hole-By-Hole Tactical Strategy</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Get precise yardage play-as distances based on live temperature, humidity, elevation changes, and wind direction vectors on Lahore's premier courses.
                  </p>
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                      <span>Density altitude club selection calculator</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                      <span>Hole layout yardage maps & risk advice</span>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate("/ai-caddie")}
                    className="mt-4 px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Launch Strategy Simulator</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="lg:col-span-6 bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Hole 4 Telemetry Sample</span>
                    <span className="text-[10px] font-bold bg-teal-500/20 text-teal-300 px-2.5 py-0.5 rounded-full">Par 4 · 415 Yards</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <div className="text-[10px] text-slate-400 font-bold uppercase">Target Distance</div>
                      <div className="text-xl font-black text-white mt-1">415 Yds</div>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <div className="text-[10px] text-slate-400 font-bold uppercase">Plays As</div>
                      <div className="text-xl font-black text-teal-400 mt-1">428 Yds</div>
                    </div>
                  </div>
                  <div className="p-3 bg-teal-950/40 border border-teal-500/30 rounded-xl text-xs text-teal-200">
                    💡 <strong>Caddie Tip:</strong> Headwind 12 km/h adds +13 yards. Take 1 extra club and aim left-center of fairway.
                  </div>
                </div>
              </motion.div>
            )}

            {activeBentoTab === "gear" && (
              <motion.div
                key="gear"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-6 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold">
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Member-To-Member Marketplace</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">Verified Equipment Exchange</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Buy, sell, or trade drivers, iron sets, rangefinders, and golf bags directly with verified golfers in your home club network without broker markups.
                  </p>
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Verified member sellers & condition ratings</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Direct phone or WhatsApp contact</span>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate("/marketplace")}
                    className="mt-4 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Browse Gear Exchange</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="lg:col-span-6 bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Featured Gear Listing</span>
                    <span className="text-[10px] font-bold bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-full">Available</span>
                  </div>
                  <div className="flex items-center gap-4 bg-slate-900 rounded-xl p-3 border border-slate-800">
                    <div className="w-16 h-16 bg-slate-800 rounded-xl flex items-center justify-center text-amber-400 shrink-0">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <div>
                      <h5 className="font-bold text-xs text-white">Titleist TSR3 Driver (9.0°)</h5>
                      <p className="text-[11px] text-slate-400 mt-0.5">Stiff Flex • Fujikura Ventus Blue 6S</p>
                      <div className="text-sm font-black text-amber-400 mt-1">PKR 145,000</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeBentoTab === "tournaments" && (
              <motion.div
                key="tournaments"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-6 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold">
                    <Trophy className="w-3.5 h-3.5" />
                    <span>Live Competition</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">Honours & Tournament Directory</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Register for upcoming club fixtures, track live scorecards, and display your career honours, trophy badges, and hole-in-one records.
                  </p>
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                      <span>Live gross & net leaderboard tracking</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                      <span>Inter-club challenge matches & trophies</span>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate("/tournaments")}
                    className="mt-4 px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>View Tournaments</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="lg:col-span-6 bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Lahore Open Leaderboard</span>
                    <span className="text-[10px] font-bold bg-indigo-500/20 text-indigo-300 px-2.5 py-0.5 rounded-full">Final Round</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-amber-400 font-bold">1</span>
                        <span className="font-bold text-white">Usman Qureshi</span>
                      </div>
                      <span className="font-mono font-bold text-emerald-400">-3 (141)</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-slate-400 font-bold">2</span>
                        <span className="font-bold text-white">Fareed Amir</span>
                      </div>
                      <span className="font-mono font-bold text-emerald-400">-1 (143)</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Interactive FIND CLUB Spotlight Section */}
      <section id="find-club-section" className="bg-slate-900/60 py-16 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
                <Flag className="w-3.5 h-3.5 text-emerald-400" />
                <span>Find Club · Interactive Directory</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Find Golf Clubs & Championship Courses
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
                Explore course layouts, Hole19 player reviews, live weather forecasts, practice greens, and fine dining lounges across Lahore.
              </p>
            </div>
            <button
              onClick={() => navigate("/clubs")}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300 bg-slate-900 hover:bg-slate-800 border border-emerald-500/30 px-4 py-2.5 rounded-xl transition-colors cursor-pointer self-start md:self-auto"
            >
              <span>View Full Directory</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Club Switcher Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {LAHORE_CLUBS.map((club) => {
              const isSelected = club.id === activeClubId;
              return (
                <button
                  key={club.id}
                  onClick={() => setActiveClubId(club.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all flex items-center gap-2 ${
                    isSelected
                      ? "bg-emerald-500 text-slate-950 shadow-md scale-[1.02]"
                      : "bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800"
                  }`}
                >
                  <MapPin className={`w-3.5 h-3.5 ${isSelected ? "text-slate-950" : "text-slate-400"}`} />
                  <span>{club.name}</span>
                  {club.rating && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-semibold ${
                      isSelected ? "bg-slate-950 text-amber-300" : "bg-amber-500/20 text-amber-300"
                    }`}>
                      ★ {club.rating}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Club Card */}
          <div className="bg-slate-900/90 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Photo & Overlay */}
              <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-full flex flex-col justify-between p-5">
                <img
                  src={selectedClub.imageUrl}
                  alt={selectedClub.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/20" />

                <div className="relative z-10 flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-black uppercase tracking-wider bg-emerald-500 text-slate-950 px-3 py-1 rounded-lg shadow-xs">
                    {selectedClub.holes} Holes · Par {selectedClub.par}
                  </span>
                  {selectedClub.rating && (
                    <span className="text-[11px] font-bold bg-amber-400 text-slate-950 px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-xs">
                      <Star className="w-3.5 h-3.5 fill-slate-950" />
                      <span>{selectedClub.rating} ({selectedClub.reviewCount}+ Hole19)</span>
                    </span>
                  )}
                  {selectedClub.hole19Mapped && (
                    <span className="text-[10px] font-bold bg-slate-950/90 text-emerald-300 border border-emerald-500/40 px-2.5 py-1 rounded-lg backdrop-blur-xs">
                      Mapped on Hole19 App
                    </span>
                  )}
                </div>

                <div className="relative z-10 space-y-1">
                  <h3 className="font-black text-xl sm:text-2xl leading-tight text-white">{selectedClub.name}</h3>
                  <p className="text-xs text-slate-300 flex items-center gap-1.5 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{selectedClub.address || selectedClub.location}</span>
                  </p>
                </div>
              </div>

              {/* Details */}
              <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-slate-400 block">Established</span>
                      <span className="text-xs font-bold text-white">{selectedClub.established}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase text-slate-400 block">Green Fees</span>
                      <span className="text-xs font-bold text-emerald-400">{selectedClub.visitorGreenFees}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase text-slate-400 block">Dress Code</span>
                      <span className="text-xs font-bold text-white">{selectedClub.dressCode}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {selectedClub.description}
                  </p>

                  <div>
                    <h4 className="text-xs font-bold text-white mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Club Amenities & Practice Facilities</span>
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedClub.amenities.map((a, idx) => (
                        <span key={idx} className="text-[11px] font-semibold bg-slate-800 text-slate-200 px-2.5 py-1 rounded-lg border border-slate-700">
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
                  <div className="text-xs text-slate-400">
                    Course Yardage: <span className="font-bold text-white">{selectedClub.championshipYardage} yards</span>
                  </div>
                  <button
                    onClick={() => navigate("/clubs")}
                    className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Explore Club Guide
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Golfer Feedback & Community Wall (NO PERSON STOCK PHOTOS - Clean Monogram Badges) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block">
            Golfer Feedback
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Trusted By Golfers Across Member Clubs
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-slate-900/80 rounded-3xl border border-slate-800 p-6 shadow-xl space-y-4 backdrop-blur-md"
          >
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-300 italic leading-relaxed">
              "Finding matchplay partners at Defence Raya used to take days of phone calls. With Golfly, I found two single-digit handicappers for a weekend four-ball in under 2 minutes."
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-950 to-slate-900 border border-emerald-500/50 text-emerald-300 font-black text-xs flex items-center justify-center shrink-0">
                UQ
              </div>
              <div>
                <h4 className="font-bold text-xs text-white">Usman Qureshi</h4>
                <p className="text-[10px] text-slate-400">Defence Raya • Hcp 6.4</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="bg-slate-900/80 rounded-3xl border border-slate-800 p-6 shadow-xl space-y-4 backdrop-blur-md"
          >
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-300 italic leading-relaxed">
              "The real-time course weather telemetry and wind density adjustments helped me dial in my iron club selections at Lahore Gymkhana. Game changer."
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-950 to-slate-900 border border-teal-500/50 text-teal-300 font-black text-xs flex items-center justify-center shrink-0">
                BH
              </div>
              <div>
                <h4 className="font-bold text-xs text-white">Bilal Hassan</h4>
                <p className="text-[10px] text-slate-400">Lahore Gymkhana • Hcp 11.2</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="bg-slate-900/80 rounded-3xl border border-slate-800 p-6 shadow-xl space-y-4 backdrop-blur-md"
          >
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-300 italic leading-relaxed">
              "Listed my Titleist TSR3 driver on the Member Gear Exchange and sold it within 4 hours to another Royal Palm member. Super clean and trustworthy."
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-950 to-slate-900 border border-amber-500/50 text-amber-300 font-black text-xs flex items-center justify-center shrink-0">
                AM
              </div>
              <div>
                <h4 className="font-bold text-xs text-white">Ayesha Malik</h4>
                <p className="text-[10px] text-slate-400">Royal Palm • Hcp 14.0</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Founder Commitment Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 sm:p-12 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl text-center md:text-left">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block">
              Founder's Commitment
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Built For Golfers, By Fareed Amir
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              "Golfly was created with one single focus: to bring golfers together, simplify game organization, and provide real course telemetry without fluff. Dedicated to serving our local golfing community."
            </p>
          </div>
          <button
            onClick={() => navigate("/founder")}
            className="px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/40 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shrink-0"
          >
            Read Founder's Letter
          </button>
        </div>
      </section>

      {/* Call-To-Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-950 via-emerald-950 to-slate-900 rounded-3xl p-8 sm:p-14 text-center text-white relative overflow-hidden shadow-2xl border border-emerald-800/40">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Ready To Upgrade Your Golf Experience?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Create your profile in seconds to coordinate matches, track upcoming tournaments, and access real-time course intelligence.
            </p>

            <button
              onClick={() => navigate(isAuthenticated ? "/dashboard" : "/auth/signup")}
              className="px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm uppercase tracking-wider transition-all shadow-xl hover:shadow-emerald-500/30 cursor-pointer inline-block"
            >
              {isAuthenticated ? "Go to Dashboard" : "Create Account"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
