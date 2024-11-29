import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const data = await prisma.penjualanTb.findMany({
    where: {
      transaksiId: Number(params.id),
    },
    include: {
      TransaksiTb: true,
    },
  });

  return NextResponse.json(data);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await prisma.penjualanTb.delete({
    where: {
      id: Number(params.id),
    },
  });

  await prisma.hutangTb.deleteMany({
    where: {
      penjualanId: Number(params.id),
    },
  });

  return NextResponse.json({ pesan: "berhasil" });
}
