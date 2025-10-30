import { ScheduleBlock, Course } from './types';

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