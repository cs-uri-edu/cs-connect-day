import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import './Program.css';


import swett from '../assets/speakers/swett.webp';
import puggioni from '../assets/speakers/puggioni.webp';
import littman from '../assets/speakers/littman.jpg';

import young from '../assets/speakers/young.jpg';
import chappell from '../assets/speakers/chappell.webp';
import flowers from '../assets/speakers/flowers.jpeg';
import durand from '../assets/speakers/durand.png';
import mazzone from '../assets/speakers/mazzone.jpg';

import aguirre from '../assets/speakers/aguirre.jpeg';

import luu from '../assets/speakers/luu.jpg';
import hampton from '../assets/speakers/hampton.jpeg';
import conti from '../assets/speakers/conti.webp';


// URI academic leadership opening CS Connect Day
const welcomeSpeakers = [
    {
        name: 'Pamela Swett',
        title: 'Dean',
        organization: 'College of Arts & Sciences',
        role: 'Welcome Speaker',
        image: swett,
        bio: 
        'Dr. Pamela Swett is Dean of the College of Arts and Sciences at the University of Rhode Island. She joined URI in July 2026 after more than two decades at McMaster University, where she served in several academic leadership roles, including Chair of the Department of History and Dean of the Faculty of Humanities. A historian of modern Germany and Europe, Dr. Swett is the author or editor of six books and numerous articles and book chapters examining political culture, commerce, and violence in Germany between 1918 and 1945. She earned her Ph.D. in Modern German and European History from Brown University.',
    },
    {
        name: 'Gavino Puggioni',
        title: 'Chair',
        organization: 'Department of Computer Science & Statistics',
        role: 'Welcome Speaker',
        image: puggioni,
        bio: 
            'Dr. Gavino Puggioni is Chair of the Department of Computer Science and Statistics and Associate Professor of Statistics at the University of Rhode Island. He joined URI in 2012 after completing postdoctoral fellowships at the University of North Carolina at Chapel Hill and Emory University. His research focuses on the development and application of Bayesian statistical methods, with interdisciplinary collaborations spanning environmental science, biology, medicine, epidemiology, economics, and other fields. Dr. Puggioni earned his M.S. and Ph.D. in Statistics from Duke University after completing his undergraduate and master’s studies in Economics at Bocconi University in Italy.',
    },
];


// Featured speaker information for the Fireside Chat
const firesideSpeakers = [
    {
        name: 'Michael L. Littman',
        title: 'Associate Provost for Artificial Intelligence',
        subtitle: 'University Professor of Computer Science',
        organization: 'Brown University',
        role: 'Featured Speaker',
        image: littman,
        bio:
            'Dr. Michael L. Littman is University Professor of Computer Science and Associate Provost for Artificial Intelligence at Brown University. His research, which focuses on machine learning and decision-making under uncertainty, has been recognized with three best-paper awards and three influential paper awards. He received an outstanding educator award for his contributions to AI teaching and outreach. Littman is a Fellow of the Association for the Advancement of Artificial Intelligence, the American Academy of Arts and Sciences, and the Association for Computing Machinery. He recently served as Division Director for Information and Intelligent Systems at the National Science Foundation. His book, "Code to Joy: Why Everyone Should Learn a Little Programming", was published in October 2023 by MIT Press. He chaired the panel that wrote the 2021 report for The One Hundred Year Study on Artificial Intelligence (AI100). He also co-chaired and co-authored the National AI R&D Strategic Plan (2023 update).',
    },
];


