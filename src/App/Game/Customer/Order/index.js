import { createElement } from "react";
import Plate from "../../MainBelt/Plate";
import { OrderBubble, OrderQuantity } from "./styled";

export default function Order({ type, quantity }) {
  return createElement(
    OrderBubble,
    null,
    createElement(Plate, { type }),
    createElement(OrderQuantity, null, `×${quantity}`),
  );
}
