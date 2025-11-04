import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { DollarSign, Download, Calendar } from "lucide-react";

export function Payouts() {
  const [selectedFarmers, setSelectedFarmers] = useState<number[]>([]);

  const payouts = [
    { id: 1, name: "Ramesh Kumar", amount: 45000, dueDate: "Nov 6, 2025", status: "Pending" },
    { id: 2, name: "Suresh Patel", amount: 32000, dueDate: "Nov 7, 2025", status: "Pending" },
    { id: 3, name: "Vijay Singh", amount: 28500, dueDate: "Nov 8, 2025", status: "Pending" },
    { id: 4, name: "Prakash Reddy", amount: 56000, dueDate: "Nov 8, 2025", status: "Pending" },
    { id: 5, name: "Mahesh Rao", amount: 41000, dueDate: "Nov 9, 2025", status: "Pending" },
    { id: 6, name: "Anil Kumar", amount: 38000, dueDate: "Nov 10, 2025", status: "Pending" },
    { id: 7, name: "Ravi Shankar", amount: 52000, dueDate: "Nov 11, 2025", status: "Overdue" },
    { id: 8, name: "Karthik Bose", amount: 29500, dueDate: "Nov 12, 2025", status: "Pending" },
  ];

  const toggleFarmer = (id: number) => {
    setSelectedFarmers((prev) =>
      prev.includes(id) ? prev.filter((farmerId) => farmerId !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedFarmers.length === payouts.length) {
      setSelectedFarmers([]);
    } else {
      setSelectedFarmers(payouts.map((p) => p.id));
    }
  };

  const totalSelected = payouts
    .filter((p) => selectedFarmers.includes(p.id))
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="p-8 space-y-6 bg-gray-50 dark:bg-[#0a0e13] min-h-screen">
      <div>
        <h1 className="text-gray-900 dark:text-white text-3xl mb-2">Farmer Payouts</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage and process farmer payments</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white dark:bg-[#0f1419] border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-gray-600 dark:text-gray-400 mb-2">Total Pending</div>
              <div className="text-gray-900 dark:text-white text-3xl">₹3.22L</div>
            </div>
            <div className="w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
        </Card>
        <Card className="bg-white dark:bg-[#0f1419] border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-gray-600 dark:text-gray-400 mb-2">Overdue Payments</div>
              <div className="text-gray-900 dark:text-white text-3xl">₹52K</div>
            </div>
            <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-red-400" />
            </div>
          </div>
        </Card>
        <Card className="bg-white dark:bg-[#0f1419] border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-gray-600 dark:text-gray-400 mb-2">Paid This Month</div>
              <div className="text-gray-900 dark:text-white text-3xl">₹8.45L</div>
            </div>
            <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-emerald-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Payouts Table */}
      <Card className="bg-white dark:bg-[#0f1419] border-gray-200 dark:border-gray-800">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <div>
            <h2 className="text-gray-900 dark:text-white text-xl">Pending Payouts</h2>
            {selectedFarmers.length > 0 && (
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                {selectedFarmers.length} selected • Total: ₹{(totalSelected / 1000).toFixed(1)}K
              </p>
            )}
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button
              disabled={selectedFarmers.length === 0}
              className="bg-emerald-500 hover:bg-emerald-600 text-white disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:text-gray-500"
            >
              Pay Selected ({selectedFarmers.length})
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-200 dark:border-gray-800 hover:bg-transparent">
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedFarmers.length === payouts.length}
                    onCheckedChange={toggleAll}
                  />
                </TableHead>
                <TableHead className="text-gray-600 dark:text-gray-400">Farmer Name</TableHead>
                <TableHead className="text-gray-600 dark:text-gray-400">Amount Owed</TableHead>
                <TableHead className="text-gray-600 dark:text-gray-400">Due Date</TableHead>
                <TableHead className="text-gray-600 dark:text-gray-400">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payouts.map((payout) => (
                <TableRow key={payout.id} className="border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50">
                  <TableCell>
                    <Checkbox
                      checked={selectedFarmers.includes(payout.id)}
                      onCheckedChange={() => toggleFarmer(payout.id)}
                    />
                  </TableCell>
                  <TableCell className="text-gray-900 dark:text-white">{payout.name}</TableCell>
                  <TableCell className="text-gray-900 dark:text-white">₹{payout.amount.toLocaleString()}</TableCell>
                  <TableCell className="text-gray-700 dark:text-gray-300">{payout.dueDate}</TableCell>
                  <TableCell>
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        payout.status === "Overdue"
                          ? "bg-red-500/10 text-red-400"
                          : "bg-yellow-500/10 text-yellow-400"
                      }`}
                    >
                      {payout.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Payment Info */}
      <Card className="bg-white dark:bg-[#0f1419] border-gray-200 dark:border-gray-800 p-6">
        <h3 className="text-gray-900 dark:text-white mb-4">Payment Gateway Integration</h3>
        <div className="text-gray-600 dark:text-gray-400 space-y-2">
          <p>
            Cropix supports batch payment processing through UPI, NEFT, and RTGS. Payments are
            processed securely and farmers receive instant notifications.
          </p>
          <p className="text-sm">
            Note: This is a demo environment. In production, integrate with payment gateways like
            Razorpay, PayU, or your bank's API.
          </p>
        </div>
      </Card>
    </div>
  );
}
