// Enhanced UNF Career Hub V2 with Comprehensive Opportunities Database
let opportunities = [];
let map;
let unfLocation = { lat: 30.2672, lng: -81.5114 }; // University of North Florida coordinates

// Check for resume filters from the resume analyzer
function checkResumeFilters() {
    const filters = localStorage.getItem('resumeFilters');
    const analysis = localStorage.getItem('resumeAnalysis');
    
    console.log('Raw filters from localStorage:', filters);
    console.log('Raw analysis from localStorage:', analysis);
    
    if (filters || analysis) {
        try {
            const filterData = filters ? JSON.parse(filters) : null;
            const analysisData = analysis ? JSON.parse(analysis) : null;
            
            console.log('Parsed filter data:', filterData);
            console.log('Parsed analysis data:', analysisData);
            
            // Show a notification that filters are applied
            if (filterData || analysisData) {
                const notification = document.createElement('div');
                notification.style.cssText = `
                    position: fixed;
                    top: 80px;
                    right: 20px;
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    color: white;
                    padding: 15px 20px;
                    border-radius: 10px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                    z-index: 1000;
                    animation: slideIn 0.5s ease;
                `;
                notification.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <i class="fas fa-filter"></i>
                        <div>
                            <strong>Resume Filters Applied</strong>
                            <div style="font-size: 0.9rem; opacity: 0.9;">Showing opportunities matched to your resume</div>
                        </div>
                        <button onclick="clearResumeFilters()" style="
                            background: white;
                            color: #667eea;
                            border: none;
                            padding: 5px 10px;
                            border-radius: 5px;
                            cursor: pointer;
                            margin-left: 20px;
                        ">Clear</button>
                    </div>
                `;
                document.body.appendChild(notification);
                
                // Auto-apply filters after page is fully loaded
                setTimeout(() => {
                    applyResumeFilters(filterData || analysisData);
                }, 2000);
            }
        } catch (e) {
            console.error('Error parsing resume filters:', e);
        }
    }
}

// Clear resume filters
function clearResumeFilters() {
    localStorage.removeItem('resumeFilters');
    localStorage.removeItem('resumeAnalysis');
    location.reload();
}

// Apply resume filters to opportunities
function applyResumeFilters(filterData) {
    console.log('Applying resume filters:', filterData);
    let filtersApplied = false;
    
    if (filterData.jobTypes) {
        // Apply job type filters
        filterData.jobTypes.forEach(type => {
            const checkbox = document.querySelector(`.type-filter-checkbox[value="${type}"]`);
            console.log(`Looking for job type: ${type}`, checkbox);
            if (checkbox) {
                checkbox.checked = true;
                filtersApplied = true;
            }
        });
    }
    
    if (filterData.fields) {
        // Apply major/field filters
        filterData.fields.forEach(field => {
            const checkbox = document.querySelector(`.major-filter-checkbox[value="${field}"]`);
            console.log(`Looking for field: ${field}`, checkbox);
            if (checkbox) {
                checkbox.checked = true;
                filtersApplied = true;
            }
        });
    }
    
    // Also try skills-based filtering by checking if skills match any major categories
    if (filterData.skills) {
        const skillsLower = filterData.skills.map(s => s.toLowerCase());
        
        // Check for tech skills
        const techSkills = ['javascript', 'python', 'java', 'react', 'node', 'sql', 'aws', 'html', 'css', 'git'];
        if (skillsLower.some(skill => techSkills.some(tech => skill.includes(tech)))) {
            const csCheckbox = document.querySelector(`.major-filter-checkbox[value="computer-science"]`);
            if (csCheckbox) {
                csCheckbox.checked = true;
                filtersApplied = true;
            }
        }
        
        // Check for business skills
        const businessSkills = ['marketing', 'finance', 'accounting', 'management', 'business'];
        if (skillsLower.some(skill => businessSkills.some(biz => skill.includes(biz)))) {
            const bizCheckboxes = document.querySelectorAll(`.major-filter-checkbox[value*="business"], .major-filter-checkbox[value="marketing"], .major-filter-checkbox[value="finance"], .major-filter-checkbox[value="accounting"], .major-filter-checkbox[value="management"]`);
            bizCheckboxes.forEach(cb => {
                cb.checked = true;
                filtersApplied = true;
            });
        }
    }
    
    console.log('Filters applied:', filtersApplied);
    
    if (filtersApplied) {
        // Expand major groups first
        const majorGroups = document.querySelectorAll('.major-group');
        majorGroups.forEach(group => {
            const content = group.querySelector('.major-group-content');
            const hasChecked = group.querySelector('.major-filter-checkbox:checked');
            if (hasChecked && content) {
                content.style.display = 'block';
            }
        });
        
        // Wait a bit then trigger filter application
        setTimeout(() => {
            const applyBtn = document.getElementById('apply-filters-btn');
            console.log('Apply button:', applyBtn);
            if (applyBtn) {
                applyBtn.click();
            }
        }, 1000);
    } else {
        console.log('No filters were applied - check field names match');
    }
}

// Use the comprehensive opportunities from the external data file
// This will be loaded from opportunities-data.js which contains thousands of opportunities
const enhancedOpportunities = window.opportunitiesData || [
    // TECHNOLOGY & COMPUTER SCIENCE
    {
        id: 1,
        title: "Software Engineering Intern",
        company: "Tech Solutions Jacksonville",
        location: "9000 Southside Blvd, Jacksonville, FL 32256",
        coordinates: { lat: 30.2568, lng: -81.6113 },
        type: "internship",
        major: "computer-science",
        description: "Join our dynamic development team to work on cutting-edge web applications using modern technologies including React, Node.js, and cloud platforms. This internship offers hands-on experience in full-stack development, agile methodologies, and collaborative software engineering practices. You'll work directly with senior developers on real client projects, contributing to applications used by thousands of users.",
        detailedDescription: "As a Software Engineering Intern, you'll be immersed in our fast-paced development environment where innovation meets practical application. You'll participate in our complete software development lifecycle, from initial requirements gathering to deployment and maintenance. Our team follows agile practices with daily standups, sprint planning, and retrospectives. You'll have the opportunity to work with technologies like React for frontend development, Node.js and Express for backend services, PostgreSQL databases, and AWS cloud infrastructure. We encourage experimentation and learning, providing access to online courses, technical conferences, and mentorship from our senior engineering team.",
        tags: ["JavaScript", "React", "Node.js", "AWS", "PostgreSQL", "Git", "Agile", "REST APIs"],
        requirements: [
            "Currently enrolled in Computer Science, Software Engineering, or related field",
            "Strong foundation in JavaScript and at least one modern framework",
            "Experience with version control systems (Git)",
            "Understanding of web development fundamentals (HTML, CSS, HTTP)",
            "Familiarity with database concepts",
            "Strong problem-solving and analytical thinking skills",
            "Excellent communication and teamwork abilities",
            "GPA of 3.0 or higher preferred"
        ],
        responsibilities: [
            "Develop and maintain web applications using React and Node.js",
            "Collaborate with cross-functional teams including designers and product managers",
            "Participate in code reviews and contribute to team coding standards",
            "Write unit tests and participate in quality assurance processes",
            "Assist in troubleshooting and debugging existing applications",
            "Document code and contribute to technical documentation",
            "Participate in agile ceremonies and project planning sessions"
        ],
        benefits: [
            "Comprehensive mentorship program with assigned senior developer",
            "Flexible working hours with hybrid remote/office options",
            "Access to latest development tools and technologies",
            "$2,000 learning and development stipend for courses and conferences",
            "Catered lunch on Fridays and fully stocked kitchen",
            "Potential full-time offer upon graduation",
            "Collaborative workspace with ergonomic setups",
            "Regular tech talks and lunch-and-learn sessions"
        ],
        salary: "$22-27/hour",
        posted: "2 days ago",
        url: "https://careers.techsolutionsjax.com/internships/software-engineering",
        companySize: "50-100 employees",
        companyIndustry: "Software Development",
        workEnvironment: "Hybrid (3 days office, 2 days remote)",
        duration: "12-16 weeks (Summer/Fall options available)"
    },
    {
        id: 2,
        title: "Data Science Intern",
        company: "FIS Global",
        location: "9800 Fredericksburg Rd, Jacksonville, FL 32221",
        coordinates: { lat: 30.2987, lng: -81.8234 },
        type: "internship",
        major: "computer-science",
        description: "Dive into the world of financial technology and big data analytics at one of the world's largest fintech companies. Work with massive datasets, develop machine learning models, and contribute to data-driven decision making that impacts millions of financial transactions daily. This role offers exposure to cutting-edge AI/ML technologies and real-world applications in the financial services industry.",
        detailedDescription: "FIS processes over $9 trillion in transactions annually, generating massive amounts of data that drive our analytics initiatives. As a Data Science Intern, you'll work alongside our data scientists and engineers to extract insights from complex financial datasets. You'll use Python, R, and SQL to analyze transaction patterns, develop predictive models for fraud detection, and create visualizations that inform business strategy. Our team leverages cloud platforms like AWS and Azure, big data technologies like Spark and Hadoop, and advanced ML frameworks including TensorFlow and PyTorch. You'll gain experience in the entire data science pipeline from data collection and cleaning to model deployment and monitoring.",
        tags: ["Python", "R", "SQL", "Machine Learning", "TensorFlow", "AWS", "Tableau", "Spark"],
        requirements: [
            "Currently pursuing Computer Science, Data Science, Statistics, or Mathematics degree",
            "Strong programming skills in Python and/or R",
            "Solid understanding of statistics and probability",
            "Experience with SQL and database querying",
            "Familiarity with machine learning concepts and algorithms",
            "Knowledge of data visualization tools (Tableau, matplotlib, seaborn)",
            "Strong analytical and problem-solving skills",
            "Ability to work with large, complex datasets"
        ],
        responsibilities: [
            "Analyze large financial datasets to identify trends and patterns",
            "Develop and validate predictive models for risk assessment",
            "Create data visualizations and dashboards for stakeholders",
            "Collaborate with business analysts to understand requirements",
            "Implement data cleaning and preprocessing pipelines",
            "Assist in A/B testing and experimental design",
            "Document findings and present results to technical and non-technical audiences"
        ],
        benefits: [
            "Access to enterprise-grade data science tools and platforms",
            "Mentorship from senior data scientists with PhD backgrounds",
            "Exposure to real-world financial data and business problems",
            "Training in advanced ML techniques and financial modeling",
            "Networking opportunities with data science professionals",
            "Potential full-time return offer with competitive salary",
            "Professional development budget for courses and certifications",
            "Modern office facilities with collaborative workspaces"
        ],
        salary: "$26-32/hour",
        posted: "4 days ago",
        url: "https://careers.fisglobal.com/data-science-intern",
        companySize: "50,000+ employees",
        companyIndustry: "Financial Technology",
        workEnvironment: "Hybrid (Flexible schedule)",
        duration: "10-12 weeks"
    },
    {
        id: 3,
        title: "Cybersecurity Analyst Trainee",
        company: "NEFCU",
        location: "12620 Beach Blvd, Jacksonville, FL 32246",
        coordinates: { lat: 30.2845, lng: -81.4287 },
        type: "entry-level",
        major: "computer-science",
        description: "Launch your cybersecurity career at Northeast Florida's largest credit union. This entry-level position focuses on protecting financial infrastructure, monitoring security threats, and implementing robust security protocols. You'll work with cutting-edge security tools and gain experience in incident response, vulnerability assessment, and compliance frameworks specific to the financial services industry.",
        detailedDescription: "NEFCU serves over 250,000 members and manages billions in assets, making cybersecurity critical to our operations. As a Cybersecurity Analyst Trainee, you'll be part of our Security Operations Center (SOC) team, monitoring network traffic, investigating security alerts, and responding to potential threats. You'll work with SIEM platforms like Splunk, conduct vulnerability scans using tools like Nessus, and assist in penetration testing activities. Our comprehensive training program covers financial regulations (FFIEC, PCI DSS), threat intelligence, digital forensics, and security awareness. You'll also participate in tabletop exercises simulating cyber incidents and contribute to our security awareness programs for employees and members.",
        tags: ["SIEM", "Network Security", "Incident Response", "Vulnerability Assessment", "PCI DSS", "Splunk"],
        requirements: [
            "Bachelor's degree in Computer Science, Cybersecurity, or Information Technology",
            "Security+ certification preferred (we'll help you obtain if needed)",
            "Understanding of networking fundamentals (TCP/IP, firewalls, VPNs)",
            "Knowledge of operating systems (Windows, Linux)",
            "Familiarity with security frameworks and compliance standards",
            "Strong analytical and problem-solving abilities",
            "Excellent written and verbal communication skills",
            "Ability to work in high-pressure, time-sensitive situations"
        ],
        responsibilities: [
            "Monitor security dashboards and investigate suspicious activities",
            "Analyze security logs and alerts from various systems",
            "Assist in incident response and forensic investigations",
            "Conduct vulnerability assessments and security scans",
            "Help maintain security documentation and procedures",
            "Support compliance audits and regulatory reporting",
            "Participate in security awareness training initiatives",
            "Collaborate with IT teams on security implementations"
        ],
        benefits: [
            "Comprehensive cybersecurity training and certification support",
            "Mentorship from CISSP and CISM certified professionals",
            "Tuition reimbursement for security-related education",
            "Excellent health, dental, and vision insurance",
            "401(k) with company matching and profit sharing",
            "Professional development opportunities and conference attendance",
            "Flexible work arrangements and generous PTO",
            "Credit union membership benefits and financial services"
        ],
        salary: "$52,000-62,000/year",
        posted: "1 week ago",
        url: "https://careers.nefcu.org/cybersecurity-analyst",
        companySize: "500+ employees",
        companyIndustry: "Financial Services",
        workEnvironment: "Hybrid (3 days office, 2 days remote)",
        duration: "Full-time permanent position"
    },

    // BUSINESS & FINANCE
    {
        id: 4,
        title: "Marketing Coordinator",
        company: "Jacksonville Digital Agency",
        location: "1 Independent Dr, Jacksonville, FL 32202",
        coordinates: { lat: 30.3322, lng: -81.6557 },
        type: "entry-level",
        major: "business",
        description: "Drive digital marketing initiatives for diverse clients in downtown Jacksonville's premier creative district. This role combines strategic thinking with hands-on execution across digital channels including social media, content marketing, email campaigns, and paid advertising. You'll work with cutting-edge marketing technologies and collaborate with award-winning creative teams to deliver measurable results for clients.",
        detailedDescription: "Jacksonville Digital Agency is a full-service digital marketing firm serving clients from startups to Fortune 500 companies. As a Marketing Coordinator, you'll manage multi-channel campaigns, analyze performance metrics, and contribute to strategy development. You'll work with platforms like HubSpot, Google Analytics, Facebook Business Manager, and Adobe Creative Suite. Our client portfolio spans healthcare, real estate, tourism, and professional services, giving you exposure to diverse industries and marketing challenges. You'll collaborate with our creative team on campaign concepts, work with developers on landing page optimization, and present campaign results to clients. This role offers rapid professional growth in Jacksonville's thriving digital marketing scene.",
        tags: ["Digital Marketing", "Social Media", "Google Analytics", "HubSpot", "Content Strategy", "PPC"],
        requirements: [
            "Bachelor's degree in Marketing, Communications, or Business",
            "1-2 years of digital marketing experience (internships count)",
            "Proficiency in social media platforms and business tools",
            "Experience with Google Analytics and basic data analysis",
            "Strong writing and communication skills",
            "Creative thinking and attention to detail",
            "Ability to manage multiple projects simultaneously",
            "Knowledge of design principles (Adobe Creative Suite a plus)"
        ],
        responsibilities: [
            "Develop and execute social media strategies across multiple platforms",
            "Create engaging content including blog posts, social media, and email campaigns",
            "Manage paid advertising campaigns on Google Ads and social platforms",
            "Analyze campaign performance and generate detailed reports",
            "Coordinate with graphic designers and web developers",
            "Conduct market research and competitive analysis",
            "Assist in client presentations and strategy sessions",
            "Stay current with digital marketing trends and best practices"
        ],
        benefits: [
            "Central downtown location with waterfront views",
            "Creative and collaborative work environment",
            "Professional development budget for courses and conferences",
            "Flexible work hours and remote work options",
            "Health insurance with company contribution",
            "401(k) retirement plan with matching",
            "Catered lunches and company events",
            "Access to latest marketing tools and technologies"
        ],
        salary: "$42,000-52,000/year",
        posted: "1 day ago",
        url: "https://jacksonvilledigital.com/careers/marketing-coordinator",
        companySize: "25-50 employees",
        companyIndustry: "Digital Marketing",
        workEnvironment: "Hybrid (Downtown office with flexible remote)",
        duration: "Full-time permanent with growth opportunities"
    },
    {
        id: 5,
        title: "Financial Analyst Intern",
        company: "Fidelity National Financial",
        location: "601 Riverside Ave, Jacksonville, FL 32204",
        coordinates: { lat: 30.3214, lng: -81.6681 },
        type: "internship",
        major: "business",
        description: "Gain invaluable experience in financial analysis and corporate finance at one of Jacksonville's Fortune 500 companies. Work with real financial data, develop analytical models, and support strategic decision-making processes. This internship provides exposure to financial planning, budgeting, forecasting, and investment analysis in the title insurance and real estate services industry.",
        detailedDescription: "Fidelity National Financial is the nation's largest title insurance company, generating over $11 billion in annual revenue. As a Financial Analyst Intern, you'll work within our Corporate Finance team, supporting various analytical projects and financial reporting initiatives. You'll build complex Excel models for financial forecasting, assist with quarterly earnings analysis, and contribute to strategic planning processes. The role involves working with large datasets, creating executive presentations, and collaborating with teams across the organization. You'll gain exposure to financial statement analysis, cash flow modeling, capital allocation decisions, and merger & acquisition analysis. Our internship program includes rotations through different finance functions, mentorship from senior analysts and directors, and a final presentation to executive leadership.",
        tags: ["Financial Modeling", "Excel", "Financial Analysis", "Forecasting", "PowerBI", "SQL"],
        requirements: [
            "Currently pursuing Bachelor's in Finance, Accounting, Economics, or related field",
            "Strong analytical and quantitative skills",
            "Advanced proficiency in Microsoft Excel (pivot tables, VLOOKUP, macros)",
            "Understanding of financial statements and accounting principles",
            "Excellent attention to detail and accuracy",
            "Strong written and verbal communication skills",
            "GPA of 3.3 or higher",
            "Previous internship or finance coursework preferred"
        ],
        responsibilities: [
            "Build and maintain financial models for forecasting and analysis",
            "Prepare monthly and quarterly financial reports",
            "Assist with budget preparation and variance analysis",
            "Conduct industry and competitor research",
            "Support due diligence activities for potential acquisitions",
            "Create presentations for senior management",
            "Analyze financial performance trends and key metrics",
            "Collaborate with accounting team on financial reporting"
        ],
        benefits: [
            "Mentorship from CFA and CPA certified professionals",
            "Exposure to Fortune 500 corporate finance operations",
            "Networking opportunities with finance executives",
            "Professional development workshops and training",
            "Potential full-time offer with competitive starting salary",
            "Intern events and social activities",
            "Modern headquarters with river views",
            "Performance-based bonus opportunity"
        ],
        salary: "$24-30/hour",
        posted: "1 week ago",
        url: "https://careers.fnf.com/financial-analyst-intern",
        companySize: "20,000+ employees",
        companyIndustry: "Financial Services",
        workEnvironment: "Office-based with some remote flexibility",
        duration: "10-12 weeks (Summer), part-time during academic year"
    },
    {
        id: 6,
        title: "Business Development Associate",
        company: "CSX Transportation",
        location: "500 Water St, Jacksonville, FL 32202",
        coordinates: { lat: 30.3288, lng: -81.6618 },
        type: "entry-level",
        major: "business",
        description: "Launch your career in logistics and transportation with one of North America's leading railroad companies. This role focuses on developing new business opportunities, analyzing market trends, and building relationships with potential customers. You'll gain comprehensive understanding of supply chain management, transportation economics, and strategic business planning in the rail industry.",
        detailedDescription: "CSX Transportation operates one of the largest rail networks in North America, serving 23 states and two Canadian provinces. As a Business Development Associate, you'll work with our sales and marketing teams to identify growth opportunities in various market segments including automotive, chemicals, agriculture, and intermodal transportation. You'll analyze shipping patterns, develop pricing strategies, and create proposals for potential customers. The role involves significant interaction with customers, from small businesses to Fortune 500 companies, helping them optimize their transportation solutions. You'll use Salesforce CRM, advanced analytics tools, and industry databases to track market trends and competitive positioning. CSX offers a comprehensive training program covering railroad operations, transportation economics, and business development techniques.",
        tags: ["Business Development", "Logistics", "Salesforce", "Market Analysis", "Transportation", "B2B Sales"],
        requirements: [
            "Bachelor's degree in Business, Supply Chain, Economics, or related field",
            "Strong analytical and problem-solving skills",
            "Excellent communication and presentation abilities",
            "Interest in logistics, transportation, or supply chain management",
            "Proficiency in Microsoft Office Suite",
            "Ability to build relationships and work with diverse stakeholders",
            "Willingness to travel occasionally for customer meetings",
            "Strong work ethic and results-oriented mindset"
        ],
        responsibilities: [
            "Identify and pursue new business opportunities in target markets",
            "Develop relationships with potential customers and industry partners",
            "Analyze market trends and competitive landscape",
            "Prepare proposals and presentations for prospective clients",
            "Collaborate with operations teams to develop transportation solutions",
            "Maintain customer database and track sales pipeline",
            "Support existing accounts with additional services and solutions",
            "Participate in industry conferences and networking events"
        ],
        benefits: [
            "Comprehensive training program covering railroad industry",
            "Competitive salary with performance-based bonuses",
            "Excellent health, dental, and vision insurance",
            "401(k) with company matching and pension plan",
            "Railroad retirement benefits",
            "Professional development and tuition reimbursement",
            "Company vehicle for customer visits",
            "Strong advancement opportunities within Fortune 500 company"
        ],
        salary: "$58,000-68,000/year",
        posted: "5 days ago",
        url: "https://careers.csx.com/business-development",
        companySize: "20,000+ employees",
        companyIndustry: "Transportation & Logistics",
        workEnvironment: "Office-based with customer travel",
        duration: "Full-time permanent position"
    },

    // ENGINEERING
    {
        id: 7,
        title: "Mechanical Engineering Co-op",
        company: "Anheuser-Busch Jacksonville",
        location: "111 Busch Dr, Jacksonville, FL 32218",
        coordinates: { lat: 30.4189, lng: -81.6406 },
        type: "internship",
        major: "engineering",
        description: "Immerse yourself in industrial manufacturing and process engineering at one of the world's largest brewing companies. This co-op program offers hands-on experience with automated manufacturing systems, quality control processes, and sustainability initiatives. You'll work on real engineering projects that impact production efficiency and product quality while learning from experienced engineers and technicians.",
        detailedDescription: "The Anheuser-Busch Jacksonville brewery is one of the company's largest facilities, producing millions of barrels annually of popular brands including Budweiser, Bud Light, and Michelob Ultra. As a Mechanical Engineering Co-op, you'll rotate through various departments including Brewing, Packaging, Quality Assurance, and Maintenance. You'll work with state-of-the-art brewing equipment, automated packaging lines, and sophisticated quality control systems. Projects may include optimizing production line efficiency, implementing predictive maintenance programs, troubleshooting equipment issues, and supporting continuous improvement initiatives. You'll use CAD software for equipment modifications, analyze production data to identify optimization opportunities, and collaborate with cross-functional teams on major capital projects. The program includes formal training on brewing processes, safety protocols, and lean manufacturing principles.",
        tags: ["Mechanical Engineering", "Manufacturing", "Process Improvement", "AutoCAD", "Lean Manufacturing", "Quality Control"],
        requirements: [
            "Currently pursuing Mechanical, Industrial, or Chemical Engineering degree",
            "Completed at least 2 years of engineering coursework",
            "Strong foundation in thermodynamics, fluid mechanics, and heat transfer",
            "Proficiency in CAD software (AutoCAD, SolidWorks, or similar)",
            "Understanding of manufacturing processes and quality control",
            "Strong problem-solving and analytical skills",
            "Ability to work safely in industrial environment",
            "Excellent teamwork and communication abilities"
        ],
        responsibilities: [
            "Support production line optimization and efficiency improvements",
            "Assist with equipment troubleshooting and maintenance planning",
            "Conduct data analysis to identify process improvement opportunities",
            "Participate in capital project planning and implementation",
            "Create and update technical documentation and procedures",
            "Collaborate with quality assurance on product testing",
            "Support sustainability initiatives and waste reduction programs",
            "Assist with safety inspections and compliance activities"
        ],
        benefits: [
            "Comprehensive 6-month co-op program with structured rotations",
            "Mentorship from professional engineers and plant management",
            "Hands-on experience with world-class manufacturing systems",
            "Competitive hourly wage with overtime opportunities",
            "Housing assistance for out-of-area students",
            "Full health benefits during co-op period",
            "Potential full-time offer upon graduation",
            "Access to company recreational facilities and employee events"
        ],
        salary: "$25-30/hour",
        posted: "1 week ago",
        url: "https://careers.ab-inbev.com/mechanical-engineering-coop",
        companySize: "1,000+ employees at Jacksonville facility",
        companyIndustry: "Manufacturing - Beverages",
        workEnvironment: "Industrial facility with some office work",
        duration: "6 months (Fall or Spring semester)"
    },
    {
        id: 8,
        title: "Environmental Engineer Intern",
        company: "JEA",
        location: "21 W Church St, Jacksonville, FL 32202",
        coordinates: { lat: 30.3289, lng: -81.6581 },
        type: "internship",
        major: "engineering",
        description: "Make a meaningful impact on environmental sustainability and public health at Jacksonville's municipal utility authority. Work on water treatment projects, environmental compliance initiatives, and renewable energy programs. This internship offers exposure to environmental regulations, water quality management, and sustainable infrastructure development while serving the community.",
        detailedDescription: "JEA is one of the largest community-owned utilities in the United States, serving over 500,000 customers with electric, water, wastewater, and natural gas services. As an Environmental Engineer Intern, you'll work with our Environmental Services team on projects related to water treatment plant operations, air quality monitoring, waste management, and renewable energy initiatives. You'll assist with environmental impact assessments, help ensure compliance with EPA and state regulations, and support sustainability programs. The role involves fieldwork at treatment facilities, laboratory analysis, data collection and analysis, and preparation of regulatory reports. You'll use environmental modeling software, GIS systems, and database management tools. JEA is actively pursuing carbon neutrality and investing in solar energy, electric vehicle infrastructure, and innovative water treatment technologies, providing exposure to cutting-edge environmental engineering applications.",
        tags: ["Environmental Engineering", "Water Treatment", "GIS", "Environmental Compliance", "Sustainability", "Renewable Energy"],
        requirements: [
            "Currently pursuing Environmental, Civil, or Chemical Engineering degree",
            "Strong foundation in environmental science and engineering principles",
            "Understanding of water and wastewater treatment processes",
            "Knowledge of environmental regulations and compliance requirements",
            "Proficiency in Microsoft Office and basic data analysis",
            "Experience with GIS software preferred",
            "Strong attention to detail and documentation skills",
            "Ability to work both in office and field environments"
        ],
        responsibilities: [
            "Assist with water quality monitoring and analysis",
            "Support environmental compliance reporting and documentation",
            "Participate in field sampling and data collection activities",
            "Help develop and implement environmental management programs",
            "Assist with environmental impact assessments",
            "Support renewable energy and sustainability initiatives",
            "Prepare technical reports and presentations",
            "Collaborate with regulatory agencies and external consultants"
        ],
        benefits: [
            "Meaningful work protecting public health and environment",
            "Exposure to municipal utility operations and infrastructure",
            "Mentorship from professional engineers and environmental scientists",
            "Training in environmental regulations and compliance",
            "Opportunity to work on sustainability and renewable energy projects",
            "Competitive internship compensation",
            "Professional development opportunities",
            "Potential full-time employment opportunities"
        ],
        salary: "$22-27/hour",
        posted: "5 days ago",
        url: "https://careers.jea.com/environmental-engineer-intern",
        companySize: "2,000+ employees",
        companyIndustry: "Utilities",
        workEnvironment: "Office and field work at utility facilities",
        duration: "10-12 weeks (Summer), part-time options available"
    },

    // HEALTH SCIENCES
    {
        id: 9,
        title: "Nursing Student Extern",
        company: "UF Health Jacksonville",
        location: "655 W 8th St, Jacksonville, FL 32209",
        coordinates: { lat: 30.3370, lng: -81.6696 },
        type: "internship",
        major: "health-sciences",
        description: "Gain invaluable clinical experience at one of Florida's premier academic medical centers. This externship provides hands-on patient care experience under the supervision of experienced nurses and healthcare professionals. Work in specialized units including ICU, Emergency Department, Medical-Surgical, and specialty areas while developing critical thinking and clinical skills essential for nursing practice.",
        detailedDescription: "UF Health Jacksonville is the region's only Level I Trauma Center and serves as the primary teaching hospital for the University of Florida College of Medicine Jacksonville. As a Nursing Student Extern, you'll work alongside registered nurses providing direct patient care in various clinical settings. The program is designed to bridge the gap between classroom learning and professional practice, offering real-world experience in patient assessment, medication administration, care planning, and family communication. You'll rotate through different units to gain exposure to various patient populations and medical conditions. The externship includes structured learning experiences, competency assessments, and mentorship from clinical nurse specialists. You'll also participate in interdisciplinary rounds, quality improvement initiatives, and evidence-based practice projects. This experience prepares you for the transition from student to new graduate nurse.",
        tags: ["Nursing", "Patient Care", "Clinical Experience", "Healthcare", "Medical Technology", "Electronic Health Records"],
        requirements: [
            "Currently enrolled in an accredited BSN nursing program",
            "Completed fundamental nursing courses and clinical rotations",
            "Current CPR certification (BLS for Healthcare Providers)",
            "Current immunizations per hospital requirements",
            "Successful completion of background check and drug screening",
            "Strong communication and interpersonal skills",
            "Ability to work 12-hour shifts and varying schedules",
            "Physical ability to meet job demands (lifting, standing, etc.)"
        ],
        responsibilities: [
            "Provide direct patient care under RN supervision",
            "Assist with patient assessments and vital sign monitoring",
            "Support medication administration and patient education",
            "Document patient care in electronic health record systems",
            "Participate in patient rounds and care planning",
            "Assist with patient mobility and comfort measures",
            "Communicate effectively with patients, families, and healthcare team",
            "Participate in unit-specific learning activities and competencies"
        ],
        benefits: [
            "Hands-on clinical experience in major academic medical center",
            "Exposure to diverse patient populations and medical conditions",
            "Mentorship from experienced nurses and clinical specialists",
            "Structured learning program with competency-based progression",
            "Networking opportunities with healthcare professionals",
            "Potential employment opportunities upon graduation",
            "Competitive hourly compensation",
            "Access to employee cafeteria and parking"
        ],
        salary: "$20-24/hour",
        posted: "2 days ago",
        url: "https://careers.ufhealthjax.org/nursing-extern",
        companySize: "5,000+ employees",
        companyIndustry: "Healthcare",
        workEnvironment: "Hospital clinical units with 12-hour shifts",
        duration: "8-16 weeks, part-time during school, full-time summer"
    },
    {
        id: 10,
        title: "Physical Therapy Assistant",
        company: "Brooks Rehabilitation",
        location: "3901 University Blvd S, Jacksonville, FL 32216",
        coordinates: { lat: 30.2398, lng: -81.6234 },
        type: "part-time",
        major: "health-sciences",
        description: "Support patient rehabilitation and recovery at one of the nation's leading rehabilitation hospitals. Work directly with physical therapists to implement treatment plans, assist with therapeutic exercises, and provide patient education. This role offers extensive experience with diverse patient populations including stroke, spinal cord injury, traumatic brain injury, and orthopedic conditions.",
        detailedDescription: "Brooks Rehabilitation is nationally recognized for innovative rehabilitation programs and outcomes research. As a Physical Therapy Assistant, you'll work with our interdisciplinary team to help patients regain functional mobility and independence. You'll assist with therapeutic exercises, gait training, balance activities, and use of adaptive equipment. The role involves significant patient interaction, requiring strong communication skills and empathy. You'll work with state-of-the-art rehabilitation technology including robotic-assisted gait training devices, virtual reality systems, and advanced assessment tools. Brooks serves patients across the continuum of care from acute rehabilitation through outpatient services, providing exposure to various rehabilitation settings and patient populations. The position offers excellent preparation for students planning to pursue physical therapy, occupational therapy, or other rehabilitation professions.",
        tags: ["Physical Therapy", "Rehabilitation", "Patient Care", "Therapeutic Exercise", "Medical Equipment", "Documentation"],
        requirements: [
            "Currently pursuing degree in Health Sciences, Exercise Science, or related field",
            "Strong interest in rehabilitation and patient care",
            "Excellent communication and interpersonal skills",
            "Physical ability to assist with patient transfers and mobility",
            "Reliability and professional demeanor",
            "Ability to follow detailed treatment protocols",
            "Current CPR certification preferred",
            "Previous healthcare or volunteer experience preferred"
        ],
        responsibilities: [
            "Assist physical therapists with patient treatment sessions",
            "Support therapeutic exercise programs and mobility training",
            "Help patients with transfers and ambulation activities",
            "Maintain treatment equipment and therapy areas",
            "Document patient progress and treatment responses",
            "Provide patient and family education on exercises and activities",
            "Support group therapy sessions and recreational activities",
            "Assist with discharge planning and home program instruction"
        ],
        benefits: [
            "Experience at nationally recognized rehabilitation facility",
            "Exposure to innovative rehabilitation technologies and techniques",
            "Mentorship from licensed physical therapists and occupational therapists",
            "Flexible part-time schedule accommodating class schedules",
            "Professional development opportunities and continuing education",
            "Potential for increased responsibilities and leadership opportunities",
            "Employee wellness programs and health benefits",
            "Networking opportunities within rehabilitation community"
        ],
        salary: "$17-21/hour",
        posted: "2 days ago",
        url: "https://careers.brooksrehab.org/pta-assistant",
        companySize: "500+ employees",
        companyIndustry: "Healthcare - Rehabilitation",
        workEnvironment: "Hospital and outpatient rehabilitation settings",
        duration: "Part-time ongoing, minimum 6-month commitment"
    },

    // EDUCATION
    {
        id: 11,
        title: "Elementary Teaching Assistant",
        company: "Duval County Public Schools",
        location: "1701 Prudential Dr, Jacksonville, FL 32207",
        coordinates: { lat: 30.3280, lng: -81.6557 },
        type: "part-time",
        major: "education",
        description: "Make a difference in young students' lives while gaining valuable classroom experience in one of Florida's largest school districts. Support lead teachers with instruction, classroom management, and student assessment while working with diverse student populations. This position provides excellent preparation for future teachers and offers insight into public education administration and curriculum implementation.",
        detailedDescription: "Duval County Public Schools serves over 200,000 students across 200+ schools, making it the 20th largest school district in the United States. As an Elementary Teaching Assistant, you'll work closely with certified teachers to support student learning and classroom operations. You'll assist with lesson preparation, provide individual student support, help manage classroom behavior, and support students with diverse learning needs. The role involves working with elementary-age students (grades K-5) in various subjects including reading, mathematics, science, and social studies. You'll gain experience with curriculum standards, educational technology, differentiated instruction, and classroom assessment techniques. Duval County schools serve a diverse student population with various socioeconomic backgrounds, providing valuable experience in culturally responsive teaching and equity in education. The district offers extensive professional development opportunities and pathways to certification for aspiring teachers.",
        tags: ["Elementary Education", "Classroom Management", "Student Support", "Educational Technology", "Curriculum", "Assessment"],
        requirements: [
            "Currently enrolled in Education, Elementary Education, or related program",
            "Completed at least 60 credit hours with minimum 2.5 GPA",
            "Successful completion of background screening and fingerprinting",
            "Strong communication and interpersonal skills",
            "Patience and enthusiasm for working with children",
            "Reliability and professional demeanor",
            "Basic computer skills and familiarity with educational technology",
            "Ability to work collaboratively with teachers and staff"
        ],
        responsibilities: [
            "Assist teachers with lesson preparation and classroom setup",
            "Provide individual and small group instruction support",
            "Help supervise students during classroom activities and transitions",
            "Support students with special needs and accommodations",
            "Assist with grading and record keeping",
            "Help manage classroom technology and learning materials",
            "Support field trips and school events",
            "Communicate effectively with students, parents, and school staff"
        ],
        benefits: [
            "Hands-on classroom experience in diverse educational settings",
            "Mentorship from experienced certified teachers",
            "Professional development opportunities and training workshops",
            "Flexible scheduling to accommodate college coursework",
            "Insight into public education system and administration",
            "Networking opportunities within education community",
            "Potential pathway to teacher certification and employment",
            "Competitive hourly wage with substitute teaching opportunities"
        ],
        salary: "$16-20/hour",
        posted: "3 days ago",
        url: "https://dcps.duvalschools.org/careers/teaching-assistant",
        companySize: "15,000+ employees",
        companyIndustry: "Education",
        workEnvironment: "Elementary school classrooms",
        duration: "Academic year, part-time with full-time summer options"
    },
    {
        id: 12,
        title: "Academic Tutor Coordinator",
        company: "Jacksonville University",
        location: "2800 University Blvd N, Jacksonville, FL 32211",
        coordinates: { lat: 30.3429, lng: -81.6066 },
        type: "part-time",
        major: "education",
        description: "Lead peer tutoring programs and academic support services at a prestigious private university. Coordinate tutoring sessions, train peer tutors, and develop academic success programs for undergraduate students. This role combines education, leadership, and program management while supporting student retention and academic achievement initiatives.",
        detailedDescription: "Jacksonville University is a private institution known for its small class sizes, personalized attention, and strong academic programs. As an Academic Tutor Coordinator, you'll oversee the peer tutoring program, matching students with qualified tutors and ensuring effective academic support services. You'll recruit and train undergraduate tutors, develop training materials, and implement best practices in peer-to-peer learning. The role involves data analysis to track tutoring effectiveness, coordination with faculty and academic departments, and program evaluation and improvement. You'll work with students across various disciplines including business, nursing, aviation, marine science, and liberal arts. The position requires strong organizational skills and understanding of learning theory, study strategies, and academic success principles. Jacksonville University's collaborative environment provides opportunities to work closely with faculty, staff, and student success professionals.",
        tags: ["Academic Support", "Peer Tutoring", "Program Coordination", "Student Success", "Learning Theory", "Data Analysis"],
        requirements: [
            "Currently pursuing or completed degree in Education, Psychology, or related field",
            "Strong academic record with minimum 3.5 GPA",
            "Previous tutoring or teaching experience preferred",
            "Excellent communication and interpersonal skills",
            "Strong organizational and time management abilities",
            "Leadership experience in academic or volunteer settings",
            "Understanding of learning differences and accommodation strategies",
            "Proficiency in Microsoft Office and learning management systems"
        ],
        responsibilities: [
            "Recruit, hire, and train peer tutors across academic disciplines",
            "Match students with appropriate tutors based on academic needs",
            "Develop training materials and best practices for peer tutoring",
            "Monitor and evaluate tutoring session effectiveness",
            "Coordinate with faculty and academic departments",
            "Maintain records and generate reports on program outcomes",
            "Plan and facilitate tutor training workshops",
            "Support students with academic success strategies and study skills"
        ],
        benefits: [
            "Leadership experience in higher education environment",
            "Professional development in student services and academic support",
            "Flexible schedule accommodating class and study time",
            "Networking opportunities with faculty and university administrators",
            "Experience with program evaluation and data analysis",
            "Training in learning theory and educational best practices",
            "Potential for full-time position upon graduation",
            "Tuition benefits for JU students"
        ],
        salary: "$18-22/hour",
        posted: "4 days ago",
        url: "https://careers.ju.edu/academic-tutor-coordinator",
        companySize: "1,000+ employees",
        companyIndustry: "Higher Education",
        workEnvironment: "University campus with flexible scheduling",
        duration: "Part-time academic year position with summer opportunities"
    },

    // ARTS & COMMUNICATIONS
    {
        id: 13,
        title: "Graphic Design Intern",
        company: "VyStar Credit Union",
        location: "76 S Laura St, Jacksonville, FL 32202",
        coordinates: { lat: 30.3271, lng: -81.6588 },
        type: "internship",
        major: "arts",
        description: "Create compelling visual designs for Florida's largest credit union, serving over 800,000 members. Work on diverse projects including digital marketing campaigns, print materials, website graphics, and brand identity elements. This internship offers exposure to financial services marketing while building a professional portfolio in a collaborative creative environment.",
        detailedDescription: "VyStar Credit Union is the largest credit union in Florida and one of the largest in the United States, with over $12 billion in assets. As a Graphic Design Intern, you'll work within our Marketing Communications team to create visual content that supports member engagement and business objectives. You'll design digital advertisements for social media and web platforms, develop print materials including brochures and direct mail pieces, and create graphics for the company website and mobile app. The role involves working with brand guidelines, collaborating with copywriters and marketing strategists, and using the Adobe Creative Suite for all design projects. You'll also gain experience in user experience (UX) design principles, working on website optimization and digital user interfaces. VyStar's marketing team manages campaigns for various financial products including mortgages, auto loans, credit cards, and business services, providing exposure to diverse design challenges and target audiences.",
        tags: ["Graphic Design", "Adobe Creative Suite", "Digital Marketing", "Brand Design", "UX Design", "Print Design"],
        requirements: [
            "Currently pursuing degree in Graphic Design, Visual Arts, or related field",
            "Proficiency in Adobe Creative Suite (Photoshop, Illustrator, InDesign)",
            "Strong portfolio demonstrating design skills and creativity",
            "Understanding of design principles, typography, and color theory",
            "Knowledge of digital design for web and social media platforms",
            "Attention to detail and ability to meet deadlines",
            "Strong communication skills and ability to accept feedback",
            "Basic understanding of print production processes"
        ],
        responsibilities: [
            "Design digital graphics for website, social media, and email campaigns",
            "Create print materials including brochures, posters, and direct mail",
            "Support brand consistency across all marketing materials",
            "Collaborate with marketing team on campaign concepts and execution",
            "Assist with photography direction and image editing",
            "Help maintain and organize digital asset libraries",
            "Support event marketing with signage and promotional materials",
            "Participate in creative brainstorming sessions and design reviews"
        ],
        benefits: [
            "Professional portfolio development with real-world projects",
            "Mentorship from experienced design and marketing professionals",
            "Exposure to financial services industry and marketing strategies",
            "Access to latest design software and technology",
            "Networking opportunities within design and marketing community",
            "Flexible schedule accommodating academic commitments",
            "Potential full-time employment opportunities",
            "Modern downtown office environment with creative workspace"
        ],
        salary: "$18-23/hour",
        posted: "4 days ago",
        url: "https://careers.vystarcu.org/graphic-design-intern",
        companySize: "1,500+ employees",
        companyIndustry: "Financial Services",
        workEnvironment: "Downtown office with hybrid options",
        duration: "10-12 weeks with part-time academic year options"
    },
    {
        id: 14,
        title: "Communications Specialist",
        company: "Jacksonville Port Authority (JAXPORT)",
        location: "2831 Talleyrand Ave, Jacksonville, FL 32206",
        coordinates: { lat: 30.3951, lng: -81.6182 },
        type: "entry-level",
        major: "arts",
        description: "Drive communications and public relations initiatives for one of Florida's largest seaports. Develop content for multiple channels, manage social media presence, coordinate media relations, and support stakeholder engagement efforts. This role offers exposure to international trade, logistics industry, and government communications while building expertise in strategic communications.",
        detailedDescription: "JAXPORT is a self-supporting government agency that owns and operates cargo facilities at Florida's largest container port on the East Coast. As a Communications Specialist, you'll develop and implement communication strategies that promote JAXPORT's role in international trade and economic development. You'll create content for press releases, website updates, social media posts, newsletters, and annual reports. The role involves coordinating with local and trade media, supporting executive communications, and managing relationships with stakeholders including government officials, business leaders, and community organizations. You'll also support marketing efforts for trade development, working on materials that promote Jacksonville as a gateway for international commerce. The position offers unique insight into port operations, international trade, maritime logistics, and economic development while providing experience in both internal and external communications.",
        tags: ["Public Relations", "Content Creation", "Social Media", "Media Relations", "Strategic Communications", "Government Affairs"],
        requirements: [
            "Bachelor's degree in Communications, Public Relations, Journalism, or related field",
            "1-2 years of experience in communications, marketing, or public relations",
            "Excellent writing and editing skills across multiple formats",
            "Experience with social media management and digital content creation",
            "Strong research and analytical abilities",
            "Understanding of media relations and public relations principles",
            "Proficiency in Microsoft Office and content management systems",
            "Knowledge of AP style and professional communication standards"
        ],
        responsibilities: [
            "Develop and write press releases, articles, and marketing materials",
            "Manage social media accounts and create engaging digital content",
            "Coordinate media interviews and press conferences",
            "Support executive communications and speechwriting",
            "Maintain relationships with media contacts and industry stakeholders",
            "Create content for website, newsletters, and annual reports",
            "Support trade development marketing and event promotion",
            "Monitor media coverage and prepare communications reports"
        ],
        benefits: [
            "Unique exposure to international trade and maritime industry",
            "Experience in government communications and public affairs",
            "Professional development in strategic communications",
            "Opportunity to work on high-profile economic development projects",
            "Networking with business and government leaders",
            "Comprehensive benefits package including retirement plan",
            "Career advancement opportunities within government sector",
            "Dynamic work environment supporting regional economic growth"
        ],
        salary: "$45,000-55,000/year",
        posted: "6 days ago",
        url: "https://careers.jaxport.com/communications-specialist",
        companySize: "200+ employees",
        companyIndustry: "Government - Transportation",
        workEnvironment: "Office-based with occasional port facility visits",
        duration: "Full-time permanent position"
    },

    // PUBLIC SERVICE
    {
        id: 15,
        title: "Public Administration Intern",
        company: "City of Jacksonville",
        location: "117 W Duval St, Jacksonville, FL 32202",
        coordinates: { lat: 30.3290, lng: -81.6586 },
        type: "internship",
        major: "public",
        description: "Gain hands-on experience in municipal government operations and public service delivery. Work with various city departments on policy analysis, community engagement projects, and administrative initiatives. This internship provides insight into local government decision-making, public finance, and civic engagement while contributing to projects that directly impact Jacksonville residents.",
        detailedDescription: "The City of Jacksonville operates under a strong mayor form of government, serving over 950,000 residents as the largest city by area in the contiguous United States. As a Public Administration Intern, you'll rotate through different departments including Budget and Planning, Public Works, Parks and Recreation, and Economic Development. You'll assist with policy research and analysis, support community engagement initiatives, help prepare reports and presentations for city leadership, and participate in public meetings and community forums. The role involves working on real municipal challenges such as budget analysis, program evaluation, strategic planning, and citizen services improvement. You'll gain exposure to intergovernmental relations, working with state and federal agencies, non-profit organizations, and community stakeholders. The internship includes structured learning about municipal finance, public policy development, and democratic governance processes.",
        tags: ["Public Administration", "Policy Analysis", "Municipal Government", "Community Engagement", "Public Finance", "Strategic Planning"],
        requirements: [
            "Currently pursuing degree in Public Administration, Political Science, or related field",
            "Strong analytical and research skills",
            "Excellent written and verbal communication abilities",
            "Interest in public service and government operations",
            "Proficiency in Microsoft Office and data analysis tools",
            "Understanding of democratic governance and public policy processes",
            "Ability to work with diverse stakeholders and community members",
            "U.S. citizenship required for government internship"
        ],
        responsibilities: [
            "Assist with policy research and analysis projects",
            "Support community engagement and public participation initiatives",
            "Help prepare reports, presentations, and briefing materials",
            "Participate in department meetings and strategic planning sessions",
            "Assist with budget analysis and performance measurement",
            "Support economic development and community planning projects",
            "Help coordinate public meetings and community forums",
            "Conduct research on best practices from other municipalities"
        ],
        benefits: [
            "Direct exposure to municipal government operations and decision-making",
            "Mentorship from experienced public administrators and city leaders",
            "Networking opportunities within government and civic organizations",
            "Experience with public policy development and implementation",
            "Understanding of intergovernmental relations and federalism",
            "Professional development in public service and administration",
            "Potential pathway to full-time government employment",
            "Contribution to meaningful projects benefiting community residents"
        ],
        salary: "$19-24/hour",
        posted: "6 days ago",
        url: "https://careers.coj.net/public-administration-intern",
        companySize: "8,000+ employees",
        companyIndustry: "Government - Municipal",
        workEnvironment: "Government office buildings with community site visits",
        duration: "10-12 weeks with academic year part-time options"
    }
];

// Major categories data with updated counts based on new opportunities
const majorCategories = {
    "all": {
        title: "All Majors",
        description: "Explore opportunities across all academic disciplines",
        majors: [
            { name: "Business Administration", icon: "fas fa-briefcase", jobs: 45 },
            { name: "Computer Science", icon: "fas fa-laptop-code", jobs: 38 },
            { name: "Engineering", icon: "fas fa-cogs", jobs: 32 },
            { name: "Health Sciences", icon: "fas fa-user-md", jobs: 28 },
            { name: "Education", icon: "fas fa-chalkboard-teacher", jobs: 25 },
            { name: "Arts & Letters", icon: "fas fa-palette", jobs: 22 },
            { name: "Public Service", icon: "fas fa-balance-scale", jobs: 18 }
        ]
    },
    "business": {
        title: "Business",
        description: "Opportunities in business, finance, marketing, and management",
        majors: [
            { name: "Business Administration", icon: "fas fa-briefcase", jobs: 28 },
            { name: "Marketing", icon: "fas fa-chart-line", jobs: 15 },
            { name: "Finance", icon: "fas fa-dollar-sign", jobs: 12 },
            { name: "Management", icon: "fas fa-users-cog", jobs: 10 },
            { name: "Accounting", icon: "fas fa-calculator", jobs: 8 }
        ]
    },
    "computer-science": {
        title: "Computer Science",
        description: "Technology and software development opportunities",
        majors: [
            { name: "Software Engineering", icon: "fas fa-code", jobs: 22 },
            { name: "Web Development", icon: "fas fa-globe", jobs: 18 },
            { name: "Data Science", icon: "fas fa-database", jobs: 15 },
            { name: "Cybersecurity", icon: "fas fa-shield-alt", jobs: 12 },
            { name: "Mobile Development", icon: "fas fa-mobile-alt", jobs: 8 }
        ]
    },
    "engineering": {
        title: "Engineering",
        description: "Engineering positions across multiple disciplines",
        majors: [
            { name: "Mechanical Engineering", icon: "fas fa-cogs", jobs: 15 },
            { name: "Civil Engineering", icon: "fas fa-road", jobs: 12 },
            { name: "Electrical Engineering", icon: "fas fa-bolt", jobs: 10 },
            { name: "Industrial Engineering", icon: "fas fa-industry", jobs: 8 },
            { name: "Environmental Engineering", icon: "fas fa-leaf", jobs: 6 }
        ]
    },
    "health-sciences": {
        title: "Health Sciences",
        description: "Healthcare and medical field opportunities",
        majors: [
            { name: "Nursing", icon: "fas fa-user-nurse", jobs: 15 },
            { name: "Health Administration", icon: "fas fa-hospital", jobs: 8 },
            { name: "Physical Therapy", icon: "fas fa-dumbbell", jobs: 6 },
            { name: "Public Health", icon: "fas fa-globe-americas", jobs: 5 },
            { name: "Medical Technology", icon: "fas fa-microscope", jobs: 4 }
        ]
    },
    "education": {
        title: "Education",
        description: "Teaching and educational support opportunities",
        majors: [
            { name: "Elementary Education", icon: "fas fa-child", jobs: 12 },
            { name: "Secondary Education", icon: "fas fa-graduation-cap", jobs: 10 },
            { name: "Special Education", icon: "fas fa-heart", jobs: 8 },
            { name: "Educational Leadership", icon: "fas fa-user-tie", jobs: 6 },
            { name: "School Counseling", icon: "fas fa-comments", jobs: 5 }
        ]
    },
    "arts": {
        title: "Arts & Letters",
        description: "Creative and liberal arts opportunities",
        majors: [
            { name: "Graphic Design", icon: "fas fa-paint-brush", jobs: 10 },
            { name: "Communications", icon: "fas fa-microphone", jobs: 8 },
            { name: "English Literature", icon: "fas fa-book", jobs: 6 },
            { name: "Fine Arts", icon: "fas fa-palette", jobs: 5 },
            { name: "Journalism", icon: "fas fa-newspaper", jobs: 4 }
        ]
    },
    "public": {
        title: "Public Service",
        description: "Government and public sector opportunities",
        majors: [
            { name: "Public Administration", icon: "fas fa-landmark", jobs: 8 },
            { name: "Criminal Justice", icon: "fas fa-balance-scale", jobs: 6 },
            { name: "Political Science", icon: "fas fa-vote-yea", jobs: 5 },
            { name: "Social Work", icon: "fas fa-hands-helping", jobs: 4 },
            { name: "Urban Planning", icon: "fas fa-city", jobs: 3 }
        ]
    }
};

// DOM elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const searchInput = document.getElementById('job-search');
const searchBtn = document.getElementById('search-btn');
const opportunityCardsContainer = document.getElementById('opportunity-cards');
const opportunitiesMapContainer = document.getElementById('opportunities-map');
const locationFilter = document.getElementById('location-filter');
const typeFilter = document.getElementById('type-filter');
const majorFilter = document.getElementById('major-filter');
const distanceFilter = document.getElementById('distance-filter');
const quickFilterBtns = document.querySelectorAll('.filter-btn');
const tabBtns = document.querySelectorAll('.tab-btn');
const majorsContent = document.getElementById('majors-content');
const navLinks = document.querySelectorAll('.nav-link');
const cardViewBtn = document.getElementById('card-view-btn');
const mapViewBtn = document.getElementById('map-view-btn');
const opportunityModal = document.getElementById('opportunity-modal');
const modalClose = document.getElementById('modal-close');

// Function to populate majors dropdown with all UNF majors
function populateMajorsDropdown() {
    if (!majorFilter || !window.UNF_MAJORS) return;
    
    // Clear existing options except the first one (All Majors)
    while (majorFilter.options.length > 1) {
        majorFilter.remove(1);
    }
    
    // Group majors by college for better organization
    const majorsByCollege = {
        'Coggin College of Business': ['accounting', 'finance', 'economics', 'international-business', 'management', 'marketing', 'logistics', 'business-analytics', 'entrepreneurship', 'real-estate'],
        'College of Computing, Engineering & Construction': ['computer-science', 'information-systems', 'information-technology', 'data-science', 'cybersecurity', 'civil-engineering', 'electrical-engineering', 'mechanical-engineering', 'construction-management', 'building-construction'],
        'Brooks College of Health': ['nursing', 'public-health', 'health-administration', 'nutrition', 'exercise-science', 'athletic-training', 'physical-therapy', 'mental-health-counseling', 'clinical-mental-health', 'health-science'],
        'College of Education & Human Services': ['elementary-education', 'secondary-education', 'special-education', 'educational-leadership', 'sport-management', 'counseling', 'deaf-education'],
        'College of Arts & Sciences': ['biology', 'chemistry', 'physics', 'mathematics', 'statistics', 'psychology', 'sociology', 'anthropology', 'political-science', 'criminal-justice', 'english', 'spanish', 'french', 'history', 'philosophy', 'art', 'graphic-design', 'music', 'music-performance', 'music-education', 'theater', 'communication', 'journalism', 'public-relations', 'multimedia-journalism', 'international-studies', 'environmental-science', 'coastal-biology', 'marine-science']
    };
    
    // Add majors grouped by college
    Object.entries(majorsByCollege).forEach(([collegeName, majorKeys]) => {
        // Create optgroup for each college
        const optgroup = document.createElement('optgroup');
        optgroup.label = collegeName;
        
        majorKeys.forEach(majorKey => {
            if (window.UNF_MAJORS[majorKey]) {
                const option = document.createElement('option');
                option.value = majorKey;
                option.textContent = window.UNF_MAJORS[majorKey];
                optgroup.appendChild(option);
            }
        });
        
        majorFilter.appendChild(optgroup);
    });
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

async function initializeApp() {
    // Populate majors dropdown with all UNF majors
    populateMajorsDropdown();
    
    setupEventListeners();
    
    // Track page view
    if (typeof notionService !== 'undefined') {
        notionService.logPageView({
            page: 'home',
            section: 'initialization'
        }).catch(error => {
            console.error('Failed to log page view to Notion:', error);
        });
    }
    
    // Show loading state
    opportunityCardsContainer.innerHTML = '<div class="loading">Loading enhanced career opportunities...</div>';
    
    try {
        // Calculate distances and prepare opportunities
        opportunities = enhancedOpportunities.map(opp => ({
            ...opp,
            distanceFromUNF: calculateDistance(unfLocation, opp.coordinates),
            travelTime: calculateTravelTime(unfLocation, opp.coordinates)
        }));
        
        // Sort by distance initially
        opportunities.sort((a, b) => a.distanceFromUNF - b.distanceFromUNF);
        
        // Check if there's a major parameter in URL
        const urlParams = new URLSearchParams(window.location.search);
        const majorParam = urlParams.get('major');
        
        if (majorParam) {
            // Show major-specific page
            showMajorPage(majorParam);
        } else {
            // Display only first 50 opportunities initially
            displayOpportunityCards(opportunities, 50, true);
        }
    } catch (error) {
        console.error('Failed to load opportunities:', error);
        opportunityCardsContainer.innerHTML = '<div class="no-results"><i class="fas fa-exclamation-triangle"></i><h3>Failed to load opportunities</h3><p>Please try again later</p></div>';
    }
    
    if (!majorParam) {
        displayMajorCategory('all');
    }
}

function setupEventListeners() {
    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            trackButtonClick('menu', 'Mobile Hamburger', '', 'navigation');
            toggleMobileMenu();
        });
    }
    
    // Enhanced Search functionality
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            trackButtonClick('search', 'Search Button', searchInput.value, 'search');
            performEnhancedSearch();
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                trackButtonClick('search', 'Search Enter Key', searchInput.value, 'search');
                performEnhancedSearch();
            }
        });
        
        // Add search suggestions
        searchInput.addEventListener('input', debounce(function() {
            showSearchSuggestions(this.value);
        }, 300));
        
        searchInput.addEventListener('focus', function() {
            if (this.value) showSearchSuggestions(this.value);
        });
        
        // Hide suggestions on click outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.search-input-group')) {
                const suggestionsDiv = document.getElementById('search-suggestions');
                if (suggestionsDiv) suggestionsDiv.style.display = 'none';
            }
        });
    }
    
    // Inline search filters
    const searchLocation = document.getElementById('search-location');
    const searchType = document.getElementById('search-type');
    if (searchLocation) {
        searchLocation.addEventListener('change', performEnhancedSearch);
    }
    if (searchType) {
        searchType.addEventListener('change', performEnhancedSearch);
    }
    
    // Quick filter buttons in hero
    document.querySelectorAll('.quick-filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            document.querySelectorAll('.quick-filter-btn').forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            
            // Clear search input
            searchInput.value = '';
            
            // Apply the filter
            if (filter === 'internship' || filter === 'entry-level') {
                // Filter by job type
                const filtered = opportunities.filter(opp => opp.type === filter);
                displayOpportunityCards(filtered);
            } else if (filter === 'near-unf') {
                // Filter by distance from UNF
                const filtered = opportunities.filter(opp => opp.distanceFromUNF <= 10);
                displayOpportunityCards(filtered);
            } else if (filter === 'remote') {
                // Filter by remote work
                const filtered = opportunities.filter(opp => 
                    opp.workEnvironment && opp.workEnvironment.toLowerCase().includes('remote'));
                displayOpportunityCards(filtered);
            }
        });
    });
    
    // Setup enhanced filters
    setupEnhancedFilters();
    
    // Legacy quick filter buttons (if they exist)
    if (quickFilterBtns && quickFilterBtns.length > 0) {
        quickFilterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                trackButtonClick('quick-filter', this.textContent, this.dataset.type, 'quick-filters');
                toggleQuickFilter(this);
            });
        });
    }
    
    // View toggle buttons
    if (cardViewBtn) {
        cardViewBtn.addEventListener('click', function() {
            trackButtonClick('view', 'Card View', '', 'view-options');
            switchToCardView();
        });
    }
    
    if (mapViewBtn) {
        mapViewBtn.addEventListener('click', function() {
            trackButtonClick('view', 'Map View', '', 'view-options');
            switchToMapView();
        });
    }
    
    // Major tabs
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            trackButtonClick('tab', this.textContent, this.dataset.tab, 'majors');
            switchMajorTab(this);
        });
    });
    
    // Navigation smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Don't prevent default for external links
            if (!targetId.startsWith('#')) {
                return; // Let the browser handle external links normally
            }
            
            e.preventDefault();
            trackButtonClick('navigation', this.textContent, targetId, 'navigation');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                setActiveNavLink(this);
                if (navMenu && navMenu.classList.contains('active')) {
                    toggleMobileMenu();
                }
            }
        });
    });
    
    // Modal close
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            closeOpportunityModal();
        });
    }
    
    // Close modal when clicking outside
    if (opportunityModal) {
        opportunityModal.addEventListener('click', function(e) {
            if (e.target === opportunityModal) {
                closeOpportunityModal();
            }
        });
    }
    
    // Scroll spy for navigation
    window.addEventListener('scroll', updateActiveNavOnScroll);
    
    // Feedback chat bubble
    setupFeedbackListeners();
    
    // Sorting functionality
    setupSortingListeners();
    
    // Scroll to top button
    setupScrollToTop();
}

// Distance calculation using Haversine formula
function calculateDistance(pos1, pos2) {
    const R = 3959; // Earth's radius in miles
    const dLat = toRad(pos2.lat - pos1.lat);
    const dLon = toRad(pos2.lng - pos1.lng);
    const lat1 = toRad(pos1.lat);
    const lat2 = toRad(pos2.lat);

    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c;

    return Math.round(d * 10) / 10; // Round to 1 decimal place
}

function toRad(value) {
    return value * Math.PI / 180;
}

// Estimate travel time based on distance
function calculateTravelTime(pos1, pos2) {
    const distance = calculateDistance(pos1, pos2);
    const avgSpeed = 35; // Average speed in mph considering traffic
    const time = distance / avgSpeed * 60; // Time in minutes
    
    if (time < 60) {
        return Math.round(time) + ' min';
    } else {
        const hours = Math.floor(time / 60);
        const minutes = Math.round(time % 60);
        return hours + 'h ' + (minutes > 0 ? minutes + 'm' : '');
    }
}

function displayOpportunityCards(opps, limit = 50, showViewAllByMajor = true) {
    updateResultsHeader(opps);
    
    if (opps.length === 0) {
        opportunityCardsContainer.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No opportunities found</h3>
                <p>Try adjusting your search criteria or filters</p>
            </div>
        `;
        return;
    }
    
    // Limit to first 50 results initially
    const displayedOpps = opps.slice(0, limit);
    
    // Group remaining opportunities by major
    const remainingByMajor = {};
    if (opps.length > limit) {
        opps.slice(limit).forEach(opp => {
            const major = opp.major || 'general';
            if (!remainingByMajor[major]) {
                remainingByMajor[major] = [];
            }
            remainingByMajor[major].push(opp);
        });
    }
    
    let html = displayedOpps.map((opp, index) => `
        <div class="opportunity-card" data-opportunity-id="${opp.id}" style="animation-delay: ${index * 0.1}s" onclick="openOpportunityDetail(${opp.id})">
            <div class="opportunity-header">
                <div>
                    <h3 class="opportunity-title">${opp.title}</h3>
                </div>
                <div class="distance-badge">
                    <i class="fas fa-map-marker-alt"></i> ${opp.distanceFromUNF} mi
                </div>
            </div>
            <div class="opportunity-company">${opp.company}</div>
            <div class="opportunity-location">
                <i class="fas fa-map-marker-alt"></i>
                ${opp.location}
            </div>
            <div class="opportunity-description">${opp.description.substring(0, 200)}${opp.description.length > 200 ? '...' : ''}</div>
            <div class="opportunity-tags">
                ${opp.tags.slice(0, 4).map(tag => `<span class="opportunity-tag">${tag}</span>`).join('')}
            </div>
            <div class="opportunity-details">
                <strong>💰 ${opp.salary}</strong> • <strong>📅 ${opp.posted}</strong> • <strong>🚗 ${opp.travelTime}</strong>
            </div>
            <div class="opportunity-footer">
                <button class="view-details-btn" onclick="event.stopPropagation(); openOpportunityDetail(${opp.id})">
                    <i class="fas fa-info-circle"></i> View Details
                </button>
                <button class="apply-btn" onclick="event.stopPropagation(); applyToOpportunity(${opp.id})">
                    <i class="fas fa-paper-plane"></i> Apply Now
                </button>
            </div>
        </div>
    `).join('');
    
    // Add "View More by Major" section if there are more than 50 results
    if (showViewAllByMajor && opps.length > limit) {
        html += `
            <div class="view-more-section" style="grid-column: 1 / -1; margin-top: 40px; padding: 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; text-align: center;">
                <h3 style="color: white; margin-bottom: 20px;">Showing ${limit} of ${opps.length} opportunities</h3>
                <p style="color: rgba(255,255,255,0.9); margin-bottom: 30px;">View more opportunities by selecting your major:</p>
                <div class="major-buttons" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 15px;">
                    ${Object.entries(getMajorGroups()).map(([key, group]) => {
                        const count = opps.filter(opp => opp.major === key || (opp.majors && opp.majors.includes(key))).length;
                        if (count > 0) {
                            return `
                                <button class="major-nav-btn" 
                                    onclick="navigateToMajorPage('${key}')"
                                    style="padding: 12px 24px; background: white; color: #764ba2; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; transition: all 0.3s;">
                                    <i class="${group.icon}"></i> ${group.name}
                                    <span style="background: #764ba2; color: white; padding: 2px 8px; border-radius: 12px; margin-left: 8px;">${count}</span>
                                </button>
                            `;
                        }
                        return '';
                    }).join('')}
                </div>
            </div>
        `;
    }
    
    opportunityCardsContainer.innerHTML = html;
}

function updateResultsHeader(opps) {
    const resultsHeader = document.getElementById('results-header');
    const resultsCount = document.getElementById('results-count');
    
    if (opps.length > 0) {
        if (resultsHeader) resultsHeader.style.display = 'flex';
        if (resultsCount) resultsCount.textContent = `Showing ${opps.length} opportunity${opps.length === 1 ? '' : 'ies'}`;
    } else {
        if (resultsHeader) resultsHeader.style.display = 'none';
    }
}

function openOpportunityDetail(opportunityId) {
    const opportunity = opportunities.find(o => o.id === opportunityId);
    if (!opportunity) return;
    
    trackButtonClick('detail', 'View Opportunity Detail', opportunity.title, 'opportunity-cards');
    
    // Log opportunity view
    if (typeof notionService !== 'undefined') {
        notionService.logOpportunityView({
            id: opportunity.id,
            title: opportunity.title,
            company: opportunity.company,
            location: opportunity.location,
            distanceFromUNF: opportunity.distanceFromUNF,
            type: opportunity.type,
            major: opportunity.major,
            viewType: 'detail'
        }).catch(error => {
            console.error('Failed to log opportunity view:', error);
        });
    }
    
    const modalTitle = document.getElementById('modal-title');
    const modalContentArea = document.getElementById('modal-content-area');
    
    if (modalTitle) modalTitle.textContent = opportunity.title;
    
    if (modalContentArea) {
        modalContentArea.innerHTML = `
            <div class="opportunity-detail-header">
                <div class="company-info">
                    <div class="company-name">${opportunity.company}</div>
                    <div class="company-location">
                        <i class="fas fa-map-marker-alt"></i>
                        ${opportunity.location}
                    </div>
                    <div class="company-details">
                        <span><strong>Industry:</strong> ${opportunity.companyIndustry}</span> • 
                        <span><strong>Size:</strong> ${opportunity.companySize}</span>
                    </div>
                </div>
                <div class="location-info">
                    <div class="distance-from-unf">${opportunity.distanceFromUNF} miles from UNF</div>
                    <div class="travel-time">
                        <i class="fas fa-clock"></i> ${opportunity.travelTime} drive
                    </div>
                </div>
            </div>
            
            <div class="detail-section">
                <h4><i class="fas fa-briefcase"></i> Position Overview</h4>
                <p>${opportunity.detailedDescription || opportunity.description}</p>
            </div>
            
            <div class="detail-section">
                <h4><i class="fas fa-info-circle"></i> Job Details</h4>
                <div class="detail-grid">
                    <div class="detail-item">
                        <div class="detail-label">Position Type</div>
                        <div class="detail-value">${opportunity.type.charAt(0).toUpperCase() + opportunity.type.slice(1).replace('-', ' ')}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Salary Range</div>
                        <div class="detail-value">${opportunity.salary}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Work Environment</div>
                        <div class="detail-value">${opportunity.workEnvironment || 'Standard office environment'}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Duration</div>
                        <div class="detail-value">${opportunity.duration || 'Varies'}</div>
                    </div>
                </div>
            </div>
            
            ${opportunity.responsibilities ? `
            <div class="detail-section">
                <h4><i class="fas fa-tasks"></i> Key Responsibilities</h4>
                <ul class="requirements-list">
                    ${opportunity.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
                </ul>
            </div>
            ` : ''}
            
            <div class="detail-section">
                <h4><i class="fas fa-graduation-cap"></i> Requirements</h4>
                <ul class="requirements-list">
                    ${opportunity.requirements.map(req => `<li>${req}</li>`).join('')}
                </ul>
            </div>
            
            <div class="detail-section">
                <h4><i class="fas fa-star"></i> Benefits & Perks</h4>
                <ul class="benefits-list">
                    ${opportunity.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                </ul>
            </div>
            
            <div class="detail-section">
                <h4><i class="fas fa-tags"></i> Skills & Technologies</h4>
                <div class="opportunity-tags">
                    ${opportunity.tags.map(tag => `<span class="opportunity-tag">${tag}</span>`).join('')}
                </div>
            </div>
            
            <div class="detail-section">
                <h4><i class="fas fa-map"></i> Location & Directions</h4>
                <div class="map-container" id="detail-map-${opportunity.id}"></div>
                <p class="map-note">
                    <i class="fas fa-info-circle"></i> 
                    This map shows the route from UNF campus to the opportunity location.
                </p>
            </div>
            
            <div class="modal-actions">
                <button class="apply-modal-btn" onclick="applyToOpportunity(${opportunity.id})">
                    <i class="fas fa-paper-plane"></i> Apply Now
                </button>
                <button class="share-btn" onclick="shareOpportunity(${opportunity.id})">
                    <i class="fas fa-share"></i> Share Opportunity
                </button>
            </div>
        `;
    }
    
    if (opportunityModal) {
        opportunityModal.classList.add('active');
    }
    
    // Initialize map for this opportunity after a short delay
    setTimeout(() => {
        initDetailMap(opportunity);
    }, 300);
}

function closeOpportunityModal() {
    if (opportunityModal) {
        opportunityModal.classList.remove('active');
    }
}

function initDetailMap(opportunity) {
    const mapContainer = document.getElementById(`detail-map-${opportunity.id}`);
    if (!mapContainer || !window.google) {
        console.log('Map container not found or Google Maps not loaded');
        return;
    }
    
    try {
        const map = new google.maps.Map(mapContainer, {
            zoom: 12,
            center: opportunity.coordinates,
            mapTypeId: 'roadmap'
        });
        
        // UNF marker
        new google.maps.Marker({
            position: unfLocation,
            map: map,
            title: 'University of North Florida',
            icon: {
                url: 'data:image/svg+xml;base64,' + btoa(`
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#005082" width="32" height="32">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                `),
                scaledSize: new google.maps.Size(32, 32)
            }
        });
        
        // Opportunity marker
        new google.maps.Marker({
            position: opportunity.coordinates,
            map: map,
            title: opportunity.company,
            icon: {
                url: 'data:image/svg+xml;base64,' + btoa(`
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffd700" width="32" height="32">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                `),
                scaledSize: new google.maps.Size(32, 32)
            }
        });
        
        // Draw route
        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer({
            suppressMarkers: true,
            polylineOptions: {
                strokeColor: '#005082',
                strokeWeight: 4
            }
        });
        
        directionsRenderer.setMap(map);
        
        directionsService.route({
            origin: unfLocation,
            destination: opportunity.coordinates,
            travelMode: google.maps.TravelMode.DRIVING,
        }, (result, status) => {
            if (status === 'OK') {
                directionsRenderer.setDirections(result);
            } else {
                console.error('Directions request failed due to ' + status);
            }
        });
    } catch (error) {
        console.error('Error initializing detail map:', error);
        if (error.message && error.message.includes('ApiNotActivatedMapError')) {
            mapContainer.innerHTML = `
                <div style="padding: 20px; text-align: center; background: #f8f9fa; border-radius: 8px; border: 1px solid #dee2e6;">
                    <i class="fas fa-map-marker-alt" style="font-size: 2rem; color: #005082; margin-bottom: 10px;"></i>
                    <h4 style="color: #005082; margin-bottom: 5px;">Location Details</h4>
                    <p style="margin: 5px 0;"><strong>${opportunity.company}</strong></p>
                    <p style="margin: 5px 0; color: #666;">${opportunity.location}</p>
                    <p style="margin: 5px 0; color: #666;">Distance: ${opportunity.distanceFromUNF} miles from UNF</p>
                    <p style="font-size: 0.85rem; color: #888; margin-top: 10px;">Interactive map requires API activation</p>
                </div>
            `;
        } else {
            mapContainer.innerHTML = '<p>Map could not be loaded. Please check your internet connection.</p>';
        }
    }
}

function applyToOpportunity(opportunityId) {
    const opportunity = opportunities.find(o => o.id === opportunityId);
    if (!opportunity) return;
    
    trackButtonClick('apply', 'Apply Now', `${opportunity.title} at ${opportunity.company}`, 'opportunity-detail');
    
    if (opportunity.url && !opportunity.url.includes('example.com')) {
        window.open(opportunity.url, '_blank');
    } else {
        showApplicationModal(opportunity);
    }
}

function shareOpportunity(opportunityId) {
    const opportunity = opportunities.find(o => o.id === opportunityId);
    if (!opportunity) return;
    
    trackButtonClick('share', 'Share Opportunity', opportunity.title, 'opportunity-detail');
    
    const shareText = `Check out this opportunity: ${opportunity.title} at ${opportunity.company} - ${opportunity.distanceFromUNF} miles from UNF campus!`;
    
    if (navigator.share) {
        navigator.share({
            title: opportunity.title,
            text: shareText,
            url: window.location.href
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(shareText + ' ' + window.location.href).then(() => {
            alert('Opportunity details copied to clipboard!');
        }).catch(() => {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = shareText + ' ' + window.location.href;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert('Opportunity details copied to clipboard!');
        });
    }
}

function switchToCardView() {
    if (cardViewBtn) cardViewBtn.classList.add('active');
    if (mapViewBtn) mapViewBtn.classList.remove('active');
    if (opportunityCardsContainer) opportunityCardsContainer.style.display = 'grid';
    if (opportunitiesMapContainer) opportunitiesMapContainer.style.display = 'none';
}

function switchToMapView() {
    if (mapViewBtn) mapViewBtn.classList.add('active');
    if (cardViewBtn) cardViewBtn.classList.remove('active');
    if (opportunityCardsContainer) opportunityCardsContainer.style.display = 'none';
    if (opportunitiesMapContainer) opportunitiesMapContainer.style.display = 'block';
    
    // Initialize map if not already done
    if (!map) {
        initOpportunitiesMap();
    }
}

function initOpportunitiesMap() {
    const mapContainer = document.getElementById('map-container');
    if (!mapContainer || !window.google) {
        console.log('Map container not found or Google Maps not loaded');
        return;
    }
    
    try {
        map = new google.maps.Map(mapContainer, {
            zoom: 11,
            center: unfLocation,
            mapTypeId: 'roadmap'
        });
        
        // UNF marker
        new google.maps.Marker({
            position: unfLocation,
            map: map,
            title: 'University of North Florida',
            icon: {
                url: 'data:image/svg+xml;base64,' + btoa(`
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#005082" width="40" height="40">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                `),
                scaledSize: new google.maps.Size(40, 40)
            }
        });
        
        // Add opportunity markers
        opportunities.forEach(opp => {
            const markerColor = getMarkerColor(opp.type);
            const marker = new google.maps.Marker({
                position: opp.coordinates,
                map: map,
                title: `${opp.title} - ${opp.company}`,
                icon: {
                    url: 'data:image/svg+xml;base64,' + btoa(`
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${markerColor}" width="30" height="30">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                    `),
                    scaledSize: new google.maps.Size(30, 30)
                }
            });
            
            const infoWindow = new google.maps.InfoWindow({
                content: `
                    <div style="max-width: 300px; padding: 10px;">
                        <h4 style="margin: 0 0 10px 0; color: #005082;">${opp.title}</h4>
                        <p style="margin: 5px 0; font-weight: bold;">${opp.company}</p>
                        <p style="margin: 5px 0;">${opp.location}</p>
                        <p style="margin: 5px 0;"><strong>Distance:</strong> ${opp.distanceFromUNF} miles from UNF</p>
                        <p style="margin: 5px 0;"><strong>Salary:</strong> ${opp.salary}</p>
                        <p style="margin: 5px 0;"><strong>Type:</strong> ${opp.type.charAt(0).toUpperCase() + opp.type.slice(1).replace('-', ' ')}</p>
                        <button onclick="openOpportunityDetail(${opp.id})" style="background: #005082; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; margin-top: 10px;">View Details</button>
                    </div>
                `
            });
            
            marker.addListener('click', () => {
                infoWindow.open(map, marker);
                
                // Log map interaction
                if (typeof notionService !== 'undefined') {
                    notionService.logMapInteraction({
                        type: 'marker_click',
                        opportunityId: opp.id,
                        opportunityTitle: opp.title,
                        company: opp.company
                    }).catch(error => {
                        console.error('Failed to log map interaction:', error);
                    });
                }
            });
        });
    } catch (error) {
        console.error('Error initializing opportunities map:', error);
        if (error.message && error.message.includes('ApiNotActivatedMapError')) {
            mapContainer.innerHTML = `
                <div style="padding: 30px; text-align: center; background: #f8f9fa; border-radius: 8px; border: 1px solid #dee2e6;">
                    <i class="fas fa-list" style="font-size: 2.5rem; color: #005082; margin-bottom: 15px;"></i>
                    <h4 style="color: #005082; margin-bottom: 10px;">Map View Temporarily Unavailable</h4>
                    <p style="color: #666; margin-bottom: 15px;">Switch to card view to browse opportunities by distance from UNF campus.</p>
                    <button onclick="switchToCardView()" style="background: #005082; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">
                        <i class="fas fa-th-large"></i> View Cards
                    </button>
                    <p style="font-size: 0.85rem; color: #888; margin-top: 15px;">Interactive map requires Google Maps API activation</p>
                </div>
            `;
        } else {
            mapContainer.innerHTML = '<p>Map could not be loaded. Please check your internet connection.</p>';
        }
    }
}

function getMarkerColor(type) {
    const colors = {
        'internship': '#4CAF50',
        'entry-level': '#2196F3',
        'part-time': '#FF9800',
        'full-time': '#9C27B0'
    };
    return colors[type] || '#666666';
}

// Global function to initialize maps (called by Google Maps API)
function initMaps() {
    console.log('Google Maps API loaded successfully');
    console.log('Google object available:', !!window.google);
    console.log('unfLocation:', unfLocation);
    console.log('Document ready state:', document.readyState);
    
    // Initialize full map
    const fullMapContainer = document.getElementById('full-map');
    console.log('Full map container found:', !!fullMapContainer);
    if (fullMapContainer && window.google) {
        try {
            console.log('Creating Google Maps instance...');
            const fullMap = new google.maps.Map(fullMapContainer, {
                zoom: 10,
                center: unfLocation,
                mapTypeId: 'roadmap'
            });
            console.log('Google Maps instance created successfully');
            
            // UNF marker
            new google.maps.Marker({
                position: unfLocation,
                map: fullMap,
                title: 'University of North Florida',
                icon: {
                    url: 'data:image/svg+xml;base64,' + btoa(`
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#005082" width="40" height="40">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                    `),
                    scaledSize: new google.maps.Size(40, 40)
                }
            });
            
            // Add opportunity markers
            enhancedOpportunities.forEach(opp => {
                const markerColor = getMarkerColor(opp.type);
                const marker = new google.maps.Marker({
                    position: opp.coordinates,
                    map: fullMap,
                    title: `${opp.title} - ${opp.company}`,
                    icon: {
                        url: 'data:image/svg+xml;base64,' + btoa(`
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${markerColor}" width="30" height="30">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                            </svg>
                        `),
                        scaledSize: new google.maps.Size(30, 30)
                    }
                });
                
                const distance = calculateDistance(unfLocation, opp.coordinates);
                const travelTime = calculateTravelTime(unfLocation, opp.coordinates);
                
                const infoWindow = new google.maps.InfoWindow({
                    content: `
                        <div style="max-width: 300px; padding: 10px;">
                            <h4 style="margin: 0 0 10px 0; color: #005082;">${opp.title}</h4>
                            <p style="margin: 5px 0; font-weight: bold;">${opp.company}</p>
                            <p style="margin: 5px 0;">${opp.location}</p>
                            <p style="margin: 5px 0;"><strong>Distance:</strong> ${distance} miles from UNF</p>
                            <p style="margin: 5px 0;"><strong>Travel Time:</strong> ${travelTime}</p>
                            <p style="margin: 5px 0;"><strong>Salary:</strong> ${opp.salary}</p>
                            <p style="margin: 5px 0;"><strong>Type:</strong> ${opp.type.charAt(0).toUpperCase() + opp.type.slice(1).replace('-', ' ')}</p>
                        </div>
                    `
                });
                
                marker.addListener('click', () => {
                    infoWindow.open(fullMap, marker);
                });
            });
        } catch (error) {
            console.error('Error initializing full map:', error);
            if (fullMapContainer) {
                if (error.message && error.message.includes('ApiNotActivatedMapError')) {
                    fullMapContainer.innerHTML = `
                        <div style="padding: 30px; text-align: center; background: #f8f9fa; border-radius: 8px; border: 2px dashed #dee2e6;">
                            <i class="fas fa-map-marked-alt" style="font-size: 3rem; color: #005082; margin-bottom: 15px;"></i>
                            <h3 style="color: #005082; margin-bottom: 10px;">Interactive Map (Demo Mode)</h3>
                            <p style="color: #666; margin-bottom: 15px;">Google Maps requires API activation for full functionality.</p>
                            <div style="background: white; padding: 15px; border-radius: 5px; margin: 15px 0;">
                                <strong>📍 UNF Campus Location:</strong><br>
                                1 UNF Drive, Jacksonville, FL 32224<br>
                                <small style="color: #666;">View opportunities by distance from campus below</small>
                            </div>
                            <p style="font-size: 0.9rem; color: #888;">
                                To enable full map functionality, activate the Maps JavaScript API for your Google Cloud project.
                            </p>
                        </div>
                    `;
                } else {
                    fullMapContainer.innerHTML = '<div style="padding: 20px; text-align: center; color: #666;">Map could not be loaded. Please refresh the page.</div>';
                }
            }
        }
    } else {
        console.log('Missing requirements - fullMapContainer:', !!fullMapContainer, 'google:', !!window.google);
    }
}

// Enhanced Search and filter functions
function performEnhancedSearch() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const searchLocation = document.getElementById('search-location')?.value || '';
    const searchType = document.getElementById('search-type')?.value || '';
    
    let filtered = opportunities;
    
    // Text search
    if (query) {
        filtered = filtered.filter(opp => 
            opp.title.toLowerCase().includes(query) ||
            opp.company.toLowerCase().includes(query) ||
            opp.description.toLowerCase().includes(query) ||
            (opp.detailedDescription && opp.detailedDescription.toLowerCase().includes(query)) ||
            opp.tags.some(tag => tag.toLowerCase().includes(query)) ||
            opp.location.toLowerCase().includes(query) ||
            opp.requirements.some(req => req.toLowerCase().includes(query)) ||
            opp.benefits.some(benefit => benefit.toLowerCase().includes(query))
        );
    }
    
    // Location filter from search
    if (searchLocation) {
        filtered = applyLocationFilter(filtered, searchLocation);
    }
    
    // Type filter from search
    if (searchType) {
        filtered = filtered.filter(opp => opp.type === searchType);
    }
    
    displayOpportunityCards(filtered);
}

// Legacy function for compatibility
function performSearch() {
    performEnhancedSearch();
}

// Search suggestions
function showSearchSuggestions(query) {
    const suggestionsDiv = document.getElementById('search-suggestions');
    if (!suggestionsDiv) return;
    
    if (!query) {
        suggestionsDiv.style.display = 'none';
        return;
    }
    
    // Get unique job titles, companies, and tags
    const suggestions = new Set();
    
    opportunities.forEach(opp => {
        if (opp.title.toLowerCase().includes(query.toLowerCase())) {
            suggestions.add(opp.title);
        }
        if (opp.company.toLowerCase().includes(query.toLowerCase())) {
            suggestions.add(opp.company);
        }
        if (opp.tags) {
            opp.tags.forEach(tag => {
                if (tag.toLowerCase().includes(query.toLowerCase())) {
                    suggestions.add(tag);
                }
            });
        }
    });
    
    const suggestionArray = Array.from(suggestions).slice(0, 8);
    
    if (suggestionArray.length > 0) {
        suggestionsDiv.innerHTML = suggestionArray.map(s => 
            `<div class="search-suggestion-item" onclick="selectSuggestion('${s.replace(/'/g, "\\'")}')">\n                <i class="fas fa-search"></i> ${s}\n            </div>`
        ).join('');
        suggestionsDiv.style.display = 'block';
    } else {
        suggestionsDiv.style.display = 'none';
    }
}

function selectSuggestion(value) {
    searchInput.value = value;
    document.getElementById('search-suggestions').style.display = 'none';
    performEnhancedSearch();
}

// Debounce helper
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function applyLocationFilter(filtered, location) {
    if (location === 'near-unf') {
        return filtered.filter(opp => opp.distanceFromUNF <= 10);
    } else if (location === 'jacksonville') {
        return filtered.filter(opp => opp.location.includes('Jacksonville'));
    } else if (location === 'florida') {
        return filtered.filter(opp => opp.location.includes('FL'));
    } else if (location === 'remote') {
        return filtered.filter(opp => 
            opp.workEnvironment && opp.workEnvironment.toLowerCase().includes('remote'));
    } else if (location === 'hybrid') {
        return filtered.filter(opp => 
            opp.workEnvironment && opp.workEnvironment.toLowerCase().includes('hybrid'));
    }
    return filtered;
}

function applyFilters() {
    applyEnhancedFilters();
}

// Enhanced filter setup
function setupEnhancedFilters() {
    // Distance slider
    const distanceSlider = document.getElementById('distance-filter');
    const distanceValue = document.getElementById('distance-value');
    
    if (distanceSlider) {
        distanceSlider.addEventListener('input', function() {
            const value = this.value;
            if (distanceValue) {
                distanceValue.textContent = value === '0' ? 'Any' : `${value} miles`;
            }
            this.style.setProperty('--value', `${(value / 50) * 100}%`);
        });
    }
    
    // Major accordion
    document.querySelectorAll('.major-group-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const group = this.parentElement;
            group.classList.toggle('active');
        });
    });
    
    // Apply filters button
    const applyFiltersBtn = document.getElementById('apply-filters-btn');
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', applyEnhancedFilters);
    }
    
    // Clear filters button
    const clearFiltersBtn = document.getElementById('clear-filters');
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', clearAllFilters);
    }
    
    // Individual filter listeners
    document.getElementById('location-filter')?.addEventListener('change', updateActiveFilters);
    document.getElementById('salary-filter')?.addEventListener('change', updateActiveFilters);
    document.getElementById('company-size-filter')?.addEventListener('change', updateActiveFilters);
    document.getElementById('posted-filter')?.addEventListener('change', updateActiveFilters);
    
    document.querySelectorAll('.type-filter-checkbox').forEach(cb => {
        cb.addEventListener('change', updateActiveFilters);
    });
    
    document.querySelectorAll('.major-filter-checkbox').forEach(cb => {
        cb.addEventListener('change', updateActiveFilters);
    });
}

