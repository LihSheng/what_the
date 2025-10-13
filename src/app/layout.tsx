import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dev Tools",
  description: "Simple developer tools collection",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
