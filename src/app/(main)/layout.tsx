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
      <main className="m-auto max-w-[1332px] min-h-[87.2vh]  h-full ">
        {children}
      </main>
      <Footer />
    </>
  );
}
