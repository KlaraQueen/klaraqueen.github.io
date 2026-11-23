import styled from "styled-components";

export const FeederLane = styled.button`
  display: grid;
  grid-template-rows: repeat(6, minmax(0, auto));
  align-content: start;
  justify-items: center;
  gap: ${({ theme }) => theme.spacing.beltGap};
  width: 100%;
  min-width: 0;
  min-height: 44px;
  align-self: stretch;
  box-sizing: border-box;
  padding: ${({ theme }) => theme.spacing.beltGap};
  background-color: ${({ theme }) => theme.colors.beltSlot};
  border: ${({ theme }) => theme.sizes.beltBorder} solid
    ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.radii.beltCenter};
  cursor: pointer;
  touch-action: manipulation;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }

  &:disabled {
    cursor: default;
  }
`;

export const PlatePosition = styled.span`
  display: grid;
  place-items: center;
  width: 100%;
  min-width: 0;
`;

export const FirstPlate = styled(PlatePosition)`
  border-radius: ${({ theme }) => theme.radii.beltCenter};
  background: ${({ $highlight }) =>
    $highlight
      ? "radial-gradient(ellipse at center, rgba(255, 207, 110, 0.65), transparent 75%)"
      : "transparent"};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    position: relative;
    border-radius: 8px;
    box-shadow: inset 0 0 0 2px #efbe68;

    &::after {
      content: "↑";
      position: absolute;
      top: 1px;
      right: 1px;
      display: grid;
      place-items: center;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #ffcf76;
      color: #352315;
      font:
        800 12px / 1 system-ui,
        sans-serif;
      pointer-events: none;
    }
  }
`;

export const LoadPlateButton = styled.button`
  display: grid;
  place-items: center;
  width: 100%;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;

  &:focus-visible {
    outline: ${({ theme }) => theme.sizes.beltBorder} solid
      ${({ theme }) => theme.colors.accent};
  }
`;
