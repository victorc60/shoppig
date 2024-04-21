import React, { useState, useEffect } from "react";
import styles from "./Shoplist.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHandPointRight } from "@fortawesome/free-solid-svg-icons";

function Shoplist() {
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);

  function loadCart() {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      setItems(JSON.parse(cartData));
    }
  }

  useEffect(() => {
    loadCart();
  }, []);

  function addItem() {
    const item = {
      id: Date.now(),
      value: newItem,
    };
    setItems((prevItems) => [item, ...prevItems]);
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    cartData.push(item);
    localStorage.setItem("cart", JSON.stringify(cartData));
    setNewItem("");
  }

  function removeItem(id) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = cartData.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }

  return (
    <>
      <div className={styles.container}>
        <h2>Add some items in cart </h2>

        <div className={styles.input__container}>
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
          <button className={styles.input__button} onClick={addItem}>
            Add Item
          </button>
        </div>

        <ul className={styles.cart__list}>
          {items.map((item) => (
            <li className={styles.cart__item} key={item.id}>
              {item.value}
              <button
                className={styles.button__remove}
                onClick={() => removeItem(item.id)}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Shoplist;
