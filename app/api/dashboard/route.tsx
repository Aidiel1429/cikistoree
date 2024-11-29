import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const data = await prisma.penjualanTb.findMany({
    orderBy: {
      id: "asc",
    },
  });

  return NextResponse.json(data);
}