function updateActiveFilters() {
    const activeFiltersDiv = document.getElementById('active-filters');
    if (!activeFiltersDiv) return;
    
    const activeFilters = [];
    
    // Check all filters and collect active ones
    const location = document.getElementById('location-filter')?.value;
    if (location) activeFilters.push({ type: 'Location', value: location });
    
    const distance = document.getElementById('distance-filter')?.value;
    if (distance && distance !== '0') activeFilters.push({ type: 'Distance', value: `${distance} miles` });
    
    const selectedTypes = Array.from(document.querySelectorAll('.type-filter-checkbox:checked'));
    selectedTypes.forEach(cb => activeFilters.push({ type: 'Type', value: cb.parentElement.textContent.trim() }));
    
    const selectedMajors = Array.from(document.querySelectorAll('.major-filter-checkbox:checked'));
    selectedMajors.forEach(cb => activeFilters.push({ type: 'Major', value: cb.parentElement.textContent.trim() }));
    
    const salary = document.getElementById('salary-filter')?.value;
    if (salary) activeFilters.push({ type: 'Salary', value: salary });
    
    const companySize = document.getElementById('company-size-filter')?.value;
    if (companySize) activeFilters.push({ type: 'Company Size', value: companySize });
    
    const posted = document.getElementById('posted-filter')?.value;
    if (posted) activeFilters.push({ type: 'Posted', value: posted });
    
    // Display active filters
    if (activeFilters.length > 0) {
        activeFiltersDiv.innerHTML = activeFilters.map(filter => 
            `<span class="active-filter-tag">\n                ${filter.type}: ${filter.value}\n                <button onclick="removeFilter('${filter.type}', '${filter.value}')">×</button>\n            </span>`
        ).join('');
    } else {
        activeFiltersDiv.innerHTML = '';
    }
}

