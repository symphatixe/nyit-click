import type { ScheduleBlock, SemesterMapCourse } from "@/types";

export const generatedSchedule: ScheduleBlock[] = [];
export const userSchedule: ScheduleBlock[] = [];

export const Courses: SemesterMapCourse[] = [
	{
		id: "1-105",
		course_code: "ETCS105",
		name: "Career Discovery",
		credits: 2,
		semester: 1,
	},
	{
		id: "1-170",
		course_code: "MATH170",
		name: "Calculus I",
		credits: 4,
		semester: 1,
	},
	{
		id: "1-SCI1",
		course_code: "NATSCI1",
		name: "Natural Science Elective",
		credits: 4,
		semester: 1,
	},
	{
		id: "1-101",
		course_code: "FCWR101",
		name: "Foundations of College Composition",
		credits: 3,
		semester: 1,
	},
	{
		id: "1-105",
		course_code: "FCSP105",
		name: "Foundations of Speech Communication",
		credits: 3,
		semester: 1,
	},

	// Year 1 - Spring
	{
		id: "2-125",
		course_code: "CSCI125",
		name: "Computer Programming I",
		credits: 3,
		semester: 2,
	},
	{
		id: "2-180",
		course_code: "MATH180",
		name: "Calculus II",
		credits: 4,
		semester: 2,
	},
	{
		id: "2-SCI2",
		course_code: "NATSCI2",
		name: "Natural Science Elective",
		credits: 4,
		semester: 2,
	},
	{
		id: "2-151",
		course_code: "FCWR151",
		name: "Foundations of Research Writing",
		credits: 3,
		semester: 2,
	},
	{
		id: "2-ART1",
		course_code: "LIBART1",
		name: "Liberal Arts Elective",
		credits: 3,
		semester: 2,
	},

	// Year 2 - Fall
	{
		id: "3-185",
		course_code: "CSCI185",
		name: "Computer Programming II",
		credits: 3,
		semester: 3,
	},
	{
		id: "3-135",
		course_code: "CSCI135",
		name: "Digital Logic Design Fundamentals",
		credits: 3,
		semester: 3,
	},
	{
		id: "3-310",
		course_code: "MATH310",
		name: "Linear Algebra",
		credits: 3,
		semester: 3,
	},
	{
		id: "3-SCI3",
		course_code: "NATSCI3",
		name: "Natural Science Elective",
		credits: 3,
		semester: 3,
	},
	{
		id: "3-304",
		course_code: "FCWR304",
		name: "Communication for Technical Professions",
		credits: 3,
		semester: 3,
	},

	// Year 2 - Spring
	{
		id: "4-260",
		course_code: "CSCI260",
		name: "Data Structures",
		credits: 3,
		semester: 4,
	},
	{
		id: "4-235",
		course_code: "CSCI235",
		name: "Elements of Discrete Structures",
		credits: 3,
		semester: 4,
	},
	{
		id: "4-155",
		course_code: "CSCI155",
		name: "Computer Organization and Architecture",
		credits: 3,
		semester: 4,
	},
	{
		id: "4-108",
		course_code: "ETCS108",
		name: "Computer, Internet, and Society",
		credits: 3,
		semester: 4,
	},
	{
		id: "4-MATHSCI1",
		course_code: "MATHSCI1",
		name: "Math/Science Elective",
		credits: 3,
		semester: 4,
	},

	// Year 3 - Fall
	{
		id: "5-330",
		course_code: "CSCI330",
		name: "Operating Systems",
		credits: 3,
		semester: 5,
	},
	{
		id: "5-270",
		course_code: "CSCI270",
		name: "Probability and Statistics for CS",
		credits: 3,
		semester: 5,
	},
	{
		id: "5-312",
		course_code: "CSCI312",
		name: "Theory of Computation",
		credits: 3,
		semester: 5,
	},
	{
		id: "5-318",
		course_code: "CSCI318",
		name: "Programming Language Concepts",
		credits: 3,
		semester: 5,
	},
	{
		id: "5-ICLT3XX",
		course_code: "ICLT3XX",
		name: "Literature Choice",
		credits: 3,
		semester: 5,
	},

	// Year 3 - Spring
	{
		id: "6-335",
		course_code: "CSCI335",
		name: "Design and Analysis of Algorithms",
		credits: 3,
		semester: 6,
	},
	{
		id: "6-345",
		course_code: "CSCI345",
		name: "Computer Networks",
		credits: 3,
		semester: 6,
	},
	{
		id: "6-300",
		course_code: "CSCI300",
		name: "Database Management",
		credits: 3,
		semester: 6,
	},
	{
		id: "6-MATHSCI2",
		course_code: "MATHSCI2",
		name: "Math/Science Elective",
		credits: 3,
		semester: 6,
	},
	{
		id: "6-ICBS3XX",
		course_code: "ICBS3XX",
		name: "Behavioral Science Choice",
		credits: 3,
		semester: 6,
	},

	// Year 4 - Fall
	{
		id: "7-456",
		course_code: "CSCI456",
		name: "Senior Project I",
		credits: 2,
		semester: 7,
	},
	{
		id: "7-380",
		course_code: "CSCI380",
		name: "Introduction to Software Engineering",
		credits: 3,
		semester: 7,
	},
	{
		id: "7-CONC1",
		course_code: "CSCICONC1",
		name: "Computer Science Concentration",
		credits: 3,
		semester: 7,
	},
	{
		id: "7-CONC2",
		course_code: "CSCICONC2",
		name: "Computer Science Concentration",
		credits: 3,
		semester: 7,
	},
	{
		id: "7-MATHSCI3",
		course_code: "MATHSCI3",
		name: "Math/Science Elective",
		credits: 3,
		semester: 7,
	},
	{
		id: "7-ICPH3XX",
		course_code: "ICPH3XX",
		name: "Philosophy Choice",
		credits: 3,
		semester: 7,
	},

	// Year 4 - Spring
	{
		id: "8-457",
		course_code: "CSCI457",
		name: "Senior Project II",
		credits: 2,
		semester: 8,
	},
	{
		id: "8-CONC3",
		course_code: "CSCICONC3",
		name: "Computer Science Concentration",
		credits: 3,
		semester: 8,
	},
	{
		id: "8-CONC4",
		course_code: "CSCICONC4",
		name: "Computer Science Concentration",
		credits: 3,
		semester: 8,
	},
	{
		id: "8-ELECT",
		course_code: "GENELECT",
		name: "General Elective",
		credits: 3,
		semester: 8,
	},
	{
		id: "8-309",
		course_code: "ICSS309",
		name: "Technology and Global Issues",
		credits: 3,
		semester: 8,
	},
];

export const TAGS = [
	"easy homework",
	"hard homework",
	"group projects",
	"helpful office hours",
	"fair grading",
	"heavy reading",
	"hard exams",
	"engaging lectures",
	"lenient grading",
	"strict attendance",
	"lots of assignments",
	"practical applications",
];
