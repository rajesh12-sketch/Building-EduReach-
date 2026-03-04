export interface Course {
  courseId: string;
  courseName: string;
  duration: string;
  mode: 'Online' | 'Hybrid' | 'On-Campus';
  intake: string;
  availability: 'Open' | 'Limited Seats' | 'Closed';
  description: string;
}

export interface Sector {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  description: string;
  courses: Course[];
}

export const programSectors: Sector[] = [
  {
    id: '1',
    name: 'Computer Science Engineering',
    slug: 'computer-science-engineering',
    iconName: 'Code',
    description: 'Build the future with cutting-edge software engineering and computing skills.',
    courses: [
      {
        courseId: 'cse-001',
        courseName: 'BSc Computer Science',
        duration: '4 Years',
        mode: 'On-Campus',
        intake: 'Fall 2026',
        availability: 'Open',
        description: 'Comprehensive foundation in algorithms, data structures, and software development.',
      },
      {
        courseId: 'cse-002',
        courseName: 'MSc Software Engineering',
        duration: '2 Years',
        mode: 'Hybrid',
        intake: 'Spring 2026',
        availability: 'Limited Seats',
        description: 'Advanced software architecture, agile methodologies, and scalable systems.',
      },
      {
        courseId: 'cse-003',
        courseName: 'BEng Cybersecurity',
        duration: '4 Years',
        mode: 'On-Campus',
        intake: 'Fall 2026',
        availability: 'Open',
        description: 'Learn to protect networks, systems, and data from digital attacks.',
      },
      {
        courseId: 'cse-004',
        courseName: 'Cloud Computing & DevOps',
        duration: '1 Year',
        mode: 'Online',
        intake: 'Spring 2026',
        availability: 'Closed',
        description: 'Master AWS, Azure, Docker, and Kubernetes for modern deployment.',
      },
      {
        courseId: 'cse-005',
        courseName: 'BSc Data Structures & Algorithms',
        duration: '3 Years',
        mode: 'On-Campus',
        intake: 'Fall 2026',
        availability: 'Open',
        description: 'Deep dive into computational theory and advanced algorithm design.',
      },
      {
        courseId: 'cse-006',
        courseName: 'Full Stack Web Development',
        duration: '1 Year',
        mode: 'Online',
        intake: 'Spring 2026',
        availability: 'Limited Seats',
        description: 'Intensive bootcamp covering React, Node.js, databases, and modern web architecture.',
      },
      {
        courseId: 'cse-007',
        courseName: 'Mobile App Development',
        duration: '1.5 Years',
        mode: 'Hybrid',
        intake: 'Fall 2026',
        availability: 'Open',
        description: 'Build native and cross-platform applications for iOS and Android.',
      }
    ]
  },
  {
    id: '2',
    name: 'Business Administration & Management',
    slug: 'business-administration',
    iconName: 'Briefcase',
    description: 'Develop leadership skills and strategic thinking for the global business landscape.',
    courses: [
      {
        courseId: 'bus-001',
        courseName: 'MBA Global Business',
        duration: '2 Years',
        mode: 'Hybrid',
        intake: 'Fall 2026',
        availability: 'Open',
        description: 'Executive leadership program focusing on international markets and strategy.',
      },
      {
        courseId: 'bus-002',
        courseName: 'BBA International Business',
        duration: '3 Years',
        mode: 'On-Campus',
        intake: 'Fall 2026',
        availability: 'Limited Seats',
        description: 'Foundational business principles with a global perspective.',
      },
      {
        courseId: 'bus-003',
        courseName: 'MSc Marketing Analytics',
        duration: '1.5 Years',
        mode: 'Online',
        intake: 'Spring 2026',
        availability: 'Open',
        description: 'Data-driven marketing strategies and consumer behavior analysis.',
      },
      {
        courseId: 'bus-004',
        courseName: 'MSc Finance & FinTech',
        duration: '2 Years',
        mode: 'On-Campus',
        intake: 'Fall 2026',
        availability: 'Closed',
        description: 'Intersection of traditional finance and modern financial technologies.',
      },
      {
        courseId: 'bus-005',
        courseName: 'Entrepreneurship & Innovation',
        duration: '1 Year',
        mode: 'Hybrid',
        intake: 'Spring 2026',
        availability: 'Open',
        description: 'Learn how to build, scale, and fund your own startup.',
      },
      {
        courseId: 'bus-006',
        courseName: 'Supply Chain Management',
        duration: '2 Years',
        mode: 'On-Campus',
        intake: 'Fall 2026',
        availability: 'Limited Seats',
        description: 'Master global logistics, procurement, and sustainable supply chains.',
      },
      {
        courseId: 'bus-007',
        courseName: 'Human Resource Management',
        duration: '1.5 Years',
        mode: 'Online',
        intake: 'Spring 2026',
        availability: 'Open',
        description: 'Strategic talent acquisition, organizational behavior, and employee relations.',
      }
    ]
  },
  {
    id: '3',
    name: 'Data Science & Technology',
    slug: 'data-science',
    iconName: 'Database',
    description: 'Transform raw data into actionable insights and intelligent systems.',
    courses: [
      {
        courseId: 'ds-001',
        courseName: 'MSc Data Science',
        duration: '2 Years',
        mode: 'Hybrid',
        intake: 'Fall 2026',
        availability: 'Limited Seats',
        description: 'Advanced statistical modeling, machine learning, and data visualization.',
      },
      {
        courseId: 'ds-002',
        courseName: 'AI & Machine Learning',
        duration: '1 Year',
        mode: 'Online',
        intake: 'Spring 2026',
        availability: 'Open',
        description: 'Deep learning, neural networks, and predictive modeling.',
      },
      {
        courseId: 'ds-003',
        courseName: 'Big Data Engineering',
        duration: '1.5 Years',
        mode: 'On-Campus',
        intake: 'Fall 2026',
        availability: 'Open',
        description: 'Building scalable data pipelines and distributed computing systems.',
      },
      {
        courseId: 'ds-004',
        courseName: 'Business Analytics',
        duration: '1 Year',
        mode: 'Hybrid',
        intake: 'Spring 2026',
        availability: 'Closed',
        description: 'Applying data science techniques to solve business problems.',
      },
      {
        courseId: 'ds-005',
        courseName: 'Data Visualization & Storytelling',
        duration: '6 Months',
        mode: 'Online',
        intake: 'Spring 2026',
        availability: 'Open',
        description: 'Master Tableau, PowerBI, and D3.js to communicate complex data effectively.',
      },
      {
        courseId: 'ds-006',
        courseName: 'Natural Language Processing',
        duration: '1 Year',
        mode: 'Hybrid',
        intake: 'Fall 2026',
        availability: 'Limited Seats',
        description: 'Build LLMs, chatbots, and text analysis tools using modern NLP frameworks.',
      },
      {
        courseId: 'ds-007',
        courseName: 'Deep Learning Applications',
        duration: '1.5 Years',
        mode: 'On-Campus',
        intake: 'Fall 2026',
        availability: 'Open',
        description: 'Advanced neural networks for computer vision, audio processing, and generative AI.',
      }
    ]
  },
  {
    id: '4',
    name: 'Psychology & Humanities',
    slug: 'psychology-humanities',
    iconName: 'Brain',
    description: 'Explore the human mind, behavior, and societal dynamics.',
    courses: [
      {
        courseId: 'psy-001',
        courseName: 'BSc Psychology',
        duration: '3 Years',
        mode: 'On-Campus',
        intake: 'Fall 2026',
        availability: 'Open',
        description: 'Fundamental concepts in cognitive, developmental, and social psychology.',
      },
      {
        courseId: 'psy-002',
        courseName: 'MSc Clinical Psychology',
        duration: '2 Years',
        mode: 'On-Campus',
        intake: 'Fall 2026',
        availability: 'Limited Seats',
        description: 'Advanced training in psychological assessment and therapeutic interventions.',
      },
      {
        courseId: 'psy-003',
        courseName: 'Behavioral Science',
        duration: '1.5 Years',
        mode: 'Hybrid',
        intake: 'Spring 2026',
        availability: 'Open',
        description: 'Interdisciplinary study of human action and interaction.',
      },
      {
        courseId: 'psy-004',
        courseName: 'Cognitive Neuroscience',
        duration: '2 Years',
        mode: 'On-Campus',
        intake: 'Fall 2026',
        availability: 'Closed',
        description: 'Exploring the biological foundations of mental phenomena.',
      },
      {
        courseId: 'psy-005',
        courseName: 'Organizational Psychology',
        duration: '1.5 Years',
        mode: 'Online',
        intake: 'Spring 2026',
        availability: 'Open',
        description: 'Apply psychological principles to workplace dynamics and employee well-being.',
      },
      {
        courseId: 'psy-006',
        courseName: 'Child & Adolescent Development',
        duration: '2 Years',
        mode: 'On-Campus',
        intake: 'Fall 2026',
        availability: 'Limited Seats',
        description: 'Specialized study of psychological growth from infancy through adolescence.',
      },
      {
        courseId: 'psy-007',
        courseName: 'Forensic Psychology',
        duration: '1 Year',
        mode: 'Hybrid',
        intake: 'Spring 2026',
        availability: 'Open',
        description: 'Intersection of psychology and the legal and criminal justice systems.',
      }
    ]
  },
  {
    id: '5',
    name: 'Artificial Intelligence & Emerging Tech',
    slug: 'ai-emerging-tech',
    iconName: 'Cpu',
    description: 'Pioneer the next generation of technological breakthroughs.',
    courses: [
      {
        courseId: 'ai-001',
        courseName: 'Robotics Engineering',
        duration: '4 Years',
        mode: 'On-Campus',
        intake: 'Fall 2026',
        availability: 'Limited Seats',
        description: 'Design, construction, and operation of robotic systems.',
      },
      {
        courseId: 'ai-002',
        courseName: 'AI Product Management',
        duration: '1 Year',
        mode: 'Online',
        intake: 'Spring 2026',
        availability: 'Open',
        description: 'Managing the lifecycle of AI-driven products and services.',
      },
      {
        courseId: 'ai-003',
        courseName: 'Blockchain Technologies',
        duration: '1.5 Years',
        mode: 'Hybrid',
        intake: 'Fall 2026',
        availability: 'Open',
        description: 'Decentralized systems, smart contracts, and cryptography.',
      },
      {
        courseId: 'ai-004',
        courseName: 'Quantum Computing Fundamentals',
        duration: '1 Year',
        mode: 'Online',
        intake: 'Spring 2026',
        availability: 'Closed',
        description: 'Introduction to quantum mechanics, qubits, and quantum algorithms.',
      },
      {
        courseId: 'ai-005',
        courseName: 'Computer Vision Systems',
        duration: '1.5 Years',
        mode: 'On-Campus',
        intake: 'Fall 2026',
        availability: 'Open',
        description: 'Teaching machines to interpret and understand the visual world.',
      },
      {
        courseId: 'ai-006',
        courseName: 'Autonomous Systems & Drones',
        duration: '2 Years',
        mode: 'Hybrid',
        intake: 'Spring 2026',
        availability: 'Limited Seats',
        description: 'Engineering self-navigating vehicles and aerial drone technology.',
      },
      {
        courseId: 'ai-007',
        courseName: 'Ethics in Artificial Intelligence',
        duration: '6 Months',
        mode: 'Online',
        intake: 'Fall 2026',
        availability: 'Open',
        description: 'Addressing bias, fairness, and the societal impact of AI technologies.',
      }
    ]
  }
];
