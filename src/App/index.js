import { createElement } from "react";
import Game from "./Game";
import { Main } from "./styled";

export default function App() {
  return createElement(Main, null, createElement(Game));
}