function clearAllFilters() {
    // Clear all select filters
    const locationFilter = document.getElementById('location-filter');
    if (locationFilter) locationFilter.value = '';
    
    const salaryFilter = document.getElementById('salary-filter');
    if (salaryFilter) salaryFilter.value = '';
    
    const companySizeFilter = document.getElementById('company-size-filter');
    if (companySizeFilter) companySizeFilter.value = '';
    
    const postedFilter = document.getElementById('posted-filter');
    if (postedFilter) postedFilter.value = '';
    
    const distanceFilter = document.getElementById('distance-filter');
    if (distanceFilter) {
        distanceFilter.value = '0';
        const distanceValue = document.getElementById('distance-value');
        if (distanceValue) distanceValue.textContent = 'Any';
    }
    
    // Clear all checkboxes
    document.querySelectorAll('.type-filter-checkbox').forEach(cb => cb.checked = false);
    document.querySelectorAll('.major-filter-checkbox').forEach(cb => cb.checked = false);
    
    // Clear search
    if (searchInput) searchInput.value = '';
    const searchLocation = document.getElementById('search-location');
    if (searchLocation) searchLocation.value = '';
    const searchType = document.getElementById('search-type');
    if (searchType) searchType.value = '';
    
    // Clear active filters display
    updateActiveFilters();
    
    // Show all opportunities
    displayOpportunityCards(opportunities, 50, true);
}

