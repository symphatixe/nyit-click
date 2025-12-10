"use client";

import { usePathname } from "next/navigation";
import Logo from "@/components/common/Logo";
import DesktopNav from "@/components/nav/DesktopNav";
import { navItems } from "@/lib/navItems";

export default function Header() {
	const pathname = usePathname();

	return (
		<header className="bg-primary shadow-sm sticky top-0 z-10">
			<nav className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					<div className="shrink-0 w-32">
						<Logo />
					</div>

					<div className="flex-1 flex justify-center">
						<DesktopNav pathname={pathname} navItems={navItems} />
					</div>

					<div className="shrink-0 w-32"></div>
				</div>
			</nav>
		</header>
	);
}
