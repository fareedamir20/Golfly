import React from "react";
import { Users, Code, Bot, Award, Heart } from "lucide-react";

export const TeamView: React.FC = () => {
  const stewards = [
    {
      name: "Fareed Amir",
      role: "Future Tech Founder & Visionary",
      club: "Defence Raya / Gymkhana",
      bio: "Future Tech Founder and visionary single-digit golfer building next-generation digital platforms for golfers worldwide.",
      initials: "FA",
      isLogo: true
    },
    {
      name: "Farhan Lodhi",
      role: "Head of Club Liaisons",
      club: "Lahore Garrison Golf Club",
      bio: "Manages relations with golf club committees, handicap secretaries, and local course operations.",
      initials: "FL",
      isLogo: false
    },
    {
      name: "Sana Mir",
      role: "Telemetry & Systems Engineer",
      club: "Royal Palm Golf & Country Club",
      bio: "Specializes in atmospheric dispersion models, course weather analytics, and sensor telemetry.",
      initials: "SM",
      isLogo: false
    },
    {
      name: "Ali Raza Khan",
      role: "Community & Tournament Director",
      club: "PAF Skyview / The Oasis",
      bio: "Organizes inter-club matchplay fixtures, junior golfer drives, and tournament regulations.",
      initials: "AK",
      isLogo: false
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-800">
          Platform Stewards
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          The Team Behind Golfly
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
          Passionate golfers and software engineers building the future of golf companion tools.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stewards.map((s, i) => (
          <div
            key={i}
            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex items-start gap-4"
          >
            {s.isLogo ? (
              <div className="w-16 h-16 rounded-2xl bg-emerald-900 border border-emerald-700 flex items-center justify-center p-1.5 shrink-0 shadow-xs">
                <img
                  src="/logo.png"
                  alt={s.name}
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-slate-900 text-emerald-400 font-black text-lg flex items-center justify-center shrink-0 border border-slate-800 shadow-xs">
                {s.initials}
              </div>
            )}
            <div className="space-y-1">
              <h3 className="font-bold text-slate-900 text-sm">{s.name}</h3>
              <p className="text-xs font-semibold text-emerald-800">{s.role}</p>
              <p className="text-[11px] text-slate-500 font-medium">Home Club: {s.club}</p>
              <p className="text-xs text-slate-600 pt-1 leading-relaxed">{s.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
