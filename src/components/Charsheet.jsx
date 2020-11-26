import React, { useEffect, useState } from "react";
import Character from "./Tabs/Character";
// import FiveEStat from "./FiveEStat";
// import useCharacterData from "../hooks/useCharacterData";
import axios from "axios";

export default function Charsheet(props) {
  const [sheet, setSheet] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios.get(`/character`).then((response) => {
      setSheet(response.data);
      setLoaded(true);
    });
    return () => {};
  }, [loaded]);

  return <div>{loaded && <Character {...sheet} loaded />}</div>;
}
