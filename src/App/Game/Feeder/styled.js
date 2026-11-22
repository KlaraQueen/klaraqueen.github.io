import styled from "styled-components";

export const FeederLane = styled.div`
  display: grid;
  justify-items: center;
  gap: ${({ theme }) => theme.spacing.beltGap};
  padding: ${({ theme }) => theme.spacing.beltGap};
  background-color: ${({ theme }) => theme.colors.beltSlot};
  border: ${({ theme }) => theme.sizes.beltBorder} solid
    ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.radii.beltCenter};
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
