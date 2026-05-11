export type UserRole = "student" | "coach" | "admin";

export type BeltRank =
  | "white"
  | "blue"
  | "purple"
  | "brown"
  | "black"
  | "kids";

export type MembershipType = "in-person" | "online";

export type StudentStatus = "active" | "trial" | "paused";

export type ClassType = "Gi" | "No-Gi" | "Open Mat";

export type LevelTag = "All" | "Beginner" | "Intermediate" | "Advanced" | "Kids";

export type VideoFilter =
  | "all"
  | "position"
  | "technique"
  | "coach"
  | "level";

export type WatchStatus = "unwatched" | "in_progress" | "watched";

export type SkillStatus = "not_started" | "introduced" | "practicing" | "completed";

export type PracticeItemType = "reps" | "rounds" | "duration" | "video";

export type AssignmentStatus = "not_started" | "in_progress" | "completed";

export interface Academy {
  id: string;
  name: string;
  shortName: string;
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  belt?: BeltRank;
  membership?: MembershipType;
  title?: string;
  avatarUrl?: string;
  isHeadCoach?: boolean;
}

export interface ClassSession {
  id: string;
  title: string;
  startsAt: string;
  endsAt?: string;
  coachId: string;
  type: ClassType;
  level: LevelTag;
  description?: string;
  attendanceCount: number;
  attendeeStudentIds: string[];
  recap?: ClassRecap;
}

export interface ClassRecap {
  videoYoutubeId: string;
  summary: string;
  keyDetails: string[];
  commonMistakes: string[];
  practiceAssignmentId?: string;
}

export interface Video {
  id: string;
  title: string;
  youtubeId: string;
  durationSeconds: number;
  coachId: string;
  classId?: string;
  curriculumPathId?: string;
  tags: string[];
  level: LevelTag;
  watchStatus: WatchStatus;
  recordedAt?: string;
  position?: string;
  technique?: string;
}

export interface CurriculumPath {
  id: string;
  title: string;
  videoCount: number;
  topics: string[];
}

export interface PracticeItem {
  id: string;
  title: string;
  type: PracticeItemType;
  reps?: number;
  sets?: number;
  durationMinutes?: number;
  rounds?: number;
  videoId?: string;
  completed: boolean;
}

export interface PracticeAssignment {
  id: string;
  title: string;
  dueDate: string;
  status: AssignmentStatus;
  items: PracticeItem[];
  relatedClassId?: string;
}

export interface SkillChecklistItem {
  id: string;
  name: string;
  status: SkillStatus;
}

export interface QuestionThread {
  id: string;
  classId: string;
  authorStudentId: string;
  text: string;
  createdAt: string;
  answered: boolean;
  answer?: {
    coachId: string;
    text: string;
    answeredAt: string;
  };
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  pinned: boolean;
  coachId: string;
  createdAt: string;
}

export interface ProgressStats {
  classesAttended: number;
  videosWatched: number;
  questionsAsked: number;
  streakDays: number;
  practiceAssignmentsDone: number;
  curriculumPercent: number;
  skillsCompleted: number;
  skillsPracticing: number;
  skillsIntroduced: number;
  belt: BeltRank;
}

export interface WeeklyActivity {
  label: string;
  value: number;
}

export interface Badge {
  id: string;
  label: string;
  earnedAt: string;
}

export interface PrivateTrainingCoach extends User {
  specialty: string;
  sessionTypes: string[];
}

export interface StudentRow {
  id: string;
  name: string;
  belt: BeltRank;
  membership: MembershipType;
  status: StudentStatus;
  classesAttended: number;
  lastActive: string;
}

export interface CoachEngagementSummary {
  recapsPostedThisWeek: number;
  questionsAnswered: number;
}
