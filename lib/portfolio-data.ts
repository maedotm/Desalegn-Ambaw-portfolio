export const profile = {
  name: 'Desalegn Ambaw (Ph.D.)',
  title: 'Scholar · Public Policy Expert · Governance Specialist',
  tagline:
    'Researching federalism, governance, infrastructure equity, and nation-building in Ethiopia.',
  location: 'Ethiopia',
  email: 'Contact through this website',
  portrait:
    './images/Desalegn.png',
  bio: `Desalegn Ambaw (Ph.D.) is a scholar of federalism, governance, and development policy, specializing in Ethiopia's institutional transformation and nation-building processes. His career combines high-level public executive leadership with rigorous academic research into federal institutions, development planning, infrastructure governance, and territorial equity.

He is the author of Building the Nation: Infrastructure, Equity, and Federalism in Ethiopia, published by Palgrave Macmillan / Springer Nature.`,
  shortBio:
    'Scholar, public policy expert, governance specialist, and senior public executive working at the intersection of federalism, institutional capacity, infrastructure equity, and inclusive development.',
stats: [
  { value: '8', label: 'Published Works', href: '/books' },
  { value: '6', label: 'Core Research Areas', href: '/#research' },
  { value: '4', label: 'Senior Public Roles', href: '/about#timeline' },
  { value: '7+', label: 'Journal Venues', href: '/books' },
],
};

export const researchAreas = [
  {
    title: 'Federalism & Intergovernmental Relations',
    description:
      'Examining the institutions, history, and design of federal systems and the relationships that shape territorial governance.',
    icon: 'globe',
    image:
      'https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tags: ['Federalism', 'Institutions', 'Governance'],
  },
  {
    title: 'Infrastructure Equity & Governance',
    description:
      'Studying how roads, electricity, telecommunications, universities, airports, and industrial parks are distributed across regions.',
    icon: 'landmark',
    image:
      'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tags: ['Infrastructure', 'Equity', 'Public Policy'],
  },
  {
    title: 'State-Building & Inclusive Development',
    description:
      'Connecting institutional capacity, governance quality, public trust, and inclusive development to the broader nation-building process.',
    icon: 'building',
    image:
      'https://images.pexels.com/photos/373912/pexels-photo-373912.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tags: ['State-Building', 'Development', 'Inclusion'],
  },
];

