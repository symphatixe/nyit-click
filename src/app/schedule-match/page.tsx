'use client'

import React, { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { mockSchedule, mockStudents } from '../lib/mockData'

// Get unique course codes from schedule
const getUniqueCourses = () => {
  const courseSet = new Set<string>()
  mockSchedule.forEach(block => {
    courseSet.add(block.courseCode)
  })
  return Array.from(courseSet)
}

// Get semester title (for now, hardcoded as Fall 2025)
const SEMESTER_TITLE = 'Fall 2025'

export default function ScheduleMatch() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const STUDENTS_PER_PAGE = 5

  const uniqueCourses = useMemo(() => getUniqueCourses(), [])

  const filteredStudents = useMemo(() => {
    return mockStudents.filter(student =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])

  const paginatedStudents = useMemo(() => {
    const startIdx = (currentPage - 1) * STUDENTS_PER_PAGE
    return filteredStudents.slice(startIdx, startIdx + STUDENTS_PER_PAGE)
  }, [filteredStudents, currentPage])

  const totalPages = Math.ceil(filteredStudents.length / STUDENTS_PER_PAGE)

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Top Heading */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-blue-900">MEET NEW PEOPLE</h1>
      </div>

      {/* Schedule Matches Container */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Schedule Matches</h3>
        <p className="text-sm text-gray-600 mb-6">
          Students taking the exact same classes as you this semester
        </p>

        {/* Your Schedule Section */}
        <div className="bg-gray-50 rounded-md border border-gray-100 p-4 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <h4 className="text-sm font-semibold text-gray-800">
              Your {SEMESTER_TITLE} Schedule
            </h4>
            <div className="bg-blue-900 text-white px-3 py-1 rounded-full text-xs font-semibold">
              {uniqueCourses.length} classes
            </div>
          </div>

          {/* Course Code Pills */}
          <div className="flex flex-wrap gap-2">
            {uniqueCourses.map((courseCode) => (
              <div
                key={courseCode}
                className="bg-yellow-500 text-blue-900 px-3 py-1 rounded-full text-sm font-semibold"
              >
                {courseCode}
              </div>
            ))}
          </div>
        </div>

        {/* Students In Your Class Section */}
        <div>
          <h4 className="text-sm font-semibold text-gray-800 mb-4">Students In Your Classes</h4>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="flex items-center bg-white border border-gray-200 rounded-md px-3 py-2">
              <Search className="mr-2 text-gray-400" size={18} />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name..."
                className="w-full text-sm bg-transparent outline-none"
              />
            </div>
          </div>

          {/* Student Cards */}
          <div className="space-y-3">
            {paginatedStudents.length > 0 ? (
              paginatedStudents.map((student) => (
                <div
                  key={student.id}
                  className="bg-gray-50 border border-gray-100 rounded-md p-4"
                >
                  <div className="flex items-center gap-3 justify-between">
                    {/* Left: Initials Circle & Info */}
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {/* Initials Circle */}
                      <div className="w-12 h-12 rounded-full bg-blue-900 text-white flex items-center justify-center flex-shrink-0 font-semibold text-sm">
                        {student.initials}
                      </div>

                      {/* Student Info */}
                      <div className="min-w-0 flex-1">
                        <h5 className="font-semibold text-gray-800 text-sm">
                          {student.name}
                        </h5>
                        <p className="text-xs text-gray-600 mt-1">
                          {student.year} • {student.major}
                        </p>
                      </div>
                    </div>

                    {/* Right: Connect Button */}
                    <button 
                      onClick={() => router.push(`/schedule-match/student/${student.id}`)}
                      className="bg-blue-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-950 active:bg-blue-950 transition-colors duration-200 flex-shrink-0 cursor-pointer"
                    >
                      Connect
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-sm text-gray-500">No students found</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>

              <div className="flex items-center gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-8 h-8 rounded-md text-sm font-medium transition-colors ${
                      currentPage === i + 1
                        ? 'bg-blue-900 text-white'
                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
