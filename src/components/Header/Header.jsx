import React from "react";
import Button from "../Button/Button";
import styles from "./Header.module.css";

function TabsSection({ active, onChange }) {
  return (
    <>
      <header>
        <nav>
          <Button
            isActive={active === "expenses"}
            onClick={() => onChange("expenses")}
          >
            Expenses
          </Button>
          <Button
            isActive={active === "shopping"}
            onClick={() => onChange("shopping")}
          >
            Shop Cart
          </Button>
        </nav>
      </header>
    </>
  );
}

export default TabsSection;
