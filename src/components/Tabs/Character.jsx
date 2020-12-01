import React, { useEffect, useState, useReducer } from "react";
import axios from "axios";
import Modifier from "../Modifier";
import "../../styles/Charactersheet.scss";

export default function Character(props) {
  const statArr = [
    "strength",
    "dexterity",
    "constitution",
    "wisdom",
    "intelligence",
    "charisma",
  ];
  const [state, dispatch] = useReducer(reducer, { ...props });

  function reducer(state, action) {
    switch (action.type) {
      case "changestr":
        return { ...state, strength: action.strength };
      case "changedex":
        return { ...state, dexterity: action.dexterity };
      case "changecon":
        return { ...state, constitution: action.constitution };
      case "changeint":
        return { ...state, intelligence: action.intelligence };
      case "changewis":
        return { ...state, wisdom: action.wisdom };
      case "changechr":
        return { ...state, charisma: action.charisma };
      default:
        throw new Error();
    }
  }

  const genNumbers = (stat) => {
    for (let i = 1; i <= 20; i++) {
      let select = document.getElementById(stat);
      let option = document.createElement("OPTION");
      select.options.add(option);
      option.text = i;
      option.value = i;
      if (i === props[stat]) {
        option.setAttribute("selected", "true");
      }
    }
  };

  useEffect(() => {
    if (props.loaded) {
      for (const elem of statArr) {
        genNumbers(elem);
      }
    }
  }, []);

  //must return as function to call on unmount
  useEffect(() => {
    return () => {
      props.unload(false);
    };
  }, []);

  const saveChar = () => {
    axios.put(`/character`, state);
  };

  const changeMod = () => {};

  return (
    <div>
      <div className="portrait">
        <img src={props.avatar} alt="portrait" />
      </div>
      <div className="statblock">
        <div className="statbox">
          <h2>STR {state.str}</h2>
          <select
            id="strength"
            selected={props.strength}
            onChange={(e) => {
              dispatch({ type: "changestr", strength: Number(e.target.value) });
            }}
          ></select>
          <Modifier value={state.strength} />
        </div>
        <div className="statbox">
          <h2>DEX</h2>
          <select
            id="dexterity"
            selected={props.dexterity}
            onChange={(e) => {
              dispatch({
                type: "changedex",
                dexterity: Number(e.target.value),
              });
            }}
          ></select>
          <Modifier value={state.dexterity} />
        </div>
        <div className="statbox">
          <h2>CON</h2>
          <select
            id="constitution"
            selected={props.constitution}
            onChange={(e) => {
              dispatch({
                type: "changecon",
                constitution: Number(e.target.value),
              });
            }}
          ></select>
          <Modifier value={state.constitution} />
        </div>
        <div className="statbox">
          <h2>INT</h2>
          <select
            id="intelligence"
            selected={props.intelligence}
            onChange={(e) => {
              dispatch({
                type: "changeint",
                intelligence: Number(e.target.value),
              });
            }}
          ></select>
          <Modifier value={state.intelligence} />
        </div>
        <div className="statbox">
          <h2>WIS</h2>
          <select
            id="wisdom"
            selected={props.wisdom}
            onChange={(e) => {
              dispatch({ type: "changewis", wisdom: Number(e.target.value) });
            }}
          ></select>
          <Modifier value={state.wisdom} />
        </div>
        <div className="statbox">
          <h2>CHR</h2>
          <select
            id="charisma"
            selected={props.charisma}
            onChange={(e) => {
              dispatch({ type: "changechr", charisma: Number(e.target.value) });
            }}
          ></select>
          <Modifier value={state.charisma} />
        </div>
      </div>
      <div>
        <button onClick={() => saveChar()}>Save</button>
      </div>
    </div>
  );
}
