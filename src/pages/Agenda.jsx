import { useState } from 'react';
import './Agenda.css';

const sessions = [
    {
        id: 'morning',
        label: 'Morning Session',
        title: 'Employer & Alumni Panels',
        time: '8:30 AM – 12:30 PM',
        location: 'Memorial Union Ballroom',
        details: [
            {
                time: '8:30 AM',
                title: 'Registration',
                description:
                    'Guests can check in, network, and enjoy coffee and pastries.',
                note:
                    'Parking is available in Lot #1 on Briar Lane behind the Welcome Center.',
            },
            {
                time: '9:00 AM',
                title: 'Welcome Address',
                description:
                    'Opening remarks from URI leadership welcoming students, alumni, faculty, and industry partners.',
                note: 'Speaker to be announced.',
            },
            {
                time: '9:10 AM',
                title: 'Keynote Address',
                description:
                    'An invited speaker shares insight on computing careers, AI, and emerging opportunities. Students can participate in Q&A with speaker. ',
                note: 'Speaker to be announced.',
            },
            {
                time: '10:00 AM',
                title: 'Employer Panel',
                description:
                    'Industry representatives discuss AI, recruiting, interviews, and candidate evaluation. Students can participate in Q&A with panel.',
                note: 'Participating companies and moderator to be announced.',
            },
            {
                time: '11:15 AM',
                title: 'Alumni Roundtable',
                description:
                    'URI alumni discuss their career paths from undergraduate experience to current roles. Students can participate in Q&A with panel.',
                note: 'Participating alumni, companies and moderator to be announced.',
            },
        ],
    },
    {
        id: 'lunch',
        label: 'Lunch Session',
        title: 'Networking',
        time: '12:30 PM – 1:50 PM',
        location: 'Atrium 1',
        details: [
            {
                time: '12:30 PM',
                title: 'Networking Lunch',
                description:
                    'Students, employers, alumni, faculty, and staff connect over lunch and employer booths.',
                note:
                    '',
            },
        ],
    },
    {
        id: 'afternoon',
        label: 'Afternoon Session',
        title: 'Hands-On Learning Workshops',
        time: '2:00 PM – 5:00 PM',
        location: 'Bliss & Fascitelli Center for Advanced Engineering',
        workshopBlocks: [
            {
                time: '2:00 PM – 3:30 PM',
                workshops: [
                    {
                        title: 'Workshop 1: To Be Announced',
                        room: 'Room #',
                        description:
                            'This workshop features a hands-on technical or career-focused learning opportunity.',
                    },
                    {
                        title: 'Workshop 2: To Be Announced',
                        room: 'Room #',
                        description:
                            'This workshop features a hands-on technical or career-focused learning opportunity.',
                    },
                ],
            },
            {
                time: '3:30 PM – 5:00 PM',
                workshops: [
                    {
                        title: 'Workshop 3: To Be Announced',
                        room: 'Room #',
                        description:
                            'This workshop features a hands-on technical or career-focused learning opportunity.',
                    },
                    {
                        title: 'Workshop 4: To Be Announced',
                        room: 'Room #',
                        description:
                            'This workshop features a hands-on technical or career-focused learning opportunity.',
                    },
                    {
                        title: 'Workshop 5: To Be Announced',
                        room: 'Room #',
                        description:
                            'This workshop features a hands-on technical or career-focused learning opportunity.',
                    },
                    {
                        title: 'Workshop 6: To Be Announced',
                        room: 'Room #',
                        description:
                            'This workshop features a hands-on technical or career-focused learning opportunity.',
                    },
                ],
            },
        ],
    },
];

function Agenda() {
    const [openSession, setOpenSession] = useState('');

    function toggleSession(id) {
        setOpenSession(openSession === id ? null : id);
    }

    return (
        <main className="agenda-page">
            <section className="agenda-hero">
                <p className="section-eyebrow">September 18, 2026</p>
                <h1>URI CS Connect Day Program</h1>
                <p>
                    A full day of employer panels, alumni conversations, networking, and hands-on
                    workshops designed to help students prepare for computing careers.
                </p>
            </section>

            <section className="agenda-accordion" aria-label="Schedule of Events">
                {sessions.map((session) => {
                    const isOpen = openSession === session.id;

                    return (
                        <article
                            className={`agenda-session ${isOpen ? 'agenda-session--open' : ''}`}
                            key={session.id}
                        >
                            <button
                                className="agenda-session__summary"
                                onClick={() => toggleSession(session.id)}
                                aria-expanded={isOpen}
                                aria-controls={`${session.id}-details`}
                            >
                                <div>
                                    <p className="agenda-session__label">{session.label}</p>
                                    <h2>{session.title}</h2>
                                </div>

                                <div className="agenda-session__meta">
                                    <p>{session.time}</p>
                                    <span>{session.location}</span>
                                </div>

                                <span className="agenda-session__toggle" aria-hidden="true">
                                    +
                                </span>
                            </button>

                            <div
                                id={`${session.id}-details`}
                                className="agenda-session__details"
                            >
                                {session.details && (
                                    <div className="agenda-detail-list">
                                        {session.details.map((item) => (
                                            <div className="agenda-detail-item" key={item.title}>
                                                <div className="agenda-detail-item__time">
                                                    {item.time}
                                                </div>

                                                <div className="agenda-detail-item__content">
                                                    <h3>{item.title}</h3>
                                                    <p>{item.description}</p>
                                                    <span>{item.note}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {session.workshopBlocks && (
                                    <div className="workshop-blocks">
                                        {session.workshopBlocks.map((block) => (
                                            <div className="workshop-block" key={block.time}>
                                                <h3>{block.time}</h3>

                                                <div className="workshop-grid">
                                                    {block.workshops.map((workshop) => (
                                                        <div className="workshop-card" key={workshop.title}>
                                                            <p className="workshop-card__room">
                                                                {workshop.room}
                                                            </p>
                                                            <h4>{workshop.title}</h4>
                                                            <p>{workshop.description}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </article>
                    );
                })}
            </section>
        </main>
    );
}

export default Agenda;