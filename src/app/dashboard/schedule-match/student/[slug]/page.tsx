"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/utils/database/supabase/client";
import type { Student } from "@/types";
import {
	parseStudentSlug,
	validateSlugMatch,
} from "@/lib/utils/slug";

import StudentBackButton from "@/components/students/BackButton";
import StudentHeaderCard from "@/components/students/StudentHeaderCard";
import StudentAboutSection from "@/components/students/StudentAboutSection";
import SharedClassesSection from "@/components/students/SharedClasses";
import StudentActionsRow from "@/components/students/ActionsRow";

interface StudentDetailPageProps {
	params: { slug: string };
}

export default function StudentDetailPage({
	params,
}: Readonly<StudentDetailPageProps>) {
	const { slug } = params;
	const router = useRouter();
	const [student, setStudent] = useState<Student | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		async function fetchStudent() {
			try {
				// Parse the slug
				const parsed = parseStudentSlug(slug);

				if (!parsed) {
					setError(true);
					setLoading(false);
					return;
				}

				// Fetch from database using UUID
				const supabase = createClient();
				const { data: userData, error: dbError } = await supabase
					.from("users")
					.select("id, first_name, last_name, email, bio")
					.eq("id", parsed.uuid)
					.single();

				if (dbError || !userData) {
					setError(true);
					setLoading(false);
					return;
				}

				// Validate slug matches database data (case-sensitive)
				if (
					!validateSlugMatch(
						parsed,
						userData.first_name,
						userData.last_name,
						userData.id,
					)
				) {
					setError(true);
					setLoading(false);
					return;
				}

				// Transform to Student type
				const studentData: Student = {
					id: userData.id,
					name: `${userData.first_name} ${userData.last_name}`,
					initials: `${userData.first_name[0]}${userData.last_name[0]}`,
					year: "Sophomore", // TODO: fetch from database when available
					major: "Computer Science", // TODO: fetch from database when available
					email: userData.email,
					bio: userData.bio || "",
					sharedClasses: [], // TODO: fetch from database when available
				};

				setStudent(studentData);
				setLoading(false);
			} catch {
				setError(true);
				setLoading(false);
			}
		}

		fetchStudent();
	}, [slug]);

	if (loading) {
		return (
			<div className="max-w-4xl mx-auto px-4 py-8">
				<div className="animate-pulse space-y-4">
					<div className="h-8 bg-gray-200 rounded w-24"></div>
					<div className="h-32 bg-gray-200 rounded"></div>
				</div>
			</div>
		);
	}

	if (error || !student) {
		return (
			<div className="max-w-4xl mx-auto px-4 py-8">
				<StudentBackButton label="Back" />
				<div className="text-center py-12">
					<p className="text-gray-600 mb-4">Student not found</p>
					<button
						onClick={() => router.push("/dashboard/schedule-match")}
						className="bg-[#002D72] text-white px-6 py-2 rounded-md hover:bg-blue-900"
					>
						Return to Schedule Matches
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="max-w-4xl mx-auto px-4 py-8">
			<StudentBackButton />

			<StudentHeaderCard student={student} />

			<StudentAboutSection studentId={student.id} />

			<SharedClassesSection student={student} />

			<StudentActionsRow
				onConnect={() => {
					console.log("Connect clicked for", student.id);
				}}
				onMessage={() => {
					console.log("Message clicked for", student.id);
				}}
			/>
		</div>
	);
}
