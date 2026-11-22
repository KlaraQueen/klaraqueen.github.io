import styled from "styled-components";

export const ProgressBadge = styled.p`
  justify-self: center;
  margin: 0;
  padding: ${({ theme }) => theme.spacing.beltGap}
    ${({ theme }) => theme.spacing.page};
  border-radius: ${({ theme }) => theme.radii.beltCenter};
  background-color: ${({ theme }) => theme.colors.plate};
  color: ${({ theme }) => theme.colors.background};
  font-weight: 700;
  white-space: nowrap;
`;
