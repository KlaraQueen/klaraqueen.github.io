import { createElement } from "react";
import { Balance, CurrentCoins, Stat, StatLabel, StatValue } from "./styled";

export default function CoinBalance({ coins, bestScore, runCoins = 0 }) {
  return createElement(
    Balance,
    { "aria-label": "Game statistics" },
    createElement(
      Stat,
      null,
      createElement(StatLabel, null, "Run coins"),
      createElement(StatValue, null, runCoins),
    ),
    createElement(
      Stat,
      null,
      createElement(StatLabel, null, "Wallet"),
      createElement(
        CurrentCoins,
        { role: "status", "data-coin-target": true },
        coins,
      ),
    ),
    createElement(
      Stat,
      { $record: true },
      createElement(StatLabel, null, "Best score"),
      createElement(StatValue, null, bestScore),
    ),
  );
}
