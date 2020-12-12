import React, { useEffect, useState } from "react";
import "../styles/Inventorystyles.scss";
import Storage from "./Storage";

export default function Inventory2(props) {
  //get items from session storage axios call
  const [allItems, setAllItems] = useState({
    ...JSON.parse(sessionStorage.getItem("inventory")),
  });

  //produce list of items not worn
  let bagOfHolding = () => {
    let output = [];
    for (let item of allItems.bag.split(",")) {
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
    if (this.id.includes("trash")) {
      if (dragSource.id.includes("bag")) {
        dragSource.parentElement.remove();
      } else {
        dragSource.innerHTML = "none";
      }
      // document.getElementById(dragSource.id).innerHTML = ;
    } else if (dragSource !== this && dragSource !== null) {
      console.log("here", dragSource, this);
      dragSource.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData("text/html");
      let temp = [];
      // console.log("trash DS: ", dragSource);
      // console.log("Trash th: ", this.id);
      if (dragSource.id.includes("bag")) {
        if (dragSource.innerHTML === "none") {
          console.log("Moved onto nothing", dragSource.id);
          dragSource.parentElement.remove();
        }
        for (const item of document.getElementsByClassName("baggedItem")) {
          temp.push(item.innerHTML);
        }
        setAllItems((prev) => ({
          ...prev,
          [this.id]: this.innerHTML,
          bag: temp.join(),
        }));
      } else if (this.id.includes("bag")) {
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
    sessionStorage.setItem("inventory", JSON.stringify(allItems));
    sessionStorage.setItem("invAutosave", JSON.stringify(allItems));
    return () => {};
  }, [allItems]);

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
        <thead>
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