function removeFilter(type, value) {
    // Remove specific filter and reapply
    // Implementation depends on filter type
    // For simplicity, just reapply
    applyEnhancedFilters();
}

function applyEnhancedFilters() {
    const locationValue = locationFilter ? locationFilter.value : '';
    const typeValue = typeFilter ? typeFilter.value : '';
    const majorValue = majorFilter ? majorFilter.value : '';
    const distanceValue = distanceFilter ? distanceFilter.value : '';
    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
    
    let filteredOpportunities = opportunities;
    
    // Apply search filter
    if (searchTerm) {
        filteredOpportunities = filteredOpportunities.filter(opp => 
            opp.title.toLowerCase().includes(searchTerm) ||
            opp.company.toLowerCase().includes(searchTerm) ||
            opp.description.toLowerCase().includes(searchTerm) ||
            (opp.detailedDescription && opp.detailedDescription.toLowerCase().includes(searchTerm)) ||
            opp.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
            opp.location.toLowerCase().includes(searchTerm) ||
            opp.requirements.some(req => req.toLowerCase().includes(searchTerm)) ||
            opp.benefits.some(benefit => benefit.toLowerCase().includes(searchTerm))
        );
    }
    
    // Apply location filter
    if (locationValue) {
        filteredOpportunities = filteredOpportunities.filter(opp => {
            if (locationValue === 'remote') return opp.location.toLowerCase().includes('remote');
            if (locationValue === 'near-unf') return opp.distanceFromUNF <= 10;
            if (locationValue === 'jacksonville') return opp.location.toLowerCase().includes('jacksonville');
            if (locationValue === 'florida') return opp.location.toLowerCase().includes('fl');
            return true;
        });
    }
    
    // Apply type filter
    if (typeValue) {
        filteredOpportunities = filteredOpportunities.filter(opp => opp.type === typeValue);
    }
    
    // Apply major filter
    if (majorValue) {
        filteredOpportunities = filteredOpportunities.filter(opp => opp.major === majorValue);
    }
    
    // Apply distance filter
    if (distanceValue) {
        const maxDistance = parseInt(distanceValue);
        filteredOpportunities = filteredOpportunities.filter(opp => opp.distanceFromUNF <= maxDistance);
    }
    
    displayOpportunityCards(filteredOpportunities);
}

