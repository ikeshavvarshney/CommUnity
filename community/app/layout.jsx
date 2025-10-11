import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ToastContainer } from 'react-toastify';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CommUnity - Community Engagement Platform",
  description: "A platform for community engagement",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black`}
      >
        {children}

        <ToastContainer position="top-right" autoClose={3000} />


      </body>
    </html>
  );
}
