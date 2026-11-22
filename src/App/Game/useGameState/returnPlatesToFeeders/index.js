export default function returnPlatesToFeeders(state, slotIndexes) {
  const uniqueSlots = [...new Set(slotIndexes)];

  if (
    uniqueSlots.length === 0 ||
    uniqueSlots.length !== slotIndexes.length ||
    uniqueSlots.length > state.feeders.length ||
    uniqueSlots.some((index) => !state.belt[index])
  ) {
    return state;
  }

  const feederIndexes = state.feeders
    .map((_, index) => index)
    .sort((first, second) => {
      return (
        state.feeders[first].length - state.feeders[second].length ||
        first - second
      );
    });

  const belt = [...state.belt];
  const feeders = [...state.feeders];

  uniqueSlots.forEach((slotIndex, index) => {
    const feederIndex = feederIndexes[index];

    feeders[feederIndex] = [...feeders[feederIndex], belt[slotIndex]];
    belt[slotIndex] = null;
  });

  return { ...state, belt, feeders };
}
