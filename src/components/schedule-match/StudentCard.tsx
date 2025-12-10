"use client";

import React from "react";
import type { Student } from "@/types";

interface StudentCardProps {
	student: Student;
	onConnect: (id: string) => void;
}

export default function StudentCard({
	student,
	onConnect,
}: Readonly<StudentCardProps>) {
	return (
		<div className="bg-gray-50 border border-gray-100 rounded-md p-4">
			<div className="flex items-center gap-3 justify-between">
				<div className="flex items-center gap-3 flex-1 min-w-0">
					<div className="w-12 h-12 rounded-full bg-blue-900 text-white flex items-center justify-center shrink-0 font-semibold text-sm">
						{student.initials}
					</div>

					<div className="min-w-0 flex-1">
						<h5 className="font-semibold text-gray-800 text-sm truncate">
							{student.name}
						</h5>
						<p className="text-xs text-gray-600 mt-1 truncate">
							{student.year} • {student.major}
						</p>
					</div>
				</div>

				<button
					type="button"
					onClick={() => onConnect(student.id)}
					className="bg-blue-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-950"
				>
					Connect
				</button>
			</div>
		</div>
	);
}
