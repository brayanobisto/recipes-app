import { useLocation, Link } from 'react-router-dom';
import styles from './index.module.css';

function Navbar() {
  const { pathname } = useLocation();

  return (
    <div className={styles['navbar-container']}>
      <nav className={styles.navbar}>
        <ul>
          <li className={pathname === '/home' ? styles['link-active'] : styles.link}>
            <Link to='/home'>Home</Link>
          </li>
          <li className={pathname === '/recipes/create' ? styles['link-active'] : styles.link}>
            <Link to='/recipes/create'>Create</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
