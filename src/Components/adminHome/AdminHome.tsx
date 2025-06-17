import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './AdminHome.module.css';

import { useSelector } from 'react-redux';
import { type RootState } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import AdminLogout from '../adminLogout/AdminLogout';

interface PaginationData {
  page: number;
  totalPages: number;
}

const AdminHome: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<any[] | null>(null);
  const [pagination, setPagination] = useState<PaginationData>({ page: 1, totalPages: 1 });
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [limit] = useState<number>(5);

  useEffect(() => {
    if (token == null) {
      navigate("/adminlogin");
    }
    fetchFn();
  }, [pagination.page, searchQuery]);

  const token = useSelector((state: RootState) => state.auth.token);

  const fetchFn = () => {
    const queryParams = new URLSearchParams();
    queryParams.append('limit', limit.toString());
    queryParams.append('page', pagination.page.toString());
    if (searchQuery) {
      queryParams.append('search', searchQuery);
    }

    axios.get(`http://localhost:5000/api/admin/users?${queryParams.toString()}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => {
        setData(res.data.users);
        setPagination(res.data.pagination);
      })
      .catch(error => {
        console.error("Error fetching users:", error);
      });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPagination(prev => ({ ...prev, page: 1 })); // Reset to first page on search
  };

  const handlePrevPage = () => {
    setPagination(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }));
  };

  const handleNextPage = () => {
    setPagination(prev => ({ ...prev, page: Math.min(prev.totalPages, prev.page + 1) }));
  };

  const editFn = (id: string) => {
    navigate(`/edituser/${id}`);
  }

  const deleteFn = (id: number) => {
    console.log("delete button clicked", id)

    const confirm = window.confirm("Are you sure you want to delete this?");
    console.log("confirm", confirm);

    if (confirm == true) {
      axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then((res) => {
          console.log("deleted successfully", { res });
          alert("Deleted successfully");
          fetchFn();
        })
        .catch(error => {
          console.log("error has occured", error);
        })
    }
  }

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

      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={handleSearch}
          className={styles.searchInput}
        />
      </div>

      {data && data.length > 0 ? (
        <>
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

          <div className={styles.pagination}>
            <button
              className={styles.paginationButton}
              onClick={handlePrevPage}
              disabled={pagination.page <= 1}
            >
              Previous
            </button>
            <span className={styles.pageInfo}>
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <button
              className={styles.paginationButton}
              onClick={handleNextPage}
              disabled={pagination.page >= pagination.totalPages}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <div className={styles.noData}>
          {searchQuery ? 'No users found matching your search' : 'No users found'}
        </div>
      )}

      <AdminLogout />
    </div>
  );
}

export default AdminHome;
