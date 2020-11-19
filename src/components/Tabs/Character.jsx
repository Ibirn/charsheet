import React from "react";

export default function Character(props) {
  console.log("CB: ", props);
  return (
    <li onClick={() => props.transition("CHAR")} className="tab-item">
      <h2>Character</h2>
    </li>
  );
}
