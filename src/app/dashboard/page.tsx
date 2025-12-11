"use client";

import { useRouter } from "next/navigation";
import SemesterMap from "@/components/semester-map/SemesterMap";

export default function SemesterMapPage() {
	const router = useRouter();

	const handleSubmit = (completedCourses: string[]) => {
		console.log("Completed courses:", completedCourses);
		router.push("/dashboard/ai-planner");
	};

	const handleDismiss = () => {
		router.back();
	};

	return <SemesterMap onSubmit={handleSubmit} onDismiss={handleDismiss} />;
}
