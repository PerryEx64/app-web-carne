import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Account from "./assets/Account";
import AdminPage from "./AdminPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* Aqui puede ir el nav bar */}
      <Routes>
        <Route path="/" element={<Account />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </>
  );
}

export default App;
