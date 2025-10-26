// Comprehensive UNF Majors and Opportunities Database
// All majors offered at University of North Florida with hundreds of opportunities per major

const UNF_MAJORS = {
    // Coggin College of Business
    'accounting': 'Accounting',
    'finance': 'Finance',
    'economics': 'Economics', 
    'international-business': 'International Business',
    'management': 'Management',
    'marketing': 'Marketing',
    'logistics': 'Transportation & Logistics',
    'business-analytics': 'Business Analytics',
    'entrepreneurship': 'Entrepreneurship',
    'real-estate': 'Real Estate',
    
    // College of Computing, Engineering & Construction
    'computer-science': 'Computer Science',
    'information-systems': 'Information Systems',
    'information-technology': 'Information Technology',
    'data-science': 'Data Science',
    'cybersecurity': 'Cybersecurity',
    'civil-engineering': 'Civil Engineering',
    'electrical-engineering': 'Electrical Engineering',
    'mechanical-engineering': 'Mechanical Engineering',
    'construction-management': 'Construction Management',
    'building-construction': 'Building Construction',
    
    // Brooks College of Health
    'nursing': 'Nursing',
    'public-health': 'Public Health',
    'health-administration': 'Health Administration',
    'nutrition': 'Nutrition & Dietetics',
    'exercise-science': 'Exercise Science',
    'athletic-training': 'Athletic Training',
    'physical-therapy': 'Physical Therapy',
    'mental-health-counseling': 'Mental Health Counseling',
    'clinical-mental-health': 'Clinical Mental Health',
    'health-science': 'Health Science',
    
    // College of Education & Human Services
    'elementary-education': 'Elementary Education',
    'secondary-education': 'Secondary Education',
    'special-education': 'Special Education',
    'educational-leadership': 'Educational Leadership',
    'sport-management': 'Sport Management',
    'counseling': 'Counseling',
    'deaf-education': 'Deaf Education',
    
    // College of Arts & Sciences
    'biology': 'Biology',
    'chemistry': 'Chemistry',
    'physics': 'Physics',
    'mathematics': 'Mathematics',
    'statistics': 'Statistics',
    'psychology': 'Psychology',
    'sociology': 'Sociology',
    'anthropology': 'Anthropology',
    'political-science': 'Political Science',
    'criminal-justice': 'Criminal Justice',
    'english': 'English',
    'spanish': 'Spanish',
    'french': 'French',
    'history': 'History',
    'philosophy': 'Philosophy',
    'art': 'Art',
    'graphic-design': 'Graphic Design & Digital Media',
    'music': 'Music',
    'music-performance': 'Music Performance',
    'music-education': 'Music Education',
    'theater': 'Theater',
    'communication': 'Communication',
    'journalism': 'Journalism',
    'public-relations': 'Public Relations',
    'multimedia-journalism': 'Multimedia Journalism',
    'international-studies': 'International Studies',
    'environmental-science': 'Environmental Science',
    'coastal-biology': 'Coastal Biology',
    'marine-science': 'Marine Science'
};

// Helper function to generate random coordinates near Jacksonville
function generateRandomCoordinates() {
    const baseCoords = [
        { lat: 30.2568, lng: -81.6113 }, // Southside
        { lat: 30.2987, lng: -81.8234 }, // Westside
        { lat: 30.2845, lng: -81.4287 }, // Beaches
        { lat: 30.3322, lng: -81.6557 }, // Downtown
        { lat: 30.3214, lng: -81.6681 }, // Riverside
        { lat: 30.3859, lng: -81.7098 }, // Arlington
        { lat: 30.2672, lng: -81.5114 }, // Near UNF
        { lat: 30.4127, lng: -81.6589 }, // Northside
        { lat: 30.1907, lng: -81.5677 }, // Mandarin
        { lat: 30.3501, lng: -81.5441 }  // Town Center
    ];
    
    const base = baseCoords[Math.floor(Math.random() * baseCoords.length)];
    return {
        lat: base.lat + (Math.random() - 0.5) * 0.05,
        lng: base.lng + (Math.random() - 0.5) * 0.05
    };
}

