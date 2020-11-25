import React from "react";
import Character from "./Tabs/Character";
import Bag from "./Tabs/Bag";
import "../styles/Nav.scss";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  console.log("NAVPROPS", props);
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
    </nav>
  );
};

export default Navbar;
