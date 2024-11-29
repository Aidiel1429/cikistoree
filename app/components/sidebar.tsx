"use client";

import React, { useState } from "react";
import {
  FaHome,
  FaShoppingCart,
  FaMoneyBillWave,
  FaList,
  FaChartLine,
} from "react-icons/fa";

const Sidebar = () => {
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

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-white transition-all duration-300 ease-in-out w-64 shadow-lg z-50`}
    >
      <h1 className="text-2xl font-bold text-gray-700 text-center py-4 mt-14">
        CikiStore
      </h1>
      <div className="mt-8">
        {menuItems.map((item, index) => (
          <div key={index} className="relative group mb-4">
            <a
              href={item.href}
              className="flex items-center px-5 py-3 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            >
              {item.icon}
              <span className="ml-4 transition-opacity duration-200 opacity-100">
                {item.label}
              </span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
