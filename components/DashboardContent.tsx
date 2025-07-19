/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardMain from "@/components/DashboardMain";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import type { DashboardTableFileContents } from "@/exportTypes";
import { Button } from "@/components/ui/button";
interface FolderPathContent {
  id: string | null;
  name: string | null;
}
interface DashboardContentProps {
  userId: string;
}

export default function DashboardContent({ userId }: DashboardContentProps) {
  const [folderPath, setFolderPath] = useState<FolderPathContent[]>([
    { id: null, name: "Home" },
  ]);
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);
  const [files, setFiles] = useState<DashboardTableFileContents[]>([]);

  const handleFolderChange = useCallback(
    (folderId: string | null, folderName: string | null) => {
      setCurrentFolder(folderId);
      setFolderPath((prev) => [...prev, { id: folderId, name: folderName }]);
    },
    []
  );
  const navigateToPathFolder = (index: number) => {
    if (index < 0) {
      setCurrentFolder(null);
      setFolderPath([{ id: null, name: "Home" }]);
    } else {
      const newPath = folderPath.slice(0, index + 1);
      setFolderPath(newPath);
      const newFolderId = newPath[newPath.length - 1].id;
      setCurrentFolder(newFolderId);
    }
  };
  const getFiles = async () => {
    let url = `/api/files?userId=${userId}`;
    if (currentFolder) url += `&parentId=${currentFolder}`;

    try {
      const response = await axios.get(url);
      setFiles(response.data);
    } catch (error) {
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
  }, [userId, currentFolder]);

  return (
    <div className="flex flex-col justify-between items-center w-full gap-[30px]">
      <DashboardHeader
        userId={userId}
        currentFolder={currentFolder}
        handleUpload={handleUpload}
      />

      <div className="w-full flex flex-row items-center">
        <span className="font-bold mr-[20px]">Path :</span>
        <div className="flex-1 flex flex-row items-center justify-start gap-[10px] p-2 rounded-md shadow-sm">
          {folderPath.map((path, index) => {
            return (
              <div key={index}>
                <Button
                  className="mr-[10px]"
                  onClick={() => navigateToPathFolder(index)}
                >
                  {path.name}
                </Button>
                <span className="font-black">/</span>
              </div>
            );
          })}
        </div>
      </div>
      <DashboardMain files={files} handleFolderClick={handleFolderChange} />
    </div>
  );
}
