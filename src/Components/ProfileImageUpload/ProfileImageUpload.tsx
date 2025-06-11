import { useState, type ChangeEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './ProfileImageUpload.module.css';

import { useSelector } from 'react-redux';
import { type RootState } from '../../store/store';
import Logout from '../Logout/Logout';

const ProfileImageUpload = () => {

    const navigate = useNavigate();

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadStatus, setUploadStatus] = useState<string>('');

    const [backendError, setBackendError] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const token = useSelector((state: RootState) => state.auth.token);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        } else {
            setSelectedFile(null);
        }
    };

    const handleUpload = (): void => {
        if (!selectedFile) {
            setUploadStatus('Please select a file first.');
            return;
        }
        const formData = new FormData();
        formData.append('profileImage', selectedFile);

        axios.post('http://localhost:5000/api/user/profile/upload', formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            }
        })            .then(() => {
                setSuccess(true);
            })
            .catch(() => {
                setBackendError(true);
            })

    }
    const goToProfile = (): void => {
        navigate('/profile');
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>Upload Profile Image</h1>
                
                <div className={styles.uploadArea}>
                    <input 
                        type="file" 
                        onChange={handleFileChange} 
                        accept="image/*" 
                        className={styles.fileInput}
                    />
                    {selectedFile && (
                        <div className={styles.selectedFileName}>
                            Selected: {selectedFile.name}
                        </div>
                    )}
                </div>

                <button 
                    onClick={handleUpload} 
                    disabled={!selectedFile}
                    className={styles.button}
                >
                    Upload Image
                </button>

                {backendError && (
                    <div className={`${styles.message} ${styles.error}`}>
                        Failed to upload image
                    </div>
                )}
                
                {success && (
                    <div className={`${styles.message} ${styles.success}`}>
                        Image uploaded successfully
                    </div>
                )}
                
                {uploadStatus && (
                    <div className={`${styles.message} ${styles.error}`}>
                        {uploadStatus}
                    </div>
                )}

                <p 
                    onClick={goToProfile}
                    className={styles.backLink}
                >
                    Back to Profile
                </p>
            </div>
            <Logout/>
        </div>
    );
}

export default ProfileImageUpload;
