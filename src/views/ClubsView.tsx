import React, { useState } from "react";
import {
  MapPin,
  Flag,
  CloudFog,
  Wind,
  Eye,
  CheckCircle2,
  Calendar,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Compass,
  Star,
  Mail,
  Phone,
  Sun,
  Moon,
  Utensils,
  Target,
  Shield
} from "lucide-react";
import { LAHORE_CLUBS } from "../data/clubs";
import { useApp } from "../context/AppContext";

export const ClubsView: React.FC = () => {
  const { navigate } = useApp();
  const [filterHoles, setFilterHoles] = useState<"all" | 18 | 9>("all");
  const [selectedClubId, setSelectedClubId] = useState<string>("defence-raya");

  const filteredClubs = LAHORE_CLUBS.filter((c) => {
    if (filterHoles === "all") return true;
    return c.holes === filterHoles;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-2">
            <Flag className="w-3.5 h-3.5 text-emerald-700" />
            <span>Championship Golf Directory & Club Finder</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Find Golf Clubs & Live Course Conditions
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Live telemetry, course layouts, Hole19 player ratings, practice facilities, and dining lounges for top courses in Lahore, Pakistan.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterHoles("all")}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-colors ${
              filterHoles === "all"
                ? "bg-emerald-800 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            All Clubs ({LAHORE_CLUBS.length})
          </button>
          <button
            onClick={() => setFilterHoles(18)}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-colors ${
              filterHoles === 18
                ? "bg-emerald-800 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            18-Hole Championship
          </button>
          <button
            onClick={() => setFilterHoles(9)}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-colors ${
              filterHoles === 9
                ? "bg-emerald-800 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            9-Hole Resort
          </button>
        </div>
      </div>

      {/* Clubs List */}
      <div className="grid grid-cols-1 gap-10">
        {filteredClubs.map((club) => {
          return (
            <div
              key={club.id}
              id={`club-${club.id}`}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden transition-all hover:border-emerald-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Photo & Hole19 overlay */}
                <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full flex flex-col justify-between">
                  <img
                    src={club.imageUrl}
                    alt={club.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-slate-900/40" />

                  {/* Top Badges */}
                  <div className="relative z-10 p-5 flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-black uppercase tracking-wider bg-emerald-600 text-white px-3 py-1 rounded-lg shadow-xs">
                      {club.holes} Holes · Par {club.par}
                    </span>
                    {club.rating && (
                      <span className="text-[11px] font-bold bg-amber-400 text-slate-950 px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-xs">
                        <Star className="w-3.5 h-3.5 fill-slate-950" />
                        <span>{club.rating} ({club.reviewCount}+ Hole19)</span>
                      </span>
                    )}
                    {club.hole19Mapped && (
                      <span className="text-[10px] font-bold bg-slate-900/90 text-emerald-300 border border-emerald-500/40 px-2.5 py-1 rounded-lg backdrop-blur-xs">
                        Mapped on Hole19
                      </span>
                    )}
                  </div>

                  {/* Bottom Photo Title */}
                  <div className="relative z-10 p-5 text-white">
                    <h3 className="font-black text-xl sm:text-2xl leading-tight mb-1">{club.name}</h3>
                    <p className="text-xs text-slate-300 flex items-center gap-1.5 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{club.address || club.location}</span>
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  <div>
                    {/* Club Name Header on top of Description */}
                    <div className="mb-4 pb-3 border-b border-slate-100">
                      <h2 className="font-black text-xl sm:text-2xl text-slate-900 tracking-tight leading-snug mb-1">
                        {club.name}
                      </h2>
                      <p className="text-xs text-slate-600 font-medium flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{club.address || club.location}</span>
                      </p>
                    </div>

                    {/* Header info row */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        {club.designer && (
                          <span className="text-xs text-slate-600 font-semibold bg-slate-100 px-2.5 py-1 rounded-md">
                            Architect: {club.designer}
                          </span>
                        )}
                        {club.courseType && (
                          <span className="text-xs text-emerald-900 font-bold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                            {club.courseType}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        {club.email && (
                          <a
                            href={`mailto:${club.email}`}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 px-3 py-1 rounded-lg transition-colors"
                          >
                            <Mail className="w-3.5 h-3.5 text-emerald-700" />
                            <span>{club.email}</span>
                          </a>
                        )}
                        {club.phone && (
                          <a
                            href={`tel:${club.phone.replace(/\s+/g, '')}`}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 px-3 py-1 rounded-lg transition-colors"
                          >
                            <Phone className="w-3.5 h-3.5 text-emerald-700" />
                            <span>{club.phone}</span>
                          </a>
                        )}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-5">
                      {club.keyDetails}
                    </p>

                    {/* 6-Day Weather & Temperature Forecast */}
                    {club.forecast && club.forecast.length > 0 && (
                      <div className="bg-slate-900 text-white rounded-2xl p-4 mb-5 border border-slate-800">
                        <div className="flex items-center justify-between mb-3 text-xs">
                          <span className="font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                            <Sun className="w-3.5 h-3.5 text-amber-400" />
                            <span>6-Day Course Weather Forecast</span>
                          </span>
                          <span className="text-[11px] text-slate-400">Clear Skies & Optimal Play</span>
                        </div>
                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                          {club.forecast.map((fc, idx) => (
                            <div key={idx} className="bg-slate-800/90 rounded-xl p-2.5 text-center border border-slate-700/60">
                              <span className="text-[11px] font-bold text-slate-300 block">{fc.day}</span>
                              <div className="my-1 text-amber-400 flex justify-center">
                                {fc.iconType === "clear-night" ? (
                                  <Moon className="w-4 h-4 text-emerald-400" />
                                ) : (
                                  <Sun className="w-4 h-4 text-amber-400" />
                                )}
                              </div>
                              <span className="text-sm font-black text-white block">{fc.tempC}°C</span>
                              <span className="text-[9px] text-slate-400 block truncate">{fc.condition}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Practice Facilities & Dining Lounges */}
                    {(club.practiceFacilities || club.diningAndLounges) && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                        {club.practiceFacilities && (
                          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4">
                            <div className="text-xs font-bold text-emerald-950 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                              <Target className="w-3.5 h-3.5 text-emerald-700" />
                              <span>Practice Facilities</span>
                            </div>
                            <ul className="space-y-1.5 text-xs text-emerald-900">
                              {club.practiceFacilities.map((pf, idx) => (
                                <li key={idx} className="flex items-start gap-1.5">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                                  <span>{pf}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {club.diningAndLounges && (
                          <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4">
                            <div className="text-xs font-bold text-amber-950 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                              <Utensils className="w-3.5 h-3.5 text-amber-700" />
                              <span>Clubhouse Dining & Lounges</span>
                            </div>
                            <ul className="space-y-1.5 text-xs text-amber-900">
                              {club.diningAndLounges.map((dl, idx) => (
                                <li key={idx} className="flex items-start gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0 mt-1.5" />
                                  <span>{dl}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Live Course Condition Radar */}
                    <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                          <CloudFog className="w-3.5 h-3.5 text-amber-600" />
                          <span>Live Atmospheric & Turf Radar</span>
                        </span>
                        <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                          Updated Live
                        </span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                        <div className="bg-white p-2 rounded-lg border border-slate-200">
                          <span className="text-[10px] text-slate-400 block">Air Quality</span>
                          <span className="font-bold text-slate-900">AQI {club.currentConditions.aqi}</span>
                        </div>
                        <div className="bg-white p-2 rounded-lg border border-slate-200">
                          <span className="text-[10px] text-slate-400 block">Visibility</span>
                          <span className="font-bold text-slate-900">{(club.currentConditions.visibilityMeters / 1000).toFixed(1)} km</span>
                        </div>
                        <div className="bg-white p-2 rounded-lg border border-slate-200">
                          <span className="text-[10px] text-slate-400 block">Greens</span>
                          <span className="font-bold text-emerald-800">{club.currentConditions.greenSpeed}</span>
                        </div>
                        <div className="bg-white p-2 rounded-lg border border-slate-200">
                          <span className="text-[10px] text-slate-400 block">Temp & Wind</span>
                          <span className="font-bold text-slate-900">{club.currentConditions.tempC}°C · {club.currentConditions.windKmH}k</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-amber-900 bg-amber-50/80 p-2 rounded-lg mt-2 border border-amber-200/80 font-medium">
                        Advisory: {club.currentConditions.advisory}
                      </p>
                    </div>

                    {/* Amenities Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {club.amenities.map((amenity) => (
                        <span
                          key={amenity}
                          className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => navigate("/partners")}
                        className="px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Find {club.shortName} Partners
                      </button>
                      <button
                        onClick={() => navigate("/ai-caddie")}
                        className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Compass className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Course Strategy</span>
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {club.website && (
                        <a
                          href={club.website}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-xs"
                        >
                          <ExternalLink className="w-3.5 h-3.5 text-emerald-200" />
                          <span>Official Website</span>
                        </a>
                      )}
                      {club.email && (
                        <a
                          href={`mailto:${club.email}`}
                          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5"
                        >
                          <Mail className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Email {club.shortName}</span>
                        </a>
                      )}
                      {club.phone && (
                        <a
                          href={`tel:${club.phone.replace(/\s+/g, '')}`}
                          className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5"
                        >
                          <Phone className="w-3.5 h-3.5 text-white" />
                          <span>Call Club</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

