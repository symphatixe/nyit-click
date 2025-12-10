"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import ProfessorHeader from "@/components/professor/ProfessorHeader";
import AverageRatingsCard from "@/components/professor/AverageRatingsCard";
import CommonTagsCard from "@/components/professor/CommonTagsCard";
import ReviewsList from "@/components/professor/ReviewList";
import { mockProfessors, mockReviews } from "@/lib/mockData";
import type { Professor, ProfessorReview } from "@/types";

const REVIEWS_PER_PAGE = 5;

interface ProfessorDetailPageProps {
	params: Promise<{ slug: string }>;
}

export default function ProfessorPage({
	params,
}: Readonly<ProfessorDetailPageProps>) {
	const { slug } = React.use(params);
	const router = useRouter();
	const [currentPage, setCurrentPage] = useState(1);

	const professor = useMemo(
		() => mockProfessors.find((p: Professor) => p.id === slug),
		[slug],
	);

	const professorReviews = useMemo(
		() => mockReviews.filter((r: ProfessorReview) => r.professorId === slug),
		[slug],
	);

	const averageRatings = useMemo(() => {
		if (professorReviews.length === 0) {
			return { workload: 0, content: 0, professor: 0 };
		}

		const avg = (
			key: keyof Pick<
				ProfessorReview,
				"workloadRating" | "contentRating" | "professorRating"
			>,
		) =>
			Math.round(
				(professorReviews.reduce((sum, r) => sum + r[key], 0) /
					professorReviews.length) *
					10,
			) / 10;

		return {
			workload: avg("workloadRating"),
			content: avg("contentRating"),
			professor: avg("professorRating"),
		};
	}, [professorReviews]);

	const tagCounts = useMemo(() => {
		const counts: Record<string, number> = {};
		for (const review of professorReviews) {
			for (const tag of review.tags) {
				counts[tag] = (counts[tag] || 0) + 1;
			}
		}
		return Object.entries(counts)
			.filter(([, count]) => count > 0)
			.sort((a, b) => b[1] - a[1]);
	}, [professorReviews]);

	const paginatedReviews = useMemo(() => {
		const startIdx = (currentPage - 1) * REVIEWS_PER_PAGE;
		return professorReviews.slice(startIdx, startIdx + REVIEWS_PER_PAGE);
	}, [professorReviews, currentPage]);

	const totalPages = Math.ceil(professorReviews.length / REVIEWS_PER_PAGE);

	if (!professor) {
		return (
			<div className="max-w-4xl mx-auto px-4 py-8">
				<button
					type="button"
					onClick={() => router.back()}
					className="flex items-center gap-2 text-blue-900 hover:text-blue-800 mb-6 transition-colors"
				>
					<ArrowLeft size={18} />
					<span>Back</span>
				</button>
				<div className="text-center py-12">
					<p className="text-gray-600">Professor not found</p>
				</div>
			</div>
		);
	}

	return (
		<div className="max-w-4xl mx-auto px-4 py-8">
			<button
				type="button"
				onClick={() => router.back()}
				className="flex items-center gap-2 text-blue-900 hover:text-blue-800 mb-6 transition-colors"
			>
				<ArrowLeft size={18} aria-hidden="true" />
				<span className="text-sm font-medium">Back to Ratings</span>
			</button>

			<div className="space-y-6">
				<ProfessorHeader
					name={professor.name}
					initials={professor.initials}
					reviewCount={professorReviews.length}
				/>

				<AverageRatingsCard
					averageRatings={averageRatings}
					hasReviews={professorReviews.length > 0}
				/>

				<CommonTagsCard tagCounts={tagCounts} />

				<ReviewsList
					reviews={paginatedReviews}
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={setCurrentPage}
				/>
			</div>
		</div>
	);
}
