-- Update Business Development Executive position
UPDATE jobs 
SET 
    department = 'Sales',
    location = 'Remote',
    type = 'Full-time',
    description = 'At Qogent, our Business Development Executives are the driving force behind our growth, transforming opportunities into lasting partnerships. In this role, you''re not merely reaching out; you''re forging paths for future scholars. Your ability to identify and cultivate potential leads, paired with your knack for building relationships, positions you as a key player in expanding our reach. Through strategic market analysis and tailored sales strategies, you''ll not only meet targets but exceed them, enhancing our mission to make global education accessible.',
    responsibilities = ARRAY[
        'Lead Generation: Identify and cultivate potential clients through networking, cold calling, and digital marketing strategies to drive business growth',
        'Client Relationship Management: Build and maintain strong relationships with new and existing clients, understanding their needs to provide tailored solutions',
        'Market Analysis: Conduct thorough market research to identify trends, competition, and new opportunities in the education sector',
        'Sales Strategies: Develop and implement effective sales strategies to achieve targets, including presenting and selling Qogent''s services to prospective clients',
        'Collaboration: Work closely with the marketing and admissions teams to align sales strategies with company goals',
        'Performance Tracking: Monitor and report on sales performance metrics to inform strategic decisions and improvements',
        'Feedback and Improvement: Gather client feedback to enhance service offerings and customer satisfaction',
        'Educational Partnerships: Seek out and secure partnerships with educational institutions and other relevant organizations to expand Qogent''s reach'
    ],
    requirements = ARRAY[
        'Proven experience as a Business Development Executive or similar role in the education sector, with a track record of meeting or exceeding sales targets',
        'Strong understanding of the study abroad consultancy market and higher education landscape',
        'Excellent interpersonal and communication skills, with the ability to engage effectively with a diverse range of clients',
        'Proficiency in sales and CRM software to streamline and document all phases of the sales process',
        'Ability to analyze market trends and sales data to inform strategic planning',
        'Innovative and strategic thinker with a strong customer orientation and negotiation skills',
        'Self-motivated with a results-driven approach, able to work independently and as part of a team',
        'Bachelor''s degree in Business, Marketing, or a related field preferred'
    ],
    posted_date = '2024-03-04',
    application_url = 'https://qogent.in/apply',
    is_active = true,
    updated_at = NOW()
WHERE title = 'Business Development Executive';

-- Update HR Manager position
UPDATE jobs 
SET 
    department = 'Human Resources',
    location = 'Hubli, Karnataka',
    type = 'Full-time',
    description = 'At Qogent, our Human Resource Manager is the heartbeat of our daily operations, weaving together the vibrant tapestry of our workspace. In this role, you''re not just the first face people see; you''re the architect of first impressions, the orchestrator of seamless interactions, and the bridge connecting the dots across our ecosystem.',
    responsibilities = ARRAY[
        'Take charge of various HR-related activities within the organization',
        'Participate in employee recruitment processes, including job posting, candidate screening, and conducting interviews',
        'Assist in the onboarding process for new employees, ensuring they are smoothly integrated into the company',
        'Help with HR administrative tasks, such as maintaining employee records, managing employee benefits, and handling employee queries',
        'Support the payroll process by ensuring accurate and timely processing of employee salaries, deductions, and benefits',
        'Handle work-related calls and email inquiries on behalf of the CEO',
        'Act as a point of contact between the CEO and internal/external stakeholders',
        'Keep the CEO informed about company activities, progress, and important updates',
        'Coordinate and schedule meetings, appointments, and travel arrangements for the CEO as needed',
        'Prepare reports, presentations, and documents for the CEO''s review and meetings'
    ],
    requirements = ARRAY[
        'Demonstrated experience in a front desk, administrative, or HR role, with a keen understanding of office operations',
        'Proficiency in HR software, Microsoft Office Suite, and other relevant office management tools',
        'Strong understanding of HR processes, including recruitment, onboarding, and benefits administration',
        'Exceptional organizational and multitasking skills, with the ability to prioritize tasks efficiently',
        'Excellent communication and interpersonal skills, capable of fostering positive relationships with all levels of staff',
        'Experience in handling confidential information with discretion and in accordance with data protection laws',
        'Ability to manage and schedule meetings, appointments, and travel arrangements accurately',
        'Degree in Human Resources, Business Administration, or a related field is preferred'
    ],
    posted_date = '2024-03-04',
    application_url = 'https://qogent.in/apply',
    is_active = true,
    updated_at = NOW()
WHERE title = 'Human Resource Manager';

