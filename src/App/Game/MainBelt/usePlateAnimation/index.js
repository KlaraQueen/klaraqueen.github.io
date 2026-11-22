import { useLayoutEffect, useRef } from "react";

export default function usePlateAnimation(
  sushiBySlot,
  moveIntervalMs,
  beltStep,
) {
  const slotElements = useRef([]);
  const previousFrame = useRef({ slots: sushiBySlot, step: beltStep });
  const plateAnimations = useRef(new WeakMap());

  useLayoutEffect(() => {
    const previous = previousFrame.current;
    previousFrame.current = { slots: sushiBySlot, step: beltStep };

    if (beltStep !== previous.step + 1) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const slotCount = sushiBySlot.length;

    sushiBySlot.forEach((type, index) => {
      const previousIndex = (index - 1 + slotCount) % slotCount;

      if (!type || previous.slots[previousIndex] !== type) {
        return;
      }

      const fromSlot = slotElements.current[previousIndex];
      const toSlot = slotElements.current[index];
      const plate = toSlot?.firstElementChild;

      if (!fromSlot || !plate) {
        return;
      }

      const from = fromSlot.getBoundingClientRect();
      const to = toSlot.getBoundingClientRect();
      const x = from.left - to.left;
      const y = from.top - to.top;

      plateAnimations.current.get(plate)?.cancel();

      const animation = plate.animate(
        [
          { transform: `translate(${x}px, ${y}px)` },
          { transform: "translate(0, 0)" },
        ],
        { duration: moveIntervalMs, easing: "linear" },
      );

      plateAnimations.current.set(plate, animation);
    });
  }, [sushiBySlot, moveIntervalMs, beltStep]);

  return slotElements;
}
