import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Login.module.css';

import { type AppDispatch } from '../../store/store';
import { setToken } from '../../store/authSlice';
import { useDispatch } from 'react-redux';

const Login: React.FC = () => {
    const navigate = useNavigate();

    const [mail, setEmail] = useState<string>("");
    const [pwd, setPwd] = useState<string>("");

    const [error1, setError1] = useState<string>("");
    const [error2, setError2] = useState<string>("");

    // const [data, setData] = useState<any>(null);
    const [backendError, setBackendError] = useState<boolean>(false);

    const dispatch = useDispatch<AppDispatch>();

    const emailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        setError1("");
    };

    const pwdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPwd(event.target.value);
        setError2("");
    }


    const loginFn = () => {

        let hasError = false;

        console.log("mail :", mail);
        console.log("pwd :", pwd);

        if (!mail) {
            setError1("Please enter Email");
            hasError = true;
        }
        if (!pwd) {
            setError2("Please enter Password");
            hasError = true;
        }

        if (!hasError) {
            console.log("Ready to axios");

            const postData = {
                email: mail,
                password: pwd
            }

            axios.post("http://localhost:5000/api/auth/login", postData)
                .then((res) => {
                    console.log(res.data);
                    dispatch(setToken(res.data.token));
                    // setData(res.data);
                    navigate('/home');
                })
                .catch(() => {
                    setBackendError(true);
                })

        }
    }

    const goForgotPwd = () => {
        navigate('/forgot-password');
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Email</label>
                    <input
                        type="email"
                        onChange={emailChange}
                        className={styles.input}
                        placeholder="Enter your email"
                    />
                    {error1 && <p className={styles.error}>{error1}</p>}
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Password</label>
                    <input
                        type="password"
                        onChange={pwdChange}
                        className={styles.input}
                        placeholder="Enter your password"
                    />
                    {error2 && <p className={styles.error}>{error2}</p>}
                </div>

                {backendError &&
                    <div className={styles.errorMessage}>
                        Invalid credentials
                    </div>
                }

                <button
                    onClick={loginFn}
                    className={styles.button}
                >
                    Login
                </button>
            </div>
            <p onClick={goForgotPwd} className={styles.backLink} style={{ cursor: "pointer" }}>Forgot password </p>

        </div>
    )
}

export default Login;
