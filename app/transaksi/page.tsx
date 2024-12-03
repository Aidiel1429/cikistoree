"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiDetail } from "react-icons/bi";
import { FiTrash } from "react-icons/fi";
import Loading from "../components/loading";
import Tambah from "./aksi/tambah";

interface TransaksiProps {
  id: number;
  nama: string;
  PenjualanTb: {
    pendapatan: number;
    modal: number;
  };
}

interface PenjualanProps {
  id: number;
  pendapatan: number;
  modal: number;
}

const Transaksi = () => {
  const [transaksi, setTransaksi] = useState<TransaksiProps[]>([]);
  const [penjualan, setPenjualan] = useState<PenjualanProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState<number | null>(null);

  const [alertSukses, setAlertSukses] = useState(false);
  const [alertGagal, setAlertGagal] = useState(false);
  const [pesan, setPesan] = useState("");

  const [totalPenjualan, setTotalPenjualan] = useState(0);
  const [totalPendapatan, setTotalPendapatan] = useState(0);
  const [totalModal, setTotalModal] = useState(0);
  const [totalUntung, setTotalUntung] = useState(0);

  useEffect(() => {
    fetchData();
    loadPenjualan();
  }, []);

  useEffect(() => {
    if (alertSukses || alertGagal) {
      const timeout = setTimeout(() => {
        setAlertSukses(false);
        setAlertGagal(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [alertSukses, alertGagal]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get<TransaksiProps[]>("/api/transaksi");
      setTransaksi(res.data);
    } catch (error) {
      console.error(error);
      setError("Gagal mengambil data transaksi");
    } finally {
      setLoading(false);
    }
  };

  const loadPenjualan = async () => {
    try {
      const res = await axios.get("/api/dashboard");
      const data = res.data;
      setPenjualan(data);
      calculateTotals(data);
    } catch (error) {
      console.log(error);
    }
  };

  const calculateTotals = (penjualan: PenjualanProps[]) => {
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

  const handleDelete = async () => {
    setLoading(true);
    if (id) {
      try {
        const res = await axios.delete(`/api/transaksi/${id}`);

        if (res.data.pesan === "berhasil") {
          setAlertSukses(true);
          setAlertGagal(false);
          setPesan("Berhasil menghapus transaksi");
          setIsOpen(false);
          setId(null);
          fetchData();
        } else {
          setAlertSukses(false);
          setAlertGagal(true);
          setIsOpen(false);
          setPesan("Gagal menghapus transaksi");
        }
      } catch (error) {
        console.error(error);
        setAlertGagal(true);
        setIsOpen(false);
        setPesan("Gagal menghapus transaksi");
      } finally {
        setLoading(false);
      }
    }
  };

  const openDeleteModal = (id: number) => {
    setId(id);
    setIsOpen(true);
  };

  return (
    <div className="lg:ml-[260px]">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 mb-5">
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
            Rp {totalPendapatan.toLocaleString()}
          </p>
        </div>
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h1 className="font-semibold text-slate-500 mb-2">Total Modal</h1>
          <p className="text-xl font-semibold text-red-600">
            Rp {totalModal.toLocaleString()}
          </p>
        </div>
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h1 className="font-semibold text-slate-500 mb-2">Total Untung</h1>
          <p className="text-xl font-semibold text-blue-600">
            Rp {totalUntung.toLocaleString()}
          </p>
        </div>
      </div>
      <div className="p-4 bg-white shadow-md rounded-lg w-full">
        <h1 className="mb-2 text-lg font-semibold">Halaman Transaksi</h1>

        <Tambah
          setAlertSukses={setAlertSukses}
          setAlertGagal={setAlertGagal}
          setPesan={setPesan}
          reload={fetchData}
        />

        {alertSukses && (
          <div
            role="alert"
            className="alert alert-success text-white flex mb-2"
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
            <span className="text-sm">{pesan}</span>
          </div>
        )}

        {/* Alert Gagal */}
        {alertGagal && (
          <div role="alert" className="alert alert-error text-white flex mb-2">
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
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-sm">{pesan}</span>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Nama</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={3} className="text-center">
                    <Loading />
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={3} className="text-center text-red-500">
                    {error}
                  </td>
                </tr>
              ) : transaksi.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center">
                    Tidak ada data transaksi
                  </td>
                </tr>
              ) : (
                transaksi.map((item, index) => {
                  return (
                    <tr key={item.id} className="hover:bg-gray-100">
                      <td>{index + 1}</td>
                      <td>{item.nama}</td>
                      <td className="flex items-center space-x-2">
                        <Link
                          href={`/penjualan/${item.id}`}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <BiDetail size={20} />
                        </Link>
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => openDeleteModal(item.id)}
                        >
                          <FiTrash size={20} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Modal */}
      <dialog
        id="delete_modal"
        className={isOpen ? "modal modal-open" : "modal"}
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">Konfirmasi Hapus</h3>
          <p className="py-4">
            Apakah Anda yakin ingin menghapus transaksi ini?
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button
                className="btn btn-ghost mr-2"
                onClick={() => setIsOpen(false)}
              >
                Batal
              </button>
              <button
                className="btn btn-error text-white"
                onClick={handleDelete}
              >
                {loading ? <Loading /> : "Hapus"}
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Transaksi;
