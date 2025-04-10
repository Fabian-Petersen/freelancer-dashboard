"use client";

import { Inter } from "next/font/google";
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

// $ Context Providers
import Providers from "./providers";
import { Toaster } from "@/components/ui/toaster";

// $ Chakra Provider
import Provider from "./provider";
import { ColorModeProvider } from "@/components/ui/color-mode";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={inter.className} suppressHydrationWarning>
      <head />
      <body>
        <Provider>
          <ChakraProvider value={defaultSystem}>
            <ColorModeProvider>
              <Providers>
                <Toaster />
                <Provider>{children}</Provider>
              </Providers>
            </ColorModeProvider>
          </ChakraProvider>
        </Provider>
      </body>
    </html>
  );
}
