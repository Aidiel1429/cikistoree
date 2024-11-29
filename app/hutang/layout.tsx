import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cikistore | Hutang",
  description: "Halaman Hutang Cikistore untuk mengelola data Hutang.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
