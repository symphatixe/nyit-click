'use client'

import React, { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Star } from 'lucide-react'
import { mockProfessors, mockReviews, type ProfessorReview, type Professor } from '../../../lib/mockData'

const REVIEWS_PER_PAGE = 5

interface ProfessorDetailPageProps {
  params: Promise<{ slug: string }>
}

// Component to display partial stars based on decimal rating
function PartialStarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating)
  const decimalPart = rating - fullStars
  const hasPartialStar = decimalPart >= 0.3 // Show partial star if 0.3 or higher

  return (
    <div className="flex items-center justify-center gap-1">
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) {
          return (
            <Star
              key={i}
              size={20}
              className="fill-yellow-500 text-yellow-500"
            />
          )
        } else if (i === fullStars && hasPartialStar) {
          // Partial star
          const fillPercentage = Math.round(decimalPart * 100)
          return (
            <div key={i} className="relative w-5 h-5">
              {/* Empty star background */}
              <Star size={20} className="text-gray-300" />
              {/* Filled portion overlay */}
              <div
                className="absolute top-0 left-0 overflow-hidden"
                style={{ width: `${fillPercentage}%` }}
              >
                <Star size={20} className="fill-yellow-500 text-yellow-500" />
              </div>
            </div>
          )
        } else {
          return (
            <Star
              key={i}
              size={20}
              className="text-gray-300"
            />
          )
        }
      })}
    </div>
  )
}

export default function ProfessorDetailPage({ params }: ProfessorDetailPageProps) {
  const { slug } = React.use(params)
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)

  // Find professor by ID (slug is the professor ID)
  const professor = useMemo(() => {
    return mockProfessors.find((p: Professor) => p.id === slug)
  }, [slug])

  // Get all reviews for this professor
  const professorReviews = useMemo(() => {
    return mockReviews.filter((r: ProfessorReview) => r.professorId === slug)
  }, [slug])

  // Calculate average ratings
  const averageRatings = useMemo(() => {
    if (professorReviews.length === 0) {
      return { workload: 0, content: 0, professor: 0 }
    }

    const workloadAvg =
      professorReviews.reduce((sum: number, r: ProfessorReview) => sum + r.workloadRating, 0) /
      professorReviews.length
    const contentAvg =
      professorReviews.reduce((sum: number, r: ProfessorReview) => sum + r.contentRating, 0) /
      professorReviews.length
    const professorAvg =
      professorReviews.reduce((sum: number, r: ProfessorReview) => sum + r.professorRating, 0) /
      professorReviews.length

    return {
      workload: Math.round(workloadAvg * 10) / 10,
      content: Math.round(contentAvg * 10) / 10,
      professor: Math.round(professorAvg * 10) / 10,
    }
  }, [professorReviews])

  // Count tags
  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    professorReviews.forEach((review: ProfessorReview) => {
      review.tags.forEach((tag: string) => {
        counts[tag] = (counts[tag] || 0) + 1
      })
    })
    return Object.entries(counts)
      .filter(([, count]) => count > 0)
      .sort((a, b) => b[1] - a[1])
  }, [professorReviews])

  // Paginate reviews
  const paginatedReviews = useMemo(() => {
    const startIdx = (currentPage - 1) * REVIEWS_PER_PAGE
    return professorReviews.slice(startIdx, startIdx + REVIEWS_PER_PAGE)
  }, [professorReviews, currentPage])

  const totalPages = Math.ceil(professorReviews.length / REVIEWS_PER_PAGE)

  if (!professor) {
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
          <p className="text-gray-600">Professor not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-blue-900 hover:text-blue-800 mb-6 transition-colors"
      >
        <ArrowLeft size={18} />
        <span className="text-sm font-medium">Back to Ratings</span>
      </button>

      {/* Professor Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex items-start gap-4">
          {/* Initials Circle */}
          <div className="w-16 h-16 rounded-full bg-blue-900 text-white flex items-center justify-center flex-shrink-0 font-semibold text-xl">
            {professor.initials}
          </div>

          {/* Professor Info */}
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-bold text-blue-900">{professor.name}</h1>
            <p className="mt-2 text-gray-600">
              {professorReviews.length} {professorReviews.length === 1 ? 'review' : 'reviews'}
            </p>
          </div>
        </div>
      </div>

      {/* Average Ratings */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-bold text-blue-900 mb-4">Average Ratings</h2>

        {professorReviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Workload Rating */}
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Workload</p>
              <div className="flex items-center justify-center gap-2 mb-2">
                <PartialStarRating rating={averageRatings.workload} />
              </div>
              <p className="text-lg font-semibold text-gray-800">
                {averageRatings.workload}
              </p>
            </div>

            {/* Content Rating */}
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Content Quality</p>
              <div className="flex items-center justify-center gap-2 mb-2">
                <PartialStarRating rating={averageRatings.content} />
              </div>
              <p className="text-lg font-semibold text-gray-800">
                {averageRatings.content}
              </p>
            </div>

            {/* Professor Rating */}
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Teaching Quality</p>
              <div className="flex items-center justify-center gap-2 mb-2">
                <PartialStarRating rating={averageRatings.professor} />
              </div>
              <p className="text-lg font-semibold text-gray-800">
                {averageRatings.professor}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No ratings available yet</p>
        )}
      </div>

      {/* Common Tags */}
      {tagCounts.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-bold text-blue-900 mb-4">Common Tags</h2>
          <div className="flex flex-wrap gap-2">
            {tagCounts.map(([tag, count]) => (
              <div
                key={tag}
                className="inline-flex items-center gap-2 bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm"
              >
                <span>{tag}</span>
                <span className="font-semibold">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reviews */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-bold text-blue-900 mb-4">
          Student Reviews {professorReviews.length > 0 && `(${professorReviews.length})`}
        </h2>

        {paginatedReviews.length > 0 ? (
          <div className="space-y-4">
            {paginatedReviews.map((review: ProfessorReview) => (
              <div
                key={review.id}
                className="bg-gray-50 rounded-md border border-gray-100 p-4"
              >
                {/* Review Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold text-gray-800">{review.studentName}</p>
                    <p className="text-xs text-gray-500">
                      {review.courseCode} · {new Date(review.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Ratings */}
                <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
                  <div>
                    <p className="text-gray-600 text-xs mb-1">Workload</p>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={
                            i < review.workloadRating
                              ? 'fill-yellow-500 text-yellow-500'
                              : 'text-gray-300'
                          }
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-600 text-xs mb-1">Content</p>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={
                            i < review.contentRating
                              ? 'fill-yellow-500 text-yellow-500'
                              : 'text-gray-300'
                          }
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-600 text-xs mb-1">Teaching</p>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={
                            i < review.professorRating
                              ? 'fill-yellow-500 text-yellow-500'
                              : 'text-gray-300'
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Feedback Text */}
                <p className="text-sm text-gray-700 mb-3">{review.feedback}</p>

                {/* Tags */}
                {review.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {review.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="inline-block text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">
            No reviews yet. Be the first to review!
          </p>
        )}

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
  )
}
