import "./globals.css";
import { Outfit } from "next/font/google";
import { AlertProvider } from "@/context/AlertContext";
import { ModalProvider } from "@/context/ModalContext";

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
        <ModalProvider>
          <AlertProvider>{children}</AlertProvider>
        </ModalProvider>
      </body>
    </html>
  );
}
