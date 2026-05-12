import type {
  Academy,
  AcademyCompetition,
  Announcement,
  Badge,
  ClassSession,
  CoachEngagementSummary,
  CurriculumPath,
  MonthlyFocus,
  PracticeAssignment,
  PrivateTrainingCoach,
  ProgressStats,
  QuestionThread,
  SkillChecklistItem,
  StudentRow,
  StudySession,
  TodayCalendarClass,
  User,
  Video,
  WeeklyActivity,
} from "@/types";

export const academy: Academy = {
  id: "acad-nsjj",
  name: "Northside Jiu Jitsu",
  shortName: "Northside JJ",
};

export const users: User[] = [
  {
    id: "u-alex",
    name: "Alex Johnson",
    role: "student",
    belt: "blue",
    membership: "in-person",
  },
  {
    id: "u-rivera",
    name: "Coach Rivera",
    role: "coach",
    title: "Head Coach",
    isHeadCoach: true,
  },
  {
    id: "u-lee",
    name: "Coach Lee",
    role: "coach",
    title: "Assistant Coach",
  },
  {
    id: "u-maya",
    name: "Maya Chen",
    role: "student",
    belt: "white",
    membership: "in-person",
  },
  {
    id: "u-jordan",
    name: "Jordan Patel",
    role: "student",
    belt: "purple",
    membership: "online",
  },
  {
    id: "u-sam",
    name: "Sam Ortiz",
    role: "student",
    belt: "white",
    membership: "in-person",
  },
  {
    id: "u-riley",
    name: "Riley Brooks",
    role: "student",
    belt: "blue",
    membership: "in-person",
  },
];

export const currentStudentId = "u-alex";

export const coachDashboardUserId = "u-rivera";

/** Alex missed the most recent scheduled class (for catch-up card). */
export const studentMissedLastClass = true;

/** Fixed “today” for demo consistency (matches UI screenshots / reviews). */
export const mockNow = new Date("2026-05-09T09:00:00");

const now = mockNow;

function iso(d: Date) {
  return d.toISOString();
}

/** Classes spanning last 7 days + next 7 days from mock "today". */
export const classes: ClassSession[] = [
  {
    id: "cls-guard-mon",
    title: "Guard passing fundamentals",
    startsAt: iso(new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)),
    coachId: "u-rivera",
    type: "Gi",
    level: "Beginner",
    attendanceCount: 18,
    attendeeStudentIds: ["u-alex", "u-maya", "u-sam", "u-riley"],
    recap: {
      videoYoutubeId: "dQw4w9WgXcQ",
      summary:
        "We chained knee cut → toreando and finished with a smash pass reset when they framed hard.",
      keyDetails: [
        "Control the far hip before you clear the knee shield",
        "Hide your head — if they can push your face, the pass stalls",
        "Finish in chest-to-chest side control, not floating",
      ],
      commonMistakes: [
        "Rushing the knee cut without clearing the bottom hook",
        "Standing too tall and giving up the underhook battle",
      ],
      practiceAssignmentId: "prac-1",
    },
  },
  {
    id: "cls-single-wed",
    title: "Single leg takedowns",
    startsAt: iso(new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000)),
    coachId: "u-lee",
    type: "No-Gi",
    level: "Intermediate",
    attendanceCount: 14,
    attendeeStudentIds: ["u-maya", "u-jordan", "u-sam", "u-riley"],
    recap: {
      videoYoutubeId: "9bZkp7q19f0",
      summary:
        "Entries from collar tie and inside reach — finish with run-the-pipe and cutback options.",
      keyDetails: [
        "Head position wins the first step",
        "Shelf the leg on your inside hip",
        "If they whizzer hard, switch to ankle pick entries",
      ],
      commonMistakes: [
        "Dropping the head to the mat on the finish",
        "Not blocking the far hip on the cutback",
      ],
      practiceAssignmentId: "prac-1",
    },
  },
  {
    id: "cls-morning-fri",
    title: "Morning fundamentals",
    startsAt: iso(new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000)),
    coachId: "u-rivera",
    type: "Gi",
    level: "All",
    attendanceCount: 11,
    attendeeStudentIds: ["u-alex", "u-maya", "u-sam"],
    recap: {
      videoYoutubeId: "L_jWHffIx5E",
      summary: "Grip fighting to closed guard — posture breaks and hip heist reps.",
      keyDetails: [
        "Break grips in an order: collar, sleeve, then hip",
        "Hip heist is a slide, not a sit-up",
        "Keep ankles crossed until you secure posture breaks",
      ],
      commonMistakes: [
        "Pulling with arms instead of loading hips",
        "Opening guard early against heavy pressure",
      ],
    },
  },
  {
    id: "cls-open-sat",
    title: "Open mat",
    startsAt: iso(new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000)),
    coachId: "u-rivera",
    type: "Open Mat",
    level: "All",
    attendanceCount: 22,
    attendeeStudentIds: ["u-alex", "u-maya", "u-jordan", "u-sam", "u-riley"],
  },
  {
    id: "cls-armbar-next-mon",
    title: "Arm bar variations",
    startsAt: iso(new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000)),
    coachId: "u-rivera",
    type: "Gi",
    level: "Intermediate",
    attendanceCount: 0,
    attendeeStudentIds: [],
  },
  {
    id: "cls-tonight-drills",
    title: "Competition rounds — guard defense",
    startsAt: iso(new Date(now.getTime() + 9 * 60 * 60 * 1000)),
    coachId: "u-rivera",
    type: "No-Gi",
    level: "Advanced",
    attendanceCount: 0,
    attendeeStudentIds: [],
  },
];

