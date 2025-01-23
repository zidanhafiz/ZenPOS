import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { inter } from "@/lib/fonts";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "ZenPOS",
  description: "Point of Sales Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div>{children}</div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
