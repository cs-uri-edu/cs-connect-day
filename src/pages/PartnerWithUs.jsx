import { useState } from 'react';
import './PartnerWithUs.css';

const impactItems = [
    {
        number: '01',
        title: 'Recruit URI talent',
        description:
            'Meet students preparing for careers in software engineering, cybersecurity, data science, AI, and technical consulting.',
    },
    {
        number: '02',
        title: 'Build visibility',
        description:
            'Introduce your organization to students who are actively exploring internships, full-time roles, and emerging career pathways.',
    },
    {
        number: '03',
        title: 'Shape career readiness',
        description:
            'Help students understand how hiring, interviews, AI tools, and technical expectations are evolving across industry.',
    },
    {
        number: '04',
        title: 'Strengthen community',
        description:
            'Build meaningful connections with URI students, faculty, alumni, and campus partners.',
    },
];

const engagementOptions = [
    {
        label: 'Speak',
        title: 'Participate in a Panel',
        description:
            'Share perspectives on recruiting, AI in hiring, interview preparation, career pathways, and the future of computing work.',
    },
    {
        label: 'Recruit',
        title: 'Host a Networking Booth',
        description:
            'Connect directly with students during the networking lunch and share internship, full-time, graduate, or professional opportunities.',
    },
    {
        label: 'Teach',
        title: 'Lead an Afternoon Workshop',
        description:
            'Offer a hands-on session focused on technical skills, career preparation, AI tools, cloud platforms, cybersecurity, or emerging technologies.',
    },
    {
        label: 'Support',
        title: 'Support the Event',
        description:
            'Help make URI CS Connect Day possible through financial support, food sponsorship, materials, giveaways, or other event contributions.',
    },
];

const faqs = [
    {
        question: 'Who can partner with URI CS Connect Day?',
        answer:
            'Employers, alumni, industry professionals, government agencies, graduate programs, and technology organizations are welcome to participate.',
    },
    {
        question: 'Do organizations need to donate in order to participate?',
        answer:
            'No. Organizations may participate by joining a panel, hosting a booth, leading a workshop, supporting the event financially, or combining several forms of engagement.',
    },
    {
        question: 'Can one organization participate in multiple ways?',
        answer:
            'Yes. For example, an organization may host a networking booth and also participate in a panel or workshop.',
    },
    {
        question: 'What kinds of workshops are a good fit?',
        answer:
            'Strong workshop topics include technical interview preparation, AI tools, cloud deployment, MLOps, cybersecurity, software engineering practices, and emerging career pathways.',
    },
    {
        question: 'How do we express interest?',
        answer:
            'Complete the partner interest form, and a member of the planning team will follow up with next steps.',
    },
];

function PartnerWithUs() {
    const [activeEngagement, setActiveEngagement] = useState(0);
    const [openFaq, setOpenFaq] = useState(0);

    function toggleFaq(index) {
        setOpenFaq(openFaq === index ? null : index);
    }

    return (
        <main className="partner-page">
            <section className="partner-hero">
                <p className="section-eyebrow">Connect With Our Students</p>
                <h1>Support URI CS Students</h1>
                <p>
                    URI CS Connect Day brings together students, alumni, faculty, and
                    industry partners for a full day of career conversations, networking,
                    and hands-on learning.
                </p>

                <a href="https://forms.gle/yJ15cF1sXMvAr5JB8" className="partner-hero__button" target="_blank" rel="noreferrer">
                    Partner Interest Form
                </a>
            </section>

            <section className="partner-section partner-impact">
                <div className="partner-section__header partner-impact__header">
                    <p className="section-eyebrow">Why Partner</p>
                    <h2>Make a direct impact on the next generation of computing professionals.</h2>
                </div>

                <div className="impact-grid">
                    {impactItems.map((item) => (
                        <article className="impact-card" key={item.title}>
                            <span>{item.number}</span>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="partner-section partner-section--light">
                <div className="partner-section__header">
                    <p className="section-eyebrow">Ways to Engage</p>
                    <h2>Choose the participation model that best fits your organization.</h2>
                </div>

                <div className="engagement-carousel">
                    <button
                        className="carousel-button"
                        onClick={() =>
                            setActiveEngagement(
                                activeEngagement === 0
                                    ? engagementOptions.length - 1
                                    : activeEngagement - 1
                            )
                        }
                        aria-label="Previous engagement option"
                    >
                        &lt;
                    </button>

                    <article className="engagement-slide">
                        <p className="engagement-slide__label">
                            {engagementOptions[activeEngagement].label}
                        </p>

                        <h3>{engagementOptions[activeEngagement].title}</h3>

                        <p>{engagementOptions[activeEngagement].description}</p>
                    </article>

                    <button
                        className="carousel-button"
                        onClick={() =>
                            setActiveEngagement(
                                activeEngagement === engagementOptions.length - 1
                                    ? 0
                                    : activeEngagement + 1
                            )
                        }
                        aria-label="Next engagement option"
                    >
                        &gt;
                    </button>
                </div>

                <div className="carousel-dots">
                    {engagementOptions.map((option, index) => (
                        <button
                            key={option.title}
                            className={activeEngagement === index ? 'carousel-dot carousel-dot--active' : 'carousel-dot'}
                            onClick={() => setActiveEngagement(index)}
                            aria-label={`View ${option.title}`}
                        ></button>
                    ))}
                </div>
            </section>

            <section className="partner-cta">
                <div>
                    <p className="section-eyebrow">Get Involved</p>
                    <h2>Interested in participating?</h2>
                    <p>
                        Complete the partner interest form to share how your organization
                        would like to engage with URI CS Connect Day.
                    </p>
                </div>

                <a href="https://forms.gle/yJ15cF1sXMvAr5JB8" className="partner-cta__button" target="_blank" rel="noreferrer">
                    Partner Interest Form
                </a>
            </section>

            <section className="partner-section">
                <div className="partner-section__header">
                    <p className="section-eyebrow">FAQ</p>
                    <h2>Frequently asked questions</h2>
                </div>

                <div className="faq-accordion">
                    {faqs.map((faq, index) => {
                        const isOpen = openFaq === index;

                        return (
                            <article
                                className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}
                                key={faq.question}
                            >
                                <button
                                    className="faq-item__question"
                                    onClick={() => toggleFaq(index)}
                                    aria-expanded={isOpen}
                                >
                                    <span>{faq.question}</span>
                                    <strong>+</strong>
                                </button>

                                <div className="faq-item__answer">
                                    <p>{faq.answer}</p>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </section>
        </main>
    );
}

export default PartnerWithUs;