export const books = [
  {
    id: 'building-the-nation',
    title: 'Building the Nation',
    subtitle: 'Infrastructure, Equity, and Federalism in Ethiopia',
    year: 'Published',
    publisher: 'Palgrave Macmillan / Springer Nature',
    pages: null,
    type: 'Book',
    cover: '/images/books/Building_the_nation.jpeg',
    link: 'https://link.springer.com/book/10.1007/978-3-032-25701-7',
    description:
      "Ethiopia presents a striking development paradox: substantial expansion of roads, electricity, telecommunications, universities, airports, and industrial parks has occurred alongside persistent regional disparities and political fragility. This book examines how the distribution of public infrastructure shapes governance, development outcomes, and the broader nation-building process in one of Africa's most diverse federal states.",
    status: 'published',
    color: {
      ink: '#0f172a',
      deep: '#111827',
      accent: '#d4af37',
      soft: '#f4efe8',
      pale: '#f8f7f3',
      panel: '#f8f7f3',
      chip: '#efe7d1',
    },
    premise:
      'Infrastructure equity—not merely investment volume or economic growth—is a decisive factor linking institutional capacity and governance quality to national cohesion.',
    question:
      'Why can rapid infrastructure development coexist with political fragmentation and weakened national cohesion?',
    framework: [
      'Institutional Capacity',
      'Governance Quality',
      'Infrastructure Equity',
      'Nation-Building',
    ],
    contributions: [
      'Redefines infrastructure equity beyond aggregate investment by evaluating the fairness of territorial distribution.',
      'Introduces a Composite Infrastructure Index to measure regional disparities across major infrastructure sectors.',
      'Establishes an Infrastructure Equity Index linking distributive outcomes to institutional and governance conditions.',
      'Shows how physical assets influence public trust, state legitimacy, regional development, and political inclusion.',
      'Offers an equitable allocation framework and a sequenced reform roadmap for institutional strengthening.',
      'Provides insights applicable to other multinational and developing federations facing territorial inequality.',
    ],
    methodology: [
      'Spatial analysis and structural equation modelling',
      'Primary field interviews and focus group discussions',
      'Cross-sectoral empirical evaluations',
    ],
    contents: [
      {
        part: 'Part I — Foundations: Theory and Conceptual Architecture',
        chapters: [
          'Chapter 1: Introduction: Why Equity Matters?',
          'Chapter 2: Theory of Equity in Development',
          'Chapter 3: Theoretical and Conceptual Model: Equity and Infrastructure in Ethiopia',
        ],
      },
      {
        part: 'Part II — The Federal Context: Institutions, History, and Design',
        chapters: ['Chapter 4: Ethiopian Federalism: Institutions, History, and Design'],
      },
      {
        part: 'Part III — Empirical Evidence: Measuring Regional Inequities',
        chapters: [
          'Chapter 5: The Macro View: Patterns of Growth and Gaps',
          'Chapter 6: Roads, Electricity, and Telecommunications: Who Gets What?',
          'Chapter 7: Strategic Investments: Universities, Airports, and Industrial Parks',
        ],
      },
      {
        part: 'Part IV — Synthesis, Policy, and the Future',
        chapters: [
          'Chapter 8: Infrastructure Equity Index: Linking Capacity, Governance, and Equity',
          'Chapter 9: Toward an Equitable Future: Conclusions and Reflections',
          'Appendices & Index',
        ],
      },
    ],
    audience: [
      'Scholars and researchers',
      'Policymakers and government officials',
      'Development practitioners',
      'Students of federal governance and public policy',
    ],
    access: 'Official publisher page: Palgrave Macmillan / Springer Nature',
  },
  {
    id: 'interrelationship-institutional-capacity',
    title: 'The Interrelationship among Institutional Capacity, Infrastructure Governance and Equity, and Nation-Building Process in Ethiopia',
    subtitle: 'Structural equation modeling and conceptual analysis',
    year: '2021',
    publisher: 'Public Organization Review',
    type: 'Journal article',
    cover: '/images/books/Public_organizationReview.png',
    link: 'https://link.springer.com/journal/11115',
    description:
      'This article empirically tests the interrelationship among institutional capacity, infrastructure governance, infrastructure equity, and the nation-building process in Ethiopia. It finds that infrastructure equity has a direct effect on national cohesion while institutional and governance variables operate largely through equity pathways.',
    status: 'published',
    color: {
      ink: '#111827',
      deep: '#1f2937',
      accent: '#cbd5e1',
      soft: '#f8fafc',
      pale: '#ffffff',
      panel: '#f5f7fa',
      chip: '#e2e8f0',
    },
  },
  {
    id: 'decision-making-social-justice',
    title: 'Impacts of decision-making process on social justice in the infrastructure equity in Ethiopia',
    subtitle: 'A democratic accountability perspective',
    year: '2022',
    publisher: 'International Review of Administrative Sciences',
    type: 'Journal article',
    cover: '/images/books/Public_organizationReview.png',
    link: 'https://journals.sagepub.com/doi/10.1177/00208523221093961',
    description:
      'This study examines how decision-making processes and democratic accountability shape social justice in infrastructure allocation in Ethiopia. It finds that weak public accountability and limited intergovernmental coordination sustain infrastructure inequity and social injustice.',
    status: 'published',
    color: {
      ink: '#1f2937',
      deep: '#111827',
      accent: '#f1f5f9',
      soft: '#f8fafc',
      pale: '#ffffff',
      panel: '#f3f4f6',
      chip: '#e5e7eb',
    },
  },
  {
    id: 'effects-institutional-capacity',
    title: 'Effects of institutional capacity, infrastructure governance, and equity on state- and nation-building processes in Ethiopia',
    subtitle: 'Evidence from interviews and focus groups',
    year: '2021',
    publisher: 'Journal of Infrastructure, Policy and Development',
    type: 'Journal article',
    cover: '/images/books/JournalOfInfrastructurePolicyDevelopment.png',
    link: 'https://systems.enpress-publisher.com/index.php/jipd/article/view/1301',
    description:
      'This paper links institutional capacity, infrastructure governance, and equity to the nation-building process in Ethiopia. It shows that coordination failures and uneven public investment undermine both state-building and national cohesion.',
    status: 'published',
    color: {
      ink: '#0b1f2a',
      deep: '#163440',
      accent: '#93c5fd',
      soft: '#eff6ff',
      pale: '#f8fbff',
      panel: '#edf6ff',
      chip: '#dbeafe',
    },
  },
  {
    id: 'infrastructure-inequity-social-justice',
    title: 'Impacts of infrastructure (in)equity and social (in)justice on democratic nation-building processes in Ethiopia',
    subtitle: 'Time-series, PCA, and structural equation modeling',
    year: '2022',
    publisher: 'Journal of Infrastructure, Policy and Development',
    type: 'Journal article',
    cover: '/images/books/JournalOfInfrastructurePolicyDevelopment.png',
    link: 'https://www.researchgate.net/publication/363417129_Impacts_of_infrastructure_inequity_and_social_injustice_on_democratic_nation-building_processes_in_Ethiopia',
    description:
      'This article analyses how infrastructure inequity and social injustice affect Ethiopia’s democratic nation-building process. It argues that equitable infrastructure access is a central condition of territorial justice, social inclusion, and democratic legitimacy.',
    status: 'published',
    color: {
      ink: '#1a1a1a',
      deep: '#2b2b2b',
      accent: '#d6d3d1',
      soft: '#f5f5f4',
      pale: '#ffffff',
      panel: '#f3f4f6',
      chip: '#e7e5e4',
    },
  },
  {
    id: 'infrastructure-inequity-poverty',
    title: 'Infrastructure inequities and its effect on poverty reduction across regional states in Ethiopia',
    subtitle: 'Regional disparity and sustainable development',
    year: '2022',
    publisher: 'Journal of Mega Infrastructure & Sustainable Development',
    type: 'Journal article',
    cover: '/images/books/Building_the_nation.jpeg',
    link: 'https://www.tandfonline.com/doi/full/10.1080/24724718.2022.2122671',
    description:
      'Using regional infrastructure analysis and a Composite Infrastructure Index, this work reveals uneven public investment across Ethiopian states and argues that infrastructure inequity significantly hampers poverty reduction and shared prosperity.',
    status: 'published',
    color: {
      ink: '#3f3a36',
      deep: '#292524',
      accent: '#d6b981',
      soft: '#f7f3ee',
      pale: '#fffaf4',
      panel: '#f9f5f0',
      chip: '#f3e8d8',
    },
  },
  {
    id: 'infrastructure-equity-airports-universities',
    title: 'Infrastructure equity issues of airports and universities across regional states in Ethiopia: A preliminary overview',
    subtitle: 'Comparative access and regional distribution',
    year: '2022',
    publisher: 'Journal of Infrastructure, Policy and Development',
    type: 'Journal article',
    cover: '/images/books/JournalOfInfrastructurePolicyDevelopment.png',
    link: 'https://www.enpress-publisher.com/journal/JIPD/6/1/10.24294/jipd.v6i1.1319',
    description:
      'This preliminary overview evaluates airport and university distribution across Ethiopia’s regional states by population-adjusted measures. It finds uneven distribution and demonstrates the need for a more equitable infrastructure allocation framework.',
    status: 'published',
    color: {
      ink: '#121826',
      deep: '#0f172a',
      accent: '#94a3b8',
      soft: '#f3f4f6',
      pale: '#ffffff',
      panel: '#eef2ff',
      chip: '#e2e8f0',
    },
  },
  {
    id: 'impacts-institutional-capacity-federation',
    title: 'The Impacts of Institutional Capacity, Infrastructure Governance and Equity on State-and-Nation-Building Processes in Ethiopia',
    subtitle: 'A policy and governance analysis',
    year: '2021',
    publisher: 'Management Theory and Studies for Rural Business and Infrastructure Development',
    type: 'Journal article',
    cover: '/images/books/THE_IMPACTS_OF_INSTITUTIONAL_CAPACITY_INFRASTRUCTURE_GOVERNANCE_AND_EQUITY_ON_STATE-AND-NATION-BUIL_cover.jpg',
    link: 'https://reference-global.com/article/10.15544/mts.2021.44',
    description:
      'This article finds that improving infrastructure equity would significantly strengthen Ethiopia’s nation-building process, while coordination failures and governance bottlenecks remain major obstacles to inclusive development.',
    status: 'published',
    color: {
      ink: '#111827',
      deep: '#0f172a',
      accent: '#f5d0a9',
      soft: '#fff7ed',
      pale: '#fffaf5',
      panel: '#fff7ed',
      chip: '#fed7aa',
    },
  },
];

