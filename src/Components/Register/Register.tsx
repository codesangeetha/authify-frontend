import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css';

const Register: React.FC = () => {
    const navigate = useNavigate();

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [error1, setError1] = useState<string>("");
    const [error2, setError2] = useState<string>("");
    const [error3, setError3] = useState<string>("");
    const [backendError, setBackendError] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

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

    const goLogin = () => {
        navigate('/login');
    }

    const regFn = () => {

        let hasError = false;

        console.log("name :", name);
        console.log("pwd :", password);
        console.log("mail :", email);

        if (!name) {
            setError1("Please enter Name");
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

            axios.post("http://localhost:5000/api/auth/register", postData)
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

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Username</label>
                    <input
                        type="text"
                        onChange={nameFn}
                        className={styles.input}
                    />
                    {error1 && <p className={styles.error}>{error1}</p>}
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Email</label>
                    <input
                        type="email"
                        onChange={mailFn}
                        className={styles.input}
                    />
                    {error2 && <p className={styles.error}>{error2}</p>}
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Password</label>
                    <input
                        type="password"
                        onChange={pwdFn}
                        className={styles.input}
                    />
                    {error3 && <p className={styles.error}>{error3}</p>}
                </div>

                {backendError &&
                    <div className={`${styles.message} ${styles.error}`}>
                       Email id already exist
                    </div>
                }

                <button
                    onClick={regFn}
                    className={styles.button}>
                
                    Register
                </button>

                {success &&
                    <div className={`${styles.message} ${styles.success}`}>
                        User registered successfully
                    </div>
                }

                <p
                    onClick={goLogin}
                    className={styles.loginLink}
                >
                    Already have an account? Login
                </p>
            </div>
        </div>
    );
}

export default Register;
