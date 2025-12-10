"use client";

import React from "react";
import { Search } from "lucide-react";

interface StudentSearchbarProps {
	value: string;
	onChange: (value: string) => void;
}

export default function StudentSearchbar({
	value,
	onChange,
}: Readonly<StudentSearchbarProps>) {
	return (
		<div className="mb-4">
			<div className="flex items-center bg-white border border-gray-200 rounded-md px-3 py-2">
				<Search className="mr-2 text-gray-400" size={18} />
				<input
					value={value}
					onChange={(e) => onChange(e.target.value)}
					placeholder="Search by name..."
					className="w-full text-sm bg-transparent outline-none"
				/>
			</div>
		</div>
	);
}
