import type { Metadata } from "next";

import { Inter } from "next/font/google";

import "./globals.css";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
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
            <main>
              <Header />
              {children}
              <Footer />
            </main>
          </ThemeProvider>
        </body>
      </QueryProvider>
    </html>
  );
}
