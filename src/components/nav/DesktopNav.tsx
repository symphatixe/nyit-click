import Link from "next/link";
import type { NavItem } from "@/types";

export default function DesktopNav({
	pathname,
	navItems,
}: Readonly<{ pathname: string; navItems: NavItem[] }>) {
	return (
		<div className="hidden sm:flex sm:space-x-1">
			{navItems.map((item) => (
				<Link
					key={item.name}
					href={item.href}
					className={`inline-flex items-center px-4 py-2 font-medium rounded-md transition-colors text-lg ${
						pathname === item.href
							? "text-white bg-maincolor/80 border-2 border-white"
							: "text-gray-200 hover:text-white hover:bg-maincolor/60"
					}`}
				>
					{item.name}
				</Link>
			))}
		</div>
	);
}
