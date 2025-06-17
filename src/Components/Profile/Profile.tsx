import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Profile.module.css';

import { useSelector } from 'react-redux';
import { type RootState } from '../../store/store';
import Logout from '../Logout/Logout';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    if(token == null){
      navigate('/login');
    }
    axiosFn();
  }, []);

  const axiosFn = () => {
    axios.get('http://localhost:5000/api/user/profile', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => {
        console.log(res.data);
        setData(res.data)

      })

  };

  const editFn = (): void => {
    navigate('/updateprofile');
  }
  const editImgFn = (): void => {
    navigate('/profileimageupload');
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {data && (
          <>
            <div className={styles.profileSection}>
              {data.profileImage && (
                <img
                  src={`http://localhost:5000${data.profileImage}`}
                  alt="Profile"
                  className={styles.profileImage}
                />
              )}

              <div className={styles.infoGroup}>
                <div className={styles.label}>Username</div>
                <div className={styles.value}>{data.username}</div>
              </div>

              <div className={styles.infoGroup}>
                <div className={styles.label}>Email</div>
                <div className={styles.value}>{data.email}</div>
              </div>
            </div>

            <div className={styles.buttonContainer}>
              <button
                onClick={editFn}
                className={styles.button}
              >
                Edit Profile
              </button>
              <button
                onClick={editImgFn}
                className={styles.button}
              >
                Change Photo
              </button>
            </div>
          </>
        )}
      </div>
      <Logout/>
    </div>
  )
}

export default Profile;
