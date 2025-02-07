import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { inter } from "@/lib/fonts";
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Cart from "../components/Cart";
import { CartStoreProvider } from "@/providers/CartProvider";

export const metadata: Metadata = {
  title: "ZenPOS",
  description: "Point of Sales Application",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-muted`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <CartStoreProvider>
              <AppSidebar />
              <div className="w-full mx-6 py-6">{children}</div>
              <Cart />
            </CartStoreProvider>
          </SidebarProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