// Company lists by industry
const COMPANIES = {
    technology: [
        'Tech Solutions Jacksonville', 'FIS Global', 'Black Knight', 'Fanatics', 'RF-SMART',
        'Web.com', 'CSX Technology', 'Florida Blue IT', 'Availity', 'PS27 Ventures',
        'Bold City Agency', 'Digital Mark', 'Brunet-García', 'Mad Mobile', 'Folio Weekly Digital',
        'DataSciJax', 'Cloud Nine Solutions', 'Riverside Tech Hub', 'Beach Code Studios',
        'Jacksonville Innovate', 'First Coast Apps', 'River City Programming', 'Neptune Beach Tech',
        'Atlantic Digital', 'Ponte Vedra Software', 'San Marco Systems', 'Mandarin Tech Group'
    ],
    healthcare: [
        'Mayo Clinic', 'Baptist Health', 'UF Health Jacksonville', 'Ascension St. Vincent\'s',
        'Memorial Hospital', 'Brooks Rehabilitation', 'River Garden', 'Community Hospice',
        'Jacksonville Medical Center', 'Orange Park Medical', 'Flagler Hospital', 'Wolfson Children\'s',
        'Jacksonville Orthopedic Institute', 'First Coast Heart', 'Jacksonville Neuroscience',
        'Beaches Family Medical', 'Premier Medical Group', 'North Florida Surgeons',
        'Jacksonville Cardiology', 'First Coast Oncology', 'Riverside Healthcare', 'Southside Medical'
    ],
    finance: [
        'Bank of America', 'Wells Fargo', 'TIAA', 'Fidelity National', 'Ameris Bank',
        'VyStar Credit Union', 'Community First Credit Union', 'NEFCU', 'Regions Bank',
        'PNC Bank', 'TD Bank', 'BB&T/Truist', 'SunTrust', 'First Florida Credit Union',
        'Jacksonville Financial Planning', 'Riverside Wealth Management', 'Beach Investments',
        'First Coast Financial Advisors', 'Jacksonville Capital', 'Atlantic Coast Investments'
    ],
    engineering: [
        'Reynolds Smith & Hills', 'Haskell', 'RS&H', 'Prosser', 'ETM', 'England-Thims & Miller',
        'Matthews Design Group', 'Jones Edmunds', 'Terracon', 'Universal Engineering Sciences',
        'Mittauer & Associates', 'American Consulting Engineers', 'Pond & Company', 'Kimley-Horn',
        'AECOM', 'Jacobs Engineering', 'CH2M Hill', 'Black & Veatch', 'Burns & McDonnell'
    ],
    education: [
        'Duval County Public Schools', 'St. Johns County Schools', 'Clay County Schools',
        'Nassau County Schools', 'Baker County Schools', 'Episcopal School', 'Bolles School',
        'Bishop Kenny High School', 'Providence School', 'Jacksonville Country Day School',
        'University of North Florida', 'Jacksonville University', 'Florida State College',
        'Edward Waters University', 'Trinity Baptist College', 'First Coast Technical College'
    ],
    business: [
        'CSX Transportation', 'Crowley Maritime', 'Gate Petroleum', 'Southeastern Grocers',
        'Web.com', 'Landstar System', 'Patriot Transportation', 'Stein Mart', 'Rayonier',
        'Regency Centers', 'Atlantic Coast Financial', 'APR Energy', 'Suddath', 'Ring Power',
        'Miller Electric', 'Beaver Street Fisheries', 'Swisher International', 'Vistakon'
    ],
    retail: [
        'Amazon Fulfillment Center', 'Target', 'Walmart', 'Publix', 'Winn-Dixie',
        'Home Depot', 'Lowe\'s', 'Best Buy', 'Dick\'s Sporting Goods', 'Nordstrom',
        'Macy\'s', 'Dillard\'s', 'TJ Maxx', 'Ross', 'Burlington', 'Costco', 'Sam\'s Club',
        'Whole Foods', 'Trader Joe\'s', 'Fresh Market', 'Earth Fare', 'Native Sun'
    ],
    hospitality: [
        'Omni Jacksonville Hotel', 'Hyatt Regency', 'DoubleTree', 'Hampton Inn', 'Marriott',
        'Sawgrass Marriott', 'Ponte Vedra Inn & Club', 'Amelia Island Resort', 'One Ocean Resort',
        'Hotel Palms', 'Aloft Jacksonville', 'Fairfield Inn', 'Courtyard Marriott',
        'Jacksonville Beach Hotels', 'Neptune Beach Resort', 'Atlantic Beach Country Club'
    ],
    government: [
        'City of Jacksonville', 'Naval Air Station Jacksonville', 'Jacksonville Sheriff\'s Office',
        'Jacksonville Fire and Rescue', 'JEA', 'Jacksonville Port Authority', 'Jacksonville Aviation Authority',
        'St. Johns River Water Management', 'Florida Department of Transportation', 'Duval County Clerk',
        'Jacksonville Housing Authority', 'Jacksonville Transportation Authority', 'Florida Fish and Wildlife'
    ],
    nonprofit: [
        'United Way of Northeast Florida', 'Community Foundation', 'Jacksonville Humane Society',
        'Habitat for Humanity', 'Feeding Northeast Florida', 'Boys & Girls Clubs', 'YMCA',
        'Girl Scouts Gateway', 'Big Brothers Big Sisters', 'Ronald McDonald House',
        'Clara White Mission', 'Salvation Army', 'Catholic Charities', 'Lutheran Social Services',
        'Jewish Family & Community Services', 'Dreams Come True', 'Pine Castle', 'ARC Jacksonville'
    ],
    media: [
        'Florida Times-Union', 'Jacksonville Business Journal', 'News4JAX', 'First Coast News',
        'Action News Jax', 'Folio Weekly', 'Jacksonville Magazine', 'Void Magazine',
        'Cox Media Group', 'iHeartMedia Jacksonville', 'Jacksonville Daily Record', 'WJCT Public Media'
    ],
    arts: [
        'Jacksonville Symphony', 'Museum of Contemporary Art', 'Cummer Museum', 'MOCA Jacksonville',
        'Players by the Sea', 'Theatre Jacksonville', 'Alhambra Theatre', 'Florida Theatre',
        'Jacksonville Dance Theatre', 'Douglas Anderson School of Arts', 'Cultural Council',
        'Art Republic', 'Riverside Arts Market', 'Bold City Contemporary', 'Yellow House'
    ],
    environmental: [
        'Jacksonville Zoo and Gardens', 'St. Johns Riverkeeper', 'Timucuan Parks Foundation',
        'North Florida Land Trust', 'Greenscape Jacksonville', 'Keep Jacksonville Beautiful',
        'Sierra Club Northeast Florida', 'Florida Wildlife Corridor', 'Beaches Energy Services',
        'Environmental Protection Board', 'JEA Environmental Services', 'Advanced Disposal'
    ],
    sports: [
        'Jacksonville Jaguars', 'Jacksonville Jumbo Shrimp', 'Jacksonville Icemen', 'Jacksonville Giants',
        'Jacksonville Armada', 'TPC Sawgrass', 'World Golf Village', 'PGA Tour Headquarters',
        'Daily\'s Place', 'VyStar Veterans Arena', 'Jacksonville Sports Council', 'Bold Events'
    ],
    legal: [
        'Smith Hulsey & Busey', 'Foley & Lardner', 'Rogers Towers', 'Driver McAfee', 'Holland & Knight',
        'Fisher Phillips', 'Milam Howard', 'Bedell Firm', 'Morgan & Morgan', 'Farah & Farah',
        'State Attorney\'s Office', 'Public Defender\'s Office', 'Jacksonville Area Legal Aid'
    ],
    manufacturing: [
        'Johnson & Johnson Vision', 'Anheuser-Busch', 'International Paper', 'WestRock',
        'Vulcan Materials', 'CEMEX', 'Ring Power', 'Coastal Steel', 'Maxwell House',
        'Blue Bell Creameries', 'Bacardi Bottling', 'Hubbard Construction', 'Gate Precast'
    ],
    logistics: [
        'JAXPORT', 'Crowley Maritime', 'TOTE Maritime', 'Trailer Bridge', 'CSX Transportation',
        'Norfolk Southern', 'FedEx', 'UPS', 'Amazon Logistics', 'XPO Logistics', 'J.B. Hunt',
        'Landstar', 'C.H. Robinson', 'Total Quality Logistics', 'Southeastern Freight Lines'
    ],
    real_estate: [
        'Berkshire Hathaway HomeServices', 'Watson Realty', 'Coldwell Banker', 'Keller Williams',
        'RE/MAX', 'Century 21', 'EXIT Realty', 'First Coast Sotheby\'s', 'Ponte Vedra Club Realty',
        'Jacksonville Beach Realty', 'Beaches Real Estate', 'St. Johns Realty', 'Florida Homes Realty'
    ]
};

