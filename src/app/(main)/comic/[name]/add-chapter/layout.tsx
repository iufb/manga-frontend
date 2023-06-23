export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="w-[1320px] overflow-hidden h-full min-h-[80vh] mx-auto center">
        {children}
      </main>
    </>
  );
}
