import React from "react";
import "../../styles/Inventorystyles.scss";

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
      <table className="equip-table">
        <thead>
          <tr>
            <th colSpan="2">Equipment</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Primary Weapon</td>
            <td>{props.primary_weapon || "none"}</td>
          </tr>
          <tr>
            <td>Secondary Weapon</td>
            <td>{props.secondary_weapon || "none"}</td>
          </tr>
          <tr>
            <td>Armor</td>
            <td>{props.armor || "none"}</td>
          </tr>
          <tr>
            <td>Attunement One</td>
            <td>{props.attunement_1 || "none"}</td>
          </tr>
          <tr>
            <td>Attunement Two</td>
            <td>{props.attunement_2 || "none"}</td>
          </tr>
          <tr>
            <td>Attunement Three</td>
            <td>{props.attunement_3 || "none"}</td>
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
