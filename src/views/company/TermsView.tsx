import React from "react";
import { ShieldCheck, FileText, CheckCircle2, AlertCircle } from "lucide-react";

export const TermsView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-800">
          Legal & Governance
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Terms of Service
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
          Last updated: September 2026. Please read these terms carefully before using the Golfly platform.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl">
          <ShieldCheck className="w-6 h-6 text-emerald-700 shrink-0" />
          <p className="text-xs text-emerald-950 font-medium">
            <strong>Community Overview:</strong> Golfly is designed to foster fair play, accurate handicap tracking, and respectful sportsmanship across all golf clubs and courses.
          </p>
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-900 mb-2">1. Acceptance of Terms</h2>
          <p>
            By creating an account or accessing any feature of Golfly (including Partner Matchmaking, Course Caddie, Tournament Hub, and Marketplace), you agree to be bound by these Terms of Service and all applicable sportsmanship standards.
          </p>
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-900 mb-2">2. Golfer Profiles & Handicap Accuracy</h2>
          <p>
            Users are required to provide accurate, honest information regarding their handicap index, home club affiliations, and playing records. Intentionally falsifying handicap differentials or misrepresenting playing abilities in tournament fixtures is strictly prohibited and grounds for account termination.
          </p>
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-900 mb-2">3. Peer-to-Peer Marketplace Conduct</h2>
          <p>
            The Golfly Marketplace facilitates peer-to-peer exchanges of authentic golf equipment between verified community members. Sellers are responsible for accurate condition descriptions and pricing. Golfly does not take transactional cuts or hold custody of funds.
          </p>
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-900 mb-2">4. Tournament RSVPs and Commitments</h2>
          <p>
            When registering for a club tournament, medal round, or member match through Golfly, players are expected to honor their tee time commitment or cancel promptly in advance to allow waitlisted members to participate.
          </p>
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-900 mb-2">5. On-Course & Community Etiquette</h2>
          <p>
            Golfly upholds traditional golf values: integrity, punctuality, care for the golf course (repairing ball marks, raking bunkers, replacing divots), and mutual respect between golfers of all handicap brackets. Harassment or abusive conduct in direct messaging will result in permanent removal.
          </p>
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-900 mb-2">6. Limitation of Liability</h2>
          <p>
            Course weather telemetry, wind calculations, and tactical caddie recommendations are provided for recreational guidance. Golfly does not warrant course availability or weather guarantees governed by local course secretariats.
          </p>
        </div>

        <div className="pt-4 border-t border-slate-100 text-xs text-slate-500">
          Questions regarding these terms? Contact us at <strong className="text-slate-800">legal@golfly.app</strong>.
        </div>
      </div>
    </div>
  );
};
