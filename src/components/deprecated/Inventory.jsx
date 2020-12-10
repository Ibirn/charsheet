import React, { useEffect, useState } from "react";
import axios from "axios";
import Bag from "./Tabs/Bag";
import "../styles/Inventorystyles.scss";

export default function Inventory(props) {
  const [bag, setBag] = useState({});
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    axios.get(`/inventory`).then((response) => {
      setBag(response.data);
      setLoaded(true);
    });
    return () => {};
  }, []);

  return <div className="inventory">{loaded && <Bag {...bag} />}</div>;
}
