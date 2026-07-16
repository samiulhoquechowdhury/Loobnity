// app/layout.tsx

import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/constants/site";
import { CustomCursor } from "@/components/cursor/custom-cursor";
import { CommandPalette } from "@/components/command-palette/command-palette";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Loobnity — Building Software That Matters",
    template: "%s — Loobnity",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Loobnity",
    "software studio",
    "AI development",
    "product engineering",
    "enterprise software",
    "custom software development",
  ],
  authors: [{ name: "Loobnity" }],
  creator: "Loobnity",
  publisher: "Loobnity",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Loobnity — Building Software That Matters",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og/loobnity-og.png",
        width: 1200,
        height: 630,
        alt: "Loobnity",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Loobnity — Building Software That Matters",
    description: SITE_DESCRIPTION,
    images: ["/og/loobnity-og.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        GeistSans.variable,
        GeistMono.variable,
        "font-sans",
        geist.variable
      )}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground antialiased selection:bg-accent/20 selection:text-white">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <SmoothScrollProvider>
            <CommandPalette />
            {children}
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
