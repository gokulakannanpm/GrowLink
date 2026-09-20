-- GrowLink Supabase Seed Data
-- Seed data corresponding to the exact 5 demo students and 1 demo mentor

-- 1. SEED DEMO MENTOR
INSERT INTO mentors (id, name, email, title, department)
VALUES (
    'a1111111-1111-1111-1111-111111111111',
    'Dr. S. Ramanathan',
    'mentor@growlink.demo',
    'Professor & Academic Mentor',
    'Information Technology'
) ON CONFLICT (email) DO NOTHING;

-- 2. SEED DEMO STUDENTS
INSERT INTO students (id, student_id, name, email, department, year, section, cgpa, previous_cgpa, cgpa_trend, status, avatar_url, phone)
VALUES 
(
    'b1111111-1111-1111-1111-111111111111',
    'IT2024-042',
    'Rahul Kumar',
    'rahul@growlink.demo',
    'Information Technology',
    'II Year',
    'A',
    8.42,
    8.18,
    '+0.24',
    'Needs Attention',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    '+91 98765 43210'
),
(
    'b2222222-2222-2222-2222-222222222222',
    'IT2024-018',
    'Priya S',
    'priya@growlink.demo',
    'Information Technology',
    'II Year',
    'A',
    9.12,
    8.96,
    '+0.16',
    'On Track',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    '+91 98765 43211'
),
(
    'b3333333-3333-3333-3333-333333333333',
    'IT2024-009',
    'Arun M',
    'arun@growlink.demo',
    'Information Technology',
    'II Year',
    'A',
    7.86,
    7.91,
    '-0.05',
    'Monitor',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    '+91 98765 43212'
),
(
    'b4444444-4444-4444-4444-444444444444',
    'IT2024-004',
    'Ananya R',
    'ananya@growlink.demo',
    'Information Technology',
    'II Year',
    'B',
    8.74,
    8.61,
    '+0.13',
    'On Track',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    '+91 98765 43213'
),
(
    'b5555555-5555-5555-5555-555555555555',
    'IT2024-055',
    'Karthik V',
    'karthik@growlink.demo',
    'Information Technology',
    'II Year',
    'B',
    7.42,
    7.68,
    '-0.26',
    'Needs Attention',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    '+91 98765 43214'
) ON CONFLICT (email) DO NOTHING;

-- 3. MENTORSHIP ASSIGNMENT (Dr. S. Ramanathan assigned to all 5 students)
INSERT INTO mentor_students (mentor_id, student_id)
VALUES 
('a1111111-1111-1111-1111-111111111111', 'b1111111-1111-1111-1111-111111111111'),
('a1111111-1111-1111-1111-111111111111', 'b2222222-2222-2222-2222-222222222222'),
('a1111111-1111-1111-1111-111111111111', 'b3333333-3333-3333-3333-333333333333'),
('a1111111-1111-1111-1111-111111111111', 'b4444444-4444-4444-4444-444444444444'),
('a1111111-1111-1111-1111-111111111111', 'b5555555-5555-5555-5555-555555555555')
ON CONFLICT DO NOTHING;

-- 4. SEED ATTENDANCE RECORDS
INSERT INTO attendance (student_id, subject, attended_classes, total_classes, attendance_percentage)
VALUES 
-- Rahul
('b1111111-1111-1111-1111-111111111111', 'Mathematics', 32, 40, 81.00),
('b1111111-1111-1111-1111-111111111111', 'DBMS', 27, 40, 68.00),
('b1111111-1111-1111-1111-111111111111', 'Java Programming', 30, 40, 76.00),
('b1111111-1111-1111-1111-111111111111', 'Physics', 31, 40, 79.00),
-- Priya
('b2222222-2222-2222-2222-222222222222', 'Mathematics', 35, 40, 88.00),
('b2222222-2222-2222-2222-222222222222', 'DBMS', 33, 40, 82.00);

-- 5. SEED ACADEMICS (CAT Marks)
INSERT INTO academics (student_id, subject, cat1, cat2)
VALUES 
-- Rahul
('b1111111-1111-1111-1111-111111111111', 'Mathematics', 82.00, 64.00),
('b1111111-1111-1111-1111-111111111111', 'DBMS', 76.00, 58.00),
('b1111111-1111-1111-1111-111111111111', 'Java Programming', 80.00, 66.00),
('b1111111-1111-1111-1111-111111111111', 'Physics', 74.00, 56.00),
-- Priya
('b2222222-2222-2222-2222-222222222222', 'Mathematics', 74.00, 82.00),
('b2222222-2222-2222-2222-222222222222', 'DBMS', 70.00, 78.00);

