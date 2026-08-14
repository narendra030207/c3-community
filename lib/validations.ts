import { z } from "zod";

// ==================== Auth ====================
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  branch: z.string().optional(),
  batch: z.string().optional(),
  rollNumber: z.string().optional(),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

// ==================== Events ====================
export const eventSchema = z.object({
  title: z.string().min(3).max(200),
  description: z.string().min(10),
  date: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  time: z.string().optional(),
  venue: z.string().optional(),
  eventType: z.enum(["CODING", "HACKATHON", "WORKSHOP", "SEMINAR", "QUIZ", "COMPETITION", "OTHER"]),
  registrationDeadline: z.string().datetime().optional(),
  organizer: z.string().optional(),
  rules: z.string().optional(),
  eligibility: z.string().optional(),
  prizeInfo: z.string().optional(),
  maxParticipants: z.number().int().positive().optional(),
  banner: z.string().url().optional(),
});

// ==================== Competitions ====================
export const competitionSchema = z.object({
  title: z.string().min(3).max(200),
  description: z.string().min(10),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  rules: z.string().optional(),
  problemStatement: z.string().optional(),
  maxParticipants: z.number().int().positive().optional(),
  banner: z.string().url().optional(),
});

// ==================== Contact ====================
export const contactSchema = z.object({
  name: z.string().min(2, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(3, "Subject is required").max(200),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
});

// ==================== Profile ====================
export const profileSchema = z.object({
  name: z.string().min(2).max(100),
  bio: z.string().max(500).optional(),
  branch: z.string().optional(),
  batch: z.string().optional(),
  rollNumber: z.string().optional(),
  phone: z.string().optional(),
  github: z.string().url().optional().or(z.literal("")),
  linkedin: z.string().url().optional().or(z.literal("")),
  twitter: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
  skills: z.array(z.string()).optional(),
});

// ==================== Notice ====================
export const noticeSchema = z.object({
  title: z.string().min(3).max(200),
  description: z.string().min(10),
  category: z.enum(["GENERAL", "EVENT", "COMPETITION", "RESULT", "ACHIEVEMENT", "MAINTENANCE"]),
  priority: z.enum(["NORMAL", "IMPORTANT", "URGENT"]),
  attachment: z.string().url().optional(),
  externalLink: z.string().url().optional(),
  expiresAt: z.string().datetime().optional(),
});

// ==================== Team Member ====================
export const teamMemberSchema = z.object({
  name: z.string().min(2).max(100),
  position: z.string().min(2).max(100),
  category: z.enum(["FACULTY_MENTOR", "CORE_TEAM", "COORDINATOR", "VOLUNTEER", "ALUMNI"]),
  department: z.string().optional(),
  bio: z.string().max(500).optional(),
  photo: z.string().url().optional(),
  skills: z.array(z.string()).optional(),
  github: z.string().url().optional().or(z.literal("")),
  linkedin: z.string().url().optional().or(z.literal("")),
  twitter: z.string().optional(),
  email: z.string().email().optional(),
  order: z.number().int().optional(),
});

// ==================== Gallery ====================
export const gallerySchema = z.object({
  title: z.string().min(2).max(200),
  description: z.string().optional(),
  imageUrl: z.string().url(),
  category: z.enum(["EVENT", "WORKSHOP", "HACKATHON", "COMPETITION", "TEAM", "AWARD", "OTHER"]),
  eventName: z.string().optional(),
  date: z.string().datetime().optional(),
});

// ==================== Score ====================
export const scoreSchema = z.object({
  userId: z.string().cuid(),
  competitionId: z.string().cuid().optional(),
  points: z.number().int(),
  reason: z.string().optional(),
});

// ==================== Certificate ====================
export const certificateSchema = z.object({
  userId: z.string().cuid(),
  eventId: z.string().cuid().optional(),
  competitionId: z.string().cuid().optional(),
  title: z.string().min(3),
  achievement: z.string().min(3),
});

// ==================== Assistant ====================
export const assistantSchema = z.object({
  message: z.string().min(1).max(1000),
  conversationId: z.string().optional(),
});

// Export types
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;
export type EventInput = z.infer<typeof eventSchema>;
export type CompetitionInput = z.infer<typeof competitionSchema>;
export type NoticeInput = z.infer<typeof noticeSchema>;
export type TeamMemberInput = z.infer<typeof teamMemberSchema>;
export type GalleryInput = z.infer<typeof gallerySchema>;
export type ScoreInput = z.infer<typeof scoreSchema>;
export type CertificateInput = z.infer<typeof certificateSchema>;
export type AssistantInput = z.infer<typeof assistantSchema>;