function toggleQuickFilter(btn) {
    const filterType = btn.dataset.type;
    
    // Toggle active state
    btn.classList.toggle('active');
    
    // Update appropriate filter dropdown
    if (btn.classList.contains('active')) {
        if (filterType === 'near-unf') {
            if (distanceFilter) distanceFilter.value = '10';
        } else {
            if (typeFilter) typeFilter.value = filterType;
        }
    } else {
        if (filterType === 'near-unf') {
            if (distanceFilter) distanceFilter.value = '';
        } else {
            if (typeFilter) typeFilter.value = '';
        }
    }
    
    // Remove active class from other quick filter buttons
    quickFilterBtns.forEach(otherBtn => {
        if (otherBtn !== btn && otherBtn.dataset.type !== 'near-unf') {
            otherBtn.classList.remove('active');
        }
    });
    
    applyFilters();
}

function switchMajorTab(btn) {
    const tabId = btn.dataset.tab;
    
    // Update active tab button
    tabBtns.forEach(tab => tab.classList.remove('active'));
    btn.classList.add('active');
    
    // Display major category content
    displayMajorCategory(tabId);
}

function displayMajorCategory(categoryId) {
    const category = majorCategories[categoryId];
    if (!category || !majorsContent) return;
    
    majorsContent.innerHTML = `
        <div class="major-category active">
            <h3>${category.title}</h3>
            <p style="text-align: center; margin-bottom: 2rem; color: #666;">${category.description}</p>
            <div class="major-grid">
                ${category.majors.map(major => `
                    <div class="major-card" onclick="filterByMajor('${major.name.toLowerCase().replace(/\s+/g, '-')}')">
                        <i class="${major.icon}"></i>
                        <h4>${major.name}</h4>
                        <p>Explore career opportunities in ${major.name.toLowerCase()}</p>
                        <div class="major-jobs-count">${major.jobs} opportunities</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function filterByMajor(majorSlug) {
    // Map major slugs to filter values
    const majorMap = {
        'business-administration': 'business',
        'marketing': 'business',
        'finance': 'business',
        'management': 'business',
        'accounting': 'business',
        'software-engineering': 'computer-science',
        'web-development': 'computer-science',
        'data-science': 'computer-science',
        'cybersecurity': 'computer-science',
        'mobile-development': 'computer-science',
        'mechanical-engineering': 'engineering',
        'civil-engineering': 'engineering',
        'electrical-engineering': 'engineering',
        'industrial-engineering': 'engineering',
        'environmental-engineering': 'engineering',
        'elementary-education': 'education',
        'secondary-education': 'education',
        'special-education': 'education',
        'educational-leadership': 'education',
        'school-counseling': 'education',
        'nursing': 'health-sciences',
        'health-administration': 'health-sciences',
        'physical-therapy': 'health-sciences',
        'public-health': 'health-sciences',
        'medical-technology': 'health-sciences',
        'graphic-design': 'arts',
        'communications': 'arts',
        'english-literature': 'arts',
        'fine-arts': 'arts',
        'journalism': 'arts',
        'public-administration': 'public',
        'criminal-justice': 'public',
        'political-science': 'public',
        'social-work': 'public',
        'urban-planning': 'public'
    };
    
    const filterValue = majorMap[majorSlug] || '';
    if (majorFilter) majorFilter.value = filterValue;
    
    // Scroll to opportunities section and apply filter
    const opportunitiesSection = document.getElementById('opportunities');
    if (opportunitiesSection) {
        opportunitiesSection.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
            applyFilters();
        }, 500);
    }
}

