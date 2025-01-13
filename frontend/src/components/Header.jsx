import React from 'react';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className='header'>
      <div className='logo'>DiveUp</div>
      <nav className='nav-links'>
        <button className='nav-button'>Amigos</button>
        <button className='nav-button active'>Grupos</button>
        <button className='nav-button'>Gastos</button>
      </nav>
      <div className='user-avatar'>User</div>
    </header>
  );
};

export default Header;
