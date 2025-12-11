"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader2 } from "lucide-react";
import { searchProfessors, getProfessorCommonTags } from "@/lib/services/professorService";
import type { Professor } from "@/lib/types";

export default function ProfessorLookup() {
	const router = useRouter();
	const [searchQuery, setSearchQuery] = useState("");
	const [professorsToDisplay, setProfessorsToDisplay] = useState<
		Array<Professor & { commonTags?: string[] }>
	>([]);
	const [loading, setLoading] = useState(false);
	const [initialLoadComplete, setInitialLoadComplete] = useState(false);

	// Load initial top 5 professors
	useEffect(() => {
		const loadInitialProfessors = async () => {
			setLoading(true);
			try {
				const professors = await searchProfessors("");
				const professorsWithTags = await Promise.all(
					professors.map(async (prof) => ({
						...prof,
						commonTags: await getProfessorCommonTags(prof.id),
					}))
				);
				setProfessorsToDisplay(professorsWithTags);
				setInitialLoadComplete(true);
			} catch (error) {
				console.error("Error loading professors:", error);
				setInitialLoadComplete(true);
			} finally {
				setLoading(false);
			}
		};

		loadInitialProfessors();
	}, []);

	// Handle search
	const handleSearch = useCallback(
		async (query: string) => {
			setSearchQuery(query);

			if (!query.trim()) {
				// Show initial top 5 when cleared
				setLoading(true);
				try {
					const professors = await searchProfessors("");
					const professorsWithTags = await Promise.all(
						professors.map(async (prof) => ({
							...prof,
							commonTags: await getProfessorCommonTags(prof.id),
						}))
					);
					setProfessorsToDisplay(professorsWithTags);
				} catch (error) {
					console.error("Error loading professors:", error);
				} finally {
					setLoading(false);
				}
				return;
			}

			// Search professors
			setLoading(true);
			try {
				const results = await searchProfessors(query);
				const professorsWithTags = await Promise.all(
					results.map(async (prof) => ({
						...prof,
						commonTags: await getProfessorCommonTags(prof.id),
					}))
				);
				setProfessorsToDisplay(professorsWithTags);
			} catch (error) {
				console.error("Error searching professors:", error);
				setProfessorsToDisplay([]);
			} finally {
				setLoading(false);
			}
		},
		[]
	);

	const handleProfessorClick = (profId: string) => {
		router.push(`/dashboard/rating/professor/${profId}`);
	};

	return (
		<div className="bg-white rounded-lg border border-gray-200 p-6 h-fit">
			<div>
				<h2 className="text-2xl font-bold text-blue-900">Professor lookup</h2>
				<p className="mt-1 text-sm text-gray-600">
					Find professors and read what your classmates have to say
				</p>
			</div>

			<div className="mt-4 mb-6">
				<div className="flex items-center bg-white border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
					<Search className="mr-2 text-gray-400" size={18} />
					<input
						value={searchQuery}
						onChange={(e) => handleSearch(e.target.value)}
						placeholder="Search professors by name..."
						className="w-full text-sm bg-transparent outline-none"
					/>
					{loading && <Loader2 className="animate-spin text-gray-400" size={18} />}
				</div>
			</div>

			<div className="space-y-3 max-h-96 overflow-y-auto">
				{loading && !initialLoadComplete ? (
					<div className="text-center py-8">
						<p className="text-sm text-gray-500">Loading professors...</p>
					</div>
				) : professorsToDisplay.length > 0 ? (
					professorsToDisplay.map((prof) => (
						<button
							key={prof.id}
							onClick={() => handleProfessorClick(prof.id)}
							aria-label={`View ${prof.first_name} ${prof.last_name}'s profile`}
							className="w-full text-left bg-gray-50 border border-gray-100 rounded-md p-4 cursor-pointer transition-all duration-200 hover:shadow-md hover:border-blue-300 hover:scale-[1.02] active:scale-[0.98]"
						>
							<div className="flex items-start gap-3">
								<div className="w-12 h-12 rounded-full bg-blue-900 text-white flex items-center justify-center shrink-0 font-semibold text-sm">
									{prof.initials}
								</div>

								<div className="min-w-0 flex-1">
									<h3 className="font-semibold text-gray-800 text-sm">
										{prof.first_name} {prof.last_name}
									</h3>
									<div className="mt-2 flex flex-wrap gap-1">
										{prof.commonTags && prof.commonTags.length > 0 ? (
											prof.commonTags.map((tag) => (
												<span
													key={tag}
													className="inline-block text-xs bg-blue-100 text-blue-900 px-2 py-1 rounded-full"
												>
													{tag}
												</span>
											))
										) : (
											<span className="text-xs text-gray-400">No tags yet</span>
										)}
									</div>
								</div>
							</div>
						</button>
					))
				) : searchQuery.trim() ? (
					<div className="text-center py-8">
						<p className="text-sm text-gray-500">
							There is no professor with that name. Did you misspell it?
						</p>
					</div>
				) : (
					<div className="text-center py-8">
						<p className="text-sm text-gray-500">No professors found</p>
					</div>
				)}
			</div>
		</div>
	);
}

