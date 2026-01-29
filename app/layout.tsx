import type { Metadata } from "next";
import { Inter, Dancing_Script } from "next/font/google"; // 👈 1. Import Dancing_Script
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';

const inter = Inter({ subsets: ["latin"] });

// 👇 2. Configure the new Brand Font
const dancingScript = Dancing_Script({ 
  subsets: ["latin"],
  variable: "--font-brand", // This creates a CSS variable we can use
});

export const metadata: Metadata = {
  title: "Videsi Kalashala",
  description: "Your Study Abroad Companion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        {/* 👇 3. Add 'dancingScript.variable' to the body class list */}
        <body className={`${inter.className} ${dancingScript.variable} bg-slate-50 text-slate-900`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}