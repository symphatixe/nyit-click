"use client";

import React from "react";
import RatingFeedbackForm from "@/components/professor/RatingFeedbackForm";
import ProfessorLookup from "@/components/professor/ProfessorLookup";

export default function RatingPage() {
	return (
		<div className="max-w-7xl mx-auto px-6 py-8">
			<div className="mb-8">
				<h1 className="text-4xl font-bold text-blue-900">RATE AND FEEDBACK</h1>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<RatingFeedbackForm />
				<ProfessorLookup />
			</div>
		</div>
	);
}
