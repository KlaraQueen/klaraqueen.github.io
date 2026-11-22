import { createElement, useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Plate from "../MainBelt/Plate";
import { FlyingPlate } from "./styled";

function translate(x, y, scale = 1) {
  return `translate(${x}px, ${y}px) scale(${scale})`;
}

export default function PlateDelivery({
  id,
  gameRef,
  type,
  fromSlot,
  cornerSlot,
  moveMs,
  travelMs,
  paused,
  onArrive,
}) {
  const plateRef = useRef(null);
  const fallbackTimeLeft = useRef(null);

  useLayoutEffect(() => {
    const game = gameRef.current;
    const plate = plateRef.current;
    const duration = moveMs + travelMs;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const startSlot = game?.querySelector(`[data-belt-slot="${fromSlot}"]`);
    const corner = game?.querySelector(`[data-belt-slot="${cornerSlot}"]`);
    const customer = game?.querySelector(
      `[data-customer-slot="${cornerSlot}"]`,
    );
    const target = customer?.querySelector("[data-customer-image]") ?? customer;

    if (
      reducedMotion.matches ||
      !plate?.animate ||
      !startSlot ||
      !corner ||
      !target
    ) {
      fallbackTimeLeft.current = duration;
      return;
    }

    fallbackTimeLeft.current = null;

    const start = startSlot.getBoundingClientRect();
    const turn = corner.getBoundingClientRect();
    const end = target.getBoundingClientRect();
    const targetX = end.left + (end.width - start.width) / 2;
    const targetY = end.top + (end.height - start.height) / 2;

    plate.style.setProperty("--flight-width", `${start.width}px`);
    plate.style.setProperty("--flight-height", `${start.height}px`);

    const animation = plate.animate(
      [
        {
          transform: translate(start.left, start.top),
          opacity: 1,
          offset: 0,
        },
        {
          transform: translate(turn.left, turn.top),
          opacity: 1,
          offset: moveMs / duration,
          easing: "ease-in",
        },
        {
          transform: translate(targetX, targetY, 0.6),
          opacity: 0,
          offset: 1,
        },
      ],
      { duration, easing: "linear", fill: "both" },
    );

    animation.onfinish = () => onArrive(id);

    return () => {
      animation.onfinish = null;
      animation.cancel();
    };
  }, [id, gameRef, fromSlot, cornerSlot, moveMs, travelMs, onArrive]);

  useLayoutEffect(() => {
    const timeLeft = fallbackTimeLeft.current;

    if (paused || timeLeft === null) {
      return;
    }

    const startedAt = performance.now();
    const timerId = window.setTimeout(() => {
      fallbackTimeLeft.current = null;
      onArrive(id);
    }, timeLeft);

    return () => {
      window.clearTimeout(timerId);

      if (fallbackTimeLeft.current !== null) {
        fallbackTimeLeft.current = Math.max(
          0,
          timeLeft - (performance.now() - startedAt),
        );
      }
    };
  }, [paused, id, gameRef, fromSlot, cornerSlot, moveMs, travelMs, onArrive]);

  return createPortal(
    createElement(
      FlyingPlate,
      {
        ref: plateRef,
        "aria-hidden": true,
        "data-game-flight": true,
      },
      createElement(Plate, { type }),
    ),
    document.body,
  );
}
