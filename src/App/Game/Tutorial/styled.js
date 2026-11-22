import styled, { keyframes } from "styled-components";
import { LoadPlateButton } from "../Feeder/styled";

const pulse = keyframes`
  from, to {
    box-shadow: inset 0 0 0 1px rgb(255 204 104 / 55%);
  }

  50% {
    box-shadow: inset 0 0 0 2px rgb(255 204 104 / 95%),
      0 0 8px rgb(255 184 72 / 65%);
  }
`;

export const TutorialRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.beltGap};
`;

export const TutorialHint = styled.span`
  padding: ${({ theme }) => theme.spacing.beltGap}
    ${({ theme }) => theme.spacing.page};
  border-radius: ${({ theme }) => theme.radii.beltCenter};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 700;
`;

export const TutorialPlateButton = styled(LoadPlateButton)`
  box-shadow: inset 0 0 0 2px rgb(255 204 104 / 85%);

  @media (prefers-reduced-motion: no-preference) {
    animation: ${pulse} 1.3s ease-in-out infinite;
  }
`;
