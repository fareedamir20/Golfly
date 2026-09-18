import React, { useState } from "react";
import {
  Award,
  Trophy,
  Sparkles,
  Plus,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  MapPin,
  Flame,
  Star,
  Target,
  Medal,
  Flag
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { CareerHonour } from "../types";

export const HonoursView: React.FC = () => {
  const { honours, addHonour, user } = useApp();
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [showAddModal, setShowAddModal] = useState(false);

  // Add Honour Form States
  const [title, setTitle] = useState("");
  const [tournamentOrEvent, setTournamentOrEvent] = useState("");
  const [club, setClub] = useState(user?.homeClub || "Defence Raya Golf & Country Club");
  const [year, setYear] = useState<number>(2025);
  const [category, setCategory] = useState<CareerHonour["category"]>("Championship Winner");
  const [trophyIcon, setTrophyIcon] = useState<CareerHonour["trophyIcon"]>("trophy");
  const [notes, setNotes] = useState("");

  const filteredHonours = honours.filter((h) => {
    if (filterCategory === "all") return true;
    return h.category.toLowerCase().includes(filterCategory.toLowerCase());
  });

  const handleAddHonour = (e: React.FormEvent) => {
    e.preventDefault();
    addHonour({
      title,
      tournamentOrEvent,
      club,
      year: Number(year),
      category,
      trophyIcon,
      notes
    });
    setShowAddModal(false);
    setTitle("");
    setTournamentOrEvent("");
    setNotes("");
  };

  const getIcon = (iconName: CareerHonour["trophyIcon"]) => {
    switch (iconName) {
      case "trophy": return Trophy;
      case "medal": return Medal;
      case "award": return Award;
      case "target": return Target;
      case "flag": return Flag;
      case "star": return Star;
      default: return Trophy;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
            <Trophy className="w-3.5 h-3.5 text-amber-700" />
            <span>Digital Silverware & Trophy Room</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Career Honours & Ace Registry
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            A permanent digital showcase celebrating tournament victories, legendary holes-in-one, and club distinction honours across Lahore.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-3 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow-xs shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Record Career Honour</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setFilterCategory("all")}
          className={`px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
            filterCategory === "all"
              ? "bg-slate-900 text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          All Career Silverware ({honours.length})
        </button>
        <button
          onClick={() => setFilterCategory("Hole-in-One")}
          className={`px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
            filterCategory === "Hole-in-One"
              ? "bg-slate-900 text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          Holes-in-One (Aces)
        </button>
        <button
          onClick={() => setFilterCategory("Championship")}
          className={`px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
            filterCategory === "Championship"
              ? "bg-slate-900 text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          Championship Victories
        </button>
        <button
          onClick={() => setFilterCategory("Captain")}
          className={`px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
            filterCategory === "Captain"
              ? "bg-slate-900 text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          Captain's Prizes
        </button>
        <button
          onClick={() => setFilterCategory("Longest")}
          className={`px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
            filterCategory === "Longest"
              ? "bg-slate-900 text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          Longest Drive & Pin
        </button>
      </div>

      {/* Honours Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHonours.map((h) => {
          const IconComp = getIcon(h.trophyIcon);

          return (
            <div
              key={h.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-all p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden"
            >
              {/* Subtle metallic gradient accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md border flex items-center gap-1.5 bg-amber-50 text-amber-900 border-amber-200">
                    <IconComp className="w-3.5 h-3.5 text-amber-700" />
                    {h.category}
                  </span>
                  <span className="text-xs font-black text-slate-400">{h.year}</span>
                </div>

                <h3 className="font-black text-lg text-slate-900 mb-1 leading-snug">
                  {h.title}
                </h3>
                <p className="text-xs text-emerald-800 font-semibold flex items-center gap-1 mb-2">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  {h.club}
                </p>
                <span className="text-[11px] text-slate-400 font-medium block mb-3">
                  Event: {h.tournamentOrEvent}
                </span>

                <p className="text-xs text-slate-600 leading-relaxed mb-5">
                  {h.notes}
                </p>
              </div>

              {/* Verified attestation footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Attested by Club
                </span>
                <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-md">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified Record
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Record Honour Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-black text-lg text-slate-900">Certify Career Honour</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddHonour} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Honour Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Flight B Gross Champion or Hole-in-One Hole #7"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tournament or Event Name</label>
                <input
                  type="text"
                  required
                  value={tournamentOrEvent}
                  onChange={(e) => setTournamentOrEvent(e.target.value)}
                  placeholder="e.g. Defence Raya Annual Club Championship or Sunday Medal"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                  >
                    <option value="Championship Winner">Championship Winner</option>
                    <option value="Club Captain Prize">Club Captain Prize</option>
                    <option value="Hole-in-One">Hole-in-One (Ace)</option>
                    <option value="Gross Winner">Gross Winner</option>
                    <option value="Net Winner">Net Winner</option>
                    <option value="Longest Drive">Longest Drive</option>
                    <option value="Nearest the Pin">Nearest the Pin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Year Achieved</label>
                  <input
                    type="number"
                    required
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Lahore Golf Course</label>
                <select
                  value={club}
                  onChange={(e) => setClub(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                >
                  <option value="Defence Raya Golf & Country Club">Defence Raya Golf & Country Club</option>
                  <option value="Lahore Garrison Golf & Country Club">Lahore Garrison Golf & Country Club</option>
                  <option value="Lahore Gymkhana Golf Club">Lahore Gymkhana Golf Club</option>
                  <option value="Royal Palm Golf & Country Club">Royal Palm Golf & Country Club</option>
                  <option value="PAF Skyview Golf & Country Club">PAF Skyview Golf & Country Club</option>
                  <option value="The Oasis Golf & Aqua Resort">The Oasis Golf & Aqua Resort</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Trophy Icon</label>
                <select
                  value={trophyIcon}
                  onChange={(e) => setTrophyIcon(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                >
                  <option value="trophy">Trophy</option>
                  <option value="target">Bullseye / Target (Ace)</option>
                  <option value="medal">Medal</option>
                  <option value="award">Award Plaque</option>
                  <option value="flag">Flagstick</option>
                  <option value="star">Star Distinction</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Shot Notes / Scores / Playing Partners</label>
                <textarea
                  rows={3}
                  required
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Carded 78 in final round, or struck smooth 6-iron 174 yards into cup witnessed by 4-ball..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider bg-amber-700 hover:bg-amber-800 text-white rounded-xl shadow-xs cursor-pointer"
                >
                  Enshrine in Trophy Room
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
