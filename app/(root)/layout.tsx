import Navbar from "@/components/Navbar";
export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Navbar />
      <section>
        {children}
      </section>
    </main>
  );
}
