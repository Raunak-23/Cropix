import { ArrowUpRight, ArrowDownRight, Plus, TrendingUp, Users, Truck, DollarSign } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

interface DashboardProps {
  onNavigate: (screen: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const kpis = [
    { label: "Total Farmers Managed", value: "1,247", icon: Users, color: "text-blue-400" },
    { label: "Active Logistics", value: "23", icon: Truck, color: "text-emerald-400" },
    { label: "Pending Payouts", value: "₹4.2L", icon: DollarSign, color: "text-yellow-400" },
    { label: "Market Alerts", value: "12", icon: TrendingUp, color: "text-purple-400" },
  ];

  const priceAlerts = [
    { crop: "Tomato", price: "₹1,500/qtl", change: 12.5, trending: "up" },
    { crop: "Rice (Basmati)", price: "₹3,200/qtl", change: -3.2, trending: "down" },
    { crop: "Wheat", price: "₹2,100/qtl", change: 5.8, trending: "up" },
    { crop: "Onion", price: "₹2,800/qtl", change: -8.1, trending: "down" },
  ];

  const pendingProcurements = [
    { id: "PRO-1023", farmer: "Ramesh Kumar", crop: "Rice", qty: "25 tonnes", status: "Pending" },
    { id: "PRO-1024", farmer: "Suresh Patel", crop: "Wheat", qty: "15 tonnes", status: "Pending" },
    { id: "PRO-1025", farmer: "Vijay Singh", crop: "Tomato", qty: "8 tonnes", status: "Review" },
  ];

  const logisticsStatus = [
    { trucks: 5, status: "In-Transit", color: "bg-emerald-500" },
    { trucks: 3, status: "Awaiting Bids", color: "bg-yellow-500" },
    { trucks: 12, status: "Completed Today", color: "bg-blue-500" },
  ];

  return (
    <div className="p-8 space-y-6 bg-gray-50 dark:bg-[#0a0e13] min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-gray-900 dark:text-white text-3xl mb-2">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's what's happening with your business today.</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.label} className="bg-white dark:bg-[#0f1419] border-gray-200 dark:border-gray-800 p-6">
              <div className="flex items-start justify-between mb-4">
                <Icon className={`w-8 h-8 ${kpi.color}`} />
              </div>
              <div className="text-gray-900 dark:text-white text-3xl mb-1">{kpi.value}</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">{kpi.label}</div>
            </Card>
          );
        })}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Price Alerts */}
        <Card className="bg-white dark:bg-[#0f1419] border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-gray-900 dark:text-white text-xl">My Price Alerts</h2>
            <Button
              onClick={() => onNavigate("market")}
              variant="ghost"
              className="text-emerald-500 hover:text-emerald-400 hover:bg-emerald-500/10"
            >
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {priceAlerts.map((alert) => (
              <div key={alert.crop} className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-900/50 rounded-lg">
                <div>
                  <div className="text-gray-900 dark:text-white mb-1">{alert.crop}</div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">{alert.price}</div>
                </div>
                <div className={`flex items-center gap-1 ${alert.trending === "up" ? "text-emerald-400" : "text-red-400"}`}>
                  {alert.trending === "up" ? (
                    <ArrowUpRight className="w-5 h-5" />
                  ) : (
                    <ArrowDownRight className="w-5 h-5" />
                  )}
                  <span>{Math.abs(alert.change)}%</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Pending Procurements */}
        <Card className="bg-white dark:bg-[#0f1419] border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-gray-900 dark:text-white text-xl">Pending Procurements</h2>
            <Button
              onClick={() => onNavigate("farmers")}
              variant="ghost"
              className="text-emerald-500 hover:text-emerald-400 hover:bg-emerald-500/10"
            >
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {pendingProcurements.map((proc) => (
              <div key={proc.id} className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-900/50 rounded-lg">
                <div className="flex-1">
                  <div className="text-gray-900 dark:text-white mb-1">{proc.farmer}</div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">
                    {proc.crop} • {proc.qty}
                  </div>
                </div>
                <div className="text-yellow-400 text-sm px-3 py-1 bg-yellow-400/10 rounded">
                  {proc.status}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Logistics Status */}
        <Card className="bg-white dark:bg-[#0f1419] border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-gray-900 dark:text-white text-xl">Logistics Status</h2>
            <Button
              onClick={() => onNavigate("logistics")}
              variant="ghost"
              className="text-emerald-500 hover:text-emerald-400 hover:bg-emerald-500/10"
            >
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {logisticsStatus.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg ${item.color} flex items-center justify-center text-white text-xl`}>
                  {item.trucks}
                </div>
                <div>
                  <div className="text-gray-900 dark:text-white">{item.status}</div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">
                    {item.trucks} {item.trucks === 1 ? "truck" : "trucks"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-white dark:bg-[#0f1419] border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-gray-900 dark:text-white text-xl mb-6">Quick Actions</h2>
          <div className="space-y-3">
            <Button
              onClick={() => onNavigate("logistics")}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white justify-start gap-3"
            >
              <Plus className="w-5 h-5" />
              Post New Transport Job
            </Button>
            <Button
              onClick={() => onNavigate("farmers")}
              className="w-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-white justify-start gap-3"
            >
              <Plus className="w-5 h-5" />
              Add New Farmer
            </Button>
            <Button
              onClick={() => onNavigate("market")}
              className="w-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-white justify-start gap-3"
            >
              <TrendingUp className="w-5 h-5" />
              View Markets
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
