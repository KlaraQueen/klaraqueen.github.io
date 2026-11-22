import { createElement } from "react";
import { hammerCost } from "../useGameState/gameReducer";
import { HammerControl } from "./styled";

export default function HammerButton({ coins, active, onToggle }) {
  return createElement(
    HammerControl,
    {
      type: "button",
      disabled: coins < hammerCost,
      "aria-pressed": active,
      "aria-label": `Hammer, ${hammerCost} coins`,
      onClick: onToggle,
    },
    `🔨 ${hammerCost}`,
  );
}
