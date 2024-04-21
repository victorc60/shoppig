import React from "react";
import { useState, useEffect } from "react";

import styles from "./Expenses.module.css";
function Expenses() {
  const [inputValue, setInputValue] = useState("");
  let [expenses, setExpenses] = useState([]);
  let [sum, setSum] = useState(0);

  useEffect(() => {
    // Automatically calculate sum whenever the expenses array changes
    const total = expenses.reduce(
      (accumulator, currentExpense) =>
        accumulator + Number(currentExpense.value),
      0
    );
    setSum(total);
  }, [expenses]); // Dependency array, recalculate when expenses change

  function addExp() {
    const newExpense = {
      id: Date.now(),
      value: inputValue,
    };

    setExpenses([newExpense, ...expenses]);
    setInputValue("");
  }
  function removeExp(id) {
    // Filter out the expense with the given id
    setExpenses(expenses.filter((expense) => expense.id !== id));
  }

  return (
    <div className={styles.expenses__container}>
      <h2>Expenses</h2>

      <div className={styles.input__container}>
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className={styles.button} onClick={addExp}>
          Add Operation
        </button>
      </div>

      <ul className={styles.list__items}>
        {expenses.map((expense) => (
          <li className={styles.items} key={expense.id}>
            {expense.value} лей
            <button
              className={styles.delete}
              onClick={() => removeExp(expense.id)}
            >
              X
            </button>
          </li>
        ))}
      </ul>
      <div>
        <p>All expenses:{sum} </p>
      </div>
    </div>
  );
}

export default Expenses;
