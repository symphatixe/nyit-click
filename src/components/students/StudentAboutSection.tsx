"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/lib/utils/database/supabase/client";

export default function StudentAboutSection({
	studentId,
}: Readonly<{ studentId: string }>) {
	const [bio, setBio] = useState("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchStudentBio() {
			try {
				const supabase = createClient();

				const { data: userData, error: dbError } = await supabase
					.from("users")
					.select("bio")
					.eq("id", studentId)
					.single();

				if (dbError) {
					setError("Unable to fetch bio");
					setLoading(false);
					return;
				}

				setBio(userData?.bio || "");
				setLoading(false);
			} catch {
				setError("An error occurred");
				setLoading(false);
			}
		}

		fetchStudentBio();
	}, [studentId]);

	if (loading) {
		return (
			<div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
				<div className="animate-pulse">
					<div className="h-6 bg-gray-200 rounded w-24 mb-4"></div>
					<div className="h-20 bg-gray-200 rounded"></div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
				<p className="text-red-600 text-sm">{error}</p>
			</div>
		);
	}

	return (
		<div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
			<h2 className="text-lg font-bold text-blue-900 mb-3">About</h2>
			{bio ? (
				<p className="text-gray-700 leading-relaxed">{bio}</p>
			) : (
				<p className="text-gray-500 italic">
					This user has not added a bio yet.
				</p>
			)}
		</div>
	);
}
