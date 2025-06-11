import React from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './AdminLogout.module.css';
import { type AppDispatch } from '../../store/store';
import { setToken } from '../../store/authSlice';
import { useDispatch } from 'react-redux';

const AdminLogout: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const logout = () => {
        dispatch(setToken(""));
        navigate('/adminlogin');
    }

    return (
        <div className={styles.logoutContainer}>
            <button
                onClick={logout}
                className={styles.logoutButton}
            >
                Logout
            </button>
        </div>
    )
}

export default AdminLogout;
