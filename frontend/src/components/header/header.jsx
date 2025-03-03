import { Link } from 'react-router-dom';
import { useAuth } from '../../context/userContextAuth';
import styles from './header.module.css';
import { useDarkMode } from '../../context/darkModeContext';
import Icon from '../icon/icon';
import Avatar from '@mui/material/Avatar';

const Header = () => {
    const { darkMode, toggleDarkMode } = useDarkMode();
    const { token } = useAuth();  // Usar el token del AuthContext

    if (!token) {
        // Si no hay token, muestra un header alternativo (login/register)
        return (
            <header className={styles.header}>
                <h1 className={styles.logo}>DivvyUp</h1>
                <nav className={styles.nav}>
                    <Link to="/login" className={`${styles.navItem} ${darkMode ? styles.navItemDark : ''}`}>Login</Link>
                    <Link to="/register" className={`${styles.navItem} ${darkMode ? styles.navItemDark : ''}`}>Register</Link>
                </nav>
            </header>
        );
    }

    // Si hay token, muestra el header con las opciones de usuario
    return (
        <header className={`${styles.header} ${darkMode ? styles.headerDark : ''}`}>
            <h1 className={styles.logo}>DivvyUp</h1>
            <nav className={styles.nav}>
                <Link to="/friends" className={`${styles.navItem} ${darkMode ? styles.navItemDark : ''}`}>Friends</Link>
                <Link to="/groups" className={`${styles.navItem} ${darkMode ? styles.navItemDark : ''}`}>Groups</Link>
                <Link to="/expenses" className={`${styles.navItem} ${darkMode ? styles.navItemDark : ''}`}>Expenses</Link>
            </nav>
            <div className={styles.right}>
                {darkMode ? <Icon handleClick={() => toggleDarkMode()} variant='light' className='theme' /> : <Icon handleClick={() => toggleDarkMode()} variant='dark' className='theme' />}
                <Avatar>A</Avatar>
            </div>
        </header>
    );
};

export default Header;
