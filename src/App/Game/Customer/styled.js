import styled, { keyframes } from "styled-components";

const floatUp = keyframes`
  0%, 35% {
    transform: translateY(0);
    opacity: 1;
  }

  100% {
    transform: translateY(-100%);
    opacity: 0;
  }
`;

export const CustomerStand = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  justify-items: center;
  align-content: center;
  gap: ${({ theme }) => theme.spacing.beltGap};
  min-width: 0;
`;

export const CustomerImage = styled.img`
  display: block;
  width: min(150%, 9rem);
  min-height: min(41cqh, 9rem);
  object-fit: contain;
  object-position: center;
`;

export const CompletionBadge = styled.span`
  padding: ${({ theme }) => theme.spacing.beltGap}
    ${({ theme }) => theme.spacing.page};
  border-radius: ${({ theme }) => theme.radii.beltCenter};
  background-color: ${({ theme }) => theme.colors.plate};
  color: ${({ theme }) => theme.colors.background};
  font-weight: 700;
  white-space: nowrap;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${floatUp} 2s ease-out both;
  }
`;
