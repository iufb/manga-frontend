export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="center  flex-col mt-10 gap-2">{children}</main>
    </>
  );
}
