import type { Metadata, Route } from "next";

import { Inter } from "next/font/google";
import Link from "next/link";

import "./globals.css";
import QueryProvider from "@/provider/query-provider";
import { ThemeProvider } from "@/provider/theme-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bus Khoja",
  description: "Your Guide to Local Bus in Dhaka",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <QueryProvider>
        <body className={`${inter.variable} antialiased`}>
          <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
            <header className="border-b">
              <nav className="mx-auto flex max-w-5xl items-center justify-between p-4 text-sm">
                <Link href={"/" as Route} className="font-semibold">Bus Khoja</Link>
                <div className="flex items-center gap-4">
                  <Link href={"/buses" as Route}>Buses</Link>
                  <Link href={"/locations" as Route}>Locations</Link>
                  <Link href={"/routes" as Route}>Routes</Link>
                  <Link href={"/admin" as Route} className="font-medium">Admin</Link>
                </div>
              </nav>
            </header>
            <main className="mx-auto max-w-5xl p-4">
              {children}
            </main>
          </ThemeProvider>
        </body>
      </QueryProvider>
    </html>
  );
}
