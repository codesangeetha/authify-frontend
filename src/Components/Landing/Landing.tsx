import { useNavigate } from "react-router-dom";
import styles from "./Landing.module.css";

const Landing: React.FC = () => {
    const navigate = useNavigate();

    const goToLogin = () => {
        navigate('/login')
    }
    const goToRegister = () => {
        navigate('/register')
    }
    
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>Welcome</h1>
                <p className={styles.subtitle}>Sign in to access your account or create a new one to get started</p>
                <div className={styles.buttonContainer}>
                    <button 
                        className={`${styles.button} ${styles.primaryButton}`}
                        onClick={goToLogin}
                    >
                        Login
                    </button>
                    <button 
                        className={`${styles.button} ${styles.secondaryButton}`}
                        onClick={goToRegister}
                    >
                        Register
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Landing;