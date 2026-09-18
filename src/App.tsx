import React, { useEffect, Suspense, lazy } from "react";
import { Analytics } from "@vercel/analytics/react";
import { AppProvider, useApp } from "./context/AppContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

// Public & Community Views - Lazy Loaded
const LandingView = lazy(() => import("./views/LandingView").then(m => ({ default: m.LandingView })));
const FeaturesView = lazy(() => import("./views/FeaturesView").then(m => ({ default: m.FeaturesView })));
const ClubsView = lazy(() => import("./views/ClubsView").then(m => ({ default: m.ClubsView })));
const TournamentsView = lazy(() => import("./views/TournamentsView").then(m => ({ default: m.TournamentsView })));
const FreePromiseView = lazy(() => import("./views/FreePromiseView").then(m => ({ default: m.FreePromiseView })));

// Company Views - Lazy Loaded
const AboutView = lazy(() => import("./views/company/AboutView").then(m => ({ default: m.AboutView })));
const FounderView = lazy(() => import("./views/company/FounderView").then(m => ({ default: m.FounderView })));
const SolutionView = lazy(() => import("./views/company/SolutionView").then(m => ({ default: m.SolutionView })));
const TermsView = lazy(() => import("./views/company/TermsView").then(m => ({ default: m.TermsView })));
const PrivacyView = lazy(() => import("./views/company/PrivacyView").then(m => ({ default: m.PrivacyView })));
const ContactView = lazy(() => import("./views/company/ContactView").then(m => ({ default: m.ContactView })));
const TeamView = lazy(() => import("./views/company/TeamView").then(m => ({ default: m.TeamView })));

// Auth Views - Lazy Loaded
const LoginView = lazy(() => import("./views/auth/LoginView").then(m => ({ default: m.LoginView })));
const SignupView = lazy(() => import("./views/auth/SignupView").then(m => ({ default: m.SignupView })));
const OnboardingView = lazy(() => import("./views/auth/OnboardingView").then(m => ({ default: m.OnboardingView })));

// Authenticated Application Modules - Lazy Loaded
const DashboardView = lazy(() => import("./views/DashboardView").then(m => ({ default: m.DashboardView })));
const PartnersView = lazy(() => import("./views/PartnersView").then(m => ({ default: m.PartnersView })));
const AICaddieView = lazy(() => import("./views/AICaddieView").then(m => ({ default: m.AICaddieView })));
const AICoachView = lazy(() => import("./views/AICoachView").then(m => ({ default: m.AICoachView })));
const MarketplaceView = lazy(() => import("./views/MarketplaceView").then(m => ({ default: m.MarketplaceView })));
const HonoursView = lazy(() => import("./views/HonoursView").then(m => ({ default: m.HonoursView })));
const LeaderboardsView = lazy(() => import("./views/LeaderboardsView").then(m => ({ default: m.LeaderboardsView })));
const MessagesView = lazy(() => import("./views/MessagesView").then(m => ({ default: m.MessagesView })));
const ProfileView = lazy(() => import("./views/ProfileView").then(m => ({ default: m.ProfileView })));
const RoundsView = lazy(() => import("./views/RoundsView").then(m => ({ default: m.RoundsView })));

// Premium Golfly Suspense Loading Fallback
const LoadingFallback: React.FC = () => (
  <div className="min-h-[65vh] flex flex-col items-center justify-center p-8 space-y-4">
    <div className="relative flex items-center justify-center">
      <div className="w-14 h-14 rounded-2xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center shadow-lg">
        <img src="/logo.png" alt="Golfly" className="w-10 h-10 object-contain animate-pulse" />
      </div>
      <div className="absolute -inset-2 rounded-3xl border border-emerald-400/30 animate-ping pointer-events-none" />
    </div>
    <div className="text-center space-y-1">
      <p className="text-xs font-bold text-emerald-900 uppercase tracking-widest">
        Golfly Intelligence
      </p>
      <p className="text-xs text-slate-500 font-medium">
        Loading module...
      </p>
    </div>
  </div>
);

const RouterContent: React.FC = () => {
  const { currentPath, isAuthenticated } = useApp();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPath]);

  const renderView = () => {
    // When logged in, always default root and auth pages directly to DashboardView
    if (isAuthenticated) {
      if (currentPath === "/" || currentPath === "/auth/login" || currentPath === "/auth/signup") {
        return <DashboardView />;
      }
    }

    switch (currentPath) {
      // Public & Informational
      case "/":
        return isAuthenticated ? <DashboardView /> : <LandingView />;
      case "/features":
        return <FeaturesView />;
      case "/clubs":
        return <ClubsView />;
      case "/tournaments":
        return <TournamentsView />;
      case "/free-promise":
        return <FreePromiseView />;

      // Company Sub-Tabs
      case "/company/founder":
        return <FounderView />;
      case "/company/solution":
        return <SolutionView />;
      case "/company/terms":
        return <TermsView />;
      case "/company/privacy":
        return <PrivacyView />;
      case "/company/about":
      case "/company/about-us":
        return <AboutView />;
      case "/company/contact":
        return <ContactView />;
      case "/company/team":
        return <TeamView />;

      // Auth
      case "/auth/login":
        return isAuthenticated ? <DashboardView /> : <LoginView />;
      case "/auth/signup":
        return isAuthenticated ? <DashboardView /> : <SignupView />;
      case "/auth/onboarding":
        return <OnboardingView />;

      // Core Golfer Modules
      case "/dashboard":
        return <DashboardView />;
      case "/partners":
        return <PartnersView />;
      case "/ai-caddie":
        return <AICaddieView />;
      case "/ai-coach":
        return <AICoachView />;
      case "/marketplace":
        return <MarketplaceView />;
      case "/profile/honours":
        return <HonoursView />;
      case "/leaderboards":
        return <LeaderboardsView />;
      case "/messages":
        return <MessagesView />;
      case "/profile":
        return <ProfileView />;
      case "/rounds":
      case "/analytics":
      case "/settings":
        return <RoundsView />;

      default:
        return isAuthenticated ? <DashboardView /> : <LandingView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-emerald-200 selection:text-emerald-950">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<LoadingFallback />}>
          {renderView()}
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <RouterContent />
      <Analytics />
    </AppProvider>
  );
}
