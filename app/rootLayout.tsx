"use client";

import { Inter } from "next/font/google";
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

import { usePathname } from "next/navigation";

// $ Context Providers
import Providers from "./providers";
import { Toaster } from "@/components/ui/toaster";

// $ Chakra Provider
import Provider from "./provider";
import { ColorModeProvider } from "@/components/ui/color-mode";
import { ChakraProvider, GridItem } from "@chakra-ui/react";
import { system } from "@/theme";
import configureAmplify from "@/aws/amplifyConfig";
import Sidebar from "./components/dashboard/Sidebar";
import HomePageHeader from "./components/homePage/HomePageHeader";
import Header from "./components/header/Header";
import { Grid } from "@chakra-ui/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  configureAmplify();
  const path = usePathname();
  const excludedPaths = ["/", "/login/", "/register/"];
  console.log("Current path:", path);
  return (
    <html className={inter.className} suppressHydrationWarning>
      <head />
      <body>
        <Provider>
          <ChakraProvider value={system}>
            <ColorModeProvider>
              <Providers>
                <Toaster />
                <Provider>
                  <Grid
                    bgColor={{ base: "#f8fafd", _dark: "#101827" }}
                    templateColumns={{
                      base: "1fr",
                      md: "240px 1fr",
                    }}
                    templateRows={{
                      base: "1fr",
                      md: "4.2rem auto",
                    }}
                    width="100%"
                    height="100vh"
                    gapY={4}
                  >
                    {/* Show Sidebar only if not in excluded paths */}
                    {!excludedPaths.includes(path) && (
                      <GridItem
                        colSpan={1}
                        rowSpan={2}
                        // border="1px dashed yellow"
                      >
                        <Sidebar />
                      </GridItem>
                    )}

                    {/* Show HomePageHeader only on root path */}
                    {path === "/" && (
                      <GridItem>
                        <HomePageHeader />
                      </GridItem>
                    )}

                    {/* Show Header on all paths except /, /login, /register */}
                    {!excludedPaths.includes(path) && (
                      <GridItem
                        colStart={2}
                        // border="1px dashed red"
                        rowStart={1}
                      >
                        <Header />
                      </GridItem>
                    )}
                    <GridItem
                      colStart={2}
                      rowStart={2}
                      // border="1px dotted red"
                    >
                      {children}
                    </GridItem>
                  </Grid>
                </Provider>
              </Providers>
            </ColorModeProvider>
          </ChakraProvider>
        </Provider>
      </body>
    </html>
  );
}
