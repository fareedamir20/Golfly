import { ClubInfo } from "../types";
import defenceRayaCover from "../assets/images/defence_raya_cover_1789743260454.jpg";
import gymkhanaCover from "../assets/images/gymkhana_cover_1789743589279.jpg";
import royalPalmCover from "../assets/images/royal_palm_cover_1789743745684.jpg";
import pafSkyviewCover from "../assets/images/paf_skyview_cover_1789743762323.jpg";

export const LAHORE_CLUBS: ClubInfo[] = [
  {
    id: "defence-raya",
    name: "Defence Raya Golf & Country Club",
    shortName: "Defence Raya",
    location: "DHA Phase 6, Lahore",
    address: "Defence Raya Golf Resort, Avenue 8, Lahore, Pakistan",
    email: "info@drgcc.com",
    website: "https://www.drgcc.com",
    rating: 4.8,
    reviewCount: 84,
    courseType: "Private Championship",
    hole19Mapped: true,
    holes: 18,
    par: 72,
    designer: "Nelson & Haworth",
    keyDetails: "Defence Raya Golf & Country Club is a private 18-hole course in Lahore, Punjab, Pakistan, rated 4.8 by 80+ Hole19 golfers and one of the most-played courses in Punjab on Hole19. Spread across an expansive landscape, this premier championship layout features rolling lush fairways, seven lakes, and world-class hospitality.",
    practiceFacilities: [
      "11-stall driving range",
      "Dedicated putting green",
      "Elevated chipping green with practice bunker"
    ],
    diningAndLounges: [
      "The Roof restaurant - Freshly prepared BBQ à la carte dinner dishes with live soothing music",
      "Golfer's Lounge - Hot and cold beverages with lighter food options",
      "Cigar Lounges - Premium cigars with luxurious seating",
      "Roof View Garden - Panoramic scenic resort vistas"
    ],
    amenities: [
      "Private 18-Hole Championship Layout",
      "11-Stall Driving Range",
      "Elevated Chipping Green & Bunker",
      "The Roof Restaurant (BBQ & Live Music)",
      "Golfer's Lounge",
      "Executive Cigar Lounges",
      "Roof View Garden",
      "Mapped on Hole19 App"
    ],
    imageUrl: defenceRayaCover,
    forecast: [
      { day: "Today", condition: "Clear Night / Fair", tempC: 30, iconType: "clear-night" },
      { day: "Sat", condition: "Clear Day", tempC: 35, iconType: "clear-day" },
      { day: "Sun", condition: "Clear Day", tempC: 36, iconType: "clear-day" },
      { day: "Mon", condition: "Clear Day", tempC: 37, iconType: "clear-day" },
      { day: "Tue", condition: "Clear Day", tempC: 37, iconType: "clear-day" },
      { day: "Wed", condition: "Clear Day", tempC: 37, iconType: "clear-day" }
    ],
    currentConditions: {
      aqi: 142,
      smogLevel: "Moderate Haze",
      tempC: 30,
      windKmH: 9,
      visibilityMeters: 4500,
      greenSpeed: "10.5 Stimp",
      fairwayCondition: "Lush & Fast Rolling",
      advisory: "Fairways rolling fast. Rated 4.8 on Hole19. Range & The Roof restaurant open."
    }
  },
  {
    id: "lahore-garrison",
    name: "Lahore Garrison Golf & Country Club",
    shortName: "Garrison Golf",
    location: "Lahore Cantonment",
    website: "https://www.lggcc.com.pk",
    holes: 18,
    par: 72,
    area: "Covers approximately 129 acres",
    keyDetails: "Conceived originally as a 9-hole course in 1982 and upgraded to 18 holes around 1990. It is well-known for its lush fairways, professional infrastructure, and hosting major national-level tournaments like the All Pakistan Garrison Open and Corps Commander Cup.",
    amenities: ["18-Hole Championship Layout", "Championship Driving Range", "Host of All Pakistan Open", "Putting Greens", "Officers Mess & Dining", "Pro Equipment Service"],
    imageUrl: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1000&q=80",
    currentConditions: {
      aqi: 135,
      smogLevel: "Moderate",
      tempC: 25,
      windKmH: 12,
      visibilityMeters: 5200,
      greenSpeed: "10.0 Stimp",
      fairwayCondition: "Firm & Professional standard",
      advisory: "Excellent visibility across the 129-acre layout. Greens cut early morning."
    }
  },
  {
    id: "lahore-gymkhana",
    name: "Lahore Gymkhana Golf",
    shortName: "Lahore Gymkhana",
    location: "Mall Rd, Lahore",
    address: "Lahore Gymkhana Club, Mall Rd, Lahore, Pakistan",
    website: "https://www.lahoregymkhana.pk",
    rating: 4.0,
    reviewCount: 65,
    courseType: "18-Hole Championship & Historic Club",
    hole19Mapped: true,
    holes: 18,
    par: 72,
    foundedYear: 1878,
    keyDetails: "Lahore Gymkhana Golf is a premier 18-hole championship golf course located in the heart of Lahore, Punjab, Pakistan. Renowned for its lush fairways, strategically designed layout, and serene surroundings, this course attracts both seasoned golfers and newcomers. The meticulously maintained greens provide a challenging yet enjoyable experience for players of all skill levels. The club features excellent practice facilities including a driving range and putting greens, an elegant clubhouse with dining options, locker rooms, and social spaces.",
    practiceFacilities: [
      "Championship driving range",
      "Meticulously maintained putting greens",
      "Short-game practice areas"
    ],
    diningAndLounges: [
      "Elegant Clubhouse Dining & Restaurant",
      "Locker Rooms & Social Spaces",
      "Veranda networking lounges & coffee bar",
      "Historic Members Library & Trophy Room"
    ],
    amenities: [
      "Premier 18-Hole Championship Layout",
      "Driving Range & Putting Greens",
      "Historic Colonial Clubhouse",
      "Clubhouse Dining & Social Spaces",
      "Centuries-Old Banyan Trees",
      "Mapped on Hole19 App"
    ],
    imageUrl: gymkhanaCover,
    forecast: [
      { day: "Today", condition: "Clear Night", tempC: 31, iconType: "clear-night" },
      { day: "Sat", condition: "Clear Day", tempC: 35, iconType: "clear-day" },
      { day: "Sun", condition: "Clear Day", tempC: 36, iconType: "clear-day" },
      { day: "Mon", condition: "Clear Day", tempC: 36, iconType: "clear-day" },
      { day: "Tue", condition: "Clear Day", tempC: 37, iconType: "clear-day" },
      { day: "Wed", condition: "Clear Day", tempC: 37, iconType: "clear-day" }
    ],
    currentConditions: {
      aqi: 152,
      smogLevel: "Moderate",
      tempC: 31,
      windKmH: 8,
      visibilityMeters: 4200,
      greenSpeed: "10.0 Stimp",
      fairwayCondition: "Lush & Meticulously Maintained",
      advisory: "Rated 4.0 on Hole19. Lush fairways and greens in top playing condition. Practice range open."
    }
  },
  {
    id: "royal-palm",
    name: "Royal Palm Golf & Country Club",
    shortName: "Royal Palm",
    location: "52 Canal Bank Road, Lahore",
    address: "Royal Palm Golf and Country Club, 52 Canal Bank Road Lahore, Pakistan",
    email: "info@rpgcc.com",
    website: "https://www.rpgcc.com",
    rating: 4.4,
    reviewCount: 78,
    courseType: "18-Hole Par-72 Championship Course",
    hole19Mapped: true,
    holes: 18,
    par: 72,
    designer: "LDR Consultants (Malaysia)",
    foundedYear: 2002,
    keyDetails: "Royal Palm Golf & Country Club in Lahore, Pakistan — an 18-hole par-72 designed by LDR Consultants, open since 2002. Built around a sprawling railway-themed heritage layout, the course is adorned with stately trees and diverse water hazards. It features multiple dining venues — among them Chameleon restaurant, Dawat restaurant, Cafe Scarlet, The Sports Lounge, and The Churchill Cigar Lounge — alongside a swimming pool, banquet halls, and cinema facilities.",
    practiceFacilities: [
      "Championship driving range",
      "Target putting & practice green",
      "Chipping green & bunker complex"
    ],
    diningAndLounges: [
      "Chameleon Restaurant & Fine Dining",
      "Dawat Traditional & Continental Restaurant",
      "Cafe Scarlet & Terrace Bistro",
      "The Sports Lounge with live broadcasts",
      "The Churchill Cigar Lounge",
      "Banquet Halls & Cinema Facilities"
    ],
    amenities: [
      "18-Hole Par-72 Championship Layout",
      "Designed by LDR Consultants (Open since 2002)",
      "Chameleon & Dawat Dining Venues",
      "The Churchill Cigar Lounge",
      "Sports Lounge & Cafe Scarlet",
      "Swimming Pool, Banquet Halls & Cinema",
      "Mapped on Hole19 App"
    ],
    imageUrl: royalPalmCover,
    forecast: [
      { day: "Today", condition: "Clear Night", tempC: 30, iconType: "clear-night" },
      { day: "Sat", condition: "Clear Day", tempC: 35, iconType: "clear-day" },
      { day: "Sun", condition: "Clear Day", tempC: 35, iconType: "clear-day" },
      { day: "Mon", condition: "Clear Day", tempC: 36, iconType: "clear-day" },
      { day: "Tue", condition: "Clear Day", tempC: 37, iconType: "clear-day" },
      { day: "Wed", condition: "Clear Day", tempC: 37, iconType: "clear-day" }
    ],
    currentConditions: {
      aqi: 148,
      smogLevel: "Moderate",
      tempC: 30,
      windKmH: 10,
      visibilityMeters: 4400,
      greenSpeed: "10.2 Stimp",
      fairwayCondition: "Lush & Fast Rolling",
      advisory: "Rated 4.4 on Hole19. Water hazards active on canal-side holes 6, 7, 13, and 14. Dining venues open."
    }
  },
  {
    id: "paf-skyview",
    name: "PAF Skyview Golf & Country Club Lahore",
    shortName: "PAF Skyview",
    location: "Badian Road opposite, Ali View, Lahore",
    address: "Badian Road opposite, Ali View, Lahore, Punjab 54000, Pakistan",
    phone: "+92 32 3590 1000",
    email: "psgandcc@gmail.com",
    website: "https://pafskyview.com.pk",
    rating: 4.6,
    reviewCount: 72,
    courseType: "PGF-Accredited 18-Hole Championship Layout",
    hole19Mapped: true,
    holes: 18,
    par: 72,
    yardage: "6,773 yards",
    keyDetails: "PAF Skyview Golf & Country Club Lahore is a PGF-accredited, par-72 layout stretching 6,773 yards across 18 holes in Lahore, Punjab, Pakistan. The course presents a varied mix of hazards and obstacles that test approach play and route management on the way to each green. A large number of trees line the layout throughout, adding both character and strategic challenge. Turf conditions are supported by an intelligently designed irrigation sprinkler system and maintained using imported equipment operated by foreigner-trained staff.",
    practiceFacilities: [
      "Modern floodlit driving range",
      "Precision putting green",
      "Chipping practice area & bunker obstacles"
    ],
    diningAndLounges: [
      "Officers Club & Dining Hall",
      "Pro Lounge & Coffee Bar",
      "Aviation Heritage Terrace & Social Hub"
    ],
    amenities: [
      "PGF-Accredited 18-Hole Championship Layout",
      "6,773 Yards of Tree-Lined Challenge",
      "Intelligent Irrigation Sprinkler System",
      "Imported Equipment & Foreigner-Trained Staff",
      "Floodlit Driving Range",
      "Officers Club & Pro Shop",
      "Mapped on Hole19 App"
    ],
    imageUrl: pafSkyviewCover,
    forecast: [
      { day: "Today", condition: "Clear Night", tempC: 29, iconType: "clear-night" },
      { day: "Sat", condition: "Clear Day", tempC: 35, iconType: "clear-day" },
      { day: "Sun", condition: "Clear Day", tempC: 35, iconType: "clear-day" },
      { day: "Mon", condition: "Clear Day", tempC: 36, iconType: "clear-day" },
      { day: "Tue", condition: "Clear Day", tempC: 37, iconType: "clear-day" },
      { day: "Wed", condition: "Clear Day", tempC: 37, iconType: "clear-day" }
    ],
    currentConditions: {
      aqi: 140,
      smogLevel: "Moderate",
      tempC: 29,
      windKmH: 12,
      visibilityMeters: 4800,
      greenSpeed: "10.1 Stimp",
      fairwayCondition: "Intelligently Irrigated & Fast",
      advisory: "Rated 4.6 on Hole19. Tree-lined layout in championship condition. Northern breeze on back-9."
    }
  },
  {
    id: "the-oasis",
    name: "The Oasis Golf & Aqua Resort",
    shortName: "The Oasis Resort",
    location: "Main Multan Road (approx. 20 minutes from Thokar Niaz Baig)",
    website: "https://www.theoasis.com.pk",
    holes: 9,
    par: 36,
    yardage: "USGA standard 3,500 yards",
    area: "Set across roughly 1,350 kanals",
    keyDetails: "Set across roughly 1,350 kanals, this resort course blends leisure with sport. It features challenging water hazards and its signature hole—the dog-leg left par-5 9th hole—which demands high precision.",
    amenities: ["USGA Standard 9-Hole Layout", "Signature Par-5 9th Dog-Leg", "Over 1,350 Kanals Resort", "Water Sports & Aqua Park", "Family Club & Cabanas", "Horse Riding & Boating"],
    imageUrl: "https://images.unsplash.com/photo-1535132011086-b8818f016104?auto=format&fit=crop&w=1000&q=80",
    currentConditions: {
      aqi: 120,
      smogLevel: "Mild / Clearer Rural Air",
      tempC: 27,
      windKmH: 8,
      visibilityMeters: 6000,
      greenSpeed: "9.5 Stimp",
      fairwayCondition: "Resort-grade Lush Turf",
      advisory: "Crisp rural air off Multan Road. Excellent visibility throughout morning and dusk."
    }
  }
];
