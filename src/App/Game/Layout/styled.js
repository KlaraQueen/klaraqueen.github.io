import styled from "styled-components";
import { LoadPlateButton } from "../Feeder/styled";
import { PlateImage } from "../MainBelt/Plate/styled";
import { FeederRack, GameScreen } from "../styled";

export const GameLayout = styled(GameScreen)`
  && {
    grid-template-rows: auto minmax(0, 2fr) auto minmax(0, 1fr);
  }

  @media (max-width: 480px) {
    && {
      grid-template-rows: auto minmax(0, 1.65fr) auto minmax(0, 1fr);
      gap: 5px;
    }
  }
`;

export const FeederCounter = styled(FeederRack)`
  && {
    box-sizing: border-box;
    grid-auto-columns: minmax(0, 1fr);
    padding: ${({ theme }) => theme.spacing.beltGap};
    border: 1px solid #aa754d;
    border-radius: ${({ theme }) => theme.radii.beltCenter};
    background: linear-gradient(155deg, #95603c, #503023);
    box-shadow:
      inset 0 1px rgb(255 221 174 / 32%),
      0 3px 8px rgb(0 0 0 / 28%);
  }

  && > button {
    box-sizing: border-box;
    justify-self: center;
    width: 100%;
    max-width: 4.5rem;
    border: 1px solid #c49b73;
    border-radius: ${({ theme }) => theme.radii.beltCenter};
    background:
      linear-gradient(
        90deg,
        rgb(204 166 121 / 45%),
        transparent 14% 86%,
        rgb(204 166 121 / 45%)
      ),
      repeating-linear-gradient(
        to bottom,
        #333134 0 10px,
        #242326 10px 11px,
        #333134 12px 17px
      );
    box-shadow:
      inset 0 0 5px rgb(0 0 0 / 65%),
      0 1px 3px rgb(0 0 0 / 50%);
  }

  & ${LoadPlateButton} {
    min-height: 0;
    border-radius: ${({ theme }) => theme.radii.beltCenter};
    background: radial-gradient(
      ellipse at center,
      rgb(255 204 104 / 65%),
      rgb(255 171 54 / 25%) 46%,
      transparent 72%
    );
  }

  @media (max-width: 480px) {
    && {
      gap: 5px;
      padding: 3px;
    }

    && > button {
      max-width: none;
      gap: 0;
      padding: 2px;
    }
  }

  @media (min-width: 481px) {
    && {
      gap: 8px;
      padding: 4px;
    }

    && > button {
      display: grid;
      max-width: 7rem;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      grid-template-rows: repeat(3, minmax(0, 1fr));
      grid-auto-flow: row;
      gap: 4px;
      padding: 5px;
    }

    && > button > * {
      display: grid;
      grid-template: minmax(0, 1fr) / minmax(0, 1fr);
      place-items: center;
      min-width: 0;
      min-height: 0;
      width: 100%;
    }

    && > button ${PlateImage} {
      width: 100%;
      height: 100%;
      max-width: 3rem;
      max-height: 3rem;
      object-fit: contain;
    }

    && > button > :first-child {
      box-shadow: none;
    }

    && > button > :first-child::after {
      content: none;
    }

    && > button > :first-child ${PlateImage} {
      border-radius: 50%;
      outline: 2px solid #ffcf76;
      outline-offset: -2px;
      background: rgb(255 207 118 / 12%);
    }
  }
`;
