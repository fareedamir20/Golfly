import React, { useState, useEffect } from "react";
import {
  Users,
  Search,
  Sparkles,
  MapPin,
  Clock,
  CheckCircle2,
  X,
  Radar,
  Flame,
  ArrowRight,
  MessageSquare,
  UserPlus,
  RefreshCw,
  Award
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { GolferPartner } from "../types";

interface TeammateSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TeammateSearchModal: React.FC<TeammateSearchModalProps> = ({ isOpen, onClose }) => {
  const { partners, startChatWithPartner, sendFriendRequest, navigate } = useApp();

  // Selection Criteria
  const [preferredClub, setPreferredClub] = useState<string>("Defence Raya Golf & Country Club");
  const [targetHandicap, setTargetHandicap] = useState<string>("mid"); // "scratch", "mid", "high", "any"
  const [preferredTime, setPreferredTime] = useState<string>("Morning (7:00 - 9:00 AM)");
  const [gameFormat, setGameFormat] = useState<string>("Competitive Matchplay");

  // Flow State: "setup" -> "searching" -> "results"
  const [step, setStep] = useState<"setup" | "searching" | "results">("setup");
  const [searchProgress, setSearchProgress] = useState(0);
  const [currentStatusText, setCurrentStatusText] = useState("");
  const [matchedResults, setMatchedResults] = useState<GolferPartner[]>([]);
  const [connectedPartnerId, setConnectedPartnerId] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setStep("setup");
      setSearchProgress(0);
      setConnectedPartnerId(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const startSearching = () => {
    setStep("searching");
    setSearchProgress(10);
    setCurrentStatusText("Pinging online golfers near " + preferredClub.split(" ")[0] + "...");

    // Stage 1: Scanning Network
    setTimeout(() => {
      setSearchProgress(40);
      setCurrentStatusText("Filtering handicap profiles for " + gameFormat + "...");
    }, 800);

    // Stage 2: Tee Time Matching
    setTimeout(() => {
      setSearchProgress(75);
      setCurrentStatusText("Matching weekend tee time availability...");
    }, 1600);

    // Stage 3: Calculating AI Compatibility
    setTimeout(() => {
      setSearchProgress(100);
      setCurrentStatusText("Matchmaking complete! Found optimal teammates.");
    }, 2400);

    // Stage 4: Reveal Results
    setTimeout(() => {
      // Pick best matching partners based on selection
      let candidates = partners.filter((p) => {
        if (targetHandicap === "scratch") return p.handicap <= 8;
        if (targetHandicap === "mid") return p.handicap >= 5 && p.handicap <= 16;
        if (targetHandicap === "high") return p.handicap >= 14;
        return true;
      });

      if (candidates.length === 0) {
        candidates = partners;
      }

      setMatchedResults(candidates.slice(0, 3));
      setStep("results");
    }, 2800);
  };

  const handlePairAndInvite = (partner: GolferPartner) => {
    setConnectedPartnerId(partner.id);
    sendFriendRequest(partner.id);
    setTimeout(() => {
      startChatWithPartner(partner);
      onClose();
      navigate("/messages");
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white w-full max-w-xl rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="font-black text-lg sm:text-xl tracking-tight text-white flex items-center gap-2">
                1-Click Teammate Matchmaker
              </h2>
              <p className="text-xs text-slate-400">
                Instant AI pairing with available golfers in Lahore
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* STEP 1: SETUP CRITERIA */}
          {step === "setup" && (
            <div className="space-y-5 animate-in fade-in">
              <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-4 flex items-start gap-3">
                <Radar className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-950">
                  <span className="font-bold">Instant Pairing Engine:</span> Set your preferred club and handicap range, then click search. Our radar will match you with active golfers instantly.
                </div>
              </div>

              {/* Club Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Target Golf Club</span>
                </label>
                <select
                  value={preferredClub}
                  onChange={(e) => setPreferredClub(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                >
                  <option value="Defence Raya Golf & Country Club">Defence Raya Golf & Country Club</option>
                  <option value="Lahore Gymkhana Golf Club">Lahore Gymkhana Golf Club</option>
                  <option value="Royal Palm Golf & Country Club">Royal Palm Golf & Country Club</option>
                  <option value="PAF Skyview Golf Club">PAF Skyview Golf Club</option>
                  <option value="Lahore Garrison Golf Club">Lahore Garrison Golf Club</option>
                  <option value="Any Club in Lahore">Any Club in Lahore</option>
                </select>
              </div>

              {/* Target Handicap Range */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                  <span>Target Teammate Handicap Index</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: "scratch", label: "Scratch - 8", desc: "Single Digit" },
                    { id: "mid", label: "8 - 15", desc: "Mid Handicap" },
                    { id: "high", label: "15 - 24", desc: "High Handicap" },
                    { id: "any", label: "Any Index", desc: "All Golfers" }
                  ].map((h) => (
                    <button
                      key={h.id}
                      type="button"
                      onClick={() => setTargetHandicap(h.id)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        targetHandicap === h.id
                          ? "bg-emerald-800 text-white border-emerald-800 shadow-xs"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      <div className="text-xs font-bold">{h.label}</div>
                      <div className={`text-[10px] ${targetHandicap === h.id ? "text-emerald-200" : "text-slate-500"}`}>
                        {h.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Preferred Tee Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-sky-600" />
                    <span>Preferred Tee Time</span>
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  >
                    <option value="Early Morning (6:30 - 8:00 AM)">Early Morning (6:30 - 8:00 AM)</option>
                    <option value="Morning (8:00 - 10:30 AM)">Morning (8:00 - 10:30 AM)</option>
                    <option value="Afternoon Twilight (2:00 - 5:00 PM)">Afternoon Twilight (2:00 PM+)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-rose-500" />
                    <span>Match Format</span>
                  </label>
                  <select
                    value={gameFormat}
                    onChange={(e) => setGameFormat(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  >
                    <option value="Competitive Matchplay">Competitive Matchplay</option>
                    <option value="Casual Weekend Four-Ball">Casual Weekend Four-Ball</option>
                    <option value="Strokeplay / Medal Round">Strokeplay / Medal Round</option>
                    <option value="Skins & Friendly Match">Skins & Friendly Match</option>
                  </select>
                </div>
              </div>

              {/* 1-Click Search Primary CTA */}
              <div className="pt-2">
                <button
                  onClick={startSearching}
                  className="w-full py-4 rounded-2xl bg-emerald-800 hover:bg-emerald-700 text-white font-black text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-xl active:scale-[0.99]"
                >
                  <Sparkles className="w-5 h-5 text-amber-300 animate-spin" />
                  <span>⚡ 1-Click Teammate Search</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: SEARCHING RADAR SCREEN */}
          {step === "searching" && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in">
              {/* Radar Pulse Animation */}
              <div className="relative w-32 h-32 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-emerald-500/30 animate-ping" />
                <div className="absolute inset-2 rounded-full border-2 border-emerald-500/50 animate-pulse" />
                <div className="w-20 h-20 rounded-full bg-emerald-900 border-2 border-emerald-500 flex items-center justify-center shadow-lg text-emerald-400">
                  <Radar className="w-10 h-10 animate-spin" />
                </div>
              </div>

              <div className="space-y-2 max-w-sm mx-auto">
                <h3 className="text-xl font-black text-slate-900 tracking-tight">
                  Scanning Lahore Golfer Network...
                </h3>
                <p className="text-xs font-semibold text-emerald-800 min-h-[20px] transition-all">
                  {currentStatusText}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="w-full max-w-md bg-slate-100 rounded-full h-3 p-0.5 border border-slate-200">
                <div
                  className="bg-emerald-600 h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${searchProgress}%` }}
                />
              </div>

              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                Searching near {preferredClub.split(" ")[0]} • {preferredTime}
              </div>
            </div>
          )}

          {/* STEP 3: MATCH RESULTS */}
          {step === "results" && (
            <div className="space-y-5 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Top Compatible Teammates Found</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Matches tailored for {preferredClub}
                  </p>
                </div>
                <button
                  onClick={() => setStep("setup")}
                  className="text-xs font-bold text-emerald-800 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Adjust Search</span>
                </button>
              </div>

              <div className="space-y-3">
                {matchedResults.map((partner) => (
                  <div
                    key={partner.id}
                    className="bg-slate-50 hover:bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3.5">
                      {partner.avatarUrl ? (
                        <img
                          src={partner.avatarUrl}
                          alt={partner.fullName}
                          className="w-13 h-13 rounded-2xl object-cover border border-slate-200 shrink-0"
                        />
                      ) : (
                        <div className="w-13 h-13 rounded-2xl bg-slate-900 text-emerald-400 font-black text-sm flex items-center justify-center border border-slate-800 shrink-0">
                          {partner.fullName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-900 text-sm">{partner.fullName}</h4>
                          <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                            {partner.compatibilityScore}% Match
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 font-medium flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span>{partner.homeClub}</span>
                        </p>
                        <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1">
                          <span className="font-bold text-emerald-900">Handicap: {partner.handicap}</span>
                          <span>•</span>
                          <span>{partner.preferredTiming}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {connectedPartnerId === partner.id ? (
                        <div className="px-4 py-2 rounded-xl bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                          <span>Invite Sent & Pair Formed!</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => handlePairAndInvite(partner)}
                          className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                        >
                          <UserPlus className="w-3.5 h-3.5" />
                          <span>Form Pair & Connect</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
