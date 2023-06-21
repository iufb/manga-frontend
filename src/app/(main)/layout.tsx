import { Footer } from "@/components/Footer/Footer";
import { Navbar } from "@/components/Navbar/Navbar";
import { Alert } from "@/components/alert/Alert";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <Alert />
      <main className="h-full ">{children}</main>
      <Footer />
    </>
  );
}
