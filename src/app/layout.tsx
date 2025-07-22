import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Nav } from "@/components/nav";

export const metadata: Metadata = {
  title: "EBC",
  description: "Emmanuel Boat Club",
  appleWebApp: {
    capable: true,
    title: "EBC Intranet",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main
            style={{
              height: "calc(100vh - env(safe-area-inset-top) - 68px)",
              paddingTop: "calc(env(safe-area-inset-top) + 68px)",
            }}
          >
            <Nav />

            <h1 className="text-3xl font-semibold tracking-tight pl-4">
              EBC Intranet
            </h1>

            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
