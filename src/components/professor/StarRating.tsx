import { Star } from "lucide-react";

export default function StarRating({
	rating,
	size = 20,
	showValue = false,
	className = "",
}: Readonly<{
	rating: number;
	size?: number;
	showValue?: boolean;
	className?: string;
}>) {
	return (
		<div className={`flex items-center gap-2 ${className}`}>
			<div className="flex gap-1">
				{[new Array(5)].map((_, i) => (
					<Star
						key={i + 1}
						size={size}
						className={
							i < rating ? "fill-yellow-500 text-yellow-500" : "text-gray-300"
						}
						aria-hidden="true"
					/>
				))}
			</div>
			{showValue && (
				<span className="text-sm font-semibold text-gray-700">{rating}/5</span>
			)}
			<span className="sr-only">{rating} out of 5 stars</span>
		</div>
	);
}
