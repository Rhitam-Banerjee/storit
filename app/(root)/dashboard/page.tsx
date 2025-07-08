export default function Dashboard() {
  return (
    <section className="mt-[50px] flex flex-row max-md:flex-col justify-between items-center w-full gap-[30px]">
      <div className="w-1/2 flex max-md:hidden bg-red-500">Sidebar Vertical</div>
      <div className="w-full hidden max-md:flex bg-red-500">Sidebar Horizontal</div>
      <div className="w-1/2 max-md:w-full bg-blue-500">MainContent</div>
    </section>
  )
}