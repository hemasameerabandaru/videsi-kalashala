import type { Metadata } from "next";
import { Poppins } from "next/font/google"; // Importing the font
import "./globals.css";

// Configure the font settings (weights 400=regular, 600=semi-bold, 700=bold)
const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Videsi Kalashala",
  description: "The world's first real-time study abroad consultancy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Applying the font to the entire body of the website */}
      <body className={`${poppins.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}