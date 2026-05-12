'use client'

import { useState, useMemo } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { AppShell } from '@/components/layout/AppShell'
import { academyTheme } from '@/lib/theme'
import { monthlyFocuses, todayCalendarClasses } from '@/data/mock'
import type { TodayCalendarClass } from '@/types'
import type { ReactNode } from 'react'

// ─── Date utilities ─────────────────────────────────────────────────────────────

const DAY_ABBR = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function addDays(d: Date, n: number) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n)
}

/** Returns the Monday of the week containing `date`. */
function mondayOf(date: Date) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const offset = (d.getDay() + 6) % 7 // Mon=0 … Sun=6
  d.setDate(d.getDate() - offset)
  return d
}

function fmtWeekRange(monday: Date) {
  const sunday = addDays(monday, 6)
  const s = monday.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  const e = sunday.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
  return `${s} – ${e}`
}

function timeRange(scheduledAt: string, duration: number) {
  const start = new Date(scheduledAt)
  const end = new Date(start.getTime() + duration * 60000)
  const fmt = (d: Date) =>
    d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  return `${fmt(start)} – ${fmt(end)}`
}

function classesOnDay(day: Date) {
  return todayCalendarClasses.filter(c => sameDay(new Date(c.scheduledAt), day))
}

function monthYearOf(date: Date) {
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

// ─── Display helpers ─────────────────────────────────────────────────────────────

function levelLabel(level: string) {
  return (
    ({ kids: 'Kids', beginner: 'Beginner', advanced: 'Advanced', all: 'All Levels' } as Record<string, string>)[level] ?? level
  )
}

function levelColors(level: string): [string, string] {
  return (
    ({
      kids:     ['#DCFCE7', '#166534'],
      beginner: ['#DBEAFE', '#1e3a8a'],
      advanced: ['#EDE9FE', '#4c1d95'],
      all:      ['#F3F4F6', '#374151'],
    } as Record<string, [string, string]>)[level] ?? ['#F3F4F6', '#374151']
  )
}

function typeLabel(type: string) {
  return (
    ({ gi: 'Gi', nogi: 'No-Gi', 'gi-nogi': 'Gi / No-Gi' } as Record<string, string>)[type] ?? type
  )
}

// ─── Action button ───────────────────────────────────────────────────────────────

function ActionBtn({
  children,
  variant = 'ghost',
  onClick,
}: {
  children: ReactNode
  variant?: 'primary' | 'green' | 'gold' | 'outlined' | 'ghost'
  onClick?: () => void
}) {
  const styles: Record<string, React.CSSProperties> = {
    primary:  { background: '#0D1B2A', color: '#fff',      border: 'none' },
    green:    { background: '#DCFCE7', color: '#166534',   border: 'none' },
    gold:     { background: '#FEF3C7', color: '#92400E',   border: 'none' },
    outlined: { background: '#fff',    color: '#0D1B2A',   border: '1px solid rgba(13,27,42,0.2)' },
    ghost:    { background: '#F3F4F6', color: '#374151',   border: 'none' },
  }
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        ...styles[variant],
        padding: '6px 13px',
        borderRadius: 20,
        fontSize: 12,
        fontWeight: 600,
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        lineHeight: 1.4,
      }}
    >
      {children}
    </button>
  )
}

// ─── Class card ──────────────────────────────────────────────────────────────────

type DemoRole = 'student' | 'coach' | 'admin'

