import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Plus, MapPin, Package } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

export function LogisticsHub() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    crop: "",
    quantity: "",
    pickup: "",
    dropoff: "",
    truckType: "",
  });

  const jobs = {
    awaiting: [
      {
        id: "TJ-1001",
        crop: "Tomatoes",
        quantity: "10 Tonnes",
        route: "Vellore → Chennai",
        bids: 3,
        bestBid: "₹12,000",
      },
      {
        id: "TJ-1002",
        crop: "Rice",
        quantity: "25 Tonnes",
        route: "Salem → Bangalore",
        bids: 5,
        bestBid: "₹28,000",
      },
    ],
    inTransit: [
      {
        id: "TJ-0998",
        crop: "Wheat",
        quantity: "15 Tonnes",
        route: "Madurai → Coimbatore",
        driver: "Kumar",
        eta: "2 hours",
      },
      {
        id: "TJ-0999",
        crop: "Onions",
        quantity: "8 Tonnes",
        route: "Trichy → Chennai",
        driver: "Ravi",
        eta: "4 hours",
      },
    ],
    completed: [
      {
        id: "TJ-0995",
        crop: "Cotton",
        quantity: "20 Tonnes",
        route: "Erode → Mumbai",
        cost: "₹45,000",
        date: "Today",
      },
      {
        id: "TJ-0996",
        crop: "Sugarcane",
        quantity: "30 Tonnes",
        route: "Thanjavur → Chennai",
        cost: "₹32,000",
        date: "Today",
      },
    ],
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAddModal(false);
    setFormData({ crop: "", quantity: "", pickup: "", dropoff: "", truckType: "" });
  };

  return (
    <div className="p-8 space-y-6 bg-gray-50 dark:bg-[#0a0e13] min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 dark:text-white text-3xl mb-2">Logistics Hub</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage transport jobs and truck bookings</p>
        </div>
        <Button onClick={() => setShowAddModal(true)} className="bg-emerald-500 hover:bg-emerald-600 text-white">
          <Plus className="w-5 h-5 mr-2" />
          Post New Transport Job
        </Button>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Awaiting Bids */}
        <div>
          <div className="mb-4">
            <h2 className="text-gray-900 dark:text-white text-xl mb-1">Awaiting Bids</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{jobs.awaiting.length} jobs</p>
          </div>
          <div className="space-y-4">
            {jobs.awaiting.map((job) => (
              <Card key={job.id} className="bg-white dark:bg-[#0f1419] border-gray-200 dark:border-gray-800 p-4 cursor-move hover:border-emerald-500/50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="text-gray-600 dark:text-gray-400 text-sm">{job.id}</div>
                  <div className="px-2 py-1 bg-yellow-500/10 text-yellow-400 text-xs rounded">
                    {job.bids} bids
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Package className="w-5 h-5 text-emerald-400" />
                  <span className="text-gray-900 dark:text-white">{job.quantity} - {job.crop}</span>
                </div>
                <div className="flex items-center gap-2 mb-3 text-gray-600 dark:text-gray-400 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>{job.route}</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-800">
                  <span className="text-gray-600 dark:text-gray-400 text-sm">Best Bid</span>
                  <span className="text-emerald-400">{job.bestBid}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* In-Transit */}
        <div>
          <div className="mb-4">
            <h2 className="text-gray-900 dark:text-white text-xl mb-1">In-Transit</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{jobs.inTransit.length} jobs</p>
          </div>
          <div className="space-y-4">
            {jobs.inTransit.map((job) => (
              <Card key={job.id} className="bg-white dark:bg-[#0f1419] border-gray-200 dark:border-gray-800 p-4 cursor-move hover:border-blue-500/50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="text-gray-600 dark:text-gray-400 text-sm">{job.id}</div>
                  <div className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded">
                    Active
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Package className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-900 dark:text-white">{job.quantity} - {job.crop}</span>
                </div>
                <div className="flex items-center gap-2 mb-3 text-gray-600 dark:text-gray-400 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>{job.route}</span>
                </div>
                <div className="pt-3 border-t border-gray-200 dark:border-gray-800 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Driver</span>
                    <span className="text-gray-900 dark:text-white">{job.driver}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">ETA</span>
                    <span className="text-blue-400">{job.eta}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Completed */}
        <div>
          <div className="mb-4">
            <h2 className="text-gray-900 dark:text-white text-xl mb-1">Completed</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{jobs.completed.length} jobs today</p>
          </div>
          <div className="space-y-4">
            {jobs.completed.map((job) => (
              <Card key={job.id} className="bg-white dark:bg-[#0f1419] border-gray-200 dark:border-gray-800 p-4 cursor-move hover:border-emerald-500/50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="text-gray-600 dark:text-gray-400 text-sm">{job.id}</div>
                  <div className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-xs rounded">
                    Done
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Package className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-900 dark:text-white">{job.quantity} - {job.crop}</span>
                </div>
                <div className="flex items-center gap-2 mb-3 text-gray-600 dark:text-gray-400 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>{job.route}</span>
                </div>
                <div className="pt-3 border-t border-gray-200 dark:border-gray-800 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Cost</span>
                    <span className="text-gray-900 dark:text-white">{job.cost}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Completed</span>
                    <span className="text-gray-600 dark:text-gray-400">{job.date}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Post Job Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="bg-white dark:bg-[#0f1419] border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl">Post New Transport Job</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
              <Label htmlFor="crop">
                Crop
              </Label>
              <Input
                id="crop"
                value={formData.crop}
                onChange={(e) => setFormData({ ...formData, crop: e.target.value })}
                className="mt-1"
                placeholder="e.g., Tomatoes"
                required
              />
            </div>
            <div>
              <Label htmlFor="quantity">
                Quantity (Tons)
              </Label>
              <Input
                id="quantity"
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="mt-1"
                placeholder="e.g., 10"
                required
              />
            </div>
            <div>
              <Label htmlFor="pickup">
                Pickup Location
              </Label>
              <Input
                id="pickup"
                value={formData.pickup}
                onChange={(e) => setFormData({ ...formData, pickup: e.target.value })}
                className="mt-1"
                placeholder="e.g., Vellore"
                required
              />
            </div>
            <div>
              <Label htmlFor="dropoff">
                Dropoff Location
              </Label>
              <Input
                id="dropoff"
                value={formData.dropoff}
                onChange={(e) => setFormData({ ...formData, dropoff: e.target.value })}
                className="mt-1"
                placeholder="e.g., Chennai"
                required
              />
            </div>
            <div>
              <Label htmlFor="truckType">
                Truck Type
              </Label>
              <Select value={formData.truckType} onValueChange={(value) => setFormData({ ...formData, truckType: value })}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select truck type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cold">Cold Storage</SelectItem>
                  <SelectItem value="open">Open Truck</SelectItem>
                  <SelectItem value="covered">Covered Truck</SelectItem>
                  <SelectItem value="refrigerated">Refrigerated</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="flex-1 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white">
                Post Job
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
