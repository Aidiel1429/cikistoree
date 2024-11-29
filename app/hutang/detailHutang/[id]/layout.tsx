import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Cikistore | Detail Hutang",
  description: "Halaman Detail Hutang Cikistore untuk mengelola data Hutang.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
