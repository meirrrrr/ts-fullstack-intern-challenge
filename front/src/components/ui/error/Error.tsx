import styles from "./Error.module.css";

interface ErrorMessageProps {
  message: string | null;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className={styles.errorContainer}>
      <h2 className={styles.title}>Что то пошло не так</h2>
      <p className={styles.message}>{message}</p>
    </div>
  );
}
