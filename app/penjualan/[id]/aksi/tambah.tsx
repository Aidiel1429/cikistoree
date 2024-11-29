"use client";
import Loading from "@/app/components/loading";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface TambahProps {
  setAlertSukses: (value: boolean) => void;
  setAlertGagal: (value: boolean) => void;
  setPesan: (pesan: string) => void;
  reload: () => void;
  transaksiId: string;
}

const Tambah = ({
  setAlertSukses,
  setAlertGagal,
  setPesan,
  reload,
  transaksiId,
}: TambahProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [pendapatan, setPendapatan] = useState("");
  const [modal, setModal] = useState("");
  const [namaBarang, setNamaBarang] = useState("");
  const [namaPelanggan, setNamaPelanggan] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [kategori, setKategori] = useState("");
  const [status, setStatus] = useState("");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!pendapatan || isNaN(Number(pendapatan)) || Number(pendapatan) <= 0) {
      newErrors.pendapatan = "Pendapatan harus berupa angka positif.";
    }

    if (!modal || isNaN(Number(modal)) || Number(modal) <= 0) {
      newErrors.modal = "Modal harus berupa angka positif.";
    }

    if (!namaBarang.trim()) {
      newErrors.namaBarang = "Nama barang wajib diisi.";
    }

    if (!namaPelanggan.trim()) {
      newErrors.namaPelanggan = "Nama pelanggan wajib diisi.";
    }

    if (!tanggal) {
      newErrors.tanggal = "Tanggal wajib diisi.";
    }

    if (!kategori) {
      newErrors.kategori = "Kategori wajib dipilih.";
    }

    if (!status) {
      newErrors.status = "Status wajib dipilih.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // True jika tidak ada error
  };

  const handleTambah = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!validate()) {
      setPesan("Validasi gagal. Periksa kembali input Anda.");
      setAlertGagal(true);
      return;
    }

    try {
      const formData = new FormData();
      const tanggalFormatted = new Date(tanggal).toISOString();

      formData.append("pendapatan", pendapatan);
      formData.append("modal", modal);
      formData.append("namaBarang", namaBarang);
      formData.append("namaPelanggan", namaPelanggan);
      formData.append("tanggal", tanggalFormatted);
      formData.append("kategori", kategori);
      formData.append("status", status);
      formData.append("transaksiId", transaksiId);

      const res = await axios.post("/api/penjualan", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.pesan === "berhasil") {
        if (status === "Belum Lunas") {
          router.refresh();
          router.push("/hutang");
          setIsOpen(false);
        }
        setAlertSukses(true);
        setAlertGagal(false);
        setPesan("Berhasil menambah penjualan.");
        setIsOpen(false);
        reload();
        hapusForm();
      } else {
        setAlertSukses(false);
        setAlertGagal(true);
        setIsOpen(false);
        setPesan("Gagal menambah penjualan.");
      }
    } catch (error) {
      setAlertSukses(false);
      setAlertGagal(true);
      setIsOpen(false);
      setPesan("Gagal terhubung ke server, pastikan terhubung ke internet.");
    } finally {
      setLoading(false);
    }
  };

  const hapusForm = () => {
    setPendapatan("");
    setModal("");
    setNamaBarang("");
    setNamaPelanggan("");
    setTanggal("");
    setKategori("");
    setStatus("");
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        className="inline-block border border-gray-300 rounded-md px-4 py-2 mb-2 hover:bg-gray-100 transition"
        onClick={toggleModal}
      >
        Tambah Penjualan
      </button>
      <dialog id="my_modal_1" className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-5">Tambah Penjualan!</h3>
          <form onSubmit={handleTambah}>
            <div className="border border-slate-100 p-2 rounded-md mb-3">
              <div className="mb-2">
                <label className="label">Pendapatan</label>
                <label className="border-b border-slate-100 flex items-center gap-2 p-2 text-green-600">
                  Rp
                  <input
                    type="text"
                    inputMode="numeric"
                    value={pendapatan}
                    onChange={(e) => setPendapatan(e.target.value)}
                    className="grow border-none outline-none"
                  />
                </label>
                {errors.pendapatan && (
                  <p className="text-red-500 text-sm">{errors.pendapatan}</p>
                )}
              </div>
              <div className="mb-2">
                <label className="label">Modal</label>
                <label className="border-b border-slate-100 flex items-center gap-2 p-2 text-red-500">
                  Rp
                  <input
                    type="text"
                    inputMode="numeric"
                    value={modal}
                    onChange={(e) => setModal(e.target.value)}
                    className="grow border-none outline-none"
                  />
                </label>
                {errors.modal && (
                  <p className="text-red-500 text-sm">{errors.modal}</p>
                )}
              </div>
            </div>
            <div className="mb-4">
              <label className="label">Nama Barang</label>
              <input
                type="text"
                className="w-full input input-bordered"
                value={namaBarang}
                onChange={(e) => setNamaBarang(e.target.value)}
              />
              {errors.namaBarang && (
                <p className="text-red-500 text-sm">{errors.namaBarang}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="label">Nama Pelanggan</label>
              <input
                type="text"
                className="w-full input input-bordered"
                value={namaPelanggan}
                onChange={(e) => setNamaPelanggan(e.target.value)}
              />
              {errors.namaPelanggan && (
                <p className="text-red-500 text-sm">{errors.namaPelanggan}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="label">Tanggal</label>
              <input
                type="date"
                className="w-full input input-bordered"
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
              />
              {errors.tanggal && (
                <p className="text-red-500 text-sm">{errors.tanggal}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="label">Kategori</label>
              <select
                className="select select-bordered w-full"
                value={kategori}
                onChange={(e) => setKategori(e.target.value)}
              >
                <option disabled selected value={""}>
                  Pilih Kategori?
                </option>
                <option value={"Pulsa"}>Pulsa</option>
                <option value={"Uang Elektronik"}>Uang Elektronik</option>
                <option value={"Voucher Game"}>Voucher Game</option>
              </select>
              {errors.kategori && (
                <p className="text-red-500 text-sm">{errors.kategori}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="label">Status</label>
              <select
                className="select select-bordered w-full"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option disabled selected value={""}>
                  Pilih Status?
                </option>
                <option value={"Lunas"}>Lunas</option>
                <option value={"Belum Lunas"}>Belum Lunas</option>
              </select>
              {errors.status && (
                <p className="text-red-500 text-sm">{errors.status}</p>
              )}
            </div>
            <div className="modal-action">
              <button className="btn" type="button" onClick={toggleModal}>
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
