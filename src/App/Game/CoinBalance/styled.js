import styled from "styled-components";

export const Balance = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 4px;
  min-width: 0;
  width: 100%;
  font-variant-numeric: tabular-nums;
`;

export const Stat = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  justify-items: center;
  align-content: center;
  gap: 1px;
  min-width: 0;
  padding: 3px 4px;
  border: 1px solid
    ${({ $record }) =>
      $record ? "rgb(224 175 87 / 46%)" : "rgb(255 218 161 / 15%)"};
  border-radius: 6px;
  background: ${({ $record }) =>
    $record
      ? "linear-gradient(180deg, #44301c, #302116)"
      : "rgb(255 240 213 / 5%)"};
  color: ${({ $record }) => ($record ? "#ffdc91" : "#fff3e2")};
  text-align: center;
`;

export const StatLabel = styled.span`
  font-size: 0.65rem;
  line-height: 1.15;
  white-space: nowrap;
  opacity: 0.85;
`;

export const StatValue = styled.span`
  display: block;
  min-width: 0;
  max-width: 100%;
  overflow: hidden;
  font-size: clamp(0.8rem, 3.3vw, 1rem);
  font-weight: 700;
  line-height: 1.1;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const CurrentCoins = styled(StatValue)`
  color: #f4c396;
`;
