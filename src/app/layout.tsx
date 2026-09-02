import type { Metadata } from "next";
import { Anton, Inter, Sarabun } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/providers";
import { SITE_CONFIG } from "@/constants";
import { CoffeeWidget } from "@/components/ui";

const anton = Anton({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const sarabun = Sarabun({
  variable: "--font-thai",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${anton.variable} ${inter.variable} ${sarabun.variable} bg-black text-white antialiased`}
        suppressHydrationWarning
      >
        <AppProviders>
          {children}
          <CoffeeWidget />
        </AppProviders>
      </body>
    </html>
  );
}
