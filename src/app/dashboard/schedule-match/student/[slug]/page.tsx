"use client";

import React, { useMemo } from "react";
import { mockStudents } from "@/lib/mockData";
import type { Student } from "@/types";

import StudentBackButton from "@/components/students/BackButton";
import StudentHeaderCard from "@/components/students/StudentHeaderCard";
import StudentAboutSection from "@/components/students/StudentBio";
import SharedClassesSection from "@/components/students/SharedClasses";
import StudentActionsRow from "@/components/students/ActionsRow";

interface StudentDetailPageProps {
	params: { slug: string };
}

export default function StudentDetailPage({
	params,
}: Readonly<StudentDetailPageProps>) {
	const { slug } = params;

	const student = useMemo(
		() => mockStudents.find((s: Student) => s.id === slug),
		[slug],
	);

	if (!student) {
		return (
			<div className="max-w-4xl mx-auto px-4 py-8">
				<StudentBackButton label="Back" />
				<div className="text-center py-12">
					<p className="text-gray-600">Student not found</p>
				</div>
			</div>
		);
	}

	return (
		<div className="max-w-4xl mx-auto px-4 py-8">
			<StudentBackButton />

			<StudentHeaderCard student={student} />

			<StudentAboutSection bio={student.bio} />

			<SharedClassesSection student={student} />

			<StudentActionsRow
				onConnect={() => {
					// later: open modal, send request, etc.
					console.log("Connect clicked for", student.id);
				}}
				onMessage={() => {
					// later: route to messages
					console.log("Message clicked for", student.id);
				}}
			/>
		</div>
	);
}
