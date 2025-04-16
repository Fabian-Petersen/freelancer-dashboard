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
import { ChakraProvider } from "@chakra-ui/react";
import { system } from "@/theme";
import configureAmplify from "@/aws/amplifyConfig";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  configureAmplify();
  return (
    <html className={inter.className} suppressHydrationWarning>
      <head />
      <body>
        <Provider>
          <ChakraProvider value={system}>
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
