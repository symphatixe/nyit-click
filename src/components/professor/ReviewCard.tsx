import StarRating from "./StarRating";
import type { ProfessorReview } from "@/types";

export default function ReviewCard({
	review,
}: Readonly<{ review: ProfessorReview }>) {
	return (
		<article className="bg-gray-50 rounded-md border border-gray-100 p-4">
			<header className="mb-3">
				<p className="font-semibold text-gray-800">{review.studentName}</p>
				<p className="text-xs text-gray-500">
					{review.courseCode} · {new Date(review.date).toLocaleDateString()}
				</p>
			</header>

			<div className="grid grid-cols-3 gap-4 mb-3">
				<div>
					<p className="text-gray-600 text-xs mb-1">Workload</p>
					<StarRating rating={review.workloadRating} size={14} />
				</div>
				<div>
					<p className="text-gray-600 text-xs mb-1">Content</p>
					<StarRating rating={review.contentRating} size={14} />
				</div>
				<div>
					<p className="text-gray-600 text-xs mb-1">Teaching</p>
					<StarRating rating={review.professorRating} size={14} />
				</div>
			</div>

			<p className="text-sm text-gray-700 mb-3">{review.feedback}</p>

			{review.tags.length > 0 && (
				<div className="flex flex-wrap gap-2">
					{review.tags.map((tag) => (
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
