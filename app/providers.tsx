"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ImageKitProvider } from "imagekitio-next";
import { createContext, useContext, useEffect, useState } from "react";
export interface ProviderProps {
  children: React.ReactNode;
  themeProps?: React.ComponentProps<typeof NextThemesProvider>;
}
export const ImageKitAuthContext = createContext<{
  authenticate: () => Promise<{
    signature: string;
    token: string;
    expire: number;
  }>;
}>({
  authenticate: async () => ({ signature: "", token: "", expire: 0 }),
});

export const useImageKitAuth = () => useContext(ImageKitAuthContext);
const authenticator = async () => {
  try {
    const response = await fetch("/api/imagekit-auth");
    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
};
export function Providers({ children, ...themeProps }: ProviderProps) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    // Define handler to update visibility based on width
    const handleResize = () => setShowCursor(window.innerWidth >= 768);
    handleResize(); // run once on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!showCursor) return;
    const move = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
      let el = e.target as Element | null;
      let clickable = false;
      while (el) {
        if (
          el.tagName === "BUTTON" ||
          el.tagName === "A" ||
          (el as HTMLElement).getAttribute("role") === "button" ||
          (el as HTMLElement).classList.contains("cursor-pointer")
        ) {
          clickable = true;
          break;
        }
        el = el.parentElement;
      }
      setActive(clickable);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [showCursor]);

  return (
    <ImageKitProvider
      authenticator={authenticator}
      publicKey={process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || ""}
      urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || ""}
    >
      <ImageKitAuthContext.Provider value={{ authenticate: authenticator }}>
        <NextThemesProvider
          {...themeProps}
          attribute="class"
          defaultTheme="light"
          enableSystem
        >
          {showCursor && (
            <div
              style={{
                left: mouse.x,
                top: mouse.y,
                pointerEvents: "none",
              }}
              className={`fixed w-8 h-8 rounded-full bg-transparent z-[99] border-[1px] border-primary/70 -translate-x-1/2 -translate-y-1/2 transition-transform ease-in-out duration-100 ${
                active ? "scale-150" : "scale-100 backdrop-blur-xs"
              }`}
            />
          )}
          <div className={showCursor ? "relative cursor-none" : "relative"}>
            {children}
          </div>
        </NextThemesProvider>
      </ImageKitAuthContext.Provider>
    </ImageKitProvider>
  );
}
