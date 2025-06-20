import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './ResetPwd.module.css';

const ResetPwd: React.FC = () => {
  const navigate = useNavigate();

  const [newPwd, setNewPwd] = useState<string>("");
  const [confirmpwd, setConfirmpwd] = useState<string>("");

  const [error, setError] = useState<string>("");
  const [confirmError, setConfirmError] = useState<string>("");

  const [backendError, setBackendError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const changePwwd = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPwd(event.target.value);
    setError("");
  }

  const confirmChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmpwd(event.target.value);
    setConfirmError("");
  }

  const { token } = useParams<{ token: string }>();


  const resetFn = () => {

    let hasError = false;

    if (!newPwd) {
      setError("Please enter new password");
      hasError = true;
    }

    if (!confirmpwd) {
      setConfirmError("Please enter confirm password");
      hasError = true;
    } else if (newPwd !== confirmpwd) {
      setConfirmError("New password and confirm password do not match");
      hasError = true;
    }

    if (!hasError) {

      const postData = {
        password: newPwd
      }

      axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, postData)
        .then((res) => {
          console.log(res.data);
          setSuccess(true);
        })
        .catch(() => {
          setBackendError(true);
        })
    }

  }

  const goToLogin = () => {
    navigate("/login");
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Reset Password</h1>
        <div className={styles.formGroup}>
          <label className={styles.label}>New Password</label>
          <input type="password" onChange={changePwwd} className={styles.input} placeholder="Enter new password" />
          {error && <p className={styles.error}>{error}</p>}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Confirm Password</label>
          <input type="password" onChange={confirmChange} className={styles.input} placeholder="Confirm new password" />
          {confirmError && <p className={styles.error}>{confirmError}</p>}
        </div>
        <button onClick={resetFn} className={styles.button}>Reset</button>
        {success && <div className={styles.successMessage}>Password reset successfully</div>}
        {backendError && <div className={styles.errorMessage}>Something went wrong</div>}
        <div className={styles.backToLogin} onClick={goToLogin}>Back to Login</div>
      </div>
    </div>
  )
}

export default ResetPwd;
