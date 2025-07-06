/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
// assets
import { PiCloudArrowUpDuotone, PiHamburgerDuotone } from "react-icons/pi";

// components
import { ThemeToggle } from "./ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// hooks
import { useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { useClerk } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const { signOut } = useClerk()
  const { isSignedIn, user, isLoaded } = useUser()
  return (
    <header className="w-full max-w-[1440px] h-max z-50">
      <nav className="flex flex-row items-center justify-between">
        <Link href={"/"} className="flex flex-row justify-start items-center gap-[10px]">
          <PiCloudArrowUpDuotone className="text-2xl" />
          <span className="text-2xl font-semibold">StorIt</span>
        </Link>
        <div className="flex flex-row justify-end items-center gap-[10px]">
          <div className="flex max-xs:hidden flex-row justify-end items-center gap-[10px]">
            {!isSignedIn ? (
              <>
                <Link href={"/sign-up"}><Button variant="outline">Sign Up</Button></Link>
                <Link href={"/sign-in"}><Button variant="secondary">Login In</Button></Link>
              </>
            ) : (
              <>
                {pathname !== "/dashboard" && <Link href={"/dashboard"}><Button variant="ghost">Dashboard</Button></Link>}
                <Button variant="outline" onClick={() => {
                  signOut(() => {
                    console.log("Logout");

                    router.push("/");
                  });
                }}>Logout</Button>
              </>
            )}
          </div>
          <ThemeToggle />
          <div className="max-xs:block hidden">
            <DropdownMenu>
              <DropdownMenuTrigger className="border p-[10px] text-sm font-medium rounded-md shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50">
                <PiHamburgerDuotone />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {isSignedIn ?
                  <>
                    <DropdownMenuLabel>
                      <Link href={"/dashboard"}>My Account</Link>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                  </>
                  :
                  <>
                    <DropdownMenuItem>
                      <Link className="w-full" href="/sign-in">Sign-In</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link className="w-full" href="/sign-in">Sign-Up</Link>
                    </DropdownMenuItem>
                  </>
                }
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
    </header>
  )
}