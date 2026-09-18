import React, { useState } from "react";
import {
  ShoppingBag,
  Plus,
  Search,
  Filter,
  MapPin,
  MessageSquare,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Tag,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { MarketplaceItem, GolferPartner } from "../types";

export const MarketplaceView: React.FC = () => {
  const { marketplace, addMarketplaceItem, user, navigate, startChatWithPartner, partners } = useApp();
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showPostModal, setShowPostModal] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<MarketplaceItem["category"]>("Drivers & Woods");
  const [brand, setBrand] = useState("TaylorMade");
  const [pricePKR, setPricePKR] = useState<number>(45000);
  const [condition, setCondition] = useState<MarketplaceItem["condition"]>("Mint (Like New)");
  const [clubLocation, setClubLocation] = useState(user?.homeClub || "Defence Raya Golf & Country Club");
  const [description, setDescription] = useState("");
  const [sellerPhone, setSellerPhone] = useState(user?.phone || "+92 300 ");
  const [imageUrl, setImageUrl] = useState("https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=600&q=80");

  const filteredItems = marketplace.filter((item: MarketplaceItem) => {
    if (categoryFilter !== "all" && item.category !== categoryFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.clubLocation.toLowerCase().includes(q) ||
        item.brand.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handlePostListing = (e: React.FormEvent) => {
    e.preventDefault();
    addMarketplaceItem({
      title,
      category,
      brand,
      pricePKR: Number(pricePKR),
      isTradeOrFree: pricePKR === 0,
      condition,
      clubLocation,
      description,
      sellerPhone,
      images: [imageUrl]
    });
    setShowPostModal(false);
    setTitle("");
    setDescription("");
  };

  const handleContactSeller = (item: MarketplaceItem) => {
    // Find partner or create temporary partner representation
    const partner = partners.find((p) => p.fullName.toLowerCase() === item.sellerName.toLowerCase()) || {
      id: `seller-${item.id}`,
      fullName: item.sellerName,
      avatarUrl: item.sellerAvatar,
      homeClub: item.clubLocation,
      handicap: item.sellerHandicap,
      distanceKm: 2.0,
      preferredTiming: "Flexible",
      availableDays: ["Saturday", "Sunday"],
      playingStyle: "Marketplace Trader",
      bio: `Selling ${item.title} on Golfly marketplace.`,
      compatibilityScore: 90,
      pastRoundsTogether: 0,
      recentActivity: "Active on Marketplace"
    };

    startChatWithPartner(partner);
    navigate("/messages");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
            <ShoppingBag className="w-3.5 h-3.5 text-amber-700" />
            <span>Member Pro Shop & Gear Exchange</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Lahore Golf Equipment Marketplace
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Buy, sell, or trade authentic drivers, iron sets, wedges, putters, and bags directly with verified golfers in Lahore. Connect directly with local golfers.
          </p>
        </div>

        <button
          onClick={() => setShowPostModal(true)}
          className="px-5 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow-xs shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Post Listing</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search gear (TaylorMade, Titleist, Scotty Cameron, Callaway)..."
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {["all", "Drivers & Woods", "Iron Sets", "Wedges & Putters", "Bags & Carts", "Apparel & Shoes"].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
                  categoryFilter === cat
                    ? "bg-emerald-800 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat === "all" ? "All Categories" : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item: MarketplaceItem) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
          >
            <div>
              {/* Image */}
              <div className="relative h-48 bg-slate-100 overflow-hidden">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider bg-slate-900/80 backdrop-blur-xs text-white px-2.5 py-1 rounded-md">
                    {item.condition}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3">
                  <span className="text-xs font-black bg-emerald-700 text-white px-3 py-1 rounded-lg shadow-sm">
                    {item.pricePKR === 0 ? "Free / Trade" : `PKR ${item.pricePKR.toLocaleString()}`}
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="p-5 space-y-3">
                <div>
                  <h3 className="font-bold text-base text-slate-900 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-emerald-800 font-semibold flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    {item.clubLocation}
                  </p>
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {item.description}
                </p>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Seller: <strong className="text-slate-800">{item.sellerName}</strong></span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    0% Commission
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-5 pt-0 flex items-center gap-2">
              <button
                onClick={() => handleContactSeller(item)}
                className="flex-1 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Contact Seller</span>
              </button>

              {item.sellerPhone && (
                <a
                  href={`https://wa.me/${item.sellerPhone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 transition-colors"
                  title="WhatsApp seller"
                >
                  <Phone className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Post Modal */}
      {showPostModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                  Member Listing
                </span>
                <h3 className="font-black text-lg text-slate-900 mt-1">Post Gear in Lahore Pro Shop</h3>
              </div>
              <button
                onClick={() => setShowPostModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handlePostListing} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Item Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Titleist T100 Iron Set 4-PW (Modus 120 Stiff)"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                  >
                    <option value="Drivers & Woods">Drivers & Woods</option>
                    <option value="Iron Sets">Iron Sets</option>
                    <option value="Wedges & Putters">Wedges & Putters</option>
                    <option value="Bags & Carts">Bags & Carts</option>
                    <option value="Apparel & Shoes">Apparel & Shoes</option>
                    <option value="Rangefinders & Tech">Rangefinders & Tech</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Brand</label>
                  <input
                    type="text"
                    required
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Price in PKR (0 for Free/Trade)</label>
                  <input
                    type="number"
                    required
                    value={pricePKR}
                    onChange={(e) => setPricePKR(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Condition</label>
                  <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                  >
                    <option value="Brand New">Brand New</option>
                    <option value="Mint (Like New)">Mint (Like New)</option>
                    <option value="Very Good">Very Good</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Handshake Club Location</label>
                <select
                  value={clubLocation}
                  onChange={(e) => setClubLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                >
                  <option value="Defence Raya Golf & Country Club">Defence Raya Golf Club</option>
                  <option value="Lahore Garrison Golf & Country Club">Lahore Garrison Golf Club</option>
                  <option value="Lahore Gymkhana Golf Club">Lahore Gymkhana</option>
                  <option value="Royal Palm Golf & Country Club">Royal Palm Golf Club</option>
                  <option value="PAF Skyview Golf & Country Club">PAF Skyview Golf Club</option>
                  <option value="The Oasis Golf & Aqua Resort">The Oasis Golf Resort</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description & Specs</label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Shaft flex, grip condition, reason for selling, whether trade is accepted..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Direct WhatsApp Number</label>
                <input
                  type="text"
                  value={sellerPhone}
                  onChange={(e) => setSellerPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Direct member-to-member handshakes and exchanges at Lahore clubhouses.</span>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowPostModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl shadow-xs cursor-pointer"
                >
                  Publish Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
