"use client";

import React from "react";

interface StudentActionsRowProps {
	onConnect?: () => void;
	onMessage?: () => void;
}

export default function StudentActionsRow({
	onConnect,
	onMessage,
}: Readonly<StudentActionsRowProps>) {
	return (
		<div className="flex gap-3">
			<button
				type="button"
				onClick={onConnect}
				className="flex-1 bg-blue-900 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-950 transition-colors"
			>
				Connect
			</button>
			<button
				type="button"
				onClick={onMessage}
				className="flex-1 bg-gray-100 text-gray-800 px-6 py-3 rounded-md font-medium hover:bg-gray-200 transition-colors"
			>
				Message
			</button>
		</div>
	);
}
