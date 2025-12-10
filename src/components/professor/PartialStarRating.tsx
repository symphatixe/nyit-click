import { Star } from "lucide-react";

export default function PartialStarRating({
	rating,
	size = 20,
	showValue = false,
	ratingText,
}: Readonly<{
	rating: number;
	size?: number;
	showValue?: boolean;
	ratingText: string;
}>) {
	const fullStars = Math.floor(rating);
	const decimalPart = rating - fullStars;
	const hasPartialStar = decimalPart >= 0.3;

	return (
		<div className="flex items-center gap-2">
			<div className="flex items-center gap-1">
				{[new Array(5)].map((_, i) => {
					if (i < fullStars) {
						return (
							<Star
								key={i + 1}
								size={size}
								className="fill-yellow-500 text-yellow-500"
								aria-hidden="true"
							/>
						);
					}

					if (i === fullStars && hasPartialStar) {
						const fillPercentage = Math.round(decimalPart * 100);
						return (
							<div
								key={i + 1}
								className="relative"
								style={{ width: size, height: size }}
							>
								<Star
									size={size}
									className="text-gray-300"
									aria-hidden="true"
								/>
								<div
									className="absolute top-0 left-0 overflow-hidden"
									style={{ width: `${fillPercentage}%` }}
								>
									<Star
										size={size}
										className="fill-yellow-500 text-yellow-500"
										aria-hidden="true"
									/>
								</div>
							</div>
						);
					}

					return (
						<Star
							key={i + 1}
							size={size}
							className="text-gray-300"
							aria-hidden="true"
						/>
					);
				})}
			</div>
			{showValue && (
				<>
					<span className="text-lg font-semibold text-gray-800">
						{rating.toFixed(1)}
					</span>
					<p className="text-sm text-gray-600">{ratingText}</p>
				</>
			)}
			<span className="sr-only">{rating.toFixed(1)} out of 5 stars</span>
		</div>
	);
}
