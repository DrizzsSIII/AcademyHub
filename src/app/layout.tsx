import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { academyTheme, themeStyleVars } from "@/lib/theme";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: `${academyTheme.appDisplayName} · AcademyHub`,
  description: "White-label training companion for academies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={themeStyleVars()}>
      <body className={`${inter.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
