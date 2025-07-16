"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ImageKitProvider } from "imagekitio-next";
import { createContext, useContext } from "react";
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
    console.log("Authentication error");
    throw err;
  }
};
export function Providers({ children, ...themeProps }: ProviderProps) {
  return (
    <ImageKitProvider
      authenticator={authenticator}
      publicKey={process.env.IMAGEKIT_PUBLIC_KEY || ""}
      urlEndpoint={process.env.IMAGEKIT_URL_ENDPOINT || ""}
    >
      <ImageKitAuthContext.Provider value={{ authenticate: authenticator }}>
        <NextThemesProvider
          {...themeProps}
          attribute="class"
          defaultTheme="light"
          enableSystem
        >
          {children}
        </NextThemesProvider>
      </ImageKitAuthContext.Provider>
    </ImageKitProvider>
  );
}
