import styled from "styled-components";

export const Balance = styled.div`
  display: grid;
  justify-items: end;
  justify-self: end;
  gap: ${({ theme }) => theme.spacing.beltGap};
  padding: ${({ theme }) => theme.spacing.beltGap}
    ${({ theme }) => theme.spacing.page};
  border-radius: ${({ theme }) => theme.radii.beltCenter};
  background-color: ${({ theme }) => theme.colors.beltSlot};
  font-weight: 700;
  font-variant-numeric: tabular-nums;
`;

export const CurrentCoins = styled.span`
  color: ${({ theme }) => theme.colors.accent};
  white-space: nowrap;
`;
