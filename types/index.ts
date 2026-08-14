import type {
  User,
  Profile,
  Event,
  Competition,
  Certificate,
  Achievement,
  UserAchievement,
  Notice,
  TeamMember,
  GalleryItem,
  Prize,
  Score,
  LeaderboardEntry,
  Result,
  ContactMessage,
  Notification,
  Submission,
  EventRegistration,
  CompetitionParticipant,
} from "@prisma/client";

// ==================== Extended Types ====================

export type UserWithProfile = User & {
  profile: Profile | null;
};

export type EventWithRegistrations = Event & {
  registrations: EventRegistration[];
  _count?: { registrations: number };
};

export type CompetitionWithParticipants = Competition & {
  participants: CompetitionParticipant[];
  _count?: {
    participants: number;
    submissions: number;
  };
};

export type LeaderboardEntryWithUser = LeaderboardEntry & {
  user: User & { profile: Profile | null };
};

export type CertificateWithDetails = Certificate & {
  user: Pick<User, "name" | "email">;
  event?: Pick<Event, "title"> | null;
  competition?: Pick<Competition, "title"> | null;
};

export type AchievementWithProgress = Achievement & {
  userAchievements?: UserAchievement[];
};

export type UserAchievementWithDetails = UserAchievement & {
  achievement: Achievement;
};

export type PrizeWithDetails = Prize & {
  competition?: Pick<Competition, "title"> | null;
  winner?: Pick<User, "name" | "avatar"> | null;
};

export type ResultWithDetails = Result & {
  competition?: Pick<Competition, "title"> | null;
  event?: Pick<Event, "title"> | null;
};

export type ScoreWithDetails = Score & {
  user: Pick<User, "name" | "avatar">;
  competition?: Pick<Competition, "title"> | null;
};

// ==================== API Response Types ====================

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ==================== Dashboard Stats ====================

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalEvents: number;
  totalCompetitions: number;
  totalRegistrations: number;
  totalSubmissions: number;
  totalCertificates: number;
  totalPoints: number;
}

export interface UserDashboardStats {
  rank: number | null;
  totalScore: number;
  eventsParticipated: number;
  competitionsParticipated: number;
  certificatesEarned: number;
  achievementsUnlocked: number;
  xp: number;
}

// ==================== Leaderboard Types ====================

export interface LeaderboardFilters {
  branch?: string;
  batch?: string;
  period?: "global" | "monthly" | "weekly";
  search?: string;
  page?: number;
  pageSize?: number;
}

// ==================== Scorecard Types ====================

export interface ScorecardData {
  user: UserWithProfile;
  totalScore: number;
  currentRank: number | null;
  bestRank: number | null;
  totalCompetitions: number;
  eventsParticipated: number;
  eventsWon: number;
  problemsSolved: number;
  accuracy: number;
  pointsEarned: number;
  certificates: Certificate[];
  achievements: UserAchievementWithDetails[];
  scoreHistory: { date: string; score: number }[];
  competitionPerformance: { name: string; score: number; rank: number }[];
}

// ==================== Assistant Types ====================

export interface AssistantMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// ==================== Re-exports ====================
export type {
  User,
  Profile,
  Event,
  Competition,
  Certificate,
  Achievement,
  UserAchievement,
  Notice,
  TeamMember,
  GalleryItem,
  Prize,
  Score,
  LeaderboardEntry,
  Result,
  ContactMessage,
  Notification,
  Submission,
  EventRegistration,
  CompetitionParticipant,
};
