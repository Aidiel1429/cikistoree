"use client";
import Loading from "@/app/components/loading";
import axios from "axios";
import React, { useState } from "react";
import { LuTrash } from "react-icons/lu";

interface HapusProps {
  setAlertSukses: (value: boolean) => void;
  setAlertGagal: (value: boolean) => void;
  setPesan: (pesan: string) => void;
  reload: () => void;
  id: number;
}

const Hapus = ({
  setAlertSukses,
  setAlertGagal,
  setPesan,
  reload,
  id,
}: HapusProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleHapus = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.delete(`/api/penjualan/${id}`);
      if (res.data.pesan === "berhasil") {
        setAlertSukses(true);
        setAlertGagal(false);
        setPesan("Berhasil menghapus penjualan");
        setIsOpen(false);
        reload();
      } else {
        setAlertSukses(false);
        setAlertGagal(true);
        setPesan("Gagal menghapus penjualan");
        setIsOpen(false);
      }
    } catch (error) {
      setAlertSukses(false);
      setAlertGagal(true);
      setPesan("Gagal terhubung ke server, pastikan terhubung ke internet!");
      setIsOpen(false);
    }
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <button
        className="text-lg font-semibold text-red-500"
        onClick={toggleModal}
      >
        <LuTrash />
      </button>
      <dialog id="my_modal_1" className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hapus Penjualan!</h3>
          <p className="py-4">
            Apakah anda yakin ingin menghapus penjualan ini?
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn" onClick={toggleModal}>
                Tutup
              </button>
              <button
                className="btn btn-error text-white"
                onClick={handleHapus}
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

export default Hapus;
