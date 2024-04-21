import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import styles from "./Shoplist.module.css";

// Подключение к серверу Socket.IO
const socket = io("https://shoppig-victorc60s-projects.vercel.app/"); // Укажите URL вашего сервера, если он различается

function Shoplist() {
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Получение начального списка элементов при подключении
    socket.on("initialItems", (initialItems) => {
      setItems(initialItems);
    });

    // Подписка на события добавления и удаления элементов
    socket.on("itemAdded", (item) => {
      setItems((prevItems) => [item, ...prevItems]);
    });

    socket.on("itemRemoved", (id) => {
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    });

    // Очистка подписок при размонтировании компонента
    return () => {
      socket.off("initialItems");
      socket.off("itemAdded");
      socket.off("itemRemoved");
    };
  }, []);

  function addItem() {
    const item = {
      id: Date.now(), // Генерация уникального ID для каждого элемента
      value: newItem,
    };
    socket.emit("addItem", item); // Отправка нового элемента на сервер
    setNewItem(""); // Очистка поля ввода
  }

  function removeItem(id) {
    socket.emit("removeItem", id); // Отправка ID удаляемого элемента на сервер
  }

  return (
    <>
      <div className={styles.container}>
        <h2>Add some items in cart</h2>

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
