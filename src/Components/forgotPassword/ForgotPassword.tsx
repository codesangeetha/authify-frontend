import React, { useState } from 'react';
import axios from 'axios';
import styles from './ForgotPassword.module.css';

const ForgotPassword: React.FC = () => {
    const [error, setError] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [backendError, setBackendError] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    const emailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        setError("");
        setBackendError(false);
    };

    const submitFn = () => {
        setBackendError(false);
        let hasError = false;

        if (!email) {
            setError("Please enter your email address");
            hasError = true;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Please enter a valid email address");
            hasError = true;
        }

        if (!hasError) {
            const postData = {
                email: email
            };

            axios.post("http://localhost:5000/api/auth/forgot-password", postData)
                .then((res) => {
                    console.log(res.data);
                    setSuccess(true);
                    setEmail(''); // Clear the input after success
                })
                .catch(() => {
                    setBackendError(true);
                });
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            submitFn();
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>Forgot Password</h1>
                
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="email">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={emailChange}
                        onKeyPress={handleKeyPress}
                        className={styles.input}
                        placeholder="Enter your email"
                        autoComplete="email"
                    />
                    {error && <p className={styles.error}>{error}</p>}
                </div>

                <button 
                    onClick={submitFn}
                    className={styles.button}
                >
                    Reset Password
                </button>

                {success && (
                    <div className={styles.successMessage}>
                        Password reset link has been sent to your email
                    </div>
                )}

                {backendError && (
                    <div className={styles.errorMessage}>
                        Something went wrong. Please try again later.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
