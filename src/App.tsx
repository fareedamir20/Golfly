import React, { useEffect } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

// Public & Community Views
import { LandingView } from "./views/LandingView";
import { FeaturesView } from "./views/FeaturesView";
import { ClubsView } from "./views/ClubsView";
import { TournamentsView } from "./views/TournamentsView";
import { FreePromiseView } from "./views/FreePromiseView";

// Company Views
import { AboutView } from "./views/company/AboutView";
import { FounderView } from "./views/company/FounderView";
import { SolutionView } from "./views/company/SolutionView";
import { TermsView } from "./views/company/TermsView";
import { PrivacyView } from "./views/company/PrivacyView";
import { ContactView } from "./views/company/ContactView";
import { TeamView } from "./views/company/TeamView";

// Auth Views
import { LoginView } from "./views/auth/LoginView";
import { SignupView } from "./views/auth/SignupView";
import { OnboardingView } from "./views/auth/OnboardingView";

// Authenticated Application Modules
import { DashboardView } from "./views/DashboardView";
import { PartnersView } from "./views/PartnersView";
import { AICaddieView } from "./views/AICaddieView";
import { AICoachView } from "./views/AICoachView";
import { MarketplaceView } from "./views/MarketplaceView";
import { HonoursView } from "./views/HonoursView";
import { LeaderboardsView } from "./views/LeaderboardsView";
import { MessagesView } from "./views/MessagesView";
import { ProfileView } from "./views/ProfileView";
import { RoundsView } from "./views/RoundsView";

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
      <main className="flex-1">{renderView()}</main>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <RouterContent />
    </AppProvider>
  );
}
