import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const formData = await request.formData();

  const penjualan = await prisma.penjualanTb.create({
    data: {
      nama: String(formData.get("namaBarang")),
      tanggal: String(formData.get("tanggal")),
      pendapatan: Number(formData.get("pendapatan")),
      modal: Number(formData.get("modal")),
      namaPelanggan: String(formData.get("namaPelanggan")),
      status: String(formData.get("status")),
      kategori: String(formData.get("kategori")),
      transaksiId: Number(formData.get("transaksiId")),
    },
  });

  if (formData.get("status") === "Belum Lunas") {
    await prisma.hutangTb.create({
      data: {
        nama: String(formData.get("namaPelanggan")),
        hutang: Number(formData.get("pendapatan")),
        tanggal: String(formData.get("tanggal")),
        penjualanId: penjualan.id,
      },
    });
  }

  return NextResponse.json({ pesan: "berhasil" });
}
