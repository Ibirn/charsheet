import React from "react";

export default function Storage(props) {
  // console.log("ST:", props);
  return (
    <>
      {props.items.map((item, index) => {
        return (
          <tr key={`key${index}`}>
            <td
              id={`bag${index}`}
              className={"equip-slot baggedItem"}
              draggable={true}
            >
              {item}
            </td>
          </tr>
        );
      })}
    </>
  );
}
