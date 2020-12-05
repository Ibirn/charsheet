import React, { useEffect } from "react";
import "../../styles/Inventorystyles.scss";

export default function Bag(props) {
  let bagArr = [];
  for (let item of props.bag.split(",")) {
    bagArr.push(item.trim());
  }
  console.log(bagArr);

  useEffect(() => {
    let dragSrcEl = null;

    function handleDragStart(e) {
      this.style.opacity = "0.4";

      dragSrcEl = this;

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

    function handleDragEnter(e) {
      this.classList.add("over");
    }

    function handleDragLeave(e) {
      this.classList.remove("over");
    }

    function handleDragStart(e) {
      this.style.opacity = "0.4";

      dragSrcEl = this;

      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/html", this.innerHTML);
    }

    function handleDragEnd(e) {
      this.style.opacity = "1";

      items.forEach(function (item) {
        item.classList.remove("over");
      });
    }

    function handleDrop(e) {
      console.log("HD: ", e, dragSrcEl, this);
      if (e.stopPropagation) {
        e.stopPropagation(); // stops the browser from redirecting.
      }

      if (dragSrcEl !== this) {
        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData("text/html");
      }

      return false;
    }
    let items = document.querySelectorAll(".equipslot");
    items.forEach(function (item) {
      console.log("D:", item);
      item.addEventListener("dragstart", handleDragStart, false);
      item.addEventListener("dragenter", handleDragEnter, false);
      item.addEventListener("dragover", handleDragOver, false);
      item.addEventListener("dragleave", handleDragLeave, false);
      item.addEventListener("drop", handleDrop, false);
      item.addEventListener("dragend", handleDragEnd, false);
    });
    let storage = document.querySelectorAll(".bagitem");
    storage.forEach((item) => {
      console.log("E:", item);
      item.addEventListener("dragstart", handleDragStart, false);
      item.addEventListener("dragenter", handleDragEnter, false);
      item.addEventListener("dragover", handleDragOver, false);
      item.addEventListener("dragleave", handleDragLeave, false);
      item.addEventListener("drop", handleDrop, false);
      item.addEventListener("dragend", handleDragEnd, false);
    });
  }, []);

  const bagContents = bagArr.map((item) => {
    return (
      <p className={"bagitem"} draggable={true}>
        {item}
      </p>
    );
  });

  useEffect(() => {}, []);

  return (
    <>
      <table className="equip-table">
        <thead>
          <tr>
            <th colSpan="2">Equipment</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Primary Weapon</td>
            <td className={"equipslot"} draggable={true}>
              {props.primary_weapon || "none"}
            </td>
          </tr>
          <tr>
            <td>Secondary Weapon</td>
            <td className={"equipslot"} draggable={true}>
              {props.secondary_weapon || "none"}
            </td>
          </tr>
          <tr>
            <td>Armor</td>
            <td className={"equipslot"} draggable={true}>
              {props.armor || "none"}
            </td>
          </tr>
          <tr>
            <td>Attunement One</td>
            <td className={"equipslot"} draggable={true}>
              {props.attunement_1 || "none"}
            </td>
          </tr>
          <tr>
            <td>Attunement Two</td>
            <td className={"equipslot"} draggable={true}>
              {props.attunement_2 || "none"}
            </td>
          </tr>
          <tr>
            <td>Attunement Three</td>
            <td className={"equipslot"} draggable={true}>
              {props.attunement_3 || "none"}
            </td>
          </tr>
        </tbody>
      </table>
      <div className="inv-storage">
        <h3>Bag:</h3>
        {bagContents}
        <p>Gold: {props.gold || 0}</p>
      </div>
    </>
  );
}
