export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="w-full min-h-[83vh]  h-full ">{children}</main>
    </>
  );
}
