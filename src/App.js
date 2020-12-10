import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Charsheet from "./components/Charsheet";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route } from "react-router-dom";
import Inventory2 from "./components/Inventory2";

function App() {
  // const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get(`/character`).then((response) => {
      console.log("SS: ", response.data);
      sessionStorage.setItem("character", JSON.stringify(response.data));
    });
    axios.get(`/inventory`).then((response) => {
      sessionStorage.setItem("inventory", JSON.stringify(response.data));
    });
    return () => {};
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Route exact path="/" />
        <Route exact path="/character" component={Charsheet} />
        <Route exact path="/inventory" component={Inventory2} />
        <Route exact path="/other" component={Inventory2} />
      </BrowserRouter>
    </div>
  );
}

export default App;