-- Update Video Editor position
UPDATE jobs 
SET 
    department = 'Marketing',
    location = 'Remote',
    type = 'Full-time',
    description = 'At Qogent, our Video Editors are the visual storytellers, transforming ideas into compelling narratives that captivate and inspire. Your role goes beyond editing; it''s about crafting visual stories that resonate with our audience''s dreams and aspirations.',
    responsibilities = ARRAY[
        'Develop and execute creative video concepts that align with Qogent Learning Solutions'' needs and objectives',
        'Produce, shoot, and edit high-quality video content for various social media platforms, including YouTube, Instagram, Facebook, and LinkedIn',
        'Collaborate with our marketing team to ensure video content is aligned with our overall marketing strategy',
        'Leverage data and analytics to monitor the performance of video content, using insights to optimize and improve future content',
        'Stay informed about social media trends and technologies to ensure our video content remains fresh, engaging, and relevant',
        'Manage and organize video assets, including footage, audio, and graphics',
        'Ensure all video content adheres to legal and copyright requirements'
    ],
    requirements = ARRAY[
        'Proven experience in a similar role, with a portfolio showcasing strong skills in video production and editing',
        'Proficiency in video editing software (such as Adobe Premiere Pro, Final Cut Pro) and graphic design tools',
        'Strong understanding of social media platforms and their respective best practices for video content',
        'Ability to interpret analytics and apply insights to drive content optimization',
        'Excellent communication, collaboration, and project management skills',
        'Knowledge of copyright laws related to video production and usage',
        'Degree in Marketing, Digital Media, or a related field is preferred'
    ],
    posted_date = '2024-03-04',
    application_url = 'https://qogent.in/apply',
    is_active = true,
    updated_at = NOW()
WHERE title = 'Video Editor';

-- Update Digital Marketer position
UPDATE jobs 
SET 
    department = 'Marketing',
    location = 'Remote',
    type = 'Full-time',
    description = 'At Qogent, our Digital Marketers are the storytellers and strategists behind our brand, bringing the dream of studying abroad within reach through every post, video, and campaign. You''re not just creating content; you''re inspiring futures and engaging with the next generation of global leaders.',
    responsibilities = ARRAY[
        'Shoot and edit short-form videos for our social media channels - LinkedIn, Twitter, Instagram and YouTube',
        'Write persuasive and engaging marketing copy for LinkedIn and Twitter platforms',
        'Create presentations and take webinars on topics related to higher studies abroad',
        'Engage students on social media channels, run interactive and creative marketing campaigns, track performance metrics',
        'Partner with Sales Ops to set goals and track performance',
        'Create compelling content that connects customers with the value of the Qogent platforms and mobile apps'
    ],
    requirements = ARRAY[
        'Being comfortable talking in front of the camera and having a cheerful personality are a must',
        'Expertise in managing the social media channels and Email marketing tools',
        'A college degree related to digital marketing is a plus',
        'Highly energetic personality showing great interest and involvement with our active student community',
        'An understanding of how to run marketing campaigns on various social media platforms'
    ],
    benefits = ARRAY[
        'Having an active social media following on any of the platforms is a plus',
        'Previous experience with Sales or customer handling',
        'Experience with social media account with large number of followers',
        'An youtube channel with more than 1,000 subscribers'
    ],
    posted_date = '2024-03-04',
    application_url = 'https://qogent.in/apply',
    is_active = true,
    updated_at = NOW()
WHERE title = 'Digital Marketer';

-- Update Admissions Counsellor position
UPDATE jobs 
SET 
    department = 'Admissions',
    location = 'Hubli, Karnataka',
    type = 'Full-time',
    description = 'Guide students through their journey to international education as an Admissions Counsellor at Qogent. Ensure their applications shine and support them from onboarding to pre-departure, turning their study abroad dreams into reality.',
    posted_date = '2024-03-04',
    application_url = 'https://qogent.in/apply',
    is_active = true,
    updated_at = NOW()
WHERE title = 'Admissions Counsellor';

-- Update Operations Manager position
UPDATE jobs 
SET 
    department = 'Operations',
    location = 'Hubli, Karnataka',
    type = 'Full-time',
    description = 'Step into a role where leadership meets innovation. As Qogent''s Operations Manager, you''re the key to operational excellence, guiding our team to make education accessible and transforming challenges into opportunities for growth.',
    posted_date = '2024-03-04',
    application_url = 'https://qogent.in/apply',
    is_active = true,
    updated_at = NOW()
WHERE title = 'Operations Manager';

-- Update Academic Content Writer position
UPDATE jobs 
SET 
    department = 'Content',
    location = 'Remote',
    type = 'Full-time',
    description = 'Craft words that inspire and guide students'' academic journeys as an Academic Content Writer at Qogent. Shape futures through impactful writing, from SOPs to web content, in collaboration with a dynamic team.',
    posted_date = '2024-03-04',
    application_url = 'https://qogent.in/apply',
    is_active = true,
    updated_at = NOW()
WHERE title = 'Academic Content Writer';

-- Update Overseas Education Consultant position
UPDATE jobs 
SET 
    department = 'Consulting',
    location = 'Hubli, Karnataka',
    type = 'Full-time',
    description = 'Qogent uses an online sales model to boost interactions and reach more users daily, outperforming traditional consultancies. Minor optimizations significantly fuel our growth. We seek analytical thinkers who understand customer needs and are action-oriented, to drive revenue through targeted sales strategies.',
    posted_date = '2024-03-04',
    application_url = 'https://qogent.in/apply',
    is_active = true,
    updated_at = NOW()
WHERE title = 'Overseas Education Consultant'; 