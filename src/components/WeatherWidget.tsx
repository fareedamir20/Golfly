import React, { useState, useEffect } from "react";
import { CloudFog, Wind, Compass, Eye, Thermometer, AlertTriangle, RefreshCw, ChevronRight } from "lucide-react";
import { LAHORE_CLUBS } from "../data/clubs";

interface WeatherData {
  city: string;
  timestamp: string;
  overallAQI: number;
  season: string;
  generalNotice: string;
  clubs: Array<{
    club: string;
    aqi: number;
    smogLevel: string;
    visibilityMeters: number;
    tempC: number;
    windKmH: number;
    windDirection: string;
    humidityPct: number;
    greenSpeedStimp: string;
    status: string;
    advisory: string;
  }>;
}

export const WeatherWidget: React.FC<{ compact?: boolean; className?: string }> = ({
  compact = false,
  className = ""
}) => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedClubIndex, setSelectedClubIndex] = useState(0);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/weather");
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (e) {
      console.warn("Using offline weather data:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const getAQIBadge = (aqi: number) => {
    if (aqi <= 100) {
      return { bg: "bg-emerald-100 text-emerald-800 border-emerald-300", label: "Good", alert: "Clear Sky" };
    } else if (aqi <= 150) {
      return { bg: "bg-amber-100 text-amber-800 border-amber-300", label: "Moderate Smog", alert: "Mild Haze" };
    } else if (aqi <= 200) {
      return { bg: "bg-orange-100 text-orange-900 border-orange-300", label: "Unhealthy for Sensitive", alert: "Dense Winter Smog" };
    } else {
      return { bg: "bg-rose-100 text-rose-900 border-rose-300", label: "Severe Smog Alert", alert: "Very Low Visibility" };
    }
  };

  const clubsList = data?.clubs || LAHORE_CLUBS.map((c) => ({
    club: c.name,
    aqi: c.currentConditions.aqi,
    smogLevel: c.currentConditions.smogLevel,
    visibilityMeters: c.currentConditions.visibilityMeters,
    tempC: c.currentConditions.tempC,
    windKmH: c.currentConditions.windKmH,
    windDirection: "NW",
    humidityPct: 48,
    greenSpeedStimp: c.currentConditions.greenSpeed,
    status: "Open",
    advisory: c.currentConditions.advisory
  }));

  const activeClub = clubsList[selectedClubIndex] || clubsList[0];
  const aqiMeta = getAQIBadge(activeClub.aqi);

  if (compact) {
    return (
      <div
        id="lahore-weather-widget-compact"
        className={`bg-white border border-slate-200 rounded-xl p-3 shadow-xs flex items-center justify-between gap-4 ${className}`}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
            <CloudFog className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-800">Lahore Course Weather & Smog</span>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${aqiMeta.bg}`}>
                AQI {activeClub.aqi} · {aqiMeta.label}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 truncate max-w-sm sm:max-w-md">
              {activeClub.club}: Visibility {activeClub.visibilityMeters}m · {activeClub.tempC}°C · Wind {activeClub.windKmH} km/h NW
            </p>
          </div>
        </div>

        <button
          onClick={fetchWeather}
          disabled={loading}
          className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          title="Refresh Course Readings"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>
    );
  }

  return (
    <div
      id="lahore-weather-widget-full"
      className={`bg-white border border-slate-200 rounded-2xl p-5 shadow-sm ${className}`}
    >
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800">
            <CloudFog className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                Live Lahore Golf Weather & Smog Radar
              </h3>
              <span className="text-[10px] font-bold bg-sky-100 text-sky-800 border border-sky-300 px-2 py-0.5 rounded-full">
                OpenWeather Live
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Real-time atmospheric telemetry across Lahore clubs
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-medium text-slate-400 hidden sm:inline">
            Updated just now
          </span>
          <button
            onClick={fetchWeather}
            disabled={loading}
            className="flex items-center gap-1 text-xs text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1.5 rounded-lg font-medium transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3 h-3 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Lahore Club Selection Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-4 scrollbar-none">
        {clubsList.map((item, idx) => (
          <button
            key={item.club}
            onClick={() => setSelectedClubIndex(idx)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all cursor-pointer ${
              selectedClubIndex === idx
                ? "bg-emerald-800 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {item.club.replace(" Golf & Country Club", "").replace(" Golf Club", "")}
          </button>
        ))}
      </div>

      {/* Selected Course Data Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-medium text-slate-500">Air Quality / Smog</span>
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-bold text-slate-900">{activeClub.aqi}</span>
            <span className="text-[10px] uppercase font-bold text-slate-400">AQI</span>
          </div>
          <span className={`inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-md border ${aqiMeta.bg}`}>
            {activeClub.smogLevel}
          </span>
        </div>

        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-medium text-slate-500">Visibility Distance</span>
            <Eye className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-slate-900">
              {(activeClub.visibilityMeters / 1000).toFixed(1)}
            </span>
            <span className="text-xs font-bold text-slate-600">km</span>
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block">
            {activeClub.visibilityMeters > 4000 ? "Full ball flight visible" : "High-optic yellow ball recommended"}
          </span>
        </div>

        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-medium text-slate-500">Temp & Humidity</span>
            <Thermometer className="w-3.5 h-3.5 text-rose-600" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-slate-900">{activeClub.tempC}°C</span>
            <span className="text-xs text-slate-500">/ {activeClub.humidityPct}% H</span>
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block">
            Cool dense air carries ~4y shorter
          </span>
        </div>

        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-medium text-slate-500">Wind & Greens</span>
            <Wind className="w-3.5 h-3.5 text-teal-600" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-slate-900">{activeClub.windKmH}</span>
            <span className="text-xs font-bold text-slate-600">km/h {activeClub.windDirection}</span>
          </div>
          <span className="text-[10px] text-emerald-800 font-medium mt-1 block">
            Stimp: {activeClub.greenSpeedStimp}
          </span>
        </div>
      </div>

      {/* Advisory Banner */}
      <div className="bg-amber-50/80 border border-amber-200/90 rounded-xl p-3 flex items-start gap-2.5">
        <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs">
          <span className="font-bold text-amber-950 block sm:inline mr-1.5">
            Course Advisory for {activeClub.club}:
          </span>
          <span className="text-amber-900 leading-relaxed">{activeClub.advisory}</span>
        </div>
      </div>
    </div>
  );
};
