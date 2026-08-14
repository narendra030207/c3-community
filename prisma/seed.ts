import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');
  
  // Clean existing data
  await prisma.notification.deleteMany();
  await prisma.userAchievement.deleteMany();
  await prisma.achievement.deleteMany();
  await prisma.certificate.deleteMany();
  await prisma.prize.deleteMany();
  await prisma.result.deleteMany();
  await prisma.submission.deleteMany();
  await prisma.score.deleteMany();
  await prisma.leaderboardEntry.deleteMany();
  await prisma.competitionParticipant.deleteMany();
  await prisma.eventRegistration.deleteMany();
  await prisma.contactMessage.deleteMany();
  await prisma.galleryItem.deleteMany();
  await prisma.teamMember.deleteMany();
  await prisma.notice.deleteMany();
  await prisma.competition.deleteMany();
  await prisma.event.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await hash('Admin@123456', 12);
  const userPassword = await hash('User@123456', 12);

  // Create admin user
  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@c3community.com',
      password: hashedPassword,
      role: 'SUPER_ADMIN',
      isActive: true,
      profile: { create: { branch: 'Computer Science', batch: '2023', totalScore: 1000, currentRank: 1 } },
    },
  });

  // Create 15 participant users
  const users = [];
  const names = [
    'Arjun Patel', 'Priya Sharma', 'Rahul Kumar', 'Sneha Gupta', 'Vikram Singh',
    'Ananya Reddy', 'Karthik Nair', 'Divya Mehta', 'Rohan Joshi', 'Meera Iyer',
    'Aditya Verma', 'Kavya Rao', 'Nikhil Das', 'Pooja Kapoor', 'Suresh Menon',
  ];
  const branches = ['Computer Science', 'Information Technology', 'Electronics', 'Mechanical', 'Civil'];
  const batches = ['2022', '2023', '2024', '2025'];

  for (let i = 0; i < names.length; i++) {
    const user = await prisma.user.create({
      data: {
        name: names[i],
        email: `${names[i].toLowerCase().replace(/\s/g, '.')}@c3community.com`,
        password: userPassword,
        role: 'PARTICIPANT',
        isActive: true,
        profile: {
          create: {
            branch: branches[i % branches.length],
            batch: batches[i % batches.length],
            rollNumber: `C32023${String(i + 1).padStart(3, '0')}`,
            totalScore: Math.floor(Math.random() * 800) + 100,
            currentRank: i + 2,
            bestRank: Math.max(1, i + 2 - Math.floor(Math.random() * 3)),
            xp: Math.floor(Math.random() * 5000) + 500,
            skills: ['JavaScript', 'Python', 'React', 'Node.js', 'C++'].slice(0, Math.floor(Math.random() * 4) + 1),
          },
        },
      },
    });
    users.push(user);
  }

  console.log(`✅ Created ${users.length + 1} users`);

  // Create 8 events
  const events = await Promise.all([
    prisma.event.create({ data: { title: 'CodeStorm 2024', slug: 'codestorm-2024', description: 'A high-intensity competitive programming contest with algorithmic challenges.', date: new Date('2024-12-15'), eventType: 'CODING', status: 'UPCOMING', venue: 'Lab 101, CS Building', organizer: 'C3 Core Team', rules: '1. Individual participation\n2. 3-hour duration\n3. Use C++, Java, or Python', eligibility: 'All college students', prizeInfo: '1st: ₹5000, 2nd: ₹3000, 3rd: ₹2000', maxParticipants: 100, registrationDeadline: new Date('2024-12-14') } }),
    prisma.event.create({ data: { title: 'HackFusion 48', slug: 'hackfusion-48', description: 'A 48-hour hackathon for building innovative solutions to real-world problems.', date: new Date('2024-12-20'), endDate: new Date('2024-12-22'), eventType: 'HACKATHON', status: 'UPCOMING', venue: 'Innovation Center', organizer: 'C3 Community', rules: 'Teams of 3-4 members. All code written during hackathon.', eligibility: 'All engineering students', prizeInfo: '1st: ₹15000, 2nd: ₹10000, 3rd: ₹5000', maxParticipants: 80 } }),
    prisma.event.create({ data: { title: 'Web Dev Bootcamp', slug: 'web-dev-bootcamp', description: 'A 3-day intensive workshop on modern web development with React and Next.js.', date: new Date('2024-12-10'), eventType: 'WORKSHOP', status: 'COMPLETED', venue: 'Seminar Hall 2', organizer: 'Prof. Sharma', maxParticipants: 50 } }),
    prisma.event.create({ data: { title: 'AI/ML Seminar', slug: 'ai-ml-seminar', description: 'Industry expert seminar on latest AI and Machine Learning trends.', date: new Date('2024-12-08'), eventType: 'SEMINAR', status: 'COMPLETED', venue: 'Auditorium', organizer: 'Dr. Kumar' } }),
    prisma.event.create({ data: { title: 'Tech Quiz 2024', slug: 'tech-quiz-2024', description: 'Test your tech knowledge in this fast-paced quiz competition.', date: new Date('2024-12-18'), eventType: 'QUIZ', status: 'UPCOMING', venue: 'Room 201', organizer: 'Quiz Club', maxParticipants: 60 } }),
    prisma.event.create({ data: { title: 'Git & GitHub Workshop', slug: 'git-github-workshop', description: 'Hands-on workshop on version control with Git and collaborative development with GitHub.', date: new Date('2024-11-25'), eventType: 'WORKSHOP', status: 'COMPLETED', venue: 'Lab 102', organizer: 'C3 Coordinators', maxParticipants: 40 } }),
    prisma.event.create({ data: { title: 'DSA Masterclass', slug: 'dsa-masterclass', description: 'Deep dive into data structures and algorithms for competitive programming.', date: new Date('2024-12-25'), eventType: 'CODING', status: 'UPCOMING', venue: 'Lab 201', organizer: 'Arjun Patel', maxParticipants: 45 } }),
    prisma.event.create({ data: { title: 'Cybersecurity Workshop', slug: 'cybersecurity-workshop', description: 'Learn ethical hacking, penetration testing, and security best practices.', date: new Date('2025-01-05'), eventType: 'WORKSHOP', status: 'UPCOMING', venue: 'Lab 103', organizer: 'Security Team', maxParticipants: 35 } }),
  ]);
  console.log(`✅ Created ${events.length} events`);

  // Create 4 competitions
  const competitions = await Promise.all([
    prisma.competition.create({ data: { title: 'Code Sprint 2024', slug: 'code-sprint-2024', description: 'An intense 3-hour competitive programming contest.', startDate: new Date('2024-12-15T09:00:00Z'), endDate: new Date('2024-12-15T12:00:00Z'), status: 'UPCOMING', rules: '1. Individual\n2. Any language\n3. No internet', problemStatement: 'Topics: Arrays, DP, Graphs, Trees', maxParticipants: 100 } }),
    prisma.competition.create({ data: { title: 'HackFusion 2024', slug: 'hackfusion-2024', description: '24-hour hackathon with themes: AI for Good, Sustainable Tech, Smart Campus.', startDate: new Date('2024-12-20T10:00:00Z'), endDate: new Date('2024-12-21T10:00:00Z'), status: 'UPCOMING', rules: 'Teams of 3-4. All code during hackathon.', maxParticipants: 80 } }),
    prisma.competition.create({ data: { title: 'Bug Hunt Challenge', slug: 'bug-hunt-challenge', description: 'Find and fix bugs in pre-written code.', startDate: new Date('2024-11-10T14:00:00Z'), endDate: new Date('2024-11-10T16:00:00Z'), status: 'COMPLETED', rules: '10 buggy snippets. +10 correct, -2 wrong.', maxParticipants: 60 } }),
    prisma.competition.create({ data: { title: 'Web Dev Showdown', slug: 'web-dev-showdown', description: 'Build a complete web app in 6 hours.', startDate: new Date('2024-12-28T10:00:00Z'), endDate: new Date('2024-12-28T16:00:00Z'), status: 'UPCOMING', rules: 'Individual or pair. Any stack. Must deploy.', maxParticipants: 50 } }),
  ]);
  console.log(`✅ Created ${competitions.length} competitions`);

  // Create leaderboard entries
  for (let i = 0; i < users.length; i++) {
    await prisma.leaderboardEntry.create({
      data: {
        userId: users[i].id,
        totalScore: Math.floor(Math.random() * 800) + 100,
        competitionScore: Math.floor(Math.random() * 500),
        eventCount: Math.floor(Math.random() * 10) + 1,
        winCount: Math.floor(Math.random() * 3),
        rank: i + 2,
        previousRank: Math.max(1, i + 2 + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 3)),
        period: 'global',
      },
    });
  }
  console.log(`✅ Created leaderboard entries`);

  // Create achievements
  const achievementTypes = [
    { name: 'Coding Champion', type: 'CODING_CHAMPION' as any, description: 'Win a coding competition', xpReward: 500 },
    { name: 'Hackathon Winner', type: 'HACKATHON_WINNER' as any, description: 'Win a hackathon', xpReward: 750 },
    { name: 'Top Performer', type: 'TOP_PERFORMER' as any, description: 'Reach top 5 on leaderboard', xpReward: 400 },
    { name: 'Problem Solver', type: 'PROBLEM_SOLVER' as any, description: 'Solve 50+ problems', xpReward: 300 },
    { name: 'Workshop Contributor', type: 'WORKSHOP_CONTRIBUTOR' as any, description: 'Attend 5 workshops', xpReward: 200 },
    { name: 'Community Leader', type: 'COMMUNITY_LEADER' as any, description: 'Help 10+ community members', xpReward: 350 },
    { name: 'Event Organizer', type: 'EVENT_ORGANIZER' as any, description: 'Organize a C3 event', xpReward: 400 },
    { name: 'Rising Star', type: 'RISING_STAR' as any, description: 'Join your first competition', xpReward: 100 },
    { name: 'First Event', type: 'FIRST_EVENT' as any, description: 'Attend your first event', xpReward: 50 },
    { name: 'First Win', type: 'FIRST_WIN' as any, description: 'Win your first competition', xpReward: 250 },
    { name: '7-Day Streak', type: 'STREAK_7' as any, description: 'Active for 7 consecutive days', xpReward: 150 },
    { name: '30-Day Streak', type: 'STREAK_30' as any, description: 'Active for 30 consecutive days', xpReward: 500 },
    { name: 'Century Score', type: 'CENTURY_SCORE' as any, description: 'Score 100+ points in a competition', xpReward: 200 },
  ];
  const achievements = await Promise.all(
    achievementTypes.map(a => prisma.achievement.create({ data: a }))
  );
  console.log(`✅ Created ${achievements.length} achievements`);

  // Create notices
  await Promise.all([
    prisma.notice.create({ data: { title: 'CodeStorm 2024 Registration Open', description: 'Registration for CodeStorm 2024 is now open. Limited seats available!', category: 'COMPETITION', priority: 'IMPORTANT' } }),
    prisma.notice.create({ data: { title: 'HackFusion 48 - Team Formation', description: 'Start forming your teams for HackFusion 48. Team size: 3-4 members.', category: 'EVENT', priority: 'NORMAL' } }),
    prisma.notice.create({ data: { title: 'Leaderboard Updated', description: 'Monthly leaderboard has been recalculated. Check your new rankings!', category: 'ACHIEVEMENT', priority: 'NORMAL' } }),
    prisma.notice.create({ data: { title: 'Server Maintenance', description: 'Platform will be under maintenance on Dec 12, 2AM-4AM IST.', category: 'MAINTENANCE', priority: 'URGENT' } }),
    prisma.notice.create({ data: { title: 'New Certificates Available', description: 'Certificates for Web Dev Bootcamp are now available for download.', category: 'RESULT', priority: 'IMPORTANT' } }),
    prisma.notice.create({ data: { title: 'DSA Masterclass Announced', description: 'A new DSA masterclass series is starting. Register now!', category: 'EVENT', priority: 'NORMAL' } }),
    prisma.notice.create({ data: { title: 'Bug Hunt Results', description: 'Results for Bug Hunt Challenge have been published.', category: 'RESULT', priority: 'IMPORTANT' } }),
    prisma.notice.create({ data: { title: 'Community Meetup', description: 'Monthly C3 community meetup this Saturday at 4 PM in the CS Lab.', category: 'GENERAL', priority: 'NORMAL' } }),
    prisma.notice.create({ data: { title: 'Internship Opportunities', description: 'Top performers will be recommended for industry internships.', category: 'GENERAL', priority: 'IMPORTANT' } }),
    prisma.notice.create({ data: { title: 'Emergency: Lab Access', description: 'Lab 101 access cards have been updated. Collect new cards from office.', category: 'MAINTENANCE', priority: 'URGENT' } }),
  ]);
  console.log('✅ Created 10 notices');

  // Create team members
  await Promise.all([
    prisma.teamMember.create({ data: { name: 'Dr. Rajesh Kumar', position: 'Faculty Advisor', category: 'FACULTY_MENTOR', department: 'Computer Science', bio: 'Professor of CS with 15+ years of experience in AI and ML.', skills: ['AI', 'Machine Learning', 'Data Science'], order: 1 } }),
    prisma.teamMember.create({ data: { name: 'Prof. Anita Sharma', position: 'Faculty Co-Advisor', category: 'FACULTY_MENTOR', department: 'Information Technology', bio: 'Expert in cybersecurity and network systems.', skills: ['Cybersecurity', 'Networking'], order: 2 } }),
    prisma.teamMember.create({ data: { name: 'Arjun Patel', position: 'President', category: 'CORE_TEAM', department: 'Computer Science', bio: 'Full-stack developer and competitive programmer.', skills: ['React', 'Node.js', 'C++', 'Python'], order: 1 } }),
    prisma.teamMember.create({ data: { name: 'Priya Sharma', position: 'Vice President', category: 'CORE_TEAM', department: 'Information Technology', bio: 'Passionate about open source and community building.', skills: ['Python', 'Django', 'DevOps'], order: 2 } }),
    prisma.teamMember.create({ data: { name: 'Rahul Kumar', position: 'Technical Lead', category: 'CORE_TEAM', department: 'Computer Science', bio: 'System design enthusiast and hackathon organizer.', skills: ['System Design', 'Java', 'AWS'], order: 3 } }),
    prisma.teamMember.create({ data: { name: 'Sneha Gupta', position: 'Design Lead', category: 'CORE_TEAM', department: 'Computer Science', bio: 'UI/UX designer with a love for pixel-perfect interfaces.', skills: ['Figma', 'UI/UX', 'CSS', 'React'], order: 4 } }),
    prisma.teamMember.create({ data: { name: 'Vikram Singh', position: 'Events Coordinator', category: 'COORDINATOR', department: 'Electronics', bio: 'Organizes events and manages logistics.', skills: ['Event Management', 'Leadership'], order: 1 } }),
    prisma.teamMember.create({ data: { name: 'Ananya Reddy', position: 'Content Lead', category: 'COORDINATOR', department: 'Computer Science', bio: 'Creates engaging content for the community.', skills: ['Content Writing', 'Social Media'], order: 2 } }),
    prisma.teamMember.create({ data: { name: 'Karthik Nair', position: 'Workshop Facilitator', category: 'VOLUNTEER', department: 'Information Technology', bio: 'Conducts hands-on workshops on web technologies.', skills: ['JavaScript', 'React', 'Teaching'], order: 1 } }),
    prisma.teamMember.create({ data: { name: 'Divya Mehta', position: 'Outreach Volunteer', category: 'VOLUNTEER', department: 'Mechanical', bio: 'Connects C3 with industry partners and sponsors.', skills: ['Communication', 'Networking'], order: 2 } }),
    prisma.teamMember.create({ data: { name: 'Amit Joshi', position: 'Former President (2022-23)', category: 'ALUMNI', department: 'Computer Science', bio: 'Founded C3 Community. Now SDE at Google.', skills: ['Algorithms', 'System Design', 'Leadership'], order: 1 } }),
    prisma.teamMember.create({ data: { name: 'Neha Kapoor', position: 'Former Tech Lead (2022-23)', category: 'ALUMNI', department: 'Information Technology', bio: 'Led the first hackathon. Now at Microsoft.', skills: ['Full Stack', 'Azure', 'ML'], order: 2 } }),
  ]);
  console.log('✅ Created 12 team members');

  // Create certificates
  await Promise.all([
    prisma.certificate.create({ data: { certificateId: 'C3-ABCD-EF01-2345', userId: users[0].id, title: 'Web Dev Bootcamp Completion', achievement: 'Successfully completed the 3-day Web Development Bootcamp', eventId: events[2].id } }),
    prisma.certificate.create({ data: { certificateId: 'C3-GHIJ-KL23-4567', userId: users[1].id, title: 'Bug Hunt Champion', achievement: '1st Place in Bug Hunt Challenge', competitionId: competitions[2].id } }),
    prisma.certificate.create({ data: { certificateId: 'C3-MNOP-QR45-6789', userId: users[2].id, title: 'Git Workshop Certificate', achievement: 'Completed Git & GitHub Workshop', eventId: events[5].id } }),
    prisma.certificate.create({ data: { certificateId: 'C3-STUV-WX67-8901', userId: users[3].id, title: 'AI/ML Seminar Participation', achievement: 'Active participation in AI/ML Seminar', eventId: events[3].id } }),
    prisma.certificate.create({ data: { certificateId: 'C3-YZAB-CD89-0123', userId: users[0].id, title: 'Bug Hunt Runner-Up', achievement: '2nd Place in Bug Hunt Challenge', competitionId: competitions[2].id } }),
    prisma.certificate.create({ data: { certificateId: 'C3-EFGH-IJ01-2345', userId: users[4].id, title: 'Top Performer Q4 2024', achievement: 'Recognized as Top Performer for Q4 2024' } }),
  ]);
  console.log('✅ Created 6 certificates');

  // Create gallery items
  const galleryCategories = ['EVENT', 'WORKSHOP', 'HACKATHON', 'COMPETITION', 'TEAM', 'AWARD'] as const;
  for (let i = 0; i < 12; i++) {
    await prisma.galleryItem.create({
      data: {
        title: `Gallery Item ${i + 1}`,
        description: `Photo from C3 Community event`,
        imageUrl: `/images/gallery/placeholder-${(i % 6) + 1}.jpg`,
        category: galleryCategories[i % galleryCategories.length] as any,
        eventName: events[i % events.length].title,
        date: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
      },
    });
  }
  console.log('✅ Created 12 gallery items');

  // Create contact messages
  await Promise.all([
    prisma.contactMessage.create({ data: { name: 'John Doe', email: 'john@example.com', subject: 'Membership Inquiry', message: 'How can I join C3 Community? I am a first-year CS student.', status: 'UNREAD' } }),
    prisma.contactMessage.create({ data: { name: 'Jane Smith', email: 'jane@example.com', subject: 'Workshop Request', message: 'Can you organize a Docker and Kubernetes workshop?', status: 'READ' } }),
    prisma.contactMessage.create({ data: { name: 'Mike Wilson', email: 'mike@example.com', subject: 'Sponsorship Proposal', message: 'Our company would like to sponsor the next hackathon.', status: 'REPLIED', reply: 'Thank you for your interest! Our team will reach out soon.' } }),
    prisma.contactMessage.create({ data: { name: 'Sarah Lee', email: 'sarah@example.com', subject: 'Certificate Issue', message: 'I completed the bootcamp but did not receive my certificate.', status: 'UNREAD' } }),
    prisma.contactMessage.create({ data: { name: 'Alex Chen', email: 'alex@example.com', subject: 'Collaboration', message: 'Interested in collaborating between our coding clubs.', status: 'ARCHIVED' } }),
  ]);
  console.log('✅ Created 5 contact messages');

  // Create results for Bug Hunt Challenge
  for (let i = 0; i < Math.min(10, users.length); i++) {
    await prisma.result.create({
      data: {
        competitionId: competitions[2].id,
        userId: users[i].id,
        participantName: users[i].name,
        rank: i + 1,
        score: 95 - i * 5 + Math.floor(Math.random() * 3),
        remarks: i < 3 ? ['Gold Medal', 'Silver Medal', 'Bronze Medal'][i] : 'Participated',
      },
    });
  }
  console.log('✅ Created results');

  console.log('\n🎉 Database seeded successfully!');
  console.log('\n📧 Admin Login: admin@c3community.com / Admin@123456');
  console.log('📧 User Login: arjun.patel@c3community.com / User@123456');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
