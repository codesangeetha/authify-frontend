import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './CreateUser.module.css';

import { useSelector } from 'react-redux';
import { type RootState } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import AdminLogout from '../adminLogout/AdminLogout';

const CreateUser = () => {
    const navigate = useNavigate();

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [error1, setError1] = useState<string>("");
    const [error2, setError2] = useState<string>("");
    const [error3, setError3] = useState<string>("");

    const [backendError, setBackendError] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    const token = useSelector((state: RootState) => state.auth.token);

    const nameFn = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
        setError1("");
    }
    const mailFn = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        setError2("");
    }
    const pwdFn = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        setError3("");
    }

 useEffect(() => {
        if(token == null){
            navigate('/adminlogin');
        }
        
    }, []);

    const createFn = () => {

        let hasError = false;
        if (!name) {
            setError1("Please enter Username");
            hasError = true;
        }
        if (!email) {
            setError2("Please enter Email");
            hasError = true;
        }

        if (!password) {
            setError3("Please enter Password");
            hasError = true;
        }

        if (!hasError) {
            console.log("Ready to axios");

            const postData = {
                username: name,
                email: email,
                password: password
            }

            axios.post("http://localhost:5000/api/admin/users", postData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then((res) => {
                    console.log(res.data);
                    setSuccess(true);
                    // navigate('/home');
                })
                .catch((error) => {
                    console.log(error)
                    setBackendError(true);
                })
        }
    }

    const goToAdminhome = () => {
        navigate('/adminhome')
    }

    return (
        <div className={styles.container}>
            <AdminLogout />
            <div className={styles.content}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Create New User</h1>
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Username</label>
                    <input 
                        type="text" 
                        onChange={nameFn}
                        className={styles.input}
                        placeholder="Enter username"
                    />
                    {error1 && <p className={styles.error}>{error1}</p>}
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Email</label>
                    <input 
                        type="email" 
                        onChange={mailFn}
                        className={styles.input}
                        placeholder="Enter email"
                    />
                    {error2 && <p className={styles.error}>{error2}</p>}
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Password</label>
                    <input 
                        type="password" 
                        onChange={pwdFn}
                        className={styles.input}
                        placeholder="Enter password"
                    />
                    {error3 && <p className={styles.error}>{error3}</p>}
                </div>

                <button 
                    onClick={createFn}
                    className={styles.button}
                >
                    Create User
                </button>

                {backendError && (
                    <div className={`${styles.message} ${styles.error}`}>
                        Invalid credentials
                    </div>
                )}

                {success && (
                    <div className={`${styles.message} ${styles.success}`}>
                        User created successfully
                    </div>
                )}

                <p 
                    onClick={goToAdminhome}
                    className={styles.backLink}
                >
                    Back to Home
                </p>
            </div>
        </div>
    )
}

export default CreateUser;
