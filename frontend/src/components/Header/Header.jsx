import { Link, useLocation } from 'react-router-dom';
import styles from './header.module.css';
const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>DivvyUp</div>
            <nav className={styles.nav}>
                <Link to="/friends" className={styles.navItem}>Friends</Link>
                <Link to="/groups" className={styles.navItem}>Groups</Link>
                <Link to="/expenses" className={styles.navItem}>Expenses</Link>
            </nav>
            <div className={styles.profile}>P</div>
        </header>
    );
};

export default Header;