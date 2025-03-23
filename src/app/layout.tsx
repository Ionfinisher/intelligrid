import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: "normal",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://intelligrid-alpha.vercel.app"),
  title: {
    default: "IntelliGrid",
    template: "%s | IntelliGrid",
  },
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/logo.svg",
    },
  },
  authors: [
    {
      name: "Teddy ASSIH",
      url: "https://www.linkedin.com/in/teddy-assih-b4204b254/",
    },
  ],
  description: "AI Pricing Grid Generation App with KendoReact components.",
  keywords: "KendoReact, IntelliGrid, AI, React, Next.js",
  openGraph: {
    title: "IntelliGrid",
    description: "AI Pricing Grid Generation App with KendoReact components.",
    url: "https://intelligrid-alpha.vercel.app",
    siteName: "IntelliGrid",
    images: [
      {
        url: "https://intelligrid-alpha.vercel.app/og.png",
        width: 2530,
        height: 1148,
      },
    ],
    locale: "en-US",
    type: "website",
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
  twitter: {
    title: "IntelliGrid",
    card: "summary_large_image",
    description: "AI Pricing Grid Generation App with KendoReact components.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ubuntu} antialiased`}>{children}</body>
    </html>
  );
}
