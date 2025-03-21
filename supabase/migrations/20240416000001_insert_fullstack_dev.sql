-- Update Full Stack Developer position
UPDATE jobs 
SET 
    department = 'Engineering',
    location = 'Hubli, Karnataka',
    type = 'Full-time',
    description = 'At Qogent, our Full Stack Web Developers are the technical backbone of our operation, driving the innovation that enhances our platform. In this role, you are not just coding; you are architecting the digital pathways for future scholars. Your expertise in both front-end and back-end development, combined with your problem-solving skills, positions you as a pivotal figure in expanding our digital footprint. Through cutting-edge technology and agile development practices, you will not only meet project deadlines but also pioneer new solutions, propelling our mission to make global education accessible. Join us to become a key component of a team that''s redefining the landscape of study abroad consultancy, turning technological potential into educational success.',
    responsibilities = ARRAY[
        'Design, develop, and maintain full stack web applications to enhance the efficiency and effectiveness of our study abroad consultancy services',
        'Write and optimize scripts for connecting various APIs to streamline operations and improve data interchange between systems',
        'Implement and manage cloud-based solutions, utilizing Google Cloud Functions or Amazon AWS, to ensure scalable and secure application deployment',
        'Develop and maintain local server environments to support continuous development and testing phases',
        'Stay current with the latest advancements in AI and incorporate these technologies, such as OpenAI APIs, to enhance application functionalities and user experiences',
        'Operate with a high degree of autonomy, driving projects from conception to deployment with minimal supervision'
    ],
    requirements = ARRAY[
        'Minimum of five years of experience in full stack development, with a strong portfolio of projects that demonstrate expertise in both front-end and back-end technologies',
        'Proficient in scripting and API integrations, with a solid understanding of RESTful services and external data sources',
        'Expertise in cloud services platforms like Google Cloud or AWS, with experience in setting up and managing cloud functions and serverless architecture',
        'Knowledgeable in the latest AI technologies and their application in web development, specifically with experience in integrating OpenAI APIs',
        'Capable of working independently, with a problem-solving mindset and a track record of delivering effective solutions without extensive oversight',
        'Bachelor''s degree in Computer Science, Engineering, or a related field is preferred'
    ],
    posted_date = '2024-04-12',
    application_url = 'https://qogent.in/apply',
    is_active = true,
    updated_at = NOW()
WHERE title = 'Full Stack Developer'; 