"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Transaksi {
  pendapatan: number;
  modal: number;
}

const Dashboard = () => {
  const [transaksi, setTransaksi] = useState<Transaksi[]>([]);
  const [totalPenjualan, setTotalPenjualan] = useState(0);
  const [totalPendapatan, setTotalPendapatan] = useState(0);
  const [totalModal, setTotalModal] = useState(0);
  const [totalUntung, setTotalUntung] = useState(0);

  useEffect(() => {
    reload();
  }, []);

  const reload = async () => {
    try {
      const res = await axios.get("/api/dashboard", {
        headers: { "Cache-Control": "no-store" }, // Pastikan client tidak cache
      });
      const data: Transaksi[] = res.data;

      setTransaksi(data);

      // Hitung total
      const totalPendapatan = data.reduce(
        (sum, item) => sum + item.pendapatan,
        0
      );
      const totalModal = data.reduce((sum, item) => sum + item.modal, 0);
      const totalUntung = totalPendapatan - totalModal;

      setTotalPenjualan(data.length);
      setTotalPendapatan(totalPendapatan);
      setTotalModal(totalModal);
      setTotalUntung(totalUntung);
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
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h1 className="font-semibold text-slate-500 mb-2">Total Penjualan</h1>
          <p className="text-xl font-semibold text-slate-700">
            {totalPenjualan}
          </p>
        </div>
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h1 className="font-semibold text-slate-500 mb-2">
            Total Pendapatan
          </h1>
          <p className="text-xl font-semibold text-green-600">
            Rp {totalPendapatan.toLocaleString("id-ID")}
          </p>
        </div>
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h1 className="font-semibold text-slate-500 mb-2">Total Modal</h1>
          <p className="text-xl font-semibold text-red-600">
            Rp {totalModal.toLocaleString("id-ID")}
          </p>
        </div>
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h1 className="font-semibold text-slate-500 mb-2">Total Untung</h1>
          <p className="text-xl font-semibold text-blue-600">
            Rp {totalUntung.toLocaleString("id-ID")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