export const videos: Video[] = [
  {
    id: "vid-1",
    title: "Arm bar from closed guard",
    youtubeId: "dQw4w9WgXcQ",
    durationSeconds: 18 * 60 + 34,
    coachId: "u-rivera",
    classId: "cls-guard-mon",
    tags: ["Submissions", "Guard"],
    level: "Intermediate",
    watchStatus: "watched",
    recordedAt: iso(new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)),
  },
  {
    id: "vid-2",
    title: "Single leg takedown entries",
    youtubeId: "9bZkp7q19f0",
    durationSeconds: 24 * 60 + 12,
    coachId: "u-lee",
    classId: "cls-single-wed",
    tags: ["Takedowns", "No-Gi"],
    level: "Intermediate",
    watchStatus: "watched",
    recordedAt: iso(new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000)),
  },
  {
    id: "vid-3",
    title: "Hip escape escapes",
    youtubeId: "L_jWHffIx5E",
    durationSeconds: 14 * 60 + 55,
    coachId: "u-rivera",
    tags: ["Escapes", "Fundamentals"],
    level: "Beginner",
    watchStatus: "watched",
    recordedAt: iso(new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000)),
  },
  {
    id: "vid-4",
    title: "Guard retention drill",
    youtubeId: "y6120QOlsfU",
    durationSeconds: 11 * 60 + 20,
    coachId: "u-rivera",
    curriculumPathId: "path-guard-fund",
    tags: ["Guard", "Drill"],
    level: "Beginner",
    watchStatus: "in_progress",
  },
  {
    id: "vid-5",
    title: "Morning warm-up mobility",
    youtubeId: "3GwjfUFyY6M",
    durationSeconds: 8 * 60 + 45,
    coachId: "u-rivera",
    curriculumPathId: "path-white-belt",
    tags: ["Mobility"],
    level: "All",
    watchStatus: "unwatched",
  },
];

export const curriculumPaths: CurriculumPath[] = [
  {
    id: "path-white-belt",
    title: "White Belt Survival",
    videoCount: 8,
    topics: [
      "Breakfall",
      "Hip escape",
      "Bridge and roll",
      "Technical standup",
      "Closed guard posture",
      "Mount escape",
      "Side control escape",
      "Guard retention",
    ],
  },
  {
    id: "path-guard-fund",
    title: "Guard Fundamentals",
    videoCount: 5,
    topics: [
      "Grip fighting",
      "Closed guard breaks",
      "Open guard retention",
      "Collar-sleeve basics",
      "Recovery mechanics",
    ],
  },
  {
    id: "path-takedowns",
    title: "Takedowns",
    videoCount: 4,
    topics: [
      "Level change timing",
      "Single leg chain",
      "Double leg entries",
      "Front headlock defense",
    ],
  },
];

