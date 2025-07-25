/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardMain from "@/components/DashboardMain";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import type { DashboardTableFileContents } from "@/exportTypes";
import { Button } from "@/components/ui/button";
import { DashboardTabs, FileTypes } from "@/constants/dashboardTabs";
import { Input } from "./ui/input";
import { IoCloseCircle, IoSearchOutline } from "react-icons/io5";
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
  const [searchClicked, setSearchClicked] = useState(false);
  const [activeTab, setActiveTab] = useState(page);
  const [activeFileType, setActiveFileType] = useState("all");
  const [folderPath, setFolderPath] = useState<FolderPathContent[]>([
    { id: null, name: "Home" },
  ]);
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);
  const [files, setFiles] = useState<DashboardTableFileContents[]>([]);
  const [searchName, setSearchName] = useState<string>("");
  const [searchCurrent, setSearchCurrent] = useState(true);

  const handleFolderChange = useCallback(
    (folderId: string | null, folderName: string | null) => {
      setCurrentFolder(folderId);
      setFolderPath((prev) => [...prev, { id: folderId, name: folderName }]);
    },
    []
  );
  const navigateToPathFolder = (index: number) => {
    setPathClicked((prev) => !pathClicked);
    if (index < 0) {
      setCurrentFolder((prev) => null);
      setFolderPath((prev) => [{ id: null, name: "Home" }]);
    } else {
      const newPath = folderPath.slice(0, index + 1);
      setFolderPath((prev) => newPath);
      const newFolderId = newPath[newPath.length - 1].id;
      setCurrentFolder((prev) => newFolderId);
    }
    getFiles("all", "all");
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
  const search = async () => {
    let url = `/api/search?userId=${userId}&fileName=${searchName}&page=${page}&searchCurrent=${searchCurrent}`;
    if (currentFolder) url += `&parentId=${currentFolder}`;
    const response = await axios
      .get(url)
      .then((res) => res.data)
      .catch((err) =>
        toast.error("Error searching name", { description: err })
      );
    if (response && response.status) {
      setFiles(response.userFiles);
      setSearchName("");
      setSearchClicked(false);
      setFolderPath([{ id: null, name: "Home" }]);
      if (!searchCurrent) {
      }
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
        <div className="w-full flex flex-row justify-between items-center gap-[20px]">
          <h1 className="text-heading3 font-bold">Viewing Trash</h1>
          <Button variant="secondary" className="max-sm:scale-75">
            Empty trash
          </Button>
        </div>
      )}
      <div className="w-full flex flex-col justify-center items-start gap-[20px]">
        <div className="w-full flex-1 flex flex-wrap flex-row items-center text-small-text">
          <span className="font-bold mr-[20px]">Path :</span>
          <div className="w-max flex flex-row items-center justify-start p-2 rounded-md shadow-xs shadow-primary/10 overflow-x-auto">
            {(folderPath.length <= 3
              ? folderPath
              : [
                  folderPath[0],
                  { id: -1, name: "..." },
                  ...folderPath.slice(-2),
                ]
            ).map((path, index, arr) => {
              const realIndex = folderPath.findIndex(
                (p) => p.name === path.name && p.id === path.id
              );
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
                    className={`font-semibold text-small-text ${
                      path.name !== "..."
                        ? "cursor-pointer hover:underline"
                        : ""
                    }`}
                    onClick={() => {
                      if (path.name !== "...") {
                        navigateToPathFolder(realIndex);
                      }
                    }}
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
        <div className="w-max ml-auto flex flex-row items-center justify-start max-xs:flex-col max-xs:items-start max-xs:justify-center gap-[10px]">
          {searchClicked ? (
            <>
              <div className="flex flex-row items-center justify-start gap-[5px]">
                <Input
                  className="bg-secondary text-[12px]"
                  placeholder="Search files or folder"
                  value={searchName}
                  onChange={({ target: { value } }) => setSearchName(value)}
                />
                <div className="xs:hidden flex flex-row items-center justify-start">
                  <Button
                    variant="secondary"
                    onClick={() => search()}
                    className=" text-[12px]"
                  >
                    Search
                  </Button>
                  <Button
                    variant="ghost"
                    className="cursor-pointer"
                    onClick={() => setSearchClicked(false)}
                  >
                    <IoCloseCircle />
                  </Button>
                </div>
              </div>
              <Button
                variant="outline"
                className="text-[12px]"
                onClick={() => setSearchCurrent(!searchCurrent)}
              >
                {searchCurrent ? "This folder" : "All Folder"}
              </Button>
              <div className="max-xs:hidden flex flex-row items-center justify-start">
                <Button
                  variant="secondary"
                  onClick={() => search()}
                  className=" text-[12px]"
                >
                  Search
                </Button>
                <Button
                  variant="ghost"
                  className="cursor-pointer"
                  onClick={() => setSearchClicked(false)}
                >
                  <IoCloseCircle />
                </Button>
              </div>
            </>
          ) : (
            <>
              <Button
                variant="secondary"
                className="cursor-pointer"
                onClick={() => setSearchClicked(true)}
              >
                <IoSearchOutline />
              </Button>
            </>
          )}
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
      {files.length > 0 ? (
        <DashboardMain
          userId={userId}
          files={files}
          pathClicked={pathClicked}
          reloadFiles={reloadFiles}
          handleFolderClick={handleFolderChange}
        />
      ) : (
        <h1 className="bg-secondary/50 w-full text-center p-2 rounded-md text-small-text">
          Nothing Stored here
        </h1>
      )}
    </div>
  );
}
