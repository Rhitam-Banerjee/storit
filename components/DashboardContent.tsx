/* eslint-disable react-hooks/exhaustive-deps */
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
  const [pathClicked, setPathClicked] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
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
    setPathClicked(!pathClicked);
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
  const getFiles = async (fileSection: string) => {
    let url = `/api/files?userId=${userId}&fileSection=${fileSection}`;
    if (currentFolder) url += `&parentId=${currentFolder}`;

    try {
      const response = await axios.get(url);
      const sortedFiles = response.data.sort(
        (a: DashboardTableFileContents, b: DashboardTableFileContents) => {
          return Number(b.isStared) - Number(a.isStared);
        }
      );
      setFiles(sortedFiles);
    } catch (error) {
      toast.error("Error Loading Files", {
        description: "We Couldn't load your files. Please try again.",
      });
    }
  };
  const handleUpload = () => {
    getFiles("all");
  };
  useEffect(() => {
    getFiles("all");
  }, [userId, currentFolder]);

  return (
    <div className="flex flex-col justify-between items-center w-full gap-[10px]">
      <DashboardHeader
        userId={userId}
        currentFolder={currentFolder}
        handleUpload={handleUpload}
      />

      <div className="w-full flex flex-row items-center text-small-text">
        <span className="font-bold mr-[20px]">Path :</span>
        <div className="flex-1 flex flex-row items-center justify-start gap-[10px] p-2 rounded-md shadow-xs shadow-primary/10 overflow-x-auto">
          {folderPath.map((path, index) => {
            return (
              <div
                key={index}
                className="flex flex-row items-center justify-start"
              >
                <Button
                  className="mr-[10px] font-bold !text-small-text text-primary-foreground"
                  onClick={() => navigateToPathFolder(index)}
                >
                  {path.name}
                </Button>
                <span className="font-semibold text-heading4">/</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="ml-auto w-max flex flex-row items-center justify-start gap-[20px]">
        {["all", "trash", "star"].map((item, index) => (
          <span
            key={index}
            onClick={() => {
              setActiveTab((prev) => (prev = item));
              getFiles(item);
            }}
            className={`${
              activeTab === item ? "underline" : "hover:underline"
            } capitalize p-1 font-bold cursor-pointer`}
          >
            {item}
          </span>
        ))}
      </div>
      <DashboardMain
        files={files}
        pathClicked={pathClicked}
        handleFolderClick={handleFolderChange}
      />
    </div>
  );
}
