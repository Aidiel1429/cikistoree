import { PrismaClient } from "@prisma/client";
import DashboardClient from "@/app/components/dashboard";

const prisma = new PrismaClient();

async function getData() {
  const data = await prisma.penjualanTb.findMany({
    orderBy: {
      id: "asc",
    },
  });

  const totalPenjualan = data.length;
  const totalPendapatan = data.reduce((sum, item) => sum + item.pendapatan, 0);
  const totalModal = data.reduce((sum, item) => sum + item.modal, 0);
  const totalUntung = totalPendapatan - totalModal;

  return {
    totalPenjualan,
    totalPendapatan,
    totalModal,
    totalUntung,
  };
}

export default async function DashboardPage() {
  const stats = await getData();

  return <DashboardClient initialStats={stats} />;
}
