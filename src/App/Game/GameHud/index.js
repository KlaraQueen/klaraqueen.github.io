import { createElement } from "react";
import CoinBalance from "../CoinBalance";
import HammerButton from "../HammerButton";
import LevelIndicator from "../LevelIndicator";
import { BonusBoostButton, HudBar, HudTitle } from "./styled";

export default function GameHud({
  round,
  coins,
  bestScore,
  hammerActive = false,
  onHammerToggle,
  onRewardCoins,
}) {
  return createElement(
    HudBar,
    null,
    createElement(HudTitle, null, "Sushi Conveyor"),
    createElement(LevelIndicator, { round }),
    onHammerToggle
      ? createElement(HammerButton, {
          coins,
          active: hammerActive,
          onToggle: onHammerToggle,
        })
      : null,
    onRewardCoins
      ? createElement(
          BonusBoostButton,
          {
            type: "button",
            onClick: onRewardCoins,
            "aria-label": "Watch ad for 100 coins",
          },
          "🎁 +100",
        )
      : null,
    createElement(CoinBalance, { coins, bestScore }),
  );
}
