import { UserHeader } from "@/components/UserHeader/UserHeader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UserHeader />
      <main className="center max-w-[1332px]">{children}</main>
    </>
  );
}
