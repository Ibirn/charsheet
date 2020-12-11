import React, { useEffect, useState } from "react";
import "../styles/Inventorystyles.scss";
import Storage from "./Storage";

export default function Inventory2(props) {
  //get items from session storage axios call
  let inventory = JSON.parse(sessionStorage.getItem("inventory"));
  const [allItems, setAllItems] = useState({ ...inventory });

  //produce list of items not worn
  let bagOfHolding = () => {
    let output = [];
    for (let item of inventory.bag.split(",")) {
      output.push(item.trim());
    }
    return output;
  };

  //useState to govern items added/swapped
  const [bag, setBag] = useState(bagOfHolding());

  //button onClick
  const addEquip = (input) => {
    setBag((prev) => [...prev, input]);
  };

  const addToBag = () => {
    return bag.join();
  };

  //-----------Drag and Drop Stuff-------------
  let dragSource = null;

  function handleDragStart(e) {
    dragSource = this;
    console.log("DRAGST: ", this);
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
      let temp = [];

      if (dragSource.id.includes("bag")) {
        console.log("DRAGSRC: ", dragSource);
        // console.log("BAGPROB: ", this);
        for (const item of document.getElementsByClassName("baggedItem")) {
          temp.push(item.innerHTML);
        }
        setAllItems((prev) => ({
          ...prev,
          [this.id]: this.innerHTML,
          bag: temp.join(),
        }));
      } else if (this.id.includes("bag")) {
        console.log("THIS: ", dragSource.id, dragSource.innerHTML);
        console.log(dragSource.innerHTML);
        for (const item of document.getElementsByClassName("baggedItem")) {
          temp.push(item.innerHTML);
        }
        setAllItems((prev) => ({
          ...prev,
          [dragSource.id]: dragSource.innerHTML,
          bag: temp.join(),
        }));
      } else {
        setAllItems((prev) => ({
          ...prev,
          [dragSource.id]: document.getElementById(dragSource.id).innerHTML,
          [this.id]: document.getElementById(this.id).innerHTML,
        }));
      }
      e.preventDefault();
    }
  }

  useEffect(() => {
    // console.log(addToBag());
    setAllItems((prev) => ({ ...prev, bag: addToBag() }));
    //grab all items
    let items = document.querySelectorAll(".equip-slot");
    //give each item listeners for drag
    items.forEach((item) => {
      item.addEventListener("dragstart", handleDragStart);
      item.addEventListener("drop", handleDrop);
      item.addEventListener("dragover", handleDragOver);
    });
    return () =>
      //remove the goddamn listeners to prevent problems, you numpty - 5 hours and you should know better.
      items.forEach((item) => {
        item.removeEventListener("dragstart", handleDragStart);
        item.removeEventListener("drop", handleDrop);
        item.removeEventListener("dragover", handleDragOver);
      });
  }, [bag]);

  useEffect(() => {
    console.log("??: ", allItems);
  }, [allItems]);

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
            <td id="primary_weapon" className={"equip-slot"} draggable={true}>
              {inventory.primary_weapon || "none"}
            </td>
          </tr>
          <tr>
            <td>Secondary:</td>
            <td id="secondary_weapon" className={"equip-slot"} draggable={true}>
              {inventory.secondary_weapon || "none"}
            </td>
          </tr>
          <tr>
            <td>Armor:</td>
            <td id="armor" className={"equip-slot"} draggable={true}>
              {inventory.armor || "none"}
            </td>
          </tr>
          <tr>
            <td>Attunement 1:</td>
            <td id="attunement_1" className={"equip-slot"} draggable={true}>
              {inventory.attunement_1 || "none"}
            </td>
          </tr>
          <tr>
            <td>Attunement 2:</td>
            <td id="attunement_2" className={"equip-slot"} draggable={true}>
              {inventory.attunement_2 || "none"}
            </td>
          </tr>
          <tr>
            <td>Attunement 3:</td>
            <td id="attunement_3" className={"equip-slot"} draggable={true}>
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
