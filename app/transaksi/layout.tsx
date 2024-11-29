import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cikistore | Transaksi",
  description: "Halaman Transaksi Cikistore untuk mengelola data transaksi.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
