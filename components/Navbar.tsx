/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
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
} from "@/components/ui/dropdown-menu";

// hooks
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useClerk } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

const maxEmailLength = 30;

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { signOut } = useClerk();
  const { isSignedIn, user, isLoaded } = useUser();
  const loggedUser = user
    ? {
        id: user.id,
        username: user.username,
        imageurl: user.imageUrl,
        emailAddress: user.emailAddresses?.[0].emailAddress,
      }
    : null;

  return (
    <header className="px-16 py-3 max-sm:px-8 max-sm:py-4 w-full max-w-[1440px] mx-auto h-max z-50">
      <nav className="flex flex-row items-center justify-between">
        <Link
          href={"/"}
          className="flex flex-row justify-start items-center gap-[10px]"
        >
          <PiCloudArrowUpDuotone className="text-2xl" />
          <span className="text-2xl font-semibold">StorIt</span>
        </Link>
        <div className="flex flex-row justify-end items-center gap-[10px]">
          <div className="flex max-xs:hidden flex-row justify-end items-center gap-[10px]">
            {!isSignedIn ? (
              <>
                <Link href={"/sign-up"}>
                  <Button variant="outline">Sign Up</Button>
                </Link>
                <Link href={"/sign-in"}>
                  <Button variant="secondary">Login In</Button>
                </Link>
              </>
            ) : (
              <>
                {pathname !== "/dashboard" && (
                  <Link href={"/dashboard"}>
                    <Button variant="ghost">Dashboard</Button>
                  </Link>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex flex-row justify-start items-center gap-[10px] p-[3px] border text-sm font-medium rounded-md shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50">
                    <Image
                      src={loggedUser?.imageurl || ""}
                      alt="Profile Photo"
                      width={100}
                      height={100}
                      className="rounded-full shadow-sm w-[30px] h-[30px]"
                    />
                    <div className="flex max-sm:hidden">
                      {`${loggedUser?.emailAddress.slice(0, maxEmailLength)}` +
                        `${
                          loggedUser?.emailAddress.slice(0, maxEmailLength) ===
                          loggedUser?.emailAddress
                            ? ""
                            : "..."
                        }`}
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel className="max-sm:flex hidden">
                      <div>
                        Email:{" "}
                        {`${loggedUser?.emailAddress.slice(
                          0,
                          maxEmailLength
                        )}` +
                          `${
                            loggedUser?.emailAddress.slice(
                              0,
                              maxEmailLength
                            ) === loggedUser?.emailAddress
                              ? ""
                              : "..."
                          }`}
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuItem
                      onClick={() => {
                        signOut(() => {
                          console.log("Logout");

                          router.push("/");
                        });
                      }}
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>
          <div className="max-xs:flex flex-row items-center hidden">
            <DropdownMenu>
              <DropdownMenuTrigger className="border text-sm font-medium rounded-md shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50">
                {isSignedIn ? (
                  <div className="rounded-full bg-secondary p-[3px] w-[30px] h-[30px] grid place-items-center shadow-sm border font-black uppercase text-[10px]">
                    {loggedUser?.username?.slice(0, 2)}
                  </div>
                ) : (
                  <PiHamburgerDuotone className="w-[36px] h-[36px] p-[10px]" />
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {isSignedIn ? (
                  <>
                    <DropdownMenuItem>
                      <div className="">
                        Email:{" "}
                        {`${loggedUser?.emailAddress.slice(
                          0,
                          maxEmailLength
                        )}` +
                          `${
                            loggedUser?.emailAddress.slice(
                              0,
                              maxEmailLength
                            ) === loggedUser?.emailAddress
                              ? ""
                              : "..."
                          }`}
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {pathname !== "/dashboard" && (
                      <DropdownMenuItem>
                        <Link className="w-full" href="/dashboard">
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem
                      onClick={() => {
                        signOut(() => {
                          console.log("Logout");

                          router.push("/");
                        });
                      }}
                    >
                      Logout
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem>
                      <Link className="w-full" href="/sign-in">
                        Sign-In
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link className="w-full" href="/sign-in">
                        Sign-Up
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
