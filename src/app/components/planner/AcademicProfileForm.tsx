'use client';

import { useState } from 'react';
import { Plus, Sparkles } from 'lucide-react';
import CourseChip from './CourseChip';
import { AcademicProfile, SchedulePreferences } from '../../lib/types';
import { availableCourses } from '../../lib/mockData';



interface AcademicProfileFormProps {
  profile: AcademicProfile;
  setProfile: (p: AcademicProfile) => void;
  preferences: SchedulePreferences;
  setPreferences: (p: SchedulePreferences) => void;
  completedCourses: string[];
  setCompletedCourses: (c: string[]) => void;
  onGenerate: () => void;
  loading: boolean;
}

export default function AcademicProfileForm({
  profile,
  setProfile,
  preferences,
  setPreferences,
  completedCourses,
  setCompletedCourses,
  onGenerate,
  loading
}: AcademicProfileFormProps) {
  const [showCourseAdd, setShowCourseAdd] = useState(false);

  const addCourse = (courseCode: string) => {
    if (courseCode && !completedCourses.includes(courseCode)) {
      setCompletedCourses([...completedCourses, courseCode]);
    }
    setShowCourseAdd(false);
  };

  const removeCourse = (courseCode: string) => {
    setCompletedCourses(completedCourses.filter(c => c !== courseCode));
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-blue-900 mb-2">AI Tailored Schedule</h2>
      <p className="text-sm text-gray-600 mb-6">
        Get personalized class recommendations based on your academic profile and preferences.
      </p>

      <div className="space-y-6">
        <div>
          <h3 className="font-semibold text-blue-900 mb-4">Your Academic Profile</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Major</label>
              <select
                value={profile.major}
                onChange={(e) => setProfile({ ...profile, major: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Computer Science</option>
                <option>Mathematics</option>
                <option>Physics</option>
                <option>Engineering</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Enrollment Year</label>
              <select
                value={profile.enrollmentYear}
                onChange={(e) => setProfile({ ...profile, enrollmentYear: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>2021</option>
                <option>2022</option>
                <option>2023</option>
                <option>2024</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Completed Courses</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {completedCourses.map((course) => (
                  <CourseChip key={course} course={course} onRemove={() => removeCourse(course)} />
                ))}
              </div>
              
              {showCourseAdd ? (
                <select
                  onChange={(e) => addCourse(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a course...</option>
                  {availableCourses.map((course) => (
                    <option key={course.id} value={course.code}>
                      {course.code} - {course.name}
                    </option>
                  ))}
                </select>
              ) : (
                <button
                  onClick={() => setShowCourseAdd(true)}
                  className="text-blue-600 text-sm flex items-center gap-1 hover:text-blue-700"
                >
                  <Plus size={16} />
                  Add more courses...
                </button>
              )}
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-blue-900 mb-4">Schedule Preferences</h3>
          
          <div className="space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.noWeekendClasses}
                onChange={(e) => setPreferences({ ...preferences, noWeekendClasses: e.target.checked })}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">No weekend classes</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.noLateNightClasses}
                onChange={(e) => setPreferences({ ...preferences, noLateNightClasses: e.target.checked })}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">No late night classes</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.noMultipleDaysWithLateClasses}
                onChange={(e) => setPreferences({ ...preferences, noMultipleDaysWithLateClasses: e.target.checked })}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">No multiple days with late classes</span>
            </label>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Additional Preferences</label>
            <textarea
              value={preferences.additionalPreferences}
              onChange={(e) => setPreferences({ ...preferences, additionalPreferences: e.target.value })}
              placeholder='E.g., "I prefer morning classes and need Fridays free for my internship"'
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              rows={3}
            />
          </div>
        </div>

        <button
          onClick={onGenerate}
          disabled={loading}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-md flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
        >
          <Sparkles size={20} />
          {loading ? 'Generating...' : 'Generate Tailored Schedule'}
        </button>
      </div>
    </div>
  );
}