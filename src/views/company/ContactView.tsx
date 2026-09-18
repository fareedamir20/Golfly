import React, { useState } from "react";
import { Mail, MapPin, Phone, MessageSquare, CheckCircle2, ShieldCheck } from "lucide-react";

export const ContactView: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [club, setClub] = useState("Defence Raya Golf & Country Club");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-800">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Support, Club Liaisons & Feedback
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
          Need assistance, want to register an official club tournament, or suggest a new feature? We are here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Contact Info */}
        <div className="md:col-span-5 bg-emerald-950 text-white rounded-3xl p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white mb-2">Golfly Support Desk</h3>
            <p className="text-xs text-emerald-200/80 leading-relaxed">
              Available 7 days a week for golfers, tournament coordinators, and club secretariats.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400 block text-[11px]">Direct Email</span>
                <span className="text-white font-medium">community@golfly.app</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400 block text-[11px]">Member Helpline</span>
                <span className="text-white font-medium">+1 (800) 555-4653</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400 block text-[11px]">Global Support</span>
                <span className="text-white font-medium">Golfly Headquarters</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-emerald-900 text-xs text-emerald-300/80">
            <ShieldCheck className="w-4 h-4 inline mr-1 text-emerald-400" />
            Dedicated Golfer Community Service
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          {submitted ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Message Dispatched!</h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Thank you, {name}. A member of our community team will reply to your email ({email}) shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-bold text-base text-slate-900 mb-2">Send us a Message</h3>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Asad Malik"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Home Club</label>
                <select
                  value={club}
                  onChange={(e) => setClub(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden bg-white"
                >
                  <option value="Defence Raya Golf & Country Club">Defence Raya Golf & Country Club</option>
                  <option value="Lahore Garrison Golf & Country Club">Lahore Garrison Golf & Country Club</option>
                  <option value="Lahore Gymkhana Golf Club">Lahore Gymkhana Golf Club</option>
                  <option value="Royal Palm Golf & Country Club">Royal Palm Golf & Country Club</option>
                  <option value="PAF Skyview Golf & Country Club">PAF Skyview Golf & Country Club</option>
                  <option value="The Oasis Golf & Aqua Resort">The Oasis Golf & Aqua Resort</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Message / Inquiry</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help your golf game, club, or tournament?"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