// Industry Panel participants
const industryPanelists = [
    {
        name: 'Eli Young',
        title: 'Co-founder & CEO',
        organization: 'AlgoArena',
        organizationUrl: 'https://algoarena.net/',
        role: 'Panelist',
        image: young,
        bio: 'Eli Young is the co-founder and CEO of AlgoArena, a platform for building, teaching, and assessing software skills in the AI era. AlgoArena combines AI-native software development and technical assessments with competitive programming, guided practice, and live classroom tools for computer science education. A recent computer science graduate of Swarthmore College, Eli also conducts research on AI-assisted programming, technical assessment, and computing education. His recent work includes research on assessing AI-assisted programming, teaching vibecoding, and live gamified CS classrooms, with projects accepted at SIGCSE Virtual 2026 and the 2026 CCSC Southeastern Conference.',
    },
    {
        name: 'Sam Chappell',
        title: 'Founder & CEO',
        organization: 'Axial Search',
        organizationUrl: 'https://axialsearch.com/',
        role: 'Panelist',
        image: chappell,
        bio: 'Sam Chappell is the founder and CEO of  Axial Search, an executive search and recruitment firm specializing in AI, machine learning and data. He recruits everyone from AI/ML engineers to the executives who own the strategy. His clients range from early-stage startups to established enterprise-scale businesses, so he sees how these teams are built at every stage of growth.',
    },
    {
        name: 'Cam Flowers',
        title: 'Sr. Manager of AI Delivery & Partner Deployments',
        organization: 'CodePath',
        organizationUrl: 'https://www.codepath.org/',
        role: 'Panelist',
        image: flowers,
        bio: 'Cam Flowers is a senior software engineer, technology entrepreneur, and adjunct lecturer of computer science originally from Chicago, Illinois, and currently based in Atlanta, Georgia. At CodePath, he serves as the Senior Manager of AI Delivery and Partner Deployments, where he co-leads the Applied AI Engineering Pathway. This three-course program guides university students from AI fundamentals into applied AI fellowships across the country. This includes most notably the Claude Corps, a national, paid initiative launched in partnership with Anthropic that places early-career professionals at U.S. nonprofits to apply artificial intelligence to real-world problems.',
    },
    {
        name: 'Liz Durand',
        title: 'Global Talent Acquisition Analytics Lead',
        organization: 'Schneider Electric',
        organizationUrl: 'https://careers.se.com/us-early-careers',
        role: 'Panelist',
        image: durand,
        bio: 'Liz Durand is the Global Talent Acquisition Analytics Lead at Schneider Electric, where Liz leads global talent analytics and workforce insights initiatives that help drive data-informed hiring and talent strategies. With experience spanning talent acquisition, analytics, process transformation, and technology, Liz is passionate about using data and AI to improve how organizations attract, engage, and develop talent. Liz enjoys connecting students and early-career professionals with opportunities to explore careers in technology and the future of work.',
    },
];


// Industry Panel moderator
const industryModerator = {
    name: 'Joe Mazzone',
    title: 'Co-Founder & CEO',
    organization: 'CuraCourse',
    organizationUrl: 'https://www.curacourse.com/',
    role: 'Moderator',
    image: mazzone,
    bio: 'Joe Mazzone is the co-founder and CEO of CuraCourse, a platform for authoring and delivering interactive, personalized, and adaptive course materials, and the founder and executive director of the Computing Education Alliance, a Rhode Island nonprofit working to expand access to computing education. He has previously worked as a Director of Product Development and as an Engineering Manager at companies in the technology industry. He spent a decade as a CTE computer science teacher and department coordinator, for which he received multiple honors for teaching excellence, including District Teacher of the Year. Furthermore, he currently serves on the CS4RI team at the Rhode Island Department of Education and as an adjunct at URI teaching CSC 305 Software Engineering.',
};


// Alumni Roundtable participants
const alumniPanelists = [
    {
        name: 'Jason Aguirre',
        title: 'Software Engineer',
        organization: 'Atlassian',
        organizationUrl: 'https://www.atlassian.com/company/careers/earlycareers',
        role: 'Alumnus',
        image: aguirre,
        bio: "Jason Aguirre is a software engineer at Atlassian and a 2023 graduate of the University of Rhode Island. Since graduating, he has contributed to Atlassian’s collaboration software and built his career in the technology industry. He is excited to return to URI to share his transition from college to industry and help current students navigate their own career paths.",
    },
    {
        name: 'Meghan Andrews',
        organization: 'Brightstar Lottery',
        organizationUrl: 'https://brightstarlottery.com/who-we-are/careers',
        role: 'Alumna',
        bio: '',
    },
    {
        name: 'Evelidis Bueno',
        organization: 'Google',
        organizationUrl: 'https://www.google.com/about/careers/applications/',
        role: 'Alumna',
        bio: '',
    },
];



