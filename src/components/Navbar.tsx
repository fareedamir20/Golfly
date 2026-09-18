import React, { useState } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Users,
  Compass,
  Trophy,
  ShoppingBag,
  Sparkles,
  Award,
  Bot,
  MessageSquare,
  BarChart3,
  Calendar,
  Shield,
  LogOut,
  User,
  Settings,
  Flame,
  Calculator,
  MapPin
} from "lucide-react";
import { GolflyLogo } from "./GolflyLogo";
import { useApp } from "../context/AppContext";

export const Navbar: React.FC = () => {
  const { currentPath, navigate, user, isAuthenticated, logout, conversations } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [featuresDropdownOpen, setFeaturesDropdownOpen] = useState(false);
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const totalUnread = conversations.reduce((acc, c) => acc + (c.unreadCount || 0), 0);

  const handleNav = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
    setFeaturesDropdownOpen(false);
    setCompanyDropdownOpen(false);
    setUserMenuOpen(false);
  };

  const featureLinks = [
    { label: "Features Overview", path: "/features", desc: "Complete capabilities and platform overview", icon: Sparkles },
    { label: "Handicap Calculator", path: "/dashboard", desc: "In-dashboard WHS course handicap & differential calculator", icon: Calculator },
    { label: "Partner Matchmaker", path: "/partners", desc: "Pair by handicap, tee time, and play style", icon: Users },
    { label: "Course Caddie", path: "/ai-caddie", desc: "Hole-by-hole strategy and wind vectors", icon: Bot },
    { label: "Swing Coach & Drills", path: "/ai-coach", desc: "Swing fault diagnosis and range drills", icon: Flame },
    { label: "Tournaments & Medals", path: "/tournaments", desc: "Club medals, shootouts and instant RSVP", icon: Trophy },
    { label: "Member Marketplace", path: "/marketplace", desc: "0% commission peer-to-peer gear exchange", icon: ShoppingBag },
    { label: "Scorecard & Stats", path: "/rounds", desc: "Gross/net scoring and handicap differential", icon: BarChart3 },
    { label: "Rankings & Leaderboards", path: "/leaderboards", desc: "Monthly club and division standings", icon: Award }
  ];

  const navLinks = [
    { label: "Find Club", path: "/clubs" },
    { label: "Tournaments", path: "/tournaments" },
    { label: "Marketplace", path: "/marketplace" }
  ];

  const companyLinks = [
    { label: "Founder", path: "/company/founder", desc: "Founder's note and vision" },
    { label: "Solution", path: "/company/solution", desc: "The unified Golfly platform" },
    { label: "Terms", path: "/company/terms", desc: "Terms of service and fair play" },
    { label: "Privacy", path: "/company/privacy", desc: "Privacy policy & data protection" },
    { label: "About Us", path: "/company/about", desc: "Our mission, vision, and heritage" },
    { label: "Contact", path: "/company/contact", desc: "Support and club liaisons" }
  ];

  const appShortcuts = [
    { label: "Dashboard", path: "/dashboard", icon: Compass },
    { label: "Partner Match", path: "/partners", icon: Users },
    { label: "Course Caddie", path: "/ai-caddie", icon: Bot },
    { label: "Swing Coach", path: "/ai-coach", icon: Flame },
    { label: "Pro Shop", path: "/marketplace", icon: ShoppingBag },
    { label: "Honours Showcase", path: "/profile/honours", icon: Award },
    { label: "Leaderboards", path: "/leaderboards", icon: Trophy },
    { label: "Messages", path: "/messages", icon: MessageSquare, badge: totalUnread }
  ];

  const isFeaturesActive = currentPath === "/features" || (currentPath !== "/" && featureLinks.some(f => f.path === currentPath));

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <button
            onClick={() => handleNav("/")}
            className="flex items-center text-left focus:outline-hidden cursor-pointer"
            id="nav-logo-btn"
          >
            <GolflyLogo size="md" />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => handleNav("/dashboard")}
                  className={`px-3 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                    currentPath === "/dashboard"
                      ? "bg-emerald-800 text-white shadow-xs"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Dashboard</span>
                </button>

                <button
                  onClick={() => handleNav("/clubs")}
                  className={`px-3 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                    currentPath === "/clubs"
                      ? "bg-emerald-800 text-white shadow-xs"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Clubs</span>
                </button>

                <button
                  onClick={() => handleNav("/partners")}
                  className={`px-3 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                    currentPath === "/partners"
                      ? "bg-emerald-800 text-white shadow-xs"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Partner Match</span>
                </button>

                <button
                  onClick={() => handleNav("/ai-caddie")}
                  className={`px-3 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                    currentPath === "/ai-caddie"
                      ? "bg-emerald-800 text-white shadow-xs"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <Bot className="w-3.5 h-3.5 text-emerald-600" />
                  <span>AI Caddie</span>
                </button>

                <button
                  onClick={() => handleNav("/ai-coach")}
                  className={`px-3 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                    currentPath === "/ai-coach"
                      ? "bg-emerald-800 text-white shadow-xs"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  <span>Coach</span>
                </button>

                <button
                  onClick={() => handleNav("/tournaments")}
                  className={`px-3 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                    currentPath === "/tournaments"
                      ? "bg-emerald-800 text-white shadow-xs"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5 text-rose-500" />
                  <span>Tournaments</span>
                </button>

                <button
                  onClick={() => handleNav("/marketplace")}
                  className={`px-3 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                    currentPath === "/marketplace"
                      ? "bg-emerald-800 text-white shadow-xs"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-amber-600" />
                  <span>Pro Shop</span>
                </button>

                <button
                  onClick={() => handleNav("/leaderboards")}
                  className={`px-3 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                    currentPath === "/leaderboards"
                      ? "bg-emerald-800 text-white shadow-xs"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <Trophy className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Rankings</span>
                </button>

                <button
                  onClick={() => handleNav("/messages")}
                  className={`relative p-2 rounded-xl transition-all cursor-pointer ${
                    currentPath === "/messages"
                      ? "bg-emerald-800 text-white"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                  title="Direct Messages"
                >
                  <MessageSquare className="w-4 h-4" />
                  {totalUnread > 0 && (
                    <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-[9px] font-black bg-rose-600 text-white rounded-full">
                      {totalUnread}
                    </span>
                  )}
                </button>

                {/* More Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setCompanyDropdownOpen(!companyDropdownOpen);
                      setFeaturesDropdownOpen(false);
                    }}
                    onBlur={() => setTimeout(() => setCompanyDropdownOpen(false), 200)}
                    className="flex items-center gap-1 px-2.5 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                  >
                    <span>More</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {companyDropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50">
                      <div className="px-3 py-1.5 border-b border-slate-100">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Stats & Tools
                        </span>
                      </div>
                      <button
                        onClick={() => handleNav("/rounds")}
                        className="w-full text-left px-3.5 py-2 text-xs font-bold text-slate-800 hover:bg-emerald-50 flex items-center gap-2"
                      >
                        <BarChart3 className="w-4 h-4 text-emerald-700" />
                        <span>Scorecards & Stats</span>
                      </button>
                      <button
                        onClick={() => handleNav("/profile/honours")}
                        className="w-full text-left px-3.5 py-2 text-xs font-bold text-slate-800 hover:bg-emerald-50 flex items-center gap-2"
                      >
                        <Award className="w-4 h-4 text-amber-500" />
                        <span>Career Honours</span>
                      </button>
                      <button
                        onClick={() => handleNav("/free-promise")}
                        className="w-full text-left px-3.5 py-2 text-xs font-bold text-slate-800 hover:bg-emerald-50 flex items-center gap-2"
                      >
                        <Shield className="w-4 h-4 text-sky-600" />
                        <span>100% Free Guarantee</span>
                      </button>

                      <div className="px-3 py-1.5 border-t border-b border-slate-100 mt-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          About Golfly
                        </span>
                      </div>
                      {companyLinks.slice(0, 4).map((item) => (
                        <button
                          key={item.path}
                          onClick={() => handleNav(item.path)}
                          className="w-full text-left px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center justify-between"
                        >
                          <span>{item.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Public Dropdowns */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setFeaturesDropdownOpen(!featuresDropdownOpen);
                      setCompanyDropdownOpen(false);
                    }}
                    onBlur={() => setTimeout(() => setFeaturesDropdownOpen(false), 200)}
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                      isFeaturesActive
                        ? "text-emerald-800 bg-emerald-50"
                        : "text-slate-600 hover:text-emerald-800 hover:bg-slate-50"
                    }`}
                  >
                    <span>Features</span>
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  </button>

                  {featuresDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-96 bg-white rounded-2xl shadow-xl border border-slate-200 py-2.5 z-50 animate-in fade-in slide-in-from-top-2">
                      <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Platform Capabilities
                        </span>
                        <button
                          onClick={() => handleNav("/features")}
                          className="text-[11px] font-bold text-emerald-800 hover:underline cursor-pointer"
                        >
                          View All Features →
                        </button>
                      </div>
                      <div className="grid grid-cols-1 divide-y divide-slate-50 max-h-[70vh] overflow-y-auto">
                        {featureLinks.map((item) => (
                          <button
                            key={item.path}
                            onClick={() => handleNav(item.path)}
                            className="w-full text-left px-4 py-2.5 hover:bg-emerald-50/80 transition-colors flex items-start gap-3 group cursor-pointer"
                          >
                            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-emerald-800 group-hover:text-white transition-colors">
                              <item.icon className="w-4 h-4" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-xs font-bold text-slate-800 group-hover:text-emerald-800">
                                {item.label}
                              </span>
                              <span className="text-[11px] text-slate-500 line-clamp-1">{item.desc}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {navLinks.map((link) => {
                  const active = currentPath === link.path;
                  return (
                    <button
                      key={link.path}
                      onClick={() => handleNav(link.path)}
                      className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                        active
                          ? "text-emerald-800 bg-emerald-50"
                          : "text-slate-600 hover:text-emerald-800 hover:bg-slate-50"
                      }`}
                    >
                      {link.label}
                    </button>
                  );
                })}

                <div className="relative">
                  <button
                    onClick={() => {
                      setCompanyDropdownOpen(!companyDropdownOpen);
                      setFeaturesDropdownOpen(false);
                    }}
                    onBlur={() => setTimeout(() => setCompanyDropdownOpen(false), 200)}
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                      currentPath.startsWith("/company")
                        ? "text-emerald-800 bg-emerald-50"
                        : "text-slate-600 hover:text-emerald-800 hover:bg-slate-50"
                    }`}
                  >
                    <span>Company</span>
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  </button>

                  {companyDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                      <div className="px-3 py-2 border-b border-slate-100">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          About Golfly
                        </span>
                      </div>
                      {companyLinks.map((item) => (
                        <button
                          key={item.path}
                          onClick={() => handleNav(item.path)}
                          className="w-full text-left px-4 py-2.5 hover:bg-emerald-50 transition-colors flex flex-col group cursor-pointer"
                        >
                          <span className="text-xs font-bold text-slate-800 group-hover:text-emerald-800">
                            {item.label}
                          </span>
                          <span className="text-[11px] text-slate-500">{item.desc}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </nav>

          {/* Right Action: User Menu or Auth CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  onBlur={() => setTimeout(() => setUserMenuOpen(false), 200)}
                  className="flex items-center gap-2.5 p-1.5 pl-2.5 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors border border-slate-200 cursor-pointer"
                >
                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-900 block leading-tight">
                      {user.fullName}
                    </span>
                    <span className="text-[10px] text-emerald-700 font-semibold">
                      Hcp {user.handicap} · {user.homeClub.replace(" Golf & Country Club", "").replace(" Golf Club", "")}
                    </span>
                  </div>
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.fullName}
                      className="w-8 h-8 rounded-full object-cover border border-emerald-600"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-slate-900 text-emerald-400 font-bold text-xs flex items-center justify-center border border-slate-800 shrink-0">
                      {user.fullName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
                    </div>
                  )}
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900">{user.fullName}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                      <div className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900">
                        <span>Golfly Member</span>
                      </div>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => handleNav("/profile")}
                        className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 cursor-pointer"
                      >
                        <User className="w-4 h-4 text-slate-400" />
                        My Golfer Profile
                      </button>
                      <button
                        onClick={() => handleNav("/profile/honours")}
                        className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 cursor-pointer"
                      >
                        <Award className="w-4 h-4 text-amber-500" />
                        Career Honours Showcase
                      </button>
                      <button
                        onClick={() => handleNav("/leaderboards")}
                        className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 cursor-pointer"
                      >
                        <Trophy className="w-4 h-4 text-emerald-600" />
                        Club Leaderboards
                      </button>
                      <button
                        onClick={() => handleNav("/rounds")}
                        className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 cursor-pointer"
                      >
                        <Calendar className="w-4 h-4 text-slate-400" />
                        Recorded Rounds & Scores
                      </button>
                      <button
                        onClick={() => handleNav("/analytics")}
                        className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 cursor-pointer"
                      >
                        <BarChart3 className="w-4 h-4 text-slate-400" />
                        Performance & Trends
                      </button>
                      <button
                        onClick={() => handleNav("/settings")}
                        className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 cursor-pointer"
                      >
                        <Settings className="w-4 h-4 text-slate-400" />
                        Settings & Notifications
                      </button>
                    </div>

                    <div className="border-t border-slate-100 pt-1">
                      <button
                        onClick={logout}
                        className="w-full text-left px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2.5 cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNav("/auth/login")}
                  className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-emerald-900 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  onClick={() => handleNav("/auth/signup")}
                  className="px-4 py-2 text-sm font-bold text-white bg-emerald-800 hover:bg-emerald-700 rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Sign Up</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={() => handleNav("/dashboard")}
                className="px-2.5 py-1 text-xs font-bold bg-emerald-800 text-white rounded-lg"
              >
                App
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 max-h-[85vh] overflow-y-auto">
          {isAuthenticated && user && (
            <div className="mb-4 pb-4 border-b border-slate-100 flex items-center gap-3">
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.fullName}
                  className="w-10 h-10 rounded-full object-cover border border-emerald-600"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-slate-900 text-emerald-400 font-bold text-xs flex items-center justify-center border border-slate-800 shrink-0">
                  {user.fullName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
                </div>
              )}
              <div>
                <div className="font-bold text-sm text-slate-900">{user.fullName}</div>
                <div className="text-xs text-emerald-700 font-semibold">
                  Handicap {user.handicap} · {user.homeClub}
                </div>
              </div>
            </div>
          )}

          {isAuthenticated && (
            <div className="mb-4">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                Golfly App Modules
              </p>
              <div className="grid grid-cols-2 gap-2">
                {appShortcuts.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => handleNav(item.path)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-bold text-left transition-colors cursor-pointer ${
                      currentPath === item.path
                        ? "bg-emerald-800 text-white"
                        : "bg-slate-50 text-slate-700 hover:bg-emerald-50 hover:text-emerald-900"
                    }`}
                  >
                    <item.icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-1 mb-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Platform Features
            </p>
            {featureLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleNav(link.path)}
                className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2.5 cursor-pointer ${
                  currentPath === link.path
                    ? "text-emerald-800 bg-emerald-50 font-bold"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <link.icon className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span className="truncate">{link.label}</span>
              </button>
            ))}
          </div>

          <div className="space-y-1 mb-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Courses & Tournaments
            </p>
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleNav(link.path)}
                className={`w-full text-left px-3 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                  currentPath === link.path
                    ? "text-emerald-800 bg-emerald-50"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="space-y-1 mb-6">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Company Sub-Tabs
            </p>
            {companyLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleNav(link.path)}
                className={`w-full text-left px-3 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  currentPath === link.path
                    ? "text-emerald-800 bg-emerald-50 font-bold"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            {isAuthenticated ? (
              <button
                onClick={logout}
                className="w-full py-2.5 rounded-xl bg-rose-50 text-rose-700 text-xs font-bold text-center cursor-pointer"
              >
                Sign Out
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleNav("/auth/login")}
                  className="w-full py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold text-center cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  onClick={() => handleNav("/auth/signup")}
                  className="w-full py-2.5 rounded-xl bg-emerald-800 text-white text-xs font-bold text-center cursor-pointer"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
