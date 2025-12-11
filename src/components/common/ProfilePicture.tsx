"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/lib/utils/database/supabase/client";

const ProfilePic: React.FC = () => {
	const [initials, setInitials] = useState("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const getInitials = (firstName: string, lastName: string) =>
		`${firstName[0]?.toUpperCase() || ""}${lastName[0]?.toUpperCase() || ""}`;

	useEffect(() => {
		async function fetchUserInitials() {
			try {
				const supabase = createClient();

				const { data: authData, error: userError } =
					await supabase.auth.getUser();

				if (userError || !authData.user) {
					setError("Unable to fetch user");
					setLoading(false);
					return;
				}

				const { data: userData, error: dbError } = await supabase
					.from("users")
					.select("first_name, last_name")
					.eq("id", authData.user.id)
					.single();
				if (dbError || !userData) {
					setError("Unable to fetch user data");
					setLoading(false);
					return;
				}

				const userInitials = getInitials(
					userData.first_name,
					userData.last_name,
				);
				setInitials(userInitials);
				setLoading(false);
			} catch {
				setError("An error occurred");
				setLoading(false);
			}
		}

		fetchUserInitials();
	}, []);

	if (loading) {
		return (
			<div className="flex items-center justify-center w-25 h-25 rounded-full border-3 border-[#002D72] bg-gray-50">
				<span className="text-4xl font-semibold text-[#002D72]">...</span>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex items-center justify-center w-25 h-25 rounded-full border-3 border-[#002D72] bg-gray-50">
				<span className="text-4xl font-semibold text-[#002D72]">?</span>
			</div>
		);
	}

	return (
		<div className="flex items-center justify-center w-25 h-25 rounded-full border-3 border-[#002D72] bg-gray-50">
			<span className="text-4xl font-semibold text-[#002D72]">{initials}</span>
		</div>
	);
};
export default ProfilePic;
