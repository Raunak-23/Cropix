import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Plus, Search, MoreVertical, Phone, MapPin } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

export function FarmerManagement() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    village: "",
    phone: "",
    bank: "",
    crops: "",
  });

  const farmers = [
    { id: 1, name: "Ramesh Kumar", village: "Thiruvannamalai", phone: "+91 98765 43210", crops: "Rice, Wheat", status: "Active" },
    { id: 2, name: "Suresh Patel", village: "Vellore", phone: "+91 98765 43211", crops: "Tomato, Onion", status: "Active" },
    { id: 3, name: "Vijay Singh", village: "Salem", phone: "+91 98765 43212", crops: "Rice", status: "Active" },
    { id: 4, name: "Prakash Reddy", village: "Coimbatore", phone: "+91 98765 43213", crops: "Cotton, Rice", status: "Active" },
    { id: 5, name: "Mahesh Rao", village: "Madurai", phone: "+91 98765 43214", crops: "Sugarcane", status: "Pending" },
    { id: 6, name: "Anil Kumar", village: "Trichy", phone: "+91 98765 43215", crops: "Rice, Wheat", status: "Active" },
    { id: 7, name: "Ravi Shankar", village: "Thanjavur", phone: "+91 98765 43216", crops: "Rice", status: "Active" },
    { id: 8, name: "Karthik Bose", village: "Erode", phone: "+91 98765 43217", crops: "Turmeric, Onion", status: "Active" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAddModal(false);
    setFormData({ name: "", village: "", phone: "", bank: "", crops: "" });
  };

  const filteredFarmers = farmers.filter(
    (farmer) =>
      farmer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farmer.village.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farmer.crops.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 space-y-6 bg-gray-50 dark:bg-[#0a0e13] min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 dark:text-white text-3xl mb-2">Farmer Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your farmer network and relationships</p>
        </div>
        <Button onClick={() => setShowAddModal(true)} className="bg-emerald-500 hover:bg-emerald-600 text-white">
          <Plus className="w-5 h-5 mr-2" />
          Add New Farmer
        </Button>
      </div>

      <Card className="bg-white dark:bg-[#0f1419] border-gray-200 dark:border-gray-800">
        {/* Search Bar */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search farmers by name, village, or crops..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-200 dark:border-gray-800 hover:bg-transparent">
                <TableHead className="text-gray-600 dark:text-gray-400">Farmer Name</TableHead>
                <TableHead className="text-gray-600 dark:text-gray-400">Village</TableHead>
                <TableHead className="text-gray-600 dark:text-gray-400">Phone Number</TableHead>
                <TableHead className="text-gray-600 dark:text-gray-400">Primary Crops</TableHead>
                <TableHead className="text-gray-600 dark:text-gray-400">Status</TableHead>
                <TableHead className="text-gray-600 dark:text-gray-400 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFarmers.map((farmer) => (
                <TableRow key={farmer.id} className="border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50">
                  <TableCell className="text-gray-900 dark:text-white">{farmer.name}</TableCell>
                  <TableCell className="text-gray-700 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      {farmer.village}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-700 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      {farmer.phone}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-700 dark:text-gray-300">{farmer.crops}</TableCell>
                  <TableCell>
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        farmer.status === "Active"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-yellow-500/10 text-yellow-400"
                      }`}
                    >
                      {farmer.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Schedule Procurement
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Initiate Payout
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Add Farmer Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="bg-white dark:bg-[#0f1419] border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl">Add New Farmer</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
              <Label htmlFor="name">
                Farmer Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label htmlFor="village">
                Village
              </Label>
              <Input
                id="village"
                value={formData.village}
                onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label htmlFor="bank">
                Bank Details (for payouts)
              </Label>
              <Input
                id="bank"
                value={formData.bank}
                onChange={(e) => setFormData({ ...formData, bank: e.target.value })}
                className="mt-1"
                placeholder="Account Number / UPI ID"
                required
              />
            </div>
            <div>
              <Label htmlFor="crops">
                Primary Crops
              </Label>
              <Input
                id="crops"
                value={formData.crops}
                onChange={(e) => setFormData({ ...formData, crops: e.target.value })}
                className="mt-1"
                placeholder="e.g., Rice, Wheat"
                required
              />
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
                Add Farmer
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
