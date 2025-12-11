import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/global.tw.css";
import type React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "NYIT Click",
	description: "Linking NYIT Students to Resources and Opportunities",
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" className="scroll-smooth">
			<body
				className={`${inter.className} bg-gray-50 text-gray-900 antialiased`}
				suppressHydrationWarning
			>
				{children}
			</body>
		</html>
	);
}
