import { useEffect, useState } from "react";

const storageKey = "sushi-conveyor.best-score";

function readBestScore() {
  try {
    const score = Number(window.localStorage.getItem(storageKey));

    return Number.isSafeInteger(score) && score >= 0 ? score : 0;
  } catch {
    return 0;
  }
}

export default function useBestScore(coins) {
  const [savedBest, setSavedBest] = useState(readBestScore);
  const bestScore = Math.max(savedBest, coins);

  useEffect(() => {
    if (bestScore <= savedBest) {
      return;
    }

    setSavedBest(bestScore);

    try {
      window.localStorage.setItem(storageKey, String(bestScore));
    } catch {
      // Jeśli zapis jest niedostępny, rekord działa do zamknięcia gry.
    }
  }, [bestScore, savedBest]);

  return bestScore;
}
