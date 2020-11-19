import React from "react";

export default function Charsheet(props) {
  return (
    <div>
      <label for="strength">Choose Value:</label>

      <select name="strength" id="strength">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
    </div>
  );
}
