import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const data = await prisma.penjualanTb.findMany({
    orderBy: {
      id: "asc",
    },
  });

  // Nonaktifkan caching untuk memastikan data selalu fresh
  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
