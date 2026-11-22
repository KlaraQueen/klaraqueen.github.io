import { createElement } from "react";
import { ProgressBadge } from "./styled";

export default function CustomerProgress({ servedCustomers, totalCustomers }) {
  return createElement(
    ProgressBadge,
    { role: "status" },
    `${servedCustomers}/${totalCustomers}`,
  );
}
