"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { Sparkles, Search, Loader2 } from "lucide-react";
import CourseChip from "./CourseChip";
import type { AcademicProfile, SchedulePreferences } from "@/types";
import type { Course } from "@/lib/types";
import { searchCourses } from "@/lib/services/courseService";

interface AcademicProfileFormProps {
	profile: AcademicProfile;
	setProfile: (p: AcademicProfile) => void;
	preferences: SchedulePreferences;
	setPreferences: (p: SchedulePreferences) => void;
	onGenerate: () => void;
	loading: boolean;
}

export default function AcademicProfileForm({
	profile,
	setProfile,
	preferences,
	setPreferences,
	onGenerate,
	loading,
}: Readonly<AcademicProfileFormProps>) {
	const [courseSearchQuery, setCourseSearchQuery] = useState("");
	const [courseSearchResults, setCourseSearchResults] = useState<Course[]>([]);
	const [courseLoading, setCourseLoading] = useState(false);
	const [showCourseDropdown, setShowCourseDropdown] = useState(false);

	const addCourse = (courseCode: string) => {
		if (courseCode && !profile.completedCourses.includes(courseCode)) {
			setProfile({
				...profile,
				completedCourses: [...profile.completedCourses, courseCode],
			});
		}
		setCourseSearchQuery("");
		setCourseSearchResults([]);
		setShowCourseDropdown(false);
	};

	const removeCourse = (courseCode: string) => {
		setProfile({
			...profile,
			completedCourses: profile.completedCourses.filter(
				(course) => course !== courseCode,
			),
		});
	};

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

	const handleSelectCourse = (course: Course) => {
		addCourse(course.course_code);
	};

	const courseDropdownRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Node;

			if (
				courseDropdownRef.current &&
				!courseDropdownRef.current.contains(target)
			) {
				setShowCourseDropdown(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

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
								onClick={() => handleSelectCourse(course)}
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

	return (
		<div className="bg-white rounded-lg border border-gray-200 p-6">
			<h2 className="text-xl font-bold text-blue-900 mb-2">
				AI Tailored Schedule
			</h2>
			<p className="text-sm text-gray-600 mb-6">
				Get personalized class recommendations based on your academic profile
				and preferences.
			</p>

			<div className="space-y-6">
				<div>
					<h3 className="font-semibold text-blue-900 mb-4">
						Your Academic Profile
					</h3>

					<div className="space-y-4">
						<div>
							<label
								className="block text-sm font-medium text-gray-700 mb-2"
								htmlFor="majorChoice"
							>
								Major
							</label>
							<select
								value={profile.major}
								onChange={(e) =>
									setProfile({ ...profile, major: e.target.value })
								}
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
								id="majorChoice"
							>
								<option>Computer Science</option>
								{/* <option>Mathematics</option>
								<option>Physics</option>
								<option>Engineering</option> */}
							</select>
						</div>

						{/* <div>
							<label
								className="block text-sm font-medium text-gray-700 mb-1"
								htmlFor="yearChoice"
							>
								Enrollment Year
							</label>
							<select
								value={profile.enrollmentYear}
								onChange={(e) =>
									setProfile({ ...profile, enrollmentYear: e.target.value })
								}
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
								id="yearChoice"
							>
								<option>2021</option>
								<option>2022</option>
								<option>2023</option>
								<option>2024</option>
							</select>
						</div> */}

						<div>
							<label
								className="block text-sm font-medium text-gray-700 mb-2"
								htmlFor="completedCourseSearch"
							>
								Completed Courses
							</label>

							<div className="flex flex-wrap gap-2 mb-2">
								{profile.completedCourses.map((courseCode) => (
									<CourseChip
										key={courseCode}
										course={courseCode}
										onRemove={() => removeCourse(courseCode)}
									/>
								))}
							</div>

							<div ref={courseDropdownRef} className="relative">
								<div className="flex items-center bg-white border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
									<Search className="mr-2 text-gray-400" size={18} />
									<input
										id="completedCoursesSearch"
										value={courseSearchQuery}
										onChange={(e) => {
											handleCourseSearch(e.target.value); // your async search
											setShowCourseDropdown(true); // 🔹 open when typing
										}}
										onFocus={() => setShowCourseDropdown(true)} // 🔹 open on focus
										placeholder="Search and add completed courses..."
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
						</div>
					</div>
				</div>

				<div>
					<h3 className="font-semibold text-blue-900 mb-4">
						Schedule Preferences
					</h3>

					<div className="space-y-3">
						<label className="flex items-center gap-2 cursor-pointer">
							<input
								type="checkbox"
								checked={preferences.noWeekendClasses}
								onChange={(e) =>
									setPreferences({
										...preferences,
										noWeekendClasses: e.target.checked,
									})
								}
								className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
							/>
							<span className="text-sm text-gray-700">No weekend classes</span>
						</label>

						<label className="flex items-center gap-2 cursor-pointer">
							<input
								type="checkbox"
								checked={preferences.noLateNightClasses}
								onChange={(e) =>
									setPreferences({
										...preferences,
										noLateNightClasses: e.target.checked,
									})
								}
								className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
							/>
							<span className="text-sm text-gray-700">
								No late night classes
							</span>
						</label>

						<label className="flex items-center gap-2 cursor-pointer">
							<input
								type="checkbox"
								checked={preferences.noMultipleDaysWithLateClasses}
								onChange={(e) =>
									setPreferences({
										...preferences,
										noMultipleDaysWithLateClasses: e.target.checked,
									})
								}
								className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
							/>
							<span className="text-sm text-gray-700">
								No multiple days with late classes
							</span>
						</label>
					</div>

					<div className="mt-4">
						<label
							className="block text-sm font-medium text-gray-700 mb-1"
							htmlFor="preferenceSelect"
						>
							Additional Preferences
						</label>
						<textarea
							value={preferences.additionalPreferences}
							onChange={(e) =>
								setPreferences({
									...preferences,
									additionalPreferences: e.target.value,
								})
							}
							placeholder='E.g., "I prefer morning classes and need Fridays free for my internship"'
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
							rows={3}
							id="preferenceSelect"
						/>
					</div>
				</div>

				<button
					onClick={onGenerate}
					disabled={loading}
					className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-md flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
				>
					<Sparkles size={20} />
					{loading ? "Generating..." : "Generate Tailored Schedule"}
				</button>
			</div>
		</div>
	);
}
