import React, { useEffect } from "react";

export default function Storage(props) {
  return (
    <>
      <p>Hello</p>
      {props.items.map((item) => {
        return (
          <p draggable="true" className="equipslot">
            {item}
          </p>
        );
      })}
    </>
  );
}
