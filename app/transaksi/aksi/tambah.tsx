"use client";
import Loading from "@/app/components/loading";
import axios from "axios";
import React, { useState } from "react";

interface TambahProps {
  setAlertSukses: (value: boolean) => void;
  setAlertGagal: (value: boolean) => void;
  setPesan: (pesan: string) => void;
  reload: () => void;
}

const Tambah = ({
  setAlertSukses,
  setAlertGagal,
  setPesan,
  reload,
}: TambahProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nama, setNama] = useState("");

  const handleTambah = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("nama", nama);
      const res = await axios.post("/api/transaksi", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.pesan === "berhasil") {
        setAlertSukses(true);
        setAlertGagal(false);
        setPesan("Berhasil menambahkan transaksi!");
        setIsOpen(false);
        setNama("");
        reload();
      } else {
        setAlertSukses(false);
        setAlertGagal(true);
        setPesan("Gagal menambahkan transaksi!");
        setIsOpen(false);
        reload();
      }
    } catch (error) {
      setAlertSukses(false);
      setAlertGagal(true);
      setPesan(
        "Gagal terhubung ke server, pastikan anda tersambung ke internet!"
      );
      setIsOpen(false);
      reload();
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <button
        className="inline-block border border-gray-300 rounded-md px-4 py-2 mb-2 hover:bg-gray-100 transition"
        onClick={handleOpenModal}
      >
        Tambah Transaksi
      </button>
      <dialog id="my_modal_1" className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Tambah Transaksi!</h3>
          <form onSubmit={handleTambah}>
            <div>
              <label htmlFor="nama" className="label">
                Nama Transaksi
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                id="nama"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />
            </div>
            <div className="modal-action">
              <button className="btn" type="button" onClick={handleOpenModal}>
                Tutup
              </button>
              <button className="btn btn-primary text-white" type="submit">
                {loading ? <Loading /> : "Simpan"}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Tambah;
