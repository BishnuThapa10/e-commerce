import React, { useState } from 'react'

import { Outlet, Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { removeUser } from '../account/userSlice.js';

import {
  Home,
  List,
  LogOut,
  Menu,
  Settings,
  Mail,
  ShoppingCart,
  Users,
} from "lucide-react";

// Admin Menu Items
const adminMenu = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: Home,
  },

  {
    title: "Users",
    url: "/admin/contact",
    icon: Mail,
  },
  // {
  //   title: "Users",
  //   url: "/admin/users",
  //   icon: Users,
  // },
  // {
  //   title: "Products",
  //   url: "/admin/products",
  //   icon: List,
  // },
  {
    title: "Orders",
    url: "/admin/orders",
    icon: ShoppingCart,
  },
];

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(true);
  const nav = useNavigate();
  const dispatch = useDispatch();

  const logout = async () => {

    // Confirm logout
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;

    try {
      // Dispatch your delete action (can be async)
      dispatch(removeUser());
      // Optionally navigate somewhere after deletion
      nav("/", { replace: true });
    } catch (error) {
      console.error("Failed to logout:", error);
      alert("Something went wrong. Please try again.");
    }
  }
  return (
    <div className=" bg-gray-100 min-h-screen">

      {/* Main Content */}
      <div className="flex flex-col min-h-screen">

        {/* Top Navbar */}
        <header className="bg-white border-b px-6 h-10 flex items-center justify-between">
          {/* {collapsed && <h2 className="text-sm text-gray-600">Admin Dashboard</h2>} */}
          <h2 className="text-sm text-gray-600">Admin Dashboard</h2>
          <nav className="flex justify-center space-x-1">
            {adminMenu.map((item) => (
              <Link
                key={item.title}
                to={item.url}
                className="flex items-center gap-3 p-2 hover:bg-gray-200 rounded-md"
              >
                <item.icon className="w-4 h-4" />
                {!collapsed && <span>{item.title}</span>}
              </Link>
            ))}

            <button
              onClick={logout}
              className="flex items-center gap-3 p-2 w-full hover:bg-gray-200 rounded-md cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              {!collapsed && <span>Logout</span>}
            </button>

          </nav>
        </header>

        {/* Dynamic Page Content */}
        <main className="p-4 flex-1">
          <Outlet />
        </main>
      </div>

    </div>
  );
}
