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
import { DashboardTabs, FileTypes } from "@/constants/dashboardTabs";
interface FolderPathContent {
  id: string | null;
  name: string | null;
}
interface DashboardContentProps {
  userId: string;
  page: string;
}

export default function DashboardContent({
  userId,
  page,
}: DashboardContentProps) {
  const [pathClicked, setPathClicked] = useState(false);
  const [activeTab, setActiveTab] = useState(page);
  const [activeFileType, setActiveFileType] = useState("all");
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
  const getFiles = async (fileSection: string, fileType: string) => {
    let url = `/api/files?userId=${userId}&fileSection=${fileSection}&fileType=${fileType}&page=${page}`;
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
    getFiles(activeTab, activeFileType);
  };
  const reloadFiles = () => {
    getFiles(activeTab, activeFileType);
  };
  useEffect(() => {
    if (folderPath[folderPath.length - 1].name === "Home") {
      getFiles(page, "all");
      setActiveTab(page);
    } else {
      getFiles("all", "all");
      setActiveTab("all");
    }
    setActiveFileType("all");
  }, [userId, currentFolder]);

  return (
    <div className="flex flex-col justify-between items-center w-full gap-[15px]">
      {page === "all" && (
        <DashboardHeader
          userId={userId}
          currentFolder={currentFolder}
          handleUpload={handleUpload}
        />
      )}
      {page === "star" && (
        <h1 className="text-heading3 font-bold">Viewing Starred</h1>
      )}
      {page === "trash" && (
        <h1 className="text-heading3 font-bold">Viewing Trash</h1>
      )}

      <div className="w-full flex flex-row items-center text-small-text">
        <span className="font-bold mr-[20px]">Path :</span>
        <div className="w-max flex flex-row items-center justify-start p-2 rounded-md shadow-xs shadow-primary/10 overflow-x-auto">
          {folderPath.map((path, index) => {
            return (
              <div
                key={index}
                className="flex flex-row items-center justify-start"
              >
                {index > 0 && (
                  <span className="mx-[10px] font-semibold text-small-text">
                    &gt;
                  </span>
                )}
                <span
                  className="font-semibold text-small-text cursor-pointer hover:underline"
                  onClick={() => navigateToPathFolder(index)}
                >
                  {path.name === "Home" && page !== "all"
                    ? page === "star"
                      ? "Star"
                      : "Trash"
                    : path.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-[20px] w-full flex flex-row items-center justify-between max-sm:flex-col max-md:justify-center max-md:items-start gap-[20px]">
        {(page === "all" ||
          (page !== "all" &&
            folderPath[folderPath.length - 1].name !== "Home")) && (
          <div className="mr-auto max-md:ml-0 w-max flex flex-row items-center justify-start gap-[10px] bg-secondary py-1 px-3 rounded-md">
            <span className="font-bold text-[12px]">Tabs :</span>
            {DashboardTabs.map((item, index) => (
              <span
                key={index}
                onClick={() => {
                  setActiveTab((prev) => (prev = item.name));
                  getFiles(item.name, activeFileType);
                }}
                className="h-full flex flex-row items-center justify-start gap-[5px] transition-all"
              >
                <item.icon
                  name="icon"
                  title={item.name}
                  className={`${
                    activeTab === item.name ? "size-5" : ""
                  } cursor-pointer transition-all`}
                />
                {activeTab === item.name && (
                  <span className="capitalize text-[12px] font-semibold mt-[2px]">
                    {item.name}
                  </span>
                )}
              </span>
            ))}
          </div>
        )}
        <div className="ml-auto max-md:ml-0 w-max flex flex-row items-center justify-start gap-[10px] bg-secondary py-1 px-3 rounded-md">
          <span className="font-bold text-[12px]">Type :</span>
          {FileTypes.map((item, index) => (
            <span
              key={index}
              onClick={() => {
                setActiveFileType((prev) => (prev = item.name));
                getFiles(activeTab, item.name);
              }}
              className="h-full flex flex-row items-center justify-start gap-[5px] transition-all"
            >
              <item.icon
                name="icon"
                title={item.name}
                className={`${
                  activeFileType === item.name ? "size-5" : ""
                } cursor-pointer transition-all`}
              />
              {activeFileType === item.name && (
                <span className="capitalize text-[12px] font-semibold mt-[2px]">
                  {item.name}
                </span>
              )}
            </span>
          ))}
        </div>
      </div>
      <DashboardMain
        userId={userId}
        files={files}
        pathClicked={pathClicked}
        reloadFiles={reloadFiles}
        handleFolderClick={handleFolderChange}
      />
    </div>
  );
}
