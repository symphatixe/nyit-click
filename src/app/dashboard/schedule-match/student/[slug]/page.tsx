'use client'

import React, { useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Mail, BookOpen } from 'lucide-react'
import { mockStudents, mockSchedule, type Student } from '../../../lib/mockData'

interface StudentDetailPageProps {
  params: Promise<{ slug: string }>
}

export default function StudentDetailPage({ params }: StudentDetailPageProps) {
  const { slug } = React.use(params)
  const router = useRouter()

  // Find student by ID
  const student = useMemo(() => {
    return mockStudents.find((s: Student) => s.id === slug)
  }, [slug])

  if (!student) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-blue-900 hover:text-blue-800 mb-6"
        >
          <ArrowLeft size={18} />
          <span>Back</span>
        </button>
        <div className="text-center py-12">
          <p className="text-gray-600">Student not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-blue-900 mb-6 transition-colors cursor-pointer hover:text-blue-700"
      >
        <ArrowLeft size={18} />
        <span className="text-sm font-medium">Back to Schedule Matches</span>
      </button>

      {/* Student Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex items-start gap-4">
          {/* Initials Circle */}
          <div className="w-20 h-20 rounded-full bg-blue-900 text-white flex items-center justify-center flex-shrink-0 font-semibold text-3xl">
            {student.initials}
          </div>

          {/* Student Info */}
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-bold text-blue-900">{student.name}</h1>
            <p className="text-gray-600 mt-2">
              {student.year} • {student.major}
            </p>
            <a
              href={`mailto:${student.email}`}
              className="flex items-center gap-2 text-blue-900 hover:text-blue-800 mt-3 transition-colors"
            >
              <Mail size={16} />
              <span className="text-sm">{student.email}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bio Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-bold text-blue-900 mb-3">About</h2>
        <p className="text-gray-700 leading-relaxed">{student.bio}</p>
      </div>

      {/* Shared Classes Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-bold text-blue-900 mb-4">Shared Classes</h2>

        {student.sharedClasses.length > 0 ? (
          <div className="space-y-3">
            {student.sharedClasses.map((courseCode) => (
              <div
                key={courseCode}
                className="bg-gray-50 border border-gray-100 rounded-md p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-md bg-yellow-500 flex items-center justify-center">
                    <BookOpen size={16} className="text-blue-900" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-semibold text-gray-800">{courseCode}</h5>
                    <p className="text-xs text-gray-600 mt-1">
                      {mockSchedule
                        .filter(b => b.courseCode === courseCode)
                        .map(b => `${b.day} ${b.startTime}-${b.endTime}`)
                        .join(' • ')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No shared classes</p>
        )}
      </div>

      {/* Action Buttons
      <div className="flex gap-3">
        <button className="flex-1 bg-blue-900 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-950 transition-colors">
          Connect
        </button>
        <button className="flex-1 bg-gray-100 text-gray-800 px-6 py-3 rounded-md font-medium hover:bg-gray-200 transition-colors">
          Message
        </button>
      </div> */}
    </div>
  )
}
