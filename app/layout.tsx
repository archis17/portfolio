import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Archis Kulkarni | AI & Full Stack Portfolio",
  description: "Interactive terminal portfolio of Archis Kulkarni, AI Engineer and Full Stack Developer.",
  keywords: ["AI Engineer", "Full Stack Developer", "Next.js", "TypeScript", "Terminal Portfolio", "RAG Systems"],
  authors: [{ name: "Archis Kulkarni" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased selection:bg-[#00ff9f]/30`}>
        {children}
      </body>
    </html>
  );
}
