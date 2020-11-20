import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import useVisualMode from "./hooks/useVisualMode";
import Charsheet from "./components/Charsheet";
import Inventory from "./components/Inventory";

function App() {
  const [message, setMessage] = useState("");
  const { transition, mode } = useVisualMode();

  useEffect(() => {
    axios.get(`/api/data`).then((response) => {
      setMessage(response.data.message);
    });
  }, []);

  return (
    <div className="App">
      <Navbar transition={transition} />
      {mode === "CHAR" && <Charsheet />}
      {mode === "BAG" && <Inventory />}
    </div>
  );
}

export default App;
