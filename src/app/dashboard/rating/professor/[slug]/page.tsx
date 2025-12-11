"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import ProfessorHeader from "@/components/professor/ProfessorHeader";
import AverageRatingsCard from "@/components/professor/AverageRatingsCard";
import CommonTagsCard from "@/components/professor/CommonTagsCard";
import ReviewsList from "@/components/professor/ReviewList";
import {
	getProfessor,
	getProfessorReviews,
	getProfessorAverageRating,
} from "@/lib/services/professorService";
import type { Professor, CourseReview, ProfessorReviewWithCourseInfo } from "@/lib/types";

const REVIEWS_PER_PAGE = 7;

interface ProfessorDetailPageProps {
	params: Promise<{ slug: string }>;
}

export default function ProfessorPage({
	params,
}: Readonly<ProfessorDetailPageProps>) {
	const { slug } = React.use(params);
	const router = useRouter();
	const [currentPage, setCurrentPage] = useState(1);
	const [professor, setProfessor] = useState<Professor | null>(null);
	const [reviews, setReviews] = useState<ProfessorReviewWithCourseInfo[]>([]);
	const [averageRating, setAverageRating] = useState(0);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const loadProfessorData = async () => {
			try {
				setLoading(true);
				setError(null);

				// Fetch professor data
				const prof = await getProfessor(slug);
				if (!prof) {
					setError("Professor not found");
					return;
				}
				setProfessor(prof);

				// Fetch professor reviews
				const profReviews = await getProfessorReviews(slug);
				setReviews(profReviews); // omit the courses field. we will be using that elsewhere

				// Calculate average rating
				const avgRating = await getProfessorAverageRating(slug);
				setAverageRating(avgRating);
			} catch (err) {
				console.error("Error loading professor data:", err);
				setError("Failed to load professor data");
			} finally {
				setLoading(false);
			}
		};

		loadProfessorData();
	}, [slug]);

	const tagCounts = useMemo(() => {
		const counts: Record<string, number> = {};
		for (const review of reviews) {
			const tags = review.review_tags || [];
			for (const tag of tags) {
				counts[tag] = (counts[tag] || 0) + 1;
			}
		}
		return Object.entries(counts)
			.filter(([, count]) => count > 0)
			.sort((a, b) => b[1] - a[1]);
	}, [reviews]);

	const paginatedReviews = useMemo(() => {
		const startIdx = (currentPage - 1) * REVIEWS_PER_PAGE;
		return reviews.slice(startIdx, startIdx + REVIEWS_PER_PAGE);
	}, [reviews, currentPage]);

	const totalPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE);

	if (loading) {
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
					<p className="text-gray-600">Loading professor data...</p>
				</div>
			</div>
		);
	}

	if (error || !professor) {
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
					<p className="text-gray-600">{error || "Professor not found"}</p>
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
					name={`${professor.first_name} ${professor.last_name}`}
					initials={professor.initials || ""}
					reviewCount={reviews.length}
				/>

				<AverageRatingsCard
					averageRating={averageRating}
					hasReviews={reviews.length > 0}
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
