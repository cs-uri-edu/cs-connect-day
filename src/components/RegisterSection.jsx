import { Link } from 'react-router-dom';
import './RegisterSection.css';

function RegisterSection() {
    return (
        <section
            className="registration"
            aria-labelledby="registration-heading"
        >
            <div className="registration__header">
                <p className="section-eyebrow">Event Registration</p>

                <h2 id="registration-heading">
                    Plan your CS Connect Day.
                </h2>
            </div>

            <div className="registration__grid">
                <article className="registration-card registration-card--main">
                    <div className="registration-card__content">
                        <div
                            className="registration-card__icon"
                            aria-hidden="true"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                role="img"
                                focusable="false"
                            >
                                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3ZM8 11c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3Zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13Zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5Z" />
                            </svg>
                        </div>

                        <p className="registration-card__label">
                            Main Event
                        </p>

                        <h3>Connect with the URI computing community.</h3>

                        <p className="registration-card__description">
                            Join students, alumni, employers, faculty, and
                            industry leaders for the main CS Connect Day
                            program.
                        </p>

                        <div className="registration-card__details">
                            <p className="registration-card__details-title">
                                Your registration includes:
                            </p>

                            <ul className="registration-card__list">
                                <li>Welcome Address</li>
                                <li>Keynote Presentation</li>
                                <li>Panels</li>
                                <li>Networking Lunch</li>
                            </ul>
                        </div>
                    </div>

                    <a
                        href="https://app.joinhandshake.com/stu/events/1957249"
                        className="registration-card__button"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Register for the URI CS Connect Day main event on Handshake"
                    >
                        Register on Handshake
                    </a>
                </article>

                <article className="registration-card registration-card--workshops">
                    <div className="registration-card__content">
                        <div
                            className="registration-card__icon"
                            aria-hidden="true"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                role="img"
                                focusable="false"
                            >
                                <path d="M9.4 16.6 4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4Zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4Z" />
                            </svg>
                        </div>

                        <p className="registration-card__label">
                            Afternoon Workshops
                        </p>

                        <h3>Build skills through technical workshops.</h3>

                        <p className="registration-card__description">
                            Explore the hands-on technical workshop schedule and reserve
                            a seat in the sessions that interest you.
                        </p>

                        <div className="registration-card__details">
                            <p className="registration-card__details-title">
                                Your registration includes:
                            </p>

                            <ul className="registration-card__list">
                                <li>Hands-On Training</li>
                                <li>90 Minute Sessions</li>
                                <li>AI, MLOps, Cloud & Database Tools</li>
                                <li>Limited-Capacity Seating</li>
                            </ul>
                        </div>
                    </div>

                    <Link
                        to="/workshops"
                        className="registration-card__button registration-card__button--secondary"
                        aria-label="View and register for URI CS Connect Day workshops"
                    >
                        Browse Workshops
                    </Link>
                </article>
            </div>
        </section>
    );
}

export default RegisterSection;