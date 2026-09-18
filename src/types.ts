export type LahoreClubId =
  | "defence-raya"
  | "lahore-garrison"
  | "lahore-gymkhana"
  | "royal-palm"
  | "paf-skyview"
  | "the-oasis";

export interface ClubInfo {
  id: LahoreClubId;
  name: string;
  shortName: string;
  location: string;
  address?: string;
  email?: string;
  phone?: string;
  rating?: number;
  reviewCount?: number;
  holes: number;
  par: number;
  yardage?: number | string;
  area?: string;
  designer?: string;
  foundedYear?: number;
  courseType?: string;
  hole19Mapped?: boolean;
  keyDetails: string;
  practiceFacilities?: string[];
  diningAndLounges?: string[];
  amenities: string[];
  imageUrl: string;
  forecast?: Array<{
    day: string;
    condition: string;
    tempC: number;
    iconType?: "clear-day" | "clear-night" | "partly-cloudy";
  }>;
  currentConditions: {
    aqi: number;
    smogLevel: string;
    tempC: number;
    windKmH: number;
    visibilityMeters: number;
    greenSpeed: string;
    fairwayCondition: string;
    advisory: string;
  };
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  avatarUrl: string;
  homeClub: string;
  secondaryClubs: string[];
  handicap: number;
  handicapCategory: "Scratch - 5" | "6 - 12" | "13 - 18" | "19 - 28" | "Beginner (28+)";
  memberNumber?: string;
  bio: string;
  playingStyle: "Competitive Matchplay" | "Casual Weekend" | "Early Morning Walker" | "Afternoon Twilight";
  preferredDays: string[];
  preferredTimeSlot: "Early Morning (6:30 - 8:30 AM)" | "Mid Morning (9:00 - 11:30 AM)" | "Afternoon Twilight (2:00 - 5:00 PM)";
  joinedDate: string;
  honoursCount: number;
  roundsLogged: number;
  isVerifiedLahoreGolfer: boolean;
}

export interface GolferPartner {
  id: string;
  fullName: string;
  avatarUrl: string;
  homeClub: string;
  handicap: number;
  distanceKm: number;
  preferredTiming: string;
  availableDays: string[];
  playingStyle: string;
  bio: string;
  compatibilityScore: number;
  pastRoundsTogether: number;
  recentActivity: string;
}

export interface Tournament {
  id: string;
  title: string;
  clubName: string;
  clubId: LahoreClubId;
  date: string;
  time: string;
  format: "Stroke Play" | "Stableford" | "Scramble" | "Four-Ball" | "Match Play";
  eligibility: string;
  totalSlots: number;
  registeredCount: number;
  isFreeRegistration: true;
  organizer: string;
  description: string;
  rules: string[];
  prizes: string[];
  registeredUsers: string[];
}

export interface MarketplaceItem {
  id: string;
  title: string;
  category: "Drivers & Woods" | "Iron Sets" | "Wedges & Putters" | "Bags & Carts" | "Apparel & Shoes" | "Rangefinders & Tech";
  brand: string;
  condition: "Brand New" | "Mint (Like New)" | "Very Good" | "Good" | "Fair";
  pricePKR: number; // Stated price or 0 for P2P trade/gift
  isTradeOrFree: boolean;
  clubLocation: string;
  sellerName: string;
  sellerAvatar: string;
  sellerHandicap: number;
  sellerPhone?: string;
  description: string;
  images: string[];
  postedAt: string;
  status: "Available" | "Pending Handshake" | "Sold";
}

export interface CareerHonour {
  id: string;
  title: string;
  tournamentOrEvent: string;
  club: string;
  year: number;
  category: "Championship Winner" | "Club Captain Prize" | "Hole-in-One" | "Gross Winner" | "Net Winner" | "Longest Drive" | "Nearest the Pin";
  trophyIcon: "trophy" | "medal" | "award" | "target" | "flag" | "star";
  certificateUrl?: string;
  verifiedByClub: boolean;
  notes: string;
}

export interface RoundRecord {
  id: string;
  date: string;
  club: string;
  holesPlayed: 9 | 18;
  grossScore: number;
  netScore: number;
  toPar: number;
  fairwaysHit: number;
  totalFairways: number;
  greensInRegulation: number;
  totalPutts: number;
  penalties: number;
  partners: string[];
  notes: string;
}

export interface PracticeLog {
  id: string;
  date: string;
  facility: string; // e.g. "Raya Driving Range", "Garrison Range"
  focusArea: "Driver & Woods" | "Iron Play" | "Wedges & Chipping" | "Putting Green" | "Full Bag Warmup";
  ballsHit: number;
  durationMinutes: number;
  keyTakeaway: string;
  ratingOutOfFive: number;
}

export interface LeaderboardEntry {
  rank: number;
  golferName: string;
  golferAvatar: string;
  homeClub: string;
  handicap: number;
  bracket: "Scratch - 5" | "6 - 12" | "13 - 18" | "19 - 28";
  roundsCount: number;
  avgGrossScore: number;
  bestDifferential: number;
  monthlyPoints: number;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isSelf: boolean;
}

export interface ChatConversation {
  id: string;
  partnerId: string;
  partnerName: string;
  partnerAvatar: string;
  partnerClub: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: ChatMessage[];
}
