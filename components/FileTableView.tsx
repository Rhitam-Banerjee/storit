/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import type { DashboardTableFileContents } from "@/exportTypes";
import { useEffect, useState } from "react";

import { SlOptionsVertical } from "react-icons/sl";
import { PiFolderSimpleFill } from "react-icons/pi";
import { TiStar } from "react-icons/ti";
import { TbStarOff } from "react-icons/tb";
import { TbTrashX } from "react-icons/tb";
import { CiEdit } from "react-icons/ci";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";

interface ComponentProps {
  userId: string;
  files: DashboardTableFileContents[];
  removedClickedFiles: boolean;
  reloadFiles: () => void;
  handleFolderClick?: (
    folderId: string | null,
    folderName: string | null
  ) => void;
  handleClickedFiles?: (checkClicked: number) => void;
}
export default function TableDemo({
  userId,
  files,
  removedClickedFiles,
  reloadFiles,
  handleFolderClick,
  handleClickedFiles,
}: ComponentProps) {
  const [clickedFiles, setClickedFiles] = useState<
    DashboardTableFileContents[]
  >([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [activeFile, setActiveFile] =
    useState<DashboardTableFileContents | null>(null);
  const [renameValue, setRenameValue] = useState("");

  const openImageViewer = (file: DashboardTableFileContents) => {
    if (file.type.startsWith("image/")) {
      const optimizedUrl = `${process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}/tr:q-90,w-1600,fo-auto/${file.path}`;
      window.open(optimizedUrl, "_blank");
    }
  };
  const navigateToFolder = (folderId: string, folderName: string) => {
    if (handleFolderClick) {
      handleFolderClick(folderId, folderName);
    }
  };
  const handleItemClick = (file: DashboardTableFileContents) => {
    if (file.type.startsWith("image/")) {
      openImageViewer(file);
    } else {
      navigateToFolder(file.id, file.name);
    }
    setClickedFiles([]);
    if (handleClickedFiles) {
      handleClickedFiles(0);
    }
  };
  const handleTrash = async (file: DashboardTableFileContents) => {
    console.log("Star\n", file);
  };
  const handleStar = async (file: DashboardTableFileContents) => {
    const url = `/api/files/${file.id}/star`;
    const response = await axios
      .post(url)
      .then((res) => res.data)
      .catch((err) =>
        toast.error("Unable to change the name", { description: err })
      );
    if (response && response.success && reloadFiles) {
      reloadFiles();
    }
  };
  const handleRename = async () => {
    const url = `/api/files/${activeFile?.id}/rename?userId=${userId}&renameValue=${renameValue}`;
    const response = await axios
      .post(url)
      .then((res) => res.data)
      .catch((err) =>
        toast.error("Unable to change the name", { description: err })
      );
    if (response && response.success && reloadFiles) {
      reloadFiles();
      setOpenDialog(false);
      setRenameValue("");
      setActiveFile(null);
    }
  };
  const getDateTime = (typeOutput = "date", value: string) => {
    const currentDate = new Date(value);
    if (typeOutput === "date") {
      return currentDate.toLocaleDateString("en-US", {
        timeZone: "Asia/Kolkata",
      });
    } else if (typeOutput === "time") {
      return currentDate.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
      });
    }
    return "";
  };
  const getTotalsize = (sizeType = "total", defaultSize = 0) => {
    const sizeArr = ["B", "KB", "MB"];
    let totalSize = defaultSize;
    let index = 0;
    if (sizeType === "total") {
      totalSize = files.reduce((totalSize, file) => {
        return totalSize + file.size;
      }, 0);
    }
    do {
      if (totalSize === 0) break;
      totalSize /= 1024;
      index++;
    } while (totalSize > 1024);
    return `${totalSize > 0 ? totalSize.toFixed(2) : totalSize} ${
      sizeArr[index]
    }`;
  };
  const checkClickedFiles = () => {
    if (handleClickedFiles) {
      handleClickedFiles(clickedFiles.length);
    }
  };
  useEffect(() => {
    setClickedFiles([]);
  }, [removedClickedFiles]);
  useEffect(() => {
    checkClickedFiles();
  }, [clickedFiles]);
  return (
    <>
      <Table>
        <TableCaption>A list of your recent uploads.</TableCaption>
        <TableHeader>
          <TableRow className="bg-chart-3">
            <TableHead>Thumbnail</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Size</TableHead>
            <TableHead className="text-right">Upload Date</TableHead>
            <TableHead className="text-right">Upload Time</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files.map((file, index) => (
            <TableRow
              key={index}
              className={`cursor-pointer hover:bg-secondary text-small-text text-left ${
                clickedFiles.indexOf(file) !== -1 ? "bg-secondary" : ""
              }`}
              onDoubleClick={() => handleItemClick(file)}
            >
              <TableCell
                className={`${
                  file.type === "folder" ? "h-[93px]" : ""
                } font-medium`}
                onClick={() => {
                  if (clickedFiles.includes(file))
                    setClickedFiles(
                      clickedFiles.filter(
                        (clickedFile) => clickedFile.id !== file.id
                      )
                    );
                  else setClickedFiles([...clickedFiles, file]);
                  checkClickedFiles();
                }}
              >
                {file.type === "folder" ? (
                  <PiFolderSimpleFill className="w-[60px] h-[60px]" />
                ) : (
                  <Image
                    src={file.thumbnailUrl}
                    alt={file.name}
                    width={100}
                    height={100}
                  />
                )}
              </TableCell>
              <TableCell
                className={`font-bold ${file.isStared ? "text-chart-3" : ""}`}
              >
                {file.name}
              </TableCell>
              <TableCell className="font-medium">{file.type}</TableCell>
              <TableCell className="font-medium">
                {!file.isFolder && getTotalsize("single", file.size)}
              </TableCell>
              <TableCell className="text-right">
                {getDateTime("date", file.createdAt)}
              </TableCell>
              <TableCell className="text-right">
                {getDateTime("time", file.createdAt)}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger className="p-2 hover:shadow-sm shadow-primary/30 rounded-md">
                    <SlOptionsVertical />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => {
                        setActiveFile(file);
                        setRenameValue(file.name);
                        setOpenDialog(true);
                      }}
                    >
                      <CiEdit className="size-5" />
                      Rename
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => handleStar(file)}>
                      {file.isStared ? (
                        <>
                          <TbStarOff className="size-5" />
                          <span>Un-Star</span>
                        </>
                      ) : (
                        <>
                          <TiStar className="size-5" />
                          <span>Star</span>
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleTrash(file)}>
                      <TbTrashX className="size-5" />
                      Trash
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter className="h-[60px] bg-secondary">
          <TableRow className="font-bold">
            <TableCell colSpan={6}>Total Size of this folder</TableCell>
            <TableCell className="text-right">{getTotalsize()}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <Dialog
        open={openDialog}
        onOpenChange={() => {
          setOpenDialog(true);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename {activeFile?.type}</DialogTitle>
          </DialogHeader>
          <Input
            value={renameValue}
            onChange={({ target: { value } }) => setRenameValue(value)}
            placeholder="Enter new name"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => handleRename()}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
