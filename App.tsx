import { useState } from "react";
import "./seedfolio.css";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import LoginModal from "./components/LoginModal";
import Hero from "./components/Hero";
import MarketTicker from "./components/MarketTicker";
import PortfolioScene from "./components/PortfolioScene";
import ScrollStatement from "./components/ScrollStatement";
import StockCards from "./components/StockCards";
import Products from "./components/Products";
import TrendingStocks from "./components/TrendingStocks";
import SIPCalculator from "./components/SIPCalculator";
import Stats from "./components/Stats";
import GettingStarted from "./components/GettingStarted";
import FAQ from "./components/FAQ";
import SIPGrowthScene from "./components/SIPGrowthScene";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import { useSeedfolioEffects } from "./hooks/useSeedfolioEffects";

export default function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [initialMobile, setInitialMobile] = useState("");
  const isDashboard = window.location.pathname === "/dashboard";
  useSeedfolioEffects(!isDashboard);

  function openAuth(mode: "login" | "signup", mobile = "") {
    setAuthMode(mode);
    setInitialMobile(mobile);
    setIsLoginOpen(true);
  }

  if (isDashboard) {
    return <Dashboard onLogout={() => window.location.assign("/")} />;
  }

  return (
    <>
      <div className="sprog" id="sprog" aria-hidden="true" />
      <Navbar onLogin={() => openAuth("login")} />
      {isLoginOpen && (
        <LoginModal
          initialMobile={initialMobile}
          initialMode={authMode}
          onClose={() => setIsLoginOpen(false)}
          onLoginSuccess={() => {
            window.location.assign("/dashboard");
          }}
        />
      )}
      <main id="top">
        <Hero onCreateAccount={(mobile) => openAuth("signup", mobile)} />
        <MarketTicker />
        <PortfolioScene />
        <ScrollStatement />
        <StockCards />
        <Products />
        <TrendingStocks />
        <SIPCalculator />
        <Stats />
        <GettingStarted />
        <FAQ />
        <SIPGrowthScene />
        <CTA onSignUp={() => openAuth("signup")} />
      </main>
      <Footer />
    </>
  );
}
