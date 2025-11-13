import { ScheduleBlock, Course } from './types';

export interface ProfessorReview {
  id: string
  professorId: string
  studentName: string
  courseCode: string
  workloadRating: number
  contentRating: number
  professorRating: number
  feedback: string
  tags: string[]
  date: string
}

export interface Professor {
  id: string
  name: string
  initials: string
  commonTags: string[]
}

export const mockSchedule: ScheduleBlock[] = [
  {
    courseCode: 'CS 101',
    courseName: 'Intro to Computer Science',
    type: 'Lecture',
    day: 'MON',
    startTime: '8:30',
    endTime: '10:00',
    room: 'Room 302',
    color: 'bg-blue-900'
  }, {
    courseCode: 'CS 151',
    courseName: 'Civil Engineering Basics',
    type: 'Lecture',
    day: 'SAT',
    startTime: '8:30',
    endTime: '10:00',
    room: 'Room 302',
    color: 'bg-blue-900'
  },
  {
    courseCode: 'CS 101',
    courseName: 'Intro to Computer Science',
    type: 'Lecture',
    day: 'WED',
    startTime: '8:30',
    endTime: '10:00',
    room: 'Room 302',
    color: 'bg-blue-900'
  },
  {
    courseCode: 'MATH 201',
    courseName: 'Calculus II',
    type: 'Lecture',
    day: 'TUE',
    startTime: '11:30',
    endTime: '13:00',  
    room: 'Room 105',
    color: 'bg-yellow-600'
  },
  {
    courseCode: 'MATH 201',
    courseName: 'Calculus II',
    type: 'Lecture',
    day: 'THU',
    startTime: '11:30',
    endTime: '13:00',  
    room: 'Room 105',
    color: 'bg-yellow-600'
  },
  {
    courseCode: 'PHYS 110',
    courseName: 'Physics',
    type: 'Lecture',
    day: 'MON',
    startTime: '16:30',  
    endTime: '19:00',   
    room: 'Room 201',
    color: 'bg-gray-600'
  },
  {
    courseCode: 'PHYS 110L',
    courseName: 'Physics Lab',
    type: 'Lab',
    day: 'THU',
    startTime: '16:00',
    endTime: '19:00',  
    room: 'Lab 201',
    color: 'bg-gray-700'
  }
];

export const availableCourses: Course[] = [
  { id: '1', code: 'CSCI 185', name: 'Intro to CS', credits: 3 },
  { id: '2', code: 'MATH180', name: 'Calculus I', credits: 4 },
  { id: '3', code: 'CHEM105', name: 'Chemistry', credits: 3 },
  { id: '4', code: 'IENG180', name: 'Engineering', credits: 3 },
];

export const mockProfessors: Professor[] = [
  {
    id: '1',
    name: 'Mike Smith',
    initials: 'MS',
    commonTags: ['fair grading', 'engaging lectures', 'helpful office hours']
  },
  {
    id: '2',
    name: 'Dexter Johnson',
    initials: 'DJ',
    commonTags: ['hard exams', 'heavy reading', 'strict attendance']
  },
  {
    id: '3',
    name: 'Catherine Williams',
    initials: 'CW',
    commonTags: ['group projects', 'lenient grading', 'engaging lectures']
  },
  {
    id: '4',
    name: 'Susan Brown',
    initials: 'SB',
    commonTags: ['easy homework', 'practical applications', 'helpful office hours']
  },
  {
    id: '5',
    name: 'Robert Chen',
    initials: 'RC',
    commonTags: []
  },
]

export const mockReviews: ProfessorReview[] = [
  {
    id: '1',
    professorId: '1',
    studentName: 'Alex T.',
    courseCode: 'CS 101',
    workloadRating: 4,
    contentRating: 5,
    professorRating: 5,
    feedback: 'Professor Smith is incredibly engaging and really cares about student success. The lectures are well-organized and he always makes time for office hours. Highly recommend!',
    tags: ['engaging lectures', 'fair grading', 'helpful office hours'],
    date: '2025-11-10'
  },
  {
    id: '2',
    professorId: '1',
    studentName: 'Jordan M.',
    courseCode: 'CS 101',
    workloadRating: 3,
    contentRating: 4,
    professorRating: 4,
    feedback: 'Good course overall. The material was challenging but fair. Professor Smith provided good feedback on assignments.',
    tags: ['fair grading', 'engaging lectures'],
    date: '2025-11-08'
  },
  {
    id: '3',
    professorId: '1',
    studentName: 'Taylor P.',
    courseCode: 'CS 101',
    workloadRating: 5,
    contentRating: 4,
    professorRating: 5,
    feedback: 'Workload was intense but manageable with good time management. The professor explains concepts really well and is responsive to questions.',
    tags: ['fair grading', 'helpful office hours', 'engaging lectures'],
    date: '2025-11-05'
  },
  {
    id: '4',
    professorId: '1',
    studentName: 'Morgan L.',
    courseCode: 'MATH 201',
    workloadRating: 4,
    contentRating: 3,
    professorRating: 4,
    feedback: 'The content could be more clearly explained in some sections, but the professor is willing to help during office hours.',
    tags: ['helpful office hours', 'fair grading'],
    date: '2025-11-02'
  },
  {
    id: '5',
    professorId: '1',
    studentName: 'Casey S.',
    courseCode: 'CS 101',
    workloadRating: 3,
    contentRating: 5,
    professorRating: 4,
    feedback: 'Really enjoyed the course content and how it was presented. Some assignments felt repetitive.',
    tags: ['engaging lectures'],
    date: '2025-10-28'
  },
  {
    id: '6',
    professorId: '2',
    studentName: 'Jamie K.',
    courseCode: 'MATH 201',
    workloadRating: 5,
    contentRating: 4,
    professorRating: 3,
    feedback: 'The exams are very challenging and the workload is heavy. Professor Johnson knows the material but can be tough. Not for the faint of heart.',
    tags: ['hard exams', 'heavy reading', 'strict attendance'],
    date: '2025-11-09'
  },
  {
    id: '7',
    professorId: '2',
    studentName: 'Riley D.',
    courseCode: 'MATH 201',
    workloadRating: 4,
    contentRating: 5,
    professorRating: 4,
    feedback: 'Demanding course but you learn a lot. Professor Johnson is knowledgeable and expects high standards.',
    tags: ['hard exams', 'heavy reading'],
    date: '2025-11-07'
  },
  {
    id: '8',
    professorId: '3',
    studentName: 'Sam W.',
    courseCode: 'CS 151',
    workloadRating: 2,
    contentRating: 4,
    professorRating: 5,
    feedback: 'Professor Williams is amazing! Very flexible with deadlines and grading. The workload is light compared to other classes.',
    tags: ['lenient grading', 'group projects', 'engaging lectures'],
    date: '2025-11-06'
  },
  {
    id: '9',
    professorId: '3',
    studentName: 'Pat H.',
    courseCode: 'CS 151',
    workloadRating: 3,
    contentRating: 4,
    professorRating: 5,
    feedback: 'Great professor! Encouraging group work and collaborative learning. Very supportive.',
    tags: ['group projects', 'engaging lectures'],
    date: '2025-11-03'
  },
  {
    id: '10',
    professorId: '4',
    studentName: 'Quinn R.',
    courseCode: 'PHYS 110',
    workloadRating: 2,
    contentRating: 5,
    professorRating: 5,
    feedback: 'Professor Brown makes physics fun and accessible. The homework is straightforward and the exams are fair.',
    tags: ['easy homework', 'fair grading', 'helpful office hours'],
    date: '2025-11-04'
  },
];
