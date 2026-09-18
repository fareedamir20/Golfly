import React from "react";
import { Users, Compass, Trophy, ShoppingBag, ShieldCheck, ArrowRight, Zap, Target, BarChart3, Wind } from "lucide-react";
import { useApp } from "../../context/AppContext";

export const SolutionView: React.FC = () => {
  const { navigate, isAuthenticated } = useApp();

  const solutions = [
    {
      icon: Users,
      title: "Intelligent Golfer Matchmaking",
      subtitle: "Never struggle to fill a four-ball again",
      desc: "Connect instantly with compatible playing partners based on verified handicap ranges, preferred tee-time slots, and playing styles—eliminating messy group chat spam.",
      features: ["Handicap-compatible pairing", "Schedule & weekend slot matching", "Private member-to-member direct messaging"]
    },
    {
      icon: Wind,
      title: "Course Intelligence & Telemetry",
      subtitle: "Real-time atmospheric & tactical course guidance",
      desc: "Access localized green speeds, weather radar, wind velocity compensation, and hole-by-hole strategy recommendations to elevate your course management.",
      features: ["Live wind & weather telemetry", "Hole-by-hole club selection guides", "Green speed and turf condition tracking"]
    },
    {
      icon: BarChart3,
      title: "Rounds & Performance Analytics",
      subtitle: "Official score tracking and differential calculation",
      desc: "Record your scores across courses, monitor handicap index trends, track fairways hit and putts per round, and benchmark your progress over time.",
      features: ["Gross and Net score calculation", "Handicap differential monitoring", "Historical round logbook"]
    },
    {
      icon: Trophy,
      title: "Tournament Hub & Live Fixtures",
      subtitle: "Centralized tournament calendar and RSVP system",
      desc: "Stay informed on club medals, captain's cups, invitationals, and weekend shootouts. Secure spots instantly and view field sizes with one tap.",
      features: ["Official tournament calendar", "Real-time slot tracking and instant RSVP", "Division & format breakdown"]
    },
    {
      icon: ShoppingBag,
      title: "Verified Peer-to-Peer Marketplace",
      subtitle: "0% commission golfer equipment exchange",
      desc: "Buy, sell, or trade drivers, iron sets, wedges, and bags directly with verified golfers in your local community without broker fees.",
      features: ["Direct member-to-member inquiries", "Condition ratings and specs transparency", "Zero transaction or middleman fees"]
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-800">
          The Golfly Solution
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          A Modern Platform for Every Golfer
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          We replace fragmented tools, disorganized chat groups, and guesswork with a unified digital ecosystem designed for players and clubs.
        </p>
      </div>

      {/* Solutions Grid */}
      <div className="space-y-6">
        {solutions.map((item, idx) => {
          const IconComponent = item.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs hover:border-emerald-300 transition-all flex flex-col md:flex-row md:items-start gap-6"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0 text-emerald-800">
                <IconComponent className="w-6 h-6" />
              </div>

              <div className="flex-1 space-y-3">
                <div>
                  <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
                    {item.subtitle}
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-0.5">
                    {item.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
                  {item.features.map((feat, fIdx) => (
                    <div
                      key={fIdx}
                      className="flex items-center gap-2 text-xs font-medium text-slate-700 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100"
                    >
                      <Zap className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA Bottom Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-slate-800">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-xl font-bold text-white">
            Experience the Golfly Platform
          </h3>
          <p className="text-xs text-slate-300 max-w-md">
            Create your account in seconds to start coordinating matches and tracking your golf game.
          </p>
        </div>

        <button
          onClick={() => navigate(isAuthenticated ? "/dashboard" : "/auth/signup")}
          className="shrink-0 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-md cursor-pointer flex items-center gap-2"
        >
          <span>{isAuthenticated ? "Open Dashboard" : "Get Started Now"}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
