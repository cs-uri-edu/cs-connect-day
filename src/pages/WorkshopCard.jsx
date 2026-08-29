import { useState } from 'react';

const presenterLogos = import.meta.glob(
    '../assets/partner-logos/*',
    {
        eager: true,
        import: 'default',
    }
);


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


function getOrganizationInitials(
    organizationName
) {
    if (!organizationName) {
        return 'TBA';
    }

    return organizationName
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 3)
        .map(
            (word) =>
                word
                    .charAt(0)
                    .toUpperCase()
        )
        .join('');
}


function getAvailability(workshop) {
    const registrationOpen =
        Number(
            workshop.registration_open
        ) === 1;

    if (!registrationOpen) {
        return {
            status: 'closed',
            label:
                'Registration closed',
            buttonDisabled: true,
        };
    }

    const seatsRemaining =
        Number(
            workshop.seats_remaining
        );

    if (
        !Number.isFinite(
            seatsRemaining
        )
    ) {
        return {
            status: 'pending',
            label:
                'Availability unavailable',
            buttonDisabled: true,
        };
    }

    if (seatsRemaining <= 0) {
        return {
            status: 'full',
            label:
                'Workshop full',
            buttonDisabled: true,
        };
    }

    if (seatsRemaining <= 5) {
        return {
            status: 'low',

            label:
                `Only ${seatsRemaining} ${
                    seatsRemaining === 1
                        ? 'seat'
                        : 'seats'
                } left`,

            buttonDisabled: false,
        };
    }

    return {
        status: 'available',

        label:
            `${seatsRemaining} seats available`,

        buttonDisabled: false,
    };
}


