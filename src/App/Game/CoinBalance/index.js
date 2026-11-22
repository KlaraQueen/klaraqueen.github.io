import { createElement } from "react";
import BestScore from "./BestScore";
import { Balance, CurrentCoins } from "./styled";

export default function CoinBalance({ coins, bestScore }) {
  return createElement(
    Balance,
    null,
    createElement(
      CurrentCoins,
      { role: "status", "data-coin-target": true },
      `🪙 ${coins}`,
    ),
    createElement(BestScore, { score: bestScore }),
  );
}
