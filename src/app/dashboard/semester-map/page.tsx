"use client";

import { useRouter } from "next/navigation";
import SemesterMap from "@/components/semester-map/SemesterMap";

export default function SemesterMapPage() {
	const router = useRouter();

	const handleSubmit = () => {
		router.push("/dashboard/ai-planner");
	};

	const handleCancel = () => {
		router.back();
	};

	return <SemesterMap onSubmit={handleSubmit} onCancel={handleCancel} />;
}
