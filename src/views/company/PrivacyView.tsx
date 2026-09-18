import React from "react";
import { ShieldCheck, Lock, EyeOff, Server, FileText } from "lucide-react";

export const PrivacyView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-800">
          Trust & Security
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Privacy Policy & Member Protection
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
          How we handle data on Golfly with strict privacy standards and zero data monetization.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl">
          <ShieldCheck className="w-6 h-6 text-emerald-700 shrink-0" />
          <p className="text-xs text-emerald-950 font-medium">
            <strong>Key Summary:</strong> We do not sell your personal data, we do not run intrusive ad tracking, and your golfer profile belongs solely to you.
          </p>
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-900 mb-2">1. Data We Collect</h2>
          <p>
            When you register on Golfly, we collect: your name, email address, declared home golf club, handicap index, and equipment preferences. This information is solely used to power player matching, tournament registration, and course caddie recommendations.
          </p>
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-900 mb-2">2. Zero Commercial Monetization</h2>
          <p>
            Unlike commercial platforms that monetize by selling contact numbers or behavioral ads to third-party brokers, Golfly never sells, rents, or licenses member data to advertisers.
          </p>
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-900 mb-2">3. Direct Messaging & Marketplace Privacy</h2>
          <p>
            Peer-to-peer conversations and marketplace inquiries are confidential between the communicating members. Contact details are only shared when you explicitly opt to exchange them with a matched golf partner.
          </p>
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-900 mb-2">4. Course Caddie Interactions</h2>
          <p>
            Tactical questions asked to the Course Caddie are processed anonymously to generate accurate ball-flight and course advice. No personally identifiable identity is attached to telemetry queries.
          </p>
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-900 mb-2">5. Data Deletion Rights</h2>
          <p>
            You have the absolute right to delete your profile, handicap history, marketplace listings, and tournament RSVPs at any time via your account settings.
          </p>
        </div>
      </div>
    </div>
  );
};
