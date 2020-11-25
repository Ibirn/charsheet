import React from "react";
import axios from "axios";

export default function Character(props) {
  const updateChar = (stat, value, id) => {
    axios
      .put("/character", {
        stat: stat,
        value: value,
        id,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  console.log("INNER: ", props);

  return (
    <div>
      <h2>STR</h2>
      <select
        selected={props.strength}
        onChange={(e) =>
          updateChar("strength", Number(e.target.value), props.id)
        }
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
    </div>
  );
}
