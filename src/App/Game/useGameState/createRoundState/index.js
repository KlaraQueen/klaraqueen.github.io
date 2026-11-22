import { customerImages } from "../../Customer/Images";
import { createLevel } from "../../Level";

const firstDifficultyLevel = 6;

export default function createRoundState(round, coins = 0, score = 0) {
  const difficultyLevel = firstDifficultyLevel + round - 1;
  const { orders, waitingOrders, feeders } = createLevel(difficultyLevel);
  const availablePortraits = customerImages.map((_, index) => index);

  for (let index = availablePortraits.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));

    [availablePortraits[index], availablePortraits[randomIndex]] = [
      availablePortraits[randomIndex],
      availablePortraits[index],
    ];
  }

  const startingOrders = orders.map((order) => ({
    ...order,
    portraitIndex: availablePortraits.shift(),
  }));

  return {
    round,
    coins,
    score,
    belt: Array(24).fill(null),
    beltStep: 0,
    feeders,
    orders: startingOrders,
    waitingOrders,
    availablePortraits,
    totalCustomers: orders.length + waitingOrders.length,
  };
}