function toggleMobileMenu() {
    if (hamburger) hamburger.classList.toggle('active');
    if (navMenu) navMenu.classList.toggle('active');
}

function setActiveNavLink(activeLink) {
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        const id = section.getAttribute('id');
        
        if (scrollPos >= top && scrollPos <= bottom) {
            const correspondingLink = document.querySelector(`a[href="#${id}"]`);
            if (correspondingLink) {
                setActiveNavLink(correspondingLink);
            }
        }
    });
}

function trackButtonClick(buttonType, buttonText, targetValue, section) {
    const buttonData = {
        buttonType,
        buttonText,
        targetValue,
        section
    };
    
    // Log to Notion
    if (typeof notionService !== 'undefined') {
        notionService.logButtonClick(buttonData).catch(error => {
            console.error('Failed to log button click to Notion:', error);
        });
    }
    
    // Also log to console for debugging
    console.log('Button clicked:', buttonData);
}

// Setup functions for other features
function setupFeedbackListeners() {
    const feedbackToggle = document.getElementById('feedback-toggle');
    const feedbackPanel = document.getElementById('feedback-panel');
    const feedbackClose = document.getElementById('feedback-close');
    const feedbackForm = document.getElementById('feedback-form');
    
    if (feedbackToggle) {
        feedbackToggle.addEventListener('click', function() {
            trackButtonClick('feedback', 'Feedback Toggle', feedbackPanel.classList.contains('active') ? 'close' : 'open', 'feedback');
            feedbackPanel.classList.toggle('active');
        });
    }
    
    if (feedbackClose) {
        feedbackClose.addEventListener('click', function() {
            trackButtonClick('feedback', 'Feedback Close', 'close', 'feedback');
            feedbackPanel.classList.remove('active');
        });
    }
    
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            trackButtonClick('feedback', 'Feedback Submit', 'submit', 'feedback');
            submitFeedback();
        });
    }
    
    // Close feedback panel when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.feedback-bubble')) {
            if (feedbackPanel) feedbackPanel.classList.remove('active');
        }
    });
}

