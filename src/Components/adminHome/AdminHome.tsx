import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './AdminHome.module.css';

import { useSelector } from 'react-redux';
import { type RootState } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import AdminLogout from '../adminLogout/AdminLogout';

const AdminHome: React.FC = () => {
  const navigate = useNavigate();

  const [data, setData] = useState<any[] | null>(null);
  useEffect(() => {
    if(token == ""){
      navigate("/adminlogin");
    }
    fetchFn();
  }, []);

  const token = useSelector((state: RootState) => state.auth.token);
  const fetchFn = () => {
    axios.get('http://localhost:5000/api/admin/users', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => {
        console.log(res.data.users);
        setData(res.data.users);
      })
  }

  const editFn = (id: string) => {
    navigate(`/edituser/${id}`);
  }

  const deleteFn = (id: number) => {
    console.log("delete button clicked", id)

    axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => {
        console.log("deleted successfully", { res });
        fetchFn();
      })
      .catch(error => {
        console.log("error has occured", error);
      })

  };

  const createFn = () => {
    navigate('/createuser');
  }


  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>User Management</h1>
        <button
          onClick={createFn}
          className={styles.createButton}
        >
          Create New User
        </button>
      </div>

      {data && data.length > 0 ? (
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <div>ID</div>
            <div>Username</div>
            <div>Email</div>
            <div>Actions</div>
          </div>

          {data.map((obj: any, index: number) => (
            <div key={index} className={styles.tableRow}>
              <div className={styles.tableCell}>{obj.id}</div>
              <div className={styles.tableCell}>{obj.username}</div>
              <div className={styles.tableCell}>{obj.email}</div>
              <div className={styles.actions}>
                <button
                  onClick={() => editFn(obj.id)}
                  className={`${styles.actionButton} ${styles.editButton}`}
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteFn(obj.id)}
                  className={`${styles.actionButton} ${styles.deleteButton}`}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.noData}>
          No users found
        </div>
      )}

      <AdminLogout />
    </div>
  );
}

export default AdminHome;
