import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const data = await prisma.transaksiTb.findMany({
    orderBy: {
      id: "desc",
    },
  });

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const formData = await request.formData();
  await prisma.transaksiTb.create({
    data: {
      nama: String(formData.get("nama")),
    },
  });
  return NextResponse.json({ pesan: "berhasil" });
}