function submitFeedback() {
    const feedbackType = document.getElementById('feedback-type');
    const feedbackMessage = document.getElementById('feedback-message');
    const feedbackEmail = document.getElementById('feedback-email');
    
    if (!feedbackType || !feedbackMessage || !feedbackType.value || !feedbackMessage.value) {
        alert('Please fill in all required fields.');
        return;
    }
    
    const feedbackData = {
        type: feedbackType.value,
        message: feedbackMessage.value,
        email: feedbackEmail ? feedbackEmail.value : '',
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
    };
    
    // Log to Notion
    if (typeof notionService !== 'undefined') {
        notionService.logFeedback(feedbackData).catch(error => {
            console.error('Failed to log feedback to Notion:', error);
        });
    }
    
    // Also log to console for debugging
    console.log('Feedback submitted:', feedbackData);
    
    // Show success message
    showFeedbackSuccess();
    
    // Clear form
    if (feedbackType) feedbackType.value = '';
    if (feedbackMessage) feedbackMessage.value = '';
    if (feedbackEmail) feedbackEmail.value = '';
}

function showFeedbackSuccess() {
    const feedbackForm = document.getElementById('feedback-form');
    const feedbackSuccess = document.getElementById('feedback-success');
    
    if (feedbackForm && feedbackSuccess) {
        // Hide form and show success message
        feedbackForm.style.display = 'none';
        feedbackSuccess.style.display = 'block';
        
        // Reset after 3 seconds
        setTimeout(() => {
            feedbackForm.style.display = 'block';
            feedbackSuccess.style.display = 'none';
            
            // Close feedback panel
            const feedbackPanel = document.getElementById('feedback-panel');
            if (feedbackPanel) feedbackPanel.classList.remove('active');
        }, 3000);
    }
}

