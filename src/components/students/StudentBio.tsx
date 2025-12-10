"use client";

import React from "react";

export default function StudentAboutSection({
	bio,
}: Readonly<{ bio: string }>) {
	return (
		<div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
			<h2 className="text-lg font-bold text-blue-900 mb-3">About</h2>
			<p className="text-gray-700 leading-relaxed">{bio}</p>
		</div>
	);
}
