import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";

const inter = Poppins({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CikiStore",
  description: "Aplikasi CikiStore",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen bg-gray-100">
          <div className="hidden lg:block">
            <Sidebar />
          </div>
          <div className="flex-1 flex flex-col overflow-hidden">
            <Navbar />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
