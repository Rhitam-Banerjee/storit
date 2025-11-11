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
const gridContent = [
  {
    icon: "/icons/auth.png",
    text: "Auth",
  },
  {
    icon: "/icons/email.png",
    text: "Email",
  },
  {
    icon: "/icons/edit.png",
    text: "Edit",
  },
  {
    icon: "/icons/file.png",
    text: "Files",
  },
  {
    icon: "/icons/free.png",
    text: "Free",
  },
  {
    icon: "/icons/images.png",
    text: "Images",
  },
  {
    icon: "/icons/mobile.png",
    text: "Mobile",
  },
  {
    icon: "/icons/server.png",
    text: "Cloud",
  },
  {
    icon: "/icons/star.png",
    text: "Star",
  },
  {
    icon: "/icons/storage.png",
    text: "storage",
  },
  {
    icon: "/icons/storage.png",
    text: "storage",
  },
] as const;
export { aboutText, gridContent };