// Generate comprehensive opportunities
function generateOpportunities() {
    let opportunities = [];
    let opportunityId = 1;
    
    // Job types distribution
    const jobTypes = {
        'internship': 0.35,
        'entry-level': 0.40,
        'experienced': 0.15,
        'part-time': 0.10
    };
    
    // Salary ranges by type
    const salaryRanges = {
        'internship': ['$15-20/hour', '$18-22/hour', '$20-25/hour', '$22-28/hour', '$25-30/hour'],
        'entry-level': ['$40,000-50,000/year', '$45,000-55,000/year', '$50,000-60,000/year', '$55,000-65,000/year', '$60,000-70,000/year'],
        'experienced': ['$70,000-85,000/year', '$80,000-95,000/year', '$90,000-110,000/year', '$100,000-120,000/year'],
        'part-time': ['$12-15/hour', '$15-18/hour', '$18-22/hour', '$20-25/hour']
    };
    
    // Generate opportunities for each major
    Object.entries(UNF_MAJORS).forEach(([majorKey, majorName]) => {
        // Create 100-150 opportunities per major
        const numOpportunities = Math.floor(Math.random() * 50) + 100;
        
        for (let i = 0; i < numOpportunities; i++) {
            const jobType = getWeightedRandom(jobTypes);
            const opportunity = generateOpportunityByMajor(opportunityId++, majorKey, majorName, jobType, salaryRanges[jobType]);
            opportunities.push(opportunity);
        }
    });
    
    return opportunities;
}

// Helper function to get weighted random selection
function getWeightedRandom(weights) {
    const random = Math.random();
    let sum = 0;
    for (const [key, weight] of Object.entries(weights)) {
        sum += weight;
        if (random < sum) return key;
    }
    return Object.keys(weights)[0];
}

// Generate specific opportunity based on major
function generateOpportunityByMajor(id, majorKey, majorName, jobType, salaryOptions) {
    const coords = generateRandomCoordinates();
    const salary = salaryOptions[Math.floor(Math.random() * salaryOptions.length)];
    const postedDays = Math.floor(Math.random() * 30) + 1;
    const posted = postedDays === 1 ? '1 day ago' : `${postedDays} days ago`;
    
    // Major-specific opportunity generation
    const opportunityTemplates = getOpportunityTemplates(majorKey, jobType);
    const template = opportunityTemplates[Math.floor(Math.random() * opportunityTemplates.length)];
    
    // Select appropriate company based on major
    const companyPool = getCompanyPoolByMajor(majorKey);
    const company = companyPool[Math.floor(Math.random() * companyPool.length)];
    
    // Generate random Jacksonville address
    const addresses = [
        '9000 Southside Blvd, Jacksonville, FL 32256',
        '9800 Fredericksburg Rd, Jacksonville, FL 32221',
        '12620 Beach Blvd, Jacksonville, FL 32246',
        '1 Independent Dr, Jacksonville, FL 32202',
        '601 Riverside Ave, Jacksonville, FL 32204',
        '500 Water St, Jacksonville, FL 32202',
        '4500 San Pablo Rd, Jacksonville, FL 32224',
        '8800 University Pkwy, Jacksonville, FL 32211',
        '1301 Riverplace Blvd, Jacksonville, FL 32207',
        '10950 San Jose Blvd, Jacksonville, FL 32223',
        '14286 Beach Blvd, Jacksonville, FL 32250',
        '2 Prudential Dr, Jacksonville, FL 32207',
        '841 Prudential Dr, Jacksonville, FL 32207',
        '11901 Central Pkwy, Jacksonville, FL 32224',
        '3890 Dunn Ave, Jacksonville, FL 32218'
    ];
    
    const location = addresses[Math.floor(Math.random() * addresses.length)];
    
    return {
        id,
        title: template.title,
        company,
        location,
        coordinates: coords,
        type: jobType,
        major: majorKey,
        description: template.description,
        detailedDescription: template.detailedDescription,
        tags: template.tags,
        requirements: template.requirements,
        responsibilities: template.responsibilities,
        benefits: generateBenefits(jobType),
        salary,
        posted,
        url: `https://careers.${company.toLowerCase().replace(/\s+/g, '')}.com/${template.title.toLowerCase().replace(/\s+/g, '-')}`,
        companySize: getCompanySize(),
        companyIndustry: template.industry,
        workEnvironment: getWorkEnvironment(jobType),
        duration: getDuration(jobType)
    };
}

