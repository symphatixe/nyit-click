"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";
import { mockSchedule } from "@/lib/mockData";

const TAGS = [
	"easy homework",
	"hard homework",
	"group projects",
	"helpful office hours",
	"fair grading",
	"heavy reading",
	"hard exams",
	"engaging lectures",
	"lenient grading",
	"strict attendance",
	"lots of assignments",
	"practical applications",
];

interface StarRatingProps {
	label: string;
	rating: number;
	onRating: (value: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ label, rating, onRating }) => {
	return (
		<div className="mb-4">
			<label className="block text-sm font-medium text-gray-700 mb-2">
				{label}
			</label>
			<div className="flex gap-2">
				{[1, 2, 3, 4, 5].map((star) => (
					<button
						key={star}
						onClick={() => onRating(star)}
						className="focus:outline-none transition-transform hover:scale-110"
					>
						<Star
							size={28}
							className={`${
								star <= rating
									? "fill-yellow-500 text-yellow-500"
									: "text-gray-300"
							}`}
						/>
					</button>
				))}
			</div>
		</div>
	);
};

export default function RatingFeedbackForm() {
	const [selectedCourse, setSelectedCourse] = useState("");
	const [selectedProfessor, setSelectedProfessor] = useState("");
	const [workloadRating, setWorkloadRating] = useState(0);
	const [contentRating, setContentRating] = useState(0);
	const [professorRating, setProfessorRating] = useState(0);
	const [feedback, setFeedback] = useState("");
	const [selectedTags, setSelectedTags] = useState<string[]>([]);

	// Get unique courses from mock schedule
	const courses = Array.from(
		new Map(mockSchedule.map((s) => [s.courseCode, s.courseCode])).values(),
	);

	const toggleTag = (tag: string) => {
		if (selectedTags.includes(tag)) {
			setSelectedTags(selectedTags.filter((t) => t !== tag));
		} else if (selectedTags.length < 3) {
			setSelectedTags([...selectedTags, tag]);
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log({
			course: selectedCourse,
			professor: selectedProfessor,
			workloadRating,
			contentRating,
			professorRating,
			feedback,
			tags: selectedTags,
		});
		// TODO: submit to API
	};

	return (
		<div className="bg-white rounded-lg border border-gray-200 p-6">
			<p className="text-sm text-gray-600 mb-6">
				Share your thoughts about your courses
			</p>

			<form onSubmit={handleSubmit} className="space-y-6">
				<div>
					<label
						className="block text-sm font-semibold text-gray-700 mb-3"
						htmlFor="courseSelect"
					>
						Select course and professor
					</label>
					<div className="grid grid-cols-2 gap-3">
						<select
							value={selectedCourse}
							onChange={(e) => setSelectedCourse(e.target.value)}
							className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
							id="courseSelect"
						>
							<option value="">Courses</option>
							{courses.map((course) => (
								<option key={course} value={course}>
									{course}
								</option>
							))}
						</select>

						<select
							value={selectedProfessor}
							onChange={(e) => setSelectedProfessor(e.target.value)}
							className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
						>
							<option value="">Professors</option>
							<option value="Dr. Smith">Dr. Smith</option>
							<option value="Dr. Johnson">Dr. Johnson</option>
							<option value="Prof. Williams">Prof. Williams</option>
						</select>
					</div>
				</div>

				<div>
					<label
						className="block text-sm font-semibold text-gray-700 mb-3"
						htmlFor="starRating"
					>
						Rate your experience
					</label>
					<StarRating
						label="Workload and difficulty"
						rating={workloadRating}
						onRating={setWorkloadRating}
					/>
					<StarRating
						label="Course content"
						rating={contentRating}
						onRating={setContentRating}
					/>
					<StarRating
						label="Professor"
						rating={professorRating}
						onRating={setProfessorRating}
					/>
				</div>

				<div>
					<label
						className="block text-sm font-semibold text-gray-700 mb-2"
						htmlFor="feedbackText"
					>
						Written feedback
					</label>
					<div className="relative">
						<textarea
							value={feedback}
							onChange={(e) => setFeedback(e.target.value.slice(0, 300))}
							maxLength={300}
							placeholder="Share your detailed thoughts..."
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
							rows={4}
							id="feedbackText"
						/>
						<div className="text-xs text-gray-500 mt-1">
							{feedback.length}/300 characters
						</div>
					</div>
				</div>

				<div>
					<label
						className="block text-sm font-semibold text-gray-700 mb-3"
						htmlFor="tags"
					>
						Select up to 3 tags
					</label>
					<div className="flex flex-wrap gap-2">
						{TAGS.map((tag) => (
							<button
								key={tag}
								type="button"
								onClick={() => toggleTag(tag)}
								className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
									selectedTags.includes(tag)
										? "bg-blue-900 text-white"
										: "bg-gray-100 text-gray-700 hover:bg-gray-200"
								} ${
									selectedTags.length >= 3 && !selectedTags.includes(tag)
										? "opacity-50 cursor-not-allowed"
										: ""
								}`}
								disabled={
									selectedTags.length >= 3 && !selectedTags.includes(tag)
								}
								id="tags"
							>
								{tag}
							</button>
						))}
					</div>
					<div className="text-xs text-gray-500 mt-2">
						{selectedTags.length}/3 tags selected
					</div>
				</div>

				<button
					type="submit"
					className="w-full px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md font-semibold transition-colors"
				>
					Submit Feedback
				</button>
			</form>
		</div>
	);
}
