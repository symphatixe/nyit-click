"use client";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	className?: string;
}

export default function Pagination({
	currentPage,
	totalPages,
	onPageChange,
	className = "",
}: Readonly<PaginationProps>) {
	if (totalPages <= 1) return null;

	const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

	const handlePageClick = (page: number) => {
		if (page < 1 || page > totalPages || page === currentPage) return;
		onPageChange(page);
	};

	return (
		<div
			className={`flex items-center justify-center gap-2 mt-6 text-sm ${className}`}
		>
			<button
				type="button"
				onClick={() => handlePageClick(currentPage - 1)}
				disabled={currentPage === 1}
				className="px-3 py-1 rounded border border-gray-300 text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
				aria-label="Previous page"
			>
				Previous
			</button>

			{pages.map((page) => (
				<button
					key={page}
					type="button"
					onClick={() => handlePageClick(page)}
					className={`px-3 py-1 rounded border text-sm ${
						page === currentPage
							? "bg-blue-900 text-white border-blue-900"
							: "border-gray-300 text-gray-700 hover:bg-gray-100"
					}`}
				>
					{page}
				</button>
			))}

			<button
				type="button"
				onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
				disabled={currentPage === totalPages}
				className="px-3 py-1 rounded border border-gray-300 text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
				aria-label="Next page"
			>
				Next
			</button>
		</div>
	);
}
