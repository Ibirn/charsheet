import React, { useEffect } from "react";

import useCharacterData from "../hooks/useCharacterData";

export default function FiveEStat(props) {
  const { sheet, setSheet } = useCharacterData();
  useEffect(() => {
    for (let i = 1; i <= 20; i++) {
      let select = document.getElementById(`${props.name}`);
      let option = document.createElement("OPTION");
      select.options.add(option);
      option.text = i;
      option.value = i;
    }
  });
  console.log("ahhh state", props);

  return (
    <>
      <select></select>
    </>
  );
}
