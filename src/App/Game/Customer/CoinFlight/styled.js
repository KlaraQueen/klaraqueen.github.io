import styled from "styled-components";

export const FlyingCoins = styled.span`
  position: relative;
  z-index: 1;
  pointer-events: none;
  padding: ${({ theme }) => theme.spacing.beltGap};
  border-radius: ${({ theme }) => theme.radii.beltCenter};
  background-color: ${({ theme }) => theme.colors.plate};
  color: ${({ theme }) => theme.colors.background};
  font-weight: 700;
  white-space: nowrap;
`;
