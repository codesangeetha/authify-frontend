import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AdminDashboard.module.css';
import AdminLogout from '../adminLogout/AdminLogout';

import { useSelector } from 'react-redux';
import { type RootState } from '../../store/store';

const AdminDashboard: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (token == null) {
            navigate("/adminlogin");
        }
    }, []);

    const token = useSelector((state: RootState) => state.auth.token);

    const goToAdminHome = () => {
        navigate("/adminhome");
    };

    return (
        <div className={styles.dashboardLayout}>
            <div style={{ position: 'absolute', top: 24, right: 32 }}>
                <AdminLogout />
            </div>
            <aside className={styles.sidePanel}>
                <div className={styles.sideTitle}>Admin Panel</div>
                <button className={styles.navButton} onClick={goToAdminHome}>
                    User Management
                </button>
            </aside>
            <main className={styles.mainContent}>
                <div className={styles.mainTitle}>Welcome to the Admin Dashboard</div>
                <p style={{ color: '#64748b', fontSize: '1.1rem', textAlign: 'center', maxWidth: 500 }}>
                    Use the side panel to manage users and access other admin features.
                </p>
            </main>
        </div>
    );
};

export default AdminDashboard;