export const timeline = [
  {
    year: 'Education',
    title: 'Ph.D. in Federalism and Governance Studies',
    place: 'Center for Federalism and Governance Studies, Addis Ababa University',
    description:
      'Advanced research training focused on federalism, governance, and institutional transformation.',
  },
  {
    year: 'Education',
    title: 'Master of Business Administration (MBA)',
    place: 'The Open University, United Kingdom',
    description:
      'Business and management education supporting a career across public leadership and institutional governance.',
  },
  {
    year: 'Public Executive',
    title: 'Chief Executive Officer',
    place: 'Ethiopian Deposit Insurance Fund (EDIF)',
    description: 'Senior leadership in financial-sector governance and public institutional management.',
  },
  {
    year: 'Public Executive',
    title: 'Executive Director',
    place: 'Institute of Foreign Affairs (IFA)',
    description: 'Executive leadership at a national institution working across foreign affairs and public policy.',
  },
  {
    year: 'Public Executive',
    title: 'State Minister',
    place: 'Ministry of Transport',
    description: 'Public executive leadership connected to national transport policy and infrastructure.',
  },
  {
    year: 'Public Executive',
    title: 'State Minister',
    place: 'Ministry of Urban Development and Construction',
    description: 'Public executive leadership connected to urban development, construction, and national infrastructure.',
  },
];

