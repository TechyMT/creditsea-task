"use client";
import React, { useEffect, useState } from "react";
import {
  Bell,
  MessageSquare,
  ChevronDown,
  Search,
  ArrowUpDown,
  Filter,
  MoreVertical,
} from "lucide-react";
import LoanApplicationForm from "@/components/LoanApplicationModal";
import { AvatarGenerator } from "random-avatar-generator";
import { api } from "@/api";
import { useRouter } from "next/navigation";
import { User } from "@/types/user";
import { LoanFormData } from "@/types/loan";
const generator = new AvatarGenerator();

type LoanApplication = {
  id: number;
  officerName: string;
  amount: number;
  dateApplied: string;
  status: "PENDING" | "REPAID" | "REJECTED" | "APPROVED";
};

const Dashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loanApplications, setLoanApplications] = useState<LoanApplication[]>(
    []
  );
  const [user,setUser] = useState<User | null>(null);

  const router = useRouter();
  
  useEffect(() => {
    const user: User | null = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null;
    setUser(user);
    const fetchData = async () => {
      try {
        if (!user) {
          // Redirect to login page
          router.push("/login");
          return;
        }
        const { data } = await api.get(`/loan/user/${user.id}`);

        const allData = data.map((loan: LoanFormData) => {
          return {
            id: loan.id,
            officerName: loan.full_name,
            amount: Number(loan.loan_amount),
            dateApplied: loan.created_at,
            status: loan.loan_status,
          };
        });

        console.log("allData", allData);

        setLoanApplications(allData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (data: LoanFormData) => {
    try {
      // Here you would typically send the data to your backend
      console.log(data);
      if (!data) {
        alert("Please fill in all fields");
        return;
      }
      const { data: res } = await api.post("/loan/apply", {
        ...data,
        user_id: user?.id,
      });
      alert("Loan application submitted successfully");
      setLoanApplications((applications) => {
        return [
          ...applications,
          {
            id: applications.length + 1,
            officerName: res.loan.full_name,
            amount: Number(data.loan_amount),
            dateApplied: new Date().toLocaleDateString(),
            status: res.loan.loan_status,
          },
        ];
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      alert("An error occurred while submitting your loan application");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-800">CREDIT APP</h1>
          <nav className="flex space-x-4">
            <a href="#" className="text-green-600 hover:text-green-800">
              Home
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              Payments
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              Budget
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              Card
            </a>
          </nav>
          <div className="flex items-center space-x-4">
            <Bell className="text-gray-600" />
            <MessageSquare className="text-gray-600" />
            <div className="flex items-center">
              <span className="mr-2">User</span>
              <ChevronDown className="text-gray-600" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <div className="bg-green-500 p-4 rounded-lg mr-4">
                  <span className="text-white font-bold text-xl">₦</span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">DEFICIT</p>
                  <p className="text-3xl font-bold">0.0</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              >
                Get A Loan
              </button>
            </div>

            <div className="flex space-x-2 mb-4">
              <button className="bg-green-500 text-white px-4 py-2 rounded">
                Borrow Cash
              </button>
              <button className="bg-white text-gray-700 px-4 py-2 rounded">
                Transact
              </button>
              <button className="bg-white text-gray-700 px-4 py-2 rounded">
                Deposit Cash
              </button>
            </div>

            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for loans"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:border-green-500"
                />
                <div className="absolute left-3 top-3">
                  <Search className="text-gray-400" />
                </div>
              </div>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Applied Loans
                </h3>
                <div className="flex space-x-2">
                  <button className="flex items-center text-gray-600">
                    <ArrowUpDown className="mr-1" /> Sort
                  </button>
                  <button className="flex items-center text-gray-600">
                    <Filter className="mr-1" /> Filter
                  </button>
                </div>
              </div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Loan Officer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date Applied
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loanApplications.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center py-4">
                        No loan applications found
                      </td>
                    </tr>
                  )}
                  {loanApplications.map((application) => (
                    <tr key={application.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={generator.generateRandomAvatar()}
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {application.officerName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {application.amount.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(
                            application.dateApplied
                          ).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${
                            application.status === "PENDING"
                              ? "bg-yellow-100 text-yellow-800"
                              : application.status === "REPAID"
                              ? "bg-green-100 text-green-800"
                              : application.status === "REJECTED"
                              ? "bg-red-100 text-red-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {application.status}
                        </span>
                      </td>
                      <td className="text-center pr-6 text-sm font-medium">
                        <button className="text-gray-400 hover:text-gray-500">
                          <MoreVertical />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {isModalOpen && (
        <div
          className="fixed z-50 inset-0 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            ></div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <LoanApplicationForm onSubmit={onSubmit} />
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
