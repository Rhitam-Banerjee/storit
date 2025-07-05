import Navbar from "@/components/Navbar";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="max-w-[1440px] m-auto px-16 py-3 max-sm:px-8 max-sm:py-4">
      <Navbar />
      <section className="">
        {children}
      </section>
    </main>
  );
}
