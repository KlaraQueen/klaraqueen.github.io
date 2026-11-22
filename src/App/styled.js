import styled from "styled-components";
import sushiBarMobile from "./Images/sushi-bar-mobile.png";
import sushiBarWide from "./Images/sushi-bar-wide.png";

export const Main = styled.main`
  --restaurant-image: url("${sushiBarMobile}");

  position: relative;
  isolation: isolate;
  display: grid;
  grid-template-rows: minmax(0, 1fr);
  width: 100%;
  height: 100dvh;
  max-width: ${({ theme }) => theme.sizes.gameMaxWidth};
  margin-inline: auto;
  padding: ${({ theme }) => theme.spacing.page};
  text-align: center;

  &::before {
    content: "";
    position: fixed;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    background: var(--restaurant-image) center top / cover no-repeat
      ${({ theme }) => theme.colors.background};
  }

  @media (min-aspect-ratio: 1 / 1) {
    --restaurant-image: url("${sushiBarWide}");
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    padding: ${({ theme }) => theme.spacing.pageWide};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktopLarge}px) {
    max-width: ${({ theme }) => theme.sizes.gameMaxWidthLarge};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tv4k}px) {
    max-width: ${({ theme }) => theme.sizes.gameMaxWidth4k};
  }
`;
