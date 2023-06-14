import { Navbar } from "@/components/Navbar/Navbar";
import "./globals.css";
import { Outfit } from "next/font/google";
import { AlertProvider } from "@/context/AlertContext";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Manga",
  description: "App for read and upload mangas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${outfit.className}`}>
        <AlertProvider>{children}</AlertProvider>
      </body>
    </html>
  );
}
