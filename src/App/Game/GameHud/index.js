import { createElement } from "react";
import CoinBalance from "../CoinBalance";
import HammerButton from "../HammerButton";
import LevelIndicator from "../LevelIndicator";
import {
  BonusBoostButton,
  HudBar,
  HudTitle,
  HudTopRow,
  MenuButton,
  RewardAdStatus,
} from "./styled";

export default function GameHud({
  round,
  coins,
  bestScore,
  runCoins = 0,
  hammerActive = false,
  onHammerToggle,
  onRewardCoins,
  rewardAdBusy = false,
  rewardAdMessage = "",
  onOpenMenu,
  menuOpen = false,
}) {
  return createElement(
    HudBar,
    null,
    createElement(
      HudTopRow,
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
              disabled: rewardAdBusy,
              onClick: onRewardCoins,
              "aria-label": "Watch ad for 100 coins",
            },
            "🎁 +100",
          )
        : null,
      onOpenMenu
        ? createElement(
            MenuButton,
            {
              type: "button",
              onClick: onOpenMenu,
              "aria-label": "Open pause menu",
              "aria-haspopup": "dialog",
              "aria-controls": "game-pause-menu",
              "aria-expanded": menuOpen,
            },
            createElement("span", { "aria-hidden": true }, "☰"),
          )
        : null,
    ),
    createElement(CoinBalance, { coins, bestScore, runCoins }),
    createElement(RewardAdStatus, { role: "status" }, rewardAdMessage),
  );
}
