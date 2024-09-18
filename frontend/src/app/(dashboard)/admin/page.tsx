"use client";

import React from "react";
import {
  DollarSign,
  FileText,
} from "lucide-react";
import Dashboard from "@/components/Dashboard";
import DashboardLoan from "@/components/Loans";

const sidebarItems = [
  {
    icon: <FileText className="mr-2" />,
    label: "Dashboard",
    component: <Dashboard />,
  },
  {
    icon: <DollarSign className="mr-2" />,
    label: "Loans",
    component: <DashboardLoan />,
  },
];

export default function DashboardMain() {
  const [selectedComponent, setSelectedComponent] = React.useState(
    sidebarItems[0].component
  );



  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-green-950 text-white p-6">
        <div className="flex items-center mb-8">
          <div className="w-8 h-8 bg-white rounded-full mr-2"></div>
          <span className="font-semibold">John Doe</span>
        </div>
        <nav>
          <ul>
            {sidebarItems.map((item, index) => (
              <li key={index} className="mb-2">
                <button
                  onClick={() =>
                    setSelectedComponent(
                      item.component ? item.component : <Dashboard />
                    )
                  }
                  className={`flex items-center py-2 px-4 hover:bg-green-700 rounded ${selectedComponent === item.component ? "bg-green-700" : ""}`}
                >
                  {item.icon}
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">{selectedComponent}</main>
    </div>
  );
}
