import React from "react";

export default function Charsheet(props) {
  return (
    <div>
      <form>
        <label for="item-name">Item:</label>
        <br />
        <input type="text" id="item-name" name="item-name"></input>
      </form>
    </div>
  );
}
