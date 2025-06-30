/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import type { ThemeProviderProps } from "next-themes"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ImageKitProvider } from "imagekitio-next"
import { HeroUIProvider } from "@heroui/system"
export interface ProviderProps {
  children: React.ReactNode,
  themeProps?: ThemeProviderProps
}
const authenticator = async () => {
  try {
    const response = await fetch("/api/imagekit-auth")
    const data = await response.json()
    return data
  } catch (err) {
    console.log("Authentication error");
    throw err
  }
}
export function Providers({ children, themeProps }: ProviderProps) {
  return (
    <h1>
      <ImageKitProvider
        authenticator={authenticator}
        publicKey={process.env.IMAGEKIT_PUBLIC_KEY || ""}
        urlEndpoint={process.env.IMAGEKIT_URL_ENDPOINT || ""}
      >
        <HeroUIProvider>
          {children}
        </HeroUIProvider>
      </ImageKitProvider>
    </h1>
  )
}