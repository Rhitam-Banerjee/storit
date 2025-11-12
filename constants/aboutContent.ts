interface AboutTextContent {
  smallHeading: string;
  mainHeading: string;
  paratext: string;
  logo: string;
  buttonText: string;
}
const aboutText: AboutTextContent[] = [
  {
    smallHeading: "",
    mainHeading: "",
    paratext: "",
    logo: "",
    buttonText: "",
  },
  {
    smallHeading: "",
    mainHeading: "",
    paratext: "",
    logo: "",
    buttonText: "",
  },
];
const gridLayout = [
  { icon: "/icons/email.png", text: "Email", className: "end-card-group-3" },
  { icon: "/icons/auth.png", text: "Auth", className: "start-card-group-1" },
  null,
  null,
  { icon: "/icons/edit.png", text: "Edit", className: "end-card-group-1" },
  null,
  null,
  null,
  null,
  null,
  { icon: "/icons/files.png", text: "Files", className: "end-card-group-2" },
  null,
  null,
  { icon: "/icons/free.png", text: "Free", className: "start-card-group-4" },
  { icon: "/icons/images.png", text: "Images", className: "end-card-group-1" },
  null,
  {
    icon: "/icons/mobile.png",
    text: "Mobile",
    className: "start-card-group-5",
  },
  null,
  null,
  null,
  null,
  {
    icon: "/icons/cloud.png",
    text: "Cloud",
    className: "start-card-group-2 end-card-group-4",
  },
  null,
  { icon: "/icons/star.png", text: "Star", className: "end-card-group-5" },
  {
    icon: "/icons/storage.png",
    text: "Storage",
    className: "start-card-group-3",
  },
  null,
  null,
  null,
  {
    icon: "/icons/storage.png",
    text: "Storage",
    className: "end-card-group-5",
  },
  null,
];

export { aboutText, gridLayout };
