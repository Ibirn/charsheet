import React from "react";
import FiveEStat from "./FiveEStat";

export default function Charsheet(props) {
  return (
    <div>
      <h2>STR</h2> <FiveEStat name={"STR"} />
      <h2>DEX</h2> <FiveEStat name={"DEX"} />
      <h2>CON</h2> <FiveEStat name={"CON"} />
      <h2>INT</h2> <FiveEStat name={"INT"} />
      <h2>WIS</h2> <FiveEStat name={"WIS"} />
      <h2>CHR</h2> <FiveEStat name={"CHR"} />
    </div>
  );
}
