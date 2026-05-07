import styles from "./ToastNotification.module.css";

export default function ToastNotification({ message }) {
  if (!message) return null;
  return (
    <div className={styles.toast}>
      <span>🔔</span> {message}
    </div>
  );
}
