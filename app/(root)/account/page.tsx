/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { ProfileUpdateForm } from "@/components/profileupdate-form";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useState } from "react";

export default function DashboardAccount() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const loggedUser = user
    ? {
        id: user.id,
        username: user.username,
        imageurl: user.imageUrl,
        emailAddress: user.emailAddresses?.[0].emailAddress,
      }
    : null;
  if (!isLoaded) {
    return <h1>Loading...</h1>;
  }
  return (
    <section className="w-full h-full min-h-[calc(100dvh-61px)] max-w-[1440px] mx-auto px-16 py-3 max-sm:px-8 max-sm:py-4 grid place-items-center">
      <div className="bg-secondary w-full h-full max-w-[600px] max-h-[600px] p-10 pl-5 rounded-md shadow-md gap-[20px]">
        <div className="w-full">
          <div className="w-max ml-auto">
            <Button
              variant={isEdit ? "destructive" : "default"}
              onClick={() => setIsEdit(!isEdit)}
            >
              {isEdit ? "Cancle" : "Edit"}
            </Button>
          </div>
        </div>
        <div className="h-full flex flex-row justify-center items-start max-md:flex-col">
          <div className="w-full h-full flex flex-col justify-center items-center">
            <Image
              src={loggedUser?.imageurl || ""}
              alt="Profile Image"
              width={700}
              height={700}
              className="max-w-[100px] max-h-[100px] rounded-full"
            />
          </div>
          <div className="w-full h-full max-h-[400px] my-auto text-primary flex flex-col justify-center items-start">
            {isEdit ? (
              <ProfileUpdateForm />
            ) : (
              <div className="w-full flex flex-col items-start justify-center gap-[10px]">
                <div className="flex flex-col justify-center items-start w-full">
                  <span className="font-bold">Username</span>
                  <span className="px-3 py-1 rounded-md border w-full shadow-xs text-base">
                    {loggedUser?.username}
                  </span>
                </div>
                <div className="flex flex-col justify-center items-start">
                  <span className="font-bold">Email</span>
                  <span className="px-3 py-1 rounded-md border w-full shadow-xs text-base">
                    {loggedUser?.emailAddress}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
