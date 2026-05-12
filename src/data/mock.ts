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

/** Schedule rows for the calendar-first /today page (does not replace `classes`). */
const baseTodayCalendarClasses: TodayCalendarClass[] = [
  {
    id: "cls-kids-sat",
    title: "Kids Jiu-Jitsu",
    audience: "Ages 5–12",
    type: "gi",
    level: "kids",
    coach: "Coach Rivera",
    duration: 60,
    scheduledAt: "2026-05-10T09:00:00",
    color: "#1D9E75",
    todayFocus:
      "Breakfalls and hip escapes — staying safe when taken down",
    rsvpd: false,
  },
  {
    id: "cls-beginner-sat",
    title: "Beginner Jiu-Jitsu",
    audience: "16+ · All welcome",
    type: "gi",
    level: "beginner",
    coach: "Coach Rivera",
    duration: 90,
    scheduledAt: "2026-05-10T10:30:00",
    color: "#185FA5",
    todayFocus:
      "Single leg takedown — entry, finish, and what to do if they sprawl",
    rsvpd: true,
  },
  {
    id: "cls-open-sat",
    title: "Open Mat",
    audience: "All belts",
    type: "gi-nogi",
    level: "all",
    coach: "Coach Lee",
    duration: 120,
    scheduledAt: "2026-05-10T12:00:00",
    color: "#854F0B",
    todayFocus:
      "Competition team — prioritise drilling takedowns. Others free roll.",
    rsvpd: false,
  },
  {
    id: "cls-advanced-mon",
    title: "Advanced Jiu-Jitsu",
    audience: "Blue belt+",
    type: "gi",
    level: "advanced",
    coach: "Coach Rivera",
    duration: 90,
    scheduledAt: "2026-05-12T18:30:00",
    color: "#534AB7",
    todayFocus: "Guard passing sequences — knee cut to torreando chain",
    rsvpd: false,
  },
];

function calendarDate(year: number, month: number, day: number, hour: number, minute = 0) {
  const d = new Date(year, month - 1, day, hour, minute, 0, 0);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:00`;
}

function saturdaySessions(dateKey: string, suffix: string): TodayCalendarClass[] {
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
      todayFocus: "Breakfalls and hip escapes — staying safe when taken down",
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
      todayFocus: "Single leg takedown — entry, finish, and what to do if they sprawl",
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
      todayFocus: "Competition team — prioritise drilling takedowns. Others free roll.",
      rsvpd: false,
    },
  ];
}

function mondaySession(dateKey: string, suffix: string): TodayCalendarClass {
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
    todayFocus: "Guard passing sequences — knee cut to torreando chain",
    rsvpd: false,
  };
}

const recurringScheduleDates = [
  "2026-04-26",
  "2026-04-28",
  "2026-05-03",
  "2026-05-05",
  "2026-05-17",
  "2026-05-19",
  "2026-05-24",
  "2026-05-26",
  "2026-05-31",
  "2026-06-02",
  "2026-06-07",
  "2026-06-09",
];

const generatedTodayCalendarClasses = recurringScheduleDates.flatMap((dateKey) => {
  const suffix = dateKey.replace(/-/g, "");
  const day = new Date(`${dateKey}T12:00:00`).getDay();
  if (day === 6) return saturdaySessions(dateKey, suffix);
  if (day === 1) return [mondaySession(dateKey, suffix)];
  return [];
});

export const todayCalendarClasses: TodayCalendarClass[] = [
  ...baseTodayCalendarClasses,
  ...generatedTodayCalendarClasses.filter(
    (entry) => !baseTodayCalendarClasses.some((base) => base.id === entry.id),
  ),
];

export const monthlyFocus: MonthlyFocus = {
  month: "May 2026",
  theme: "Takedowns & leg attacks",
  description:
    "This month we are building our takedown game from the outside and finishing with inside heel hooks and kneebars.",
};

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
