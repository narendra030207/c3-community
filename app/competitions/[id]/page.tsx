"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Users,
  Trophy,
  FileText,
  CheckCircle,
  AlertCircle,
  Target,
  BarChart3,
} from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import { COMPETITION_STATUS_LABELS } from "@/lib/constants";

// Demo competition data
const DEMO_COMPETITIONS = [
  {
    id: "comp-1",
    title: "Code Sprint 2024",
    slug: "code-sprint-2024",
    description:
      "An intense 3-hour competitive programming contest. Solve algorithmic problems, optimize solutions, and race against the clock. Open to all skill levels with problems ranging from easy to expert.",
    banner: null,
    startDate: "2024-12-15T09:00:00Z",
    endDate: "2024-12-15T12:00:00Z",
    status: "UPCOMING",
    rules:
      "1. Individual participation only.\n2. Use any programming language (C++, Java, Python, JavaScript).\n3. Internet access is NOT allowed during the contest.\n4. Each problem has a time limit and memory limit.\n5. Partial scoring is enabled.\n6. Plagiarism will result in disqualification.",
    problemStatement:
      "Problem statements will be released at the start of the competition. Topics include: Arrays, Strings, Dynamic Programming, Graphs, Trees, and Greedy Algorithms.",
    maxParticipants: 100,
    participants: 67,
    submissions: 245,
    acceptedSubmissions: 189,
    highestScore: 450,
    averageScore: 285,
    prizes: [
      { position: 1, title: "Gold Medal + ₹5,000", type: "Cash + Trophy" },
      { position: 2, title: "Silver Medal + ₹3,000", type: "Cash + Trophy" },
      { position: 3, title: "Bronze Medal + ₹2,000", type: "Cash + Trophy" },
    ],
  },
  {
    id: "comp-2",
    title: "HackFusion 2024",
    slug: "hackfusion-2024",
    description:
      "A 24-hour hackathon where teams of 3-4 build innovative solutions to real-world problems. This year's themes: AI for Good, Sustainable Tech, and Smart Campus.",
    banner: null,
    startDate: "2024-12-20T10:00:00Z",
    endDate: "2024-12-21T10:00:00Z",
    status: "UPCOMING",
    rules:
      "1. Team size: 3-4 members.\n2. All code must be written during the hackathon.\n3. Use of open-source libraries is allowed.\n4. Teams must present a working demo.\n5. Judging criteria: Innovation (30%), Technical Complexity (25%), Impact (25%), Presentation (20%).",
    problemStatement:
      "Choose one of the three themes and build a prototype that addresses a real problem. You must submit a GitHub repository link and a 5-minute demo video.",
    maxParticipants: 80,
    participants: 52,
    submissions: 13,
    acceptedSubmissions: 13,
    highestScore: 92,
    averageScore: 74,
    prizes: [
      { position: 1, title: "₹15,000 + Internship Opportunity", type: "Cash + Opportunity" },
      { position: 2, title: "₹10,000", type: "Cash" },
      { position: 3, title: "₹5,000", type: "Cash" },
    ],
  },
  {
    id: "comp-3",
    title: "Bug Hunt Challenge",
    slug: "bug-hunt-challenge",
    description:
      "Find and fix bugs in pre-written code. A unique debugging competition that tests your problem-solving and code comprehension skills.",
    banner: null,
    startDate: "2024-11-10T14:00:00Z",
    endDate: "2024-11-10T16:00:00Z",
    status: "COMPLETED",
    rules:
      "1. Individual participation.\n2. You will be given 10 buggy code snippets.\n3. Identify the bug and provide the fix.\n4. Scoring: +10 for correct fix, -2 for wrong answer.\n5. Time taken is the tiebreaker.",
    problemStatement: "Problems have been archived. Contact the organizer for details.",
    maxParticipants: 60,
    participants: 45,
    submissions: 420,
    acceptedSubmissions: 312,
    highestScore: 94,
    averageScore: 68,
    prizes: [
      { position: 1, title: "Certificate + ₹3,000", type: "Cash + Certificate" },
      { position: 2, title: "Certificate + ₹2,000", type: "Cash + Certificate" },
      { position: 3, title: "Certificate + ₹1,000", type: "Cash + Certificate" },
    ],
  },
  {
    id: "comp-4",
    title: "Web Dev Showdown",
    slug: "web-dev-showdown",
    description:
      "Build a complete web application in 6 hours. This competition tests your full-stack development skills with a surprise theme revealed at the start.",
    banner: null,
    startDate: "2024-12-28T10:00:00Z",
    endDate: "2024-12-28T16:00:00Z",
    status: "UPCOMING",
    rules:
      "1. Individual or pair participation.\n2. Use any web technology stack.\n3. The app must be deployed and accessible via a public URL.\n4. UI/UX design counts toward the score.\n5. Judging: Functionality (35%), Design (25%), Code Quality (20%), Innovation (20%).",
    problemStatement: "The theme will be revealed at the start of the competition.",
    maxParticipants: 50,
    participants: 28,
    submissions: 0,
    acceptedSubmissions: 0,
    highestScore: 0,
    averageScore: 0,
    prizes: [
      { position: 1, title: "₹8,000 + Certificate", type: "Cash + Certificate" },
      { position: 2, title: "₹5,000 + Certificate", type: "Cash + Certificate" },
      { position: 3, title: "₹3,000 + Certificate", type: "Cash + Certificate" },
    ],
  },
];

