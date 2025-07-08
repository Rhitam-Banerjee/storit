import SecondaryNav from "@/components/SecondaryNav";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-[1440px] m-auto px-16 py-3 max-sm:px-8 max-sm:py-4 pt-[100px] relative">
      <div className="flex flex-row max-lg:flex-col justify-center items-center">
        <div className="flex flex-col justify-center lg:items-start items-center lg:text-start text-center">
          <h3 className="text-heading3">Store &amp; Share</h3>
          <h1 className="text-heading1">Amaizingly Simple</h1>
          <p className="mt-[10px] text-heading4">We have designed StorIt to be easy to use, quick to access &amp;<br />  better authentication.</p>
          <Link href="/sign-up" ><Button className="mt-[30px] px-8 py-6 max-sm:px-4 max-sm:py-3 font-bold text-[20px] max-sm:text-[15px] text-secondary dark:text-primary bg-chart-3 hover:bg-chart-3/80 rounded-3xl" type="button" variant="default">Try Demo</Button></Link>
        </div>
        <div className="max-lg:mt-[50px]">
          <Image
            className="w-full max-w-[600px] max-lg:max-w-[300px]"
            src="/hero.png"
            alt="StorIt logo"
            width={1230}
            height={1230}
            priority
          />
        </div>
      </div>
      <div className="mt-[100px] mx-auto max-xs:px-2 max-xs:py-2 px-4 py-3 sticky top-[20px] w-full max-w-[400px] h-max bg-secondary rounded-4xl">
        <SecondaryNav />
      </div>
      <div className="w-full h-[300dvh]"></div>
    </main>
  );
}