export const practiceAssignments: PracticeAssignment[] = [
  {
    id: "prac-1",
    title: "After class practice — guard passing",
    dueDate: iso(new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000)),
    status: "completed",
    relatedClassId: "cls-guard-mon",
    items: [
      {
        id: "pi-1",
        title: "Hip escape drill",
        type: "rounds",
        rounds: 3,
        durationMinutes: 2,
        completed: true,
      },
      {
        id: "pi-2",
        title: "Bridge and roll",
        type: "reps",
        reps: 20,
        sets: 3,
        completed: true,
      },
      {
        id: "pi-3",
        title: "Hip mobility routine",
        type: "video",
        videoId: "vid-5",
        completed: true,
      },
    ],
  },
  {
    id: "prac-2",
    title: "Week 2 fundamentals",
    dueDate: iso(new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000)),
    status: "in_progress",
    items: [
      {
        id: "pi-4",
        title: "Technical standup",
        type: "reps",
        reps: 15,
        completed: false,
      },
      {
        id: "pi-5",
        title: "Shrimp drill",
        type: "rounds",
        rounds: 2,
        completed: false,
      },
    ],
  },
];

export const skillsChecklist: SkillChecklistItem[] = [
  { id: "sk-1", name: "Breakfall", status: "completed" },
  { id: "sk-2", name: "Hip escape", status: "completed" },
  { id: "sk-3", name: "Bridge and roll", status: "completed" },
  { id: "sk-4", name: "Technical standup", status: "practicing" },
  { id: "sk-5", name: "Closed guard posture", status: "practicing" },
  { id: "sk-6", name: "Mount escape", status: "introduced" },
];

export const questions: QuestionThread[] = [
  {
    id: "q-1",
    classId: "cls-guard-mon",
    authorStudentId: "u-alex",
    text: "What do you do when they straighten their arm before you get the hip out?",
    createdAt: iso(new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000)),
    answered: true,
    answer: {
      coachId: "u-rivera",
      text: "Switch to a cross-collar grip and threaten the choke to re-bend, or transition to a pendulum sweep setup.",
      answeredAt: iso(new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000)),
    },
  },
  {
    id: "q-2",
    classId: "cls-single-wed",
    authorStudentId: "u-maya",
    text: "Should legs be crossed or uncrossed when finishing?",
    createdAt: iso(new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000)),
    answered: true,
    answer: {
      coachId: "u-lee",
      text: "Uncrossed for the cutback finish — crossed only if you're shelving for the dump.",
      answeredAt: iso(new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000)),
    },
  },
  {
    id: "q-3",
    classId: "cls-guard-mon",
    authorStudentId: "u-riley",
    text: "Counter if they roll to their elbow?",
    createdAt: iso(new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000)),
    answered: false,
  },
];

export const progressStats: ProgressStats = {
  classesAttended: 47,
  videosWatched: 31,
  questionsAsked: 8,
  streakDays: 12,
  practiceAssignmentsDone: 9,
  curriculumPercent: 62,
  skillsCompleted: 3,
  skillsPracticing: 2,
  skillsIntroduced: 1,
  belt: "blue",
};

export const weeklyActivity: WeeklyActivity[] = [
  { label: "Mon", value: 2 },
  { label: "Tue", value: 1 },
  { label: "Wed", value: 3 },
  { label: "Thu", value: 0 },
  { label: "Fri", value: 2 },
  { label: "Sat", value: 4 },
  { label: "Sun", value: 1 },
];

export const badges: Badge[] = [
  { id: "bdg-1", label: "7-day streak", earnedAt: iso(new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000)) },
  { id: "bdg-2", label: "First competition prep", earnedAt: iso(new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)) },
  { id: "bdg-3", label: "Library explorer", earnedAt: iso(new Date(now.getTime() - 45 * 24 * 60 * 60 * 1000)) },
];

export const announcements: Announcement[] = [
  {
    id: "ann-1",
    title: "In-house superfight showcase — June 14",
    body: "Sign-ups open Monday. Speak with Coach Rivera if you want a matched bout.",
    pinned: true,
    coachId: "u-rivera",
    createdAt: iso(new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000)),
  },
];

export const privateTrainingCoaches: PrivateTrainingCoach[] = [
  {
    id: "u-rivera",
    name: "Coach Rivera",
    role: "coach",
    title: "Head Coach",
    isHeadCoach: true,
    specialty: "Guard systems, competition prep, leg entanglements",
    sessionTypes: ["In-person", "Online review"],
  },
  {
    id: "u-lee",
    name: "Coach Lee",
    role: "coach",
    title: "Assistant Coach",
    specialty: "Wrestling entries, No-Gi scrambles, cardio rounds",
    sessionTypes: ["In-person", "Partner drills"],
  },
];

