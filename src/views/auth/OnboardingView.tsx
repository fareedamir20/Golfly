import React, { useState } from "react";
import { CheckCircle2, ArrowRight, Compass, ShieldCheck, Sparkles, User, Crosshair } from "lucide-react";
import { useApp } from "../../context/AppContext";

export const OnboardingView: React.FC = () => {
  const { user, updateUser, navigate } = useApp();
  const [step, setStep] = useState(1);

  const [preferredTimeSlot, setPreferredTimeSlot] = useState(user?.preferredTimeSlot || "Weekend Mornings (7:00 AM - 11:00 AM)");
  const [phone, setPhone] = useState(user?.phone || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [driver, setDriver] = useState("");
  const [irons, setIrons] = useState("");
  const [putter, setPutter] = useState("");

  const handleFinish = () => {
    updateUser({
      phone,
      bio,
      preferredTimeSlot: preferredTimeSlot as any,
    });
    navigate("/dashboard");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xl space-y-8">
        {/* Progress indicator */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md">
              Golfer Profile Setup · Step {step} of 3
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              Personalize Your Lahore Game
            </h2>
          </div>
          <span className="text-xs font-bold text-slate-400">
            {step === 1 ? "Availability" : step === 2 ? "In The Bag" : "Final Touch"}
          </span>
        </div>

        {/* Step 1: Playing Time & Communication */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Preferred Tee Time Window in Lahore
              </label>
              <select
                value={preferredTimeSlot}
                onChange={(e) => setPreferredTimeSlot(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden bg-white"
              >
                <option value="Weekend Mornings (7:00 AM - 11:00 AM)">Weekend Mornings (7:00 AM - 11:00 AM)</option>
                <option value="Weekday Twilight 9-Holes (3:30 PM - 6:00 PM)">Weekday Twilight 9-Holes (3:30 PM - 6:00 PM)</option>
                <option value="Saturday & Sunday Medal Rounds">Saturday & Sunday Medal Rounds</option>
                <option value="Flexible / Night Golf under Lights">Flexible / Night Golf under Lights</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Contact Phone / WhatsApp (Private to confirmed partners only)
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>

            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-full mt-4 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Next: Equipment Profile</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2: In The Bag */}
        {step === 2 && (
          <div className="space-y-4">
            <p className="text-xs text-slate-600">
              Sharing your club specs helps Course Caddie calculate accurate yardages and provides context for Pro Shop gear trade inquiries.
            </p>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Driver</label>
              <input
                type="text"
                value={driver}
                onChange={(e) => setDriver(e.target.value)}
                placeholder="e.g. TaylorMade Qi10 / PING G430"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Iron Set</label>
              <input
                type="text"
                value={irons}
                onChange={(e) => setIrons(e.target.value)}
                placeholder="e.g. Titleist T200 / Mizuno Pro 243"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Putter</label>
              <input
                type="text"
                value={putter}
                onChange={(e) => setPutter(e.target.value)}
                placeholder="e.g. Odyssey Ai-One / Scotty Cameron"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 py-3 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs uppercase cursor-pointer"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="w-2/3 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Next: Bio & Etiquette</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Bio */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Golfer Bio & Routine</label>
              <textarea
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
              <div className="flex items-center gap-2 text-emerald-950 font-bold text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Lahore Golfer Profile Ready</span>
              </div>
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                Connect with local golfers across Defence Raya, Gymkhana, Garrison, Royal Palm, Skyview, and Oasis.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-1/3 py-3 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs uppercase cursor-pointer"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleFinish}
                className="w-2/3 py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Finish & Enter Clubhouse</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
