import React from "react";
import "../styles/Inventorystyles.scss";
import Storage from "./Storage";
import useDragAndDrop from "../hooks/useDragAndDrop";

export default function Inventory2(props) {
  const { allItems, bag, addEquip } = useDragAndDrop(props);

  return (
    <>
      <table id="equip-table" draggable={false}>
        <thead>
          <tr>
            <th colSpan="2">Equipment</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Primary:</td>
            <td id="primary_weapon" className={"equip-slot"} draggable={true}>
              {allItems.primary_weapon || "none"}
            </td>
          </tr>
          <tr>
            <td>Secondary:</td>
            <td id="secondary_weapon" className={"equip-slot"} draggable={true}>
              {allItems.secondary_weapon || "none"}
            </td>
          </tr>
          <tr>
            <td>Armor:</td>
            <td id="armor" className={"equip-slot"} draggable={true}>
              {allItems.armor || "none"}
            </td>
          </tr>
          <tr>
            <td>Attunement 1:</td>
            <td id="attunement_1" className={"equip-slot"} draggable={true}>
              {allItems.attunement_1 || "none"}
            </td>
          </tr>
          <tr>
            <td>Attunement 2:</td>
            <td id="attunement_2" className={"equip-slot"} draggable={true}>
              {allItems.attunement_2 || "none"}
            </td>
          </tr>
          <tr>
            <td>Attunement 3:</td>
            <td id="attunement_3" className={"equip-slot"} draggable={true}>
              {allItems.attunement_3 || "none"}
            </td>
          </tr>
        </tbody>
      </table>

      <table>
        <thead id="bag-of-holding" className="equip-slot">
          <tr>
            <th>Bag of Holding</th>
          </tr>
        </thead>
        <tbody>
          <Storage items={bag} />
        </tbody>
      </table>
      <div>
        <input type="text" id="new-item"></input>
        <button
          onClick={() => {
            addEquip(document.getElementById("new-item").value);
          }}
        >
          Add item
        </button>
      </div>
      <i id="trash" className="fas fa-trash equip-slot"></i>
    </>
  );
}
