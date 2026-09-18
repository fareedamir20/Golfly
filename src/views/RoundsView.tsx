import React, { useState } from "react";
import { Calendar, Plus, TrendingUp, Flag, CheckCircle2, Trophy } from "lucide-react";
import { useApp } from "../context/AppContext";
import { RoundRecord } from "../types";

export const RoundsView: React.FC = () => {
  const { rounds, addRound, user } = useApp();
  const [showAddRoundModal, setShowAddRoundModal] = useState(false);

  const [club, setClub] = useState(user?.homeClub || "Defence Raya Golf & Country Club");
  const [grossScore, setGrossScore] = useState(82);
  const [par, setPar] = useState(72);
  const [fairwaysHit, setFairwaysHit] = useState(8);
  const [greensInRegulation, setGreensInRegulation] = useState(10);
  const [totalPutts, setTotalPutts] = useState(32);
  const [notes, setNotes] = useState("");

  const handleCreateRound = (e: React.FormEvent) => {
    e.preventDefault();
    addRound({
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      club,
      holesPlayed: 18,
      grossScore: Number(grossScore),
      netScore: Number(grossScore) - Math.round(user?.handicap || 10),
      toPar: Number(grossScore) - Number(par),
      fairwaysHit: Number(fairwaysHit),
      totalFairways: 14,
      greensInRegulation: Number(greensInRegulation),
      totalPutts: Number(totalPutts),
      penalties: 1,
      partners: ["Brig. (R) Tariq Mahmood"],
      notes
    });
    setShowAddRoundModal(false);
  };

  const avgScore = rounds.length ? (rounds.reduce((a, b) => a + b.grossScore, 0) / rounds.length).toFixed(1) : "0";
  const bestScore = rounds.length ? Math.min(...rounds.map((r) => r.grossScore)) : "0";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-2">
            <Calendar className="w-3.5 h-3.5 text-emerald-700" />
            <span>Official Handicap Scoring Registry</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Recorded Rounds & Scorecards
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Track your stroke differentials, greens in regulation, and putting averages across Lahore golf courses.
          </p>
        </div>

        <button
          onClick={() => setShowAddRoundModal(true)}
          className="px-5 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow-xs shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Record New Scorecard</span>
        </button>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
          <span className="text-[11px] font-bold uppercase text-slate-400 block">Rounds Logged</span>
          <span className="text-2xl font-black text-slate-900">{rounds.length}</span>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
          <span className="text-[11px] font-bold uppercase text-slate-400 block">Scoring Average</span>
          <span className="text-2xl font-black text-slate-900">{avgScore}</span>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
          <span className="text-[11px] font-bold uppercase text-slate-400 block">Low Round</span>
          <span className="text-2xl font-black text-emerald-800">{bestScore}</span>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
          <span className="text-[11px] font-bold uppercase text-slate-400 block">Current Handicap</span>
          <span className="text-2xl font-black text-slate-900">{user?.handicap}</span>
        </div>
      </div>

      {/* Rounds List */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="divide-y divide-slate-100">
          {rounds.map((r: RoundRecord) => {
            const diff = r.toPar;
            return (
              <div
                key={r.id}
                className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-base text-slate-900">{r.club}</h3>
                    <span className="text-xs text-slate-400 font-medium">({r.date})</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Fairways: <strong className="text-slate-800">{r.fairwaysHit}/{r.totalFairways}</strong> · GIR: <strong className="text-slate-800">{r.greensInRegulation}/18</strong> · Putts: <strong className="text-slate-800">{r.totalPutts}</strong>
                  </p>
                  {r.notes && (
                    <p className="text-xs text-slate-600 italic mt-1.5">
                      "{r.notes}"
                    </p>
                  )}
                </div>

                <div className="text-right shrink-0">
                  <span className="text-3xl font-black text-slate-900 block leading-none">
                    {r.grossScore}
                  </span>
                  <span
                    className={`text-xs font-bold ${
                      diff <= 4 ? "text-emerald-700" : "text-slate-500"
                    }`}
                  >
                    {diff > 0 ? `+${diff}` : diff === 0 ? "E" : diff} (Net {r.netScore})
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Round Modal */}
      {showAddRoundModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-black text-base text-slate-900">Record Lahore Round</h3>
              <button
                onClick={() => setShowAddRoundModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateRound} className="space-y-3">
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

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Gross Score</label>
                  <input
                    type="number"
                    required
                    value={grossScore}
                    onChange={(e) => setGrossScore(Number(e.target.value))}
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
                    value={fairwaysHit}
                    onChange={(e) => setFairwaysHit(Number(e.target.value))}
                    className="w-full px-2 py-1.5 rounded-lg border border-slate-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Greens (GIR)</label>
                  <input
                    type="number"
                    value={greensInRegulation}
                    onChange={(e) => setGreensInRegulation(Number(e.target.value))}
                    className="w-full px-2 py-1.5 rounded-lg border border-slate-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Total Putts</label>
                  <input
                    type="number"
                    value={totalPutts}
                    onChange={(e) => setTotalPutts(Number(e.target.value))}
                    className="w-full px-2 py-1.5 rounded-lg border border-slate-200 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Notes</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  placeholder="e.g. Tough pin positions, good driver play"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddRoundModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold uppercase tracking-wider bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl shadow-xs"
                >
                  Save Scorecard
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
