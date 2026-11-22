import styled from "styled-components";

export const HammerControl = styled.button`
  display: inline-grid;
  place-items: center;
  min-height: 44px;
  padding: ${({ theme }) => theme.spacing.beltGap}
    ${({ theme }) => theme.spacing.page};
  border: 1px solid ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.radii.beltCenter};
  background: ${({ theme }) => theme.colors.beltSlot};
  color: ${({ theme }) => theme.colors.text};
  font: inherit;
  font-weight: 700;
  white-space: nowrap;
  cursor: pointer;

  &[aria-pressed="true"] {
    border-color: ${({ theme }) => theme.colors.plate};
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.background};
    box-shadow:
      0 0 0 2px ${({ theme }) => theme.colors.plate},
      0 0 12px ${({ theme }) => theme.colors.accent};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.text};
    outline-offset: 4px;
  }

  &:disabled {
    opacity: 0.55;
    cursor: default;
  }
`;
