"use client";

import { useEffect, useState } from "react";

/**
 * True zodra vaststaat dat de bezoeker een precieze pointer heeft (muis/trackpad).
 * Start bewust op `false` zodat server- en client-render identiek zijn; effecten
 * die hierop leunen mogen dus nooit de markup veranderen.
 */
export function usePointerFine(): boolean {
  const [isFine, setIsFine] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(pointer: fine)");
    const sync = () => setIsFine(query.matches);

    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return isFine;
}
