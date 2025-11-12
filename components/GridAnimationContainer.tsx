import GridAnimation from "./GridAnimation";

export default function GridAnimationContainer() {
  return (
    <section
      aria-labelledby="modular-solutions-title"
      className="mt-[50px] lg:mt-[100px] max-w-[1440px] w-full mx-auto flex flex-row items-center justify-between max-lg:flex-col-reverse"
    >
      <GridAnimation />
      <div className="max-w-[400px] w-full max-lg:text-center">
        <h3
          id="modular-solutions-title"
          className="text-heading3 font-semibold text-chart-3 mb-[10px]"
        >
          Modular Solutions
        </h3>
        <p className="text-[15px]">
          Step into StorIt to find security, ease of access, and manage your
          files on the go in a single place. We offer all our services free of
          cost to support the community.
        </p>
      </div>
    </section>
  );
}