function ClassCard({
  cls,
  role,
  today,
}: {
  cls: TodayCalendarClass
  role: DemoRole
  today: Date
}) {
  const [focusOpen, setFocusOpen] = useState(false)
  const clsDate = new Date(cls.scheduledAt)
  const isPast = clsDate < today && !sameDay(clsDate, today)
  const [levelBg, levelFg] = levelColors(cls.level)
  const time = timeRange(cls.scheduledAt, cls.duration)

  // Mock recap / practice availability
  const hasRecap = isPast
  const hasPractice = isPast && (cls.level === 'advanced' || cls.level === 'beginner')

  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 14,
        overflow: 'hidden',
        marginBottom: 12,
        boxShadow: '0 1px 3px rgba(13,27,42,0.07), 0 4px 12px rgba(13,27,42,0.04)',
      }}
    >
      <div style={{ display: 'flex' }}>
        {/* Color accent bar */}
        <div style={{ width: 4, flexShrink: 0, background: cls.color }} />

        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Header row */}
          <div style={{ padding: '14px 14px 0' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: 8,
              }}
            >
              <div style={{ minWidth: 0 }}>
                {/* Title + badges */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: 6,
                    marginBottom: 3,
                  }}
                >
                  <span
                    style={{ fontSize: 15, fontWeight: 700, color: '#1C1C1E' }}
                  >
                    {cls.title}
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      padding: '2px 7px',
                      borderRadius: 20,
                      background: levelBg,
                      color: levelFg,
                      flexShrink: 0,
                    }}
                  >
                    {levelLabel(cls.level)}
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      padding: '2px 7px',
                      borderRadius: 20,
                      background: '#F3F4F6',
                      color: '#6B7280',
                      flexShrink: 0,
                    }}
                  >
                    {typeLabel(cls.type)}
                  </span>
                </div>
                {/* Audience */}
                <p style={{ fontSize: 12, color: '#8A8A8E', margin: 0 }}>
                  {cls.audience}
                </p>
              </div>
            </div>

            {/* Meta: time + coach */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '6px 16px',
                marginTop: 10,
                alignItems: 'center',
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 600, color: '#1C1C1E' }}>
                {time}
              </span>
              <span style={{ fontSize: 12, color: '#8A8A8E' }}>
                {cls.coach}
              </span>
            </div>

            {/* Status chips */}
            <div
              style={{
                display: 'flex',
                gap: 6,
                flexWrap: 'wrap',
                marginTop: 10,
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  padding: '3px 8px',
                  borderRadius: 20,
                  background: hasRecap ? '#DCFCE7' : '#F3F4F6',
                  color: hasRecap ? '#166534' : '#9CA3AF',
                }}
              >
                {hasRecap ? '● Recap available' : '○ No recap yet'}
              </span>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  padding: '3px 8px',
                  borderRadius: 20,
                  background: hasPractice ? '#FEF3C7' : '#F3F4F6',
                  color: hasPractice ? '#92400E' : '#9CA3AF',
                }}
              >
                {hasPractice ? '● Practice assigned' : '○ No practice'}
              </span>
            </div>
          </div>

          {/* Class focus accordion */}
          <div style={{ padding: '10px 14px 0' }}>
            <button
              type="button"
              onClick={() => setFocusOpen(v => !v)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#D4A017',
                }}
              >
                Class Focus
              </span>
              <ChevronRight
                size={12}
                color="#D4A017"
                style={{
                  transform: focusOpen ? 'rotate(90deg)' : 'none',
                  transition: 'transform 200ms ease',
                  flexShrink: 0,
                }}
              />
            </button>
            {focusOpen && (
              <p
                style={{
                  margin: '6px 0 0',
                  fontSize: 12,
                  color: '#1C1C1E',
                  lineHeight: 1.65,
                  padding: '9px 11px',
                  background: '#F7F6F2',
                  borderRadius: 8,
                }}
              >
                {cls.todayFocus}
              </p>
            )}
          </div>

          {/* Action buttons */}
          <div
            style={{
              display: 'flex',
              gap: 8,
              flexWrap: 'wrap',
              padding: '12px 14px 14px',
            }}
          >
            <ActionBtn variant="primary">View Class</ActionBtn>
            {hasRecap && (
              <ActionBtn variant="green">▶ Watch Recap</ActionBtn>
            )}
            {!isPast && (
              <ActionBtn variant="outlined">Book 1-on-1</ActionBtn>
            )}
            {role !== 'student' && (
              <>
                <ActionBtn variant="gold">+ Post Recap</ActionBtn>
                <ActionBtn variant="ghost">+ Assign Practice</ActionBtn>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Empty state ─────────────────────────────────────────────────────────────────

function EmptyDay({ label }: { label: string }) {
  return (
    <div
      style={{
        textAlign: 'center',
        padding: '40px 24px',
        background: '#fff',
        borderRadius: 14,
        boxShadow: '0 1px 3px rgba(13,27,42,0.07)',
      }}
    >
      <div style={{ fontSize: 36, marginBottom: 10 }}>🥋</div>
      <p
        style={{
          fontSize: 14,
          fontWeight: 700,
          color: '#1C1C1E',
          margin: '0 0 4px',
        }}
      >
        No classes on {label}
      </p>
      <p style={{ fontSize: 12, color: '#8A8A8E', margin: 0 }}>
        Check back on a class day, or browse another week.
      </p>
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────────

const DEMO_ROLE: DemoRole = 'student'

export default function SchedulePage() {
  // Use real current date so the week strip always shows the actual current week
  const today = useMemo(() => {
    const d = new Date()
    return new Date(d.getFullYear(), d.getMonth(), d.getDate())
  }, [])

  const [weekStart, setWeekStart] = useState<Date>(() => mondayOf(today))
  const [selected, setSelected] = useState<Date>(() => today)

  const week = useMemo(
    () => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)),
    [weekStart],
  )

  const weekRange = fmtWeekRange(weekStart)
  const visibleMonthLabel = monthYearOf(addDays(weekStart, 3)) // midweek
  const currentFocus =
    monthlyFocuses.find(f => f.month === visibleMonthLabel) ?? null
  const selectedClasses = classesOnDay(selected)
  const isCurrentWeek = sameDay(weekStart, mondayOf(today))

  const selectedLabel = selected.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  return (
    <AppShell
      role={DEMO_ROLE}
      title="Schedule"
      subtitle={`${weekRange} · ${academyTheme.appDisplayName}`}
    >
      <div
        style={{
          background: '#F7F6F2',
          minHeight: '100%',
          margin: '-24px -16px',
          padding: '20px 16px 80px',
        }}
      >
        <div style={{ maxWidth: 600, margin: '0 auto' }}>

          {/* ── Monthly Focus banner ── */}
          <div
            style={{
              background: '#0D1B2A',
              borderRadius: 14,
              padding: '14px 18px',
              marginBottom: 18,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <div style={{ minWidth: 0 }}>
              <p
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: '#D4A017',
                  margin: '0 0 4px',
                }}
              >
                Monthly Focus
              </p>
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#fff',
                  margin: 0,
                }}
              >
                {currentFocus?.theme ?? 'Coming soon'}
              </p>
              {currentFocus && (
                <p
                  style={{
                    fontSize: 11,
                    color: 'rgba(255,255,255,0.5)',
                    margin: '3px 0 0',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {currentFocus.description}
                </p>
              )}
            </div>
            <span
              style={{
                fontSize: 11,
                color: 'rgba(255,255,255,0.4)',
                flexShrink: 0,
                whiteSpace: 'nowrap',
              }}
            >
              {visibleMonthLabel}
            </span>
          </div>

          {/* ── Week navigation ── */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 14,
            }}
          >
            <button
              type="button"
              aria-label="Previous week"
              onClick={() => setWeekStart(w => addDays(w, -7))}
              style={{
                background: '#fff',
                border: '0.5px solid rgba(0,0,0,0.1)',
                borderRadius: 9,
                padding: '6px 8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                flexShrink: 0,
              }}
            >
              <ChevronLeft size={18} color="#1C1C1E" />
            </button>

            <div style={{ flex: 1, textAlign: 'center' }}>
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: '#1C1C1E',
                  margin: 0,
                }}
              >
                {weekRange}
              </p>
            </div>

            {!isCurrentWeek && (
              <button
                type="button"
                onClick={() => {
                  setWeekStart(mondayOf(today))
                  setSelected(today)
                }}
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: '#0D1B2A',
                  background: '#fff',
                  border: '1px solid rgba(13,27,42,0.2)',
                  borderRadius: 20,
                  padding: '4px 11px',
                  cursor: 'pointer',
                  flexShrink: 0,
                  whiteSpace: 'nowrap',
                }}
              >
                This week
              </button>
            )}

            <button
              type="button"
              aria-label="Next week"
              onClick={() => setWeekStart(w => addDays(w, 7))}
              style={{
                background: '#fff',
                border: '0.5px solid rgba(0,0,0,0.1)',
                borderRadius: 9,
                padding: '6px 8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                flexShrink: 0,
              }}
            >
              <ChevronRight size={18} color="#1C1C1E" />
            </button>
          </div>

          {/* ── Day pill strip ── */}
          <div
            style={{
              display: 'flex',
              gap: 6,
              marginBottom: 22,
            }}
          >
            {week.map((day, i) => {
              const isToday = sameDay(day, today)
              const isSel = sameDay(day, selected)
              const isPast = day < today && !isToday
              const dots = classesOnDay(day).slice(0, 3)

              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelected(day)}
                  style={{
                    flex: '1 1 0',
                    minWidth: 0,
                    height: 72,
                    borderRadius: 13,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 3,
                    cursor: 'pointer',
                    border: isSel
                      ? '2px solid #3B6D11'
                      : isToday
                      ? '2px solid #0D1B2A'
                      : '0.5px solid rgba(0,0,0,0.09)',
                    background: isSel ? '#EAF3DE' : '#fff',
                    opacity: isPast && !isSel ? 0.5 : 1,
                    padding: 0,
                    boxSizing: 'border-box',
                    transition: 'opacity 150ms, background 150ms',
                  }}
                >
                  <span
                    style={{
                      fontSize: 9,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      fontWeight: 700,
                      color: isSel
                        ? '#27500A'
                        : isToday
                        ? '#0D1B2A'
                        : '#8A8A8E',
                    }}
                  >
                    {DAY_ABBR[i]}
                  </span>

                  {isToday ? (
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        background: '#0D1B2A',
                        color: '#fff',
                        fontSize: 13,
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {day.getDate()}
                    </div>
                  ) : (
                    <span
                      style={{
                        fontSize: 17,
                        fontWeight: 700,
                        color: isSel ? '#27500A' : '#1C1C1E',
                        lineHeight: 1,
                      }}
                    >
                      {day.getDate()}
                    </span>
                  )}

                  <div style={{ display: 'flex', gap: 3, minHeight: 5 }}>
                    {dots.map((c, j) => (
                      <div
                        key={j}
                        style={{
                          width: 4,
                          height: 4,
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

          {/* ── Selected day label ── */}
          <p
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: '#1C1C1E',
              marginBottom: 14,
            }}
          >
            {selectedLabel}
            {isCurrentWeek && sameDay(selected, today) ? (
              <span
                style={{
                  marginLeft: 8,
                  fontSize: 10,
                  fontWeight: 700,
                  padding: '2px 7px',
                  borderRadius: 20,
                  background: '#0D1B2A',
                  color: '#fff',
                  verticalAlign: 'middle',
                }}
              >
                Today
              </span>
            ) : null}
          </p>

          {/* ── Class cards / empty state ── */}
          {selectedClasses.length === 0 ? (
            <EmptyDay label={selectedLabel} />
          ) : (
            selectedClasses.map(cls => (
              <ClassCard key={cls.id} cls={cls} role={DEMO_ROLE} today={today} />
            ))
          )}

          {/* ── Powered by footer ── */}
          <p
            style={{
              textAlign: 'center',
              fontSize: 11,
              color: 'rgba(0,0,0,0.22)',
              marginTop: 36,
            }}
          >
            Powered by AcademyHub
          </p>
        </div>
      </div>
    </AppShell>
  )
}
