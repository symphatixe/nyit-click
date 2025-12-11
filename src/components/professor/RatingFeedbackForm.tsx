"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { Star, Search, Loader2 } from "lucide-react";
import { searchProfessors } from "@/lib/services/professorService";
import { searchCourses } from "@/lib/services/courseService";
import { createClient } from "@/lib/utils/database/supabase/client";
import type { Course, Professor } from "@/lib/types";
import { TAGS } from "@/lib/data";

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
						type="button"
					>
						<Star
							size={28}
							className={
								star <= rating
									? "fill-yellow-500 text-yellow-500"
									: "text-gray-300"
							}
						/>
					</button>
				))}
			</div>
		</div>
	);
};

export default function RatingFeedbackForm() {
	const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
	const [courseSearchQuery, setCourseSearchQuery] = useState("");
	const [courseSearchResults, setCourseSearchResults] = useState<Course[]>([]);
	const [courseLoading, setCourseLoading] = useState(false);
	const [showCourseDropdown, setShowCourseDropdown] = useState(false);

	const [selectedProfessor, setSelectedProfessor] = useState<Professor | null>(
		null,
	);
	const [professorSearchQuery, setProfessorSearchQuery] = useState("");
	const [profSearchResults, setProfSearchResults] = useState<Professor[]>([]);
	const [loading, setLoading] = useState(false);
	const [showProfessorDropdown, setShowProfessorDropdown] = useState(false);

	const [rating, setRating] = useState(0);
	const [feedback, setFeedback] = useState("");
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [thanks, setThanks] = useState(false);

	const handleProfessorSearch = useCallback(async (query: string) => {
		setProfessorSearchQuery(query);
		if (!query.trim()) {
			setProfSearchResults([]);
			return;
		}

		setLoading(true);
		try {
			const results = await searchProfessors(query);
			setProfSearchResults(results);
		} catch (error) {
			console.error("Error searching professors:", error);
			setProfSearchResults([]);
		} finally {
			setLoading(false);
		}
	}, []);

	const handleCourseSearch = useCallback(async (query: string) => {
		setCourseSearchQuery(query);
		if (!query.trim()) {
			setCourseSearchResults([]);
			return;
		}

		setCourseLoading(true);
		try {
			const results = await searchCourses(query);
			setCourseSearchResults(results);
		} catch (error) {
			console.error("Error searching courses:", error);
			setCourseSearchResults([]);
		} finally {
			setCourseLoading(false);
		}
	}, []);

	const selectProfessor = (professor: Professor) => {
		setSelectedProfessor(professor);
		setProfessorSearchQuery(`${professor.first_name} ${professor.last_name}`);
		setShowProfessorDropdown(false);
		setProfSearchResults([]);
	};

	const clearProfessor = () => {
		setSelectedProfessor(null);
		setProfessorSearchQuery("");
		setProfSearchResults([]);
	};

	const selectCourse = (course: Course) => {
		setSelectedCourse(course);
		setCourseSearchQuery(`${course.course_code} - ${course.name}`);
		setShowCourseDropdown(false);
		setCourseSearchResults([]);
	};

	const clearCourse = () => {
		setSelectedCourse(null);
		setCourseSearchQuery("");
		setCourseSearchResults([]);
	};

	const toggleTag = (tag: string) => {
		if (selectedTags.includes(tag)) {
			setSelectedTags(selectedTags.filter((t) => t !== tag));
		} else if (selectedTags.length < 3) {
			setSelectedTags([...selectedTags, tag]);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!selectedCourse || !selectedProfessor || rating === 0) {
			alert("Please fill in all required fields");
			return;
		}

		setIsSubmitting(true);
		try {
			const client = createClient();

			const {
				data: { user },
			} = await client.auth.getUser();

			if (!user) {
				alert("You must be logged in to submit feedback");
				return;
			}

			const { error } = await client.from("course_reviews").insert([
				{
					user_id: user.id,
					course_id: selectedCourse.id,
					rating,
					review_text: feedback,
					review_tags: selectedTags,
					professor_id: selectedProfessor.id,
					created_at: new Date().toISOString(),
				},
			]);

			if (error) {
				console.error("Error submitting feedback:", error);
				alert("Failed to submit feedback. Please try again.");
				return;
			}

			setSelectedCourse(null);
			setCourseSearchQuery("");
			setSelectedProfessor(null);
			setProfessorSearchQuery("");
			setRating(0);
			setFeedback("");
			setSelectedTags([]);
			setThanks(true);
		} catch (error) {
			console.error("Error:", error);
			alert("An unexpected error occurred");
		} finally {
			setIsSubmitting(false);
		}
	};

	const getDropdownContent = () => {
		if (courseLoading) {
			return (
				<div className="p-4 text-center text-gray-500">Loading courses...</div>
			);
		}

		if (courseSearchResults.length > 0) {
			return (
				<ul className="max-h-64 overflow-y-auto">
					{courseSearchResults.map((course) => (
						<li key={course.id}>
							<button
								type="button"
								onClick={() => selectCourse(course)}
								className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors border-b last:border-b-0"
							>
								<div className="font-medium text-gray-800">
									{course.course_code} - {course.name}
								</div>
								{course.credits != null && (
									<div className="text-xs text-gray-500">
										{course.credits} credits
									</div>
								)}
							</button>
						</li>
					))}
				</ul>
			);
		}

		if (courseSearchQuery.trim()) {
			return (
				<div className="p-4 text-center text-gray-500">
					There is no course with that name.
				</div>
			);
		}

		return (
			<div className="p-4 text-center text-gray-500">
				Start typing to search...
			</div>
		);
	};

	const getProfessorDropdownContent = () => {
		if (loading) {
			return (
				<div className="p-4 text-center text-gray-500">
					Loading professors...
				</div>
			);
		}

		if (profSearchResults.length > 0) {
			return (
				<ul className="max-h-64 overflow-y-auto">
					{profSearchResults.map((prof) => (
						<li key={prof.id}>
							<button
								type="button"
								onClick={() => selectProfessor(prof)}
								className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors border-b last:border-b-0"
							>
								<div className="font-medium text-gray-800">
									{prof.first_name} {prof.last_name}
								</div>
							</button>
						</li>
					))}
				</ul>
			);
		}

		if (professorSearchQuery.trim()) {
			return (
				<div className="p-4 text-center text-gray-500">
					There is no professor with that name. Did you misspell it?
				</div>
			);
		}

		return (
			<div className="p-4 text-center text-gray-500">
				Start typing to search...
			</div>
		);
	};

	const courseDropdownRef = useRef<HTMLDivElement | null>(null);
	const professorDropdownRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Node;

			if (
				courseDropdownRef.current &&
				!courseDropdownRef.current.contains(target)
			) {
				setShowCourseDropdown(false);
			}

			if (
				professorDropdownRef.current &&
				!professorDropdownRef.current.contains(target)
			) {
				setShowProfessorDropdown(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div className="bg-white rounded-lg border border-gray-200 p-6">
			<p className="text-sm text-gray-600 mb-6">
				Share your thoughts about your courses
			</p>

			<form onSubmit={handleSubmit} className="space-y-6">
				{/* Course selector */}
				<div>
					<label
						className="block text-sm font-semibold text-gray-700 mb-3"
						htmlFor="courseSearch"
					>
						Select course
					</label>
					<div ref={courseDropdownRef} className="relative">
						<div className="flex items-center bg-white border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
							<Search className="mr-2 text-gray-400" size={18} />
							<input
								id="completedCoursesSearch"
								value={courseSearchQuery}
								onChange={(e) => {
									handleCourseSearch(e.target.value);
									setShowCourseDropdown(true);
								}}
								onFocus={() => setShowCourseDropdown(true)}
								placeholder="Search courses"
								className="w-full text-sm bg-transparent outline-none"
							/>
							{courseLoading && (
								<Loader2 className="animate-spin text-gray-400" size={18} />
							)}
						</div>

						{showCourseDropdown && (
							<div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg z-10">
								{getDropdownContent()}
							</div>
						)}
					</div>

					{selectedCourse && (
						<div className="mt-2 flex items-center justify-between bg-blue-50 border border-blue-200 rounded-md px-3 py-2">
							<span className="text-sm font-medium text-blue-900">
								{selectedCourse.course_code} - {selectedCourse.name}
							</span>
							<button
								type="button"
								onClick={clearCourse}
								className="text-blue-600 hover:text-blue-800 text-sm font-medium"
							>
								Clear
							</button>
						</div>
					)}
				</div>

				{/* Professor selector */}
				<div>
					<label
						className="block text-sm font-semibold text-gray-700 mb-3"
						htmlFor="professorSearch"
					>
						Select professor
					</label>
					<div ref={professorDropdownRef} className="relative">
						<div className="flex items-center bg-white border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
							<Search className="mr-2 text-gray-400" size={18} />
							<input
								id="professorSearch"
								value={professorSearchQuery}
								onChange={(e) => {
									handleProfessorSearch(e.target.value);
									setShowProfessorDropdown(true);
								}}
								onFocus={() => setShowProfessorDropdown(true)}
								placeholder="Search professors..."
								className="w-full text-sm bg-transparent outline-none"
								required={!selectedProfessor}
							/>
							{loading && (
								<Loader2 className="animate-spin text-gray-400" size={18} />
							)}
						</div>

						{showProfessorDropdown && (
							<div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg z-10">
								{getProfessorDropdownContent()}
							</div>
						)}
					</div>

					{selectedProfessor && (
						<div className="mt-2 flex items-center justify-between bg-blue-50 border border-blue-200 rounded-md px-3 py-2">
							<span className="text-sm font-medium text-blue-900">
								{selectedProfessor.first_name} {selectedProfessor.last_name}
							</span>
							<button
								type="button"
								onClick={clearProfessor}
								className="text-blue-600 hover:text-blue-800 text-sm font-medium"
							>
								Clear
							</button>
						</div>
					)}
				</div>

				{/* Rating */}
				<div>
					<label
						className="block text-sm font-semibold text-gray-700 mb-3"
						htmlFor="ratingInput"
					>
						Rate your experience
					</label>
					<StarRating label="Rating" rating={rating} onRating={setRating} />
				</div>

				{/* Feedback */}
				<div>
					<label
						className="block text-sm font-semibold text-gray-700 mb-2"
						htmlFor="feedbackText"
					>
						Written feedback
					</label>
					<div className="relative">
						<textarea
							id="feedbackText"
							value={feedback}
							onChange={(e) => setFeedback(e.target.value.slice(0, 300))}
							maxLength={300}
							placeholder="Share your detailed thoughts..."
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
							rows={4}
						/>
						<div className="text-xs text-gray-500 mt-1">
							{feedback.length}/300 characters
						</div>
					</div>
				</div>

				{/* Tags */}
				<div>
					<label
						className="block text-sm font-semibold text-gray-700 mb-3"
						htmlFor="tagsInput"
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
								id="tagsInput"
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
					disabled={isSubmitting}
					className="w-full px-4 py-2 bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-300 text-white rounded-md font-semibold transition-colors"
				>
					{isSubmitting ? "Submitting..." : "Submit Feedback"}
				</button>
			</form>

			{thanks && (
				<div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
					<p className="text-sm text-green-800 font-medium">
						Your review was uploaded. Thank you for your feedback!
					</p>
				</div>
			)}
		</div>
	);
}
