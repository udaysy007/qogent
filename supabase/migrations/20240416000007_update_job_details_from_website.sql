-- Update Overseas Education Consultant position
UPDATE jobs 
SET 
    responsibilities = ARRAY[
        'Handle callbacks from the students and provide them the necessary consultation for higher studies abroad',
        'Manage a portfolio of applicants across the entire application journey, from enrolment to launch to getting admissions',
        'Monitor and optimize ongoing campaign performances',
        'Working with cross-functional teams across applications, marketing, operations and our business partners',
        'Acting as a leader and self-starter and taking responsibility of the website Sales'
    ],
    requirements = ARRAY[
        'Experience in making calls and writing persuasive Emails',
        'Excellent Spoken and Written English skills',
        'Have a proven track record of making consultation calls and converting leads into customers',
        'Strong analytical skills',
        'Strong working knowledge of the marketing and sales funnel and process',
        'Good understanding of acquisition, expansion & retention metrics and how to impact'
    ],
    nice_to_have = ARRAY[
        'Customer facing experience',
        'Experience with Study Abroad industry'
    ],
    description = 'At Qogent, our Overseas Education Consultants are the linchpin of our sales team, offering more than just packages and services; they deliver dreams. As a consultant with us, you''re not just selling; you''re guiding future global leaders. Your expertise and knowledge in every facet of studying abroad empower students to navigate their journey confidently. You''ll consult closely with each student, understanding their aspirations and challenges, and tailor our solutions to seamlessly align with their goals. Join us, and play a pivotal role in transforming aspirations into reality, helping students unlock doors to their study abroad dreams.',
    location = 'Hubli, Karnataka'
WHERE title = 'Overseas Education Consultant';

-- Update Admissions Counsellor position
UPDATE jobs 
SET 
    responsibilities = ARRAY[
        'Applying for Universities abroad on behalf of the student',
        'Compiling, verifying accuracy and sorting information provided by the student',
        'Understanding University Requirements clearly and updating our internal University-Course Database accordingly',
        'Provide end-to-end support for the student from onboarding till pre departure stages',
        'Handle all queries, concerns, follow-ups, e-mails, communication of the student'
    ],
    requirements = ARRAY[
        'Our ideal candidate has great eye for detail while working with student applications',
        'Good Computer proficiency',
        'Good Oral and written communication skills'
    ],
    nice_to_have = ARRAY[
        'Any previous work experience as an Admissions Counsellor in the study abroad industry'
    ],
    description = 'As an Admissions Counsellor at Qogent, you''re the navigator for students'' educational voyages, guiding them through the complexities of applying to universities abroad. Your role extends beyond mere application processing; you ensure that every document reflects the student''s potential and aspirations accurately. With a deep understanding of university requirements, you''ll update our extensive database, ensuring our advice is always current and relevant. From onboarding to pre-departure, you offer unwavering support, handling queries and communications with a personal touch. Join us to become a cornerstone in the journey of students as they step confidently towards their international educational goals, turning their study abroad dreams into reality.',
    location = 'Remote'
WHERE title = 'Admissions Counsellor';

-- Update Operations Manager position
UPDATE jobs 
SET 
    responsibilities = ARRAY[
        'Responsible for Planning, Organizing and Managing overall Business Operations of Qogent, of all platforms',
        'Oversee smooth and timely delivery of all Orders and Services',
        'Manage the team''s Productivity, Discipline and Performance',
        'Help direct reports prioritize and manage their work, including owning goals for key metrics like Customer Satisfaction',
        'Work closely with the Executive Management for implementation of projects and operational expansion plans',
        'Handle Customer Escalations and Effectively Resolve Issues',
        'Oversee Recruitment for Qogent - Screening, interviewing, testing and finalization of candidates',
        'Oversee Induction and Orientation of new employees'
    ],
    requirements = ARRAY[
        'More than 2 years of people management experience or 6+ months working at Qogent',
        'Impeccable customer skills: communication, empathy, integrity',
        'A passion for coaching and developing support talent',
        'A love of building teams and processes for long-lasting success'
    ],
    nice_to_have = ARRAY[
        'Experience of working in an Education Consultation Firm',
        'An educational degree related to Management'
    ],
    description = 'As the Operations Manager at Qogent, you''re the driving force behind our operational excellence and innovation. Your leadership ensures smooth operations, aligns with our goals, and fosters a culture of productivity and discipline. You turn challenges into opportunities, setting benchmarks for customer satisfaction and efficiency. Your vision for expansion shapes Qogent''s future, making education accessible for students worldwide.',
    location = 'Remote OR Hubli, Karnataka'
WHERE title = 'Operations Manager';

-- Update Academic Content Writer position
UPDATE jobs 
SET 
    responsibilities = ARRAY[
        'Prepare, review and edit Statements of Purpose, Letters of Recommendation and CV',
        'Prepare Technical Essays on a given topic related to student''s masters studies',
        'Write and edit search-optimized content for Qogent and our other web platforms',
        'Work cross-functionally with SEO, web, product marketing, and design teams to brainstorm and prioritize content ideas—and bring them to life',
        'Interview subject matter experts and conduct research to develop relevant and useful content',
        'Improve and optimize existing content based on relevant search performance metrics',
        'Become familiar with the Qogent story, voice, and tone to create content that is on brand and on message'
    ],
    requirements = ARRAY[
        'At least 1 year of experience in a content writing, content marketing, or marketing communications role',
        'Exceptional writing and editing skills, with demonstrated success creating compelling content that is tailored to goals and audience',
        'Familiarity with SEO best practices and how to implement them with attention to balancing brand and messaging priorities',
        'Ability to write content that reflects established voice and tone guidelines',
        'Self-starter with excellent organizational skills, attention to detail, and the ability to drive content projects from start to finish'
    ],
    nice_to_have = ARRAY[
        'Familiarity working in a CMS and/or publishing content to the web',
        'Previous experience in writing Academic Essay, SOP and LOR for studying abroad'
    ],
    description = 'As an Academic Content Writer at Qogent, you''re at the heart of our mission to empower students. Your role involves creating impactful Statements of Purpose, Letters of Recommendation, and technical essays, alongside search-optimized content for our platforms. Collaborate with our SEO, web, and marketing teams to bring content ideas to life. Through expert interviews and research, you''ll produce relevant, brand-aligned content, enhancing our digital presence and optimizing performance to guide students towards their academic dreams.',
    location = 'Remote'
WHERE title = 'Academic Content Writer'; 