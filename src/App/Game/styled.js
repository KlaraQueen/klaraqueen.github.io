import styled from "styled-components";
import { CustomerImage } from "./Customer/styled";
import { FeederLane, LoadPlateButton } from "./Feeder/styled";
import { Belt, BeltSlot } from "./MainBelt/styled";
import { PlateImage } from "./MainBelt/Plate/styled";

export const GameScreen = styled.section`
  container-type: size;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: auto auto minmax(0, 2fr) auto minmax(0, 1fr);
  gap: ${({ theme }) => theme.spacing.gameGap};
  min-height: 0;
`;

export const FeederRack = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(
    0,
    calc((100% - 3 * ${({ theme }) => theme.spacing.gameGap}) / 4)
  );
  grid-template-rows: minmax(0, 1fr);
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.gameGap};
  width: 100%;
  max-width: ${({ theme }) => theme.sizes.beltMaxWidth};
  min-height: 0;
  margin-inline: auto;

  & > ${FeederLane} {
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: repeat(6, minmax(0, 1fr));
    min-height: 0;
  }

  & ${LoadPlateButton} {
    min-height: 0;
    grid-template: minmax(0, 1fr) / minmax(0, 1fr);
  }

  & ${PlateImage} {
    width: 100%;
    height: 100%;
    min-height: 0;
    object-fit: contain;
  }
`;

export const CustomerBoard = styled.div`
  container-type: size;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  grid-template-rows: repeat(2, minmax(0, 1fr));
  grid-template-areas:
    "topLeft belt topRight"
    "bottomLeft belt bottomRight";
  column-gap: ${({ theme }) => theme.spacing.beltGap};
  min-height: 0;

  & > ${Belt} {
    grid-area: belt;
    align-self: center;
    width: min(72cqw, 100cqh, ${({ theme }) => theme.sizes.beltMaxWidth});
  }

  & ${BeltSlot} {
    grid-template: minmax(0, 1fr) / minmax(0, 1fr);
  }

  & ${BeltSlot} > ${PlateImage} {
    width: 100%;
    height: 100%;
    min-height: 0;
    object-fit: contain;
  }

  & ${CustomerImage} {
    height: 32cqh;
  }

  & > :nth-child(n + 2) {
    width: min(100%, ${({ theme }) => `calc(${theme.sizes.sushiIcon} * 3)`});
  }

  & > :nth-child(2) {
    grid-area: topLeft;
    align-self: start;
    justify-self: end;
  }

  & > :nth-child(3) {
    grid-area: topRight;
    align-self: start;
    justify-self: start;
  }

  & > :nth-child(4) {
    grid-area: bottomRight;
    align-self: end;
    justify-self: start;
  }

  & > :nth-child(5) {
    grid-area: bottomLeft;
    align-self: end;
    justify-self: end;
  }
`;
