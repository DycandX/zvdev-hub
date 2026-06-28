import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zvdev.cloud"),
  title: {
    default: "zvdev.cloud — Ecosystem Hub",
    template: "%s | zvdev.cloud",
  },
  description: "Pusat kendali & pameran teknologi modular digital milik Zulvikar Kharisma.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "zvdev.cloud — Ecosystem & Central Hub",
    description: "Pusat kendali dan showcase teknologi modular digital milik Zulvikar Kharisma.",
    url: "https://zvdev.cloud",
    siteName: "zvdev.cloud",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "zvdev.cloud — Ecosystem & Central Hub",
    description: "Pusat kendali dan showcase teknologi modular digital milik Zulvikar Kharisma.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
