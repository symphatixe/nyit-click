"use client";

import React from "react";
import type { Student } from "@/types";
import StudentCard from "./StudentCard";

interface StudentListProps {
	students: Student[];
	onConnect: (id: string) => void;
}

export default function StudentList({
	students,
	onConnect,
}: Readonly<StudentListProps>) {
	if (students.length === 0) {
		return (
			<div className="text-center py-8">
				<p className="text-sm text-gray-500">
					No students found matching your search.
				</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-3">
			{students.map((student) => (
				<StudentCard key={student.id} student={student} onConnect={onConnect} />
			))}
		</div>
	);
}
