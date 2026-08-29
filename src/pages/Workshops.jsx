import {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';

import WorkshopSession from './WorkshopSession';
import ReservationModal from '../components/ReservationModal';

import './Workshops.css';

function Workshops() {
    const [workshops, setWorkshops] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const [authenticatedUser, setAuthenticatedUser] = useState(null);
    const [credential, setCredential] = useState(null);

    const [studentRegistrations, setStudentRegistrations,] = useState([]);
    const [selectedWorkshop, setSelectedWorkshop] = useState(null);
    const [modalMode, setModalMode] = useState('reserve');
    const [modalMessage, setModalMessage] = useState('');
    const [modalMessageType, setModalMessageType] = useState('success');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [modalComplete, setModalComplete] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        async function loadWorkshops() {
            try {
                setIsLoading(true);
                setErrorMessage('');

                const apiUrl = import.meta.env.VITE_WORKSHOPS_API_URL;

                if (!apiUrl) {
                    throw new Error(
                        'The workshops API URL has not been configured.'
                    );
                }

                const response = await fetch(
                    apiUrl,
                    {
                        method: 'GET',

                        headers: {
                            Accept: 'application/json',
                        },

                        signal: controller.signal,
                    }
                );

                if (!response.ok) {
                    throw new Error(
                        `The server returned status ${response.status}.`
                    );
                }

                const data =
                    await response.json();

                if (
                    !data.success ||
                    !Array.isArray(data.workshops)
                ) {
                    throw new Error(data.message || 'The workshop response was invalid.');
                }

                setWorkshops(data.workshops);

            } catch (error) {
                if (error.name === 'AbortError') {
                    return;
                }

                console.error(
                    'Unable to load workshops:',
                    error
                );

                setErrorMessage('Workshop information is temporarily unavailable. Please try again later.');

            } finally {
                if (!controller.signal.aborted) {
                    setIsLoading(false);
                }
            }
        }

        loadWorkshops();

        return () => {
            controller.abort();
        };
    }, []);


    const loadMyRegistrations = useCallback(
        async (googleCredential) => {
            const apiUrl = import.meta.env.VITE_MY_REGISTRATIONS_API_URL;

            if (!apiUrl) {
                throw new Error('The registrations API has not been configured.');
            }

            const response = await fetch(
                apiUrl,
                {
                    method: 'POST',

                    headers: {
                        'Content-Type':
                            'application/json',

                        Accept:
                            'application/json',
                    },

                    body: JSON.stringify({
                        credential:
                            googleCredential,
                    }),
                }
            );

            const data =
                await response.json();

            if (
                !response.ok ||
                !data.success ||
                !Array.isArray(
                    data.registrations
                )
            ) {
                throw new Error(data.message || 'Unable to retrieve your registrations.');
            }

            setStudentRegistrations(data.registrations);

            return data.registrations;
        },
        []
    );

    const handleAuthenticated = useCallback(
        async ({ user, credential }) => {
            setAuthenticatedUser(user);
            setCredential(credential);

            setModalMessage('');
            setModalMessageType('success');

            try {
                const registrations =
                    await loadMyRegistrations(
                        credential
                    );

                if (
                    selectedWorkshop &&
                    registrations.some(
                        (registration) =>
                            Number(
                                registration.workshop_id
                            ) ===
                            Number(
                                selectedWorkshop.workshop_id
                            )
                    )
                ) {
                    setModalMessage('You already have a seat reserved in this workshop.');

                    setModalMessageType('success');
                }

            } catch (error) {
                console.error(
                    'Unable to retrieve registrations:',
                    error
                );

                setModalMessage(error.message);

                setModalMessageType('error');
            }
        },
        [
            loadMyRegistrations,
            selectedWorkshop,
        ]
    );


    const handleAuthenticationError =
        useCallback((message) => {
            setModalMessage(message);

            setModalMessageType('error');
        }, []);


    function handleReserveWorkshop(workshop) {
        setSelectedWorkshop(workshop);
        setModalMode('reserve');
        setModalMessage('');
        setModalMessageType('success');
        setModalComplete(false);
    }


    function handleCancelWorkshop(workshop) {
        setSelectedWorkshop(workshop);
        setModalMode('cancel');
        setModalMessage('');
        setModalMessageType('success');
        setModalComplete(false);
    }


    function closeModal() {
        if (isSubmitting) {
            return;
        }

        setSelectedWorkshop(null);
        setModalMessage('');
        setModalComplete(false);
    }

    async function handleConfirmRegistration() {
        if (!credential || !selectedWorkshop) {
            return;
        }

        try {
            setIsSubmitting(true);
            setModalMessage('');

            const response = await fetch(
                import.meta.env
                    .VITE_WORKSHOP_REGISTRATION_API_URL,
                {
                    method: 'POST',

                    headers: {
                        'Content-Type':
                            'application/json',

                        Accept:
                            'application/json',
                    },

                    body: JSON.stringify({
                        workshop_id:
                            Number(
                                selectedWorkshop.workshop_id
                            ),

                        credential,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || 'Workshop registration failed.');
            }

            const registration = data.registration;

            setStudentRegistrations((currentRegistrations) => [...currentRegistrations,registration,]);

            setWorkshops(
                (currentWorkshops) =>
                    currentWorkshops.map(
                        (workshop) => {
                            if (
                                Number(
                                    workshop.workshop_id
                                ) !==
                                Number(
                                    selectedWorkshop.workshop_id
                                )
                            ) {
                                return workshop;
                            }

                            return {
                                ...workshop,

                                registration_count:
                                    Number(
                                        workshop.registration_count
                                    ) + 1,

                                seats_remaining:
                                    registration.seats_remaining,
                            };
                        }
                    )
            );

            setModalMessage('Your seat has been reserved successfully.');

            setModalComplete(true);

            setModalMessageType('success');

        } catch (error) {
            setModalMessage(error.message || 'Workshop registration failed.');

            setModalMessageType('error');

        } finally {
            setIsSubmitting(false);
        }
    }

    async function handleConfirmCancellation() {
        if (!credential || !selectedWorkshop) {
            return;
        }

        try {
            setIsSubmitting(true);
            setModalMessage('');

            const response = await fetch(
                import.meta.env
                    .VITE_CANCEL_WORKSHOP_API_URL,
                {
                    method: 'POST',

                    headers: {
                        'Content-Type':
                            'application/json',

                        Accept:
                            'application/json',
                    },

                    body: JSON.stringify({
                        workshop_id:
                            Number(
                                selectedWorkshop.workshop_id
                            ),

                        credential,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok || !data.success
            ) {
                throw new Error(data.message || 'Unable to cancel your reservation.');
            }

            setStudentRegistrations(
                (currentRegistrations) =>
                    currentRegistrations.filter(
                        (registration) =>
                            Number(
                                registration.workshop_id
                            ) !==
                            Number(
                                selectedWorkshop.workshop_id
                            )
                    )
            );

            setWorkshops(
                (currentWorkshops) =>
                    currentWorkshops.map(
                        (workshop) => {
                            if (Number(workshop.workshop_id) !== Number(selectedWorkshop.workshop_id)) {
                                return workshop;
                            }

                            return {
                                ...workshop,

                                registration_count:
                                    Math.max(Number(workshop.registration_count) - 1, 0),

                                seats_remaining:
                                    Math.min(Number(workshop.seats_remaining) + 1, Number(workshop.capacity)),
                            };
                        }
                    )
            );

            setModalMessage('Your workshop reservation has been cancelled.');

            setModalMessageType('success');

            setModalComplete(true);

        } catch (error) {
            setModalMessage(error.message || 'Unable to cancel your reservation.');

            setModalMessageType('error');

        } finally {
            setIsSubmitting(false);
        }
    }

    const workshopsBySession =
        useMemo(() => {
            return workshops.reduce(
                (
                    sessions,
                    workshop
                ) => {
                    const sessionNumber =
                        Number(
                            workshop.session_number
                        );

                    if (!Number.isInteger(sessionNumber)) {
                        return sessions;
                    }

                    if (!sessions[sessionNumber]) {
                        sessions[sessionNumber] = [];
                    }

                    sessions[sessionNumber].push(workshop);

                    return sessions;
                },
                {}
            );
        }, [workshops]);


    const sessionNumbers =
        Object.keys(
            workshopsBySession
        )
            .map(Number)
            .sort(
                (
                    firstSession,
                    secondSession
                ) =>
                    firstSession -
                    secondSession
            );


    return (
        <main
            id="main-content"
            className="workshops-page"
        >
            <section
                className="workshops-hero"
                aria-labelledby="workshops-page-heading"
            >
                <div className="workshops-hero__content">
                    <p className="workshops-hero__eyebrow">
                        Afternoon Workshops
                    </p>

                    <h1 id="workshops-page-heading">
                        Workshop Registration
                    </h1>

                    <p className="workshops-hero__description">
                        Explore hands-on workshops led by
                        industry professionals covering
                        emerging technologies, technical
                        skills, and career preparation.
                    </p>
                </div>
            </section>


            <section
                className="workshops-registration-note"
                aria-labelledby="registration-note-heading"
            >
                <div className="workshops-registration-note__content">
                    <div>
                        <p className="section-eyebrow">
                            Separate Registration
                        </p>

                        <h2 id="registration-note-heading">
                            Main Event registration does not
                            include workshops.
                        </h2>

                        <p>
                            Workshops are divided into two
                            concurrent sessions. Students may
                            reserve one workshop in each
                            session, subject to availability.
                        </p>

                        {authenticatedUser && (
                            <p className="workshops-signed-in">
                                Signed in as{' '}
                                <strong>
                                    {
                                        authenticatedUser.email
                                    }
                                </strong>
                            </p>
                        )}
                    </div>

                    <a
                        href="https://app.joinhandshake.com/stu/events/1957249"
                        className="workshops-registration-note__button"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Main Event Registration
                    </a>
                </div>
            </section>


            <section
                className="workshops-list"
                aria-labelledby="available-workshops-heading"
            >
                <div className="workshops-list__header">
                    <p className="section-eyebrow">
                        Available Workshops
                    </p>

                    <h2 id="available-workshops-heading">
                        Choose your afternoon sessions.
                    </h2>

                    <p>
                        Workshops within the same session occur
                        at the same time. Review the options
                        below before reserving your seats.
                    </p>
                </div>

                {isLoading && (
                    <p
                        className="workshops-status"
                        role="status"
                    >
                        Loading workshops…
                    </p>
                )}

                {!isLoading &&
                    errorMessage && (
                        <div className="workshops-status workshops-status--error">
                            <p role="alert">
                                {errorMessage}
                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    window.location.reload()
                                }
                            >
                                Try Again
                            </button>
                        </div>
                    )}

                {!isLoading &&
                    !errorMessage &&
                    workshops.length ===
                        0 && (
                        <p className="workshops-status">
                            No workshops are currently
                            available.
                        </p>
                    )}

                {!isLoading &&
                    !errorMessage &&
                    sessionNumbers.length >
                        0 && (
                        <div className="workshop-sessions">
                            {sessionNumbers.map(
                                (
                                    sessionNumber
                                ) => (
                                    <WorkshopSession
                                        key={sessionNumber}
                                        sessionNumber={sessionNumber}
                                        workshops={workshopsBySession[sessionNumber]}
                                        registrations={studentRegistrations}
                                        onReserve={handleReserveWorkshop}
                                        onCancel={handleCancelWorkshop}
                                    />
                                )
                            )}
                        </div>
                    )}
            </section>


            {selectedWorkshop && (
                <ReservationModal
                    workshop={selectedWorkshop}
                    mode={modalMode}
                    authenticatedUser={authenticatedUser}
                    isSubmitting={isSubmitting}
                    isComplete={modalComplete}
                    message={modalMessage}
                    messageType={modalMessageType}
                    onAuthenticated={handleAuthenticated}
                    onAuthenticationError={handleAuthenticationError}
                    onConfirmReservation={handleConfirmRegistration}
                    onConfirmCancellation={handleConfirmCancellation}
                    onClose={closeModal}
                />
            )}
        </main>
    );
}

export default Workshops;