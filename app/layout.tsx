import type { Metadata } from "next";
import { Inter, Dancing_Script } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';

const inter = Inter({ subsets: ["latin"] });

// Configure the Brand Font
const dancingScript = Dancing_Script({ 
  subsets: ["latin"],
  variable: "--font-brand",
});

export const metadata: Metadata = {
  title: "Videsi Kalashala",
  description: "Your Study Abroad Companion",
  // ❌ NO 'icons' needed here. Next.js automatically uses app/icon.jpg
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} ${dancingScript.variable} bg-slate-50 text-slate-900`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}