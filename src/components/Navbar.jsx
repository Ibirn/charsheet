import React from "react";
import "../styles/Nav.scss";
import { Link } from "react-router-dom";
import axios from "axios";

const Navbar = (props) => {
  console.log("NAVPROPS", props);
  console.log(sessionStorage.getItem("character"));
  console.log(sessionStorage.getItem("inventory"));
  const saveChanges = () => {
    axios.put(`/inventory`, JSON.parse(sessionStorage.getItem("inventory")));
    console.log("EGG: ", JSON.parse(sessionStorage.getItem("inventory")));
  };

  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <Link to={"/character"}>Character</Link>
        </li>
        <li>
          <Link to={"/inventory"}>Inventory</Link>
        </li>
        <li>
          <Link to={"/other"}>Other</Link>
        </li>
      </ul>
      <button onClick={() => saveChanges()}>Save</button>
    </nav>
  );
};

export default Navbar;
