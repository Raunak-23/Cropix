import { Card } from "./ui/card";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export function Analytics() {
  const procurementData = [
    { month: "Jun", rice: 120, wheat: 80, tomato: 45, onion: 30 },
    { month: "Jul", rice: 150, wheat: 95, tomato: 60, onion: 40 },
    { month: "Aug", rice: 180, wheat: 110, tomato: 55, onion: 35 },
    { month: "Sep", rice: 160, wheat: 100, tomato: 70, onion: 50 },
    { month: "Oct", rice: 200, wheat: 120, tomato: 65, onion: 45 },
    { month: "Nov", rice: 220, wheat: 130, tomato: 75, onion: 55 },
  ];

  const transportSpendData = [
    { month: "Jun", spend: 250000 },
    { month: "Jul", spend: 320000 },
    { month: "Aug", spend: 280000 },
    { month: "Sep", spend: 350000 },
    { month: "Oct", spend: 400000 },
    { month: "Nov", spend: 450000 },
  ];

  const sourcingRegionData = [
    { name: "Tamil Nadu", value: 35 },
    { name: "Karnataka", value: 25 },
    { name: "Andhra Pradesh", value: 20 },
    { name: "Maharashtra", value: 12 },
    { name: "Others", value: 8 },
  ];

  const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"];

  return (
    <div className="p-8 space-y-6 bg-gray-50 dark:bg-[#0a0e13] min-h-screen">
      <div>
        <h1 className="text-gray-900 dark:text-white text-3xl mb-2">Analytics Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Insights and trends for your agricultural business</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white dark:bg-[#0f1419] border-gray-200 dark:border-gray-800 p-6">
          <div className="text-gray-600 dark:text-gray-400 mb-2">Total Procurement</div>
          <div className="text-gray-900 dark:text-white text-3xl">1,230 T</div>
          <div className="text-emerald-400 text-sm mt-1">+12.5% from last month</div>
        </Card>
        <Card className="bg-white dark:bg-[#0f1419] border-gray-200 dark:border-gray-800 p-6">
          <div className="text-gray-600 dark:text-gray-400 mb-2">Transport Cost</div>
          <div className="text-gray-900 dark:text-white text-3xl">₹4.5L</div>
          <div className="text-yellow-400 text-sm mt-1">+8.2% from last month</div>
        </Card>
        <Card className="bg-white dark:bg-[#0f1419] border-gray-200 dark:border-gray-800 p-6">
          <div className="text-gray-600 dark:text-gray-400 mb-2">Active Farmers</div>
          <div className="text-gray-900 dark:text-white text-3xl">1,247</div>
          <div className="text-emerald-400 text-sm mt-1">+23 new this month</div>
        </Card>
        <Card className="bg-white dark:bg-[#0f1419] border-gray-200 dark:border-gray-800 p-6">
          <div className="text-gray-600 dark:text-gray-400 mb-2">Avg. Price/Qtl</div>
          <div className="text-gray-900 dark:text-white text-3xl">₹2,850</div>
          <div className="text-red-400 text-sm mt-1">-2.1% from last month</div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Procurement Volume */}
        <Card className="bg-white dark:bg-[#0f1419] border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-gray-900 dark:text-white text-xl mb-6">Monthly Procurement Volume (by crop)</h2>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={procurementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-gray-300 dark:text-gray-700" />
                <XAxis dataKey="month" stroke="currentColor" className="text-gray-600 dark:text-gray-400" />
                <YAxis stroke="currentColor" className="text-gray-600 dark:text-gray-400" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-popover)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "8px",
                    color: "var(--color-popover-foreground)",
                  }}
                />
                <Legend />
                <Bar dataKey="rice" fill="#10b981" name="Rice (T)" />
                <Bar dataKey="wheat" fill="#3b82f6" name="Wheat (T)" />
                <Bar dataKey="tomato" fill="#f59e0b" name="Tomato (T)" />
                <Bar dataKey="onion" fill="#ef4444" name="Onion (T)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Transport Spend */}
        <Card className="bg-white dark:bg-[#0f1419] border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-gray-900 dark:text-white text-xl mb-6">Total Transport Spend</h2>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={transportSpendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-gray-300 dark:text-gray-700" />
                <XAxis dataKey="month" stroke="currentColor" className="text-gray-600 dark:text-gray-400" />
                <YAxis stroke="currentColor" className="text-gray-600 dark:text-gray-400" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-popover)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "8px",
                    color: "var(--color-popover-foreground)",
                  }}
                  formatter={(value: number) => `₹${(value / 1000).toFixed(0)}K`}
                />
                <Line
                  type="monotone"
                  dataKey="spend"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: "#10b981", r: 5 }}
                  name="Spend (₹)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Sourcing Regions */}
        <Card className="bg-white dark:bg-[#0f1419] border-gray-200 dark:border-gray-800 p-6 lg:col-span-2">
          <h2 className="text-gray-900 dark:text-white text-xl mb-6">Top 5 Sourcing Regions</h2>
          <div className="h-[350px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourcingRegionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sourcingRegionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-popover)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "8px",
                    color: "var(--color-popover-foreground)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white dark:bg-[#0f1419] border-gray-200 dark:border-gray-800 p-6">
          <h3 className="text-gray-900 dark:text-white mb-4">Top Performing Crop</h3>
          <div className="text-3xl text-emerald-400 mb-2">Rice</div>
          <div className="text-gray-600 dark:text-gray-400">220 tonnes procured this month</div>
        </Card>
        <Card className="bg-white dark:bg-[#0f1419] border-gray-200 dark:border-gray-800 p-6">
          <h3 className="text-gray-900 dark:text-white mb-4">Most Active Region</h3>
          <div className="text-3xl text-blue-400 mb-2">Tamil Nadu</div>
          <div className="text-gray-600 dark:text-gray-400">35% of total procurement</div>
        </Card>
        <Card className="bg-white dark:bg-[#0f1419] border-gray-200 dark:border-gray-800 p-6">
          <h3 className="text-gray-900 dark:text-white mb-4">Transport Efficiency</h3>
          <div className="text-3xl text-yellow-400 mb-2">92%</div>
          <div className="text-gray-600 dark:text-gray-400">On-time delivery rate</div>
        </Card>
      </div>
    </div>
  );
}
