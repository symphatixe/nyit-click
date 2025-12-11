import StarRating from "./StarRating";
import type { CourseReview } from "@/lib/types";

export default function ReviewCard({
	review,
}: Readonly<{ review: CourseReview }>) {
	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	return (
		<article className="bg-gray-50 rounded-md border border-gray-100 p-4">
			<header className="mb-3">
				<p className="text-xs text-gray-500">
					{formatDate(review.created_at)}
				</p>
			</header>

			<div className="mb-3">
				<p className="text-gray-600 text-xs mb-1">Rating</p>
				<StarRating rating={review.rating} size={14} />
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
