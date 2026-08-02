import './Workshops.css';

const confirmedPartners = [
    'Fidelity',
    'Databricks',
];

function Workshops() {
    return (
        <main id="main-content" className="workshops-page">
            <section
                className="workshops-hero"
                aria-labelledby="workshops-page-heading"
            >
                <div className="workshops-hero__content">
                    <p className="workshops-hero__eyebrow">
                        Registration coming soon
                    </p>

                    <h1 id="workshops-page-heading">
                        Workshop Registration
                    </h1>

                    <p className="workshops-hero__description">
                        Explore hands-on workshops led by industry professionals
                        covering emerging technologies, technical skills, and
                        career preparation.
                    </p>
                </div>
            </section>

            <section
                className="workshops-notice-section"
                aria-labelledby="workshops-notice-heading"
            >
                <div className="workshops-notice">
                    <div className="workshops-notice__content">
                        <p className="workshops-notice__eyebrow">
                            Registration Coming Soon
                        </p>

                        <h2 id="workshops-notice-heading">
                            Check back for the full workshop schedule.
                        </h2>

                        <p>
                            Workshop registration is separate from Main Event
                            registration. This page will include workshop titles,
                            descriptions, presenters, room locations, available
                            seats, and registration options once the schedule is
                            finalized.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Workshops;