// Get opportunity templates based on major
function getOpportunityTemplates(majorKey, jobType) {
    const templates = {
        'computer-science': [
            {
                title: jobType === 'internship' ? 'Software Engineering Intern' : 'Software Developer',
                description: 'Develop cutting-edge software applications using modern technologies',
                detailedDescription: 'Work with our engineering team to build scalable web and mobile applications using React, Node.js, and cloud technologies.',
                tags: ['JavaScript', 'React', 'Node.js', 'AWS', 'Git'],
                requirements: ['CS degree or in progress', 'Programming experience', 'Problem-solving skills'],
                responsibilities: ['Write clean code', 'Debug applications', 'Collaborate with team'],
                industry: 'Technology'
            },
            {
                title: jobType === 'internship' ? 'Full Stack Developer Intern' : 'Full Stack Engineer',
                description: 'Build end-to-end web applications from frontend to backend',
                detailedDescription: 'Create responsive web applications using modern frameworks and cloud services.',
                tags: ['Python', 'Django', 'React', 'PostgreSQL', 'Docker'],
                requirements: ['Web development knowledge', 'Database experience', 'API development'],
                responsibilities: ['Design APIs', 'Build UI components', 'Optimize performance'],
                industry: 'Technology'
            },
            {
                title: jobType === 'internship' ? 'Mobile App Development Intern' : 'Mobile Developer',
                description: 'Create innovative mobile applications for iOS and Android platforms',
                detailedDescription: 'Develop native and cross-platform mobile apps using Swift, Kotlin, and React Native.',
                tags: ['React Native', 'Swift', 'Kotlin', 'Firebase', 'Mobile UI'],
                requirements: ['Mobile development experience', 'UI/UX understanding', 'App store knowledge'],
                responsibilities: ['Build mobile features', 'Test on devices', 'Deploy to app stores'],
                industry: 'Technology'
            },
            {
                title: jobType === 'internship' ? 'DevOps Intern' : 'DevOps Engineer',
                description: 'Manage cloud infrastructure and deployment pipelines',
                detailedDescription: 'Implement CI/CD pipelines, manage AWS infrastructure, and ensure system reliability.',
                tags: ['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Terraform'],
                requirements: ['Cloud platform knowledge', 'Scripting skills', 'Linux experience'],
                responsibilities: ['Automate deployments', 'Monitor systems', 'Manage infrastructure'],
                industry: 'Technology'
            },
            {
                title: jobType === 'internship' ? 'QA Engineering Intern' : 'QA Engineer',
                description: 'Ensure software quality through comprehensive testing',
                detailedDescription: 'Design and execute test plans, automate testing processes, and maintain quality standards.',
                tags: ['Selenium', 'Jest', 'Cypress', 'Test Automation', 'JIRA'],
                requirements: ['Testing knowledge', 'Attention to detail', 'Automation experience'],
                responsibilities: ['Write test cases', 'Automate tests', 'Report bugs'],
                industry: 'Technology'
            }
        ],
        'data-science': [
            {
                title: jobType === 'internship' ? 'Data Science Intern' : 'Data Scientist',
                description: 'Analyze complex datasets and build predictive models',
                detailedDescription: 'Use machine learning and statistical analysis to extract insights from data.',
                tags: ['Python', 'R', 'Machine Learning', 'SQL', 'Tableau'],
                requirements: ['Statistics knowledge', 'Programming skills', 'ML understanding'],
                responsibilities: ['Build models', 'Analyze data', 'Create visualizations'],
                industry: 'Technology'
            },
            {
                title: jobType === 'internship' ? 'Data Analytics Intern' : 'Data Analyst',
                description: 'Transform data into actionable business insights',
                detailedDescription: 'Analyze business data, create reports, and support data-driven decision making.',
                tags: ['SQL', 'Excel', 'Power BI', 'Python', 'Statistics'],
                requirements: ['SQL proficiency', 'Analytics tools', 'Business acumen'],
                responsibilities: ['Generate reports', 'Analyze trends', 'Present findings'],
                industry: 'Business Intelligence'
            },
            {
                title: jobType === 'internship' ? 'Machine Learning Intern' : 'ML Engineer',
                description: 'Develop and deploy machine learning models',
                detailedDescription: 'Build, train, and deploy ML models for production environments.',
                tags: ['TensorFlow', 'PyTorch', 'scikit-learn', 'MLOps', 'Deep Learning'],
                requirements: ['ML frameworks', 'Math background', 'Programming skills'],
                responsibilities: ['Train models', 'Deploy to production', 'Monitor performance'],
                industry: 'Artificial Intelligence'
            }
        ],
        'cybersecurity': [
            {
                title: jobType === 'internship' ? 'Cybersecurity Intern' : 'Security Analyst',
                description: 'Protect organizational assets from cyber threats',
                detailedDescription: 'Monitor security events, respond to incidents, and maintain security controls.',
                tags: ['SIEM', 'Network Security', 'Incident Response', 'Compliance'],
                requirements: ['Security knowledge', 'Networking', 'Security tools'],
                responsibilities: ['Monitor alerts', 'Investigate incidents', 'Document procedures'],
                industry: 'Information Security'
            },
            {
                title: jobType === 'internship' ? 'SOC Analyst Intern' : 'SOC Analyst',
                description: 'Monitor and respond to security events in real-time',
                detailedDescription: 'Work in Security Operations Center to detect and respond to threats.',
                tags: ['Splunk', 'Wireshark', 'IDS/IPS', 'Forensics', 'SOAR'],
                requirements: ['Security monitoring', 'Log analysis', 'Incident handling'],
                responsibilities: ['Monitor SIEM', 'Triage alerts', 'Escalate incidents'],
                industry: 'Information Security'
            },
            {
                title: jobType === 'internship' ? 'Penetration Testing Intern' : 'Penetration Tester',
                description: 'Identify vulnerabilities through ethical hacking',
                detailedDescription: 'Conduct security assessments and penetration tests on applications and networks.',
                tags: ['Kali Linux', 'Metasploit', 'Burp Suite', 'OWASP', 'Python'],
                requirements: ['Ethical hacking', 'Security tools', 'Scripting skills'],
                responsibilities: ['Conduct pen tests', 'Write reports', 'Recommend fixes'],
                industry: 'Information Security'
            }
        ],
        'nursing': [
            {
                title: jobType === 'internship' ? 'Nursing Student Extern' : 'Registered Nurse',
                description: 'Provide compassionate patient care in healthcare settings',
                detailedDescription: 'Deliver quality nursing care, assess patient needs, and collaborate with healthcare teams.',
                tags: ['Patient Care', 'Clinical Skills', 'EMR', 'Medication Administration'],
                requirements: ['Nursing degree/enrollment', 'Clinical experience', 'BLS certification'],
                responsibilities: ['Assess patients', 'Administer medications', 'Document care'],
                industry: 'Healthcare'
            },
            {
                title: jobType === 'internship' ? 'ICU Nursing Intern' : 'Critical Care Nurse',
                description: 'Provide specialized care for critically ill patients',
                detailedDescription: 'Work in intensive care units managing complex patient conditions.',
                tags: ['Critical Care', 'Ventilator Management', 'ACLS', 'Hemodynamic Monitoring'],
                requirements: ['ICU experience', 'ACLS certification', 'Critical thinking'],
                responsibilities: ['Monitor vital signs', 'Manage equipment', 'Family education'],
                industry: 'Healthcare'
            },
            {
                title: jobType === 'internship' ? 'Pediatric Nursing Intern' : 'Pediatric Nurse',
                description: 'Care for infants, children, and adolescents',
                detailedDescription: 'Provide age-appropriate nursing care in pediatric settings.',
                tags: ['Pediatrics', 'Family Care', 'Developmental Assessment', 'PALS'],
                requirements: ['Pediatric interest', 'PALS certification', 'Communication skills'],
                responsibilities: ['Pediatric assessments', 'Family teaching', 'Growth monitoring'],
                industry: 'Healthcare'
            }
        ],
        'business': [
            {
                title: jobType === 'internship' ? 'Business Analyst Intern' : 'Business Analyst',
                description: 'Bridge the gap between business needs and technical solutions',
                detailedDescription: 'Analyze business processes, gather requirements, and recommend improvements.',
                tags: ['Requirements Gathering', 'Process Mapping', 'SQL', 'Agile', 'JIRA'],
                requirements: ['Business degree', 'Analytical skills', 'Communication'],
                responsibilities: ['Gather requirements', 'Document processes', 'Support projects'],
                industry: 'Business Services'
            },
            {
                title: jobType === 'internship' ? 'Management Trainee' : 'Operations Manager',
                description: 'Learn all aspects of business operations and management',
                detailedDescription: 'Rotate through departments to gain comprehensive business knowledge.',
                tags: ['Operations', 'Leadership', 'Project Management', 'Strategy'],
                requirements: ['Business degree', 'Leadership potential', 'Problem-solving'],
                responsibilities: ['Manage teams', 'Improve processes', 'Meet targets'],
                industry: 'Management'
            },
            {
                title: jobType === 'internship' ? 'Supply Chain Intern' : 'Supply Chain Analyst',
                description: 'Optimize supply chain operations and logistics',
                detailedDescription: 'Analyze supply chain data, improve efficiency, and reduce costs.',
                tags: ['Supply Chain', 'Logistics', 'SAP', 'Excel', 'Analytics'],
                requirements: ['Supply chain knowledge', 'Data analysis', 'Excel skills'],
                responsibilities: ['Analyze inventory', 'Track shipments', 'Optimize routes'],
                industry: 'Logistics'
            }
        ],
        'marketing': [
            {
                title: jobType === 'internship' ? 'Digital Marketing Intern' : 'Digital Marketing Specialist',
                description: 'Execute digital marketing campaigns across multiple channels',
                detailedDescription: 'Manage social media, email marketing, and paid advertising campaigns.',
                tags: ['Social Media', 'Google Ads', 'SEO', 'Content Marketing', 'Analytics'],
                requirements: ['Marketing knowledge', 'Social media skills', 'Creative thinking'],
                responsibilities: ['Create content', 'Manage campaigns', 'Analyze metrics'],
                industry: 'Marketing'
            },
            {
                title: jobType === 'internship' ? 'Content Marketing Intern' : 'Content Marketing Manager',
                description: 'Create engaging content to drive brand awareness',
                detailedDescription: 'Develop content strategy, write blog posts, and manage content calendar.',
                tags: ['Content Creation', 'SEO', 'Copywriting', 'WordPress', 'Strategy'],
                requirements: ['Writing skills', 'SEO knowledge', 'Creativity'],
                responsibilities: ['Write content', 'Manage blog', 'Track performance'],
                industry: 'Marketing'
            },
            {
                title: jobType === 'internship' ? 'Brand Marketing Intern' : 'Brand Manager',
                description: 'Build and maintain brand identity and positioning',
                detailedDescription: 'Develop brand strategies, manage campaigns, and ensure brand consistency.',
                tags: ['Branding', 'Campaign Management', 'Market Research', 'Creative Direction'],
                requirements: ['Brand understanding', 'Strategic thinking', 'Communication'],
                responsibilities: ['Develop strategies', 'Manage guidelines', 'Lead campaigns'],
                industry: 'Marketing'
            }
        ],
        'finance': [
            {
                title: jobType === 'internship' ? 'Financial Analyst Intern' : 'Financial Analyst',
                description: 'Analyze financial data and support decision-making',
                detailedDescription: 'Create financial models, prepare reports, and provide insights.',
                tags: ['Financial Modeling', 'Excel', 'Financial Analysis', 'Forecasting'],
                requirements: ['Finance degree', 'Excel proficiency', 'Analytical skills'],
                responsibilities: ['Build models', 'Analyze statements', 'Prepare reports'],
                industry: 'Finance'
            },
            {
                title: jobType === 'internship' ? 'Investment Banking Intern' : 'Investment Analyst',
                description: 'Support investment decisions and portfolio management',
                detailedDescription: 'Research investments, analyze markets, and support transactions.',
                tags: ['Valuation', 'M&A', 'Capital Markets', 'Financial Modeling', 'Bloomberg'],
                requirements: ['Finance knowledge', 'Modeling skills', 'Market understanding'],
                responsibilities: ['Research companies', 'Build models', 'Create presentations'],
                industry: 'Investment Banking'
            },
            {
                title: jobType === 'internship' ? 'Tax Intern' : 'Tax Associate',
                description: 'Prepare and review tax returns and provide tax planning',
                detailedDescription: 'Work with individual and corporate tax returns, research tax issues.',
                tags: ['Tax Preparation', 'Tax Law', 'QuickBooks', 'Excel', 'Compliance'],
                requirements: ['Accounting knowledge', 'Tax understanding', 'Detail-oriented'],
                responsibilities: ['Prepare returns', 'Research issues', 'Client communication'],
                industry: 'Accounting'
            }
        ],
        'engineering': [
            {
                title: jobType === 'internship' ? 'Civil Engineering Intern' : 'Civil Engineer',
                description: 'Design and oversee infrastructure projects',
                detailedDescription: 'Work on roads, bridges, buildings, and other infrastructure projects.',
                tags: ['AutoCAD', 'Civil 3D', 'Project Management', 'Structural Design'],
                requirements: ['Civil engineering degree', 'CAD skills', 'Math skills'],
                responsibilities: ['Create designs', 'Review plans', 'Site inspections'],
                industry: 'Engineering'
            },
            {
                title: jobType === 'internship' ? 'Mechanical Engineering Intern' : 'Mechanical Engineer',
                description: 'Design and develop mechanical systems and products',
                detailedDescription: 'Create mechanical designs, perform analysis, and oversee manufacturing.',
                tags: ['SolidWorks', 'FEA', 'Product Design', 'Manufacturing', 'CAD'],
                requirements: ['ME degree', 'CAD proficiency', 'Problem-solving'],
                responsibilities: ['Design products', 'Run simulations', 'Test prototypes'],
                industry: 'Engineering'
            },
            {
                title: jobType === 'internship' ? 'Electrical Engineering Intern' : 'Electrical Engineer',
                description: 'Design electrical systems and components',
                detailedDescription: 'Work on electrical systems, circuit design, and power distribution.',
                tags: ['Circuit Design', 'PLC', 'Power Systems', 'MATLAB', 'Controls'],
                requirements: ['EE degree', 'Circuit knowledge', 'Programming skills'],
                responsibilities: ['Design circuits', 'Test systems', 'Troubleshoot issues'],
                industry: 'Engineering'
            }
        ],
        'education': [
            {
                title: jobType === 'internship' ? 'Teaching Intern' : 'Elementary Teacher',
                description: 'Educate and inspire young learners',
                detailedDescription: 'Create lesson plans, manage classrooms, and support student development.',
                tags: ['Lesson Planning', 'Classroom Management', 'Curriculum', 'Assessment'],
                requirements: ['Education degree', 'Teaching cert', 'Patience'],
                responsibilities: ['Teach lessons', 'Grade work', 'Parent communication'],
                industry: 'Education'
            },
            {
                title: jobType === 'internship' ? 'Special Education Aide' : 'Special Education Teacher',
                description: 'Support students with special needs',
                detailedDescription: 'Provide individualized instruction and support for students with disabilities.',
                tags: ['IEP', 'Differentiated Instruction', 'Behavioral Support', 'Inclusion'],
                requirements: ['Special ed knowledge', 'Patience', 'Adaptability'],
                responsibilities: ['Implement IEPs', 'Adapt materials', 'Collaborate with team'],
                industry: 'Education'
            },
            {
                title: jobType === 'internship' ? 'Curriculum Development Intern' : 'Curriculum Specialist',
                description: 'Design and improve educational programs',
                detailedDescription: 'Develop curriculum materials, align with standards, and support teachers.',
                tags: ['Curriculum Design', 'Standards Alignment', 'Assessment', 'Training'],
                requirements: ['Education background', 'Curriculum knowledge', 'Writing skills'],
                responsibilities: ['Design curriculum', 'Train teachers', 'Evaluate programs'],
                industry: 'Education'
            }
        ],
        'psychology': [
            {
                title: jobType === 'internship' ? 'Psychology Research Assistant' : 'Behavioral Health Specialist',
                description: 'Support mental health services and research',
                detailedDescription: 'Assist with therapy sessions, conduct assessments, and support research.',
                tags: ['Mental Health', 'Assessment', 'Research', 'Counseling', 'Data Analysis'],
                requirements: ['Psychology degree', 'Research skills', 'Empathy'],
                responsibilities: ['Conduct assessments', 'Support therapy', 'Collect data'],
                industry: 'Healthcare'
            },
            {
                title: jobType === 'internship' ? 'HR Psychology Intern' : 'Organizational Psychologist',
                description: 'Apply psychology principles to workplace settings',
                detailedDescription: 'Support HR functions, employee development, and organizational culture.',
                tags: ['I/O Psychology', 'Assessment', 'Training', 'Employee Relations'],
                requirements: ['Psychology background', 'HR interest', 'Communication'],
                responsibilities: ['Conduct surveys', 'Design training', 'Support HR'],
                industry: 'Human Resources'
            }
        ],
        'biology': [
            {
                title: jobType === 'internship' ? 'Research Lab Intern' : 'Laboratory Technician',
                description: 'Conduct biological research and laboratory testing',
                detailedDescription: 'Perform experiments, analyze samples, and maintain lab equipment.',
                tags: ['Lab Techniques', 'PCR', 'Cell Culture', 'Data Analysis', 'GLP'],
                requirements: ['Biology degree', 'Lab experience', 'Attention to detail'],
                responsibilities: ['Run experiments', 'Analyze results', 'Maintain records'],
                industry: 'Life Sciences'
            },
            {
                title: jobType === 'internship' ? 'Environmental Science Intern' : 'Environmental Scientist',
                description: 'Study and protect the environment',
                detailedDescription: 'Conduct field studies, analyze environmental data, and develop solutions.',
                tags: ['Field Work', 'GIS', 'Environmental Assessment', 'Sampling', 'Reporting'],
                requirements: ['Environmental science', 'Field experience', 'Data analysis'],
                responsibilities: ['Collect samples', 'Analyze data', 'Write reports'],
                industry: 'Environmental'
            }
        ],
        'communication': [
            {
                title: jobType === 'internship' ? 'PR Intern' : 'Public Relations Specialist',
                description: 'Manage public image and media relations',
                detailedDescription: 'Write press releases, manage media contacts, and handle communications.',
                tags: ['Media Relations', 'Press Releases', 'Social Media', 'Crisis Management'],
                requirements: ['Communications degree', 'Writing skills', 'Media knowledge'],
                responsibilities: ['Write releases', 'Media outreach', 'Event planning'],
                industry: 'Public Relations'
            },
            {
                title: jobType === 'internship' ? 'Social Media Intern' : 'Social Media Manager',
                description: 'Manage brand presence across social platforms',
                detailedDescription: 'Create content, engage audiences, and analyze social media metrics.',
                tags: ['Content Creation', 'Community Management', 'Analytics', 'Strategy'],
                requirements: ['Social media expertise', 'Creative skills', 'Analytics'],
                responsibilities: ['Create posts', 'Engage followers', 'Track metrics'],
                industry: 'Digital Marketing'
            }
        ],
        'graphic-design': [
            {
                title: jobType === 'internship' ? 'Graphic Design Intern' : 'Graphic Designer',
                description: 'Create visual content and design materials',
                detailedDescription: 'Design marketing materials, websites, and brand assets.',
                tags: ['Adobe Creative Suite', 'UI/UX', 'Branding', 'Typography', 'Web Design'],
                requirements: ['Design portfolio', 'Adobe skills', 'Creativity'],
                responsibilities: ['Create designs', 'Revise based on feedback', 'Maintain brand standards'],
                industry: 'Creative Services'
            },
            {
                title: jobType === 'internship' ? 'UX Design Intern' : 'UX Designer',
                description: 'Design user experiences for digital products',
                detailedDescription: 'Create wireframes, prototypes, and conduct user research.',
                tags: ['Figma', 'User Research', 'Prototyping', 'Wireframing', 'Usability Testing'],
                requirements: ['UX knowledge', 'Design tools', 'User empathy'],
                responsibilities: ['Design interfaces', 'Conduct research', 'Test designs'],
                industry: 'Technology'
            }
        ]
    };
    
    // Return templates for the major, or default if not found
    return templates[majorKey] || templates['business'];
}

