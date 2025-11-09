'use client'

import React, { useState, useMemo } from 'react'
import { Search } from 'lucide-react'

interface Professor {
  id: string
  name: string
  initials: string
  commonTags: string[]
}

const MOCK_PROFESSORS: Professor[] = [
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
]

export default function ProfessorLookup() {
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = useMemo(() => {
    return MOCK_PROFESSORS.filter(prof =>
      prof.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div>
        <h2 className="text-2xl font-bold text-blue-900">Professor lookup</h2>
        <p className="mt-1 text-sm text-gray-600">Find professors and read what your classmates have to say</p>
      </div>

      {/* Search Bar */}
      <div className="mt-4 mb-6">
        <div className="flex items-center bg-white border border-gray-200 rounded-md px-3 py-2">
          <Search className="mr-2 text-gray-400" size={18} />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="w-full text-sm bg-transparent outline-none"
          />
        </div>
      </div>

      {/* Professor Cards */}
      <div className="space-y-3">
        {filtered.length > 0 ? (
          filtered.map((prof) => (
            <div key={prof.id} className="bg-gray-50 border border-gray-100 rounded-md p-4">
              <div className="flex items-start gap-3">
                {/* Initials Circle */}
                <div className="w-12 h-12 rounded-full bg-blue-900 text-white flex items-center justify-center flex-shrink-0 font-semibold text-sm">
                  {prof.initials}
                </div>

                {/* Professor Info */}
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-800 text-sm">{prof.name}</h3>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {prof.commonTags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block text-xs bg-blue-100 text-blue-900 px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-sm text-gray-500">No professors found</p>
          </div>
        )}
      </div>
    </div>
  )
}
