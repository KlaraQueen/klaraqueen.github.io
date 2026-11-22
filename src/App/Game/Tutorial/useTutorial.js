import { useEffect, useState } from "react";

const storageKey = "sushi-conveyor.tutorial-complete";

function readTutorialComplete() {
  try {
    return window.localStorage.getItem(storageKey) === "true";
  } catch {
    return false;
  }
}

export default function useTutorial({ belt, deliveries, feeders, orders }) {
  const [complete, setComplete] = useState(readTutorialComplete);
  const hasDelivery = deliveries.length > 0;

  useEffect(() => {
    if (complete || !hasDelivery) {
      return;
    }

    setComplete(true);

    try {
      window.localStorage.setItem(storageKey, "true");
    } catch {
      // The tutorial stays complete for this session.
    }
  }, [complete, hasDelivery]);

  if (complete || hasDelivery || belt.some(Boolean)) {
    return -1;
  }

  return feeders.findIndex(([firstSushi]) =>
    orders.some(({ type, quantity }) => quantity > 0 && type === firstSushi),
  );
}