export const studentsTable: StudentRow[] = [
  {
    id: "u-alex",
    name: "Alex Johnson",
    belt: "blue",
    membership: "in-person",
    status: "active",
    classesAttended: 47,
    lastActive: "Today",
  },
  {
    id: "u-maya",
    name: "Maya Chen",
    belt: "white",
    membership: "in-person",
    status: "trial",
    classesAttended: 12,
    lastActive: "2d ago",
  },
  {
    id: "u-jordan",
    name: "Jordan Patel",
    belt: "purple",
    membership: "online",
    status: "active",
    classesAttended: 28,
    lastActive: "Yesterday",
  },
  {
    id: "u-sam",
    name: "Sam Ortiz",
    belt: "white",
    membership: "in-person",
    status: "active",
    classesAttended: 33,
    lastActive: "3d ago",
  },
  {
    id: "u-riley",
    name: "Riley Brooks",
    belt: "blue",
    membership: "in-person",
    status: "paused",
    classesAttended: 19,
    lastActive: "14d ago",
  },
];

export const coachEngagement: CoachEngagementSummary = {
  recapsPostedThisWeek: 4,
  questionsAnswered: 11,
};

export const recentCoachPosts = [
  {
    id: "post-1",
    title: "Single leg chain — cutback finish",
    createdAt: iso(new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000)),
    classId: "cls-single-wed",
  },
  {
    id: "post-2",
    title: "Guard passing — hip control checkpoints",
    createdAt: iso(new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000)),
    classId: "cls-guard-mon",
  },
];

export function getUserById(id: string) {
  return users.find((u) => u.id === id);
}

export function getClassById(id: string) {
  return classes.find((c) => c.id === id);
}

export function getVideoById(id: string) {
  return videos.find((v) => v.id === id);
}

// ─── Monthly focuses ───────────────────────────────────────────────────────────

export const monthlyFocuses: MonthlyFocus[] = [
  {
    month: "January 2026",
    theme: "Guard retention & sweeps",
    description:
      "We are drilling active guard retention — framing, shrimping, and recovering full guard before moving into scissor and pendulum sweeps to finish on top.",
  },
  {
    month: "February 2026",
    theme: "Back takes & chokes",
    description:
      "This month covers the back-take chain from every common position: seat belt grip, hooks, RNC, and bow-and-arrow. Expect a lot of controlled sparring from the back.",
  },
  {
    month: "March 2026",
    theme: "Wrestling for BJJ",
    description:
      "Double legs, single legs, and snap-downs adapted for the gi and no-gi. We are also working scramble awareness so takedowns convert to good positions.",
  },
  {
    month: "April 2026",
    theme: "Leg locks & lower body attacks",
    description:
      "Inside heel hooks, kneebars from top, and the outside heel hook entry system. New students focus on straight ankle lock mechanics before progressing.",
  },
  {
    month: "May 2026",
    theme: "Takedowns & leg attacks",
    description:
      "This month we are building our takedown game from the outside and finishing with inside heel hooks and kneebars.",
  },
  {
    month: "June 2026",
    theme: "Passing the guard",
    description:
      "Pressure passing with the knee slice, toreando, and leg-drag entries. We finish every class with positional passing rounds so the details get tested live.",
  },
  {
    month: "July 2026",
    theme: "Submissions from top",
    description:
      "Americana, kimura, and arm bar chains from side control and mount. The focus is linking attacks so your opponent's defence exposes the next submission.",
  },
  {
    month: "August 2026",
    theme: "Competition prep & tournament strategy",
    description:
      "Point system awareness, match pacing, and mental reset between rounds. Drilling starts faster and sparring rounds are timed to match competition formats.",
  },
  {
    month: "September 2026",
    theme: "Positional dominance",
    description:
      "Mount control, knee-on-belly pressure, and taking the back from every position. Escape drills are included so both partners develop defensive awareness.",
  },
  {
    month: "October 2026",
    theme: "Half guard top & bottom",
    description:
      "Smash-pass and knee-slice from half guard top; lockdown and dog-fight from bottom. We tie it together with systematic passing chains against a stiff half guard.",
  },
  {
    month: "November 2026",
    theme: "Closed guard attacks",
    description:
      "High guard, arm bars, triangles, and omoplata transitions from closed guard. We stress posture control for both partners throughout the month.",
  },
  {
    month: "December 2026",
    theme: "Fundamentals review",
    description:
      "End-of-year review of the core movement library: hip escape, bridge, technical stand-up, and basic takedown defence. Good for new students and a reset for advanced ones.",
  },
];

/** Convenience export for the current (May 2026) monthly focus */
export const monthlyFocus: MonthlyFocus = monthlyFocuses.find(
  (f) => f.month === "May 2026",
)!;

