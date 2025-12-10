import ReviewCard from "./ReviewCard";
import Pagination from "@/components/common/Pagination";
import type { ProfessorReview } from "@/types";

interface ReviewsListProps {
	reviews: ProfessorReview[];
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export default function ReviewsList({
	reviews,
	currentPage,
	totalPages,
	onPageChange,
}: Readonly<ReviewsListProps>) {
	return (
		<section className="bg-white rounded-lg border border-gray-200 p-6">
			<h2 className="text-lg font-bold text-blue-900 mb-4">
				Student Reviews {reviews.length > 0 && `(${reviews.length})`}
			</h2>

			{reviews.length > 0 ? (
				<>
					<div className="space-y-4">
						{reviews.map((review) => (
							<ReviewCard key={review.id} review={review} />
						))}
					</div>

					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={onPageChange}
					/>
				</>
			) : (
				<p className="text-gray-500 text-center py-8">
					No reviews yet. Be the first to review!
				</p>
			)}
		</section>
	);
}