// Get appropriate company pool based on major
function getCompanyPoolByMajor(majorKey) {
    const majorCompanyMap = {
        'computer-science': [...COMPANIES.technology, ...COMPANIES.finance],
        'data-science': [...COMPANIES.technology, ...COMPANIES.finance, ...COMPANIES.healthcare],
        'cybersecurity': [...COMPANIES.technology, ...COMPANIES.finance, ...COMPANIES.government],
        'nursing': COMPANIES.healthcare,
        'public-health': [...COMPANIES.healthcare, ...COMPANIES.nonprofit, ...COMPANIES.government],
        'business': [...COMPANIES.business, ...COMPANIES.finance, ...COMPANIES.retail],
        'marketing': [...COMPANIES.business, ...COMPANIES.media, ...COMPANIES.retail],
        'finance': COMPANIES.finance,
        'accounting': [...COMPANIES.finance, ...COMPANIES.business],
        'engineering': COMPANIES.engineering,
        'civil-engineering': COMPANIES.engineering,
        'education': COMPANIES.education,
        'psychology': [...COMPANIES.healthcare, ...COMPANIES.nonprofit],
        'biology': [...COMPANIES.healthcare, ...COMPANIES.environmental],
        'environmental-science': COMPANIES.environmental,
        'communication': [...COMPANIES.media, ...COMPANIES.nonprofit],
        'journalism': COMPANIES.media,
        'graphic-design': [...COMPANIES.technology, ...COMPANIES.media, ...COMPANIES.arts],
        'hospitality': COMPANIES.hospitality,
        'criminal-justice': [...COMPANIES.government, ...COMPANIES.legal],
        'logistics': COMPANIES.logistics,
        'real-estate': COMPANIES.real_estate,
        'sports': [...COMPANIES.sports, ...COMPANIES.hospitality]
    };
    
    return majorCompanyMap[majorKey] || [...COMPANIES.business, ...COMPANIES.technology];
}

