import styled from "styled-components";
import kaitenBelt from "./Images/kaiten-belt.png";

export const Belt = styled.div`
  display: grid;
  grid-template-columns: 5% repeat(7, minmax(0, 1fr)) 5%;
  grid-template-rows: 5% repeat(7, minmax(0, 1fr)) 5%;
  width: 100%;
  max-width: ${({ theme }) => theme.sizes.beltMaxWidth};
  margin-inline: auto;
  aspect-ratio: 1;
  background: url("${kaitenBelt}") center / 100% 100% no-repeat;
`;

export const BeltSlot = styled.div`
  grid-row: ${({ $row }) => $row + 1};
  grid-column: ${({ $column }) => $column + 1};
  display: grid;
  place-items: center;

  &:nth-child(1) {
    transform: translate(20%, 20%);
  }

  &:nth-child(7) {
    transform: translate(-20%, 20%);
  }

  &:nth-child(13) {
    transform: translate(-20%, -20%);
  }

  &:nth-child(19) {
    transform: translate(20%, -20%);
  }
`;

export const LoadingQueue = styled.div`
  grid-row: 7;
  grid-column: 4 / span 3;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: center;
  justify-self: center;
  width: 82%;
  gap: 8%;
`;

export const LoadingTray = styled.span`
  display: grid;
  place-items: center;
  width: 100%;
  min-width: 0;
  min-height: 0;
  aspect-ratio: 1.25;
  box-sizing: border-box;
  border: 2px solid ${({ $occupied }) => ($occupied ? "#f8ce8a" : "#ba8351")};
  border-radius: 28%;
  background: ${({ $occupied }) => ($occupied ? "#7a4a2b" : "#39251d")};
  box-shadow:
    inset 0 2px 5px #1b100b99,
    0 2px 3px #20140e80;
`;
