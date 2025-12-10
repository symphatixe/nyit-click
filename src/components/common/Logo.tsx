import Link from "next/link";

export default function Logo() {
	return (
		<Link href="/" className="shrink-0 flex items-center">
			<span className="text-2xl font-bold text-white">NYIT Click</span>
		</Link>
	);
}
