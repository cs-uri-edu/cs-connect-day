import WorkshopCard from './WorkshopCard';

function formatTime(dateTime) {
    if (!dateTime) {
        return null;
    }

    const timePart =
        dateTime.includes('T')
            ? dateTime.split('T')[1]
            : dateTime.split(' ')[1];

    if (!timePart) {
        return null;
    }

    const [
        hourValue,
        minuteValue,
    ] = timePart.split(':');

    const hour =
        Number(hourValue);

    const minute =
        Number(minuteValue);

    if (
        !Number.isInteger(hour) ||
        !Number.isInteger(minute)
    ) {
        return null;
    }

    const formattingDate =
        new Date(
            2000,
            0,
            1,
            hour,
            minute
        );

    return new Intl.DateTimeFormat(
        'en-US',
        {
            hour: 'numeric',
            minute: '2-digit',
        }
    ).format(formattingDate);
}


function getSessionTime(workshops) {
    const firstWorkshop =
        workshops[0];

    if (!firstWorkshop) {
        return 'Time to be announced';
    }

    const startTime =
        formatTime(
            firstWorkshop.start_time
        );

    const endTime =
        formatTime(
            firstWorkshop.end_time
        );

    if (
        !startTime ||
        !endTime
    ) {
        return 'Time to be announced';
    }

    return `${startTime} – ${endTime}`;
}


function WorkshopSession({
    sessionNumber,
    workshops,
    registrations,
    onReserve,
    onCancel,
}) {
    const sessionTime =
        getSessionTime(workshops);

    const headingId =
        `workshop-session-${sessionNumber}-heading`;

    const sessionRegistration =
        registrations.find(
            (registration) =>
                Number(
                    registration.session_number
                ) ===
                Number(sessionNumber)
        );

    return (
        <section
            className="workshop-session"
            aria-labelledby={headingId}
        >
            <div className="workshop-session__header">
                <div>
                    <p className="workshop-session__label">
                        Session {sessionNumber}
                    </p>

                    <h3 id={headingId}>
                        {sessionTime}
                    </h3>
                </div>

                <p className="workshop-session__guidance">
                    Choose one workshop from this
                    session.
                </p>
            </div>

            <div className="workshop-session__cards">
                {workshops.map(
                    (workshop) => {
                        const isRegistered =
                            Number(
                                sessionRegistration
                                    ?.workshop_id
                            ) ===
                            Number(
                                workshop.workshop_id
                            );

                        const hasSessionConflict =
                            Boolean(
                                sessionRegistration
                            ) &&
                            !isRegistered;

                        return (
                            <WorkshopCard
                                key={
                                    workshop.workshop_id
                                }
                                workshop={
                                    workshop
                                }
                                isRegistered={
                                    isRegistered
                                }
                                hasSessionConflict={
                                    hasSessionConflict
                                }
                                onReserve={
                                    onReserve
                                }
                                onCancel={
                                    onCancel
                                }
                            />
                        );
                    }
                )}
            </div>
        </section>
    );
}

export default WorkshopSession;