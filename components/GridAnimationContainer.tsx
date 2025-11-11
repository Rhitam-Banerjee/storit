import GridAnimation from "./GridAnimation";

export default function GridAnimationContainer() {
  return (
    <div className="mt-[50px] lg:mt-[100px] max-w-[1440px] w-full mx-auto flex flex-row items-center justify-between max-lg:flex-col-reverse">
      <GridAnimation />
      <div className="max-w-[400px] w-full max-lg:text-center">
        <h1 className="text-heading3 font-semibold text-chart-3 mb-[10px]">
          Modular Solutions
        </h1>
        <p className="text-[15px]">
          Step into StorIt to find security, eacse of access and manage your
          files on the go in a single place. We offer all our services free of
          cost to suppourt the community.
        </p>
      </div>
    </div>
  );
}
