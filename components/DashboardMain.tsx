/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import FileTableView from "@/components/FileTableView";
import type { DashboardTableFileContents } from "@/exportTypes";
import { useEffect, useState } from "react";
interface FileUploadChanges {
  files: DashboardTableFileContents[];
  handleFolderClick?: (
    folderId: string | null,
    folderName: string | null
  ) => void;
}
export default function DashboardMain({
  files,
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
  }, []);
  useEffect(() => {
    handleClickedFiles(selectCount);
  }, [selectCount, files]);
  return (
    <div className="w-full flex flex-col justify-center items-start rounded-md ">
      {selectCount > 0 && (
        <div className="flex flex-row items-center justify-start gap-[10px]">
          <span>{selectCount} Selected</span>
          <span onClick={() => setRemoveClickedFiles(!removedClickedFiles)}>
            Remove
          </span>
        </div>
      )}
      <FileTableView
        files={files}
        removedClickedFiles={removedClickedFiles}
        handleClickedFiles={handleClickedFiles}
        handleFolderClick={handleFolderClick}
      />
    </div>
  );
}
