import React from 'react';
import '../styles/MemberList.css';

const MemberList = () => {
  return (
    <section className='member-list'>
      <h2 className='section-title'>Miembros del Grupo</h2>
      <ul className='list'>
        <li>
         Maria: <strong>$100</strong>
        </li>
        <li>
          Patricio: <strong>-$50</strong>
        </li>
        <li>
          Paquito: <strong>$0</strong>
        </li>
        <li>
          Angel: <strong>$20</strong>
        </li>
      </ul>
    </section>
  );
};

export default MemberList;
