import React, { useState } from "react";
import {
  Trophy,
  Calendar,
  Clock,
  MapPin,
  Users,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Filter,
  Plus,
  X
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { Tournament } from "../types";

export const TournamentsView: React.FC = () => {
  const { tournaments, rsvpTournament, addTournament, user } = useApp();
  const [selectedClub, setSelectedClub] = useState<string>("all");
  const [activeModalTourn, setActiveModalTourn] = useState<Tournament | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New Tournament state
  const [newTitle, setNewTitle] = useState("");
  const [newClubName, setNewClubName] = useState("Defence Raya Golf & Country Club");
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("07:30 AM Shotgun");
  const [newFormat, setNewFormat] = useState<"Stroke Play" | "Stableford" | "Scramble" | "Four-Ball" | "Match Play">("Stroke Play");
  const [newTotalSlots, setNewTotalSlots] = useState(72);
  const [newEligibility, setNewEligibility] = useState("All Member Golfers (Hcp 0 - 24)");
  const [newDesc, setNewDesc] = useState("");
  const [newOrganizer, setNewOrganizer] = useState("Tournament Committee");

  const filtered = tournaments.filter((t) => {
    if (selectedClub === "all") return true;
    return t.clubId === selectedClub || t.clubName.toLowerCase().includes(selectedClub.toLowerCase());
  });

  const handleCreateTournament = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDate) return;

    addTournament({
      title: newTitle,
      clubId: newClubName.toLowerCase().includes("raya") ? "defence-raya" : newClubName.toLowerCase().includes("garrison") ? "lahore-garrison" : "lahore-gymkhana",
      clubName: newClubName,
      date: newDate,
      time: newTime,
      format: newFormat,
      isFreeRegistration: true,
      eligibility: newEligibility,
      totalSlots: Number(newTotalSlots),
      description: newDesc || "Club medal competition and merit points fixture.",
      prizes: ["1st Gross Winner Silverware", "1st Net Winner Trophy", "Runner Up"],
      rules: ["R&A Rules of Golf Apply", "Local Course Rules apply", "Strict Pace of Play"],
      organizer: newOrganizer
    });

    setNewTitle("");
    setNewDesc("");
    setShowCreateModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-2">
            <Trophy className="w-3.5 h-3.5 text-emerald-700" />
            <span>Tournament Registry</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Golf Tournaments & Fixtures
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Direct RSVP, registration, and schedules for club championships, monthly medals, and member fixtures.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Post Tournament</span>
          </button>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setSelectedClub("all")}
          className={`px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
            selectedClub === "all"
              ? "bg-emerald-800 text-white shadow-xs"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          All Tournaments ({tournaments.length})
        </button>
        <button
          onClick={() => setSelectedClub("defence-raya")}
          className={`px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
            selectedClub === "defence-raya"
              ? "bg-emerald-800 text-white shadow-xs"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          Defence Raya
        </button>
        <button
          onClick={() => setSelectedClub("lahore-garrison")}
          className={`px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
            selectedClub === "lahore-garrison"
              ? "bg-emerald-800 text-white shadow-xs"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          Lahore Garrison
        </button>
        <button
          onClick={() => setSelectedClub("lahore-gymkhana")}
          className={`px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
            selectedClub === "lahore-gymkhana"
              ? "bg-emerald-800 text-white shadow-xs"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          Lahore Gymkhana (1878)
        </button>
        <button
          onClick={() => setSelectedClub("royal-palm")}
          className={`px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
            selectedClub === "royal-palm"
              ? "bg-emerald-800 text-white shadow-xs"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          Royal Palm
        </button>
      </div>

      {/* Tournaments Grid or Empty State */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto mb-4 border border-emerald-100">
            <Trophy className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">No Tournaments Scheduled</h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-6">
            There are currently no active tournament fixtures in this view. Post a new club event or member matchplay fixture.
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            Create Tournament Fixture
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((t) => {
            const isRegistered = user ? t.registeredUsers.includes(user.id) : false;
            const slotsRemaining = t.totalSlots - t.registeredCount;

            return (
              <div
                key={t.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-all p-6 sm:p-8 flex flex-col justify-between"
              >
                <div>
                  {/* Badges */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-900 px-3 py-1 rounded-md">
                      {t.format}
                    </span>
                    <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                      {slotsRemaining} Slots Left
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-slate-900 mb-2 leading-tight">
                    {t.title}
                  </h3>
                  <p className="text-xs font-medium text-emerald-800 flex items-center gap-1.5 mb-4">
                    <MapPin className="w-4 h-4 shrink-0" />
                    {t.clubName}
                  </p>

                  <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                    {t.description}
                  </p>

                  {/* Details box */}
                  <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 mb-6 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        Date:
                      </span>
                      <span className="font-bold text-slate-900">{t.date}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        Tee Off:
                      </span>
                      <span className="font-bold text-slate-900">{t.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        Eligibility:
                      </span>
                      <span className="font-semibold text-slate-700 text-right max-w-[200px] truncate">
                        {t.eligibility}
                      </span>
                    </div>
                  </div>

                  {/* Prizes snippet */}
                  {t.prizes && t.prizes.length > 0 && (
                    <div className="mb-6">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                        Silverware & Honours:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {t.prizes.map((prize, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] font-semibold bg-amber-50 text-amber-900 border border-amber-200/80 px-2.5 py-0.5 rounded-md"
                          >
                            {prize}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Action buttons */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setActiveModalTourn(t)}
                    className="text-xs font-bold text-slate-600 hover:text-slate-900 underline cursor-pointer"
                  >
                    Rules & Schedule
                  </button>

                  <button
                    onClick={() => rsvpTournament(t.id)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                      isRegistered
                        ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                        : "bg-emerald-800 hover:bg-emerald-700 text-white shadow-xs"
                    }`}
                  >
                    {isRegistered ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                        <span>RSVP Confirmed</span>
                      </>
                    ) : (
                      <>
                        <span>Register RSVP</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create Tournament Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Post Tournament Fixture</h3>
                <p className="text-xs text-slate-500">Publish an official medal, invitational or member matchplay event</p>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTournament} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tournament Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Autumn Monthly Medal Flight A & B"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Host Club</label>
                <select
                  value={newClubName}
                  onChange={(e) => setNewClubName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="Defence Raya Golf & Country Club">Defence Raya Golf & Country Club</option>
                  <option value="Lahore Garrison Golf & Country Club">Lahore Garrison Golf & Country Club</option>
                  <option value="Lahore Gymkhana Golf Club">Lahore Gymkhana Golf Club</option>
                  <option value="Royal Palm Golf & Country Club">Royal Palm Golf & Country Club</option>
                  <option value="PAF Skyview Golf & Country Club">PAF Skyview Golf & Country Club</option>
                  <option value="The Oasis Golf & Aqua Resort">The Oasis Golf & Aqua Resort</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tee Off Time</label>
                  <input
                    type="text"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    placeholder="07:30 AM Shotgun"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Format</label>
                  <select
                    value={newFormat}
                    onChange={(e) => setNewFormat(e.target.value as "Stroke Play" | "Stableford" | "Scramble" | "Four-Ball" | "Match Play")}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden bg-white"
                  >
                    <option value="Stroke Play">Stroke Play</option>
                    <option value="Stableford">Stableford</option>
                    <option value="Scramble">Scramble</option>
                    <option value="Four-Ball">Four-Ball</option>
                    <option value="Match Play">Match Play</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Total Player Slots</label>
                  <input
                    type="number"
                    min="4"
                    max="144"
                    value={newTotalSlots}
                    onChange={(e) => setNewTotalSlots(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Eligibility Criteria</label>
                <input
                  type="text"
                  value={newEligibility}
                  onChange={(e) => setNewEligibility(e.target.value)}
                  placeholder="e.g. Club Members with verified handicap (0 - 24)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description & Regulations</label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Details regarding registration, handicap cutoffs, banquet and prizes..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Publish Tournament
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Rules & Schedule Modal */}
      {activeModalTourn && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-md">
                  Tournament Regulations
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1">
                  {activeModalTourn.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalTourn(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <h4 className="font-bold text-slate-900 mb-1.5">Host Course & Organization:</h4>
                <p className="text-slate-600">
                  {activeModalTourn.clubName} · Organized by {activeModalTourn.organizer}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1.5">Tournament Rules:</h4>
                <ul className="space-y-1.5 text-slate-700">
                  {activeModalTourn.rules.map((r, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3">
                <span className="font-bold text-emerald-950 block mb-1">
                  Registration Note:
                </span>
                <p className="text-emerald-800 text-[11px]">
                  Confirm your attendance to receive updates from the club tournament committee.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                onClick={() => setActiveModalTourn(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  rsvpTournament(activeModalTourn.id);
                  setActiveModalTourn(null);
                }}
                className="px-5 py-2 text-xs font-bold uppercase tracking-wider bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl cursor-pointer"
              >
                Confirm RSVP
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
