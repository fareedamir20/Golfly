import React, { useState } from "react";
import { User, Mail, Phone, MapPin, Award, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { useApp } from "../context/AppContext";
import { LAHORE_CLUBS } from "../data/clubs";

export const ProfileView: React.FC = () => {
  const { user, updateUser } = useApp();
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [homeClub, setHomeClub] = useState(user?.homeClub || LAHORE_CLUBS[0].name);
  const [handicap, setHandicap] = useState(user?.handicap ?? 12);
  const [phone, setPhone] = useState(user?.phone || "");
  const [preferredTimeSlot, setPreferredTimeSlot] = useState(user?.preferredTimeSlot || "Early Morning (6:30 - 8:30 AM)");
  const [playingStyle, setPlayingStyle] = useState(user?.playingStyle || "Casual Weekend");
  const [bio, setBio] = useState(user?.bio || "");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      fullName,
      homeClub,
      handicap: Number(handicap),
      phone,
      preferredTimeSlot: preferredTimeSlot as any,
      playingStyle: playingStyle as any,
      bio
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Card */}
      <div className="bg-gradient-to-r from-emerald-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex items-center justify-between flex-wrap gap-4 border border-emerald-800/80">
        <div className="flex items-center gap-4">
          {user?.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.fullName}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-400"
            />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-slate-950 text-emerald-400 font-black text-lg flex items-center justify-center border-2 border-emerald-400 shrink-0">
              {(user?.fullName || "GF").split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
            </div>
          )}
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white">{user?.fullName || "Golfer Profile"}</h1>
            <p className="text-xs text-emerald-200 mt-0.5">
              Official Handicap: <strong className="text-white">{user?.handicap ?? "—"}</strong> · Home Club: <strong className="text-white">{user?.homeClub || "Golf Club"}</strong>
            </p>
          </div>
        </div>

        <div className="bg-emerald-500/20 border border-emerald-400/40 rounded-xl px-3.5 py-1.5 text-xs text-emerald-300 font-bold flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Active Member Status</span>
        </div>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold rounded-2xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          <span>Profile changes successfully updated!</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSave} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
          Edit Profile & Lahore Golfer Preferences
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Email</label>
            <input
              type="email"
              disabled
              value={user?.email || ""}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 text-slate-400 cursor-not-allowed"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Home Club in Lahore</label>
            <select
              value={homeClub}
              onChange={(e) => setHomeClub(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
            >
              {LAHORE_CLUBS.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Handicap Index</label>
            <input
              type="number"
              step="0.1"
              value={handicap}
              onChange={(e) => setHandicap(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp / Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Time Window</label>
            <select
              value={preferredTimeSlot}
              onChange={(e) => setPreferredTimeSlot(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
            >
              <option value="Early Morning (6:30 - 8:30 AM)">Early Morning (6:30 - 8:30 AM)</option>
              <option value="Mid Morning (9:00 - 11:30 AM)">Mid Morning (9:00 - 11:30 AM)</option>
              <option value="Afternoon Twilight (2:00 - 5:00 PM)">Afternoon Twilight (2:00 - 5:00 PM)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Playing Style</label>
          <select
            value={playingStyle}
            onChange={(e) => setPlayingStyle(e.target.value as any)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
          >
            <option value="Competitive Matchplay">Competitive Matchplay</option>
            <option value="Casual Weekend">Casual Weekend</option>
            <option value="Early Morning Walker">Early Morning Walker</option>
            <option value="Afternoon Twilight">Afternoon Twilight</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Golfer Bio & Routine</label>
          <textarea
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
          />
        </div>

        <div className="pt-2 flex items-center justify-end">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
          >
            Save Profile Updates
          </button>
        </div>
      </form>
    </div>
  );
};
