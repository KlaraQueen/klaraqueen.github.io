import { createElement } from "react";
import { LevelBadge } from "./styled";

export default function LevelIndicator({ round }) {
  return createElement(LevelBadge, null, `Level ${round}`);
}
