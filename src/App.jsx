import { useState } from "react";
import Expenses from "./components/Expenses/Expenses";
import Header from "./components/Header/Header";
import "./App.css";
import Shoplist from "./components/Shoplist/Shoplist";

function App() {
  const [tab, setTab] = useState("expenses");
  return (
    <>
      <main>
        <Header active={tab} onChange={(current) => setTab(current)} />
        {tab === "expenses" && <Expenses />}

        {tab === "shopping" && <Shoplist />}

        {/* {tab === "budget" && <E />} */}
      </main>
    </>
  );
}

export default App;
