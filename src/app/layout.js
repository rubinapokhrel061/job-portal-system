import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import AuthWrapper from "./components/AuthWrapper";
import ReduxProvider from "./components/ReduxProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthWrapper>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased *:font-serif text-[#212529]`}
        >
          <main className="py-6 px-3 sm:px-6 min-h-screen container mx-auto">
            <ReduxProvider>
              <ToastContainer />
              <Navbar />
              {children}
              <Footer />
            </ReduxProvider>
          </main>
        </body>
      </AuthWrapper>
    </html>
  );
}
