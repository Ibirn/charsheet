import React from "react";

export default function Character(props) {
  return (
    <li onClick={() => props.transition("BAG")} className="tab-item">
      <h2>Inventory</h2>
    </li>
  );
}
