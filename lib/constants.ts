// Navigation configuration
export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Competitions", href: "/competitions" },
  { label: "Leaderboard", href: "/leaderboard" },
  { label: "Achievements", href: "/achievements" },
  { label: "Prizes", href: "/prizes" },
  { label: "Team", href: "/team" },
  { label: "Gallery", href: "/gallery" },
  { label: "Notices", href: "/notices" },
  { label: "Results", href: "/results" },
  { label: "Contact", href: "/contact" },
] as const;

export const DASHBOARD_NAV = [
  { label: "Overview", href: "/dashboard", icon: "LayoutDashboard" },
  { label: "Profile", href: "/dashboard/profile", icon: "User" },
  { label: "Certificates", href: "/dashboard/certificates", icon: "Award" },
  { label: "Achievements", href: "/dashboard/achievements", icon: "Trophy" },
] as const;

export const ADMIN_NAV = [
  { label: "Dashboard", href: "/admin", icon: "LayoutDashboard" },
  { label: "Users", href: "/admin/users", icon: "Users" },
  { label: "Events", href: "/admin/events", icon: "Calendar" },
  { label: "Competitions", href: "/admin/competitions", icon: "Swords" },
  { label: "Leaderboard", href: "/admin/leaderboard", icon: "Trophy" },
  { label: "Prizes", href: "/admin/prizes", icon: "Gift" },
  { label: "Certificates", href: "/admin/certificates", icon: "Award" },
  { label: "Achievements", href: "/admin/achievements", icon: "Star" },
  { label: "Notices", href: "/admin/notices", icon: "Bell" },
  { label: "Gallery", href: "/admin/gallery", icon: "Image" },
  { label: "Team", href: "/admin/team", icon: "Users" },
  { label: "Contact", href: "/admin/contact", icon: "Mail" },
] as const;

// Role hierarchy (higher index = more permissions)
export const ROLE_HIERARCHY = {
  PARTICIPANT: 0,
  MODERATOR: 1,
  ORGANIZER: 2,
  FACULTY: 3,
  ADMIN: 4,
  SUPER_ADMIN: 5,
} as const;

export const EVENT_TYPE_LABELS: Record<string, string> = {
  CODING: "Coding",
  HACKATHON: "Hackathon",
  WORKSHOP: "Workshop",
  SEMINAR: "Seminar",
  QUIZ: "Quiz",
  COMPETITION: "Competition",
  OTHER: "Other",
};

export const EVENT_STATUS_LABELS: Record<string, string> = {
  UPCOMING: "Upcoming",
  LIVE: "Live",
  COMPLETED: "Completed",
  REGISTRATION_CLOSED: "Registration Closed",
};

export const COMPETITION_STATUS_LABELS: Record<string, string> = {
  UPCOMING: "Upcoming",
  ACTIVE: "Active",
  JUDGING: "Judging",
  COMPLETED: "Completed",
};

export const NOTICE_PRIORITY_COLORS: Record<string, string> = {
  NORMAL: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  IMPORTANT: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  URGENT: "bg-red-500/20 text-red-400 border-red-500/30",
};

export const ACHIEVEMENT_ICONS: Record<string, string> = {
  CODING_CHAMPION: "🏆",
  HACKATHON_WINNER: "💻",
  TOP_PERFORMER: "⭐",
  PROBLEM_SOLVER: "🧩",
  WORKSHOP_CONTRIBUTOR: "📚",
  COMMUNITY_LEADER: "👑",
  EVENT_ORGANIZER: "📋",
  RISING_STAR: "🌟",
  FIRST_EVENT: "🎯",
  FIRST_WIN: "🥇",
  STREAK_7: "🔥",
  STREAK_30: "💎",
  CENTURY_SCORE: "💯",
};

export const BRANCHES = [
  "Computer Science",
  "Information Technology",
  "Electronics",
  "Electrical",
  "Mechanical",
  "Civil",
  "Chemical",
  "Biotechnology",
  "Other",
] as const;

export const BATCHES = ["2021", "2022", "2023", "2024", "2025", "2026", "2027"] as const;

export const APP_NAME = "C3 Community";
export const APP_DESCRIPTION = "A premium technology community platform for coding enthusiasts, hackathons, competitions, workshops, and student achievements.";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
