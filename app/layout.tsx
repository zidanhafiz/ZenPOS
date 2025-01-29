import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { inter } from "@/lib/fonts";
import { Toaster } from "@/components/ui/toaster";
import Sidebar from "@/components/Sidebar";
import { UserStoreProvider } from "@/providers/UserProvider";
import { getUserData } from "@/actions/auth";

export const metadata: Metadata = {
  title: "ZenPOS",
  description: "Point of Sales Application",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUserData();

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-muted`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <UserStoreProvider user={user}>
            <div className="flex">
              <Sidebar />
              <div className="flex-1 mx-6 py-6 h-screen">{children}</div>
            </div>
            <Toaster />
          </UserStoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
