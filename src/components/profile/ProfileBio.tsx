"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/lib/utils/database/supabase/client";
import { Edit2 } from "lucide-react";
import { CheckForProfanity } from "@/lib/utils/validators";

const ProfileBio: React.FC = () => {
	const [bio, setBio] = useState("");
	const [isEditing, setIsEditing] = useState(false);
	const [editValue, setEditValue] = useState("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [saveError, setSaveError] = useState<string | null>(null);
	const [isSaving, setIsSaving] = useState(false);
	const [charCount, setCharCount] = useState(0);

	const MAX_CHARS = 200;

	// Fetch user bio on mount
	useEffect(() => {
		async function fetchBio() {
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
					.select("bio")
					.eq("id", authData.user.id)
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

		fetchBio();
	}, []);

	const handleEditClick = () => {
		setEditValue(bio);
		setCharCount(bio.length);
		setIsEditing(true);
		setSaveError(null);
	};

	const handleCancel = () => {
		setIsEditing(false);
		setEditValue("");
		setSaveError(null);
	};

	const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const value = e.target.value.slice(0, MAX_CHARS);
		setEditValue(value);
		setCharCount(value.length);
		setSaveError(null);
	};

	const handleSave = async () => {
		// Validate profanity
		if (CheckForProfanity(editValue)) {
			setSaveError("Bio contains inappropriate language. Please revise.");
			return;
		}

		// Validate length
		if (editValue.length > MAX_CHARS) {
			setSaveError(`Bio must be ${MAX_CHARS} characters or less.`);
			return;
		}

		setIsSaving(true);
		try {
			const supabase = createClient();

			const { data: authData } = await supabase.auth.getUser();

			if (!authData.user) {
				setSaveError("Unable to identify user");
				setIsSaving(false);
				return;
			}

			const { error: updateError } = await supabase
				.from("users")
				.update({ bio: editValue })
				.eq("id", authData.user.id);

			if (updateError) {
				setSaveError("Failed to save bio. Please try again.");
				setIsSaving(false);
				return;
			}

			setBio(editValue);
			setIsEditing(false);
			setEditValue("");
			setSaveError(null);
			setIsSaving(false);
		} catch {
			setSaveError("An error occurred while saving");
			setIsSaving(false);
		}
	};

	if (loading) {
		return (
			<div className="bg-white rounded-lg border border-gray-200 p-6">
				<div className="animate-pulse">
					<div className="h-6 bg-gray-200 rounded w-24 mb-4"></div>
					<div className="h-20 bg-gray-200 rounded"></div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="bg-white rounded-lg border border-gray-200 p-6">
				<p className="text-red-600 text-sm">{error}</p>
			</div>
		);
	}

	if (isEditing) {
		return (
			<div className="bg-white rounded-lg border border-gray-200 p-6">
				<h2 className="text-lg font-semibold text-[#002D72] mb-4">Edit Bio</h2>

				<textarea
					value={editValue}
					onChange={handleTextChange}
					maxLength={MAX_CHARS}
					className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#002D72] resize-none"
					rows={4}
					placeholder="Tell us about yourself..."
				/>

				<div className="mt-2 flex justify-between items-center text-xs text-gray-600 mb-4">
					{charCount > MAX_CHARS * 0.9 ? (
						<span className="text-orange-600">
							{charCount}/{MAX_CHARS} characters
						</span>
					) : (
						<span>
							{charCount}/{MAX_CHARS} characters
						</span>
					)}
				</div>

				{saveError && (
					<div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-700">
						{saveError}
					</div>
				)}

				<div className="flex gap-2">
					<button
						onClick={handleSave}
						disabled={isSaving || editValue.trim().length === 0}
						className="flex-1 bg-[#002D72] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
					>
						{isSaving ? "Saving..." : "Save Bio"}
					</button>
					<button
						onClick={handleCancel}
						disabled={isSaving}
						className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-300 disabled:opacity-50 transition-colors"
					>
						Cancel
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="bg-white rounded-lg border border-gray-200 p-6">
			<div className="flex items-center justify-between mb-4">
				<h2 className="text-lg font-semibold text-[#002D72]">Bio</h2>
				<button
					onClick={handleEditClick}
					className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
				>
					<Edit2 size={16} />
					<span className="text-sm font-medium">Edit Profile</span>
				</button>
			</div>

			{bio ? (
				<p className="text-gray-700 text-sm leading-relaxed">{bio}</p>
			) : (
				<p className="text-gray-500 text-sm italic">
					No bio yet. Click Edit Profile to add one!
				</p>
			)}
		</div>
	);
};

export default ProfileBio;
