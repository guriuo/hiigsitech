// app/layout.tsx
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

// Your existing components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuthProvider from "./components/AuthProvider";

// ✅ UPDATE: Import the new BackToTopButton component
import BackToTopButton from "./components/BackToTopButton";

export const metadata: Metadata = {
  title: "Hiigsi Tech",
  description: "Modern Solutions for Modern Businesses",
  // ✅ Add your AdSense verification here
  other: {
    "google-adsense-account": "ca-pub-3464457348432176",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeScript = `
    (function() {
      try {
        const theme = localStorage.getItem('theme') || 'light';
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        }
      } catch (e) { /* Local storage not available */ }
    })();
  `;

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={GeistSans.className}>
        <AuthProvider>
          <script dangerouslySetInnerHTML={{ __html: themeScript }} />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <BackToTopButton />
        </AuthProvider>
      </body>
    </html>
  );
}
