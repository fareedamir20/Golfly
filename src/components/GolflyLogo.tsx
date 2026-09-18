import React from "react";

interface GolflyLogoProps {
  className?: string;
  variant?: "full" | "icon-only" | "light";
  size?: "sm" | "md" | "lg";
}

export const GolflyLogo: React.FC<GolflyLogoProps> = ({
  className = "",
  variant = "full",
  size = "md"
}) => {
  const isLight = variant === "light";
  const iconOnly = variant === "icon-only";

  const sizeClasses = {
    sm: "h-8",
    md: "h-10 sm:h-11",
    lg: "h-14 sm:h-16"
  }[size];

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Official Uploaded Golfly Emblem Image */}
      <div className="relative shrink-0 flex items-center justify-center overflow-hidden rounded-full border border-emerald-800/20 shadow-2xs bg-white">
        <img
          src="/logo.png"
          alt="Golfly Official Logo"
          className={`${sizeClasses} aspect-square object-contain p-0.5`}
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Fallback if image load has issue
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
      </div>

      {!iconOnly && (
        <div className="flex flex-col">
          <div className="flex items-baseline">
            <span
              className={`font-black tracking-tight text-xl sm:text-2xl leading-none ${
                isLight ? "text-white" : "text-emerald-950"
              }`}
            >
              Golfly
            </span>
          </div>
          <span
            className={`text-[10px] tracking-wide font-semibold mt-0.5 leading-tight ${
              isLight ? "text-emerald-200" : "text-slate-500"
            }`}
          >
            Find Your Game. Play More.
          </span>
        </div>
      )}
    </div>
  );
};

