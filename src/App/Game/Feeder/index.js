import { createElement } from "react";
import Plate from "../MainBelt/Plate";
import { FeederLane, FirstPlate, PlatePosition } from "./styled";

const visiblePlateLimit = 6;

export default function Feeder({ sushiTypes, onLoad, showTutorialHint }) {
  const visibleSushi = sushiTypes.slice(0, visiblePlateLimit);

  return createElement(
    FeederLane,
    {
      type: "button",
      onClick: onLoad,
      disabled: visibleSushi.length === 0,
      "aria-label": "Send next sushi from this feeder",
    },
    visibleSushi.map((type, index) =>
      createElement(
        index === 0 ? FirstPlate : PlatePosition,
        { key: index, $highlight: index === 0 && showTutorialHint },
        createElement(Plate, { type }),
      ),
    ),
  );
}
