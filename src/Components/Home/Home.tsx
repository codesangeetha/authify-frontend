import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

import { useSelector } from 'react-redux';
import { type RootState } from '../../store/store';
import Logout from '../Logout/Logout';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const [name, setName] = useState<any>(null);
    const token = useSelector((state: RootState) => state.auth.token);

    useEffect(() => {
        if(token == ""){
            navigate('/login');
        }
        axiosFn();
    }, []);

    const axiosFn = () => {
        
        axios.get('http://localhost:5000/api/auth/me', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log(res.data);
                setName(res.data.username);

            })
            .catch(error => {
                console.error('Error', error);
            });
    }

    const ProfileFn = () => {
        navigate('/profile');
    }
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.welcome}>
                    Welcome, {name || 'User'}
                </h1>
                <div>
                    <button 
                        onClick={ProfileFn}
                        className={styles.profileLink}
                    >
                        View Profile
                    </button>
                </div>
            </div>
            <Logout/>
        </div>
    )
}

export default Home;
