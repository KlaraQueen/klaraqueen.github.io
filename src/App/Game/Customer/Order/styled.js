import styled from "styled-components";
import { PlateImage } from "../../MainBelt/Plate/styled";

export const OrderBubble = styled.span`
  display: inline-grid;
  grid-template-columns: clamp(22px, 7.5vw, 36px) max-content;
  align-items: center;
  justify-self: center;
  width: max-content;
  gap: 2px;
  padding: 2px 4px 2px 3px;
  border: 1px solid #dcb88d;
  border-radius: 999px;
  background-color: ${({ theme }) => theme.colors.plate};
  color: ${({ theme }) => theme.colors.background};
  box-shadow: 0 2px 4px rgb(0 0 0 / 20%);

  & > ${PlateImage} {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 1;
    object-fit: contain;
  }

  @media (min-width: 481px) {
    gap: 4px;
    padding: 3px 7px 3px 4px;
  }
`;

export const OrderQuantity = styled.span`
  font-size: clamp(0.75rem, 3.8vw, 1rem);
  font-weight: 800;
  font-variant-numeric: tabular-nums;
  line-height: 1;
  white-space: nowrap;
`;
