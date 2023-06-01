import { Metadata, ResolvingMetadata } from "next";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full h-screen flex justify-center items-center">
      {children}
    </main>
  );
}
