"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import ScheduleSummary from "@/components/schedule-match/ScheduleSummary";
import StudentSearchbar from "@/components/schedule-match/StudentSearchBar";
import StudentList from "@/components/schedule-match/StudentList";
import Pagination from "@/components/common/Pagination";
import { mockSchedule, mockStudents } from "@/lib/mockData";
import type { Student } from "@/types";

const STUDENTS_PER_PAGE = 5;
const SEMESTER_TITLE = "Fall 2025";

export default function ScheduleMatchPage() {
	const router = useRouter();
	const [searchQuery, setSearchQuery] = useState("");
	const [currentPage, setCurrentPage] = useState(1);

	const uniqueCourses = useMemo(() => {
		const set = new Set<string>();
		for (const block of mockSchedule) {
			if (block.courseCode) {
				set.add(block.courseCode);
			}
		}
		return Array.from(set);
	}, []);

	const filteredStudents: Student[] = useMemo(() => {
		const q = searchQuery.trim().toLowerCase();
		if (!q) return mockStudents;

		return mockStudents.filter((student) =>
			student.name.toLowerCase().includes(q),
		);
	}, [searchQuery]);

	const totalPages = Math.ceil(
		filteredStudents.length / STUDENTS_PER_PAGE || 1,
	);

	const paginatedStudents = useMemo(() => {
		const start = (currentPage - 1) * STUDENTS_PER_PAGE;
		return filteredStudents.slice(start, start + STUDENTS_PER_PAGE);
	}, [filteredStudents, currentPage]);

	const handleConnect = (id: string) => {
		router.push(`/dashboard/schedule-match/student/${id}`);
	};

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	return (
		<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<header className="mb-6">
				<h1 className="text-3xl sm:text-4xl font-bold text-blue-900">
					MEET NEW PEOPLE
				</h1>
				<p className="mt-2 text-sm text-gray-600">
					Browse students with similar schedules and connect with potential
					classmates or study partners.
				</p>
			</header>

			<section className="mb-6">
				<ScheduleSummary semester={SEMESTER_TITLE} courses={uniqueCourses} />
			</section>

			<section className="mb-4">
				<StudentSearchbar value={searchQuery} onChange={setSearchQuery} />
			</section>

			<section>
				<StudentList students={paginatedStudents} onConnect={handleConnect} />

				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={handlePageChange}
				/>
			</section>
		</main>
	);
}
