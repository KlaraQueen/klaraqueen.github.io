import { createElement } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";
import App from "./App";
import GlobalStyle from "./GlobalStyle";
import theme from "./theme";

const root = createRoot(document.getElementById("root"));

root.render(
  createElement(
    ThemeProvider,
    { theme },
    createElement(GlobalStyle),
    createElement(App),
  ),
);