// Generate benefits based on job type
function generateBenefits(jobType) {
    const benefitPools = {
        'internship': [
            'Mentorship from senior professionals',
            'Flexible schedule around classes',
            'Professional development workshops',
            'Networking opportunities',
            'Potential full-time offer',
            'Learning stipend',
            'Free parking',
            'Casual dress code'
        ],
        'entry-level': [
            'Health, dental, and vision insurance',
            '401(k) with company match',
            'Professional development budget',
            'Flexible work arrangements',
            'Generous PTO policy',
            'Performance bonuses',
            'Tuition reimbursement',
            'Career advancement opportunities'
        ],
        'experienced': [
            'Comprehensive health benefits',
            'Executive compensation package',
            '401(k) with generous match',
            'Stock options',
            'Annual bonuses',
            'Leadership development',
            'Flexible remote work',
            'Company car allowance'
        ],
        'part-time': [
            'Flexible scheduling',
            'Employee discounts',
            'Paid training',
            'Growth opportunities',
            'Performance incentives',
            'Casual work environment'
        ]
    };
    
    const benefits = benefitPools[jobType];
    return benefits.sort(() => 0.5 - Math.random()).slice(0, 6);
}

// Get company size
function getCompanySize() {
    const sizes = [
        '1-10 employees',
        '11-50 employees', 
        '51-200 employees',
        '201-500 employees',
        '501-1000 employees',
        '1000-5000 employees',
        '5000+ employees'
    ];
    return sizes[Math.floor(Math.random() * sizes.length)];
}

