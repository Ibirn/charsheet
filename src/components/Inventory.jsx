import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Inventory(props) {
  const [bag, setBag] = useState({});
  let bagArr = [];
  useEffect(() => {
    axios.get(`/inventory`).then((response) => {
      setBag(response.data);
    });
    return () => {};
  }, []);

  useEffect(() => {
    if (bag.bag) {
      bagArr.push(bag.bag.split(""));
    }
  }, [bag]);

  console.log();
  return (
    <div>
      <p>Primary Weapon: {bag.primary_weapon || "none"}</p>
      <p>Secondary Weapon: {bag.secondary_weapon || "none"}</p>
      <p>Armor: {bag.armor || "armor"}</p>
      <p>Attunement One: {bag.attunement_1 || "none"}</p>
      <p>Attunement Two: {bag.attunement_2 || "none"}</p>
      <p>Attunement Three: {bag.attunement_3 || "none"}</p>
      <p>Gold: {bag.gold || 0}</p>
      <p>Bag: {bag.bag}</p>
    </div>
  );
}
