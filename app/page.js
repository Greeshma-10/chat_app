// pages/index.js
import Link from 'next/link';
import styles from '/styles/page.module.css'; // Importing the existing CSS module for styles

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to the Chat App</h1>
      <Link href="/chat" className={styles.link}>
        Go to Chat Room
      </Link>
      <br /> {/* Optional line break for spacing */}
      <Link href="/groups" className={styles.link}>
        View Groups Related to Women's Health
      </Link>
    </div>
  );
}

