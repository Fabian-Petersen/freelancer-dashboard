import type { Metadata } from "next";
import RootLayout from "./rootLayout";

import "./globals.css";

export const metadata: Metadata = {
  title: "Freelancer App",
  description: "Freelancer Management Dashboard",
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootLayout>{children}</RootLayout>;
}
