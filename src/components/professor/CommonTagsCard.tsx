export default function CommonTagsCard({
	tagCounts,
}: Readonly<{ tagCounts: [string, number][] }>) {
	if (tagCounts.length === 0) return null;

	return (
		<section className="bg-white rounded-lg border border-gray-200 p-6">
			<h2 className="text-lg font-bold text-blue-900 mb-4">Common Tags</h2>
			<div className="flex flex-wrap gap-2">
				{tagCounts.map(([tag, count]) => (
					<div
						key={tag}
						className="inline-flex items-center gap-2 bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm"
					>
						<span>{tag}</span>
						<span className="font-semibold">{count}</span>
					</div>
				))}
			</div>
		</section>
	);
}
