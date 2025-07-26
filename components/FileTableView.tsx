/* eslint-disable @typescript-eslint/no-unused-vars */
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

import { TiStar } from "react-icons/ti";
import { TbStarOff } from "react-icons/tb";
import { TbTrashX, TbRestore } from "react-icons/tb";
import { CiEdit } from "react-icons/ci";
import { TbDownload } from "react-icons/tb";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { FileType, FileTypeIcon } from "@/constants/FileTypes";
import { usePathname, useRouter } from "next/navigation";

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
  const route = useRouter();
  const [openDialog, setOpenDialog] = useState(false);
  const [activeFile, setActiveFile] =
    useState<DashboardTableFileContents | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const pathName = usePathname();
  const openViewer = (file: DashboardTableFileContents) => {
    if (file.type.startsWith("image/")) {
      const optimizedUrl = `${process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}/tr:q-90,w-1600,fo-auto/${file.path}`;
      window.open(optimizedUrl, "_blank");
    } else {
      const viewerUrl = `/viewFile?url=${encodeURIComponent(
        file.fileUrl
      )}&type=${encodeURIComponent(file.type)}&name=${encodeURIComponent(
        file.name
      )}`;
      window.open(viewerUrl, "_blank");
    }
  };
  const navigateToFolder = (folderId: string, folderName: string) => {
    if (handleFolderClick) {
      handleFolderClick(folderId, folderName);
    }
  };
  const handleItemClick = (file: DashboardTableFileContents) => {
    if (
      file.type.startsWith("image/") ||
      file.type.startsWith("application/")
    ) {
      openViewer(file);
    } else {
      navigateToFolder(file.id, file.name);
    }
    setClickedFiles([]);
    if (handleClickedFiles) {
      handleClickedFiles(0);
    }
  };
  const handleTrash = async (file: DashboardTableFileContents) => {
    const url = `/api/files/${file.id}/trash`;
    const response = await axios
      .post(url)
      .then((res) => res.data)
      .catch((err) => toast.error("Unable to move the file to trash"));
    if (response && response.success && reloadFiles) {
      reloadFiles();
    }
  };
  const handleStar = async (file: DashboardTableFileContents) => {
    const url = `/api/files/${file.id}/star`;
    const response = await axios
      .post(url)
      .then((res) => res.data)
      .catch((err) => toast.error("Unable to star the file"));
    if (response && response.success && reloadFiles) {
      reloadFiles();
    }
  };
  const handleRename = async () => {
    const url = `/api/files/${activeFile?.id}/rename?userId=${userId}&renameValue=${renameValue}`;
    const response = await axios
      .post(url)
      .then((res) => res.data)
      .catch((err) => toast.error("Unable to change the name"));
    if (response && response.success && reloadFiles) {
      reloadFiles();
      setOpenDialog(false);
      setRenameValue("");
      setActiveFile(null);
    }
  };
  const handleDownload = async (file: DashboardTableFileContents) => {
    toast.info("Preparing Download", {
      description: `Getting "${file.name}" ready for download...`,
    });
    try {
      if (file.type.startsWith("image/")) {
        const downloadUrl = `${process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}/tr:q-100,orig-true/${file.path}`;

        const response = await fetch(downloadUrl);
        if (!response.ok) {
          throw new Error(`Failed to download image: ${response.statusText}`);
        }
        const blob = await response.blob();

        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = file.name;
        document.body.appendChild(link);

        toast.success("Download Ready", {
          description: `"${file.name}" is ready to download.`,
        });

        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
      } else if (file.type.startsWith("application/")) {
        const response = await axios
          .get(file.fileUrl, {
            responseType: "blob",
          })
          .then((res) => {
            const blobUrl = URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = file.name;
            document.body.appendChild(link);
            toast.success("Download Ready", {
              description: `"${file.name}" is ready to download.`,
            });

            link.click();

            document.body.removeChild(link);
            URL.revokeObjectURL(blobUrl);
          })
          .catch((err) => {
            throw new Error(`Failed to download file`);
          });
      }
    } catch (error) {
      toast.error("Download Failed", {
        description: "We couldn't download the file. Please try again later.",
      });
    }
  };
  const handleDeleteFile = async (file: DashboardTableFileContents) => {
    const url = `/api/files/${file.id}/delete`;
    const response = await axios
      .delete(url)
      .then((res) => res.data)
      .catch((err) => toast.error("Unable to delete"));
    if (response) {
      reloadFiles();
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
  const getFileType = (extension: string): string => {
    return (
      FileType[extension.toLowerCase() as keyof typeof FileType] || "unknown"
    );
  };
  const getFileIcon = (fileTypeExtension: string): React.ElementType => {
    const fileType: string = getFileType(fileTypeExtension);
    return (
      FileTypeIcon[fileType as keyof typeof FileTypeIcon] ??
      FileTypeIcon.unknown
    );
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
          {files.map((file, index) => {
            const Icon = getFileIcon(file.type);
            return (
              <TableRow
                key={index}
                className={`cursor-pointer hover:bg-secondary text-small-text text-left h-[93px] ${
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
                  {!file.type.startsWith("image/") ? (
                    <Icon className="w-[30px] h-[30px] mx-auto" />
                  ) : (
                    <Image
                      src={file.thumbnailUrl}
                      alt={file.name}
                      width={100}
                      height={100}
                      className="mx-auto"
                    />
                  )}
                </TableCell>
                <TableCell
                  className={`font-bold ${file.isStared ? "text-chart-3" : ""}`}
                >
                  {file.name}
                </TableCell>
                <TableCell className="font-medium">
                  {file.type.startsWith("image/")
                    ? "image"
                    : getFileType(file.type)}
                </TableCell>
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
                      {!file.isFolder && (
                        <DropdownMenuItem onClick={() => handleDownload(file)}>
                          <TbDownload className="size-5" />
                          Download
                        </DropdownMenuItem>
                      )}
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
                        {file.isTrash ? (
                          <>
                            <TbRestore className="size-5" />
                            <span>Restore</span>
                          </>
                        ) : (
                          <>
                            <TbTrashX className="size-5" />
                            <span>Trash</span>
                          </>
                        )}
                      </DropdownMenuItem>
                      {file.isTrash && pathName === "/dashboard/trash" && (
                        <DropdownMenuItem
                          onClick={() => handleDeleteFile(file)}
                        >
                          <TbTrashX className="size-5" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
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
