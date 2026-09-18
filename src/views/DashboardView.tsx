import React, { useState } from "react";
import {
  Compass,
  Users,
  Bot,
  ShoppingBag,
  Award,
  Calendar,
  CloudFog,
  Trophy,
  ArrowRight,
  Plus,
  Flame,
  TrendingUp,
  MapPin,
  MessageSquare,
  Sparkles,
  LogIn,
  UserPlus,
  Calculator,
  Radar
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { WeatherWidget } from "../components/WeatherWidget";
import { HandicapCalculator } from "../components/HandicapCalculator";
import { TeammateSearchModal } from "../components/TeammateSearchModal";

export const DashboardView: React.FC = () => {
  const {
    user,
    rounds,
    addRound,
    tournaments,
    marketplace,
    honours,
    conversations,
    navigate
  } = useApp();

  const [showAddRoundModal, setShowAddRoundModal] = useState(false);
  const [showTeammateSearchModal, setShowTeammateSearchModal] = useState(false);
  const [featureCategory, setFeatureCategory] = useState<"all" | "caddie" | "play" | "stats">("all");

  const [clubName, setClubName] = useState(user?.homeClub || "Pine Valley Country Club");
  const [score, setScore] = useState(79);
  const [par, setPar] = useState(72);
  const [fairways, setFairways] = useState(9);
  const [gir, setGir] = useState(11);
  const [putts, setPutts] = useState(31);
  const [notes, setNotes] = useState("");

  const totalUnread = conversations.reduce((acc, c) => acc + (c.unreadCount || 0), 0);

  const handleCreateRound = (e: React.FormEvent) => {
    e.preventDefault();
    addRound({
      date: new Date().toISOString().split("T")[0],
      club: clubName,
      holesPlayed: 18,
      grossScore: Number(score),
      netScore: Number(score) - Math.round(user?.handicap || 10),
      toPar: Number(score) - Number(par),
      fairwaysHit: Number(fairways),
      totalFairways: 14,
      greensInRegulation: Number(gir),
      totalPutts: Number(putts),
      penalties: 0,
      partners: [],
      notes
    });
    setShowAddRoundModal(false);
  };

  const recentRounds = rounds.slice(0, 3);
  const userHonours = honours.slice(0, 4);

  // All Platform Features
  const allFeatures = [
    {
      id: "teammate-search",
      title: "1-Click Teammate Search",
      desc: "Instant AI pairing with criteria selection (home club, handicap bracket, tee time) and radar scanning screen.",
      path: "#teammate-search",
      onClick: () => setShowTeammateSearchModal(true),
      icon: Radar,
      badgeText: "⚡ 1-Click Search",
      badgeColor: "bg-amber-100 text-amber-900 border border-amber-200",
      iconBg: "bg-emerald-900 text-amber-300",
      accentBorder: "hover:border-amber-400 ring-2 ring-emerald-500/30",
      category: "play"
    },
    {
      id: "ai-caddie",
      title: "Course Caddie",
      desc: "Hole-by-hole tactical shot strategies adjusted for wind vectors, elevation, and hazard layouts.",
      path: "/ai-caddie",
      icon: Bot,
      badgeText: "Tactical AI",
      badgeColor: "bg-emerald-100 text-emerald-800",
      iconBg: "bg-emerald-100 text-emerald-800",
      accentBorder: "hover:border-emerald-500",
      category: "caddie"
    },
    {
      id: "ai-coach",
      title: "Swing Coach & Drills",
      desc: "Diagnose ball flight faults with tailored drills designed for driving range practice and swing mechanics.",
      path: "/ai-coach",
      icon: Flame,
      badgeText: "Swing Drills",
      badgeColor: "bg-emerald-100 text-emerald-800",
      iconBg: "bg-emerald-100 text-emerald-800",
      accentBorder: "hover:border-emerald-500",
      category: "caddie"
    },
    {
      id: "partners",
      title: "Partner Matchmaker",
      desc: "Find and pair with compatible golfers by handicap range, home club, and tee-time availability.",
      path: "/partners",
      icon: Users,
      badgeText: "Active Matching",
      badgeColor: "bg-emerald-100 text-emerald-800",
      iconBg: "bg-emerald-100 text-emerald-800",
      accentBorder: "hover:border-emerald-500",
      category: "play"
    },
    {
      id: "messages",
      title: "Direct Messages",
      desc: "Coordinate upcoming rounds, group games, and matchplay fixtures in real time.",
      path: "/messages",
      icon: MessageSquare,
      badgeText: totalUnread > 0 ? `${totalUnread} Unread` : "Chat",
      badgeColor: totalUnread > 0 ? "bg-rose-100 text-rose-800" : "bg-slate-100 text-slate-800",
      iconBg: "bg-slate-100 text-slate-800",
      accentBorder: "hover:border-slate-500",
      category: "play"
    },
    {
      id: "marketplace",
      title: "Member Gear Exchange",
      desc: "Buy, sell, or trade drivers, irons, wedges, and bags directly with golfers.",
      path: "/marketplace",
      icon: ShoppingBag,
      badgeText: `${marketplace.length} Listings`,
      badgeColor: "bg-amber-100 text-amber-800",
      iconBg: "bg-amber-100 text-amber-800",
      accentBorder: "hover:border-amber-500",
      category: "play"
    },
    {
      id: "honours",
      title: "Career Honours Showcase",
      desc: "Display verified club tournament trophies, hole-in-one feats, and personal milestones in your trophy room.",
      path: "/profile/honours",
      icon: Award,
      badgeText: `${userHonours.length} Trophies`,
      badgeColor: "bg-indigo-100 text-indigo-800",
      iconBg: "bg-indigo-100 text-indigo-800",
      accentBorder: "hover:border-indigo-500",
      category: "stats"
    },
    {
      id: "leaderboards",
      title: "Rankings & Leaderboards",
      desc: "Stroke averages and monthly Order of Merit standings across courses.",
      path: "/leaderboards",
      icon: Trophy,
      badgeText: "Standings",
      badgeColor: "bg-amber-100 text-amber-800",
      iconBg: "bg-amber-100 text-amber-800",
      accentBorder: "hover:border-amber-500",
      category: "stats"
    },
    {
      id: "rounds",
      title: "Scorecard & Stats Tracker",
      desc: "Log stroke play, fairways hit, greens in regulation (GIR), and putts with handicap trends.",
      path: "/rounds",
      icon: TrendingUp,
      badgeText: `${rounds.length} Rounds Logged`,
      badgeColor: "bg-emerald-100 text-emerald-800",
      iconBg: "bg-emerald-100 text-emerald-800",
      accentBorder: "hover:border-emerald-500",
      category: "stats"
    },
    {
      id: "handicap-calculator",
      title: "WHS Handicap & Slope Calculator",
      desc: "Instant course handicap, format allowances (95% match play), score differentials, and WHS index trends.",
      path: "#handicap-calc",
      onClick: () => {
        const el = document.getElementById("handicap-calc-widget");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      },
      icon: Calculator,
      badgeText: "In-Dashboard Tool",
      badgeColor: "bg-emerald-100 text-emerald-800",
      iconBg: "bg-emerald-100 text-emerald-800",
      accentBorder: "hover:border-emerald-500",
      category: "stats"
    },
    {
      id: "tournaments",
      title: "Tournaments & Events",
      desc: "Browse upcoming club tournaments, view tee schedules, and register online.",
      path: "/tournaments",
      icon: Calendar,
      badgeText: `${tournaments.length} Upcoming`,
      badgeColor: "bg-rose-100 text-rose-800",
      iconBg: "bg-rose-100 text-rose-800",
      accentBorder: "hover:border-rose-500",
      category: "play"
    },
    {
      id: "clubs",
      title: "Course Directory & Telemetry",
      desc: "Comprehensive 18-hole guides, yardages, signature hazards, and weather updates.",
      path: "/clubs",
      icon: MapPin,
      badgeText: "Course Guides",
      badgeColor: "bg-slate-100 text-slate-800",
      iconBg: "bg-slate-100 text-slate-800",
      accentBorder: "hover:border-slate-500",
      category: "play"
    }
  ];

  const filteredFeatures = allFeatures.filter((f) => {
    if (featureCategory === "all") return true;
    return f.category === featureCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Golfer Status Banner */}
      {user ? (
        <div className="bg-emerald-900 text-white rounded-3xl p-6 sm:p-8 shadow-sm border border-emerald-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.fullName}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-400 shrink-0"
              />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-slate-950 text-emerald-400 font-black text-lg flex items-center justify-center border-2 border-emerald-400 shrink-0">
                {user.fullName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-white">
                  Welcome back, {user.fullName}
                </h1>
                <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-emerald-800 text-emerald-200 border border-emerald-700">
                  Verified Golfer
                </span>
              </div>
              <p className="text-xs text-emerald-200 mt-0.5">
                Home Club: <span className="font-semibold text-white">{user.homeClub}</span> · Official Handicap: <span className="font-bold text-white">{user.handicap}</span>
              </p>
              <p className="text-[11px] text-emerald-300 mt-1 max-w-xl">
                {user.preferredTimeSlot || "Morning Preferred"}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => setShowTeammateSearchModal(true)}
              className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-md active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>⚡ Find Teammate</span>
            </button>
            <button
              onClick={() => navigate("/partners")}
              className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Users className="w-4 h-4" />
              <span>All Partners</span>
            </button>
            <button
              onClick={() => setShowAddRoundModal(true)}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Post Score</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/60 text-emerald-300 border border-emerald-800 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Golf Community Platform</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Welcome to Golfly
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Connect with fellow golfers to coordinate matches, view course guides, log scorecards, and exchange equipment.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => navigate("/auth/signup")}
              className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <UserPlus className="w-4 h-4" />
              <span>Create Account</span>
            </button>
            <button
              onClick={() => navigate("/auth/login")}
              className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In</span>
            </button>
          </div>
        </div>
      )}

      {/* Atmospheric Radar & Weather Conditions */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
            <CloudFog className="w-4 h-4 text-slate-600" />
            <span>Atmospheric Conditions & Weather Radar</span>
          </h2>
          <span className="text-xs text-emerald-800 font-bold cursor-pointer hover:underline" onClick={() => navigate("/clubs")}>
            View All Courses &rarr;
          </span>
        </div>
        <WeatherWidget />
      </div>

      {/* Embedded In-Dashboard Handicap & Slope Calculator */}
      <div id="handicap-calc-widget">
        <HandicapCalculator />
      </div>

      {/* Features Hub & Module Switcher */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Golfer Command Center</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Compass className="w-6 h-6 text-emerald-700" />
              <span>Platform Features & Tools</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              All tools, matchmaker features, AI caddies, and course directories are organized and visible below.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-100 rounded-2xl border border-slate-200/80">
            <button
              onClick={() => setFeatureCategory("all")}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                featureCategory === "all"
                  ? "bg-white text-emerald-900 shadow-xs border border-slate-200/60"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
              }`}
            >
              All Features ({allFeatures.length})
            </button>
            <button
              onClick={() => setFeatureCategory("caddie")}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                featureCategory === "caddie"
                  ? "bg-white text-emerald-900 shadow-xs border border-slate-200/60"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
              }`}
            >
              AI Caddie & Coach
            </button>
            <button
              onClick={() => setFeatureCategory("play")}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                featureCategory === "play"
                  ? "bg-white text-emerald-900 shadow-xs border border-slate-200/60"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
              }`}
            >
              Match & Shop
            </button>
            <button
              onClick={() => setFeatureCategory("stats")}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                featureCategory === "stats"
                  ? "bg-white text-emerald-900 shadow-xs border border-slate-200/60"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
              }`}
            >
              Scores & Calculator
            </button>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredFeatures.map((feat: any) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                onClick={() => {
                  if (feat.onClick) {
                    feat.onClick();
                  } else {
                    navigate(feat.path);
                  }
                }}
                className={`bg-slate-50/70 hover:bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs ${feat.accentBorder} hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl ${feat.iconBg} flex items-center justify-center shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${feat.badgeColor}`}>
                      {feat.badgeText}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-emerald-800 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
                <div className="pt-4 mt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-emerald-800">
                  <span>{feat.onClick ? "Use In Dashboard" : "Launch Feature"}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Recent Rounds & Upcoming Tournaments */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2">
        {/* Left Column: Recent Rounds */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-700" />
              <span>Recent Scorecards</span>
            </h2>
            <button
              onClick={() => setShowAddRoundModal(true)}
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Record Round</span>
            </button>
          </div>

          <div className="space-y-3">
            {recentRounds.length > 0 ? (
              recentRounds.map((r) => {
                const diff = r.toPar;
                const diffString = diff > 0 ? `+${diff}` : diff === 0 ? "E" : `${diff}`;
                return (
                  <div
                    key={r.id}
                    className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs flex items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-slate-900">{r.club}</h4>
                        <span className="text-[10px] text-slate-400">{r.date}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        Fairways: {r.fairwaysHit}/{r.totalFairways} · GIR: {r.greensInRegulation}/18 · Putts: {r.totalPutts}
                      </p>
                      {r.notes && (
                        <p className="text-[11px] text-slate-400 italic mt-1 line-clamp-1">
                          "{r.notes}"
                        </p>
                      )}
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-2xl font-black text-slate-900 leading-none block">
                        {r.grossScore}
                      </span>
                      <span
                        className={`text-xs font-bold ${
                          diff <= 4 ? "text-emerald-700" : "text-slate-500"
                        }`}
                      >
                        {diffString} (Net {r.netScore})
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3">
                <TrendingUp className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="text-sm font-semibold text-slate-700">No scorecards logged yet</p>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Record your latest 18-hole or 9-hole round to track your handicap index, fairways hit, and putting stats.
                </p>
                <button
                  onClick={() => setShowAddRoundModal(true)}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Record First Round
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Upcoming Tournaments */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-600" />
              <span>Tournaments & Events</span>
            </h2>
            <button
              onClick={() => navigate("/tournaments")}
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 cursor-pointer"
            >
              All Events &rarr;
            </button>
          </div>

          <div className="space-y-3">
            {tournaments.length > 0 ? (
              tournaments.slice(0, 2).map((t) => (
                <div
                  key={t.id}
                  className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                        {t.format}
                      </span>
                      <span className="text-slate-400">{t.date}</span>
                    </div>
                    <h4 className="font-bold text-sm text-slate-900 mb-1">{t.title}</h4>
                    <p className="text-xs text-slate-500">{t.clubName}</p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-emerald-700">Open Registration</span>
                    <button
                      onClick={() => navigate("/tournaments")}
                      className="text-xs font-bold text-slate-700 hover:text-emerald-800 cursor-pointer"
                    >
                      View Details &rarr;
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3">
                <Calendar className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="text-sm font-semibold text-slate-700">No scheduled tournaments</p>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Check the tournaments tab to organize or view upcoming club medals.
                </p>
                <button
                  onClick={() => navigate("/tournaments")}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Explore Tournaments
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Post Score Modal */}
      {showAddRoundModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-black text-base text-slate-900">Record Round</h3>
              <button
                onClick={() => setShowAddRoundModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateRound} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Golf Course</label>
                <input
                  type="text"
                  required
                  value={clubName}
                  onChange={(e) => setClubName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 bg-white"
                  placeholder="e.g. Pine Valley Golf Club"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Gross Score</label>
                  <input
                    type="number"
                    required
                    value={score}
                    onChange={(e) => setScore(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Course Par</label>
                  <input
                    type="number"
                    required
                    value={par}
                    onChange={(e) => setPar(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Fairways Hit</label>
                  <input
                    type="number"
                    value={fairways}
                    onChange={(e) => setFairways(Number(e.target.value))}
                    className="w-full px-2 py-1.5 rounded-lg border border-slate-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Greens (GIR)</label>
                  <input
                    type="number"
                    value={gir}
                    onChange={(e) => setGir(Number(e.target.value))}
                    className="w-full px-2 py-1.5 rounded-lg border border-slate-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Total Putts</label>
                  <input
                    type="number"
                    value={putts}
                    onChange={(e) => setPutts(Number(e.target.value))}
                    className="w-full px-2 py-1.5 rounded-lg border border-slate-200 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Notes / Conditions</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  placeholder="e.g. Solid driver play, crisp morning conditions"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddRoundModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold uppercase tracking-wider bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl shadow-xs cursor-pointer"
                >
                  Save Scorecard
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 1-Click Teammate Search Modal */}
      <TeammateSearchModal
        isOpen={showTeammateSearchModal}
        onClose={() => setShowTeammateSearchModal(false)}
      />
    </div>
  );
};