const workshopPresenters = {
    1: [
        {
            name: 'Andy Luu',
            title: 'Co-founder & CTO',
            organization: 'AlgoArena',
            organizationUrl: 'https://algoarena.net/',
            image: luu,
            bio: 'Andy Luu is the co-founder and CTO of AlgoArena, where he leads engineering and the AI tooling behind assessments. He is a Gates Scholar studying Computer Science and Psychology at Swarthmore College, with research in AI-assisted programming and machine learning.',
        },
        {
            name: 'Eli Young',
            title: 'Co-founder & CEO',
            organization: 'AlgoArena',
            organizationUrl: 'https://algoarena.net/',
            image: young,
            bio: 'Eli Young is the co-founder and CEO of AlgoArena, a platform for building, teaching, and assessing software skills in the AI era. AlgoArena combines AI-native software development and technical assessments with competitive programming, guided practice, and live classroom tools for computer science education. A recent computer science graduate of Swarthmore College, Eli also conducts research on AI-assisted programming, technical assessment, and computing education. His recent work includes research on assessing AI-assisted programming, teaching vibecoding, and live gamified CS classrooms, with projects accepted at SIGCSE Virtual 2026 and the 2026 CCSC Southeastern Conference.',
        },
    ],
    3: [
        {
            name: 'Jacob Hampton',
            title: 'Senior Software Engineer',
            organization: 'Fidelity',
            organizationUrl: 'https://students.fidelitycareers.com/',
            image: hampton,
            bio: "Jacob Hampton is a CCRI and URI alumnus (Class of 2021) with five years of experience at Fidelity. He began his career with the firm as an entry-level Software Engineer and has since advanced to a Senior Software Engineer role. Throughout his tenure, he has contributed across three different teams, gaining diverse technical and business experience.",
        },
        {
            name: 'Samuel Perez',
            title: 'Full-Stack Developer',
            organization: 'Fidelity',
            organizationUrl: 'https://students.fidelitycareers.com/',
            bio: "Sam is a 2024 URI alumnus and a Full-Stack Developer at Fidelity. Since joining the firm through the LEAP program, he has spent nearly two years developing innovative solutions and growing his expertise across the full technology stack.",
        },
    ],
    4: [
        {
            name: 'Michael Conti',
            title: 'Cybersecurity Associate Teaching Professor',
            organization: 'University of Rhode Island',
            organizationUrl: 'https://web.uri.edu/cs/',
            image: conti,
            bio: "Michael Conti is a Cybersecurity Associate Teaching Professor at the University of Rhode Island and a member of URI's Digital Forensics and Cyber Security Center (DFCSC). He teaches the early courses in URI's cybersecurity sequence along with introductory computer science. His research focuses on early interventions that support the retention and success of students in computing, and on AI-integrated computer science education, with the goal of designing evidence-based learning environments.",
        },
        {
            name: 'Liam McKenzie',
            title: 'Undergrad Researcher & Teaching Assistant',
            organization: 'University of Rhode Island',
            organizationUrl: 'https://web.uri.edu/cs/',
            bio: 'Liam McKenzie is an undergraduate student, researcher, and teaching assistant in the Department of Computer Science and Statistics at the University of Rhode Island. His primary research focuses on applied AI/ML, particularly with cryospheric and oceanic sciences. Beyond research, he is also the student manager at the IACR AI Lab and has completed a fellowship studying the real-world limitations of AI systems.',
        },
    ],
};


/*
 * Reusable card for speakers, panelists, alumni, and moderators.
 * If a photo is added to a person's object later, it will be displayed.
 * Otherwise, the person's initials are displayed as a placeholder.
 */
