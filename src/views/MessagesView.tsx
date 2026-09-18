import React, { useState } from "react";
import {
  MessageSquare,
  Send,
  User,
  Phone,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles
} from "lucide-react";
import { useApp } from "../context/AppContext";

export const MessagesView: React.FC = () => {
  const { conversations, activeConvId, setActiveConvId, sendMessage, user } = useApp();
  const [inputText, setInputText] = useState("");

  const activeConvo = conversations.find((c) => c.id === activeConvId) || conversations[0];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConvo) return;
    sendMessage(activeConvo.id, inputText);
    setInputText("");
  };

  const handleQuickTeeTime = () => {
    if (!activeConvo) return;
    const quickMsg = "Tee time proposal: Let's book 7:30 AM this Saturday at Defence Raya. Let me know if that works for your 4-ball!";
    sendMessage(activeConvo.id, quickMsg);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden min-h-[75vh] grid grid-cols-1 md:grid-cols-12">
        {/* Left List of Conversations */}
        <div className="md:col-span-4 border-r border-slate-200 flex flex-col">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-700" />
              <span>Golfer Direct Messages</span>
            </h2>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
              {conversations.length} Active
            </span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {conversations.map((c) => {
              const isActive = c.id === activeConvo?.id;
              const lastMsg = c.messages[c.messages.length - 1];

              return (
                <button
                  key={c.id}
                  onClick={() => setActiveConvId(c.id)}
                  className={`w-full p-4 text-left transition-colors flex items-start gap-3 cursor-pointer ${
                    isActive ? "bg-emerald-50/80" : "hover:bg-slate-50"
                  }`}
                >
                  <img
                    src={c.partnerAvatar}
                    alt={c.partnerName}
                    className="w-10 h-10 rounded-full object-cover shrink-0 border border-slate-200"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-bold text-xs text-slate-900 truncate">
                        {c.partnerName}
                      </span>
                      {c.unreadCount > 0 && (
                        <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 truncate">
                      {lastMsg?.text || c.lastMessage || "No messages yet"}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Active Chat Window */}
        <div className="md:col-span-8 flex flex-col bg-slate-50/50">
          {activeConvo ? (
            <>
              {/* Header */}
              <div className="p-4 bg-white border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={activeConvo.partnerAvatar}
                    alt={activeConvo.partnerName}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">
                      {activeConvo.partnerName}
                    </h3>
                    <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      {activeConvo.partnerClub}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleQuickTeeTime}
                    className="px-3 py-1.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Propose Weekend Tee Time</span>
                    <span className="sm:hidden">Tee Time</span>
                  </button>
                </div>
              </div>

              {/* Message History */}
              <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-3">
                {activeConvo.messages.map((m) => {
                  const isMe = m.isSelf || m.senderId === user?.id || m.senderId === "usr-lahore-101";
                  return (
                    <div
                      key={m.id}
                      className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-sm sm:max-w-md rounded-2xl px-4 py-2.5 text-xs leading-relaxed shadow-xs ${
                          isMe
                            ? "bg-emerald-800 text-white rounded-br-none"
                            : "bg-white text-slate-800 border border-slate-200 rounded-bl-none"
                        }`}
                      >
                        <p>{m.text}</p>
                        <span
                          className={`text-[9px] mt-1 block text-right ${
                            isMe ? "text-emerald-200" : "text-slate-400"
                          }`}
                        >
                          {m.timestamp}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Input bar */}
              <form
                onSubmit={handleSend}
                className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={`Message ${activeConvo.partnerName}...`}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
                <button
                  type="submit"
                  className="p-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white transition-colors cursor-pointer shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-400 text-xs">
              Select a conversation to start messaging.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
