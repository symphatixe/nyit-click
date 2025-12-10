"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function StudentBackButton({
	label = "Back to Schedule Matches",
}: Readonly<{ label?: string }>) {
	const router = useRouter();

	return (
		<button
			type="button"
			onClick={() => router.back()}
			className="flex items-center gap-2 text-blue-900 mb-6 transition-colors cursor-pointer hover:text-blue-700"
		>
			<ArrowLeft size={18} />
			<span className="text-sm font-medium">{label}</span>
		</button>
	);
}
