import React from "react";

export default function Modifier(props) {
  const getModifier = (value) => {
    return Math.floor(value / 2) + -5;
  };
  return (
    <>
      <p>{getModifier(props.value)}</p>
    </>
  );
}
