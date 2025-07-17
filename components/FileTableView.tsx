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
import Image from "next/image";
import type { DashboardTableFileContents } from "@/exportTypes";
import { PiFolderSimpleFill } from "react-icons/pi";
interface ComponentProps {
  files: DashboardTableFileContents[];
  handleFolderClick?: (
    folderId: string | null,
    folderName: string | null
  ) => void;
}
export default function TableDemo({
  files,
  handleFolderClick,
}: ComponentProps) {
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
  return (
    <Table>
      <TableCaption>A list of your recent uploads.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Thumbnail</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Size</TableHead>
          <TableHead className="text-right">Upload Date</TableHead>
          <TableHead className="text-right">Upload Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {files.map((file, index) => (
          <TableRow
            key={index}
            onClick={() => handleItemClick(file)}
            className=" text-left"
          >
            <TableCell
              className={`${
                file.type === "folder" ? "h-[93px]" : ""
              } font-medium`}
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
            <TableCell className="font-medium">{file.name}</TableCell>
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
          </TableRow>
        ))}
      </TableBody>
      <TableFooter className="w-full">
        <TableRow className="w-full">
          <TableCell colSpan={5}>Total Size of this folder</TableCell>
          <TableCell className="text-right">{getTotalsize()}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
