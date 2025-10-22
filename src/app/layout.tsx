export const metadata = {
  title: "House Remote",
  description: "Universal smart-home & TV remote",
};

import "./globals.css";
import React from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <div className="mx-auto max-w-4xl p-4">{children}</div>
      </body>
    </html>
  );
}
