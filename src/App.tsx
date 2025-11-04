import { useState } from "react";
import { Login } from "./components/Login";
import { Pricing } from "./components/Pricing";
import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./components/Dashboard";
import { MarketIntelligence } from "./components/MarketIntelligence";
import { FarmerManagement } from "./components/FarmerManagement";
import { LogisticsHub } from "./components/LogisticsHub";
import { Analytics } from "./components/Analytics";
import { Payouts } from "./components/Payouts";
import { ThemeProvider } from "./components/ThemeProvider";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [currentScreen, setCurrentScreen] = useState("dashboard");

  return (
    <ThemeProvider>
      {!isAuthenticated ? (
        showPricing ? (
          <Pricing onBackToLogin={() => setShowPricing(false)} />
        ) : (
          <Login
            onLogin={() => setIsAuthenticated(true)}
            onShowPricing={() => setShowPricing(true)}
          />
        )
      ) : (
        <div className="flex h-screen bg-gray-50 dark:bg-[#0a0e13] overflow-hidden">
          <Sidebar
            currentScreen={currentScreen}
            onNavigate={setCurrentScreen}
            onLogout={() => setIsAuthenticated(false)}
          />
          <div className="flex-1 overflow-y-auto">
            {currentScreen === "dashboard" && <Dashboard onNavigate={setCurrentScreen} />}
            {currentScreen === "market" && <MarketIntelligence />}
            {currentScreen === "farmers" && <FarmerManagement />}
            {currentScreen === "logistics" && <LogisticsHub />}
            {currentScreen === "analytics" && <Analytics />}
            {currentScreen === "payouts" && <Payouts />}
          </div>
        </div>
      )}
    </ThemeProvider>
  );
}
