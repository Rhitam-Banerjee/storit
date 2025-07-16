"use client";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardMain from "@/components/DashboardMain";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import type { DashboardTableFileContents } from "@/exportTypes";

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);
  const [files, setFiles] = useState<DashboardTableFileContents[]>([]);

  const handleFolderChange = useCallback((folderId: string | null) => {
    setCurrentFolder(folderId);
  }, []);
  const getFiles = async () => {
    let url = `/api/files?userId=${user?.id}`;
    if (currentFolder) url += `&parentId=${currentFolder}`;
    try {
      const response = await axios.get(url);
      setFiles(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Error Loading Files", {
        description: "We Couldn't load your files. Please try again.",
      });
    }
  };
  const handleUpload = () => {
    getFiles();
  };
  useEffect(() => {
    getFiles();
  }, []);

  if (!isLoaded) return <h1>Loading...</h1>;

  return (
    <div className="flex flex-col justify-between items-center w-full gap-[30px]">
      <DashboardHeader
        userId={user?.id ?? ""}
        currentFolder={currentFolder}
        handleUpload={handleUpload}
      />
      <DashboardMain
        files={files}
        currentFolder={currentFolder}
        handleFolderChange={handleFolderChange}
      />
    </div>
  );
}
