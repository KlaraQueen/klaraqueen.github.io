import styled from "styled-components";
import { Balance } from "../CoinBalance/styled";
import { HammerControl } from "../HammerButton/styled";
import { LevelBadge } from "../LevelIndicator/styled";

export const HudBar = styled.header`
  && {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    align-items: center;
    gap: 5px;
    padding: 6px;
  }

  border: 1px solid ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.radii.beltCenter};
  background: rgb(37 21 14 / 94%);
  color: ${({ theme }) => theme.colors.text};

  && > ${Balance} {
    grid-column: 1 / -1;
    justify-self: stretch;
    min-width: 0;
    width: 100%;
  }
`;

export const HudTopRow = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  min-width: 0;
  font-size: clamp(0.7rem, 2.8vw, 0.9rem);

  & > ${LevelBadge} {
    flex: 0 0 auto;
    padding: 0;
    border: 0;
    background: transparent;
    white-space: nowrap;
  }

  & > ${HammerControl} {
    flex: 0 0 auto;
    min-width: 44px;
    min-height: 44px;
    padding-inline: 5px;
  }

  @media (max-width: 360px) {
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;

export const HudTitle = styled.h1`
  flex: 1 1 0;
  min-width: 0;
  margin: 0;
  font-family: Georgia, serif;
  font-size: clamp(0.8rem, 3.6vw, 1.45rem);
  line-height: 1.1;
  overflow-wrap: break-word;

  @media (max-width: 360px) {
    flex: 0 0 100%;
    text-align: center;
  }
`;

export const BonusBoostButton = styled.button`
  display: inline-grid;
  flex: 0 0 auto;
  place-items: center;
  min-height: 44px;
  padding: 0 6px;
  border: 1px solid #9be7a9;
  border-radius: ${({ theme }) => theme.radii.beltCenter};
  background: linear-gradient(180deg, #1d6d2d, #0d3d1b);
  color: #f5fff7;
  font: inherit;
  font-weight: 700;
  white-space: nowrap;
  cursor: pointer;

  &:disabled {
    opacity: 0.65;
    cursor: wait;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.text};
    outline-offset: 2px;
  }
`;

export const MenuButton = styled.button`
  display: inline-grid;
  flex: 0 0 auto;
  place-items: center;
  min-width: 44px;
  min-height: 44px;
  padding: 0;
  border: 1px solid ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.radii.beltCenter};
  background: ${({ theme }) => theme.colors.beltSlot};
  color: ${({ theme }) => theme.colors.text};
  font: inherit;
  font-size: 1.2rem;
  line-height: 1;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.text};
    outline-offset: 2px;
  }
`;

export const RewardAdStatus = styled.p`
  margin: 0;
  text-align: center;
  font-size: 0.8rem;
  line-height: 1.25;
  color: ${({ theme }) => theme.colors.text};

  &:empty {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
  }
`;
