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
