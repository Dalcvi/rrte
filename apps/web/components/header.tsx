import Link from 'next/link';
import styles from './header.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.ul}>
          <li>
            <Link className={styles.link} href="/">
              Paprastas
            </Link>
          </li>
          <li>
            <Link className={styles.link} href="/json">
              JSON turinys
            </Link>
          </li>
          <li>
            <Link className={styles.link} href="/html">
              HTML turinys
            </Link>
          </li>
          <li>
            <Link className={styles.link} href="/theme">
              Tematikos pakeitimai
            </Link>
          </li>
          <li>
            <Link className={styles.link} href="/comments">
              Komentarai
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
