import React from "react";
import {
  Bell,
  MessageSquare,
  ChevronDown,
  ArrowUpDown,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AvatarGenerator } from "random-avatar-generator";

const generator = new AvatarGenerator();

const summaryCards = [
  { icon: "💰", title: "LOANS", value: "50" },
  { icon: "👥", title: "BORROWERS", value: "100" },
  { icon: "💵", title: "CASH DISBURSED", value: "550,000" },
  { icon: "🏦", title: "SAVINGS", value: "450,000" },
  { icon: "🔄", title: "REPAID LOANS", value: "30" },
  { icon: "💸", title: "CASH RECEIVED", value: "1,000,000" },
];

const appliedLoans = [
  {
    id: 1,
    avatar: generator.generateRandomAvatar(),
    activity: "Contact Email not Linked",
    name: "Tom Cruise",
    date: "June 09, 2021",
    status: "Pending",
  },
  {
    id: 2,
    avatar: generator.generateRandomAvatar(),
    activity: "Adding Images to Featured Posts",
    name: "Matt Damon",
    date: "June 09, 2021",
    status: "Pending",
  },
  {
    id: 3,
    avatar: generator.generateRandomAvatar(),
    activity: "When will I be charged this month?",
    name: "Robert Downey",
    date: "June 08, 2021",
    status: "Pending",
  },
  {
    id: 4,
    avatar: generator.generateRandomAvatar(),
    activity: "Payment not going through",
    name: "Christian Bale",
    date: "June 08, 2021",
    status: "Verified",
  },
  {
    id: 5,
    avatar: generator.generateRandomAvatar(),
    activity: "Unable to add replies",
    name: "Henry Cavil",
    date: "June 08, 2021",
    status: "Verified",
  },
  {
    id: 6,
    avatar: generator.generateRandomAvatar(),
    activity: "Downtime since last week",
    name: "Chris Evans",
    date: "June 08, 2021",
    status: "Verified",
  },
  {
    id: 7,
    avatar: generator.generateRandomAvatar(),
    activity: "Referral Bonus",
    name: "Sam Smith",
    date: "June 08, 2021",
    status: "Pending",
  },
];

export default function DashboardLoan() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">CREDIT APP</h1>
            <div className="flex items-center space-x-4">
              <Bell className="h-6 w-6 text-gray-400" />
              <MessageSquare className="h-6 w-6 text-gray-400" />
              <div className="flex items-center">
                <span className="mr-2">Verifier</span>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-4">
            <h2 className="text-gray-500">Dashboard {">"} Loans</h2>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {summaryCards.map((card, index) => (
              <div
                key={index}
                className="bg-white shadow rounded-lg p-4 flex items-center"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                    index % 2 === 0
                      ? "bg-green-500"
                      : "bg-white border-2 border-green-500"
                  } mr-4`}
                >
                  {card.icon}
                </div>
                <div>
                  <p className="text-sm text-gray-500">{card.title}</p>
                  <p className="text-xl font-semibold">{card.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Applied Loans Table */}
          <div className="bg-white shadow rounded-lg mb-8">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Applied Loans</h3>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <ArrowUpDown className="mr-2 h-4 w-4" /> Sort
                </Button>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" /> Filter
                </Button>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User Recent Activity</TableHead>
                  <TableHead>Customer name</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appliedLoans.map((loan) => (
                  <TableRow key={loan.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <img
                          src={loan.avatar}
                          alt={loan.name}
                          className="w-8 h-8 rounded-full mr-2"
                        />
                        {loan.activity}
                      </div>
                    </TableCell>
                    <TableCell>{loan.name}</TableCell>
                    <TableCell>{loan.date}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          loan.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {loan.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="p-4 border-t border-gray-200 flex items-center justify-between">
              <div className="flex items-center">
                <span className="mr-2">Rows per page:</span>
                <select className="border rounded px-2 py-1">
                  <option>7</option>
                </select>
              </div>
              <div className="flex items-center">
                <span className="mr-2">1-7 of 1240</span>
                <Button variant="outline" size="icon">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
