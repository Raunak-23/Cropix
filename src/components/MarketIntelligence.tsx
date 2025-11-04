import { useState } from "react";
import { Card } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { OpenStreetMap } from "./OpenStreetMap";

export function MarketIntelligence() {
  const [selectedCrop, setSelectedCrop] = useState("rice");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedMarket, setSelectedMarket] = useState<any>(null);

  const markets = [
    { name: "Vellore", state: "Tamil Nadu", crop: "Rice", price: 3200, change: 5.2, position: { lat: 12.9165, lng: 79.1325 } },
    { name: "Chennai", state: "Tamil Nadu", crop: "Rice", price: 3350, change: 3.8, position: { lat: 13.0827, lng: 80.2707 } },
    { name: "Azadpur", state: "Delhi", crop: "Tomato", price: 1500, change: 12.5, position: { lat: 28.7041, lng: 77.1025 } },
    { name: "Pune", state: "Maharashtra", crop: "Tomato", price: 1650, change: -2.1, position: { lat: 18.5204, lng: 73.8567 } },
    { name: "Bangalore", state: "Karnataka", crop: "Tomato", price: 1580, change: 8.3, position: { lat: 12.9716, lng: 77.5946 } },
    { name: "Lucknow", state: "Uttar Pradesh", crop: "Wheat", price: 2100, change: 4.2, position: { lat: 26.8467, lng: 80.9462 } },
    { name: "Indore", state: "Madhya Pradesh", crop: "Wheat", price: 2050, change: 2.8, position: { lat: 22.7196, lng: 75.8577 } },
    { name: "Nashik", state: "Maharashtra", crop: "Onion", price: 2800, change: -8.1, position: { lat: 19.9975, lng: 73.7898 } },
  ];

  const priceHistory = [
    { date: "Oct 5", price: 2980 },
    { date: "Oct 10", price: 3050 },
    { date: "Oct 15", price: 3100 },
    { date: "Oct 20", price: 3180 },
    { date: "Oct 25", price: 3120 },
    { date: "Oct 30", price: 3200 },
    { date: "Nov 4", price: 3350 },
  ];

  return (
    <div className="p-8 space-y-6 bg-gray-50 dark:bg-[#0a0e13] min-h-screen">
      <div>
        <h1 className="text-gray-900 dark:text-white text-3xl mb-2">Market Intelligence Engine</h1>
        <p className="text-gray-600 dark:text-gray-400">Real-time crop prices and market trends across India</p>
      </div>

      {/* Filters */}
      <Card className="bg-white dark:bg-[#0f1419] border-gray-200 dark:border-gray-800 p-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="text-gray-600 dark:text-gray-400 text-sm mb-2 block">Select Crop</label>
            <Select value={selectedCrop} onValueChange={setSelectedCrop}>
              <SelectTrigger className="bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rice">Rice</SelectItem>
                <SelectItem value="wheat">Wheat</SelectItem>
                <SelectItem value="tomato">Tomato</SelectItem>
                <SelectItem value="onion">Onion</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="text-gray-600 dark:text-gray-400 text-sm mb-2 block">Select Region/State</label>
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All India</SelectItem>
                <SelectItem value="north">North India</SelectItem>
                <SelectItem value="south">South India</SelectItem>
                <SelectItem value="west">West India</SelectItem>
                <SelectItem value="east">East India</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <Card className="lg:col-span-2 bg-white dark:bg-[#0f1419] border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-gray-900 dark:text-white text-xl mb-6">Interactive Price Map - India</h2>
          <OpenStreetMap 
            markers={markets.map(m => ({
              position: m.position,
              name: m.name,
              price: m.price,
              change: m.change,
              crop: m.crop
            }))}
            onMarkerClick={(marker) => {
              const market = markets.find(m => m.name === marker.name);
              if (market) setSelectedMarket(market);
            }}
          />
        </Card>

        {/* Market Data Table */}
        <Card className="bg-white dark:bg-[#0f1419] border-gray-200 dark:border-gray-800 p-6 overflow-hidden flex flex-col">
          <h2 className="text-gray-900 dark:text-white text-xl mb-6">Market Prices</h2>
          <div className="overflow-y-auto flex-1 -mx-6 px-6">
            <div className="space-y-3">
              {markets.map((market, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedMarket(market)}
                  className="p-4 bg-gray-100 dark:bg-gray-900/50 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="text-gray-900 dark:text-white">{market.name}</div>
                      <div className="text-gray-600 dark:text-gray-400 text-sm">{market.state}</div>
                    </div>
                    <div className={`flex items-center gap-1 ${market.change > 0 ? "text-emerald-400" : "text-red-400"}`}>
                      {market.change > 0 ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      <span className="text-sm">{Math.abs(market.change)}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-gray-600 dark:text-gray-400 text-sm">{market.crop}</div>
                    <div className="text-gray-900 dark:text-white">₹{market.price}/qtl</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Price Trend Modal */}
      <Dialog open={!!selectedMarket} onOpenChange={() => setSelectedMarket(null)}>
        <DialogContent className="bg-white dark:bg-[#0f1419] border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl text-gray-900 dark:text-white">
              {selectedMarket?.name} - {selectedMarket?.crop} Price Trend
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <div className="mb-6">
              <div className="text-gray-600 dark:text-gray-400 mb-2">Current Price</div>
              <div className="text-3xl text-gray-900 dark:text-white">₹{selectedMarket?.price}/qtl</div>
              <div className={`flex items-center gap-1 mt-2 ${selectedMarket?.change > 0 ? "text-emerald-400" : "text-red-400"}`}>
                {selectedMarket?.change > 0 ? (
                  <TrendingUp className="w-5 h-5" />
                ) : (
                  <TrendingDown className="w-5 h-5" />
                )}
                <span>{Math.abs(selectedMarket?.change || 0)}% in last 24h</span>
              </div>
            </div>

            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={priceHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-gray-300 dark:text-gray-700" />
                  <XAxis dataKey="date" stroke="currentColor" className="text-gray-600 dark:text-gray-400" />
                  <YAxis stroke="currentColor" className="text-gray-600 dark:text-gray-400" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-popover)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "8px",
                      color: "var(--color-popover-foreground)",
                    }}
                  />
                  <Line type="monotone" dataKey="price" stroke="#10b981" strokeWidth={2} dot={{ fill: "#10b981" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