const statusColors: Record<string, string> = {
  UPCOMING: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  ACTIVE: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  JUDGING: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  COMPLETED: "bg-gray-500/20 text-gray-400 border-gray-500/30",
};

export default function CompetitionDetailPage() {
  const params = useParams();
  const [isRegistering, setIsRegistering] = useState(false);
  const [registered, setRegistered] = useState(false);

  const competition = DEMO_COMPETITIONS.find((c) => c.id === params.id || c.slug === params.id);

  if (!competition) {
    return (
      <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Competition Not Found</h1>
          <p className="text-gray-400 mb-6">The competition you're looking for doesn't exist.</p>
          <Link
            href="/competitions"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Competitions
          </Link>
        </div>
      </div>
    );
  }

  const handleRegister = async () => {
    setIsRegistering(true);
    await new Promise((r) => setTimeout(r, 1500));
    setRegistered(true);
    setIsRegistering(false);
  };

  const capacityPercentage = competition.maxParticipants
    ? Math.round((competition.participants / competition.maxParticipants) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-[#0a0e1a] pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/competitions"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Competitions
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span
              className={cn(
                "px-3 py-1 rounded-full text-sm font-medium border",
                statusColors[competition.status]
              )}
            >
              {COMPETITION_STATUS_LABELS[competition.status]}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            {competition.title}
          </h1>

          <p className="text-lg text-gray-300 leading-relaxed max-w-3xl">
            {competition.description}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Competition Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {[
                { icon: Users, label: "Participants", value: competition.participants },
                { icon: FileText, label: "Submissions", value: competition.submissions },
                { icon: CheckCircle, label: "Accepted", value: competition.acceptedSubmissions },
                { icon: BarChart3, label: "Avg Score", value: competition.averageScore },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 text-center"
                >
                  <stat.icon className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Rules */}
            {competition.rules && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
              >
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-violet-400" />
                  Rules & Guidelines
                </h2>
                <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {competition.rules}
                </div>
              </motion.div>
            )}

            {/* Problem Statement */}
            {competition.problemStatement && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
              >
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-cyan-400" />
                  Problem Statement
                </h2>
                <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {competition.problemStatement}
                </div>
              </motion.div>
            )}

            {/* Prizes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
            >
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                Prizes
              </h2>
              <div className="space-y-3">
                {competition.prizes.map((prize) => (
                  <div
                    key={prize.position}
                    className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5"
                  >
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold",
                        prize.position === 1 && "bg-amber-500/20 text-amber-400",
                        prize.position === 2 && "bg-gray-400/20 text-gray-300",
                        prize.position === 3 && "bg-orange-600/20 text-orange-400"
                      )}
                    >
                      {prize.position === 1 ? "🥇" : prize.position === 2 ? "🥈" : "🥉"}
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-medium">{prize.title}</div>
                      <div className="text-sm text-gray-400">{prize.type}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Registration Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sticky top-28"
            >
              <h3 className="text-lg font-bold text-white mb-4">Competition Details</h3>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-gray-300">
                  <Calendar className="w-5 h-5 text-blue-400 shrink-0" />
                  <div>
                    <div className="text-sm text-gray-400">Start</div>
                    <div>{formatDate(competition.startDate)}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Clock className="w-5 h-5 text-violet-400 shrink-0" />
                  <div>
                    <div className="text-sm text-gray-400">End</div>
                    <div>{formatDate(competition.endDate)}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Users className="w-5 h-5 text-cyan-400 shrink-0" />
                  <div>
                    <div className="text-sm text-gray-400">Participants</div>
                    <div>
                      {competition.participants}
                      {competition.maxParticipants && ` / ${competition.maxParticipants}`}
                    </div>
                  </div>
                </div>
                {competition.highestScore > 0 && (
                  <div className="flex items-center gap-3 text-gray-300">
                    <Trophy className="w-5 h-5 text-amber-400 shrink-0" />
                    <div>
                      <div className="text-sm text-gray-400">Highest Score</div>
                      <div>{competition.highestScore}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Capacity Bar */}
              {competition.maxParticipants && (
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-400 mb-1">
                    <span>Capacity</span>
                    <span>{capacityPercentage}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-violet-500 h-2 rounded-full transition-all"
                      style={{ width: `${capacityPercentage}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Register Button */}
              {competition.status === "UPCOMING" && (
                <button
                  onClick={handleRegister}
                  disabled={isRegistering || registered}
                  className={cn(
                    "w-full py-3 rounded-xl font-semibold text-white transition-all",
                    registered
                      ? "bg-emerald-600 cursor-default"
                      : "bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 hover:shadow-lg hover:shadow-blue-500/25",
                    isRegistering && "opacity-75 cursor-wait"
                  )}
                >
                  {registered ? (
                    <span className="flex items-center justify-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      Registered
                    </span>
                  ) : isRegistering ? (
                    "Registering..."
                  ) : (
                    "Register Now"
                  )}
                </button>
              )}

              {competition.status === "COMPLETED" && (
                <div className="text-center py-3 rounded-xl bg-gray-500/20 text-gray-400 font-medium">
                  Competition Ended
                </div>
              )}

              {competition.status === "ACTIVE" && (
                <div className="text-center py-3 rounded-xl bg-blue-500/20 text-blue-400 font-medium">
                  Competition In Progress
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
