"use client";
import Link from "next/link";
import React, { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaShoppingCart,
  FaMoneyBillWave,
  FaList,
  FaChartLine,
} from "react-icons/fa";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    {
      icon: <FaHome className="w-6 h-6" />,
      label: "Beranda",
      href: "/",
    },
    {
      icon: <FaShoppingCart className="w-6 h-6" />,
      label: "Transaksi",
      href: "/transaksi",
    },
    {
      icon: <FaMoneyBillWave className="w-6 h-6" />,
      label: "Hutang",
      href: "/hutang",
    },
    {
      icon: <FaList className="w-6 h-6" />,
      label: "Daftar Produk",
      href: "/produk",
    },
    {
      icon: <FaChartLine className="w-6 h-6" />,
      label: "Keuangan",
      href: "/keuangan",
    },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <span className="text-black text-lg font-semibold lg:pl-[260px]">
            CikiStore
          </span>
          <button
            onClick={toggleSidebar}
            className="text-gray-500 hover:text-gray-700 text-xl lg:hidden"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
      <div
        className={`fixed top-0 left-0 h-screen bg-white transition-all duration-300 ease-in-out 
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          w-64 shadow-lg z-50`}
      >
        <h1 className="text-2xl font-bold text-gray-700 text-center py-4 mt-14">
          CikiStore
        </h1>
        <div className="mt-8">
          {menuItems.map((item, index) => (
            <div key={index} className="relative group mb-4">
              <Link
                href={item.href}
                className="flex items-center px-5 py-3 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                onClick={toggleSidebar}
              >
                {item.icon}
                <span className="ml-4 transition-opacity duration-200 opacity-100">
                  {item.label}
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Overlay ketika sidebar terbuka */}
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black opacity-50 z-40"
        />
      )}
    </nav>
  );
};

export default Navbar;
