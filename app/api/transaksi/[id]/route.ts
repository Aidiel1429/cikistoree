import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await prisma.transaksiTb.delete({
    where: {
      id: Number(params.id),
    },
  });

  return NextResponse.json({ pesan: "berhasil" });
}
