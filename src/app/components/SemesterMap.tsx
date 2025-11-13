'use client'; 

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client'; // Import from client.ts

interface SemesterMapComponentProps {
    onSubmit: (completedCourses: string[]) => void;
}
interface Course {
    code: string;
    name: string;
    credits: number;
    semester: number;
    prerequisites?: string[];
}

interface UserCourseProgress {
    course_code: string;
    completed: boolean;
    semester: number;
}


export default function SemesterMap({ onSubmit }: SemesterMapComponentProps) {
    const [selectedCourses, setSelectedCourses] = useState<Set<string>>(new Set());
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    //initialize supabase client 
    const supabase = createClient();

    //sample course data
    const courses: Course[] = [
        //year 1 - Fall
        { code: 'ETCS105', name: 'Career Discovery', credits: 2, semester: 1 },
        { code: 'MATH170', name: 'Calculus I', credits: 4, semester: 1 },
        { code: 'NATSCI1', name: 'Natural Science Elective', credits: 4, semester: 1 },
        { code: 'FCWR101', name: 'Foundations of College Composition', credits: 3, semester: 1 },
        { code: 'FCSP105', name: 'Foundations of Speech Communication', credits: 3, semester: 2 },

        //year 1 - Spring
        { code: 'CSCI125', name: 'Computer Programming I', credits: 3, semester: 1 },
        { code: 'MATH180', name: 'Calculus II', credits: 4, semester: 2 },
        { code: 'NATSCI2', name: 'Natural Science Elective', credits: 4, semester: 2 },
        { code: 'FCWR151', name: 'Foundations of Research Writing', credits: 3, semester: 2 },
        { code: 'LIBART1', name: 'Liberal Arts Elective', credits: 3, semester: 2 },

        //year 2 - Fall
        { code: 'CSCI185', name: 'Computer Programming II', credits: 3, semester: 3 },
        { code: 'CSCI135', name: 'Digital Logic Design Fundamentals', credits: 3, semester: 3 },
        { code: 'MATH310', name: 'Linear Algebra', credits: 3, semester: 3 },
        { code: 'NATSCI3', name: 'Natural Science Elective', credits: 3, semester: 3 },
        { code: 'FCWR304', name: 'Communication for Technical Professions', credits: 3, semester: 3 },

        //year 2 - Spring
        { code: 'CSCI260', name: 'Data Structures', credits: 3, semester: 4 },
        { code: 'CSCI235', name: 'Elements of Discrete Structures', credits: 3, semester: 4 },
        { code: 'CSCI155', name: 'Computer Organization and Architecture', credits: 3, semester: 4 },
        { code: 'ETCS108', name: 'Computer, Internet, and Society', credits: 3, semester: 4 },
        { code: 'MATHSCI1', name: 'Math/Science Elective', credits: 3, semester: 4 },

        //year 3 - Fall
        { code: 'CSCI330', name: 'Operating Systems', credits: 3, semester: 5 },
        { code: 'CSCI270', name: 'Probability and Statistics for CS', credits: 3, semester: 5 },
        { code: 'CSCI312', name: 'Theory of Computation', credits: 3, semester: 5 },
        { code: 'CSCI318', name: 'Programming Language Concepts', credits: 3, semester: 5 },
        { code: 'ICLT3XX', name: 'Literature Choice', credits: 3, semester: 5 },

        //year 3 - Spring
        { code: 'CSCI335', name: 'Design and Analysis of Algorithms', credits: 3, semester: 6 },
        { code: 'CSCI345', name: 'Computer Networks', credits: 3, semester: 6 },
        { code: 'CSCI300', name: 'Database Management', credits: 3, semester: 6 },
        { code: 'MATHSCI2', name: 'Math/Science Elective', credits: 3, semester: 6 },
        { code: 'ICBS3XX', name: 'Behavioral Science Choice', credits: 3, semester: 6 },

        //year 4 - Fall
        { code: 'CSCI456', name: 'Senior Project I', credits: 2, semester: 7 },
        { code: 'CSCI380', name: 'Introduction to Software Engineering', credits: 3, semester: 7 },
        { code: 'CSCICONC1', name: 'Computer Science Concentration', credits: 3, semester: 7 },
        { code: 'CSCICONC2', name: 'Computer Science Concentration', credits: 3, semester: 8 },
        { code: 'MATHSCI3', name: 'Math/Science Elective', credits: 3, semester: 7 },
        { code: 'ICPH3XX', name: 'Philosophy Choice', credits: 3, semester: 7 },

        //year 4 - Spring
        { code: 'CSCI457', name: 'Senior Project II', credits: 2, semester: 8 },
        { code: 'CSCICONC3', name: 'Computer Science Concentration', credits: 3, semester: 8 },
        { code: 'CSCICONC4', name: 'Computer Science Concentration', credits: 3, semester: 8 },
        { code: 'GENELECT', name: 'General Elective', credits: 3, semester: 8 },
        { code: 'ICSS309', name: 'Technology and Global Issues', credits: 3, semester: 8 },
    ];


    //group courses by semester
    const coursesBySemester = courses.reduce((acc, course) => {
        if (!acc[course.semester]) {
            acc[course.semester] = [];
        }
        acc[course.semester].push(course);
        return acc;
    }, {} as Record<number, Course[]>);

    //load user progress on component mount
    useEffect(() => {
        loadUserAndProgress();
    }, []);

    const loadUserAndProgress = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                setLoading(false);
                return;
            }
            setUser(user);

            const { data: userProgress, error } = await supabase
                .from('user_course_progress')
                .select('course_code, completed')
                .eq('user_id', user.id)
                .eq('completed', true);

            if (error) throw error;

            if (userProgress) {
                const completedCourses = new Set(
                    userProgress.map(progress => progress.course_code)
                );
                setSelectedCourses(completedCourses);
            }
        } catch (error) {
            console.error('Error loading user progress:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleCourse = (courseCode: string) => {
        setSelectedCourses(prev => {
            const newSelected = new Set(prev);
            if (newSelected.has(courseCode)) {
                newSelected.delete(courseCode);
            } else {
                newSelected.add(courseCode);
            }
            return newSelected;
        });
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            if (!user) throw new Error('User not authenticated');

            const updates = Array.from(selectedCourses).map(courseCode => ({
                user_id: user.id,
                course_code: courseCode,
                completed: true,
                semester: courses.find(c => c.code === courseCode)?.semester || 1
            }));

            //clear existing progress and insert new ones
            const { error: deleteError } = await supabase
                .from('user_course_progress')
                .delete()
                .eq('user_id', user.id);

            if (deleteError) throw deleteError;

            if (updates.length > 0) {
                const { error: insertError } = await supabase
                    .from('user_course_progress')
                    .insert(updates);

                if (insertError) throw insertError;
            }

            onSubmit(Array.from(selectedCourses));
            alert('Course progress saved successfully!');
        } catch (error) {
            console.error('Error saving course progress:', error);
            alert('Error saving course progress. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto p-6">
                <div className="text-center">Loading your course progress...</div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="max-w-6xl mx-auto p-6">
                <div className="text-center text-red-600">
                    Please log in to view your semester map.
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8 text-center">Semester Map</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Object.entries(coursesBySemester).map(([semester, semesterCourses]) => (
                    <div key={semester} className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200">
                        <h2 className="text-xl font-semibold mb-4 text-center text-blue-600">
                            Semester {semester}
                        </h2>
                        <div className="space-y-3">
                            {semesterCourses.map(course => (
                                <div
                                    key={course.code}
                                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${selectedCourses.has(course.code)
                                            ? 'bg-green-100 border-green-500 shadow-md'
                                            : 'bg-gray-50 border-gray-300 hover:bg-gray-100'
                                        }`}
                                    onClick={() => toggleCourse(course.code)}
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-semibold text-gray-800">{course.code}</h3>
                                            <p className="text-sm text-gray-600">{course.name}</p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                                {course.credits} credits
                                            </span>
                                            <div
                                                className={`w-4 h-4 rounded-full border-2 ${selectedCourses.has(course.code)
                                                        ? 'bg-green-500 border-green-600'
                                                        : 'bg-white border-gray-400'
                                                    }`}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 text-center">
                <div className="mb-4">
                    <p className="text-lg font-semibold text-gray-700">
                        Selected Courses: {selectedCourses.size}
                    </p>
                    <p className="text-sm text-gray-500">
                        Total Credits: {
                            courses
                                .filter(course => selectedCourses.has(course.code))
                                .reduce((sum, course) => sum + course.credits, 0)
                        }
                    </p>
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
                >
                    {isSubmitting ? 'Saving...' : 'Save Course Progress'}
                </button>

                <p className="text-sm text-gray-500 mt-2">
                    Click on courses to mark them as completed
                </p>
            </div>
        </div>
    );
}