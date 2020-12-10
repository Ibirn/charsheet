import React from "react";

export default function Other(props) {
  console.log("made it here");
  console.log(sessionStorage.getItem("character"));
  console.log(sessionStorage.getItem("inventory"));
  return <p>Butts</p>;
}