export const featuredBlogPosts = [
  {
    slug: 'infrastructure-equity-and-national-cohesion',
    title: 'Infrastructure Equity and National Cohesion',
    excerpt:
      'Why the fairness of infrastructure distribution can matter as much as the scale of investment in a federal state.',
    image: '/images/books/Building_the_nation.jpeg',
    date: '2026-07-23',
    tags: ['Infrastructure', 'Federalism'],
    readTime: '8 min',
  },
  {
    slug: 'governance-quality-and-development-outcomes',
    title: 'Governance Quality and Development Outcomes',
    excerpt:
      'Institutional capacity and transparent decision-making shape whether development reaches regions fairly.',
    image: '/images/books/JournalOfInfrastructurePolicyDevelopment.png',
    date: '2026-06-12',
    tags: ['Governance', 'Development'],
    readTime: '10 min',
  },
  {
    slug: 'federalism-institutions-and-nation-building',
    title: 'Federalism, Institutions, and Nation-Building',
    excerpt:
      'A closer look at the institutions and relationships that connect territorial governance with national cohesion.',
    image: '/images/books/THE_IMPACTS_OF_INSTITUTIONAL_CAPACITY_INFRASTRUCTURE_GOVERNANCE_AND_EQUITY_ON_STATE-AND-NATION-BUIL_cover.jpg',
    date: '2026-04-18',
    tags: ['Federalism', 'Nation-Building'],
    readTime: '7 min',
  },
];
