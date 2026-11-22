import { createElement } from "react";
import Plate from "./Plate";
import { Belt, BeltSlot } from "./styled";
import usePlateAnimation from "./usePlateAnimation";

const beltSlots = [
  [1, 1],
  [1, 2],
  [1, 3],
  [1, 4],
  [1, 5],
  [1, 6],
  [1, 7],
  [2, 7],
  [3, 7],
  [4, 7],
  [5, 7],
  [6, 7],
  [7, 7],
  [7, 6],
  [7, 5],
  [7, 4],
  [7, 3],
  [7, 2],
  [7, 1],
  [6, 1],
  [5, 1],
  [4, 1],
  [3, 1],
  [2, 1],
];

const selectableSlotStyle = {
  padding: 0,
  border: 0,
  background: "transparent",
  cursor: "pointer",
};

export default function MainBelt({
  sushiBySlot,
  beltStep,
  moveIntervalMs,
  hammerActive,
  onHammerSlotSelect,
}) {
  const slotElements = usePlateAnimation(sushiBySlot, moveIntervalMs, beltStep);

  return createElement(
    Belt,
    { role: "group", "aria-label": "Sushi conveyor" },
    beltSlots.map(([row, column], index) => {
      const sushiType = sushiBySlot[index];
      const canSelect = hammerActive && Boolean(sushiType);

      return createElement(
        BeltSlot,
        {
          key: `${row}-${column}`,
          $row: row,
          $column: column,
          "data-belt-slot": index,
          ref: (element) => {
            slotElements.current[index] = element;
          },
          ...(canSelect && {
            as: "button",
            type: "button",
            style: selectableSlotStyle,
            onClick: () => onHammerSlotSelect(index),
          }),
        },
        sushiType ? createElement(Plate, { type: sushiType }) : null,
      );
    }),
  );
}
