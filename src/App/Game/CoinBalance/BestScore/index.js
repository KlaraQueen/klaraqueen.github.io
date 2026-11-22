import { createElement } from "react";
import { BestScoreLabel } from "./styled";

export default function BestScore({ score }) {
  return createElement(BestScoreLabel, null, `Best ${score}`);
}
