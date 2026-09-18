import React, { useState } from "react";

interface GolflyLogoProps {
  className?: string;
  variant?: "full" | "icon-only" | "light";
  size?: "sm" | "md" | "lg" | "xl";
}

export const GolflyLogo: React.FC<GolflyLogoProps> = ({
  className = "",
  variant = "full",
  size = "md"
}) => {
  const isLight = variant === "light";
  const iconOnly = variant === "icon-only";
  const [imgError, setImgError] = useState(false);

  // Sizing for the symbol logo - make it visible and big
  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-12 h-12 sm:w-14 sm:h-14",
    lg: "w-16 h-16 sm:w-20 sm:h-20",
    xl: "w-24 h-24 sm:w-28 sm:h-28"
  }[size];

  const textSizeClasses = {
    sm: "text-lg sm:text-xl",
    md: "text-2xl sm:text-3xl",
    lg: "text-3xl sm:text-4xl",
    xl: "text-4xl sm:text-5xl"
  }[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Symbol Logo Container */}
      <div className={`relative shrink-0 flex items-center justify-center overflow-hidden rounded-2xl bg-white border-2 border-emerald-500/40 shadow-md ${sizeClasses} p-1 transition-transform hover:scale-105`}>
        {!imgError ? (
          <img
            src="/logo.png"
            alt="Golfly Official Symbol Logo"
            className="w-full h-full object-contain filter saturate-[1.15]"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
          />
        ) : (
          /* High-Precision Vector SVG Representation of the G Golf Flag & Ball Symbol */
          <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
            {/* Dark green G outer ring & curve */}
            <path
              d="M 65 25 C 45 10, 20 25, 20 50 C 20 75, 40 90, 68 88 C 80 87, 88 80, 88 68 L 88 55 L 50 55 C 46 55, 46 63, 50 63 L 78 63 L 78 68 C 78 76, 70 82, 60 82 C 45 82, 30 70, 30 50 C 30 32, 45 20, 62 28 C 68 31, 72 23, 65 25 Z"
              fill="#064e3b"
            />
            {/* Green Flag Pin on horizontal bar */}
            <rect x="58" y="32" width="3" height="24" fill="#064e3b" />
            <path d="M 61 32 L 78 38 L 61 45 Z" fill="#10b981" />
            {/* Fairway Curved Arc */}
            <path
              d="M 22 72 C 35 84, 52 86, 68 82 C 55 83, 40 78, 30 70 Z"
              fill="#34d399"
            />
            {/* White Golf Ball */}
            <circle cx="68" cy="74" r="6" fill="#ffffff" stroke="#064e3b" strokeWidth="1.5" />
          </svg>
        )}
      </div>

      {!iconOnly && (
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1">
            <span
              className={`font-black tracking-tight leading-none ${textSizeClasses} ${
                isLight ? "text-white" : "text-emerald-950"
              }`}
            >
              Golfly
            </span>
          </div>
          <span
            className={`text-[10px] sm:text-xs tracking-wider font-extrabold uppercase mt-1 leading-tight ${
              isLight ? "text-emerald-300" : "text-emerald-700"
            }`}
          >
            Find Your Game. Play More.
          </span>
        </div>
      )}
    </div>
  );
};
