/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
// assets
import { PiCloudArrowUpDuotone } from "react-icons/pi";

// components
import { ThemeToggle } from "./ThemeToggle";

// hooks
import { useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import Link from "next/link";
// constants
import { navLinks } from "@/constants/navLinks";

export default function Navbar() {
  const { isSignedIn, user, isLoaded } = useUser()
  return (
    <header className="w-full max-w-[1440px] h-max z-50">
      <nav className="flex flex-row items-center justify-between">
        <Link href={"/"} className="flex flex-row justify-start items-center gap-[10px]">
          <PiCloudArrowUpDuotone className="text-2xl" />
          <span className="text-2xl font-semibold">StorIt</span>
        </Link>
        <div className="flex flex-row justify-end items-center gap-[10px]">
          <div className="flex flex-row justify-end items-center gap-[10px]">
            {!isSignedIn && (
              <>
                <Link href={"/sign-in"}><Button variant="secondary">Login In</Button></Link>
                <Link href={"/sign-up"}><Button variant="outline">Sign Up</Button></Link>
              </>
            )}
          </div>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}