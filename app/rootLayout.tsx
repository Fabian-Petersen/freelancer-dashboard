"use client";

// $ Context Providers
import Providers from "./providers";
import { Toaster } from "@/components/ui/toaster";

// $ Chakra Provider
import { Provider } from "@/components/ui/provider";

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Provider>
            <Toaster />
            {children}
          </Provider>
        </Providers>
      </body>
    </html>
  );
}
