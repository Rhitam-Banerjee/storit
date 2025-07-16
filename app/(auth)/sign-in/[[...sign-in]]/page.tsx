// components
import { LoginForm } from "@/components/login-form";
import { ThemeToggle } from "@/components/ThemeToggle";
// assets
import { PiCloudArrowUpDuotone } from "react-icons/pi";

import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Sign-In | StorIt",
};
export default function LoginPage() {
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
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
