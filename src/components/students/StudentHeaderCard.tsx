"use client";

import React from "react";
import { Mail } from "lucide-react";
import type { Student } from "@/types";

export default function StudentHeaderCard({
	student,
}: Readonly<{ student: Student }>) {
	return (
		<div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
			<div className="flex items-start gap-4">
				<div className="w-20 h-20 rounded-full bg-blue-900 text-white flex items-center justify-center shrink-0 font-semibold text-3xl">
					{student.initials}
				</div>

				<div className="flex-1 min-w-0">
					<h1 className="text-3xl font-bold text-blue-900">{student.name}</h1>
					<p className="text-gray-600 mt-2">
						{student.year} • {student.major}
					</p>
					<a
						href={`mailto:${student.email}`}
						className="flex items-center gap-2 text-blue-900 hover:text-blue-800 mt-3 transition-colors"
					>
						<Mail size={16} />
						<span className="text-sm">{student.email}</span>
					</a>
				</div>
			</div>
		</div>
	);
}
