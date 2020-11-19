import React from "react";
import Character from "./Tabs/Character";
import Bag from "./Tabs/Bag";
import "../styles/Nav.scss";

const Navbar = (props) => {
  console.log("NAVPROPS", props);
  return (
    <nav className="navbar">
      <div className="badge-login-buttons">
        <button onClick={(e) => console.log("Clicked")} className="log-button">
          Hello
        </button>
        <Character transition={props.transition} />
        <Bag transition={props.transition} />
      </div>
    </nav>
  );
};

export default Navbar;
