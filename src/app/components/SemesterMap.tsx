'use client';

import { useState, useEffect } from 'react';
import { createClient } from 'src/utils/supabase/client';

interface SemesterMapComponentProps {
    onSubmit: (completedCourses: string[]) => void;
    onDismiss?: () => void;
}

interface Course {
    code: string;
    name: string;
    credits: number;
    semester: number;
    prerequisites?: string[];
}


export default function SemesterMap({ onSubmit, onDismiss }: SemesterMapComponentProps) {
    const [selectedCourses, setSelectedCourses] = useState<Set<string>>(new Set());
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [hasExistingProgress, setHasExistingProgress] = useState(false);
    const [showComponent, setShowComponent] = useState(true);

    const supabase = createClient();

    const courses: Course[] = [
        // Year 1 - Fall
        { code: 'ETCS105', name: 'Career Discovery', credits: 2, semester: 1 },
        { code: 'MATH170', name: 'Calculus I', credits: 4, semester: 1 },
        { code: 'NATSCI1', name: 'Natural Science Elective', credits: 4, semester: 1 },
        { code: 'FCWR101', name: 'Foundations of College Composition', credits: 3, semester: 1 },
        { code: 'FCSP105', name: 'Foundations of Speech Communication', credits: 3, semester: 1 },

        // Year 1 - Spring
        { code: 'CSCI125', name: 'Computer Programming I', credits: 3, semester: 2 },
        { code: 'MATH180', name: 'Calculus II', credits: 4, semester: 2 },
        { code: 'NATSCI2', name: 'Natural Science Elective', credits: 4, semester: 2 },
        { code: 'FCWR151', name: 'Foundations of Research Writing', credits: 3, semester: 2 },
        { code: 'LIBART1', name: 'Liberal Arts Elective', credits: 3, semester: 2 },

        // Year 2 - Fall
        { code: 'CSCI185', name: 'Computer Programming II', credits: 3, semester: 3 },
        { code: 'CSCI135', name: 'Digital Logic Design Fundamentals', credits: 3, semester: 3 },
        { code: 'MATH310', name: 'Linear Algebra', credits: 3, semester: 3 },
        { code: 'NATSCI3', name: 'Natural Science Elective', credits: 3, semester: 3 },
        { code: 'FCWR304', name: 'Communication for Technical Professions', credits: 3, semester: 3 },

        // Year 2 - Spring
        { code: 'CSCI260', name: 'Data Structures', credits: 3, semester: 4 },
        { code: 'CSCI235', name: 'Elements of Discrete Structures', credits: 3, semester: 4 },
        { code: 'CSCI155', name: 'Computer Organization and Architecture', credits: 3, semester: 4 },
        { code: 'ETCS108', name: 'Computer, Internet, and Society', credits: 3, semester: 4 },
        { code: 'MATHSCI1', name: 'Math/Science Elective', credits: 3, semester: 4 },

        // Year 3 - Fall
        { code: 'CSCI330', name: 'Operating Systems', credits: 3, semester: 5 },
        { code: 'CSCI270', name: 'Probability and Statistics for CS', credits: 3, semester: 5 },
        { code: 'CSCI312', name: 'Theory of Computation', credits: 3, semester: 5 },
        { code: 'CSCI318', name: 'Programming Language Concepts', credits: 3, semester: 5 },
        { code: 'ICLT3XX', name: 'Literature Choice', credits: 3, semester: 5 },

        // Year 3 - Spring
        { code: 'CSCI335', name: 'Design and Analysis of Algorithms', credits: 3, semester: 6 },
        { code: 'CSCI345', name: 'Computer Networks', credits: 3, semester: 6 },
        { code: 'CSCI300', name: 'Database Management', credits: 3, semester: 6 },
        { code: 'MATHSCI2', name: 'Math/Science Elective', credits: 3, semester: 6 },
        { code: 'ICBS3XX', name: 'Behavioral Science Choice', credits: 3, semester: 6 },

        // Year 4 - Fall
        { code: 'CSCI456', name: 'Senior Project I', credits: 2, semester: 7 },
        { code: 'CSCI380', name: 'Introduction to Software Engineering', credits: 3, semester: 7 },
        { code: 'CSCICONC1', name: 'Computer Science Concentration', credits: 3, semester: 7 },
        { code: 'CSCICONC2', name: 'Computer Science Concentration', credits: 3, semester: 7 },
        { code: 'MATHSCI3', name: 'Math/Science Elective', credits: 3, semester: 7 },
        { code: 'ICPH3XX', name: 'Philosophy Choice', credits: 3, semester: 7 },

        // Year 4 - Spring
        { code: 'CSCI457', name: 'Senior Project II', credits: 2, semester: 8 },
        { code: 'CSCICONC3', name: 'Computer Science Concentration', credits: 3, semester: 8 },
        { code: 'CSCICONC4', name: 'Computer Science Concentration', credits: 3, semester: 8 },
        { code: 'GENELECT', name: 'General Elective', credits: 3, semester: 8 },
        { code: 'ICSS309', name: 'Technology and Global Issues', credits: 3, semester: 8 },
    ];

    const coursesBySemester = courses.reduce((acc, course) => {
        if (!acc[course.semester]) {
            acc[course.semester] = [];
        }
        acc[course.semester].push(course);
        return acc;
    }, {} as Record<number, Course[]>);

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

            if (userProgress && userProgress.length > 0) {
                const completedCourses = new Set(
                    userProgress.map(progress => progress.course_code)
                );
                setSelectedCourses(completedCourses);
                setHasExistingProgress(true);
                setShowComponent(false); // Hide if progress exists
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

    const selectSemester = (semester: number) => {
        setSelectedCourses(prev => {
            const newSelected = new Set(prev);
            const semesterCourses = coursesBySemester[semester] || [];

            // Check if all courses in this semester are already selected
            const allSelected = semesterCourses.every(course =>
                newSelected.has(course.code)
            );

            if (allSelected) {
                // Deselect all courses in this semester
                semesterCourses.forEach(course => {
                    newSelected.delete(course.code);
                });
            } else {
                // Select all courses in this semester
                semesterCourses.forEach(course => {
                    newSelected.add(course.code);
                });
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
            setShowComponent(false);

            if (onDismiss) {
                onDismiss();
            }
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

    if (!showComponent && hasExistingProgress) {
        return (
            <div className="max-w-6xl mx-auto p-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                    <p className="text-green-800 mb-4">✓ Your course progress has been saved!</p>
                    <button
                        onClick={() => setShowComponent(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
                    >
                        Update Course Progress
                    </button>
                </div>
            </div>
        );
    }

    // const getSemesterName = (semester: number) => {
    //     const year = Math.ceil(semester / 2);
    //     const season = semester % 2 === 1 ? 'Fall' : 'Spring';
    //     return `Year ${year} - ${season}`;
    // };

    const isSemesterFullySelected = (semester: number) => {
        const semesterCourses = coursesBySemester[semester] || [];
        return semesterCourses.every(course => selectedCourses.has(course.code));
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4 text-center">Semester Map</h1>

            {/* quick select */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-blue-900 mb-3">Quick Selection</h3>
                <div className="space-y-3">
                    {/* select by year */}
                    <div>
                        <p className="text-sm text-gray-700 mb-2">Select by Year:</p>
                        <div className="flex flex-wrap gap-2">
                            {[1, 2, 3, 4].map(year => {
                                const semestersInYear = [year * 2 - 1, year * 2];
                                const allYearSelected = semestersInYear.every(sem =>
                                    isSemesterFullySelected(sem)
                                );

                                return (
                                    <button
                                        key={year}
                                        onClick={() => {
                                            semestersInYear.forEach(sem => selectSemester(sem));
                                        }}
                                        className={`text-sm py-2 px-4 rounded transition-colors duration-200 ${allYearSelected
                                                ? 'bg-green-600 hover:bg-green-700 text-white'
                                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                                            }`}
                                    >
                                        Year {year} {allYearSelected ? '✓' : ''}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* toggle individual semesters */}
                    <div className="pt-2 border-t border-blue-300">
                        <p className="text-sm text-gray-700 mb-2">Toggle Individual Semesters:</p>
                        <div className="flex flex-wrap gap-2">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                                <button
                                    key={sem}
                                    onClick={() => selectSemester(sem)}
                                    className={`text-sm py-1 px-3 rounded transition-colors duration-200 ${isSemesterFullySelected(sem)
                                            ? 'bg-green-600 hover:bg-green-700 text-white'
                                            : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                                        }`}
                                >
                                    Semester {sem}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* courses */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Object.entries(coursesBySemester).map(([semester, semesterCourses]) => (
                    <div key={semester} className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-blue-600">
                                Semester {semester}
                            </h2>
                            <button
                                onClick={() => selectSemester(Number(semester))}
                                className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-800 px-2 py-1 rounded transition-colors"
                            >
                                {isSemesterFullySelected(Number(semester)) ? 'Deselect' : 'Select'} All
                            </button>
                        </div>
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

            {/* summary and submit */}
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
                    Use quick selection or click individual courses
                </p>
            </div>
        </div>
    );
}