import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Better auth",
	description: "A NextJs website that implements better auth authentication",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={cn(
					`${geistSans.variable} ${geistMono.variable} antialiased`,
					"flex flex-col min-h-dvh"
				)}
			>
				<main className={cn("grow p-4 py-10")}>{children}</main>
				<Toaster />
			</body>
		</html>
	);
}
