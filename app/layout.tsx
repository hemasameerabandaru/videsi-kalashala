import type { Metadata } from "next";
import { Inter, Dancing_Script } from "next/font/google";
import "./globals.css";
// 🔴 REMOVED: import { ClerkProvider } from '@clerk/nextjs';
import { Providers } from "./providers"; // 🟢 ADDED: New NextAuth Provider

// 1. Load the Standard Font (Inter)
const inter = Inter({ subsets: ["latin"] });

// 2. Load the Brand Font (Dancing Script)
const dancingScript = Dancing_Script({ 
  subsets: ["latin"],
  variable: "--font-brand",
});

export const metadata: Metadata = {
  title: "Videsi Kalashala",
  description: "Your Study Abroad Companion",
  // 👇 This forces the browser to use your logo from the 'public' folder
  icons: {
    icon: "/icon.jpg", 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 3. Apply both fonts to the body */}
      <body className={`${inter.className} ${dancingScript.variable} bg-slate-50 text-slate-900`}>
        {/* 🟢 WRAPPER: Replaced ClerkProvider with Providers */}
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}