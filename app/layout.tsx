import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import IPContext from "./context/IPContext";
import ToasterContext from "./context/ToasterContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DiscordID2IP",
  description: "Discord ID 2 IP",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <IPContext>
          <ToasterContext />
          {children}
        </IPContext>
      </body>
    </html>
  );
}
