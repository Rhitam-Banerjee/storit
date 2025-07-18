import Image from "next/image";
import { PiCloudArrowUpDuotone } from "react-icons/pi";
import Link from "next/link";
import { SignUpForm } from "@/components/signup-form";
import { ThemeToggle } from "@/components/ThemeToggle";

export const metadata = {
  title: "Sign-Up | StorIt",
};
export default function SignUpPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="bg-muted relative hidden lg:block">
        <Image
          width={600}
          height={600}
          src="/cloudServer.png"
          alt="Image"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-max h-max object-contain"
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-between">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <PiCloudArrowUpDuotone className="size-4" />
            </div>
            StorIt
          </Link>
          <ThemeToggle />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignUpForm />
          </div>
        </div>
      </div>
    </div>
    // <SignUpForm />
  );
}
