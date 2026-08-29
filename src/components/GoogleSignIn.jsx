import { useEffect, useRef, useState } from 'react';

function GoogleSignIn({
    onAuthenticated,
    onAuthenticationError,
}) {
    const buttonRef = useRef(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        let retryTimer;
        let attempts = 0;

        function initializeGoogle() {
            const googleIdentity =
                window.google?.accounts?.id;

            if (
                googleIdentity &&
                buttonRef.current
            ) {
                const clientId =
                    import.meta.env.VITE_GOOGLE_CLIENT_ID;

                if (!clientId) {
                    onAuthenticationError(
                        'Google authentication has not been configured.'
                    );

                    return;
                }

                googleIdentity.initialize({
                    client_id: clientId,

                    hd: 'uri.edu',

                    callback: async (response) => {
                        try {
                            if (!response.credential) {
                                throw new Error(
                                    'Google did not return an authentication credential.'
                                );
                            }

                            const apiUrl =
                                import.meta.env
                                    .VITE_GOOGLE_AUTH_API_URL;

                            if (!apiUrl) {
                                throw new Error(
                                    'The authentication API has not been configured.'
                                );
                            }

                            const verificationResponse =
                                await fetch(apiUrl, {
                                    method: 'POST',

                                    headers: {
                                        'Content-Type':
                                            'application/json',
                                        Accept:
                                            'application/json',
                                    },

                                    body: JSON.stringify({
                                        credential:
                                            response.credential,
                                    }),
                                });

                            const data =
                                await verificationResponse.json();

                            if (
                                !verificationResponse.ok ||
                                !data.success
                            ) {
                                throw new Error(
                                    data.message ||
                                        'Authentication failed.'
                                );
                            }

                            onAuthenticated({
                                user: data.user,
                                credential:
                                    response.credential,
                            });
                        } catch (error) {
                            console.error(
                                'Google authentication failed:',
                                error
                            );

                            onAuthenticationError(
                                error.message ||
                                    'Unable to sign in with Google.'
                            );
                        }
                    },
                });

                googleIdentity.renderButton(
                    buttonRef.current,
                    {
                        theme: 'outline',
                        size: 'large',
                        shape: 'pill',
                        text: 'signin_with',
                        logo_alignment: 'left',
                        width: 280,
                    }
                );

                setIsReady(true);

                return;
            }

            attempts += 1;

            if (attempts < 50) {
                retryTimer = window.setTimeout(
                    initializeGoogle,
                    100
                );
            } else {
                onAuthenticationError(
                    'Google Sign-In could not be loaded. Please refresh the page.'
                );
            }
        }

        initializeGoogle();

        return () => {
            if (retryTimer) {
                window.clearTimeout(retryTimer);
            }
        };
    }, [
        onAuthenticated,
        onAuthenticationError,
    ]);

    return (
        <div className="google-sign-in">
            {!isReady && (
                <p role="status">
                    Loading Google Sign-In…
                </p>
            )}

            <div ref={buttonRef}></div>
        </div>
    );
}

export default GoogleSignIn;