"use client"

import React, { useMemo, useState } from 'react'
import { mockSchedule } from '../lib/mockData'
import { FileText, Link as LinkIcon, File, Download, Search } from 'lucide-react'

type ResourceType = 'ppt' | 'doc' | 'link'

interface ResourceItem {
  id: string
  courseCode: string
  title: string
  type: ResourceType
  url: string
}

export default function ResourceCentral() {
  // derive course tabs from mock schedule (unique courseCode + name)
  const tabs = useMemo(() => {
    const map = new Map<string, string>()
    mockSchedule.forEach((s) => {
      if (!map.has(s.courseCode)) map.set(s.courseCode, s.courseName)
    })
    return Array.from(map.entries()).map(([code, name]) => ({ code, name }))
  }, [])

  // create small mock resources per course (ppt, doc, link)
  const resources = useMemo(() => {
    const items: ResourceItem[] = []
    mockSchedule.forEach((s, i) => {
      const base = `${s.courseCode} - ${s.courseName}`
      items.push({ id: `${i}-ppt`, courseCode: s.courseCode, title: `${base} - Lecture Slides`, type: 'ppt', url: '#' })
      items.push({ id: `${i}-doc`, courseCode: s.courseCode, title: `${base} - Syllabus`, type: 'doc', url: '#' })
      items.push({ id: `${i}-link`, courseCode: s.courseCode, title: `${base} - Lecture Recording`, type: 'link', url: '#' })
    })
    return items
  }, [])

  const [activeTab, setActiveTab] = useState<string>(tabs[0]?.code ?? '')
  const [query, setQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState<ResourceType | 'all'>('all')
  const [page, setPage] = useState(1)
  const perPage = 6

  const filtered = useMemo(() => {
    const list = resources.filter((r) => r.courseCode === activeTab)
      .filter((r) => typeFilter === 'all' ? true : r.type === typeFilter)
      .filter((r) => r.title.toLowerCase().includes(query.toLowerCase()))
    return list
  }, [resources, activeTab, typeFilter, query])

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage)

  const iconForType = (t: ResourceType) => {
    switch (t) {
      case 'ppt':
        return <File className="text-blue-700" />
      case 'doc':
        return <FileText className="text-blue-700" />
      case 'link':
        return <LinkIcon className="text-blue-700" />
    }
  }

  const handleDownload = (item: ResourceItem) => {
    // placeholder for download behavior
    // in real app you'd hit the url or proxy endpoint
    // for now just open the url or console.log
    if (item.url && item.url !== '#') window.open(item.url, '_blank')
    else console.log('Downloading', item)
  }

  return (
    <div className="w-full overflow-hidden border-2 border-[var(--color-primary)] rounded-lg p-4 bg-[#ececec6c]">
      <h2 className="text-2xl font-bold text-[var(--color-primary)]">Shared Materials</h2>
      <p className="mt-2 text-sm text-gray-700">Access materials uploaded by other students.</p>

      {/* Tabs */}
      <div className="mt-4 flex gap-2 flex-wrap">
        {tabs.map((t) => (
          <button
            key={t.code}
            onClick={() => { setActiveTab(t.code); setPage(1) }}
            className={`px-3 py-1.5 rounded-md text-sm font-medium ${activeTab === t.code ? 'bg-[var(--color-primary)] text-white' : 'bg-gray-200 text-gray-700'}`}>
            {t.code}
          </button>
        ))}
      </div>

      {/* Inner panel */}
  <div className="mt-4 bg-gray-50 rounded-md p-4 w-full overflow-hidden">
        {/* Search + filter */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center bg-white border border-gray-200 rounded-md px-3 py-1 w-full">
            <Search className="mr-2 text-gray-500" />
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1) }}
              placeholder="Search materials..."
              className="w-full text-sm bg-transparent outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={typeFilter}
              onChange={(e) => { const v = e.target.value as ResourceType | 'all'; setTypeFilter(v); setPage(1) }}
              className="bg-white border border-gray-200 rounded-md px-3 py-1 text-sm"
            >
              <option value="all">All</option>
              <option value="ppt">Slides (ppt)</option>
              <option value="doc">Docs</option>
              <option value="link">Links</option>
            </select>
          </div>
        </div>

        {/* Cards list - one card per row */}
        <div className="flex flex-col gap-4 w-full">
          {pageItems.map((it) => (
            <div key={it.id} className="flex items-center justify-between gap-3 p-3 bg-yellow-100 rounded-md w-full">
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2 bg-white rounded-md flex items-center justify-center flex-shrink-0">
                  {iconForType(it.type)}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-gray-800 truncate">{it.title}</div>
                  <div className="text-xs text-gray-500">{it.courseCode}</div>
                </div>
              </div>

              <div className="flex-shrink-0">
                <button
                  onClick={() => handleDownload(it)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--color-primary)] text-white rounded-md text-sm"
                >
                  <Download size={16} />
                  <span className="hidden sm:inline">Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">Showing {filtered.length === 0 ? 0 : (page - 1) * perPage + 1} - {Math.min(page * perPage, filtered.length)} of {filtered.length}</div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 rounded-md bg-white border border-gray-200 text-sm disabled:opacity-50"
            >Prev</button>
            <div className="hidden sm:flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`px-2 py-1 rounded-md text-sm ${p === page ? 'bg-[var(--color-primary)] text-white' : 'bg-white border border-gray-200 text-gray-700'}`}
                >{p}</button>
              ))}
            </div>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1 rounded-md bg-white border border-gray-200 text-sm disabled:opacity-50"
            >Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}
