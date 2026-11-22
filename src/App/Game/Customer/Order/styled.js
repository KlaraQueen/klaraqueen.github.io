import styled from "styled-components";
import { PlateImage } from "../../MainBelt/Plate/styled";

export const OrderBubble = styled.span`
  display: inline-grid;
  grid-template-columns:
    minmax(0, ${({ theme }) => `calc(${theme.sizes.sushiIcon} * 1.35)`})
    auto;
  align-items: center;
  justify-items: center;
  width: max-content;
  max-width: 100%;
  gap: ${({ theme }) => theme.spacing.beltGap};
  padding: ${({ theme }) => theme.spacing.beltGap};
  border-radius: ${({ theme }) => theme.radii.beltCenter};
  background-color: ${({ theme }) => theme.colors.plate};
  color: ${({ theme }) => theme.colors.background};

  & > ${PlateImage} {
    width: 100%;
    min-width: 0;
    height: auto;
  }
`;

export const OrderQuantity = styled.span`
  font-weight: 700;
  white-space: nowrap;
`;
