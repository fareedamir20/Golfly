import React from "react";
import { Quote, Sparkles, HeartHandshake, MapPin } from "lucide-react";
import { useApp } from "../../context/AppContext";

export const FounderView: React.FC = () => {
  const { navigate } = useApp();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-800">
          Founder's Note
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          A Letter to Fellow Golfers
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Why we built Golfly.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs space-y-6 relative">
        <Quote className="w-10 h-10 text-emerald-100 absolute top-6 right-6 pointer-events-none" />

        <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
          <div className="w-14 h-14 rounded-2xl bg-emerald-900 border-2 border-emerald-600 flex items-center justify-center overflow-hidden p-1 shadow-xs shrink-0">
            <img
              src="/logo.png"
              alt="Golfly Logo"
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900">Fareed Amir</h3>
            <p className="text-xs text-slate-500">Future Tech Founder & Platform Visionary</p>
            <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-medium mt-0.5">
              <MapPin className="w-3 h-3" />
              <span>Dedicated Golfer & Platform Founder</span>
            </div>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-serif">
          <p>
            "Dear fellow golfer,
          </p>
          <p>
            Golf is more than just hitting a small white ball over 7,000 yards. It is about waking up at 5:45 AM on a crisp morning, grabbing a hot beverage at the clubhouse veranda, and heading to the first tee with three good friends.
          </p>
          <p>
            Yet, over the past few years, as schedules grew busier and technology became fragmented, organizing rounds became tedious. Finding fourths for a four-ball meant searching through scattered group chats. Buying and selling gently used clubs meant paying heavy fees to middle-tier brokers. And finding verified course weather and green speeds was purely guesswork.
          </p>
          <p>
            I built <strong>Golfly</strong> as a modern companion platform for golfers and golf clubs everywhere. From day one, my goal was unwavering: Golfly must be an accessible, community-first home for players. A unified place to coordinate games, explore club guides, track scorecards, and connect with fellow golfers.
          </p>
          <p>
            Whether you tee it up at dawn or walk the fairways at twilight, this platform belongs to you. See you on the greens!"
          </p>
          <p className="pt-2 font-sans font-bold text-slate-900">
            Warm regards, <br />
            Fareed Amir
          </p>
        </div>
      </div>
    </div>
  );
};
