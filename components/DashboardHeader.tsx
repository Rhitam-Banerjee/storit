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
import { Input } from "./ui/input";
import { useRef, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

interface FileUploadChanges {
  userId: string;
  currentFolder: string | null;
  handleUpload: () => void;
}
export default function DashboardHeader({
  userId,
  currentFolder,
  handleUpload,
}: FileUploadChanges) {
  const { user, isLoaded } = useUser();
  const [newFolderName, setNewFolderName] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const loggedUser = user
    ? {
        id: user.id,
        username: user.username,
        imageurl: user.imageUrl,
        emailAddress: user.emailAddresses?.[0].emailAddress,
      }
    : null;
  const handleFileUploadSuccess = () => {};
  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) {
      toast.error("Invalid Folder Name", {
        description: "Please enter a valid folder name.",
      });
      return;
    }

    try {
      await axios.post("/api/folders/create", {
        name: newFolderName.trim(),
        userId: userId,
        parentId: currentFolder,
      });

      toast.success("Folder Created", {
        description: `Folder "${newFolderName}" has been created successfully.`,
      });

      setNewFolderName("");
      setDialogOpen(false);

      if (handleUpload) {
        handleUpload();
      }
    } catch (error) {
      console.error("Error creating folder:", error);
      toast.error("Folder Creation Failed", {
        description: "We couldn't create the folder. Please try again.",
      });
    } finally {
      setNewFolderName("");
    }
  };
  if (!isLoaded) {
    return <h1>Loading...</h1>;
  }

  return (
    <section className="w-full flex flex-col justify-center items-start p-4 rounded-md">
      <h1 className="w-full text-heading4 text-chart-3 font-bold capitalize">
        Hello! {loggedUser?.username}
      </h1>
      <span className="text-small-text">
        Upload your files, folders and assets with ease
      </span>
      <FileUpload
        userId={userId}
        currentFolder={currentFolder}
        onUploadSuccess={handleFileUploadSuccess}
        handleUpload={handleUpload}
      />
      <Dialog
        open={dialogOpen}
        onOpenChange={() => {
          setDialogOpen(true);
          setNewFolderName("");
        }}
      >
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
