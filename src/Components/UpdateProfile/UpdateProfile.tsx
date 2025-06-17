import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './UpdateProfile.module.css';

import { useSelector } from 'react-redux';
import { type RootState } from '../../store/store';
import Logout from '../Logout/Logout';

const UpdateProfile: React.FC = () => {
    const navigate = useNavigate();
    const token = useSelector((state: RootState) => state.auth.token);

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [error1, setError1] = useState<string>("");
    const [error2, setError2] = useState<string>("");
    const [backendError, setBackendError] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    useEffect(() => {
        if (token == null) {
            navigate('/login');
        }

        axios.get('http://localhost:5000/api/user/profile', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                setName(res.data.username);
                setEmail(res.data.email);
            })
            .catch(() => {
                setBackendError(true);
            });
    }, [token]);

    const nameFn = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
        setError1("");
    }
    const mailFn = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        setError2("");
    }


    const goProfile = () => {
        navigate('/profile');
    }

    const updateFn = () => {

        let hasError = false;

        console.log("name :", name);
        console.log("mail :", email);

        if (!name) {
            setError1("Please enter Username");
            hasError = true;
        }
        if (!email) {
            setError2("Please enter Email");
            hasError = true;
        }


        if (!hasError) {
            console.log("Ready to axios");

            const postData = {
                username: name,
                email: email
            }

            axios.put("http://localhost:5000/api/user/profile", postData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then((res) => {
                    console.log(res.data);
                    setSuccess(true);

                }).catch(() => {
                    setBackendError(true);
                })
        }

    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>Update Profile</h1>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Username</label>
                    <input
                        type="text"
                        onChange={nameFn}
                        className={styles.input}
                        placeholder="Enter new username"
                        value={name}
                    />
                    {error1 && <p className={styles.error}>{error1}</p>}
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Email</label>
                    <input
                        type="email"
                        onChange={mailFn}
                        className={styles.input}
                        placeholder="Enter new email"
                        value={email}
                    />
                    {error2 && <p className={styles.error}>{error2}</p>}
                </div>

                {backendError && (
                    <div className={`${styles.message} ${styles.error}`}>
                        Invalid credentials
                    </div>
                )}

                <button
                    onClick={updateFn}
                    className={styles.button}
                >
                    Update Profile
                </button>

                {success && (
                    <div className={`${styles.message} ${styles.success}`}>
                        Updated successfully
                    </div>
                )}

                <p
                    onClick={goProfile}
                    className={styles.backLink}
                >
                    Back to Profile
                </p>
            </div>
            <Logout />
        </div>
    )
}

export default UpdateProfile;
