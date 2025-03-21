-- Update SOP Writer position
UPDATE jobs 
SET 
    department = 'Content',
    location = 'Remote',
    type = 'Full-time',
    description = 'As a dedicated SOP Writer for Qogent, your expertise becomes the bridge that connects ambitious students with their dreams of studying abroad. You are tasked with crafting compelling, insightful Statements of Purpose that not only reflect the individuality of each student but also align with the stringent demands of international universities. By joining us, you become a key player in a mission that transcends mere education consultancy; you help shape futures.',
    responsibilities = ARRAY[
        'Craft personalized, impactful Statements of Purpose that highlight each student''s unique journey, aspirations, and why they are a perfect fit for their chosen programs',
        'Engage closely with students to unearth and articulate their stories, achievements, and ambitions in a manner that resonates with admissions committees',
        'Collaborate with our students and admissions team to ensure all SOPs meet the high standards and expectations of international universities',
        'Continuously refine and update SOP strategies based on feedback from universities and the evolving landscape of higher education abroad'
    ],
    requirements = ARRAY[
        'Proven experience as an SOP writer or in a similar role focused on academic writing, with a portfolio that showcases your ability to tell compelling stories',
        'A deep understanding of the admissions process for international universities, including what makes an SOP stand out',
        'Exceptional writing and editing skills, with an ability to capture the voice and aspirations of students',
        'Strong research skills to stay updated on the latest trends and requirements in higher education abroad',
        'A self-motivated, organized, and detail-oriented work ethic, capable of managing multiple projects in a remote work environment'
    ],
    benefits = ARRAY[
        'Experience in counseling students on their educational journey abroad',
        'Familiarity with SEO practices and online content strategy to enhance the visibility of success stories'
    ],
    posted_date = '2024-04-03',
    application_url = 'https://qogent.in/apply',
    is_active = true,
    updated_at = NOW()
WHERE title = 'SOP Writer'; 