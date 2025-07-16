/* eslint-disable @typescript-eslint/no-unused-vars */
import FileTableView from "@/components/FileTableView";
import type { DashboardTableFileContents } from "@/exportTypes";
interface FileUploadChanges {
  files: DashboardTableFileContents[];
  currentFolder: string | null;
  handleFolderChange?: (folderId: string | null) => void;
}
export default function DashboardMain({
  files,
  currentFolder,
  handleFolderChange,
}: FileUploadChanges) {
  return (
    <div className="w-full flex flex-col justify-center items-start p-4 rounded-md ">
      <FileTableView files={files} />
    </div>
  );
}
