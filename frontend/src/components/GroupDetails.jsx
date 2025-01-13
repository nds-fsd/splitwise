import React from "react";
import Header from "./Header";
import MemberList from "./MemberList";
import ExpenseList from "./ExpenseList";
import AddExpenseButton from "./AddExpenseButton";
import "./../styles/GroupDetailsPage.css";

const GroupDetails = () => {
  const members = [
    { id: 1, name: "User1", balance: 100 },
    { id: 2, name: "User2", balance: -50 },
    { id: 3, name: "User3", balance: 0 },
    { id: 4, name: "User4", balance: 20 },
  ];

  const expenses = [
    { id: 1, name: "Cena", amount: 120 },
    { id: 2, name: "Taxi", amount: 30 },
  ];

  const handleAddExpense = () => {
    alert("Agregar nuevo gasto");
  };

  return (
    <div className="group-details">
      <Header />
      <div className="content">
        <MemberList members={members} />
        <ExpenseList expenses={expenses} />
        <AddExpenseButton onClick={handleAddExpense} />
      </div>
    </div>
  );
};

export default GroupDetails;
