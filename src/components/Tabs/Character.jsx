import React, { useEffect, useState } from "react";
import axios from "axios";
import Modifier from "../Modifier";

export default function Character(props) {
  const statArr = [
    "strength",
    "dexterity",
    "constitution",
    "wisdom",
    "intelligence",
    "charisma",
  ];
  let updateArr = [];

  const [newSheet, setNewSheet] = useState({ ...props });

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

  useEffect(() => {
    if (props.loaded) {
      for (const elem of statArr) {
        genNumbers(elem);
      }
    }
  }, [props.loaded]);

  const cleanupStats = () => {
    for (let elem of statArr) {
      console.log(props[elem], newSheet);
    }
  };

  //must return as function to call on unmount
  useEffect(() => {
    return () => {
      console.log("leaving???");
      cleanupStats();
      console.log(updateArr);
    };
  }, []);

  console.log("INNER: ", newSheet, props);

  return (
    <div>
      <h2>STR</h2>
      <select
        id="strength"
        selected={props.strength}
        onChange={(e) =>
          setNewSheet((prev) => ({ ...prev, strength: Number(e.target.value) }))
        }
      ></select>
      <h2>DEX</h2>
      <select
        id="dexterity"
        selected={props.dexterity}
        onChange={(e) =>
          setNewSheet((prev) => ({
            ...prev,
            dexterity: Number(e.target.value),
          }))
        }
      ></select>
      <h2>CON</h2>
      <select
        id="constitution"
        selected={props.constitution}
        onChange={(e) =>
          setNewSheet((prev) => ({
            ...prev,
            constitution: Number(e.target.value),
          }))
        }
      ></select>
      <h2>INT</h2>
      <select
        id="intelligence"
        selected={props.intelligence}
        onChange={(e) =>
          setNewSheet((prev) => ({
            ...prev,
            intelligence: Number(e.target.value),
          }))
        }
      ></select>
      <h2>WIS</h2>
      <select
        id="wisdom"
        selected={props.wisdom}
        onChange={(e) =>
          setNewSheet((prev) => ({ ...prev, wisdom: Number(e.target.value) }))
        }
      ></select>
      <h2>CHR</h2>
      <select
        id="charisma"
        selected={props.charisma}
        onChange={(e) =>
          setNewSheet((prev) => ({ ...prev, charisma: Number(e.target.value) }))
        }
      ></select>
    </div>
  );
}
