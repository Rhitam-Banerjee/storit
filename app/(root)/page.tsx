import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="pt-[100px] relative flex flex-row max-lg:flex-col justify-center items-center -z-10">
      <div className="flex flex-col justify-center lg:items-start items-center lg:text-start text-center">
        <h3 className="text-heading3">Store &amp; Share</h3>
        <h1 className="text-heading1">Amaizingly Simple</h1>
        <p className="mt-[10px]">We have designed StorIt to be easy to use, quick to access &amp;<br />  better authentication.</p>
        <Link href="/sign-up" ><Button className="mt-[30px] text-[20px] max-sm:text-[15px] font-semibold px-8 py-6 max-sm:px-4 max-sm:py-3" type="button" variant="default">Try Demo</Button></Link>
      </div>
      <div className="max-lg:mt-[50px] rotate-y-180">
        <Image
          className="w-full max-w-[600px] max-lg:max-w-[300px]"
          src="/cloudServer.png"
          alt="StorIt logo"
          width={1230}
          height={1230}
          priority
        />
      </div>
    </main>
  );
}
