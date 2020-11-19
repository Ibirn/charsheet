import React from "react";
import Character from "./Character";
import useVisualMode from "hooks/useVisualMode";

const CHAR = "CHAR";

export default function Tab(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
}
