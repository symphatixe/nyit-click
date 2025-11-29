// import type { Metadata } from "next"
// import { Inter } from "next/font/google"
// import "./globals.css"
// import Header from "./components/header"
// import type React from "react"

// const inter = Inter({ subsets: ["latin"] })

// export const metadata: Metadata = {
//   title: "NYIT Link",
//   description: "Linking NYIT Students to Resources and Opportunities",
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en" className="scroll-smooth">
//       <body className={`${inter.className} bg-gray-50 text-gray-900 antialiased`} suppressHydrationWarning>
//         <div className="flex flex-col min-h-screen">
//           {/* <Header /> */}
//           <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8">{children}</main>
//         </div>
//       </body>
//     </html>
//   )
// }
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nyit Link",
  description: "Plan your next semester",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
       
        {children}
      </body>
    </html>
  );
}