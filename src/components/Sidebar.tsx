import { Home, TrendingUp, Users, Truck, BarChart3, DollarSign, LogOut } from "lucide-react";
import { cn } from "./ui/utils";
import { ThemeToggle } from "./ThemeToggle";

interface SidebarProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
  onLogout: () => void;
}

export function Sidebar({ currentScreen, onNavigate, onLogout }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "market", label: "Market Intelligence", icon: TrendingUp },
    { id: "farmers", label: "Farmer Management", icon: Users },
    { id: "logistics", label: "Logistics Hub", icon: Truck },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "payouts", label: "Payouts", icon: DollarSign },
  ];

  return (
    <div className="w-64 bg-white dark:bg-[#0f1419] border-r border-gray-200 dark:border-gray-800 flex flex-col">
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
              <span className="text-white">C</span>
            </div>
            <span className="text-gray-900 dark:text-white text-xl">Cropix</span>
          </div>
          <ThemeToggle />
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                    currentScreen === item.id
                      ? "bg-emerald-500/10 text-emerald-500"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
