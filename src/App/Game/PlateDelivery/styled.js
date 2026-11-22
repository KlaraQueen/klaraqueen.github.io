import styled from "styled-components";
import { PlateImage } from "../MainBelt/Plate/styled";

export const FlyingPlate = styled.span`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  display: grid;
  place-items: center;
  width: var(--flight-width);
  height: var(--flight-height);
  opacity: 0;
  pointer-events: none;

  & > ${PlateImage} {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
