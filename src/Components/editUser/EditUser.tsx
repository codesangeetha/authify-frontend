import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './EditUser.module.css';

import { useSelector } from 'react-redux';
import { type RootState } from '../../store/store';
import AdminLogout from '../adminLogout/AdminLogout';

const EditUser: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const [error1, setError1] = useState<string>("");
    const [error2, setError2] = useState<string>("");

    const [backendError, setBackendError] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    const token = useSelector((state: RootState) => state.auth.token);

    useEffect(() => {
        if (token == null) {
            navigate('/adminlogin');
        }

        axios.get(`http://localhost:5000/api/admin/users/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                setName(res.data.username);
                setEmail(res.data.email);
            })

    }, [token]);



    const nameFn = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
        setError1("");
    }
    const mailFn = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        setError2("");
    }

    const updateFn = () => {
        let hasError = false;


        if (!name) {
            setError1("Please enter Username");
            hasError = true;
        }
        if (!email) {
            setError2("Please enter Email");
            hasError = true;
        }
        if (!hasError) {
            console.log("ready to axios");

            const postData = {
                username: name,
                email: email
            }

            axios.put(`http://localhost:5000/api/admin/users/${id}`, postData, {
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

    const goToAdminHome = () => {
        navigate('/adminhome');
    };

    return (
        <div className={styles.container}>
            <AdminLogout />
            <div className={styles.content}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Edit User</h1>

                </div>

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

                <button
                    onClick={updateFn}
                    className={styles.button}
                >
                    Update User
                </button>

                {backendError && (
                    <div className={`${styles.message} ${styles.error}`}>
                        Invalid credentials
                    </div>
                )}

                {success && (
                    <div className={`${styles.message} ${styles.success}`}>
                        Updated successfully
                    </div>
                )}

                <p
                    onClick={goToAdminHome}
                    className={styles.backLink}
                >
                    Back to Home
                </p>
            </div>
        </div>
    )
}

export default EditUser;
