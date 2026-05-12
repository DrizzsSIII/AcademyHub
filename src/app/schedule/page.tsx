'use client'

import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { AppShell } from '@/components/layout/AppShell'
import { academyTheme } from '@/lib/theme'
import { monthlyFocus, todayCalendarClasses as classes } from '@/data/mock'

const DAY_LETTERS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const MONTHS = ['January', 'February', 'March', 'April', 'May',
  'June', 'July', 'August', 'September', 'October', 'November',
  'December']
const WEEKS_BACK = 52
const WEEKS_FORWARD = 52

function mondayIndex(d: Date) {
  return (d.getDay() + 6) % 7
}

function startOfWeekMonday(date: Date) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  d.setDate(d.getDate() - mondayIndex(d))
  return d
}

function addDays(date: Date, days: number) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + days
  )
}

function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
}

function monthYearLabel(date: Date) {
  return `${MONTHS[date.getMonth()]} ${date.getFullYear()}`
}

function shortMonthLabel(monthYear: string) {
  const part = monthYear.trim().split(/\s+/)[0]
  return part || monthYear
}

function classesOnDay(day: Date) {
  return classes.filter(c =>
    sameDay(new Date(c.scheduledAt), day))
}

function fmt12(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString('en-US', {
    hour: 'numeric', minute: '2-digit'
  })
}

function fmtDayHeader(day: Date) {
  return day.toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric'
  })
}

function timeRange(scheduledAt: string, duration: number) {
  const start = new Date(scheduledAt)
  const end = new Date(start.getTime() + duration * 60000)
  const fmt = (d: Date) => d.toLocaleTimeString('en-US', {
    hour: 'numeric', minute: '2-digit'
  })
  return `${fmt(start)} – ${fmt(end)}`
}

