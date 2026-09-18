import React, { useState } from "react";
import {
  Bot,
  Sparkles,
  Wind,
  CloudFog,
  Crosshair,
  Compass,
  AlertTriangle,
  Send,
  RefreshCw,
  CheckCircle2,
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import { useApp } from "../context/AppContext";

export const AICaddieView: React.FC = () => {
  const { user } = useApp();

  // Input states
  const [clubName, setClubName] = useState("Defence Raya Golf & Country Club");
  const [holeNumber, setHoleNumber] = useState(7);
  const [distanceYards, setDistanceYards] = useState(185);
  const [lie, setLie] = useState("Fairway");
  const [windKmH, setWindKmH] = useState(12);
  const [windDirection, setWindDirection] = useState("Crosswind (Left to Right)");
  const [tempC, setTempC] = useState(17);
  const [aqi, setAqi] = useState(195);
  const [extraQuestion, setExtraQuestion] = useState("");

  const [loading, setLoading] = useState(false);
  const [caddieAdvice, setCaddieAdvice] = useState<any | null>({
    recommendedClub: "5-Iron (Smooth 3/4 punch)",
    adjustedDistance: "194 Yards (+9y due to cold 17°C dense air & smog drag)",
    strategy: "Aim 8-10 yards left of the pin center to utilize the gentle left-to-right slope. Avoid the canal water hazard hugging the right side of the green at all costs.",
    hazardsToAvoid: [
      "Canal water hazard on right side of green",
      "Deep front greenside bunker",
      "Cold air density reducing ball flight carry by ~5-7 yards"
    ],
    windAdjustment: "Light crosswind will gently fade the ball towards the flagstick if started left.",
    mentalCue: "Commit to the club and swing smooth without lunging in the heavy winter air."
  });

  const handleAskCaddie = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/caddie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          club: clubName,
          hole: holeNumber,
          distanceYards,
          lie,
          windCondition: `${windKmH} km/h ${windDirection}`,
          handicap: user?.handicap || 14.0,
          smogVisibility: `AQI ${aqi}, ${tempC}°C`,
          shotGoal: extraQuestion || "Target safe center of green"
        })
      });

      if (res.ok) {
        const json = await res.json();
        setCaddieAdvice({
          recommendedClub: json.clubSelection || "7-Iron (Smooth)",
          adjustedDistance: json.flightAdjustment || `${distanceYards + 5} Yards (Dense air adjustment)`,
          strategy: json.recommendation || json.targetLine || "Aim for fat part of green.",
          hazardsToAvoid: Array.isArray(json.hazardsToAvoid)
            ? json.hazardsToAvoid
            : [json.hazardsToAvoid || "Front greenside bunker"],
          windAdjustment: `${windKmH} km/h ${windDirection}`,
          mentalCue: "Commit to your target and swing smooth without lunging."
        });
      } else {
        throw new Error("API call failed");
      }
    } catch (err) {
      console.warn("Falling back to local AI caddie calculation:", err);
      // High-precision fallback calculation for Lahore
      const airPenalty = tempC < 20 ? Math.round((20 - tempC) * 0.8) : 0;
      const smogPenalty = aqi > 150 ? 4 : 0;
      const totalAdj = distanceYards + airPenalty + smogPenalty;

      setCaddieAdvice({
        recommendedClub: totalAdj > 190 ? "4-Iron or 7-Wood" : "5-Iron",
        adjustedDistance: `${totalAdj} Yards (+${airPenalty + smogPenalty}y air drag adjustment)`,
        strategy: `At ${clubName} Hole #${holeNumber}, winter humidity and smog increase air resistance. Take an extra club, grip down half an inch, and favor the fat part of the green.`,
        hazardsToAvoid: [
          "Bermudagrass dormant rough clinging to clubface",
          "Canal water runoff hazards",
          "Short misses that roll into front bunkers"
        ],
        windAdjustment: `Wind ${windKmH} km/h ${windDirection} requires a lower piercing trajectory.`,
        mentalCue: "Smooth rhythm and centered strike beat excessive swing speed in cold smog."
      });
    } finally {
      setLoading(false);
    }
  };

  const presetHoles = [
    { club: "Defence Raya Golf & Country Club", hole: 7, dist: 185, label: "Raya Hole 7 (Par 3 over Lake)" },
    { club: "Lahore Garrison Golf & Country Club", hole: 14, dist: 380, label: "Garrison Hole 14 (Canal carry)" },
    { club: "Lahore Gymkhana Golf Club", hole: 9, dist: 155, label: "Gymkhana Hole 9 (Heritage Par 3)" },
    { club: "Royal Palm Golf & Country Club", hole: 18, dist: 410, label: "Royal Palm Hole 18 (Finishing Hole)" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Visual Banner */}
      <div className="relative rounded-3xl p-6 sm:p-8 shadow-xl overflow-hidden border border-emerald-500/50 text-white">
        <img
          src="/golf_caddie_strategy.jpg"
          alt="Golf Caddie Strategy on Fairway"
          className="absolute inset-0 w-full h-full object-cover filter saturate-[1.3] brightness-[1.05]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/88 via-teal-900/80 to-emerald-900/85 backdrop-blur-[1px]" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/30 text-emerald-200 text-xs font-bold uppercase tracking-wider border border-emerald-300/40 backdrop-blur-md">
              <Bot className="w-3.5 h-3.5 text-emerald-200" />
              <span>AI Caddie & Atmospheric Telemetry</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight drop-shadow-xs">
              Lahore Course Caddie & Shot Calculator
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 max-w-2xl font-medium">
              Real-time shot strategy taking into account Lahore's winter smog air-density, course architecture, and fairway wind vectors.
            </p>
          </div>

          <div className="bg-emerald-950/80 border border-emerald-500/40 rounded-2xl p-3.5 px-4 text-xs backdrop-blur-md shadow-lg shrink-0">
            <span className="font-extrabold text-emerald-200 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Course Radar Active</span>
            </span>
            <span className="text-emerald-100/90 text-[11px] block mt-0.5 font-medium">Air density & wind compensated</span>
          </div>
        </div>
      </div>

      {/* Preset Quick Holes */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
          Featured Lahore Signature Holes:
        </span>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {presetHoles.map((ph, i) => (
            <button
              key={i}
              onClick={() => {
                setClubName(ph.club);
                setHoleNumber(ph.hole);
                setDistanceYards(ph.dist);
              }}
              className="px-3.5 py-2 text-xs font-bold bg-white hover:bg-teal-50 border border-slate-200 hover:border-teal-300 rounded-xl whitespace-nowrap transition-colors cursor-pointer text-slate-700"
            >
              {ph.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Two-Column Setup */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Input Form Controls */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Crosshair className="w-4 h-4 text-emerald-700" />
            <span>Current Shot Parameters</span>
          </h2>

          <form onSubmit={handleAskCaddie} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Lahore Club</label>
              <select
                value={clubName}
                onChange={(e) => setClubName(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500 bg-white"
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
                <label className="block text-xs font-bold text-slate-700 mb-1">Hole Number</label>
                <input
                  type="number"
                  min="1"
                  max="18"
                  value={holeNumber}
                  onChange={(e) => setHoleNumber(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Laser Distance (Yds)</label>
                <input
                  type="number"
                  min="30"
                  max="650"
                  value={distanceYards}
                  onChange={(e) => setDistanceYards(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Current Lie</label>
                <select
                  value={lie}
                  onChange={(e) => setLie(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500 bg-white"
                >
                  <option value="Tee Box">Tee Box</option>
                  <option value="Fairway">Clean Fairway</option>
                  <option value="First Cut Rough">First Cut Rough</option>
                  <option value="Heavy Bermudagrass Rough">Heavy Bermudagrass Rough</option>
                  <option value="Greenside Bunker">Greenside Bunker</option>
                  <option value="Fairway Bunker">Fairway Bunker</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Air Smog (AQI)</label>
                <input
                  type="number"
                  value={aqi}
                  onChange={(e) => setAqi(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Temperature (°C)</label>
                <input
                  type="number"
                  value={tempC}
                  onChange={(e) => setTempC(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Wind Speed (km/h)</label>
                <input
                  type="number"
                  value={windKmH}
                  onChange={(e) => setWindKmH(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Wind Angle</label>
              <select
                value={windDirection}
                onChange={(e) => setWindDirection(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500 bg-white"
              >
                <option value="Direct Headwind">Direct Headwind (In your face)</option>
                <option value="Direct Tailwind">Direct Tailwind (Helping)</option>
                <option value="Crosswind (Left to Right)">Crosswind (Left to Right)</option>
                <option value="Crosswind (Right to Left)">Crosswind (Right to Left)</option>
                <option value="Calm / Negligible">Calm / Negligible</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Extra Question for Caddie</label>
              <input
                type="text"
                value={extraQuestion}
                onChange={(e) => setExtraQuestion(e.target.value)}
                placeholder="e.g. Pin is tucked behind front bunker"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-teal-800 hover:bg-teal-700 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Computing Ball Flight in Lahore Smog...</span>
                </>
              ) : (
                <>
                  <Bot className="w-4 h-4" />
                  <span>Calculate Caddie Recommendation</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right: AI Caddie Strategic Briefing Output */}
        <div className="lg:col-span-7 space-y-6">
          {caddieAdvice ? (
            <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-700/50 space-y-6">
              {/* Header card */}
              <div className="flex items-center justify-between border-b border-emerald-800/80 pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500 text-emerald-950 px-2.5 py-0.5 rounded-md inline-block mb-1">
                    Tactical Caddie Brief
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-white">
                    {clubName} · Hole #{holeNumber}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-300">Laser: {distanceYards} yds</span>
                  <span className="block text-[10px] text-slate-400">Lie: {lie}</span>
                </div>
              </div>

              {/* Primary Key Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-emerald-900/40 border border-emerald-700/60 rounded-2xl p-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 block mb-1">
                    Recommended Club Selection
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-white">
                    {caddieAdvice.recommendedClub}
                  </span>
                </div>

                <div className="bg-emerald-900/40 border border-emerald-700/60 rounded-2xl p-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 block mb-1">
                    Adjusted Playing Distance
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-white">
                    {caddieAdvice.adjustedDistance}
                  </span>
                </div>
              </div>

              {/* Course Strategy */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5" />
                  Target Line & Safe Landing Zone
                </h4>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-black/30 p-4 rounded-2xl border border-white/10">
                  {caddieAdvice.strategy}
                </p>
              </div>

              {/* Hazards to Avoid */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Course Hazards & Air Density Traps
                </h4>
                <div className="space-y-1.5">
                  {caddieAdvice.hazardsToAvoid?.map((h: string, idx: number) => (
                    <div
                      key={idx}
                      className="text-xs text-slate-300 bg-rose-950/30 border border-rose-800/40 p-2.5 rounded-xl flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mental Cue */}
              <div className="p-4 rounded-2xl bg-teal-950/60 border border-teal-700/60 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-teal-200 block mb-0.5">Lahore Caddie Mental Key:</span>
                  <span className="text-slate-300 italic">"{caddieAdvice.mentalCue}"</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-500">
              <Bot className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-xs">Enter your shot parameters on the left to compute real-time caddie intelligence.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
