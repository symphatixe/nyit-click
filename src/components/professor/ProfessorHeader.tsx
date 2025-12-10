export default function ProfessorHeader({
	name,
	initials,
	reviewCount,
}: Readonly<{ name: string; initials: string; reviewCount: number }>) {
	return (
		<div className="bg-white rounded-lg border border-gray-200 p-6">
			<div className="flex items-start gap-4">
				<div
					className="w-16 h-16 rounded-full bg-blue-900 text-white flex items-center justify-center shrink-0 font-semibold text-xl"
					aria-hidden="true"
				>
					{initials}
				</div>

				<div className="flex-1 min-w-0">
					<h1 className="text-3xl font-bold text-blue-900">{name}</h1>
					<p className="mt-2 text-gray-600">
						{reviewCount} {reviewCount === 1 ? "review" : "reviews"}
					</p>
				</div>
			</div>
		</div>
	);
}