function SpeakerCard({ person }) {
    const initials = person.name
        .split(' ')
        .map((part) => part.charAt(0))
        .join('')
        .slice(0, 2);

    return (
        <article className="speaker-card">
            <div className="speaker-card__visual" aria-hidden="true">
                {person.image ? (
                    <img
                        src={person.image}
                        alt=""
                        className="speaker-card__image"
                    />
                ) : (
                    <span className="speaker-card__initials">
                        {initials}
                    </span>
                )}
            </div>

            <div className="speaker-card__content">
                <p className="speaker-card__role">{person.role}</p>

                <h3>{person.name}</h3>

                {(person.title || person.organization) && (
                    <p className="speaker-card__position">
                        {person.title && (
                            <span>{person.title}</span>
                        )}

                        {person.subtitle && (
                            <span>{person.subtitle}</span>
                        )}

                        {person.organization && (
                            <span>
                                {person.organizationUrl ? (
                                    <a
                                        href={person.organizationUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {person.organization}
                                    </a>
                                ) : (
                                    person.organization
                                )}
                            </span>
                        )}
                    </p>
                )}

                <p className="speaker-card__bio">
                    {person.bio || 'Bio coming soon.'}
                </p>
            </div>
        </article>
    );
}


function Agenda() {
    const [workshops, setWorkshops] = useState([]);
    const [workshopsLoading, setWorkshopsLoading] = useState(true);
    const [workshopsError, setWorkshopsError] = useState('');

    const workshopsApiUrl = import.meta.env.VITE_WORKSHOPS_API_URL;


    /*
     * Retrieve workshop information from the same API used by the
     * Workshops page so workshop titles and descriptions stay synchronized.
     */
    useEffect(() => {
        const controller = new AbortController();

        async function loadWorkshops() {
            try {
                setWorkshopsLoading(true);
                setWorkshopsError('');

                const response = await fetch(workshopsApiUrl, {
                    method: 'GET',
                    signal: controller.signal,
                });

                if (!response.ok) {
                    throw new Error('Unable to retrieve workshops.');
                }

                const data = await response.json();

                /*
                 * Support either an API response containing a workshops
                 * property or an API response containing the array directly.
                 */
                const workshopData = Array.isArray(data) ? data : data.workshops || [];

                const sortedWorkshops = [...workshopData].sort((a, b) => {
                    if (Number(a.session_number) !== Number(b.session_number)) {
                        return Number(a.session_number) - Number(b.session_number);
                    }

                    return Number(a.display_order || 0) - Number(b.display_order || 0);
                });

                setWorkshops(sortedWorkshops);
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error('Workshop loading error:', error);
                    setWorkshopsError('Workshop information is temporarily unavailable.');
                }
            } finally {
                if (!controller.signal.aborted) {
                    setWorkshopsLoading(false);
                }
            }
        }

        if (workshopsApiUrl) {
            loadWorkshops();
        } else {
            setWorkshopsLoading(false);
            setWorkshopsError('Workshop information is temporarily unavailable.');
        }

        return () => {
            controller.abort();
        };
    }, [workshopsApiUrl]);


    // Only display workshops that are complete and open for registration
    const sessionOneWorkshops = workshops.filter(
        (workshop) =>
            Number(workshop.session_number) === 1 &&
            Number(workshop.registration_open) === 1
    );

    const sessionTwoWorkshops = workshops.filter(
        (workshop) =>
            Number(workshop.session_number) === 2 &&
            Number(workshop.registration_open) === 1
    );


    // Scroll to a section of the Program page without changing the URL hash
    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);

        if (!section) {
            return;
        }

        const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;

        section.scrollIntoView({
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
            block: 'start',
        });
    }


    const programNavRef = useRef(null);

    function scrollProgramNav(direction) {
        if (!programNavRef.current) {
            return;
        }

        const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;

        programNavRef.current.scrollBy({
            left: direction * 220,
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
        });
    }


    const [activeSection, setActiveSection] = useState('registration');

    useEffect(() => {
        const sectionIds = [
            'registration',
            'welcome-address',
            'fireside-chat',
            'industry-panel',
            'alumni-roundtable',
            'networking-lunch',
            'workshops',
        ];

        const sections = sectionIds
            .map((sectionId) => document.getElementById(sectionId))
            .filter(Boolean);

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleSection = entries.find(
                    (entry) => entry.isIntersecting
                );

                if (visibleSection) {
                    setActiveSection(visibleSection.target.id);
                }
            },
            {
                rootMargin: '-25% 0px -65% 0px',
                threshold: 0,
            }
        );

        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, []);


    useEffect(() => {
        if (!programNavRef.current) {
            return;
        }

        const isMobile = window.matchMedia(
            '(max-width: 650px)'
        ).matches;

        if (!isMobile) {
            return;
        }

        const activeButton =
            programNavRef.current.querySelector(
                `[data-section="${activeSection}"]`
            );

        if (!activeButton) {
            return;
        }

        const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;

        const scrollLeft =
            activeButton.offsetLeft -
            programNavRef.current.clientWidth / 2 +
            activeButton.offsetWidth / 2;

        programNavRef.current.scrollTo({
            left: scrollLeft,
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
        });
    }, [activeSection]);


    return (
        <main id="main-content" className="agenda-page">

            {/* Program page hero */}
            <section className="agenda-hero" aria-labelledby="agenda-page-heading">
                <div className="agenda-hero__content">
                    <p className="agenda-hero__date">September 18, 2026</p>
                    <h1 id="agenda-page-heading">CS Connect Day Program</h1>
                    <p className="agenda-hero__description">
                        Explore the full CS Connect Day schedule, featured
                        speakers and panelists, networking opportunities, and
                        hands-on afternoon workshops.
                    </p>
                </div>
            </section>


            {/* In-page navigation that scrolls without interfering with HashRouter */}
            <nav className="program-nav" aria-label="Program page sections">

                <div className="program-nav__controls">
                    <button
                        type="button"
                        className="program-nav__arrow program-nav__arrow--left"
                        onClick={() => scrollProgramNav(-1)}
                        aria-label="Show previous program sections"
                    >
                        ‹
                    </button>

                <div className="program-nav__inner" ref={programNavRef}>
                    <button
                        type="button"
                        data-section="registration"
                        className={
                            activeSection === 'registration'
                                ? 'program-nav__item--active'
                                : ''
                        }
                        aria-current={
                            activeSection === 'registration'
                                ? 'location'
                                : undefined
                        }
                        onClick={() => scrollToSection('registration')}
                    >
                        Registration
                    </button>

                    <button
                        type="button"
                        data-section="welcome-address"
                        className={
                            activeSection === 'welcome-address'
                                ? 'program-nav__item--active'
                                : ''
                        }
                        aria-current={
                            activeSection === 'welcome-address'
                                ? 'location'
                                : undefined
                        }
                        onClick={() => scrollToSection('welcome-address')}
                    >
                        Welcome Address
                    </button>


                    <button
                        type="button"
                        data-section="fireside-chat"
                        className={
                            activeSection === 'fireside-chat'
                                ? 'program-nav__item--active'
                                : ''
                        }
                        aria-current={
                            activeSection === 'fireside-chat'
                                ? 'location'
                                : undefined
                        }
                        onClick={() => scrollToSection('fireside-chat')}
                    >
                        Fireside Chat
                    </button>

                    <button
                        type="button"
                        data-section="industry-panel"
                        className={
                            activeSection === 'industry-panel'
                                ? 'program-nav__item--active'
                                : ''
                        }
                        aria-current={
                            activeSection === 'industry-panel'
                                ? 'location'
                                : undefined
                        }
                        onClick={() => scrollToSection('industry-panel')}
                    >
                        Industry Panel
                    </button>

                    <button
                        type="button"
                        data-section="alumni-roundtable"
                        className={
                            activeSection === 'alumni-roundtable'
                                ? 'program-nav__item--active'
                                : ''
                        }
                        aria-current={
                            activeSection === 'alumni-roundtable'
                                ? 'location'
                                : undefined
                        }
                        onClick={() => scrollToSection('alumni-roundtable')}
                    >
                        Alumni Roundtable
                    </button>

                    <button
                        type="button"
                        data-section="networking-lunch"
                        className={
                            activeSection === 'networking-lunch'
                                ? 'program-nav__item--active'
                                : ''
                        }
                        aria-current={
                            activeSection === 'networking-lunch'
                                ? 'location'
                                : undefined
                        }
                        onClick={() => scrollToSection('networking-lunch')}
                    >
                        Networking Lunch
                    </button>

                    <button
                        type="button"
                        data-section="workshops"
                        className={
                            activeSection === 'workshops'
                                ? 'program-nav__item--active'
                                : ''
                        }
                        aria-current={
                            activeSection === 'workshops'
                                ? 'location'
                                : undefined
                        }
                        onClick={() => scrollToSection('workshops')}
                    >
                        Workshops
                    </button>
                </div>

                <button
                    type="button"
                    className="program-nav__arrow program-nav__arrow--right"
                    onClick={() => scrollProgramNav(1)}
                    aria-label="Show more program sections"
                >
                    ›
                </button>
            </div>
        </nav>


            {/* Registration and event check-in */}
            <section id="registration" className="program-section program-section--alternate" aria-labelledby="registration-heading">
                <div className="program-section__header">
                    <p className="section-eyebrow">Registration</p>
                    <h2 id="registration-heading">Check in and get ready for CS Connect Day.</h2>
                    <p className="program-section__meta">
                        8:30 AM – 9:00 AM
                        <span aria-hidden="true"> • </span>
                        Memorial Union Ballroom
                    </p>
                    <p>
                        Check in for CS Connect Day before the morning program begins. 
                        Students and guests can enjoy coffee and pastries, connect with fellow attendees, 
                        and get settled before the Welcome Address at 9:00 AM.
                    </p>
                </div>
            </section>


            {/* Welcome Address and URI academic leadership */}
            <section id="welcome-address" className="program-section" aria-labelledby="welcome-heading">
                <div className="program-section__header">
                    <p className="section-eyebrow">Welcome Address</p>
                    <h2 id="welcome-heading">Welcome to CS Connect Day.</h2>
                    <p className="program-section__meta">
                        9:00 AM – 9:10 AM
                        <span aria-hidden="true"> • </span>
                        Memorial Union Ballroom
                    </p>
                    <p>
                        Opening remarks from URI academic leadership welcoming
                        students, alumni, faculty, and invited guests.
                    </p>
                </div>

                <div className="speaker-grid">
                    {welcomeSpeakers.map((speaker) => (
                        <SpeakerCard
                            person={speaker}
                            key={speaker.name}
                        />
                    ))}
                </div>
            </section>


            {/* Fireside Chat information and featured speaker */}
            <section id="fireside-chat" className="program-section program-section--feature" aria-labelledby="fireside-heading">
                <div className="program-feature">
                    <div className="program-feature__intro">
                        <p className="section-eyebrow">Fireside Chat</p>
                        <h2 id="fireside-heading">Computing in the Age of AI</h2>
                        <p className="program-feature__meta">
                            9:10 AM – 10:00 AM
                            <span aria-hidden="true"> • </span>
                            Memorial Union Ballroom
                        </p>
                        <p className="program-feature__description">
                            An interactive conversation with Dr. Michael
                            Littman exploring the future of artificial
                            intelligence, how AI is reshaping computing and
                            computer science education, and what these changes
                            mean for students preparing for careers in
                            technology.
                        </p>
                    </div>

                    <div className="speaker-grid speaker-grid--featured">
                        {firesideSpeakers.map((speaker) => (
                            <SpeakerCard
                                person={speaker}
                                key={speaker.name}
                            />
                        ))}
                    </div>
                </div>
            </section>


            {/* Industry Panel information and panelists */}
            <section id="industry-panel" className="program-section program-section--alternate" aria-labelledby="industry-heading">
                <div className="program-section__header">
                    <p className="section-eyebrow">Industry Panel</p>
                    <h2 id="industry-heading">How AI Is Reshaping Hiring &amp; Tech Workforce</h2>
                    <p className="program-section__meta">
                        10:00 AM – 11:00 AM
                        <span aria-hidden="true"> • </span>
                        Memorial Union Ballroom
                    </p>
                    <p>
                        Industry leaders discuss how AI is changing recruiting,
                        technical roles, and the skills and experiences
                        employers value as students prepare to enter an
                        evolving technology workforce.
                    </p>
                </div>

                <div className="speaker-grid">
                    {industryPanelists.map((panelist) => (
                        <SpeakerCard
                            person={panelist}
                            key={panelist.name}
                        />
                    ))}
                </div>

                <div className="program-moderator">
                    <div className="program-moderator__header">
                        <p className="section-eyebrow">Moderator</p>
                    </div>

                    <div className="speaker-grid speaker-grid--moderator">
                        <SpeakerCard person={industryModerator} />
                    </div>
                </div>
            </section>


            {/* Alumni Roundtable information and alumni participants */}
            <section id="alumni-roundtable" className="program-section" aria-labelledby="alumni-heading">
                <div className="program-section__header">
                    <p className="section-eyebrow">Alumni Roundtable</p>
                    <h2 id="alumni-heading">From URI To Industry</h2>
                    <p className="program-section__meta">
                        11:15 AM – 12:15 PM
                        <span aria-hidden="true"> • </span>
                        Memorial Union Ballroom
                    </p>
                    <p>
                        URI CS alumni share their paths from college to
                        industry, career growth, and lessons learned along the
                        way.
                    </p>
                </div>

                <div className="speaker-grid">
                    {alumniPanelists.map((alumnus) => (
                        <SpeakerCard
                            person={alumnus}
                            key={alumnus.name}
                        />
                    ))}
                </div>
            </section>


            {/* Networking Lunch */}
            <section id="networking-lunch" className="program-section program-section--alternate" aria-labelledby="networking-lunch-heading">
                <div className="program-section__header">
                    <p className="section-eyebrow">Networking Lunch</p>
                    <h2 id="networking-lunch-heading">Connect over lunch.</h2>
                    <p className="program-section__meta">
                        12:30 PM – 1:50 PM
                        <span aria-hidden="true"> • </span>
                        Memorial Union Lounge
                    </p>
                    <p>
                        Connect with employers, alumni, faculty, and graduate program
                        representatives over lunch before the afternoon workshops begin.
                    </p>
                </div>
            </section>


            {/* Workshop preview populated from the workshops database */}
            <section id="workshops" className="program-section program-section--workshops" aria-labelledby="workshops-heading">
                <div className="program-section__header">
                    <p className="section-eyebrow">Afternoon Workshops</p>
                    <h2 id="workshops-heading">Build skills through hands-on sessions.</h2>
                    <p className="program-section__meta">
                        2:00 PM – 5:00 PM
                        <span aria-hidden="true"> • </span>
                        Bliss &amp; Fascitelli Center for Advanced Engineering
                    </p>
                    <p>
                        Explore hands-on technical sessions focused on AI and
                        data tools, cloud technologies, career preparation, and
                        emerging industry practices. Workshop registration is
                        separate from the main event registration.
                    </p>
                </div>

                <div className="program-workshops__cta">
                    <Link
                        to="/workshops"
                        className="program-button"
                    >
                        Browse Workshops &amp; Reserve a Seat
                    </Link>
                </div>

                {workshopsLoading && (
                    <p className="program-workshops__status" role="status">
                        Loading workshop information...
                    </p>
                )}

                {workshopsError && (
                    <p className="program-workshops__status program-workshops__status--error" role="alert">
                        {workshopsError}
                    </p>
                )}

                {!workshopsLoading && !workshopsError && (
                    <div className="program-workshops">

                        {/* First afternoon workshop session */}
                        {sessionOneWorkshops.length > 0 && (
                            <section className="program-workshop-session" aria-labelledby="workshop-session-two-heading">
                                <h3 id="workshop-session-two-heading">
                                    Session 1
                                    <span>2:00 PM – 3:30 PM</span>
                                </h3>

                                <div className="program-workshop-grid">
                                    {sessionOneWorkshops.map((workshop) => {
                                        const presenters =workshopPresenters[workshop.workshop_id] || [];

                                        return (
                                            <article
                                                className="program-workshop-card"
                                                key={workshop.workshop_id}
                                            >
                                                <h4>{workshop.title}</h4>
                                                <p>{workshop.description}</p>

                                                {presenters.length > 0 && (
                                                    <div className="program-workshop-presenters">
                                                        <p className="section-eyebrow">
                                                            Presented By
                                                        </p>

                                                        <div className="program-workshop-presenter-grid">
                                                            {presenters.map((presenter) => (
                                                                <div
                                                                    className="program-workshop-presenter"
                                                                    key={presenter.name}
                                                                >
                                                                    <div
                                                                        className="program-workshop-presenter__visual"
                                                                        aria-hidden="true"
                                                                    >
                                                                        {presenter.image ? (
                                                                            <img
                                                                                src={presenter.image}
                                                                                alt=""
                                                                            />
                                                                        ) : (
                                                                            <span>
                                                                                {presenter.name
                                                                                    .split(' ')
                                                                                    .map((part) => part.charAt(0))
                                                                                    .join('')
                                                                                    .slice(0, 2)}
                                                                            </span>
                                                                        )}
                                                                    </div>

                                                                    <div className="program-workshop-presenter__content">
                                                                        <h5>{presenter.name}</h5>

                                                                        <p className="program-workshop-presenter__position">
                                                                            {presenter.title && (
                                                                                <span>{presenter.title}</span>
                                                                            )}

                                                                            {presenter.organization && (
                                                                                <span>
                                                                                    {presenter.organizationUrl ? (
                                                                                        <a
                                                                                            href={presenter.organizationUrl}
                                                                                            target="_blank"
                                                                                            rel="noopener noreferrer"
                                                                                        >
                                                                                            {presenter.organization}
                                                                                        </a>
                                                                                    ) : (
                                                                                        presenter.organization
                                                                                    )}
                                                                                </span>
                                                                            )}
                                                                        </p>

                                                                        <p className="program-workshop-presenter__bio">
                                                                            {presenter.bio}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </article>
                                        );
                                    })}
                                </div>
                            </section>
                        )}

                        {/* Second afternoon workshop session */}
                        {sessionTwoWorkshops.length > 0 && (
                            <section className="program-workshop-session" aria-labelledby="workshop-session-two-heading">
                                <h3 id="workshop-session-two-heading">
                                    Session 2
                                    <span>3:30 PM – 5:00 PM</span>
                                </h3>

                                <div className="program-workshop-grid">
                                    {sessionTwoWorkshops.map((workshop) => {
                                        const presenters = workshopPresenters[workshop.workshop_id] || [];

                                        return (
                                            <article
                                                className="program-workshop-card"
                                                key={workshop.workshop_id}
                                            >
                                                <h4>{workshop.title}</h4>
                                                <p>{workshop.description}</p>

                                                {presenters.length > 0 && (
                                                    <div className="program-workshop-presenters">
                                                        <p className="section-eyebrow">
                                                            Presented By
                                                        </p>

                                                        <div className="program-workshop-presenter-grid">
                                                            {presenters.map((presenter) => (
                                                                <div
                                                                    className="program-workshop-presenter"
                                                                    key={presenter.name}
                                                                >
                                                                    <div
                                                                        className="program-workshop-presenter__visual"
                                                                        aria-hidden="true"
                                                                    >
                                                                        {presenter.image ? (
                                                                            <img
                                                                                src={presenter.image}
                                                                                alt=""
                                                                            />
                                                                        ) : (
                                                                            <span>
                                                                                {presenter.name
                                                                                    .split(' ')
                                                                                    .map((part) => part.charAt(0))
                                                                                    .join('')
                                                                                    .slice(0, 2)}
                                                                            </span>
                                                                        )}
                                                                    </div>

                                                                    <div className="program-workshop-presenter__content">
                                                                        <h5>{presenter.name}</h5>

                                                                        <p className="program-workshop-presenter__position">
                                                                            {presenter.title && (
                                                                                <span>{presenter.title}</span>
                                                                            )}

                                                                            {presenter.organization && (
                                                                                <span>
                                                                                    {presenter.organizationUrl ? (
                                                                                        <a
                                                                                            href={presenter.organizationUrl}
                                                                                            target="_blank"
                                                                                            rel="noopener noreferrer"
                                                                                        >
                                                                                            {presenter.organization}
                                                                                        </a>
                                                                                    ) : (
                                                                                        presenter.organization
                                                                                    )}
                                                                                </span>
                                                                            )}
                                                                        </p>

                                                                        <p className="program-workshop-presenter__bio">
                                                                            {presenter.bio}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </article>
                                        );
                                    })}
                                </div>
                            </section>
                        )}

                        {sessionOneWorkshops.length === 0 &&
                            sessionTwoWorkshops.length === 0 && (
                                <p className="program-workshops__status">
                                    Workshop information will be available soon.
                                </p>
                        )}
                    </div>
                )}
            </section>

        </main>
    );
}

export default Agenda;