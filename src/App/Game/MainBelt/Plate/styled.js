import styled from "styled-components";

export const PlateBody = styled.span`
  display: grid;
  place-items: center;
  place-self: center;
  width: ${({ theme }) => theme.sizes.plateSize};
  aspect-ratio: 1;
  border-radius: ${({ theme }) => theme.radii.plate};
  background-color: ${({ theme }) => theme.colors.plate};
  font-size: ${({ theme }) => theme.sizes.sushiIcon};
  line-height: 1;
`;
export const PlateImage = styled.img`
  display: block;
  width: ${({ theme }) => theme.sizes.plateSize};
  height: auto;
`;