function WorkshopCard({
    workshop,
    isRegistered,
    hasSessionConflict,
    onReserve,
    onCancel,
}) {
    const [isExpanded, setIsExpanded] =
        useState(false);

    const cardHeadingId =
        `workshop-${workshop.workshop_id}-heading`;

    const detailsId =
        `workshop-${workshop.workshop_id}-details`;

    const organization =
        workshop.presenter_organization ||
        'Organization to be announced';

    const presenter =
        workshop.presenter_name ||
        'Presenter to be announced';

    const organizationInitials =
        getOrganizationInitials(
            workshop.presenter_organization
        );

    /*
     * Keep this path consistent with however you
     * currently store your partner-logo assets.
     */
    const presenterImage = workshop.presenter_img
        ? presenterLogos[
            `../assets/partner-logos/${workshop.presenter_img}`
        ] || null
        : null;

    const startTime =
        formatTime(
            workshop.start_time
        );

    const endTime =
        formatTime(
            workshop.end_time
        );

    const timeLabel =
        startTime && endTime
            ? `${startTime} – ${endTime}`
            : 'Time to be announced';

    const locationLabel =
        workshop.building &&
        workshop.room_number
            ? `${workshop.building} ${workshop.room_number}`
            : 'Room to be announced';

    const availability =
        getAvailability(workshop);


    let buttonLabel =
        'Reserve Seat';

    let buttonDisabled =
        availability.buttonDisabled;


    if (availability.status === 'full') {
        buttonLabel =
            'Workshop Full';
    }

    if (availability.status === 'closed') {
        buttonLabel =
            'Unavailable';
    }

    if (availability.status === 'pending') {
        buttonLabel =
            'Unavailable';
    }

    if (hasSessionConflict) {
        buttonLabel =
            'Session Reserved';

        buttonDisabled =
            true;
    }


    return (
        <article
            className={`workshop-card ${
                isExpanded
                    ? 'workshop-card--expanded'
                    : ''
            } ${
                isRegistered
                    ? 'workshop-card--registered'
                    : ''
            }`}
            aria-labelledby={
                cardHeadingId
            }
        >
            <div className="workshop-card__main">
                <div className="workshop-card__organization">
                    {presenterImage ? (
                        <div className="workshop-card__logo">
                            <img
                                src={
                                    presenterImage
                                }
                                alt=""
                            />
                        </div>
                    ) : (
                        <div
                            className="workshop-card__logo-placeholder"
                            aria-hidden="true"
                        >
                            {
                                organizationInitials
                            }
                        </div>
                    )}
                </div>


                <div className="workshop-card__content">
                    <h4
                        id={
                            cardHeadingId
                        }
                    >
                        {workshop.title}
                    </h4>

                    <p
                        className={`workshop-card__description ${
                            isExpanded
                                ? 'workshop-card__description--expanded'
                                : ''
                        }`}
                    >
                        {workshop.description ||
                            'Workshop description to be announced.'}
                    </p>
                </div>


                <div className="workshop-card__registration">
                    {isRegistered ? (
                        <>
                            <p className="workshop-card__reserved-status">
                                <span aria-hidden="true">
                                    ✓
                                </span>

                                Seat Reserved
                            </p>

                            <button
                                type="button"
                                className="workshop-card__cancel-button"
                                onClick={() =>
                                    onCancel(
                                        workshop
                                    )
                                }
                            >
                                Cancel Reservation
                            </button>
                        </>
                    ) : (
                        <>
                            <p
                                className={`workshop-card__availability workshop-card__availability--${availability.status}`}
                            >
                                {
                                    availability.label
                                }
                            </p>

                            <button
                                type="button"
                                className="workshop-card__reserve-button"
                                onClick={() =>
                                    onReserve(
                                        workshop
                                    )
                                }
                                disabled={
                                    buttonDisabled
                                }
                            >
                                {
                                    buttonLabel
                                }
                            </button>
                        </>
                    )}
                </div>
            </div>


            <div
                id={detailsId}
                className="workshop-card__expanded-details"
                aria-hidden={
                    !isExpanded
                }
            >
                <dl>
                    <div>
                        <dt>
                            Presenter
                        </dt>

                        <dd>
                            {presenter}
                        </dd>
                    </div>

                    <div>
                        <dt>
                            Organization
                        </dt>

                        <dd>
                            {organization}
                        </dd>
                    </div>

                    <div>
                        <dt>
                            Capacity
                        </dt>

                        <dd>
                            {workshop.capacity !==
                                null &&
                            workshop.capacity !==
                                undefined
                                ? `${workshop.capacity} students`
                                : 'To be announced'}
                        </dd>
                    </div>

                    <div>
                        <dt>
                            Seats Remaining
                        </dt>

                        <dd>
                            {workshop.seats_remaining !==
                                null &&
                            workshop.seats_remaining !==
                                undefined
                                ? workshop.seats_remaining
                                : 'Unavailable'}
                        </dd>
                    </div>
                </dl>
            </div>


            <div className="workshop-card__footer">
                <div className="workshop-card__metadata">
                    <div className="workshop-card__metadata-item">
                        <span
                            className="workshop-card__metadata-icon"
                            aria-hidden="true"
                        >
                            ◷
                        </span>

                        <span>
                            {timeLabel}
                        </span>
                    </div>


                    <div className="workshop-card__metadata-item">
                        <span
                            className="workshop-card__metadata-icon"
                            aria-hidden="true"
                        >
                            📍
                        </span>

                        {workshop.map_url ? (
                            <a
                                href={
                                    workshop.map_url
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`View ${locationLabel} on the campus map`}
                            >
                                {
                                    locationLabel
                                }
                            </a>
                        ) : (
                            <span>
                                {
                                    locationLabel
                                }
                            </span>
                        )}
                    </div>
                </div>


                <button
                    type="button"
                    className="workshop-card__details-button"
                    onClick={() =>
                        setIsExpanded(
                            (
                                currentValue
                            ) =>
                                !currentValue
                        )
                    }
                    aria-expanded={
                        isExpanded
                    }
                    aria-controls={
                        detailsId
                    }
                >
                    {isExpanded
                        ? 'Show Less'
                        : 'Learn More'}

                    <span
                        className={
                            isExpanded
                                ? 'workshop-card__details-icon workshop-card__details-icon--open'
                                : 'workshop-card__details-icon'
                        }
                        aria-hidden="true"
                    >
                        +
                    </span>
                </button>
            </div>
        </article>
    );
}

export default WorkshopCard;