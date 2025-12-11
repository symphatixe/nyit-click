import PartialStarRating from "./PartialStarRating";

interface AverageRatingsCardProps {
	averageRating: number;
	hasReviews: boolean;
}

export default function AverageRatingsCard({
	averageRating,
	hasReviews,
}: Readonly<AverageRatingsCardProps>) {
	return (
		<section className="bg-white rounded-lg border border-gray-200 p-6">
			<h2 className="text-lg font-bold text-blue-900 mb-4 text-center">
				Average Rating
			</h2>

			{hasReviews ? (
				<div className="flex items-center justify-center">
					<PartialStarRating
						rating={averageRating}
						showValue
						ratingText="Overall Rating"
					/>
				</div>
			) : (
				<p className="text-gray-500 text-center">No ratings available yet</p>
			)}
		</section>
	);
}