-- 6. SEED SKILLS
INSERT INTO skills (student_id, skill_name, platform, progress, previous_progress, evidence)
VALUES 
('b1111111-1111-1111-1111-111111111111', 'Data Structures Practice', 'LeetCode', '18 → 24 problems', '18 problems', 'Profile Verified'),
('b1111111-1111-1111-1111-111111111111', 'Data Science Fundamentals', 'Python Course', '72% → 81%', '72%', 'Module 4 Quiz Passed'),
('b1111111-1111-1111-1111-111111111111', 'Campus Attendance Alert', 'GitHub Projects', '2 projects', '1 project', 'Repository Active');

-- 7. SEED MENTOR ACTIONS
INSERT INTO mentor_actions (student_id, mentor_id, area, title, description, status, due_date)
VALUES 
('b1111111-1111-1111-1111-111111111111', 'a1111111-1111-1111-1111-111111111111', 'Integration', 'Schedule remedial discussion on Integration by Parts', 'Review Module 3 problem set before next assessment.', 'Pending', '2026-09-24');

-- 8. SEED MEETINGS (In-person, Phone, Online - Scheduled and Logged)
INSERT INTO meetings (id, student_id, mentor_id, meeting_type, mode, scheduled_date, scheduled_time, status, agenda, discussion_summary, outcome, action_items, follow_up_date)
VALUES 
-- Rahul: 1 Completed Phone call + 1 Scheduled In-Person meeting
(
    'c1111111-1111-1111-1111-111111111111',
    'b1111111-1111-1111-1111-111111111111',
    'a1111111-1111-1111-1111-111111111111',
    'Performance Review',
    'Phone',
    '2026-09-15',
    '03:30 PM',
    'Completed',
    'Review CAT 2 math score drop and DBMS attendance warning.',
    'Discussed test performance drop in Mathematics (64) and Physics (56). Rahul acknowledged struggling with Integration by Parts topics.',
    'Agreed to attend remedial tutorial sessions on Thursdays and complete problem set #3.',
    '1. Practice 3 Integration problem sets. 2. Catch up on DBMS lab attendance.',
    '2026-09-24'
),
(
    'c1111111-1111-1111-1111-111111111112',
    'b1111111-1111-1111-1111-111111111111',
    'a1111111-1111-1111-1111-111111111111',
    'Academic Follow-up',
    'In-person',
    '2026-09-24',
    '02:30 PM',
    'Scheduled',
    'Follow up on Integration problem set progress and DBMS lab catch-up attendance.',
    NULL,
    NULL,
    NULL,
    '2026-09-24'
),

-- Priya: 1 Completed Career Discussion
(
    'c2222222-2222-2222-2222-222222222222',
    'b2222222-2222-2222-2222-222222222222',
    'a1111111-1111-1111-1111-111111111111',
    'Career Discussion',
    'In-person',
    '2026-09-10',
    '02:00 PM',
    'Completed',
    'Discuss AWS certification progress and student mentor role nomination.',
    'Priya presented her AWS Cloud practitioner badge and expressed interest in leading the Women in Tech student ACM chapter.',
    'Nominated for Student Mentorship role in IT department.',
    '1. Prepare mentorship application draft.',
    '2026-10-01'
),

-- Arun: 1 Scheduled Attendance Review
(
    'c3333333-3333-3333-3333-333333333333',
    'b3333333-3333-3333-3333-333333333333',
    'a1111111-1111-1111-1111-111111111111',
    'Attendance Review',
    'In-person',
    '2026-09-25',
    '03:00 PM',
    'Scheduled',
    'Discuss class attendance consistency and hackathon team registration.',
    NULL,
    NULL,
    NULL,
    '2026-09-25'
),

-- Ananya: 1 Completed Online Academic Follow-up
(
    'c4444444-4444-4444-4444-444444444444',
    'b4444444-4444-4444-4444-444444444444',
    'a1111111-1111-1111-1111-111111111111',
    'Academic Follow-up',
    'Online',
    '2026-09-18',
    '04:00 PM',
    'Completed',
    'Review draft abstract for IEEE Conference submission.',
    'Reviewed AI in Healthcare paper draft 2. Structure and experimental setup look solid.',
    'Abstract approved for submission to upcoming IEEE Student Conference.',
    '1. Finalize camera-ready PDF.',
    '2026-09-30'
),

-- Karthik: 1 Scheduled Performance Review
(
    'c5555555-5555-5555-5555-555555555555',
    'b5555555-5555-5555-5555-555555555555',
    'a1111111-1111-1111-1111-111111111111',
    'Performance Review',
    'In-person',
    '2026-09-26',
    '11:00 AM',
    'Scheduled',
    'Review remedial attendance and pending lab assignment submission.',
    NULL,
    NULL,
    NULL,
    '2026-09-26'
);
