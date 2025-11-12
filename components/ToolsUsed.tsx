import Image from "next/image";

export default function ToolsUsed() {
  return (
    <section
      className="max-w-[1440px] w-full mx-auto relative"
      aria-labelledby="toolsused-title"
    >
      <div
        className="absolute w-full top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 h-full inset-0 -z-10 opacity-80 scale-180"
        role="presentation"
        aria-hidden="true"
      >
        <Image src="/particles.png" alt="" fill className="object-contain" />
      </div>
      <div className="px-16 py-3 max-sm:px-8 max-sm:py-4 text-center">
        <h3
          id="toolsused-title"
          className="text-heading3 font-bold text-chart-3 mb-[10px]"
        >
          Built for Security
        </h3>
        <p className="text-[15px] max-w-[800px] w-full mx-auto max-md:text-[12px] font-medium">
          From ground up to finished product, our first step was security.
          Making StorIt secure ensures that users will never have to worry about
          their data being used by unauthorized personnel.
        </p>
      </div>
      <div className="mx-auto w-full md:w-4/5 md:rounded-2xl md:rounded-b-none p-20 max-md:p-10 border-[0.0625rem] border-t-0 border-primary/10 relative overflow-hidden bg-gradient-to-t from-chart-3/20 to-background/30">
        <div
          className="absolute w-[80%] h-[60%] top-1/2 left-[10%] rounded-full pointer-events-none blur-[60px]"
          style={{
            background: "radial-gradient(#a7a2ff 30%, rgba(147, 80, 255, 0.5))",
          }}
          role="presentation"
          aria-hidden="true"
        />
        <div className="max-w-[500px] w-full mx-auto relative z-10">
          <Image
            src="/demo.webp"
            alt="Demo of StorIt security features"
            width={500}
            height={500}
            className="w-full h-auto rounded-lg shadow-2xl shadow-background"
          />
        </div>
      </div>
    </section>
  );
}
