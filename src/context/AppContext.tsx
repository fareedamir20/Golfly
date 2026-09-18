import React, { createContext, useContext, useState, useEffect } from "react";
import {
  UserProfile,
  Tournament,
  MarketplaceItem,
  CareerHonour,
  RoundRecord,
  PracticeLog,
  ChatConversation,
  GolferPartner
} from "../types";

interface AppContextType {
  currentPath: string;
  navigate: (path: string) => void;
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string) => void;
  signup: (userData: Partial<UserProfile>) => void;
  logout: () => void;
  updateUser: (data: Partial<UserProfile>) => void;
  completeOnboarding: (data: Partial<UserProfile>) => void;

  // Tournaments
  tournaments: Tournament[];
  rsvpTournament: (tournamentId: string) => boolean;
  addTournament: (tournament: Omit<Tournament, "id" | "registeredUsers" | "registeredCount">) => void;

  // Marketplace
  marketplace: MarketplaceItem[];
  addMarketplaceItem: (item: Omit<MarketplaceItem, "id" | "postedAt" | "status" | "sellerName" | "sellerAvatar" | "sellerHandicap">) => void;

  // Conversations & Chat
  conversations: ChatConversation[];
  activeConvId: string | null;
  setActiveConvId: (id: string | null) => void;
  sendMessage: (convId: string, text: string) => void;
  startChatWithPartner: (partner: GolferPartner) => string;

  // Friends & Partners
  partners: GolferPartner[];
  addPartner: (partner: Omit<GolferPartner, "id">) => void;
  friends: string[];
  pendingFriendRequests: string[];
  sendFriendRequest: (partnerId: string) => void;
  acceptFriendRequest: (partnerId: string) => void;

  // Honours & Showcase
  honours: CareerHonour[];
  addHonour: (honour: Omit<CareerHonour, "id" | "verifiedByClub">) => void;

  // Rounds & Practice
  rounds: RoundRecord[];
  addRound: (round: Omit<RoundRecord, "id">) => void;
  practiceLogs: PracticeLog[];
  addPracticeLog: (log: Omit<PracticeLog, "id">) => void;

  // Toast / Feedback
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Routing state
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return window.location.pathname || "/";
    }
    return "/";
  });

  // Auth state - start without demo user
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem("golfly_user");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return null;
  });

  const [tournaments, setTournaments] = useState<Tournament[]>(() => {
    const saved = localStorage.getItem("golfly_tournaments");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [];
  });

  const [marketplace, setMarketplace] = useState<MarketplaceItem[]>(() => {
    const saved = localStorage.getItem("golfly_marketplace");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [];
  });

  const [conversations, setConversations] = useState<ChatConversation[]>(() => {
    const saved = localStorage.getItem("golfly_conversations");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [];
  });

  const [activeConvId, setActiveConvId] = useState<string | null>(null);

  const [partners, setPartners] = useState<GolferPartner[]>(() => {
    const saved = localStorage.getItem("golfly_partners");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) { /* ignore */ }
    }
    return [
      {
        id: "p1",
        fullName: "Ahmad Yar Khan",
        avatarUrl: "",
        homeClub: "Defence Raya Golf & Country Club",
        handicap: 4.2,
        distanceKm: 2.5,
        preferredTiming: "Early Morning (6:30 AM)",
        availableDays: ["Saturday", "Sunday"],
        playingStyle: "Competitive Matchplay",
        bio: "Single digit golfer looking for fast-paced weekend four-ball games. Plays regularly at Defence Raya.",
        compatibilityScore: 98,
        pastRoundsTogether: 3,
        recentActivity: "Logged 76 (+4) at Defence Raya yesterday"
      },
      {
        id: "p2",
        fullName: "Kamran Hassan",
        avatarUrl: "",
        homeClub: "Lahore Gymkhana Golf Club",
        handicap: 9.8,
        distanceKm: 4.1,
        preferredTiming: "Afternoon (2:00 PM)",
        availableDays: ["Friday", "Sunday"],
        playingStyle: "Relaxed Social",
        bio: "Historic Gymkhana member. Enjoys twilight rounds and post-game tea at the veranda.",
        compatibilityScore: 94,
        pastRoundsTogether: 1,
        recentActivity: "Joined 4-Ball Tournament at Gymkhana"
      },
      {
        id: "p3",
        fullName: "Zainab Malik",
        avatarUrl: "",
        homeClub: "Royal Palm Golf & Country Club",
        handicap: 11.5,
        distanceKm: 5.8,
        preferredTiming: "Morning (8:00 AM)",
        availableDays: ["Saturday"],
        playingStyle: "Steady & Tactical",
        bio: "Royal Palm regular. Focused on short-game precision and fairway accuracy.",
        compatibilityScore: 91,
        pastRoundsTogether: 0,
        recentActivity: "Updated handicap index to 11.5"
      },
      {
        id: "p4",
        fullName: "Bilal Chaudhry",
        avatarUrl: "",
        homeClub: "Lahore Garrison Golf Club",
        handicap: 14.0,
        distanceKm: 6.2,
        preferredTiming: "Morning (7:30 AM)",
        availableDays: ["Saturday", "Sunday"],
        playingStyle: "Casual Weekend",
        bio: "Garrison member enjoying friendly strokeplay and 18-hole weekend outings.",
        compatibilityScore: 89,
        pastRoundsTogether: 2,
        recentActivity: "Logged 85 (+13) at Garrison Golf Club"
      }
    ];
  });

  const [friends, setFriends] = useState<string[]>(() => {
    const saved = localStorage.getItem("golfly_friends");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [];
  });

  const [pendingFriendRequests, setPendingFriendRequests] = useState<string[]>([]);

  const [honours, setHonours] = useState<CareerHonour[]>(() => {
    const saved = localStorage.getItem("golfly_honours");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [];
  });

  const [rounds, setRounds] = useState<RoundRecord[]>(() => {
    const saved = localStorage.getItem("golfly_rounds");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [];
  });

  const [practiceLogs, setPracticeLogs] = useState<PracticeLog[]>(() => {
    const saved = localStorage.getItem("golfly_practice");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [];
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync route with browser history
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || "/");
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (path: string) => {
    setCurrentPath(path);
    if (typeof window !== "undefined" && window.location.pathname !== path) {
      window.history.pushState({}, "", path);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const login = (email: string) => {
    const loggedUser: UserProfile = {
      id: `usr-${Date.now()}`,
      fullName: email ? email.split("@")[0] : "Golfer",
      email: email || "golfer@golfly.app",
      avatarUrl: "",
      homeClub: "Pine Valley Country Club",
      secondaryClubs: [],
      handicap: 12,
      handicapCategory: "6 - 12",
      bio: "Golf enthusiast and active player.",
      playingStyle: "Casual Weekend",
      preferredDays: ["Saturday", "Sunday"],
      preferredTimeSlot: "Early Morning (6:30 - 8:30 AM)",
      joinedDate: "September 2026",
      honoursCount: 0,
      roundsLogged: 0,
      isVerifiedLahoreGolfer: true
    };
    setUser(loggedUser);
    localStorage.setItem("golfly_user", JSON.stringify(loggedUser));
    showToast(`Welcome back, ${loggedUser.fullName}!`);
    navigate("/dashboard");
  };

  const signup = (userData: Partial<UserProfile>) => {
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      fullName: userData.fullName || "Golfer",
      email: userData.email || "golfer@golfly.app",
      phone: userData.phone || "",
      avatarUrl: userData.avatarUrl || "",
      homeClub: userData.homeClub || "Pine Valley Country Club",
      secondaryClubs: userData.secondaryClubs || [],
      handicap: userData.handicap ?? 14,
      handicapCategory: (userData.handicap ?? 14) <= 5 ? "Scratch - 5" : (userData.handicap ?? 14) <= 12 ? "6 - 12" : (userData.handicap ?? 14) <= 18 ? "13 - 18" : "19 - 28",
      memberNumber: userData.memberNumber || "",
      bio: userData.bio || "Passionate golfer looking for playing partners and tracking improvement.",
      playingStyle: userData.playingStyle || "Casual Weekend",
      preferredDays: userData.preferredDays || ["Saturday", "Sunday"],
      preferredTimeSlot: userData.preferredTimeSlot || "Early Morning (6:30 - 8:30 AM)",
      joinedDate: "September 2026",
      honoursCount: 0,
      roundsLogged: 0,
      isVerifiedLahoreGolfer: true,
      ...userData
    };
    setUser(newUser);
    localStorage.setItem("golfly_user", JSON.stringify(newUser));
    showToast("Account created! Let's complete your golfer profile.");
    navigate("/auth/onboarding");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("golfly_user");
    showToast("You have been signed out.");
    navigate("/");
  };

  const updateUser = (data: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem("golfly_user", JSON.stringify(updated));
    showToast("Profile settings updated successfully.");
  };

  const completeOnboarding = (data: Partial<UserProfile>) => {
    if (!user) return;
    const updated = {
      ...user,
      ...data,
      isVerifiedLahoreGolfer: true
    };
    setUser(updated);
    localStorage.setItem("golfly_user", JSON.stringify(updated));
    showToast("Onboarding complete! Welcome to Golfly.");
    navigate("/dashboard");
  };

  const rsvpTournament = (tournamentId: string): boolean => {
    if (!user) {
      showToast("Please sign in or create an account to register.");
      navigate("/auth/login");
      return false;
    }

    setTournaments((prev) => {
      const updated = prev.map((t) => {
        if (t.id === tournamentId) {
          const isAlready = t.registeredUsers.includes(user.id);
          const updatedUsers = isAlready
            ? t.registeredUsers.filter((uid) => uid !== user.id)
            : [...t.registeredUsers, user.id];
          return {
            ...t,
            registeredCount: isAlready ? t.registeredCount - 1 : t.registeredCount + 1,
            registeredUsers: updatedUsers
          };
        }
        return t;
      });
      localStorage.setItem("golfly_tournaments", JSON.stringify(updated));
      return updated;
    });

    showToast("Tournament registration updated successfully.");
    return true;
  };

  const addTournament = (
    tournamentData: Omit<Tournament, "id" | "registeredUsers" | "registeredCount">
  ) => {
    const newTournament: Tournament = {
      ...tournamentData,
      id: `tourn-${Date.now()}`,
      registeredCount: 1,
      registeredUsers: user ? [user.id] : []
    };
    setTournaments((prev) => {
      const updated = [newTournament, ...prev];
      localStorage.setItem("golfly_tournaments", JSON.stringify(updated));
      return updated;
    });
    showToast("Tournament created and published!");
  };

  const addMarketplaceItem = (
    itemData: Omit<MarketplaceItem, "id" | "postedAt" | "status" | "sellerName" | "sellerAvatar" | "sellerHandicap">
  ) => {
    const newItem: MarketplaceItem = {
      ...itemData,
      id: `gear-${Date.now()}`,
      postedAt: "Just now",
      status: "Available",
      sellerName: user?.fullName || "Golfer",
      sellerAvatar: user?.avatarUrl || "",
      sellerHandicap: user?.handicap || 12,
      sellerPhone: user?.phone || ""
    };
    setMarketplace((prev) => {
      const updated = [newItem, ...prev];
      localStorage.setItem("golfly_marketplace", JSON.stringify(updated));
      return updated;
    });
    showToast("Gear listing published to the Pro Shop!");
  };

  const sendMessage = (convId: string, text: string) => {
    if (!text.trim() || !user) return;

    setConversations((prev) => {
      const updated = prev.map((c) => {
        if (c.id === convId) {
          const newMsg = {
            id: `msg-${Date.now()}`,
            senderId: user.id,
            senderName: user.fullName,
            text: text.trim(),
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            isSelf: true
          };
          return {
            ...c,
            lastMessage: text.trim(),
            lastMessageTime: "Just now",
            messages: [...c.messages, newMsg]
          };
        }
        return c;
      });
      localStorage.setItem("golfly_conversations", JSON.stringify(updated));
      return updated;
    });
  };

  const startChatWithPartner = (partner: GolferPartner): string => {
    const existing = conversations.find((c) => c.partnerId === partner.id);
    if (existing) {
      setActiveConvId(existing.id);
      navigate("/messages");
      return existing.id;
    }

    const newConv: ChatConversation = {
      id: `conv-${Date.now()}`,
      partnerId: partner.id,
      partnerName: partner.fullName,
      partnerAvatar: partner.avatarUrl,
      partnerClub: partner.homeClub,
      lastMessage: "Conversation initiated",
      lastMessageTime: "Just now",
      unreadCount: 0,
      messages: [
        {
          id: `msg-welcome-${Date.now()}`,
          senderId: "system",
          senderName: "Golfly",
          text: `You connected with ${partner.fullName} (${partner.homeClub}, Hcp ${partner.handicap}). Send a message to coordinate your tee time!`,
          timestamp: "Just now",
          isSelf: false
        }
      ]
    };

    setConversations((prev) => {
      const updated = [newConv, ...prev];
      localStorage.setItem("golfly_conversations", JSON.stringify(updated));
      return updated;
    });
    setActiveConvId(newConv.id);
    navigate("/messages");
    return newConv.id;
  };

  const addPartner = (partnerData: Omit<GolferPartner, "id">) => {
    const newPartner: GolferPartner = {
      ...partnerData,
      id: `partner-${Date.now()}`
    };
    setPartners((prev) => {
      const updated = [newPartner, ...prev];
      localStorage.setItem("golfly_partners", JSON.stringify(updated));
      return updated;
    });
    showToast("Golfer profile added to partner match directory!");
  };

  const sendFriendRequest = (partnerId: string) => {
    if (friends.includes(partnerId)) {
      showToast("You are already connected as golf partners!");
      return;
    }
    if (pendingFriendRequests.includes(partnerId)) {
      showToast("Partner request already pending.");
      return;
    }
    setPendingFriendRequests((prev) => [...prev, partnerId]);
    showToast("Golf buddy invite sent!");
  };

  const acceptFriendRequest = (partnerId: string) => {
    setPendingFriendRequests((prev) => prev.filter((id) => id !== partnerId));
    setFriends((prev) => {
      const updated = [...prev, partnerId];
      localStorage.setItem("golfly_friends", JSON.stringify(updated));
      return updated;
    });
    showToast("Partner accepted! Added to your Golf Network.");
  };

  const addHonour = (honourData: Omit<CareerHonour, "id" | "verifiedByClub">) => {
    const newHonour: CareerHonour = {
      ...honourData,
      id: `honour-${Date.now()}`,
      verifiedByClub: true
    };
    setHonours((prev) => {
      const updated = [newHonour, ...prev];
      localStorage.setItem("golfly_honours", JSON.stringify(updated));
      return updated;
    });
    if (user) {
      setUser({ ...user, honoursCount: (user.honoursCount || 0) + 1 });
    }
    showToast("Trophy added to your Career Honours Showcase!");
  };

  const addRound = (roundData: Omit<RoundRecord, "id">) => {
    const newRound: RoundRecord = {
      ...roundData,
      id: `round-${Date.now()}`
    };
    setRounds((prev) => {
      const updated = [newRound, ...prev];
      localStorage.setItem("golfly_rounds", JSON.stringify(updated));
      return updated;
    });
    if (user) {
      setUser({ ...user, roundsLogged: (user.roundsLogged || 0) + 1 });
    }
    showToast("Round saved! Stats updated automatically.");
  };

  const addPracticeLog = (logData: Omit<PracticeLog, "id">) => {
    const newLog: PracticeLog = {
      ...logData,
      id: `prac-${Date.now()}`
    };
    setPracticeLogs((prev) => {
      const updated = [newLog, ...prev];
      localStorage.setItem("golfly_practice", JSON.stringify(updated));
      return updated;
    });
    showToast("Practice session logged successfully!");
  };

  return (
    <AppContext.Provider
      value={{
        currentPath,
        navigate,
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        updateUser,
        completeOnboarding,
        tournaments,
        rsvpTournament,
        addTournament,
        marketplace,
        addMarketplaceItem,
        conversations,
        activeConvId,
        setActiveConvId,
        sendMessage,
        startChatWithPartner,
        partners,
        addPartner,
        friends,
        pendingFriendRequests,
        sendFriendRequest,
        acceptFriendRequest,
        honours,
        addHonour,
        rounds,
        addRound,
        practiceLogs,
        addPracticeLog,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};

