"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../components/loading";
import { MdOutlinePayments } from "react-icons/md";
import Link from "next/link";

interface HutangProps {
  id: number;
  nama: string;
  hutang: number;
  tanggal: string;
}

const HutangPage = () => {
  const [hutang, setHutang] = useState<HutangProps[]>([]);
  const [pesanError, setPesanError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/hutang");
      const data = res.data;
      setHutang(data);
    } catch (error) {
      console.error(error);
      setPesanError(
        "Gagal terhubung ke server, pastikan terhubung ke internet!"
      );
    } finally {
      setLoading(false);
    }
  };

  const formatTanggal = (tanggal: string) => {
    const date = new Date(tanggal);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const hitungDenda = (tanggal: string) => {
    const tanggalHutang = new Date(tanggal);
    const sekarang = new Date();
    const perbedaanHari = Math.floor(
      (sekarang.getTime() - tanggalHutang.getTime()) / (1000 * 60 * 60 * 24)
    );
    return perbedaanHari > 3 ? (perbedaanHari - 3) * 2000 : 0;
  };

  const hitungTotal = (hutang: number, denda: number) => hutang + denda;

  return (
    <div className="lg:ml-[260px]">
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-white shadow-md rounded-lg">
          <p className="font-semibold text-slate-500">Jumlah Hutang</p>
          <h1 className="font-semibold text-lg mt-4">{hutang.length}</h1>
        </div>
        <div className="p-4 bg-white shadow-md rounded-lg">
          <p className="font-semibold text-slate-500">Total Hutang</p>
          <h1 className="font-semibold text-lg mt-4 text-red-500">
            Rp{" "}
            {hutang
              .reduce(
                (acc, item) =>
                  acc + hitungTotal(item.hutang, hitungDenda(item.tanggal)),
                0
              )
              .toLocaleString()}
          </h1>
        </div>
      </div>
      <div className="mt-4 bg-white p-4 shadow-md rounded-lg">
        <h1 className="font-semibold text-slate-600 text-lg mb-4">
          Daftar Hutang
        </h1>
        {loading ? (
          <p className="text-center">
            <Loading />
          </p>
        ) : pesanError ? (
          <p className="text-center">{pesanError}</p>
        ) : hutang.length === 0 ? (
          <p className="text-center">Tidak ada hutang</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nama Pelanggan</th>
                  <th>Hutang (Rp)</th>
                  <th>Tanggal</th>
                  <th>Denda (Rp)</th>
                  <th>Total Hutang (Rp)</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {hutang.map((item, index) => {
                  const denda = hitungDenda(item.tanggal);
                  const total = hitungTotal(item.hutang, denda);
                  return (
                    <tr key={item.id}>
                      <th>{index + 1}</th>
                      <td>{item.nama}</td>
                      <td>Rp {item.hutang.toLocaleString()}</td>
                      <td>{formatTanggal(item.tanggal)}</td>
                      <td>+ Rp {denda.toLocaleString()}</td>
                      <td>Rp {total.toLocaleString()}</td>
                      <td>
                        <Link href={"/hutang/detailHutang/2"}>
                          <MdOutlinePayments className="text-xl text-blue-500" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default HutangPage;
