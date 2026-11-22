import returnPlatesToFeeders from "../returnPlatesToFeeders";

export const recoveryCost = 400;

const recoveryPlateCount = 3;

export default function recoverBelt(
  state,
  loadingSlot,
  { rewarded = false } = {},
) {
  const cost = rewarded ? 0 : recoveryCost;

  if (!state.gameOver || state.coins < cost) {
    return state;
  }

  const slotIndexes = Array.from(
    { length: state.belt.length },
    (_, offset) => (loadingSlot + offset) % state.belt.length,
  )
    .filter((slotIndex) => state.belt[slotIndex] !== null)
    .slice(0, recoveryPlateCount);

  if (slotIndexes.length !== recoveryPlateCount) {
    return state;
  }

  const updatedState = returnPlatesToFeeders(state, slotIndexes);

  if (updatedState === state) {
    return state;
  }

  return {
    ...updatedState,
    coins: state.coins - cost,
    gameOver: false,
  };
}
