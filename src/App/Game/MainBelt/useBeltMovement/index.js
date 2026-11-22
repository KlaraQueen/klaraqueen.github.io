import { useEffect, useState } from "react";

export default function useBeltMovement(initialSlots, intervalMs) {
  const [slots, setSlots] = useState(initialSlots);

  useEffect(() => {
    const timerId = setInterval(() => {
      setSlots((currentSlots) => {
        const lastSlot = currentSlots[currentSlots.length - 1];

        return [lastSlot, ...currentSlots.slice(0, -1)];
      });
    }, intervalMs);

    return () => clearInterval(timerId);
  }, [intervalMs]);

  return slots;
}
