import styled, { keyframes } from "styled-components";

const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }

  to {
    transform: translateY(0);
  }
`;

export const GameOverScreen = styled.section`
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  align-items: end;
  justify-items: center;
  background: rgb(10 7 5 / 62%);
`;

export const ResultCard = styled.div`
  box-sizing: border-box;
  display: grid;
  justify-items: center;
  gap: ${({ theme }) => theme.spacing.gameGap};
  width: min(100%, ${({ theme }) => theme.sizes.beltMaxWidth});
  max-height: 100%;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.pageWide};
  padding-bottom: max(
    ${({ theme }) => theme.spacing.pageWide},
    env(safe-area-inset-bottom)
  );
  border: ${({ theme }) => theme.sizes.beltBorder} solid
    ${({ theme }) => theme.colors.accent};
  border-bottom: 0;
  border-radius: ${({ theme }) => theme.radii.belt}
    ${({ theme }) => theme.radii.belt} 0 0;
  background: linear-gradient(155deg, #503023, #25150e);
  color: ${({ theme }) => theme.colors.text};
  box-shadow: 0 -6px 24px rgb(0 0 0 / 35%);

  @media (prefers-reduced-motion: no-preference) {
    animation: ${slideUp} 240ms ease-out both;
  }
`;

export const ResultTitle = styled.h2`
  margin: 0;
`;

export const ResultScore = styled.p`
  margin: 0;
  font-variant-numeric: tabular-nums;
`;

export const PlayAgainButton = styled.button`
  width: 100%;
  min-height: 44px;
  padding: ${({ theme }) => theme.spacing.beltGap}
    ${({ theme }) => theme.spacing.page};
  border: 0;
  border-radius: ${({ theme }) => theme.radii.beltCenter};
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.background};
  font: inherit;
  font-weight: 700;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.plate};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.45;
    cursor: default;
  }
`;
