import { createElement, useLayoutEffect, useRef } from "react";
import { coinsPerCustomer } from "../../useGameState/advanceBelt";
import { FlyingCoins } from "./styled";

export default function CoinFlight() {
  const coinRef = useRef(null);

  useLayoutEffect(() => {
    const coin = coinRef.current;
    const game = coin?.closest("[data-sushi-game]");
    const balance = game?.querySelector("[data-coin-target]");

    if (
      !balance ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const start = coin.getBoundingClientRect();
    const end = balance.getBoundingClientRect();

    const x = end.left + end.width / 2 - (start.left + start.width / 2);
    const y = end.top + end.height / 2 - (start.top + start.height / 2);

    const animation = coin.animate(
      [
        { transform: "translate(0, 0)", opacity: 1, offset: 0 },
        { transform: "translate(0, 0)", opacity: 1, offset: 0.25 },
        { transform: `translate(${x}px, ${y}px)`, opacity: 0.8, offset: 0.9 },
        { transform: `translate(${x}px, ${y}px)`, opacity: 0, offset: 1 },
      ],
      { duration: 1200, easing: "ease-in-out", fill: "forwards" },
    );

    return () => animation.cancel();
  }, []);

  return createElement(
    FlyingCoins,
    { ref: coinRef, "aria-hidden": true },
    `🪙 +${coinsPerCustomer}`,
  );
}
