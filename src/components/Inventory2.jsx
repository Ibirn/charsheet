import React, { useEffect, useState } from "react";
import "../styles/Inventorystyles.scss";
import Storage from "./Storage";

export default function Inventory2(props) {
  let inventory = JSON.parse(sessionStorage.getItem("inventory"));
  console.log(inventory);

  let bagOfHolding = () => {
    let output = [];
    for (let item of inventory.bag.split(",")) {
      output.push(item.trim());
    }
    return output;
  };

  const [bag, setBag] = useState(bagOfHolding());

  const addEquip = (input) => {
    setBag((prev) => [...prev, input]);
  };

  let dragSource = null;

  function handleDragStart(e) {
    dragSource = this;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", this.innerHTML);
  }

  function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.dataTransfer.dropEffect = "move";
    return false;
  }

  function handleDrop(e) {
    if (dragSource !== this && dragSource !== null) {
      dragSource.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData("text/html");
      e.preventDefault();
    }
  }

  useEffect(() => {
    console.log("?");
    let items = document.querySelectorAll(".equip-slot");

    items.forEach((item) => {
      item.addEventListener("dragstart", handleDragStart);
      item.addEventListener("drop", handleDrop);
      item.addEventListener("dragover", handleDragOver);
    });
    return () =>
      items.forEach((item) => {
        item.removeEventListener("dragstart", handleDragStart);
        item.removeEventListener("drop", handleDrop);
        item.removeEventListener("dragover", handleDragOver);
      });
  }, [bag]);

  return (
    <>
      <table draggable={false}>
        <thead>
          <tr>
            <th colSpan="2">Equipment</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Primary:</td>
            <td className={"equip-slot"} draggable={true}>
              {inventory.primary_weapon || "none"}
            </td>
          </tr>
          <tr>
            <td>Secondary:</td>
            <td className={"equip-slot"} draggable={true}>
              {inventory.secondary_weapon || "none"}
            </td>
          </tr>
          <tr>
            <td>Armor:</td>
            <td className={"equip-slot"} draggable={true}>
              {inventory.armor || "none"}
            </td>
          </tr>
          <tr>
            <td>Attunement 1:</td>
            <td className={"equip-slot"} draggable={true}>
              {inventory.attunement_1 || "none"}
            </td>
          </tr>
          <tr>
            <td>Attunement 2:</td>
            <td className={"equip-slot"} draggable={true}>
              {inventory.attunement_2 || "none"}
            </td>
          </tr>
          <tr>
            <td>Attunement 3:</td>
            <td className={"equip-slot"} draggable={true}>
              {inventory.attunement_3 || "none"}
            </td>
          </tr>
        </tbody>
      </table>

      <table>
        <thead>
          <tr>
            <th colSpan="2">Bag of Holding</th>
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
    </>
  );
}
