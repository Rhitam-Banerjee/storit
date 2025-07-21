import { PiFolderSimpleFill } from "react-icons/pi";
import {
  BsFiletypePdf,
  BsFiletypeDoc,
  BsFiletypeDocx,
  BsFiletypeXls,
  BsFiletypeXlsx,
  BsFiletypePpt,
  BsFiletypePptx,
} from "react-icons/bs";
import { CiFileOn } from "react-icons/ci";
const FileType = {
  folder: "folder",
  "application/pdf": "pdf",
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "docx",
  "application/vnd.ms-excel": "xls",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
  "application/vnd.ms-powerpoint": "ppt",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation":
    "pptx",
  "application/vnd.ms-access": "mdb",
} as const;
const FileTypeIcon = {
  unknown: CiFileOn,
  folder: PiFolderSimpleFill,
  pdf: BsFiletypePdf,
  doc: BsFiletypeDoc,
  docx: BsFiletypeDocx,
  xls: BsFiletypeXls,
  xlsx: BsFiletypeXlsx,
  ppt: BsFiletypePpt,
  pptx: BsFiletypePptx,
};
export { FileType, FileTypeIcon };
