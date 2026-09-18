import React, { useState, useMemo } from "react";
import { Trophy, Medal, MapPin, Users, TrendingUp, Sparkles } from "lucide-react";
import { useApp } from "../context/AppContext";
import { LeaderboardEntry } from "../types";

export const LeaderboardsView: React.FC = () => {
  const { user, partners, rounds, navigate } = useApp();
  const [selectedClub, setSelectedClub] = useState("all");
  const [division, setDivision] = useState<"gross" | "net">("gross");

  // Construct dynamic leaderboard entries from registered user and partners
  const entries: LeaderboardEntry[] = useMemo(() => {
    const list: LeaderboardEntry[] = [];

    if (user) {
      const userRounds = rounds;
      const avgGross = userRounds.length > 0
        ? Math.round(userRounds.reduce((acc, r) => acc + r.grossScore, 0) / userRounds.length)
        : Math.round(72 + (user.handicap || 10));

      list.push({
        rank: 1,
        golferName: user.fullName || "Current Golfer",
        golferAvatar: user.avatarUrl || "",
        homeClub: user.homeClub || "Golf Club",
        handicap: user.handicap || 0,
        avgGrossScore: avgGross,
        monthlyPoints: 120 + (userRounds.length * 25),
        bracket: (user.handicap || 0) <= 5 ? "Scratch - 5" : (user.handicap || 0) <= 12 ? "6 - 12" : (user.handicap || 0) <= 18 ? "13 - 18" : "19 - 28",
        roundsCount: userRounds.length,
        bestDifferential: (user.handicap || 0) * 0.9
      });
    }

    partners.forEach((p, idx) => {
      list.push({
        rank: idx + 2,
        golferName: p.fullName,
        golferAvatar: p.avatarUrl,
        homeClub: p.homeClub,
        handicap: p.handicap,
        avgGrossScore: Math.round(72 + p.handicap),
        monthlyPoints: Math.max(50, Math.round(150 - p.handicap * 4)),
        bracket: p.handicap <= 5 ? "Scratch - 5" : p.handicap <= 12 ? "6 - 12" : p.handicap <= 18 ? "13 - 18" : "19 - 28",
        roundsCount: 1,
        bestDifferential: p.handicap * 0.9
      });
    });

    return list;
  }, [user, partners, rounds]);

  // Sort and filter golfers
  const sortedGolfers = entries.sort((a, b) => {
    if (division === "gross") {
      return a.avgGrossScore - b.avgGrossScore;
    } else {
      return b.monthlyPoints - a.monthlyPoints;
    }
  }).filter((u) => {
    if (selectedClub === "all") return true;
    return u.homeClub.toLowerCase().includes(selectedClub.toLowerCase());
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-2">
            <Trophy className="w-3.5 h-3.5 text-emerald-700" />
            <span>Community Standings</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Club Leaderboards
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Track gross scoring averages, merit standings, and handicap brackets across member clubs.
          </p>
        </div>

        {/* Division Toggles */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl">
          <button
            onClick={() => setDivision("gross")}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              division === "gross"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Gross Scoring Average
          </button>
          <button
            onClick={() => setDivision("net")}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              division === "net"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Monthly Merit Points
          </button>
        </div>
      </div>

      {/* Club Filter tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {["all", "Raya", "Garrison", "Gymkhana", "Royal Palm", "Skyview", "Oasis"].map((c) => (
          <button
            key={c}
            onClick={() => setSelectedClub(c)}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
              selectedClub === c
                ? "bg-emerald-800 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {c === "all" ? "All Golfers" : c}
          </button>
        ))}
      </div>

      {/* Leaderboard Table or Empty State */}
      {sortedGolfers.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto mb-4 border border-emerald-100">
            <Trophy className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">No Standings Logged Yet</h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-6">
            Log your first 18-hole round or verify scorecards with your playing partners to establish official rankings on the leaderboard.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => navigate("/rounds")}
              className="px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Log A Round
            </button>
            <button
              onClick={() => navigate("/partners")}
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
            >
              Find Partners
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-4 px-6">Rank</th>
                  <th className="py-4 px-6">Golfer</th>
                  <th className="py-4 px-6">Home Club</th>
                  <th className="py-4 px-6 text-center">Handicap Index</th>
                  <th className="py-4 px-6 text-center">Rounds Tracked</th>
                  <th className="py-4 px-6 text-center">Avg Gross</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sortedGolfers.map((g, idx) => {
                  const isCurrentUser = g.golferName.toLowerCase() === user?.fullName?.toLowerCase();
                  return (
                    <tr
                      key={g.rank || idx}
                      className={`hover:bg-slate-50/80 transition-colors ${
                        isCurrentUser ? "bg-emerald-50/60 font-semibold" : ""
                      }`}
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          {idx === 0 && <Medal className="w-5 h-5 text-amber-500" />}
                          {idx === 1 && <Medal className="w-5 h-5 text-slate-400" />}
                          {idx === 2 && <Medal className="w-5 h-5 text-amber-700" />}
                          {idx > 2 && <span className="font-bold text-slate-500">{idx + 1}</span>}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          {g.golferAvatar ? (
                            <img
                              src={g.golferAvatar}
                              alt={g.golferName}
                              className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0"
                            />
                          ) : (
                            <div className="w-9 h-9 rounded-full bg-slate-900 text-emerald-400 font-bold text-xs flex items-center justify-center border border-slate-800 shrink-0">
                              {g.golferName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
                            </div>
                          )}
                          <div>
                            <span className="font-bold text-slate-900 block text-xs">
                              {g.golferName} {isCurrentUser && "(You)"}
                            </span>
                            <span className="text-[11px] text-slate-400 block">
                              {g.bracket}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-slate-800 font-medium">{g.homeClub}</span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="font-black text-slate-900 text-sm">{g.handicap}</span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="font-semibold text-slate-700">{g.roundsCount}</span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="font-black text-emerald-800 text-sm">{g.avgGrossScore}</span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => navigate("/partners")}
                          className="text-xs font-bold text-emerald-800 hover:text-emerald-950 cursor-pointer"
                        >
                          Challenge &rarr;
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
