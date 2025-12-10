"use client";

import { useRouter } from "next/navigation";
import SemesterMap from "@/components/semester-map/SemesterMap";

export default function SemesterMapPage() {
	const router = useRouter();

	const handleSubmit = (completedCourses: string[]) => {
		console.log("Saved courses:", completedCourses);
		// Optional: Show success toast or redirect
		// router.push("/ai-planner");
	};

	const handleDismiss = () => {
		router.back(); // Go back to previous page
	};

	return (
		<div className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100 py-8">
			<SemesterMap onSubmit={handleSubmit} onDismiss={handleDismiss} />
		</div>
	);
}
