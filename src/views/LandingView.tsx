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
    <div className="space-y-16 sm:space-y-24 pb-20 overflow-x-hidden bg-slate-50 text-slate-900">
      {/* Hero Section with Vibrant Lush Green Atmosphere & Daylight Fairway */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden text-white pt-12 sm:pt-20 pb-20 sm:pb-28">
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <img
            src="/lush_fairway_sunset.jpg"
            alt="Lush Golf Course Fairway Sunset Background"
            className="w-full h-full object-cover object-center scale-105 filter saturate-[1.3] brightness-[1.05]"
            referrerPolicy="no-referrer"
          />
          {/* Multi-layered Vibrant Lush Emerald Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/85 via-emerald-900/75 to-teal-950/85 backdrop-blur-[1px]" />
          <div className="absolute inset-0 bg-radial from-emerald-400/25 via-transparent to-emerald-950/90 pointer-events-none" />
        </div>

        {/* Ambient Glowing Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-emerald-400/20 rounded-full blur-[140px] pointer-events-none z-0" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-teal-300/15 rounded-full blur-[120px] pointer-events-none z-0" />

        {/* Geometric Grid Texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#34d39918_1px,transparent_1px),linear-gradient(to_bottom,#34d39918_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_80%,transparent_100%)] pointer-events-none z-0" />

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
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-400/25 border border-emerald-300/40 text-emerald-200 text-xs font-bold tracking-widest uppercase backdrop-blur-md shadow-lg"
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
                className="text-base sm:text-lg text-slate-100 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium drop-shadow-xs"
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
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/95 hover:bg-white text-emerald-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  id="hero-find-club-btn"
                >
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span>Find Golf Clubs</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate("/ai-caddie")}
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-100 border border-emerald-500/50 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer backdrop-blur-md"
                >
                  <Compass className="w-4 h-4 text-emerald-300" />
                  <span>Course Strategy</span>
                </motion.button>
              </motion.div>

              {/* Verified Highlights */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 text-xs text-slate-100 font-semibold pt-2"
              >
                <span className="flex items-center gap-1.5 bg-emerald-950/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-500/40 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Instant Matchmaking
                </span>
                <span className="flex items-center gap-1.5 bg-emerald-950/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-500/40 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Live Course Telemetry
                </span>
                <span className="flex items-center gap-1.5 bg-emerald-950/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-500/40 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Member Gear Exchange
                </span>
              </motion.div>
            </motion.div>

            {/* Right Column: Floating Glassmorphic Interactive Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 space-y-4 relative"
            >
              {/* Card 1: Live Radar Teammate Match Card */}
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="bg-white/95 border border-emerald-200 rounded-3xl p-5 backdrop-blur-xl shadow-2xl space-y-3 relative overflow-hidden text-slate-900"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center border border-emerald-300">
                      <Radar className="w-4 h-4 animate-spin text-emerald-700" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">1-Click Match Radar</h4>
                      <p className="text-[10px] text-slate-500 font-medium">Defence Raya Golf & Country Club</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-300">
                    98% Compatibility
                  </span>
                </div>

                <div className="flex items-center gap-3 bg-emerald-50/60 rounded-2xl p-3 border border-emerald-100">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 border border-emerald-400 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-md">
                    AK
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-xs text-slate-900 truncate">Ahmad Yar Khan</h5>
                      <span className="text-[10px] font-bold text-emerald-700">Hcp 4.2</span>
                    </div>
                    <p className="text-[10px] text-slate-500 truncate mt-0.5">Competitive Matchplay • Morning Tee</p>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/partners")}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Connect & Form Pair</span>
                </button>
              </motion.div>

              {/* Card 2: Live Course Conditions Badge */}
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="bg-white/95 border border-emerald-200 rounded-3xl p-4 backdrop-blur-xl shadow-xl flex items-center justify-between gap-4 text-slate-900"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center border border-amber-300 shrink-0">
                    <Sun className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <span>Defence Raya Weather</span>
                      <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-mono font-bold">Optimal</span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-0.5">26°C • Clear Sky • Wind 8 km/h NW</p>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/ai-caddie")}
                  className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 transition-colors cursor-pointer shrink-0"
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
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 sm:-mt-16 relative z-20"
      >
        <WeatherWidget />
      </motion.div>

      {/* Metrics & Impact Counter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-emerald-100 rounded-3xl p-6 sm:p-8 shadow-sm grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <div className="text-2xl sm:text-4xl font-black text-emerald-700">
              10,000+
            </div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Rounds Logged</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-4xl font-black text-emerald-700">
              6
            </div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Mapped Championship Courses</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-4xl font-black text-emerald-700">
              98%
            </div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Partner Compatibility</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-4xl font-black text-emerald-700">
              Real-Time
            </div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Wind & Density Telemetry</div>
          </div>
        </div>
      </section>

      {/* Bento Showcase Grid Feature Matrix */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto space-y-3"
        >
          <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-widest block">
            Platform Capabilities
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Built For Every Phase Of Your Game
          </h2>
          <p className="text-sm text-slate-600 font-medium">
            Select a core module below to test its capabilities directly inside this interactive showcase.
          </p>
        </motion.div>

        {/* Bento Interactive Tab Switcher */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setActiveBentoTab("match")}
            className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeBentoTab === "match"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                : "bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>1-Click Matchmaker</span>
          </button>

          <button
            onClick={() => setActiveBentoTab("caddie")}
            className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeBentoTab === "caddie"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                : "bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200"
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>AI Caddie Strategy</span>
          </button>

          <button
            onClick={() => setActiveBentoTab("gear")}
            className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeBentoTab === "gear"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                : "bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200"
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Member Gear Exchange</span>
          </button>

          <button
            onClick={() => setActiveBentoTab("tournaments")}
            className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeBentoTab === "tournaments"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                : "bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200"
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Honours & Tournaments</span>
          </button>
        </div>

        {/* Interactive Bento Showcase Box */}
        <div className="bg-white border border-emerald-100 rounded-3xl p-6 sm:p-10 shadow-md relative overflow-hidden text-slate-900">
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
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                    <Zap className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Instant Partner Finder</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900">Smart Matchmaking Engine</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    Filter golfers by home club, handicap bracket, preferred time slots, and playing styles. Send direct game invites or join active four-ball tee slots.
                  </p>
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Verified member profiles & handicap indexes</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Geographic proximity filters for Lahore clubs</span>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate("/partners")}
                    className="mt-4 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Find Partners Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="lg:col-span-6 space-y-3">
                  <div className="relative h-36 rounded-2xl overflow-hidden border border-emerald-200 mb-2 shadow-xs">
                    <img
                      src="/golfer_tee_box.jpg"
                      alt="Golfer Tee Swing on Lush Fairway"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <span className="absolute bottom-2 left-3 text-[10px] font-bold text-white bg-emerald-700/90 px-2.5 py-0.5 rounded-full border border-emerald-400">
                      Live Tee Slot Radar
                    </span>
                  </div>

                  <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 space-y-2.5">
                    <div className="flex items-center justify-between border-b border-emerald-100 pb-2.5">
                      <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Live Match Simulation</span>
                      <span className="text-[10px] font-bold bg-emerald-200 text-emerald-900 px-2.5 py-0.5 rounded-full">Radar Active</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white font-bold text-xs flex items-center justify-center">
                            AK
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900">Ahmad Yar Khan</div>
                            <div className="text-[10px] text-slate-500">Defence Raya • Hcp 4.2</div>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-emerald-700">98% Match</span>
                      </div>

                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white font-bold text-xs flex items-center justify-center">
                            KH
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900">Kamran Hassan</div>
                            <div className="text-[10px] text-slate-500">Lahore Gymkhana • Hcp 9.8</div>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-emerald-700">94% Match</span>
                      </div>
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
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold">
                    <Wind className="w-3.5 h-3.5 text-teal-700" />
                    <span>Atmospheric Telemetry</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900">Hole-By-Hole Tactical Strategy</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    Get precise yardage play-as distances based on live temperature, humidity, elevation changes, and wind direction vectors on Lahore's premier courses.
                  </p>
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                      <span>Density altitude club selection calculator</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                      <span>Hole layout yardage maps & risk advice</span>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate("/ai-caddie")}
                    className="mt-4 px-6 py-3 rounded-xl bg-teal-700 hover:bg-teal-600 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Launch Strategy Simulator</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="lg:col-span-6 space-y-3">
                  <div className="relative h-36 rounded-2xl overflow-hidden border border-teal-200 mb-2 shadow-xs">
                    <img
                      src="/golf_caddie_strategy.jpg"
                      alt="Golfer GPS Strategy on Smartphone"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <span className="absolute bottom-2 left-3 text-[10px] font-bold text-white bg-teal-800/90 px-2.5 py-0.5 rounded-full border border-teal-400">
                      Live GPS Strategy Map
                    </span>
                  </div>

                  <div className="bg-teal-50/50 border border-teal-100 rounded-2xl p-4 space-y-2.5">
                    <div className="flex items-center justify-between border-b border-teal-100 pb-2.5">
                      <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Hole 4 Telemetry Sample</span>
                      <span className="text-[10px] font-bold bg-teal-200 text-teal-900 px-2.5 py-0.5 rounded-full">Par 4 · 415 Yards</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2.5 text-center">
                      <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-2xs">
                        <div className="text-[10px] text-slate-500 font-bold uppercase">Target Distance</div>
                        <div className="text-lg font-black text-slate-900 mt-0.5">415 Yds</div>
                      </div>
                      <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-2xs">
                        <div className="text-[10px] text-slate-500 font-bold uppercase">Plays As</div>
                        <div className="text-lg font-black text-teal-700 mt-0.5">428 Yds</div>
                      </div>
                    </div>
                    <div className="p-2.5 bg-teal-100/80 border border-teal-200 rounded-xl text-xs text-teal-950 font-medium">
                      💡 <strong>Caddie Tip:</strong> Headwind 12 km/h adds +13 yards. Take 1 extra club and aim left-center.
                    </div>
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
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                    <ShoppingBag className="w-3.5 h-3.5 text-amber-700" />
                    <span>Member-To-Member Marketplace</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900">Verified Equipment Exchange</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    Buy, sell, or trade drivers, iron sets, rangefinders, and golf bags directly with verified golfers in your home club network without broker markups.
                  </p>
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Verified member sellers & condition ratings</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Direct phone or WhatsApp contact</span>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate("/marketplace")}
                    className="mt-4 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Browse Gear Exchange</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="lg:col-span-6 bg-amber-50/50 border border-amber-100 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between border-b border-amber-100 pb-3">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Featured Gear Listing</span>
                    <span className="text-[10px] font-bold bg-amber-200 text-amber-900 px-2.5 py-0.5 rounded-full">Available</span>
                  </div>
                  <div className="flex items-center gap-4 bg-white rounded-xl p-3 border border-slate-200 shadow-2xs">
                    <div className="w-16 h-16 bg-amber-100 text-amber-800 rounded-xl flex items-center justify-center shrink-0">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <div>
                      <h5 className="font-bold text-xs text-slate-900">Titleist TSR3 Driver (9.0°)</h5>
                      <p className="text-[11px] text-slate-500 mt-0.5">Stiff Flex • Fujikura Ventus Blue 6S</p>
                      <div className="text-sm font-black text-amber-700 mt-1">PKR 145,000</div>
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
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold">
                    <Trophy className="w-3.5 h-3.5 text-indigo-700" />
                    <span>Live Competition</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900">Honours & Tournament Directory</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    Register for upcoming club fixtures, track live scorecards, and display your career honours, trophy badges, and hole-in-one records.
                  </p>
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span>Live gross & net leaderboard tracking</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span>Inter-club challenge matches & trophies</span>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate("/tournaments")}
                    className="mt-4 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>View Tournaments</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="lg:col-span-6 bg-indigo-50/50 border border-indigo-100 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between border-b border-indigo-100 pb-3">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Lahore Open Leaderboard</span>
                    <span className="text-[10px] font-bold bg-indigo-200 text-indigo-900 px-2.5 py-0.5 rounded-full">Final Round</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-slate-200 text-xs shadow-2xs">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-amber-600 font-bold">1</span>
                        <span className="font-bold text-slate-900">Usman Qureshi</span>
                      </div>
                      <span className="font-mono font-bold text-emerald-700">-3 (141)</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-slate-200 text-xs shadow-2xs">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-slate-500 font-bold">2</span>
                        <span className="font-bold text-slate-900">Fareed Amir</span>
                      </div>
                      <span className="font-mono font-bold text-emerald-700">-1 (143)</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Interactive FIND CLUB Spotlight Section */}
      <section id="find-club-section" className="bg-emerald-50/40 py-16 border-y border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
                <Flag className="w-3.5 h-3.5 text-emerald-700" />
                <span>Find Club · Interactive Directory</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Find Golf Clubs & Championship Courses
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl font-medium">
                Explore course layouts, Hole19 player reviews, live weather forecasts, practice greens, and fine dining lounges across Lahore.
              </p>
            </div>
            <button
              onClick={() => navigate("/clubs")}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-900 bg-white hover:bg-emerald-50 border border-emerald-200 px-4 py-2.5 rounded-xl transition-colors cursor-pointer self-start md:self-auto shadow-xs"
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
                      ? "bg-emerald-600 text-white shadow-md scale-[1.02]"
                      : "bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200"
                  }`}
                >
                  <MapPin className={`w-3.5 h-3.5 ${isSelected ? "text-white" : "text-slate-400"}`} />
                  <span>{club.name}</span>
                  {club.rating && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-semibold ${
                      isSelected ? "bg-emerald-900 text-amber-300" : "bg-amber-100 text-amber-800"
                    }`}>
                      ★ {club.rating}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Club Card */}
          <div className="bg-white rounded-3xl border border-emerald-100 shadow-xl overflow-hidden transition-all text-slate-900">
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
                  <p className="text-xs text-slate-200 flex items-center gap-1.5 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{selectedClub.address || selectedClub.location}</span>
                  </p>
                </div>
              </div>

              {/* Details */}
              <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-slate-400 block">Founded</span>
                      <span className="text-xs font-bold text-slate-900">{selectedClub.foundedYear || 2010}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase text-slate-400 block">Access</span>
                      <span className="text-xs font-bold text-emerald-700">Members & Affiliates</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase text-slate-400 block">Dress Code</span>
                      <span className="text-xs font-bold text-slate-900">Soft Spikes & Collared Shirts</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    {selectedClub.keyDetails}
                  </p>

                  <div>
                    <h4 className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Club Amenities & Practice Facilities</span>
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedClub.amenities.map((a, idx) => (
                        <span key={idx} className="text-[11px] font-semibold bg-emerald-50 text-emerald-900 px-2.5 py-1 rounded-lg border border-emerald-100">
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                  <div className="text-xs text-slate-500 font-medium">
                    Course Yardage: <span className="font-bold text-slate-900">{selectedClub.yardage || 7000} yards</span>
                  </div>
                  <button
                    onClick={() => navigate("/clubs")}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-md"
                  >
                    Explore Club Guide
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Golfer Feedback & Community Wall */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-widest block">
            Golfer Feedback
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Trusted By Golfers Across Member Clubs
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white rounded-3xl border border-emerald-100 p-6 shadow-sm space-y-4 text-slate-900"
          >
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-600 italic leading-relaxed font-medium">
              "Finding matchplay partners at Defence Raya used to take days of phone calls. With Golfly, I found two single-digit handicappers for a weekend four-ball in under 2 minutes."
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                UQ
              </div>
              <div>
                <h4 className="font-bold text-xs text-slate-900">Usman Qureshi</h4>
                <p className="text-[10px] text-slate-500">Defence Raya • Hcp 6.4</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white rounded-3xl border border-emerald-100 p-6 shadow-sm space-y-4 text-slate-900"
          >
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-600 italic leading-relaxed font-medium">
              "The real-time course weather telemetry and wind density adjustments helped me dial in my iron club selections at Lahore Gymkhana. Game changer."
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-600 to-emerald-700 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                BH
              </div>
              <div>
                <h4 className="font-bold text-xs text-slate-900">Bilal Hassan</h4>
                <p className="text-[10px] text-slate-500">Lahore Gymkhana • Hcp 11.2</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white rounded-3xl border border-emerald-100 p-6 shadow-sm space-y-4 text-slate-900"
          >
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-600 italic leading-relaxed font-medium">
              "Listed my Titleist TSR3 driver on the Member Gear Exchange and sold it within 4 hours to another Royal Palm member. Super clean and trustworthy."
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                AM
              </div>
              <div>
                <h4 className="font-bold text-xs text-slate-900">Ayesha Malik</h4>
                <p className="text-[10px] text-slate-500">Royal Palm • Hcp 14.0</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Founder Commitment Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl text-center md:text-left">
            <span className="text-xs font-extrabold text-amber-300 uppercase tracking-widest block">
              Founder's Commitment
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Built For Golfers, By Fareed Amir
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed font-medium">
              "Golfly was created with one single focus: to bring golfers together, simplify game organization, and provide real course telemetry without fluff. Dedicated to serving our local golfing community."
            </p>
          </div>
          <button
            onClick={() => navigate("/founder")}
            className="px-6 py-3.5 rounded-2xl bg-white hover:bg-emerald-50 text-emerald-950 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shrink-0 shadow-md"
          >
            Read Founder's Letter
          </button>
        </div>
      </section>

      {/* Call-To-Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 rounded-3xl p-8 sm:p-14 text-center text-white relative overflow-hidden shadow-xl border border-emerald-500">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Ready To Upgrade Your Golf Experience?
            </h2>
            <p className="text-sm sm:text-base text-emerald-100 leading-relaxed font-medium">
              Create your profile in seconds to coordinate matches, track upcoming tournaments, and access real-time course intelligence.
            </p>

            <button
              onClick={() => navigate(isAuthenticated ? "/dashboard" : "/auth/signup")}
              className="px-8 py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm uppercase tracking-wider transition-all shadow-xl cursor-pointer inline-block"
            >
              {isAuthenticated ? "Go to Dashboard" : "Create Free Account"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
