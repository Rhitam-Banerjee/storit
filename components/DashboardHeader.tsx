/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useUser } from "@clerk/nextjs";
import FileUpload from "./FileUpload";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Input } from "./ui/input";
export default function DashboardHeader() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [newFolderName, setNewFolderName] = useState<string>("");
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
  const handleCreateFolder = () => {};
  return (
    <section className="w-full flex flex-col justify-center items-start p-4 rounded-md">
      <h1 className="w-full text-heading4 text-chart-3 font-bold capitalize">
        Hello! {loggedUser?.username}
      </h1>
      <span className="text-small-text">
        Upload your files, folders and assets with ease
      </span>
      <FileUpload />
      <Dialog onOpenChange={() => setNewFolderName("")}>
        <DialogTrigger className="w-full -9 px-4 py-2 mt-[10px] max-w-[300px] mx-auto bg-primary hover:bg-primary/50 rounded-md text-sm text-secondary font-medium transition-all">
          Create New Folder
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-left text-small-text">
              Creating a New Folder
            </DialogTitle>
            <DialogDescription className="flex flex-row items-center gap-[10px]">
              <Input
                className="bg-secondary"
                value={newFolderName}
                onChange={({ target: { value } }) => setNewFolderName(value)}
              />
              <Button type="submit" onClick={handleCreateFolder}>
                Confirm
              </Button>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
