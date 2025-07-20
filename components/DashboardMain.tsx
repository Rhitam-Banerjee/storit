/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import FileTableView from "@/components/FileTableView";
import type { DashboardTableFileContents } from "@/exportTypes";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { TiStar } from "react-icons/ti";
import { TbTrashX } from "react-icons/tb";
interface FileUploadChanges {
  userId: string;
  files: DashboardTableFileContents[];
  pathClicked: boolean;
  reloadFiles: () => void;
  handleFolderClick?: (
    folderId: string | null,
    folderName: string | null
  ) => void;
}
export default function DashboardMain({
  userId,
  files,
  pathClicked,
  reloadFiles,
  handleFolderClick,
}: FileUploadChanges) {
  const [selectCount, setSelectCount] = useState(0);
  const [removedClickedFiles, setRemoveClickedFiles] = useState(false);
  const handleClickedFiles = (selectCount: number) => {
    setSelectCount((prev) => (prev = selectCount));
  };
  useEffect(() => {
    setSelectCount(0);
    setRemoveClickedFiles(!removedClickedFiles);
  }, [pathClicked]);
  useEffect(() => {
    handleClickedFiles(selectCount);
  }, [selectCount, files]);
  return (
    <div className="w-full flex flex-col justify-center items-start rounded-md ">
      {selectCount > 0 ? (
        <div className="w-full p-4 flex flex-row items-center justify-between gap-[40px] bg-secondary/50 rounded-t-md">
          <div
            className="flex-1 flex flex-row items-center justify-start gap-[5px] text-small-text font-bold cursor-pointer"
            onClick={() => setRemoveClickedFiles(!removedClickedFiles)}
          >
            <IoClose className="size-5" />
            <span>{selectCount} Selected</span>
          </div>
          <div className="flex flex-row items-center justify-start gap-[5px] text-small-text font-bold cursor-pointer">
            <TbTrashX className="size-5" />
            <span>Trash</span>
          </div>
        </div>
      ) : (
        <div className="w-full h-[54.5px]"></div>
      )}
      <FileTableView
        userId={userId}
        files={files}
        reloadFiles={reloadFiles}
        removedClickedFiles={removedClickedFiles}
        handleClickedFiles={handleClickedFiles}
        handleFolderClick={handleFolderClick}
      />
    </div>
  );
}
