import { useCallback, useState } from 'react';
import GoogleSignIn from '../components/GoogleSignIn';
import './AuthTest.css';

function AuthTest() {

    const [testWorkshopId, setTestWorkshopId] = useState('1');
    const [registrationMessage, setRegistrationMessage] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const handleAuthenticated = useCallback(
        ({ user, credential }) => {
            setAuthenticatedUser(user);
            setCredential(credential);
            setErrorMessage('');
        },
        []
    );

    const handleAuthenticationError = useCallback(
        (message) => {
            setAuthenticatedUser(null);
            setCredential(null);
            setErrorMessage(message);
        },
        []
    );

    function handleSignOut() {
        setAuthenticatedUser(null);
        setCredential(null);
        setErrorMessage('');

        window.google?.accounts?.id
            ?.disableAutoSelect();
    }

    async function handleTestRegistration() {
        try {
            setRegistrationMessage('');

            const response = await fetch(
                import.meta.env.VITE_WORKSHOP_REGISTRATION_API_URL,
                {
                    method: 'POST',

                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },

                    body: JSON.stringify({
                        workshop_id: Number(testWorkshopId),
                        credential,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(
                    data.message ||
                        'Workshop registration failed.'
                );
            }

            setRegistrationMessage(
                `${data.message} ${data.registration.seats_remaining} seats remain.`
            );

        } catch (error) {
            setRegistrationMessage(
                error.message ||
                    'Workshop registration failed.'
            );
        }
    }

    return (
        <main
            id="main-content"
            className="auth-test-page"
        >
            <section
                className="auth-test"
                aria-labelledby="auth-test-heading"
            >
                <div className="auth-test__card">
                    <p className="auth-test__eyebrow">
                        Authentication Test
                    </p>

                    <h1 id="auth-test-heading">
                        URI Google Sign-In
                    </h1>

                    {!authenticatedUser && (
                        <>
                            <p className="auth-test__description">
                                Sign in with your URI Google
                                account to test workshop
                                authentication.
                            </p>

                            {errorMessage && (
                                <div
                                    className="auth-test__error"
                                    role="alert"
                                >
                                    {errorMessage}
                                </div>
                            )}

                            <GoogleSignIn
                                onAuthenticated={
                                    handleAuthenticated
                                }
                                onAuthenticationError={
                                    handleAuthenticationError
                                }
                            />

                            <p className="auth-test__privacy">
                                Your Google password is never
                                sent to or stored by URI CS
                                Connect Day.
                            </p>
                        </>
                    )}

                    {authenticatedUser && (
                        <div className="auth-test__success">
                            <div
                                className="auth-test__status"
                                role="status"
                            >
                                Authentication successful
                            </div>

                            <h2>
                                {authenticatedUser.name ||
                                    'URI Student'}
                            </h2>

                            <p>
                                {authenticatedUser.email}
                            </p>

                            <dl>
                                <div>
                                    <dt>
                                        Workspace domain
                                    </dt>
                                    <dd>
                                        {
                                            authenticatedUser.hosted_domain
                                        }
                                    </dd>
                                </div>

                                <div>
                                    <dt>
                                        Google account ID
                                    </dt>
                                    <dd>
                                        {
                                            authenticatedUser.google_id
                                        }
                                    </dd>
                                </div>
                            </dl>

                            <button
                                type="button"
                                onClick={handleSignOut}
                            >
                                Sign Out
                            </button>

                            {credential && (
                                <p>
                                    A verified Google credential
                                    is available for future
                                    registration requests.
                                </p>
                            )}
                        </div>
                    )}
                </div>

                <div className="auth-test__registration-test">
                    <h3>Test Workshop Registration</h3>

                    <label htmlFor="test-workshop-id">
                        Workshop ID
                    </label>

                    <input
                        id="test-workshop-id"
                        type="number"
                        min="1"
                        value={testWorkshopId}
                        onChange={(event) => {
                            setTestWorkshopId(event.target.value);
                        }}
                    />

                    <button
                        type="button"
                        onClick={handleTestRegistration}
                    >
                        Test Registration
                    </button>

                    {registrationMessage && (
                        <p role="status">
                            {registrationMessage}
                        </p>
                    )}
                </div>

            </section>
        </main>
    );
}

export default AuthTest;