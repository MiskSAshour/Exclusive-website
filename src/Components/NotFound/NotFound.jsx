import { useNavigate } from "react-router-dom";
import styles from "./NotFound.module.css";

export default function NotFound() {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/"); // Redirects to the home page
  };

  return (
    <div className={styles.notFoundContainer}>
      <h1 className={`font-inter ${styles.heading}`}>404 Not Found</h1>
      <p className={styles.description}>
        Your visited page not found. You may go home page.
      </p>
      <button className={styles.customButton} onClick={handleBackToHome}>
        Back to home page
      </button>
    </div>
  );
}
