import advanceBelt from "../advanceBelt";
import completeDelivery from "../completeDelivery";
import recoverBelt from "../recoverBelt";
import returnPlatesToFeeders from "../returnPlatesToFeeders";

export const hammerCost = 100;

const loadingSlot = 15;

export default function gameReducer(state, action) {
  if (action.type === "restart") {
    return {
      ...action.initialState,
      coins: state.coins,
      score: 0,
    };
  }

  if (action.type === "recoverWithCoins") {
    return recoverBelt(state, loadingSlot);
  }

  if (action.type === "recoverAfterReward") {
    return recoverBelt(state, loadingSlot, { rewarded: true });
  }

  if (action.type === "grantRewardCoins") {
    return {
      ...state,
      coins: state.coins + Number(action.amount || 0),
    };
  }

  if (state.gameOver) {
    return state;
  }

  switch (action.type) {
    case "move":
      return advanceBelt(state, action.elapsedMs, action.now);

    case "deliveryArrived":
      return completeDelivery(state, action.deliveryId, action.now);

    case "load": {
      const { feederIndex } = action;
      const queue = state.feeders[feederIndex];

      if (!queue?.length || state.belt[loadingSlot] !== null) {
        return state;
      }

      const [firstSushi, ...remainingSushi] = queue;
      const belt = [...state.belt];
      const feeders = [...state.feeders];

      belt[loadingSlot] = firstSushi;
      feeders[feederIndex] = remainingSushi;

      return {
        ...state,
        belt,
        feeders,
        gameOver: belt.every((plate) => plate !== null),
      };
    }

    case "useHammer": {
      if (state.coins < hammerCost) {
        return state;
      }

      const updatedState = returnPlatesToFeeders(state, [action.slotIndex]);

      if (updatedState === state) {
        return state;
      }

      return { ...updatedState, coins: state.coins - hammerCost };
    }

    case "nextRound":
      if (action.initialState.round !== state.round + 1) {
        return state;
      }

      return {
        ...action.initialState,
        coins: state.coins,
        score: state.score,
      };

    default:
      return state;
  }
}