export default function SchedulePage() {
  const anchorDay = useMemo(() => {
    const d = new Date()
    return new Date(d.getFullYear(), d.getMonth(), d.getDate())
  }, [])

  const weeks = useMemo(() => {
    const anchorWeek = startOfWeekMonday(anchorDay)
    const firstWeekStart = addDays(anchorWeek, -WEEKS_BACK * 7)
    const totalWeeks = WEEKS_BACK + WEEKS_FORWARD + 1
    const out: Date[][] = []
    for (let w = 0; w < totalWeeks; w++) {
      const weekStart = addDays(firstWeekStart, w * 7)
      const days: Date[] = []
      for (let d = 0; d < 7; d++) {
        days.push(addDays(weekStart, d))
      }
      out.push(days)
    }
    return out
  }, [anchorDay])

  const [selected, setSelected] = useState(() => {
    const d = new Date()
    return new Date(d.getFullYear(), d.getMonth(), d.getDate())
  })
  const [openId, setOpenId] = useState<string | null>(null)
  const [focusExpanded, setFocusExpanded] = useState(false)
  const [visibleWeekIdx, setVisibleWeekIdx] = useState(0)
  const stripRef = useRef<HTMLDivElement>(null)

  const selectedClasses = classesOnDay(selected)
  const visibleWeek = weeks[visibleWeekIdx] ?? weeks[WEEKS_BACK] ?? []
  const visibleMonthDate = visibleWeek[3] ?? selected
  const visibleMonthLabel = monthYearLabel(visibleMonthDate)
  const focusMatchesVisibleMonth = visibleMonthLabel === monthlyFocus.month

  useLayoutEffect(() => {
    const strip = stripRef.current
    if (!strip) return
    const todayWeekIdx = weeks.findIndex((week) =>
      week.some((d) => sameDay(d, new Date()))
    )
    const initialIdx = todayWeekIdx >= 0 ? todayWeekIdx : WEEKS_BACK
    strip.scrollLeft = initialIdx * strip.clientWidth
    setVisibleWeekIdx(initialIdx)
  }, [weeks])

  function syncVisibleWeek() {
    const strip = stripRef.current
    if (!strip || !strip.clientWidth) return
    const idx = Math.round(strip.scrollLeft / strip.clientWidth)
    const clamped = Math.max(0, Math.min(idx, weeks.length - 1))
    setVisibleWeekIdx(clamped)
  }

  function pickDay(day: Date) {
    setSelected(day)
    setOpenId(null)
  }

  return (
    <AppShell
      role="student"
      title="Schedule"
      subtitle={`Classes · ${academyTheme.appDisplayName}`}
    >
      <div
        className="-mx-4 -mt-6 min-h-full pb-10 pt-0 md:-mx-8 md:-mt-8"
        style={{
          background: '#F7F6F2',
          padding: '16px',
        }}
      >
        <div className="mx-auto max-w-lg">
      <style>{`
        .schedule-day-strip::-webkit-scrollbar { display: none; }
      `}</style>

      <div style={{
        marginBottom: 16,
        textAlign: 'center',
      }}>
        <span style={{ fontSize: 16, fontWeight: 600,
          color: '#1C1C1E' }}>
          {visibleMonthLabel}
        </span>
      </div>

      <div
        ref={stripRef}
        className="schedule-day-strip"
        onScroll={syncVisibleWeek}
        style={{
          display: 'flex',
          overflowX: 'auto',
          padding: '4px 0 12px',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch',
          scrollSnapType: 'x mandatory',
        }}
      >
        {weeks.map((week, weekIdx) => (
          <div
            key={weekIdx}
            style={{
              flex: '0 0 100%',
              display: 'flex',
              gap: 8,
              scrollSnapAlign: 'start',
              scrollSnapStop: 'always',
              boxSizing: 'border-box',
            }}
          >
            {week.map((thisDay, dayIdx) => {
              const isToday = sameDay(thisDay, new Date())
              const isSel = sameDay(thisDay, selected)
              const dayClasses = classesOnDay(thisDay)
              const dots = dayClasses.slice(0, 3)
              const letter = DAY_LETTERS[dayIdx]
              const dayNum = thisDay.getDate()

              return (
                <button
                  key={dayIdx}
                  type="button"
                  onClick={() => pickDay(thisDay)}
                  style={{
                    flex: '1 1 0',
                    minWidth: 0,
                    height: 64,
                    borderRadius: 12,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 4,
                    cursor: 'pointer',
                    border: isSel
                      ? '1.5px solid #3B6D11'
                      : '0.5px solid rgba(0,0,0,0.07)',
                    background: isSel ? '#EAF3DE' : '#fff',
                    padding: 0,
                    boxSizing: 'border-box',
                  }}
                >
                  <span style={{
                    fontSize: 10,
                    textTransform: 'uppercase',
                    color: isToday ? '#0D1B2A' : (isSel ? '#27500A' : '#8A8A8E'),
                  }}>
                    {letter}
                  </span>
                  {isToday ? (
                    <div style={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      background: '#0D1B2A',
                      color: '#fff',
                      fontSize: 14,
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      {dayNum}
                    </div>
                  ) : (
                    <span style={{
                      fontSize: 18,
                      fontWeight: 600,
                      color: isSel ? '#27500A' : '#1C1C1E',
                    }}>
                      {dayNum}
                    </span>
                  )}
                  <div style={{
                    display: 'flex',
                    gap: 3,
                    marginTop: 2,
                    minHeight: dots.length ? 5 : 0,
                    justifyContent: 'center',
                  }}>
                    {dots.map((c, j) => (
                      <div
                        key={j}
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: '50%',
                          background: c.color ?? '#D4A017',
                        }}
                      />
                    ))}
                  </div>
                </button>
              )
            })}
          </div>
        ))}
      </div>

      <div style={{
        marginTop: 16,
        background: '#fff',
        border: '0.5px solid rgba(0,0,0,0.07)',
        borderRadius: 12,
        overflow: 'hidden',
      }}>
        <button
          type="button"
          onClick={() => setFocusExpanded((v) => !v)}
          style={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            gap: 8,
            padding: '12px 14px',
            background: '#F7F6F2',
            border: 'none',
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          <span style={{
            fontSize: 10,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#8A8A8E',
            fontWeight: 600,
            flexShrink: 0,
          }}>
            {shortMonthLabel(visibleMonthLabel)} focus
          </span>
          <span style={{
            flex: 1,
            fontSize: 13,
            fontWeight: 600,
            color: '#1C1C1E',
          }}>
            {focusMatchesVisibleMonth
              ? monthlyFocus.theme
              : 'Focus details coming soon'}
          </span>
          <ChevronRight
            size={14}
            color="#8A8A8E"
            style={{
              transform: focusExpanded ? 'rotate(90deg)' : 'none',
              transition: 'transform 200ms ease',
              flexShrink: 0,
            }}
          />
        </button>
        {focusExpanded && (
          <div style={{
            padding: '12px 14px',
            borderTop: '0.5px solid rgba(0,0,0,0.07)',
          }}>
            <p style={{
              fontSize: 12,
              color: '#8A8A8E',
              lineHeight: 1.6,
              margin: 0,
            }}>
              {focusMatchesVisibleMonth
                ? monthlyFocus.description
                : `No monthly focus has been published for ${visibleMonthLabel} yet.`}
            </p>
          </div>
        )}
      </div>

      <div style={{ marginTop: 20 }}>
        <p style={{ fontSize: 13, fontWeight: 600,
          color: '#1C1C1E', marginBottom: 12 }}>
          {fmtDayHeader(selected)}
        </p>

        {selectedClasses.length === 0 ? (
          <p style={{ fontSize: 13, color: '#8A8A8E',
            textAlign: 'center', padding: '24px 0' }}>
            No classes scheduled
          </p>
        ) : selectedClasses.map((cls) => {
          const isOpen = openId === cls.id
          return (
            <div key={cls.id} style={{
              background: '#fff',
              border: '0.5px solid rgba(0,0,0,0.07)',
              borderRadius: 12, overflow: 'hidden',
              marginBottom: 10 }}>
              <div onClick={() =>
                setOpenId(isOpen ? null : cls.id)}
                style={{ display: 'flex',
                  alignItems: 'stretch', cursor: 'pointer' }}>
                <div style={{ width: 4, flexShrink: 0,
                  background: cls.color ?? '#D4A017' }} />
                <div style={{ padding: '12px 13px', flex: 1 }}>
                  <div style={{ display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: 2 }}>
                    <div>
                      <p style={{ fontSize: 14,
                        fontWeight: 600, color: '#1C1C1E',
                        margin: 0 }}>
                        {cls.title}
                      </p>
                      <p style={{ fontSize: 12,
                        color: '#8A8A8E', margin: '2px 0 0' }}>
                        {cls.audience}
                      </p>
                    </div>
                    <span style={{ fontSize: 11,
                      color: '#8A8A8E', whiteSpace: 'nowrap',
                      marginLeft: 8, paddingTop: 2 }}>
                      {fmt12(cls.scheduledAt)}
                    </span>
                  </div>
                  <p style={{ fontSize: 12, color: '#8A8A8E',
                    margin: '4px 0 0' }}>
                    {cls.coach} · {timeRange(cls.scheduledAt, cls.duration)}
                  </p>
                  {isOpen && (
                    <div style={{ background: '#F7F6F2',
                      borderRadius: 6, padding: '8px 10px',
                      marginTop: 10 }}>
                      <p style={{ fontSize: 9,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        color: '#D4A017', fontWeight: 600,
                        margin: '0 0 4px' }}>
                        Today&apos;s focus
                      </p>
                      <p style={{ fontSize: 12,
                        color: '#1C1C1E', lineHeight: 1.5,
                        margin: 0 }}>
                        {cls.todayFocus}
                      </p>
                    </div>
                  )}
                </div>
                <div style={{ display: 'flex',
                  alignItems: 'center', paddingRight: 12 }}>
                  <ChevronRight size={14} color="#8A8A8E"
                    style={{ transform: isOpen
                      ? 'rotate(90deg)' : 'none',
                      transition: 'transform 200ms' }} />
                </div>
              </div>
            </div>
          )
        })}
      </div>
        </div>
      </div>
    </AppShell>
  )
}