// Get work environment
function getWorkEnvironment(jobType) {
    const environments = [
        'On-site',
        'Hybrid (3 days office, 2 days remote)',
        'Hybrid (Flexible schedule)',
        'Remote with occasional office visits',
        'Fully remote'
    ];
    
    if (jobType === 'internship') {
        return environments[Math.floor(Math.random() * 3)]; // More likely on-site
    }
    return environments[Math.floor(Math.random() * environments.length)];
}

// Get duration
function getDuration(jobType) {
    const durations = {
        'internship': [
            '10-12 weeks (Summer)',
            '12-16 weeks (Fall)',
            '16 weeks (Spring)',
            'Part-time during academic year',
            '6 month co-op'
        ],
        'entry-level': ['Full-time permanent position'],
        'experienced': ['Full-time permanent position'],
        'part-time': [
            '15-20 hours/week',
            '20-25 hours/week',
            '25-30 hours/week',
            'Flexible hours'
        ]
    };
    
    const options = durations[jobType];
    return options[Math.floor(Math.random() * options.length)];
}

// Export the opportunities
const allOpportunities = generateOpportunities();

// Make available globally if needed
if (typeof window !== 'undefined') {
    window.opportunitiesData = allOpportunities;
    window.UNF_MAJORS = UNF_MAJORS;
}

// Export for Node.js environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        opportunities: allOpportunities,
        majors: UNF_MAJORS
    };
}