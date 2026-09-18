import React, { useState } from "react";
import {
  Users,
  Search,
  Filter,
  CheckCircle2,
  MapPin,
  MessageSquare,
  Sparkles,
  Send,
  Calendar,
  Compass,
  ArrowRight,
  UserPlus,
  Radar,
  X
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { GolferPartner } from "../types";
import { TeammateSearchModal } from "../components/TeammateSearchModal";

export const PartnersView: React.FC = () => {
  const { partners, addPartner, user, navigate, startChatWithPartner, sendFriendRequest, friends, pendingFriendRequests } = useApp();
  const [selectedClub, setSelectedClub] = useState<string>("all");
  const [handicapRange, setHandicapRange] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [invitedPartnerId, setInvitedPartnerId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  // New partner state
  const [newPartnerName, setNewPartnerName] = useState("");
  const [newPartnerClub, setNewPartnerClub] = useState("Defence Raya Golf & Country Club");
  const [newPartnerHandicap, setNewPartnerHandicap] = useState(12.0);
  const [newPartnerTime, setNewPartnerTime] = useState("Morning (7:00 - 9:00 AM)");
  const [newPartnerStyle, setNewPartnerStyle] = useState("Casual Weekend");
  const [newPartnerBio, setNewPartnerBio] = useState("");

  const filteredPartners = partners.filter((p: GolferPartner) => {
    if (selectedClub !== "all" && !p.homeClub.toLowerCase().includes(selectedClub.toLowerCase())) {
      return false;
    }
    if (handicapRange !== "all") {
      if (handicapRange === "low" && p.handicap > 5) return false;
      if (handicapRange === "mid-low" && (p.handicap < 5 || p.handicap > 12)) return false;
      if (handicapRange === "mid" && (p.handicap < 12 || p.handicap > 18)) return false;
      if (handicapRange === "high" && p.handicap < 18) return false;
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        p.fullName.toLowerCase().includes(q) ||
        p.homeClub.toLowerCase().includes(q) ||
        p.bio.toLowerCase().includes(q) ||
        p.playingStyle.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleInvite = (targetPartner: GolferPartner) => {
    setInvitedPartnerId(targetPartner.id);
    sendFriendRequest(targetPartner.id);
    setTimeout(() => setInvitedPartnerId(null), 3000);
  };

  const handleMessage = (targetPartner: GolferPartner) => {
    startChatWithPartner(targetPartner);
    navigate("/messages");
  };

  const handleCreatePartner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPartnerName) return;

    addPartner({
      fullName: newPartnerName,
      avatarUrl: "",
      homeClub: newPartnerClub,
      handicap: Number(newPartnerHandicap),
      distanceKm: 4.2,
      preferredTiming: newPartnerTime,
      availableDays: ["Saturday", "Sunday"],
      playingStyle: newPartnerStyle,
      bio: newPartnerBio || "Looking forward to great 4-ball weekend matches and friendly competition.",
      compatibilityScore: 90 + Math.floor(Math.random() * 8),
      pastRoundsTogether: 0,
      recentActivity: "Joined Golfly"
    });

    setNewPartnerName("");
    setNewPartnerBio("");
    setShowAddModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-2">
            <Users className="w-3.5 h-3.5 text-emerald-700" />
            <span>Matchmaking Engine</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Find Golf Partners
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Match with golfers by handicap index, home club, and tee-time availability.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowSearchModal(true)}
            className="px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-md cursor-pointer hover:scale-105 active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
            <span>⚡ 1-Click Teammate Search</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Partner Profile</span>
          </button>
        </div>
      </div>

      {/* 1-Click Teammate Matchmaker Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 border border-emerald-800 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-2 max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider">
            <Radar className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>Instant Radar Matchmaking</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Need a Teammate for This Weekend?
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100">
            Select your home club, handicap range, and preferred tee time. Our 1-click radar scans active golfers in Lahore and presents your best matches with live searching screens.
          </p>
        </div>

        <button
          onClick={() => setShowSearchModal(true)}
          className="px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-xl hover:shadow-2xl shrink-0 active:scale-95 relative z-10"
        >
          <Sparkles className="w-4 h-4 text-slate-950" />
          <span>⚡ Launch 1-Click Search</span>
        </button>
      </div>

      {/* Filter Controls Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by golfer name, club, or playing style..."
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
          </div>

          {/* Club Filter */}
          <div>
            <select
              value={selectedClub}
              onChange={(e) => setSelectedClub(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 bg-white"
            >
              <option value="all">All Member Courses</option>
              <option value="Raya">Defence Raya Golf Club</option>
              <option value="Garrison">Lahore Garrison Golf Club</option>
              <option value="Gymkhana">Lahore Gymkhana (1878)</option>
              <option value="Royal Palm">Royal Palm Golf & Country Club</option>
              <option value="Skyview">PAF Skyview Golf Club</option>
              <option value="Oasis">The Oasis Golf & Aqua Resort</option>
            </select>
          </div>

          {/* Handicap Bracket */}
          <div>
            <select
              value={handicapRange}
              onChange={(e) => setHandicapRange(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 bg-white"
            >
              <option value="all">All Handicap Brackets</option>
              <option value="low">Scratch to 5 (Single Digit)</option>
              <option value="mid-low">Handicap 6 to 12 (Competitive)</option>
              <option value="mid">Handicap 13 to 18 (Regular Weekend)</option>
              <option value="high">Handicap 19+ (Casual & Improvers)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Partners Grid or Empty State */}
      {filteredPartners.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto mb-4 border border-emerald-100">
            <Users className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">No Golf Partners Found</h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-6">
            {searchQuery || selectedClub !== "all" || handicapRange !== "all"
              ? "No players matched your active filters. Try clearing filters or search terms."
              : "No partner profiles have been registered yet. Add a golfer profile or invite your playing buddies to get started."}
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Add First Partner Profile
            </button>
            {(searchQuery || selectedClub !== "all" || handicapRange !== "all") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedClub("all");
                  setHandicapRange("all");
                }}
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPartners.map((p: GolferPartner) => {
            const isInvited = invitedPartnerId === p.id || pendingFriendRequests.includes(p.id);
            const isFriend = friends.includes(p.id);

            return (
              <div
                key={p.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top header with compat badge */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      {p.avatarUrl ? (
                        <img
                          src={p.avatarUrl}
                          alt={p.fullName}
                          className="w-12 h-12 rounded-2xl object-cover border border-slate-200"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-2xl bg-slate-900 text-emerald-400 font-black text-sm flex items-center justify-center border border-slate-800 shrink-0">
                          {p.fullName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
                        </div>
                      )}
                      <div>
                        <h3 className="font-bold text-sm text-slate-900 leading-tight">
                          {p.fullName}
                        </h3>
                        <p className="text-[11px] text-emerald-800 font-semibold flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-emerald-600" />
                          {p.homeClub.replace(" Golf & Country Club", "").replace(" Golf Club", "")}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-black text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md inline-block">
                        {p.compatibilityScore}% Match
                      </span>
                      <span className="block text-[10px] text-slate-400 mt-0.5">
                        Hcp {p.handicap}
                      </span>
                    </div>
                  </div>

                  {/* Bio quote */}
                  <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                    "{p.bio}"
                  </p>

                  {/* Playing details */}
                  <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3 mb-4 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-slate-600">
                      <span className="text-[11px] text-slate-400">Time Slot:</span>
                      <span className="font-semibold text-slate-800 text-[11px] truncate max-w-[180px]">
                        {p.preferredTiming}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-600">
                      <span className="text-[11px] text-slate-400">Playing Style:</span>
                      <span className="font-semibold text-slate-800 text-[11px] truncate max-w-[180px]">
                        {p.playingStyle}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleMessage(p)}
                    className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                    <span>Chat</span>
                  </button>

                  <button
                    onClick={() => handleInvite(p)}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      isFriend
                        ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                        : isInvited
                        ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                        : "bg-emerald-800 hover:bg-emerald-700 text-white shadow-xs"
                    }`}
                  >
                    {isFriend ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Regular Partner</span>
                      </>
                    ) : isInvited ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Invitation Sent!</span>
                      </>
                    ) : (
                      <>
                        <Users className="w-3.5 h-3.5" />
                        <span>Invite to 4-Ball</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Partner Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Add Golfer Profile</h3>
                <p className="text-xs text-slate-500">Register a playing buddy or local golfer to your partner list</p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePartner} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Golfer Full Name</label>
                <input
                  type="text"
                  required
                  value={newPartnerName}
                  onChange={(e) => setNewPartnerName(e.target.value)}
                  placeholder="e.g. Asad Malik"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Home Club</label>
                  <select
                    value={newPartnerClub}
                    onChange={(e) => setNewPartnerClub(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 bg-white"
                  >
                    <option value="Defence Raya Golf & Country Club">Defence Raya</option>
                    <option value="Lahore Garrison Golf & Country Club">Lahore Garrison</option>
                    <option value="Lahore Gymkhana Golf Club">Lahore Gymkhana</option>
                    <option value="Royal Palm Golf & Country Club">Royal Palm</option>
                    <option value="PAF Skyview Golf & Country Club">PAF Skyview</option>
                    <option value="The Oasis Golf & Aqua Resort">The Oasis</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Handicap Index</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="36"
                    required
                    value={newPartnerHandicap}
                    onChange={(e) => setNewPartnerHandicap(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Time Slot</label>
                <input
                  type="text"
                  value={newPartnerTime}
                  onChange={(e) => setNewPartnerTime(e.target.value)}
                  placeholder="e.g. Early Morning (6:30 - 8:30 AM)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Playing Style</label>
                <input
                  type="text"
                  value={newPartnerStyle}
                  onChange={(e) => setNewPartnerStyle(e.target.value)}
                  placeholder="e.g. Friendly matchplay, fast walker"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Bio / Note</label>
                <textarea
                  rows={2}
                  value={newPartnerBio}
                  onChange={(e) => setNewPartnerBio(e.target.value)}
                  placeholder="Brief note on player goals or preferred game formats..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Save Partner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 1-Click Teammate Search Modal */}
      <TeammateSearchModal
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
      />
    </div>
  );
};
