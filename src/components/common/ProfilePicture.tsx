"use client";

import React, { useState } from "react";

const ProfilePic: React.FC = () => {
	const [username, setUserName] = useState("Helen Gu");

	const getInitials = (name: string) =>
		name
			.split(" ")
			.map((word) => word[0]?.toUpperCase())
			.join("");

	return (
		<div className="flex items-center justify-center w-25 h-25 rounded-full border-3 border-[#002D72] bg-gray-50">
			<span className="text-4xl font-semibold text-[#002D72]">
				{getInitials(username)}
			</span>
		</div>
	);
};
export default ProfilePic;
