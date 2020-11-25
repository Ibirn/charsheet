import { useState, useEffect } from "react";

export default function useCharacterData(initMode) {
  const [sheet, setSheet] = useState({
    STR: 1,
    DEX: 1,
    CON: 1,
    INT: 1,
    WIS: 1,
    CHR: 1,
  });

  return { sheet, setSheet };
}
