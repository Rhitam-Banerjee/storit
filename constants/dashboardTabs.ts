import { IoMdImages } from "react-icons/io";
import { IoDocumentTextOutline } from "react-icons/io5";
import { PiCloudArrowUpDuotone, PiFolderSimpleFill } from "react-icons/pi";
import { TiStar } from "react-icons/ti";
const FileTypes = [
  {
    name: "all",
    icon: PiCloudArrowUpDuotone,
  },
  {
    name: "images",
    icon: IoMdImages,
  },
  {
    name: "docs",
    icon: IoDocumentTextOutline,
  },
  {
    name: "folders",
    icon: PiFolderSimpleFill,
  },
];
const DashboardTabs = [
  {
    name: "all",
    icon: PiCloudArrowUpDuotone,
  },
  {
    name: "star",
    icon: TiStar,
  },
];
export { FileTypes, DashboardTabs };
