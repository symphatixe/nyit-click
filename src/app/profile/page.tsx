import React from 'react'
import WelcomeHeader from '../components/homepageHeader'
import ProfilePic from '../components/profilePicture'
import { mockSchedule } from '../lib/mockData'

export default function Profile() {
  // semester dates (adjust as needed)
  const semesterStart = new Date('2025-08-25')
  const semesterEnd = new Date('2025-12-12')

  const msPerWeek = 1000 * 60 * 60 * 24 * 7
  const totalWeeks = Math.max(1, Math.ceil((semesterEnd.getTime() - semesterStart.getTime()) / msPerWeek))

  const now = new Date()
  const weeksPassed = now < semesterStart ? 0 : Math.min(totalWeeks, Math.floor((now.getTime() - semesterStart.getTime()) / msPerWeek) + 1)
  const weeksRemaining = Math.max(0, totalWeeks - weeksPassed)
  const percent = Math.round((weeksPassed / totalWeeks) * 100)

  // helper to map mockSchedule day (MON...) to weekday number (0=Sun..6=Sat)
  const dayNameToIndex: Record<string, number> = {
    SUN: 0,
    MON: 1,
    TUE: 2,
    WED: 3,
    THU: 4,
    FRI: 5,
    SAT: 6,
  }

  const todayIndex = new Date().getDay()

  // group classes by course (combine multiple days into one card)
  const grouped = React.useMemo(() => {
    const map = new Map<string, {
      courseCode: string;
      courseName: string;
      occurrences: { day: string; startTime: string; endTime: string; room: string }[];
    }>()

    mockSchedule.forEach((s) => {
      const key = `${s.courseCode}||${s.courseName}`
      if (!map.has(key)) map.set(key, { courseCode: s.courseCode, courseName: s.courseName, occurrences: [] })
      map.get(key)!.occurrences.push({ day: s.day, startTime: s.startTime, endTime: s.endTime, room: s.room })
    })

    return Array.from(map.values()).map((g) => {
      // group occurrences by time+room so same-time multiple days join
      const occMap = new Map<string, { days: string[]; startTime: string; endTime: string; room: string }>()
      g.occurrences.forEach((o) => {
        const tkey = `${o.startTime}||${o.endTime}||${o.room}`
        if (!occMap.has(tkey)) occMap.set(tkey, { days: [], startTime: o.startTime, endTime: o.endTime, room: o.room })
        occMap.get(tkey)!.days.push(o.day)
      })

      return {
        courseCode: g.courseCode,
        courseName: g.courseName,
        times: Array.from(occMap.values()).map(x => ({ days: x.days, startTime: x.startTime, endTime: x.endTime, room: x.room }))
      }
    })
  }, [])

  const formatMilitaryTimeToAmPm = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const adjustedHours = hours % 12 || 12; // if the hours component is 0, make it 12. probably won't need it b/c no midnight classes, but just in case
    return `${adjustedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Top row: welcome + profile pic */}
      <div className="flex items-center justify-between gap-6">
        <div className="flex-1">
          <WelcomeHeader />
        </div>
        <div className="shrink-0">
          <ProfilePic />
        </div>
      </div>

      {/* Semester progress */}
      <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-blue-900">Semester progress</h3>
          <div className="text-sm text-yellow-600 font-medium">{percent}%</div>
        </div>

        <div className="mt-3">
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div className="h-3 bg-yellow-500" style={{ width: `${percent}%` }} />
          </div>
          <div className="mt-2 text-sm text-gray-600">Week {weeksPassed} of {totalWeeks} - {weeksRemaining} remaining</div>
        </div>
      </div>

      {/* Class schedule */}
      <div className="mt-6 bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-blue-900">Class schedule</h3>
          <div className="text-sm text-gray-600">{grouped.length} classes</div>
        </div>

        <div className="mt-4 space-y-3">
          {grouped.map((g, idx) => {
            const anyToday = g.times.some(t => t.days.some(d => dayNameToIndex[d] === todayIndex))

            return (
              <div key={idx} className="bg-gray-50 border border-gray-100 rounded-md p-3">
                <div className="flex items-start justify-between">
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-gray-800 truncate">{g.courseCode} — {g.courseName}</div>
                    <div className="mt-1 space-y-1">
                      {g.times.map((t, i) => (
                        <div key={i} className="text-xs text-gray-500">
                          <span className="font-medium text-gray-700">{t.days.sort((a,b)=> (dayNameToIndex[a]-dayNameToIndex[b])).join(' ')}</span>
                          {` • ${formatMilitaryTimeToAmPm(t.startTime)} - ${formatMilitaryTimeToAmPm(t.endTime)} • Room: `}
                          <span className="font-medium text-gray-700">{t.room}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {anyToday ? (
                    <div className="ml-4 px-3 py-1 rounded-md bg-blue-900 text-white text-sm font-semibold">Today</div>
                  ) : null}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
