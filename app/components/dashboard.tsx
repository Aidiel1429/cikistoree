"use client";
import React, { useState } from "react";

interface DashboardStats {
  totalPenjualan: number;
  totalPendapatan: number;
  totalModal: number;
  totalUntung: number;
}

interface DashboardClientProps {
  initialStats: DashboardStats;
}

const DashboardClient: React.FC<DashboardClientProps> = ({ initialStats }) => {
  const [stats, setStats] = useState(initialStats);

  const reload = async () => {
    try {
      const res = await fetch("/api/dashboard");
      const data = await res.json();

      const totalPenjualan = data.length;
      const totalPendapatan = data.reduce(
        (sum: number, item: any) => sum + item.pendapatan,
        0
      );
      const totalModal = data.reduce(
        (sum: number, item: any) => sum + item.modal,
        0
      );
      const totalUntung = totalPendapatan - totalModal;

      setStats({
        totalPenjualan,
        totalPendapatan,
        totalModal,
        totalUntung,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="lg:ml-[260px]">
      <div className="p-4 bg-white shadow-md rounded-lg w-full">
        <h1 className="mb-2">
          Selamat Datang,{" "}
          <span className="font-semibold text-lg">CikiStore.</span>
        </h1>
        <p>Berikut adalah ringkasan transaksi anda.</p>
        <button
          onClick={reload}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Reload Data
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h1 className="font-semibold text-slate-500 mb-2">Total Penjualan</h1>
          <p className="text-xl font-semibold text-slate-700">
            {stats.totalPenjualan}
          </p>
        </div>
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h1 className="font-semibold text-slate-500 mb-2">
            Total Pendapatan
          </h1>
          <p className="text-xl font-semibold text-green-600">
            Rp {stats.totalPendapatan.toLocaleString("id-ID")}
          </p>
        </div>
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h1 className="font-semibold text-slate-500 mb-2">Total Modal</h1>
          <p className="text-xl font-semibold text-red-600">
            Rp {stats.totalModal.toLocaleString("id-ID")}
          </p>
        </div>
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h1 className="font-semibold text-slate-500 mb-2">Total Untung</h1>
          <p className="text-xl font-semibold text-blue-600">
            Rp {stats.totalUntung.toLocaleString("id-ID")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardClient;
