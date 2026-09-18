import React, { useState, useMemo } from "react";
import {
  Calculator,
  Sliders,
  CheckCircle2,
  Info,
  TrendingUp,
  Award,
  Sparkles,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Check
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { LAHORE_CLUBS } from "../data/clubs";

interface TeeConfig {
  id: string;
  name: string;
  rating: number;
  slope: number;
  par: number;
  colorClass: string;
}

const CLUB_TEES: Record<string, TeeConfig[]> = {
  "Defence Raya Golf & Country Club": [
    { id: "championship", name: "Black / Championship", rating: 74.6, slope: 138, par: 72, colorClass: "bg-slate-900 text-white" },
    { id: "white", name: "White / Regular Men", rating: 72.4, slope: 132, par: 72, colorClass: "bg-slate-200 text-slate-800" },
    { id: "red", name: "Red / Forward", rating: 70.8, slope: 122, par: 72, colorClass: "bg-rose-100 text-rose-800" }
  ],
  "Lahore Garrison Golf & Country Club": [
    { id: "championship", name: "Blue / Championship", rating: 73.9, slope: 134, par: 72, colorClass: "bg-blue-900 text-white" },
    { id: "white", name: "White / Regular Men", rating: 71.8, slope: 128, par: 72, colorClass: "bg-slate-200 text-slate-800" },
    { id: "red", name: "Red / Forward", rating: 70.2, slope: 120, par: 72, colorClass: "bg-rose-100 text-rose-800" }
  ],
  "Lahore Gymkhana Golf Club": [
    { id: "championship", name: "Blue / Championship", rating: 73.0, slope: 130, par: 72, colorClass: "bg-blue-900 text-white" },
    { id: "white", name: "White / Regular Men", rating: 71.2, slope: 126, par: 72, colorClass: "bg-slate-200 text-slate-800" },
    { id: "red", name: "Red / Forward", rating: 69.8, slope: 118, par: 72, colorClass: "bg-rose-100 text-rose-800" }
  ],
  "Royal Palm Golf & Country Club": [
    { id: "championship", name: "Gold / Championship", rating: 74.2, slope: 136, par: 72, colorClass: "bg-amber-600 text-white" },
    { id: "white", name: "White / Regular Men", rating: 72.0, slope: 130, par: 72, colorClass: "bg-slate-200 text-slate-800" },
    { id: "red", name: "Red / Forward", rating: 70.5, slope: 121, par: 72, colorClass: "bg-rose-100 text-rose-800" }
  ],
  "Oasis Golf & Aqua Resort": [
    { id: "white", name: "Standard Tees", rating: 69.8, slope: 118, par: 70, colorClass: "bg-slate-200 text-slate-800" }
  ],
  "PAF Skyview Golf Club": [
    { id: "white", name: "White / Men", rating: 71.0, slope: 124, par: 72, colorClass: "bg-slate-200 text-slate-800" }
  ]
};

const DEFAULT_TEES: TeeConfig[] = [
  { id: "standard", name: "Standard White Tees", rating: 72.0, slope: 125, par: 72, colorClass: "bg-slate-200 text-slate-800" }
];

export const HandicapCalculator: React.FC = React.memo(() => {
  const { user, rounds, updateUser } = useApp();
  const [activeTab, setActiveTab] = useState<"course" | "differential" | "whs">("course");
  const [isExpanded, setIsExpanded] = useState(true);

  // Course Handicap State
  const [selectedClub, setSelectedClub] = useState<string>(user?.homeClub || LAHORE_CLUBS[0].name);
  const availableTees = CLUB_TEES[selectedClub] || DEFAULT_TEES;
  const [selectedTeeId, setSelectedTeeId] = useState<string>(availableTees[0]?.id || "white");
  const currentTee = availableTees.find(t => t.id === selectedTeeId) || availableTees[0];

  const [handicapIndex, setHandicapIndex] = useState<number>(user?.handicap ?? 12.0);
  const [customRating, setCustomRating] = useState<number>(currentTee.rating);
  const [customSlope, setCustomSlope] = useState<number>(currentTee.slope);
  const [customPar, setCustomPar] = useState<number>(currentTee.par);
  const [formatAllowance, setFormatAllowance] = useState<number>(100); // 100% stroke, 95% match play

  // Score Differential State
  const [diffGrossScore, setDiffGrossScore] = useState<number>(82);
  const [diffRating, setDiffRating] = useState<number>(72.0);
  const [diffSlope, setDiffSlope] = useState<number>(128);
  const [diffPCC, setDiffPCC] = useState<number>(0);

  // Sync notice
  const [syncedNotice, setSyncedNotice] = useState(false);

  // Calculate Course Handicap: Index * (Slope / 113) + (Course Rating - Par)
  const courseHandicapExact = useMemo(() => {
    const slope = customSlope || 113;
    const rating = customRating || 72;
    const par = customPar || 72;
    return handicapIndex * (slope / 113) + (rating - par);
  }, [handicapIndex, customSlope, customRating, customPar]);

  const courseHandicapRounded = Math.round(courseHandicapExact);
  const playingHandicap = Math.round(courseHandicapExact * (formatAllowance / 100));
  const targetScoreToPlayToHandicap = (customPar || 72) + courseHandicapRounded;

  // Calculate Differential: (113 / Slope) * (Gross - Rating - PCC)
  const scoreDifferential = useMemo(() => {
    const slope = diffSlope || 113;
    const diff = (113 / slope) * (diffGrossScore - diffRating - diffPCC);
    return Math.round(diff * 10) / 10;
  }, [diffGrossScore, diffRating, diffSlope, diffPCC]);

  // Estimate WHS Handicap from Rounds
  const calculatedWHSIndex = useMemo(() => {
    if (!rounds || rounds.length === 0) return null;
    // Calculate differential for each round
    const diffs = rounds.map(r => {
      const slope = 125; // standard slope
      const rating = 72; // standard rating
      const d = (113 / slope) * (r.grossScore - rating);
      return Math.round(d * 10) / 10;
    }).sort((a, b) => a - b);

    let countToUse = 1;
    if (diffs.length >= 20) countToUse = 8;
    else if (diffs.length >= 15) countToUse = 5;
    else if (diffs.length >= 10) countToUse = 3;
    else if (diffs.length >= 6) countToUse = 2;
    else countToUse = 1;

    const lowestDiffs = diffs.slice(0, countToUse);
    const avg = lowestDiffs.reduce((a, b) => a + b, 0) / lowestDiffs.length;
    return Math.round(avg * 10) / 10;
  }, [rounds]);

  const handleClubChange = (clubName: string) => {
    setSelectedClub(clubName);
    const tees = CLUB_TEES[clubName] || DEFAULT_TEES;
    const tee = tees[0];
    setSelectedTeeId(tee.id);
    setCustomRating(tee.rating);
    setCustomSlope(tee.slope);
    setCustomPar(tee.par);
  };

  const handleTeeChange = (teeId: string) => {
    setSelectedTeeId(teeId);
    const tee = availableTees.find(t => t.id === teeId);
    if (tee) {
      setCustomRating(tee.rating);
      setCustomSlope(tee.slope);
      setCustomPar(tee.par);
    }
  };

  const handleSyncToProfile = (val: number) => {
    if (user) {
      updateUser({ handicap: val });
      setSyncedNotice(true);
      setTimeout(() => setSyncedNotice(false), 3000);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-5 sm:p-6 bg-gradient-to-r from-emerald-900 to-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-black text-white">
                WHS & Course Handicap Calculator
              </h3>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-800 text-emerald-200 px-2 py-0.5 rounded-full border border-emerald-700">
                Official WHS Formula
              </span>
            </div>
            <p className="text-xs text-emerald-200/90 mt-0.5">
              Live handicap conversion, course rating slope calculations, and score differentials
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-xl bg-emerald-950/60 hover:bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>{isExpanded ? "Collapse" : "Expand"}</span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="p-5 sm:p-6 space-y-6">
          {/* Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 rounded-2xl w-full sm:w-fit">
            <button
              onClick={() => setActiveTab("course")}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === "course"
                  ? "bg-white text-emerald-950 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Course & Playing Handicap
            </button>
            <button
              onClick={() => setActiveTab("differential")}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === "differential"
                  ? "bg-white text-emerald-950 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Round Score Differential
            </button>
            <button
              onClick={() => setActiveTab("whs")}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === "whs"
                  ? "bg-white text-emerald-950 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              WHS Index Analyzer
            </button>
          </div>

          {syncedNotice && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold rounded-2xl flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Golfer profile handicap successfully synchronized!</span>
            </div>
          )}

          {/* Tab 1: Course & Playing Handicap */}
          {activeTab === "course" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Inputs */}
              <div className="lg:col-span-7 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Your Handicap Index
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="54"
                        value={handicapIndex}
                        onChange={(e) => setHandicapIndex(parseFloat(e.target.value) || 0)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                      />
                      <span className="absolute right-3.5 top-2.5 text-xs text-slate-400 font-semibold">
                        Index
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Format Allowance
                    </label>
                    <select
                      value={formatAllowance}
                      onChange={(e) => setFormatAllowance(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-hidden bg-white"
                    >
                      <option value={100}>100% (Individual Stroke Play)</option>
                      <option value={95}>95% (Individual Match Play)</option>
                      <option value={85}>85% (Four-Ball Stroke Play)</option>
                      <option value={90}>90% (Four-Ball Match Play)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Select Course & Club
                  </label>
                  <select
                    value={selectedClub}
                    onChange={(e) => handleClubChange(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-hidden bg-white"
                  >
                    {LAHORE_CLUBS.map((club) => (
                      <option key={club.id} value={club.name}>
                        {club.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Select Tee Box
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {availableTees.map((tee) => (
                      <button
                        key={tee.id}
                        type="button"
                        onClick={() => handleTeeChange(tee.id)}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          selectedTeeId === tee.id
                            ? "border-emerald-600 bg-emerald-50/70 text-emerald-950 font-bold shadow-xs"
                            : "border-slate-200 hover:border-slate-300 text-slate-700"
                        }`}
                      >
                        <div className="text-xs truncate">{tee.name}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          Rating {tee.rating} · Slope {tee.slope}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Fine-Tuning Controls */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                    <span>Course Parameters</span>
                    <span className="text-[10px] text-slate-500 font-normal">Auto-filled or edit manually</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <span className="text-[10px] text-slate-500 block mb-1">Course Rating</span>
                      <input
                        type="number"
                        step="0.1"
                        value={customRating}
                        onChange={(e) => setCustomRating(parseFloat(e.target.value) || 72)}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-bold bg-white"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block mb-1">Slope Rating (55-155)</span>
                      <input
                        type="number"
                        value={customSlope}
                        onChange={(e) => setCustomSlope(parseInt(e.target.value) || 113)}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-bold bg-white"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block mb-1">Course Par</span>
                      <input
                        type="number"
                        value={customPar}
                        onChange={(e) => setCustomPar(parseInt(e.target.value) || 72)}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-bold bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Calculated Results Card */}
              <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-emerald-950 text-white rounded-2xl p-6 flex flex-col justify-between border border-emerald-800/80 shadow-md">
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-emerald-800/60">
                    <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                      Calculation Summary
                    </span>
                    <span className="text-[10px] bg-emerald-800 text-emerald-200 px-2 py-0.5 rounded-md font-bold">
                      {selectedClub.split(" ")[0]}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="text-xs text-emerald-200">Course Handicap (100%)</div>
                      <div className="text-4xl font-black text-white tracking-tight mt-0.5">
                        {courseHandicapRounded >= 0 ? `+${courseHandicapRounded}` : courseHandicapRounded}
                        <span className="text-sm font-normal text-emerald-300 ml-2">
                          strokes ({courseHandicapExact.toFixed(1)} exact)
                        </span>
                      </div>
                    </div>

                    {formatAllowance !== 100 && (
                      <div className="p-3 bg-emerald-900/60 rounded-xl border border-emerald-700/50">
                        <div className="text-xs text-emerald-200">Playing Handicap ({formatAllowance}%)</div>
                        <div className="text-2xl font-bold text-white mt-0.5">
                          {playingHandicap} strokes
                        </div>
                      </div>
                    )}

                    <div className="pt-2 border-t border-emerald-800/60 space-y-2 text-xs text-emerald-100">
                      <div className="flex justify-between">
                        <span className="text-emerald-300">Target Gross (to play to buffer):</span>
                        <span className="font-bold text-white">{targetScoreToPlayToHandicap}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-emerald-300">Target Net Score:</span>
                        <span className="font-bold text-white">{customPar} (Even Par)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-emerald-300">Slope Ratio (Slope / 113):</span>
                        <span className="font-bold text-white">{(customSlope / 113).toFixed(3)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-emerald-800/60 text-[11px] text-emerald-200/80 leading-relaxed">
                  Formula: <code className="bg-emerald-900/80 px-1.5 py-0.5 rounded text-white font-mono">Index × (Slope / 113) + (Rating - Par)</code>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Round Score Differential */}
          {activeTab === "differential" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Adjusted Gross Score
                    </label>
                    <input
                      type="number"
                      min="50"
                      max="150"
                      value={diffGrossScore}
                      onChange={(e) => setDiffGrossScore(parseInt(e.target.value) || 72)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Playing Conditions (PCC)
                    </label>
                    <select
                      value={diffPCC}
                      onChange={(e) => setDiffPCC(parseInt(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-hidden bg-white"
                    >
                      <option value={-1}>-1 (Easier than normal conditions)</option>
                      <option value={0}>0 (Standard / Normal conditions)</option>
                      <option value={1}>+1 (Slightly adverse / Windy)</option>
                      <option value={2}>+2 (Challenging / Rain / Haze)</option>
                      <option value={3}>+3 (Extreme conditions)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Course Rating
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={diffRating}
                      onChange={(e) => setDiffRating(parseFloat(e.target.value) || 72)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Slope Rating (55-155)
                    </label>
                    <input
                      type="number"
                      value={diffSlope}
                      onChange={(e) => setDiffSlope(parseInt(e.target.value) || 113)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-2xl text-xs text-emerald-900 flex items-start gap-3">
                  <Info className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    Score Differential standardizes your score against course difficulty. A lower differential indicates superior performance relative to the course handicap benchmarks.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-emerald-950 text-white rounded-2xl p-6 flex flex-col justify-between border border-emerald-800/80 shadow-md">
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-emerald-800/60">
                    <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                      Round Differential
                    </span>
                    <span className="text-[10px] bg-emerald-800 text-emerald-200 px-2 py-0.5 rounded-md font-bold">
                      WHS Round Metric
                    </span>
                  </div>

                  <div>
                    <div className="text-xs text-emerald-200">Score Differential Output</div>
                    <div className="text-4xl font-black text-white tracking-tight mt-0.5">
                      {scoreDifferential}
                    </div>
                  </div>

                  <div className="p-3.5 bg-emerald-900/60 rounded-xl border border-emerald-700/50 space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-emerald-300">Gross vs Course Rating:</span>
                      <span className="font-bold text-white">{(diffGrossScore - diffRating).toFixed(1)} shots</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-emerald-300">Slope Multiplier (113 / Slope):</span>
                      <span className="font-bold text-white">{(113 / diffSlope).toFixed(3)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-emerald-800/60 text-[11px] text-emerald-200/80 leading-relaxed">
                  Formula: <code className="bg-emerald-900/80 px-1.5 py-0.5 rounded text-white font-mono">(113 / Slope) × (Gross - Rating - PCC)</code>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: WHS Index Analyzer */}
          {activeTab === "whs" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    Current Golfer Profile
                  </span>
                  <div className="text-3xl font-black text-slate-900">
                    {user?.handicap ?? "12.0"}
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Home Club: {user?.homeClub || "Active Lahore Club"}
                  </span>
                </div>

                <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                    Calculated WHS Trend
                  </span>
                  <div className="text-3xl font-black text-emerald-900">
                    {calculatedWHSIndex !== null ? calculatedWHSIndex : handicapIndex}
                  </div>
                  <span className="text-[11px] text-emerald-700 mt-1 block">
                    Based on {rounds.length} logged official rounds
                  </span>
                </div>

                <div className="p-5 bg-slate-900 text-white rounded-2xl flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider block mb-1">
                      Quick Profile Sync
                    </span>
                    <p className="text-xs text-slate-300">
                      Sync calculated handicap directly into your verified profile.
                    </p>
                  </div>
                  <button
                    onClick={() => handleSyncToProfile(calculatedWHSIndex !== null ? calculatedWHSIndex : handicapIndex)}
                    className="mt-3 w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Sync Handicap ({calculatedWHSIndex !== null ? calculatedWHSIndex : handicapIndex})</span>
                  </button>
                </div>
              </div>

              {/* Rounds Table */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden">
                <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Recent Rounds Differentials
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Lowest differentials count toward your index
                  </span>
                </div>
                {rounds.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-500">
                    No rounds logged yet. Post a score on the dashboard to calculate multi-round trends.
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {rounds.map((r) => {
                      const diff = Math.round(((113 / 125) * (r.grossScore - 72)) * 10) / 10;
                      return (
                        <div key={r.id} className="p-3.5 flex items-center justify-between text-xs hover:bg-slate-50">
                          <div>
                            <span className="font-bold text-slate-900">{r.club}</span>
                            <span className="text-slate-400 ml-2">{r.date}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-slate-600">Score: <strong className="text-slate-900">{r.grossScore}</strong></span>
                            <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-900 font-bold">
                              Diff: {diff}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
});
