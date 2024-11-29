"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Loading from "@/app/components/loading";
import Tambah from "./aksi/tambah";
import Hapus from "./aksi/hapus";

interface Penjualan {
  id: number;
  nama: string;
  tanggal: string;
  namaPelanggan: string;
  pendapatan: number;
  modal: number;
  status: string;
  kategori: string;
  transaksiId: number;
  TransaksiTb: {
    id: number;
    nama: string;
  };
}

const Penjualan = () => {
  const params = useParams();
  const id = params.id;
  const [penjualan, setPenjualan] = useState<Penjualan[]>([]);
  const [pesanError, setPesanError] = useState("");
  const [loading, setLoading] = useState(false);

  const [alertSukses, setAlertSukses] = useState(false);
  const [alertGagal, setAlertGagal] = useState(false);
  const [pesan, setPesan] = useState("");

  const [totalPenjualan, setTotalPenjualan] = useState(0);
  const [totalPendapatan, setTotalPendapatan] = useState(0);
  const [totalModal, setTotalModal] = useState(0);
  const [totalUntung, setTotalUntung] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (alertSukses || alertGagal) {
      const timer = setTimeout(() => {
        setAlertSukses(false);
        setAlertGagal(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alertSukses, alertGagal]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/penjualan/${id}`);
      const data = res.data;
      setPenjualan(data);
      calculateTotals(data);
    } catch (error) {
      console.error(error);
      setPesanError("Gagal mengambil data penjualan");
    } finally {
      setLoading(false);
    }
  };

  const calculateTotals = (penjualan: Penjualan[]) => {
    let totalPenjualan = 0;
    let totalPendapatan = 0;
    let totalModal = 0;
    let totalUntung = 0;

    penjualan.forEach((item) => {
      totalPenjualan += 1;
      totalPendapatan += item.pendapatan;
      totalModal += item.modal;
      totalUntung += item.pendapatan - item.modal; // Untung = Pendapatan - Modal
    });

    setTotalPenjualan(totalPenjualan);
    setTotalPendapatan(totalPendapatan);
    setTotalModal(totalModal);
    setTotalUntung(totalUntung);
  };

  const formatTanggal = (tanggal: string) => {
    const date = new Date(tanggal);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="lg:ml-[260px]">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="font-semibold text-slate-500">Total Penjualan</p>
          <p className="font-semibold text-lg mt-3">{totalPenjualan}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="font-semibold text-slate-500">Total Pendapatan</p>
          <p className="font-semibold text-lg mt-3 text-green-600">
            Rp {totalPendapatan.toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="font-semibold text-slate-500">Total Modal</p>
          <p className="font-semibold text-lg mt-3 text-red-500">
            Rp {totalModal.toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="font-semibold text-slate-500">Total Untung</p>
          <p className="font-semibold text-lg mt-3 text-blue-500">
            Rp {totalUntung.toLocaleString()}
          </p>
        </div>
      </div>
      <div className=" bg-white p-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4">
          Daftar Penjualan{" "}
          {penjualan.length > 0 ? penjualan[0].TransaksiTb?.nama : ""}
        </h1>
        <Tambah
          setAlertSukses={setAlertSukses}
          setAlertGagal={setAlertGagal}
          setPesan={setPesan}
          reload={fetchData}
          transaksiId={id.toString()}
        />
        {alertSukses && (
          <div
            role="alert"
            className="alert alert-success flex mb-5 text-sm lg:text-base text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{pesan}</span>
          </div>
        )}

        {alertGagal && (
          <div
            role="alert"
            className="alert alert-error flex mb-5 text-sm lg:text-base text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{pesan}</span>
          </div>
        )}
        {loading ? (
          <p className="text-center">
            <Loading />
          </p>
        ) : pesanError ? (
          <p className="text-red-500 text-center">{pesanError}</p>
        ) : penjualan.length === 0 ? (
          <p className="text-center">Belum ada penjualan.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nama</th>
                  <th>Tanggal</th>
                  <th>Nama Pelanggan</th>
                  <th>Kategori</th>
                  <th>Status</th>
                  <th>Pendapatan (Rp)</th>
                  <th>Modal (Rp)</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {penjualan.map((penjualan, index) => (
                  <tr
                    key={penjualan.id}
                    className={
                      penjualan.status === "Belum Lunas" ? "bg-red-100/40" : ""
                    }
                  >
                    <th>{index + 1}</th>
                    <td>{penjualan.nama}</td>
                    <td>{formatTanggal(penjualan.tanggal)}</td>
                    <td>{penjualan.namaPelanggan}</td>
                    <td>{penjualan.kategori}</td>
                    <td>{penjualan.status}</td>
                    <td className="text-green-600 font-semibold">
                      {penjualan.pendapatan}
                    </td>
                    <td className="text-red-500 font-semibold">
                      {penjualan.modal}
                    </td>
                    <td>
                      <Hapus
                        setAlertSukses={setAlertSukses}
                        setAlertGagal={setAlertGagal}
                        setPesan={setPesan}
                        reload={fetchData}
                        id={penjualan.id}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Penjualan;