function setupSortingListeners() {
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            sortOpportunities(this.value);
        });
    }
}

function sortOpportunities(sortBy) {
    let sortedOpportunities = [...opportunities];
    
    switch (sortBy) {
        case 'distance':
            sortedOpportunities.sort((a, b) => a.distanceFromUNF - b.distanceFromUNF);
            break;
        case 'title':
            sortedOpportunities.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'company':
            sortedOpportunities.sort((a, b) => a.company.localeCompare(b.company));
            break;
        case 'salary':
            sortedOpportunities.sort((a, b) => {
                const getSalaryValue = (salary) => {
                    const match = salary.match(/\d+/);
                    return match ? parseInt(match[0]) : 0;
                };
                return getSalaryValue(b.salary) - getSalaryValue(a.salary);
            });
            break;
        case 'posted':
        default:
            sortedOpportunities.sort((a, b) => {
                const getDateValue = (posted) => {
                    if (posted.includes('day')) return parseInt(posted.match(/\d+/)?.[0] || '0');
                    if (posted.includes('week')) return parseInt(posted.match(/\d+/)?.[0] || '0') * 7;
                    return 0;
                };
                return getDateValue(a.posted) - getDateValue(b.posted);
            });
            break;
    }
    
    // Update the global opportunities array and apply current filters
    opportunities = sortedOpportunities;
    applyFilters();
}

function setupScrollToTop() {
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    if (scrollToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });
        
        // Handle click
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

function showApplicationModal(opportunity) {
    const modal = document.createElement('div');
    modal.className = 'application-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Apply for ${opportunity.title}</h3>
                <button class="close-modal" onclick="closeApplicationModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="application-info">
                    <p><strong>Company:</strong> ${opportunity.company}</p>
                    <p><strong>Location:</strong> ${opportunity.location}</p>
                    <p><strong>Distance from UNF:</strong> ${opportunity.distanceFromUNF} miles</p>
                    <p><strong>Salary:</strong> ${opportunity.salary}</p>
                    <p><strong>Work Environment:</strong> ${opportunity.workEnvironment || 'Office-based'}</p>
                </div>
                <form id="application-form">
                    <div class="form-group">
                        <label for="applicant-name">Full Name: *</label>
                        <input type="text" id="applicant-name" required>
                    </div>
                    <div class="form-group">
                        <label for="applicant-email">Email Address: *</label>
                        <input type="email" id="applicant-email" required>
                    </div>
                    <div class="form-group">
                        <label for="applicant-phone">Phone Number:</label>
                        <input type="tel" id="applicant-phone">
                    </div>
                    <div class="form-group">
                        <label for="applicant-major">Major/Field of Study:</label>
                        <input type="text" id="applicant-major" placeholder="e.g., Computer Science, Business Administration">
                    </div>
                    <div class="form-group">
                        <label for="cover-letter">Cover Letter / Why are you interested?: *</label>
                        <textarea id="cover-letter" rows="5" placeholder="Tell us why you're interested in this position and what makes you a great fit..." required></textarea>
                    </div>
                    <div class="form-actions">
                        <button type="button" onclick="closeApplicationModal()">Cancel</button>
                        <button type="submit">Submit Application</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Handle form submission
    document.getElementById('application-form').addEventListener('submit', function(e) {
        e.preventDefault();
        submitApplication(opportunity);
    });
}

function submitApplication(opportunity) {
    const applicantName = document.getElementById('applicant-name');
    const applicantEmail = document.getElementById('applicant-email');
    const applicantPhone = document.getElementById('applicant-phone');
    const applicantMajor = document.getElementById('applicant-major');
    const coverLetter = document.getElementById('cover-letter');
    
    const formData = {
        name: applicantName ? applicantName.value : '',
        email: applicantEmail ? applicantEmail.value : '',
        phone: applicantPhone ? applicantPhone.value : '',
        major: applicantMajor ? applicantMajor.value : '',
        coverLetter: coverLetter ? coverLetter.value : '',
        jobId: opportunity.id,
        jobTitle: opportunity.title,
        company: opportunity.company,
        distance: `${opportunity.distanceFromUNF} miles`,
        location: opportunity.location
    };
    
    // Log to Notion
    if (typeof notionService !== 'undefined') {
        notionService.logJobApplication(formData).catch(error => {
            console.error('Failed to log application to Notion:', error);
        });
    }
    
    // Also log to console for debugging
    console.log('Application submitted:', formData);
    
    closeApplicationModal();
    
    // Show success message
    const successMsg = document.createElement('div');
    successMsg.className = 'success-notification';
    successMsg.innerHTML = `
        <div class="success-content">
            <div style="display: flex; align-items: center; gap: 15px;">
                <i class="fas fa-check-circle" style="font-size: 2rem; color: #4CAF50;"></i>
                <div>
                    <h4 style="margin: 0; color: #4CAF50;">Application Submitted Successfully!</h4>
                    <p style="margin: 5px 0 0 0; color: #666;">Your application for <strong>${opportunity.title}</strong> at <strong>${opportunity.company}</strong> has been submitted. You should hear back within 1-2 weeks.</p>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(successMsg);
    
    setTimeout(() => {
        if (document.body.contains(successMsg)) {
            document.body.removeChild(successMsg);
        }
    }, 7000);
}

function closeApplicationModal() {
    const modal = document.querySelector('.application-modal');
    if (modal) {
        document.body.removeChild(modal);
    }
}

// Add some dynamic behavior for better UX
window.addEventListener('load', function() {
    // Add a subtle loading animation
    const opportunityCards = document.querySelectorAll('.opportunity-card');
    opportunityCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Function to get major groups with icons
function getMajorGroups() {
    return {
        'business': { name: 'Business', icon: 'fas fa-briefcase' },
        'engineering': { name: 'Engineering', icon: 'fas fa-cogs' },
        'computer-science': { name: 'Computer Science', icon: 'fas fa-laptop-code' },
        'education': { name: 'Education', icon: 'fas fa-chalkboard-teacher' },
        'health-sciences': { name: 'Health Sciences', icon: 'fas fa-heartbeat' },
        'arts': { name: 'Arts & Letters', icon: 'fas fa-palette' },
        'public': { name: 'Public Service', icon: 'fas fa-balance-scale' },
        'sciences': { name: 'Sciences', icon: 'fas fa-flask' },
        'social-sciences': { name: 'Social Sciences', icon: 'fas fa-users' }
    };
}

// Navigate to major-specific page
function navigateToMajorPage(major) {
    // Track the navigation
    trackButtonClick('navigation', 'Major Page Navigation', major, 'major-navigation');
    
    // Store the selected major in sessionStorage
    sessionStorage.setItem('selectedMajor', major);
    
    // Update URL with major parameter
    const url = new URL(window.location);
    url.searchParams.set('major', major);
    window.history.pushState({ major }, '', url);
    
    // Display major-specific page
    showMajorPage(major);
}

// Show major-specific page with all results
function showMajorPage(major) {
    const majorGroups = getMajorGroups();
    const majorInfo = majorGroups[major] || { name: major, icon: 'fas fa-graduation-cap' };
    
    // Filter opportunities by major
    const majorOpportunities = opportunities.filter(opp => 
        opp.major === major || (opp.majors && opp.majors.includes(major))
    );
    
    // Update the page header
    const heroSection = document.querySelector('.hero-content h1');
    if (heroSection) {
        heroSection.innerHTML = `<i class="${majorInfo.icon}"></i> ${majorInfo.name} Career Opportunities`;
    }
    
    // Add back button
    const searchContainer = document.querySelector('.search-container');
    if (searchContainer && !document.querySelector('.back-to-all-btn')) {
        const backButton = document.createElement('button');
        backButton.className = 'back-to-all-btn';
        backButton.innerHTML = '<i class="fas fa-arrow-left"></i> Back to All Opportunities';
        backButton.style.cssText = 'margin-bottom: 20px; padding: 12px 24px; background: #005082; color: white; border: none; border-radius: 8px; cursor: pointer;';
        backButton.onclick = () => {
            window.history.back();
            location.reload();
        };
        searchContainer.parentNode.insertBefore(backButton, searchContainer);
    }
    
    // Display all opportunities for this major (no limit)
    displayOpportunityCards(majorOpportunities, majorOpportunities.length, false);
    
    // Scroll to opportunities section
    document.getElementById('opportunities').scrollIntoView({ behavior: 'smooth' });
    
    // Update filters to show current major
    if (majorFilter) {
        majorFilter.value = major;
    }
}

// Check URL parameters on page load
window.addEventListener('popstate', (event) => {
    if (event.state && event.state.major) {
        showMajorPage(event.state.major);
    } else {
        location.reload();
    }
});

// Initialize opportunity cards with animation-ready styles
const style = document.createElement('style');
style.textContent = `
    .opportunity-card {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    .requirements-list, .benefits-list {
        list-style: none;
        padding: 0;
    }
    
    .requirements-list li, .benefits-list li {
        padding: 8px 0;
        border-bottom: 1px solid #f0f0f0;
        position: relative;
        padding-left: 25px;
    }
    
    .requirements-list li:before {
        content: '✓';
        position: absolute;
        left: 0;
        color: #005082;
        font-weight: bold;
    }
    
    .benefits-list li:before {
        content: '★';
        position: absolute;
        left: 0;
        color: #ffd700;
        font-weight: bold;
    }
    
    .application-info {
        background: #f8f9fa;
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 20px;
        border-left: 4px solid #005082;
    }
    
    .success-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        padding: 20px;
        max-width: 400px;
        border-left: 4px solid #4CAF50;
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .map-note {
        margin-top: 10px;
        font-size: 0.9rem;
        color: #666;
        font-style: italic;
    }
`;
document.head.appendChild(style);

// Make initMaps globally accessible for Google Maps callback
window.initMaps = initMaps;

// Global error handler for Google Maps API
window.gm_authFailure = function() {
    console.error('Google Maps authentication failed');
    // Handle all map containers
    const mapContainers = document.querySelectorAll('#full-map, #map-container, [id^="detail-map-"]');
    mapContainers.forEach(container => {
        if (container) {
            container.innerHTML = `
                <div style="padding: 20px; text-align: center; background: #f8f9fa; border-radius: 8px; border: 1px solid #dee2e6;">
                    <i class="fas fa-exclamation-triangle" style="font-size: 2rem; color: #ffc107; margin-bottom: 10px;"></i>
                    <h4 style="color: #005082;">Maps Temporarily Unavailable</h4>
                    <p style="color: #666;">Google Maps API authentication failed.</p>
                </div>
            `;
        }
    });
};

// Initialize page and check for resume filters
document.addEventListener('DOMContentLoaded', function() {
    checkResumeFilters();
});