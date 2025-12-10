import PartialStarRating from "./PartialStarRating";

interface AverageRatingsCardProps {
	averageRatings: {
		workload: number;
		content: number;
		professor: number;
	};
	hasReviews: boolean;
}

export default function AverageRatingsCard({
	averageRatings,
	hasReviews,
}: Readonly<AverageRatingsCardProps>) {
	return (
		<section className="bg-white rounded-lg border border-gray-200 p-6">
			<h2 className="text-lg font-bold text-blue-900 mb-4 text-center">
				Average Ratings
			</h2>

			{hasReviews ? (
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					<div className="flex items-center justify-center">
						<PartialStarRating
							rating={averageRatings.workload}
							showValue
							ratingText="Workload"
						/>
					</div>

					<div className="flex items-center justify-center">
						<PartialStarRating
							rating={averageRatings.content}
							showValue
							ratingText="Content Quality"
						/>
					</div>

					<div className="flex items-center justify-center">
						<PartialStarRating
							rating={averageRatings.professor}
							showValue
							ratingText="Teaching Quality"
						/>
					</div>
				</div>
			) : (
				<p className="text-gray-500">No ratings available yet</p>
			)}
		</section>
	);
}
