import React from "react";

export default function props(props) {
  let bagArr = [];
  for (let item of props.bag.split(",")) {
    bagArr.push(item.trim());
  }
  console.log(bagArr);

  const bagContents = bagArr.map((item) => {
    return <p>{item}</p>;
  });
  return (
    <>
      <div className="inv-equipped">
        <h3>Equipped:</h3>
        <p>Primary Weapon: {props.primary_weapon || "none"}</p>
        <p>Secondary Weapon: {props.secondary_weapon || "none"}</p>
        <p>Armor: {props.armor || "armor"}</p>
        <p>Attunement One: {props.attunement_1 || "none"}</p>
        <p>Attunement Two: {props.attunement_2 || "none"}</p>
        <p>Attunement Three: {props.attunement_3 || "none"}</p>
      </div>
      <div className="inv-storage">
        <h3>Bag:</h3>
        {bagContents}
        <p>Gold: {props.gold || 0}</p>
      </div>
    </>
  );
}
