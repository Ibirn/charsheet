import React, { useEffect } from "react";

export default function Storage(props) {
  console.log("ST:", props);
  return (
    <>
      {props.items.map((item) => {
        return (
          <tr>
            <td className={"equip-slot"} draggable={true}>
              {item}
            </td>
          </tr>
        );
      })}
    </>
  );
}
