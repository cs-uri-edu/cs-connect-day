import GoogleSignIn from './GoogleSignIn';

function ReservationModal({
    workshop,
    mode,
    authenticatedUser,
    isSubmitting,
    isComplete,
    message,
    messageType,
    onAuthenticated,
    onAuthenticationError,
    onConfirmReservation,
    onConfirmCancellation,
    onClose,
}) {
    if (!workshop) {
        return null;
    }

    const isCancelMode = mode === 'cancel';

    return (
        <div
            className="reservation-modal"
            role="presentation"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <div
                className="reservation-modal__dialog"
                role="dialog"
                aria-modal="true"
                aria-labelledby="reservation-modal-heading"
            >
                <button
                    type="button"
                    className="reservation-modal__close"
                    onClick={onClose}
                    aria-label="Close registration dialog"
                >
                    ×
                </button>

                <p className="section-eyebrow">
                    {isCancelMode
                        ? 'Cancel Reservation'
                        : 'Workshop Registration'}
                </p>

                <h2 id="reservation-modal-heading">
                    {workshop.title}
                </h2>

                {isComplete && (
                    <div className="reservation-modal__complete">
                        <div
                            className="reservation-modal__complete-icon"
                            aria-hidden="true"
                        >
                            ✓
                        </div>

                        <h3>
                            {isCancelMode
                                ? 'Reservation Cancelled'
                                : 'Seat Reserved'}
                        </h3>

                        <p>{message}</p>

                        <button
                            type="button"
                            className="reservation-modal__primary"
                            onClick={onClose}
                        >
                            Done
                        </button>
                    </div>
                )}

                {!isComplete &&
                    !authenticatedUser &&
                    !isCancelMode && (
                        <>
                            <p className="reservation-modal__intro">
                                Sign in with your URI Google account to
                                continue with your workshop reservation.
                            </p>

                            {message && (
                                <div
                                    className={`reservation-modal__message reservation-modal__message--${messageType}`}
                                    role="alert"
                                >
                                    {message}
                                </div>
                            )}

                            <GoogleSignIn
                                onAuthenticated={onAuthenticated}
                                onAuthenticationError={
                                    onAuthenticationError
                                }
                            />

                            <p className="reservation-modal__privacy">
                                Your Google password is never sent to or
                                stored by URI CS Connect Day.
                            </p>
                        </>
                    )}

                {!isComplete &&
                    authenticatedUser &&
                    !isCancelMode && (
                        <>
                            <div className="reservation-modal__signed-in">
                                <span aria-hidden="true">✓</span>

                                <div>
                                    <strong>Signed in as</strong>

                                    <p>{authenticatedUser.email}</p>
                                </div>
                            </div>

                            <p className="reservation-modal__intro">
                                Would you like to reserve a seat in this
                                workshop?
                            </p>

                            {message && (
                                <div
                                    className={`reservation-modal__message reservation-modal__message--${messageType}`}
                                    role={
                                        messageType === 'error'
                                            ? 'alert'
                                            : 'status'
                                    }
                                >
                                    {message}
                                </div>
                            )}

                            <div className="reservation-modal__actions">
                                <button
                                    type="button"
                                    className="reservation-modal__secondary"
                                    onClick={onClose}
                                    disabled={isSubmitting}
                                >
                                    Not Now
                                </button>

                                <button
                                    type="button"
                                    className="reservation-modal__primary"
                                    onClick={onConfirmReservation}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting
                                        ? 'Reserving…'
                                        : 'Confirm Reservation'}
                                </button>
                            </div>
                        </>
                    )}

                {!isComplete &&
                    authenticatedUser &&
                    isCancelMode && (
                        <>
                            <p className="reservation-modal__intro">
                                Are you sure you want to cancel your
                                reservation for this workshop? Your seat
                                will become available to another student.
                            </p>

                            {message && (
                                <div
                                    className={`reservation-modal__message reservation-modal__message--${messageType}`}
                                    role={
                                        messageType === 'error'
                                            ? 'alert'
                                            : 'status'
                                    }
                                >
                                    {message}
                                </div>
                            )}

                            <div className="reservation-modal__actions">
                                <button
                                    type="button"
                                    className="reservation-modal__secondary"
                                    onClick={onClose}
                                    disabled={isSubmitting}
                                >
                                    Keep Reservation
                                </button>

                                <button
                                    type="button"
                                    className="reservation-modal__danger"
                                    onClick={onConfirmCancellation}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting
                                        ? 'Cancelling…'
                                        : 'Cancel Reservation'}
                                </button>
                            </div>
                        </>
                    )}
            </div>
        </div>
    );
}

export default ReservationModal;