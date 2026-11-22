import styled from "styled-components";

export const LevelBadge = styled.p`
  justify-self: center;
  margin: 0;
  padding: ${({ theme }) => theme.spacing.beltGap}
    ${({ theme }) => theme.spacing.page};
  border: ${({ theme }) => theme.sizes.beltBorder} solid
    ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.radii.beltCenter};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 700;
  white-space: nowrap;
`;
