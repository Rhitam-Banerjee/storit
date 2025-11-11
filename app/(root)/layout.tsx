import Navbar from "@/components/Navbar";
export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Navbar />
      <section className="pt-[100px] overflow-x-hidden">{children}</section>
    </main>
  );
}
