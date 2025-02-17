import { Link, useLocation } from 'react-router-dom';
import styles from './header.module.css';
import { useDarkMode } from '../../context/darkModeContext';
import Icon from '../icon/icon';
import Avatar from '@mui/material/Avatar';

const Header = () => {
    const { darkMode, toggleDarkMode } = useDarkMode();

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