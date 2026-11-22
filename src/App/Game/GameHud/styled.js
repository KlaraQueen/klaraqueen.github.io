import styled from "styled-components";
import { Balance } from "../CoinBalance/styled";
import { HammerControl } from "../HammerButton/styled";
import { LevelBadge } from "../LevelIndicator/styled";

export const BonusBoostButton = styled.button`
  display: inline-grid;
  place-items: center;
  min-height: 44px;
  padding: ${({ theme }) => theme.spacing.beltGap}
    ${({ theme }) => theme.spacing.page};
  border: 1px solid #9be7a9;
  border-radius: ${({ theme }) => theme.radii.beltCenter};
  background: linear-gradient(180deg, #1d6d2d, #0d3d1b);
  color: #f5fff7;
  font: inherit;
  font-weight: 700;
  white-space: nowrap;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.text};
    outline-offset: 4px;
  }
`;

export const HudBar = styled.header`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.beltGap};
  padding: ${({ theme }) => theme.spacing.beltGap};
  border: 1px solid ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.radii.beltCenter};
  background: rgb(37 21 14 / 92%);
  color: ${({ theme }) => theme.colors.text};
  font-size: clamp(0.75rem, 2.7vw, 1rem);

  &:has(> ${HammerControl}) {
    grid-template-columns: minmax(0, 1fr) auto auto auto;
  }

  &:has(> ${BonusBoostButton}) {
    grid-template-columns: minmax(0, 1fr) auto auto auto auto;
  }

  & > ${LevelBadge}, & > ${Balance}, & > ${HammerControl}, & > ${BonusBoostButton} {
    padding-inline: ${({ theme }) => theme.spacing.beltGap};
  }

  & > ${LevelBadge}, & > ${Balance} {
    padding-block: ${({ theme }) => theme.spacing.beltGap};
    border: 0;
    background: transparent;
  }
`;

export const HudTitle = styled.h1`
  margin: 0;
  padding-inline-start: ${({ theme }) => theme.spacing.beltGap};
  text-align: start;
  font-family: Georgia, serif;
  font-size: clamp(0.95rem, 4vw, 1.65rem);
  line-height: 1.1;
`;
