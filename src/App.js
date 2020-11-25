import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Charsheet from "./components/Charsheet";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get(`/api/data`).then((response) => {
      setMessage(response.data.message);
    });
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Route exact path="/" />
        <Route path="/character" component={Charsheet} />
      </BrowserRouter>
    </div>
  );
}

export default App;
