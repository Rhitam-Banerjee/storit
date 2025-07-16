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
import { PiFolderOpenFill, PiFolderSimpleFill } from "react-icons/pi";
interface ComponentProps {
  files: DashboardTableFileContents[];
}
export default function TableDemo({ files }: ComponentProps) {
  const openImageViewer = (file: DashboardTableFileContents) => {
    if (file.type.startsWith("image/")) {
      const optimizedUrl = `${process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}/tr:q-90,w-1600,fo-auto/${file.path}`;
      window.open(optimizedUrl, "_blank");
    }
  };
  const handleItemClick = (file: DashboardTableFileContents) => {
    if (file.type.startsWith("image/")) {
      openImageViewer(file);
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
          <TableRow key={index} onClick={() => handleItemClick(file)}>
            <TableCell
              className={`${
                file.type === "folder" ? "h-[93px]" : ""
              } font-medium`}
            >
              {file.type === "folder" ? (
                file.size > 0 ? (
                  <PiFolderSimpleFill className="w-full h-[60px]" />
                ) : (
                  <PiFolderOpenFill className="w-full h-[60px]" />
                )
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
            <TableCell className="font-medium">{file.size} B</TableCell>
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
          <TableCell colSpan={5}>Total Size</TableCell>
          <TableCell className="text-right">
            {files.reduce((totalSize, file) => {
              return totalSize + file.size;
            }, 0)}{" "}
            B
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
