"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import type { NavItem } from "@/types";

export default function MobileNav({
	navItems,
}: Readonly<{ navItems: NavItem[] }>) {
	const [menuOpen, setMenuOpen] = useState(false);
	const pathName = usePathname();

	const toggleMenu = () => setMenuOpen((open) => !open);

	return (
		<>
			<div className="-mr-2 flex items-center sm:hidden">
				<button
					onClick={toggleMenu}
					className="inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
				>
					<span className="sr-only">Toggle main menu</span>
					<AnimatePresence initial={false} mode="wait">
						{menuOpen ? (
							<motion.div
								key="close"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.2 }}
							>
								<X className="block h-6 w-6" aria-hidden="true" />
							</motion.div>
						) : (
							<motion.div
								key="menu"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.2 }}
							>
								<Menu className="block h-6 w-6" aria-hidden="true" />
							</motion.div>
						)}
					</AnimatePresence>
				</button>
			</div>

			<AnimatePresence>
				{menuOpen && (
					<motion.div
						className="sm:hidden"
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.3, ease: "easeInOut" }}
					>
						<div className="pt-2 pb-3 space-y-1 bg-maincolor">
							{navItems.map((item) => {
								const isActive = pathName === item.href;

								return (
									<Link
										key={item.name}
										href={item.href}
										className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
											isActive
												? "bg-blue-800 border-white text-white"
												: "border-transparent text-gray-200 hover:bg-blue-700 hover:border-gray-300 hover:text-white"
										}`}
										onClick={toggleMenu}
									>
										{item.name}
									</Link>
								);
							})}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
