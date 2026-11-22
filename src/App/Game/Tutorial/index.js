import { createElement } from "react";
import { TutorialHint, TutorialRow } from "./styled";

export default function Tutorial({ showHint, children }) {
  return createElement(
    TutorialRow,
    null,
    children,
    showHint ? createElement(TutorialHint, null, "Tap to send sushi") : null,
  );
}
