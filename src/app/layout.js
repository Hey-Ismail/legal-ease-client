import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import Providers from "./Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToastProvider from "@/components/provider/ToastProvider";
// import Providers from "@/components/provider/ThemeProvider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "LegalEase",
  description: "LegalEase lawyer hiring platform",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">

        {/* <Providers> */}
        <ToastProvider />
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        {/* </Providers> */}

      </body>
    </html>
  );
}
