import { createElement } from "react";
import Plate from "../MainBelt/Plate";
import { TutorialPlateButton } from "../Tutorial/styled";
import { FeederLane, LoadPlateButton } from "./styled";

const visiblePlateLimit = 6;

export default function Feeder({ sushiTypes, onLoad, showTutorialHint }) {
  const [firstSushi, ...waitingSushi] = sushiTypes.slice(0, visiblePlateLimit);
  const FirstPlateButton = showTutorialHint
    ? TutorialPlateButton
    : LoadPlateButton;

  return createElement(
    FeederLane,
    null,
    firstSushi
      ? createElement(
          FirstPlateButton,
          { type: "button", onClick: onLoad },
          createElement(Plate, { type: firstSushi }),
        )
      : null,
    waitingSushi.map((type, index) =>
      createElement(Plate, { key: index, type }),
    ),
  );
}
