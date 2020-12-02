import "./App.css";
import React, { useEffect, useState } from "react";
// import axios from "axios";
import Charsheet from "./components/Charsheet";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route } from "react-router-dom";
import Inventory from "./components/Inventory";

function App() {
  // const [message, setMessage] = useState("");

  // useEffect(() => {
  //   axios.get(`/api/data`).then((response) => {
  //     setMessage(response.data.message);
  //   });
  // }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Route exact path="/" />
        <Route exact path="/character" component={Charsheet} />
        <Route exact path="/inventory" component={Inventory} />
      </BrowserRouter>
    </div>
  );
}

export default App;