// ─── Calendar schedule data ────────────────────────────────────────────────────

function calendarDate(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute = 0,
) {
  const d = new Date(year, month - 1, day, hour, minute, 0, 0);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:00`;
}

/** Rotate through an array by index to vary content week-to-week */
function pick<T>(arr: T[], idx: number): T {
  return arr[idx % arr.length];
}

const kidsFocuses = [
  "Breakfalls and hip escapes — staying safe when taken down",
  "Shrimping and guard recovery — moving like a fish on the mat",
  "Bridge and roll escape — the foundational bottom technique",
  "Grip fighting and collar tie — controlling your partner's posture",
  "Technical stand-up — getting back to your feet safely",
  "Closed guard basics — holding your opponent in your guard",
];

const beginnerFocuses = [
  "Single leg takedown — entry, finish, and what to do if they sprawl",
  "Double leg takedown — level change, drive, and finishing options",
  "Hip escape to closed guard recovery — escaping side control",
  "Americana from mount — shoulder lock mechanics and tap recognition",
  "Guard passing with posture — standing and knee-on-chest options",
  "Rear naked choke fundamentals — seat belt grip and hook placement",
];

const openMatFocuses = [
  "Competition team — prioritise drilling takedowns. Others free roll.",
  "Positional rounds: 5 min passes, 5 min guard play. Then free roll.",
  "Situational drilling from back-take entries. Then open rolling.",
  "Heavy drilling on this month's technique, then free sparring.",
  "Timed rounds — 6 min with 1 min rest. Focus on controlled pace.",
  "Beginner-friendly open mat — experienced students mentor newer ones.",
];

const advancedFocuses = [
  "Guard passing sequences — knee cut to torreando chain",
  "Back retention defence and entering the back from top turtle",
  "Leg lock entries from standing and failed takedown scrambles",
  "Half guard passing — smash-pass mechanics and common counters",
  "Mount maintenance and climbing to high mount from low mount",
  "Competition review — positional drilling from tournament scenarios",
];

const wednesdayFocuses = [
  "No-gi guard passing — knee slice and leg-drag fundamentals",
  "Turtle position attacks — half-back and clock-choke options",
  "Standing no-gi takedowns — arm drags and underhook battles",
  "Neck crank and guillotine defence — keeping your neck safe",
  "Hip heist scramble drill — reversals from referee position",
  "Single leg defence and re-attack — fighting for the finish",
];

const thursdayFocuses = [
  "Fundamentals — closed guard posture breaks and hip heist reps",
  "Bridge and roll from mount — timing against a heavy passer",
  "Cross-collar choke from guard — grip placement and finishing angle",
  "Americana and kimura from side control — recognising the opening",
  "Technical stand-up against a grappling hold — safe break-fall option",
  "Triangle choke from guard — arm angle, hip movement, and finish",
];

function saturdaySessions(dateKey: string, suffix: string, weekNum: number): TodayCalendarClass[] {
  const [year, month, day] = dateKey.split("-").map(Number);
  return [
    {
      id: `cls-kids-sat-${suffix}`,
      title: "Kids Jiu-Jitsu",
      audience: "Ages 5–12",
      type: "gi",
      level: "kids",
      coach: "Coach Rivera",
      duration: 60,
      scheduledAt: calendarDate(year, month, day, 9),
      color: "#1D9E75",
      todayFocus: pick(kidsFocuses, weekNum),
      rsvpd: false,
    },
    {
      id: `cls-beginner-sat-${suffix}`,
      title: "Beginner Jiu-Jitsu",
      audience: "16+ · All welcome",
      type: "gi",
      level: "beginner",
      coach: "Coach Rivera",
      duration: 90,
      scheduledAt: calendarDate(year, month, day, 10, 30),
      color: "#185FA5",
      todayFocus: pick(beginnerFocuses, weekNum),
      rsvpd: false,
    },
    {
      id: `cls-open-sat-${suffix}`,
      title: "Open Mat",
      audience: "All belts",
      type: "gi-nogi",
      level: "all",
      coach: "Coach Lee",
      duration: 120,
      scheduledAt: calendarDate(year, month, day, 12),
      color: "#854F0B",
      todayFocus: pick(openMatFocuses, weekNum),
      rsvpd: false,
    },
  ];
}

function mondaySession(dateKey: string, suffix: string, weekNum: number): TodayCalendarClass {
  const [year, month, day] = dateKey.split("-").map(Number);
  return {
    id: `cls-advanced-mon-${suffix}`,
    title: "Advanced Jiu-Jitsu",
    audience: "Blue belt+",
    type: "gi",
    level: "advanced",
    coach: "Coach Rivera",
    duration: 90,
    scheduledAt: calendarDate(year, month, day, 18, 30),
    color: "#534AB7",
    todayFocus: pick(advancedFocuses, weekNum),
    rsvpd: false,
  };
}

function wednesdaySession(dateKey: string, suffix: string, weekNum: number): TodayCalendarClass {
  const [year, month, day] = dateKey.split("-").map(Number);
  return {
    id: `cls-nogi-wed-${suffix}`,
    title: "No-Gi Grappling",
    audience: "All levels",
    type: "nogi",
    level: "all",
    coach: "Coach Lee",
    duration: 75,
    scheduledAt: calendarDate(year, month, day, 19),
    color: "#B45309",
    todayFocus: pick(wednesdayFocuses, weekNum),
    rsvpd: false,
  };
}

function thursdaySession(dateKey: string, suffix: string, weekNum: number): TodayCalendarClass {
  const [year, month, day] = dateKey.split("-").map(Number);
  return {
    id: `cls-fund-thu-${suffix}`,
    title: "Fundamentals",
    audience: "All levels",
    type: "gi",
    level: "beginner",
    coach: "Coach Rivera",
    duration: 60,
    scheduledAt: calendarDate(year, month, day, 18, 0),
    color: "#0E7490",
    todayFocus: pick(thursdayFocuses, weekNum),
    rsvpd: false,
  };
}

/** Generate all calendar dates for Mon/Wed/Thu/Sat from startYear/month through endYear/month */
function generateScheduleDates(
  startYear: number,
  startMonth: number,
  endYear: number,
  endMonth: number,
): string[] {
  const dates: string[] = [];
  const pad = (n: number) => String(n).padStart(2, "0");
  let y = startYear;
  let m = startMonth;
  while (y < endYear || (y === endYear && m <= endMonth)) {
    const daysInM = new Date(y, m, 0).getDate();
    for (let d = 1; d <= daysInM; d++) {
      const dow = new Date(y, m - 1, d).getDay(); // 0=Sun
      if ([1, 3, 4, 6].includes(dow)) {
        dates.push(`${y}-${pad(m)}-${pad(d)}`);
      }
    }
    m++;
    if (m > 12) { m = 1; y++; }
  }
  return dates;
}

const allScheduleDates = generateScheduleDates(2026, 1, 2026, 12);

let _weekCounter = 0;
const _weekMap: Record<string, number> = {};
allScheduleDates.forEach((dateKey) => {
  const dow = new Date(`${dateKey}T12:00:00`).getDay();
  if (dow === 1) { _weekCounter++; }
  if (!(dateKey in _weekMap)) _weekMap[dateKey] = _weekCounter;
});

const generatedTodayCalendarClasses: TodayCalendarClass[] = allScheduleDates.flatMap((dateKey) => {
  const suffix = dateKey.replace(/-/g, "");
  const dow = new Date(`${dateKey}T12:00:00`).getDay();
  const weekNum = _weekMap[dateKey] ?? 0;
  if (dow === 6) return saturdaySessions(dateKey, suffix, weekNum);
  if (dow === 1) return [mondaySession(dateKey, suffix, weekNum)];
  if (dow === 3) return [wednesdaySession(dateKey, suffix, weekNum)];
  if (dow === 4) return [thursdaySession(dateKey, suffix, weekNum)];
  return [];
});

export const todayCalendarClasses: TodayCalendarClass[] = generatedTodayCalendarClasses;

// ─── Study sessions ─────────────────────────────────────────────────────────────

export const studySessions: StudySession[] = [
  {
    id: "study-guard-pass",
    title: "Guard Passing Fundamentals",
    subtitle: "Guard Passing · Gi · Beginner",
    classId: "cls-guard-mon",
    classDate: "May 2, 2026",
    dueDate: iso(new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000)), // due yesterday — completed
    status: "completed",
    coachId: "u-rivera",
    coachName: "Coach Rivera",
    videoYoutubeId: "dQw4w9WgXcQ",
    videoDurationSeconds: 18 * 60 + 34,
    summary:
      "We chained the knee cut into a toreando and finished with a smash pass reset when they framed hard. The focus was reading the guard player's hips rather than committing to one pass entry.",
    keyDetails: [
      "Establish contact on the far hip before any weight transfer — this connection is what tells you which pass to commit to.",
      "Head position is the first thing to protect: if they can push your face, the pass stalls before it starts.",
      "Finish in chest-to-chest side control with your hips heavy on the mat. Floating lets them rebuild their frames and re-guard.",
      "When they re-frame hard on your shoulder, use that moment to pivot directly into the smash pass — don't reset to standing.",
    ],
    commonMistakes: [
      "Initiating the knee cut before clearing the bottom hook — it creates a pivot point they can exploit immediately.",
      "Standing too tall and surrendering the underhook battle. Stay low and take your underhook before driving.",
      "Celebrating the pass too early. Until your hips are fully settled in side control, the scramble is still available to them.",
    ],
    watchFor: [
      "Notice how Rivera establishes the far-hip connection before any footwork — the pass doesn't start until that contact is set.",
      "Watch the head position throughout. It stays behind the shoulder line even during the toreando step.",
      "Pay attention to the hip drop at the moment of completion. That's a deliberate weight distribution, not a collapse.",
      "At the 12-minute mark, watch how he uses their framing shoulder to pivot into the smash pass — this is the chain everyone misses in live rolling.",
    ],
    reflectionQuestion:
      "When your knee cut stalls during rolling, is it usually a hip hook, a shoulder frame, or a weight distribution issue? Pick one specific moment from class and describe it — we'll address it next session.",
    coachNotes:
      "Alex, your knee cut entry looked sharp. The main area to develop: you're resetting to standing too often when they frame. Watch the 12-minute mark — the smash pass pivot is already available at that moment. You don't need to restart.",
    mobilityWork: [
      {
        name: "Hip 90/90 Stretch",
        description:
          "Sit on the floor with both knees at 90-degree angles (one forward, one to the side). Sit tall and hold gently. Switch sides. Move slowly and only go to a comfortable depth — this is not a stretch contest.",
        durationMinutes: 3,
      },
      {
        name: "Cat-Cow Spinal Mobilization",
        description:
          "On hands and knees, slowly alternate between arching your lower back (cat) and letting it sag gently (cow). 10 slow, controlled repetitions. Focus on feeling each segment move.",
        durationMinutes: 2,
      },
      {
        name: "Thread-the-Needle Rotation",
        description:
          "From all-fours, slide one arm under your body along the mat to feel a gentle thoracic rotation. Hold for a breath, return slowly. 5 reps per side. Skip if you feel any shoulder discomfort.",
        durationMinutes: 2,
      },
    ],
  },
  {
    id: "study-single-leg",
    title: "Single Leg Takedowns",
    subtitle: "Takedowns · No-Gi · Intermediate",
    classId: "cls-single-wed",
    classDate: "May 7, 2026",
    dueDate: iso(new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000)),
    status: "in_progress",
    coachId: "u-lee",
    coachName: "Coach Lee",
    videoYoutubeId: "9bZkp7q19f0",
    videoDurationSeconds: 24 * 60 + 12,
    summary:
      "We covered the single leg entry from collar tie and inside reach, finishing with the run-the-pipe and the cutback. The second half of class was positional rounds from the single leg position.",
    keyDetails: [
      "Head position wins the first step of the entry — get your head to the outside before you level change, otherwise you're running into their sprawl.",
      "Shelf the leg on your inside hip, not your thigh. The hip shelf traps the leg and takes away their ability to hop over.",
      "On the run-the-pipe finish, drive your inside shoulder into their hip and run perpendicular to their body, not straight forward.",
      "If they whizzer hard on the cutback side, transition immediately to an ankle pick — their weight is already loaded in your favour.",
    ],
    commonMistakes: [
      "Dropping the head to the mat during the finish. This gifts them a guillotine or a sprawl-to-front-headlock.",
      "Not blocking the far hip on the cutback. Without that block, they can hop over your head and reverse the position.",
      "Holding the single leg too long without committing to a finish. Static positions get defended — keep moving.",
    ],
    watchFor: [
      "Notice how Lee's head is always to the outside before he drops level. This is the setup, not the takedown.",
      "Watch the shelf position at 8 minutes — the leg is on the hip bone, not the thigh. That small detail is why the leg can't escape.",
      "At 17 minutes, watch the whizzer counter transition to ankle pick. It happens in one motion, not two.",
      "Pay attention to his footwork during the run-the-pipe — he's stepping perpendicular, not forward. That's what creates the rotation.",
    ],
    reflectionQuestion:
      "In the positional rounds from the single leg position, what was the most common reason you lost the takedown? Was it head position, the finish direction, or their counter? Think about one specific moment to bring to next class.",
    coachNotes:
      "Your collar-tie entry is cleaner than most. The area to work on: you're finishing straight forward on the run-the-pipe. Watch the video at the 17-minute mark — perpendicular is the key. We'll drill this Thursday.",
    mobilityWork: [
      {
        name: "Hip Flexor Stretch",
        description:
          "From a kneeling lunge position, gently shift your weight forward until you feel a stretch in the front of your back hip. Hold for 90 seconds per side. Keep your torso upright and breathe normally.",
        durationMinutes: 3,
      },
      {
        name: "Ankle Circles",
        description:
          "Seated or standing, lift one foot and draw large, slow circles with your toes — 10 in each direction per ankle. This is particularly useful after takedown drilling where ankles absorb a lot of load.",
        durationMinutes: 2,
      },
    ],
  },
  {
    id: "study-morning-fund",
    title: "Morning Fundamentals — Hip Escapes",
    subtitle: "Fundamentals · Gi · All Levels",
    classId: "cls-morning-fri",
    classDate: "May 6, 2026",
    dueDate: iso(new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000)),
    status: "not_started",
    coachId: "u-rivera",
    coachName: "Coach Rivera",
    videoYoutubeId: "L_jWHffIx5E",
    videoDurationSeconds: 14 * 60 + 55,
    summary:
      "Grip fighting to closed guard — posture breaks and hip heist reps. We worked the sequence of breaking grips in order (collar, sleeve, hip) before executing the hip heist.",
    keyDetails: [
      "Break grips in order: collar grip first, then the sleeve, then address the hip pressure. Going out of order leaves you defending two grips at once.",
      "The hip heist is a slide movement, not a sit-up. Initiating with your abs instead of your hips is what stalls it.",
      "Keep your ankles crossed until you have confirmed posture control. Uncrossing early opens the guard before you've broken their structure.",
      "Frame with your knee across their hip line before any hip movement — this creates the distance that makes the heist possible.",
    ],
    commonMistakes: [
      "Pulling with the arms to break grips instead of using hip and shoulder rotation to strip them.",
      "Opening guard early under heavy pressure. Wait until you have a clear posture break before disengaging.",
      "Heisting without first creating a frame — the movement goes nowhere without that initial space.",
    ],
    watchFor: [
      "Watch how Rivera's grip breaks lead with rotation, not pulling. His elbows never flare out.",
      "At the 6-minute mark, notice the knee-across-the-hip-line frame before any hip movement begins.",
      "The hip heist at 9 minutes — observe that his hips move first and his torso follows, not the other way around.",
    ],
    reflectionQuestion:
      "Which grip is hardest for you to break — collar, sleeve, or hip? Think about whether it's a timing issue, an angle issue, or a strength issue. Bring your honest answer — knowing which it is determines what we prioritise.",
    coachNotes:
      "This session was a reset on fundamentals that apply to every position. If the hip heist feels mechanical rather than fluid, that's normal at this stage. The goal right now is understanding the sequence, not speed.",
    mobilityWork: [
      {
        name: "Supine Hip Rotation",
        description:
          "Lie on your back with knees bent. Let both knees drop gently to one side, feeling a light rotation through your lower back. Hold for a breath, return, and repeat on the other side. 8 slow reps per side.",
        durationMinutes: 3,
      },
      {
        name: "Wrist Circles",
        description:
          "Grip fighting puts load on the wrists. Gently circle each wrist 10 times in each direction. If anything feels sharp, skip it and mention it to Coach Rivera.",
        durationMinutes: 1,
      },
    ],
  },
];

export const competitions: AcademyCompetition[] = [
  {
    id: "comp-1",
    name: "IBJJF Arizona Open",
    location: "Phoenix Convention Center",
    date: "2026-05-28T08:00:00",
    type: "Gi divisions",
    signedUp: true,
    registrationCloses: "2026-05-20",
    signUpUrl: "https://ibjjf.com",
    notes: "Weight & age divisions open",
  },
  {
    id: "comp-2",
    name: "Grappling Industries Phoenix",
    location: "Lone Butte Casino",
    date: "2026-06-21T08:00:00",
    type: "No-Gi",
    signedUp: false,
    registrationCloses: "2026-06-14",
    signUpUrl: "https://grapplingindustries.com",
    notes: null,
  },
];
