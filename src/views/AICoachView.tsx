import React, { useState } from "react";
import {
  Flame,
  Bot,
  Sparkles,
  CheckCircle2,
  RefreshCw,
  Target,
  ArrowRight,
  Crosshair,
  ShieldCheck,
  Video
} from "lucide-react";
import { useApp } from "../context/AppContext";

export const AICoachView: React.FC = () => {
  const { user } = useApp();
  const [faultType, setFaultType] = useState("Driver Push-Slice");
  const [ballFlight, setBallFlight] = useState("Starts right of target and curves heavily further right");
  const [practiceLocation, setPracticeLocation] = useState("Defence Raya Practice Range");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const [coachAnalysis, setCoachAnalysis] = useState<any>({
    rootCause: "Over-the-top transition coupled with an open clubface relative to swing path at impact. In cold winter air, side-spin amplifies curvature.",
    primaryDrill: "Two-Tee Gate & Split-Grip Feel Drill",
    drillSteps: [
      "Place an alignment stick pointing 5° right of target line to encourage an in-to-out path.",
      "Take a split-grip (hands separated by 2 inches) and make slow half-swings feeling the toe of the club naturally rotate past the heel.",
      "Hit 15 balls at 60% speed at the range focusing solely on hitting high gentle draws."
    ],
    rangeRoutine: "Warm up with 10 sand wedges, 15 7-irons doing the split-grip drill, and finish with 10 drivers committing to the in-to-out path.",
    mentalCue: "Swing out towards right-field and let the wrists release naturally."
  });

  const handleDiagnose = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          issue: faultType,
          handicap: user?.handicap || 14.0,
          ballFlight,
          clubType: "Driver / Irons",
          experienceLevel: "Intermediate"
        })
      });

      if (res.ok) {
        const json = await res.json();
        setCoachAnalysis({
          primaryDrill: json.keyDrill || json.primaryDrill || "Alignment Stick Swing Path Drill",
          rootCause: json.analysis || json.rootCause || "Open clubface relative to swing path.",
          drillSteps: json.drillSteps || [
            "Set alignment stick 5° right of target line to establish path reference.",
            "Take 10 practice swings feeling relaxed forearms rotating gently.",
            "Hit 15 balls at 70% tempo at the range focusing on solid contact."
          ],
          rangeRoutine: json.practicePlan || json.rangeRoutine || "30 balls with dedicated drill focus.",
          mentalCue: json.feelThought || json.mentalCue || "Smooth rhythm through the ball."
        });
      } else {
        throw new Error("API call failed");
      }
    } catch (err) {
      console.warn("Using local coach analysis fallback:", err);
      setCoachAnalysis({
        rootCause: `Classic ${faultType} caused by steep downswing angle attack and decelerating hips through the impact zone.`,
        primaryDrill: "Alignment Rod Chest Rotation Drill",
        drillSteps: [
          "Place an alignment stick across your collarbones and turn to 90° backswing without swaying.",
          "Initiate downswing by uncoiling the lead hip while keeping chest over the ball.",
          "Perform 20 slow-motion reps, then hit 10 balls on the driving range."
        ],
        rangeRoutine: "30 range balls strictly alternating between practice feel drill and real ball strikes.",
        mentalCue: "Stay in your posture through strike."
      });
    } finally {
      setLoading(false);
    }
  };

  const commonFaults = [
    { label: "Driver Push-Slice", desc: "Curves right into trees" },
    { label: "Fat / Chunked Iron Shots", desc: "Hitting the turf before ball in winter bermuda" },
    { label: "Pull Hook Under Pressure", desc: "Low bullet that snaps sharply left" },
    { label: "3-Putt Lag Control", desc: "Poor speed on fast Lahore greens" },
    { label: "Greenside Bunker Inconsistency", desc: "Blade over green or leave in sand" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-2">
            <Flame className="w-3.5 h-3.5 text-emerald-700" />
            <span>Swing Mechanics & Drills</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Swing Coach & Practice Range Drills
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Diagnose swing faults and receive custom drills tailored to your handicap and local Lahore practice facility mats/turf.
          </p>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 px-4 text-xs">
          <span className="font-bold text-emerald-950 block">PGA Mechanics Guide</span>
          <span className="text-emerald-800">Range routines & feel keys</span>
        </div>
      </div>

      {/* Quick Fault Selector */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
          Select Swing Challenge to Fix:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {commonFaults.map((f, i) => (
            <button
              key={i}
              onClick={() => {
                setFaultType(f.label);
                setBallFlight(f.desc);
              }}
              className={`p-3 text-left rounded-2xl border transition-all cursor-pointer ${
                faultType === f.label
                  ? "bg-emerald-800 text-white border-emerald-800 shadow-xs"
                  : "bg-white text-slate-700 border-slate-200 hover:border-emerald-300"
              }`}
            >
              <span className="text-xs font-bold block">{f.label}</span>
              <span className={`text-[10px] block mt-0.5 ${faultType === f.label ? "text-emerald-200" : "text-slate-500"}`}>
                {f.desc}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Controls */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
          <h3 className="font-bold text-base text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Target className="w-4 h-4 text-emerald-700" />
            <span>Diagnostic Input</span>
          </h3>

          <form onSubmit={handleDiagnose} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Issue / Tendency</label>
              <input
                type="text"
                value={faultType}
                onChange={(e) => setFaultType(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Observed Ball Flight</label>
              <textarea
                rows={2}
                value={ballFlight}
                onChange={(e) => setBallFlight(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Where do you practice in Lahore?</label>
              <select
                value={practiceLocation}
                onChange={(e) => setPracticeLocation(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                <option value="Defence Raya Practice Range">Defence Raya Floodlit Practice Range</option>
                <option value="Lahore Garrison Driving Range">Lahore Garrison Driving Range</option>
                <option value="Lahore Gymkhana Practice Ground">Lahore Gymkhana Practice Ground</option>
                <option value="Royal Palm TrackMan Bays">Royal Palm TrackMan Bays</option>
                <option value="PAF Skyview Range">PAF Skyview Range</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Analyzing Swing Mechanics...</span>
                </>
              ) : (
                <>
                  <Flame className="w-4 h-4 text-emerald-300" />
                  <span>Prescribe Swing Fix & Drills</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Prescription Output */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-md">
                Custom Drill Protocol
              </span>
              <h3 className="text-lg font-black text-slate-900 mt-1">
                {coachAnalysis.primaryDrill}
              </h3>
            </div>
            <span className="text-xs font-bold text-slate-500">Targeting {faultType}</span>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
            <h4 className="text-xs font-bold text-slate-900 mb-1">Root Mechanical Cause:</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {coachAnalysis.rootCause}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Step-by-Step Range Drill Execution</span>
            </h4>
            <div className="space-y-2">
              {coachAnalysis.drillSteps?.map((step: string, idx: number) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/70 flex items-start gap-2.5 text-xs text-slate-800"
                >
                  <span className="w-5 h-5 rounded-full bg-emerald-800 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-800 block mb-1">Recommended Range Routine:</span>
              <p className="text-slate-600 leading-relaxed text-[11px]">{coachAnalysis.rangeRoutine}</p>
            </div>

            <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200">
              <span className="font-bold text-amber-950 block mb-1">On-Course Swing Thought:</span>
              <p className="text-amber-900 italic text-[11px]">"{coachAnalysis.mentalCue}"</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
