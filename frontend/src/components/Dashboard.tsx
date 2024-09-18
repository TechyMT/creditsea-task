import {
  ArrowUpDown,
  Bell,
  Building,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Filter,
  MessageSquare,
  MoreVertical,
  PiggyBank,
  Repeat,
  UserCheck,
  Users,
} from "lucide-react";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "./ui/table";
import { AvatarGenerator } from "random-avatar-generator";
import { api } from "@/api";
import { LoanFormData } from "@/types/loan";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const generator = new AvatarGenerator();

interface SummaryCard {
  icon: React.ReactNode;
  title: string;
  value: number;
}

interface RecentLoan {
  id: number;
  avatar: string;
  activity: string;
  name: string;
  date: string;
  status: string;
}

const Dashboard = () => {
  const [summaryCards, setSummaryCards] = React.useState<SummaryCard[]>([]);
  const [recentLoans, setRecentLoans] = React.useState<RecentLoan[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get("/admin/statistics");

      const summaryCards = [
        {
          icon: <Users />,
          title: "ACTIVE USERS",
          value: res.data.active_users,
        },
        {
          icon: <UserCheck />,
          title: "APPROVED LOANS",
          value: res.data.approved_loans,
        },
        {
          icon: <Repeat />,
          title: "REJECTED LOANS",
          value: res.data.rejected_loans,
        },
        {
          icon: <PiggyBank />,
          title: "PENDING LOANS",
          value: res.data.pending_loans,
        },
        {
          icon: <Building />,
          title: "REPAID LOANS",
          value: res.data.repaid_loans,
        },
        {
          icon: <DollarSign />,
          title: "CASH RECIEVED",
          value: res.data.cash_received,
        },
        {
          icon: <DollarSign />,
          title: "CASH DISBURSED",
          value: res.data.cash_disbursed,
        },
        { icon: <DollarSign />, title: "LOANS", value: res.data.total_loans },
      ];

      setSummaryCards(summaryCards);
    };
    fetchData();
  }, [recentLoans]);

  useEffect(() => {
    const fetchLoans = async () => {
      const res = await api.get("/admin/recent?limit=7");
      const recentLoans = res.data.map((loan: LoanFormData) => ({
        id: loan.id,
        avatar: "",
        activity: loan.reason_for_loan,
        name: loan.full_name,
        date: loan.created_at,
        status: loan.loan_status,
      }));
      setRecentLoans(recentLoans);
    };
    fetchLoans();
  }, [recentLoans]);

  const handleAction = async (id: number, status: string) => {
    try {
      await api.put(`/loan/${id}/status`, { status });
      setRecentLoans((loan) => {
        return loan.map((item) => {
          if (item.id === id) {
            return { ...item, status: status };
          }
          return item;
        });
      });
      alert("Loan status updated successfully");
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again");
    }
  };

  return (
    <main className="flex-1 overflow-y-auto">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">CREDIT APP</h1>
          <div className="flex items-center space-x-4">
            <Bell className="h-6 w-6 text-gray-400" />
            <MessageSquare className="h-6 w-6 text-gray-400" />
            <div className="flex items-center">
              <span className="mr-2">Admin</span>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Dashboard Title */}
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {summaryCards.length > 0 &&
            summaryCards.map((card, index) => (
              <div
                key={index}
                className="bg-white shadow rounded-lg p-4 flex items-center"
              >
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white mr-4">
                  {card.icon}
                </div>
                <div>
                  <p className="text-sm text-gray-500">{card.title}</p>
                  <p className="text-xl font-semibold">{card.value}</p>
                </div>
              </div>
            ))}
        </div>

        {/* Recent Loans Table */}
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
                <TableHead>Loan Reason</TableHead>
                <TableHead>Customer name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentLoans.map((loan) => (
                <TableRow key={loan.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <img
                        src={generator.generateRandomAvatar()}
                        alt={loan.name}
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      {loan.activity}
                    </div>
                  </TableCell>
                  <TableCell>{loan.name}</TableCell>
                  <TableCell>
                    {new Date(loan.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        loan.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-800"
                          : loan.status === "APPROVED"
                          ? "bg-green-100 text-green-800"
                          : loan.status === "REJECTED"
                          ? "bg-red-100 text-red-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {loan.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="px-3 py-1 rounded">
                          <MoreVertical className="h-4 w-4 text-gray-700 " />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {loan.status === "PENDING" ? (
                          <>
                            <DropdownMenuItem
                              onClick={() => handleAction(loan.id, "APPROVED")}
                            >
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleAction(loan.id, "REJECTED")}
                            >
                              Reject
                            </DropdownMenuItem>
                          </>
                        ) : (
                          <>
                            <DropdownMenuItem
                              onClick={() => handleAction(loan.id, "REPAID")}
                            >
                              Mark as Repaid
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleAction(loan.id, "REJECTED")}
                            >
                              Reject
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
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
  );
};

export default Dashboard;
