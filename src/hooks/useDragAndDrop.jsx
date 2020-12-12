import { useEffect, useState } from "react";

export default function useDragAndDrop(props) {
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
    let temp = [];

    //delete items from inventory
    if (this.id.includes("trash")) {
      if (dragSource.id.includes("bag")) {
        dragSource.parentElement.remove();
        for (const item of document.getElementsByClassName("baggedItem")) {
          temp.push(item.innerHTML);
        }
        setAllItems((prev) => ({ ...prev, bag: temp.join() }));
      } else {
        setAllItems((prev) => ({ ...prev, [dragSource.id]: null }));
      }
    }
    //unequip things without losing them
    else if (this.id.includes("bag-of-holding")) {
      if (!dragSource.id.includes("bag")) {
        addEquip(dragSource.innerHTML);
        for (const item of document.getElementsByClassName("baggedItem")) {
          temp.push(item.innerHTML);
        }
        setAllItems((prev) => ({
          ...prev,
          [dragSource.id]: null,
          bag: temp.join(),
        }));
      }
    }
    //change what you've got equipped
    else if (dragSource !== this && dragSource !== null) {
      dragSource.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData("text/html");
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

  return { allItems, setAllItems, bag, setBag, addEquip, addToBag };
}
