export interface ChatMessage {
	id: string;
	role: "user" | "assistant" | "system";
	content: string;
	timestamp: Date;
	isLoading?: boolean;
}

export interface ChatRequest {
	message: string;
	includeContext?: boolean;
}

export interface ChatResponse {
	message: string;
	threadId: string;
	conversationId: string;
	suggestions?: string[];
	contextUsed?: string[];
}

export interface AssistantConfig {
	assistantId: string;
}

export interface UserContext {
	userId: string;
	major: string;
	year: number;
	completedCourses: string[];
	currentCourses: string[];
	gpa?: number;
	interests?: string[];
}

export interface ThreadInitData {
	userId: string;
	userProfile: UserContext;
	initialMessage?: string;
}

export interface CourseCompletedUpdate {
	type: "course_completed";
	data: {
		courseCode: string; // e.g. "CSCI 260"
		term: string; // e.g. "Spring 2026"
		grade?: string; // e.g. "A-" / "B+" etc.
		credits?: number;
	};
	timestamp: Date;
}

export interface CourseAddedUpdate {
	type: "course_added";
	data: {
		courseCode: string;
		term: string;
		planned?: boolean; // added as planned vs actually enrolled
	};
	timestamp: Date;
}

export interface MajorChangedUpdate {
	type: "major_changed";
	data: {
		fromMajor?: string; // optional if user was undeclared
		toMajor: string;
	};
	timestamp: Date;
}

export interface GradePostedUpdate {
	type: "grade_posted";
	data: {
		courseCode: string;
		term: string;
		grade: string;
		gpaImpact?: number;
	};
	timestamp: Date;
}

export interface InterestAddedUpdate {
	type: "interest_added";
	data: {
		interest: string; // "AI", "Cybersecurity", "Game Dev", etc.
		source?: "user" | "system" | "inferred";
	};
	timestamp: Date;
}

export interface AssistantStats {
	totalConversations: number;
	totalMessages: number;
	averageResponseTime: number;
	lastInteraction: Date;
	mostDiscussedTopics: string[];
}
