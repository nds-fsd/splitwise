import React from 'react';
import '../styles/ExpenseList.css';

const ExpenseList = () => {
  return (
    <section className='expense-list'>
      <h2 className='section-title'>Gastos</h2>
      <ul className='list'>
        <li>
          Cena: <strong>$120</strong>
        </li>
        <li>
          Taxi: <strong>$30</strong>
        </li>
      </ul>
    </section>
  );
};

export default ExpenseList;
