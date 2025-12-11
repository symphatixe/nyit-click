import StarRating from "./StarRating";
import type { ProfessorReviewWithCourseInfo, CourseInfo } from "@/lib/types";

export default function ReviewCard({
	review,
}: Readonly<{ review: ProfessorReviewWithCourseInfo }>) {
	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	const courseInfo: CourseInfo = review.courses;

	return (
		<article className="bg-gray-50 rounded-md border border-gray-100 p-4">
			<header className="mb-3">
				<p className="text-xs text-gray-500">{formatDate(review.created_at)}</p>
			</header>

			<div className="mb-3">
				<p className="text-gray-600 text-xs mb-1">Rating</p>
				<StarRating rating={review.rating} size={14} />
			</div>

			<div className="mb-3 border-b bg-primary border-gray-200 rounded-md px-3 py-1 inline-block">
				<p className="text-sm text-white">
					<strong>Course:</strong> {courseInfo.course_code} - {courseInfo.name}
				</p>
			</div>

			<p className="text-sm text-gray-700 mb-3">{review.review_text}</p>

			{review.review_tags && review.review_tags.length > 0 && (
				<div className="flex flex-wrap gap-2">
					{review.review_tags.map((tag) => (
						<span
							key={tag}
							className="inline-block text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded"
						>
							{tag}
						</span>
					))}
				</div>
			)}
		</article>
	);
}
