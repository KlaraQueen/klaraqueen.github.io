const sushiTypes = [
  "salmon",
  "tuna",
  "cucumber",
  "shrimp",
  "tamago",
  "avocado",
];

const cornerSlots = [0, 6, 12, 18];
const feederCount = 4;
const firstLevelCustomerCount = 6;

const levelSettings = {
  1: {
    startingQuantities: [4, 4, 5, 5],
    waitingQuantities: [4, 4],
  },
  2: {
    startingQuantities: [4, 5, 5, 6],
    waitingQuantities: [4, 4, 5],
  },
  3: {
    startingQuantities: [5, 5, 6, 6],
    waitingQuantities: [4, 5, 5, 6],
  },
};

function shuffle(items) {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));

    [shuffled[index], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[index],
    ];
  }

  return shuffled;
}

function buildNonRepeatingSequence(items) {
  const remaining = [...items];
  const sequence = [];

  while (remaining.length > 0) {
    const lastType = sequence[sequence.length - 1];
    const candidates = remaining.filter((type) => type !== lastType);
    const nextType =
      candidates.length > 0
        ? candidates[Math.floor(Math.random() * candidates.length)]
        : remaining[Math.floor(Math.random() * remaining.length)];
    const nextIndex = remaining.indexOf(nextType);

    sequence.push(nextType);
    remaining.splice(nextIndex, 1);
  }

  return sequence;
}

function sushiForOrders(orders) {
  return orders.flatMap(({ type, quantity }) => Array(quantity).fill(type));
}

export function hasLevel(round) {
  return Number.isSafeInteger(round) && round >= 1;
}

export function createLevel(round) {
  const totalCustomers = firstLevelCustomerCount + round - 1;
  const waitingCount = totalCustomers - cornerSlots.length;
  const settings = levelSettings[round];

  const startingQuantities = settings?.startingQuantities ?? [5, 6, 6, 7];
  const waitingQuantities =
    settings?.waitingQuantities ??
    Array.from({ length: waitingCount }, (_, index) => 4 + (index % 3));

  const unlockedCount = round === 1 ? 3 : round === 2 ? 4 : sushiTypes.length;
  const unlockedTypes = sushiTypes.slice(0, unlockedCount);
  const shuffledTypes = shuffle(unlockedTypes);

  // Na Level 1 jeden rodzaj powtarza się w czwartym zamówieniu.
  const startingTypes = shuffle(
    [...shuffledTypes, shuffledTypes[0]].slice(0, cornerSlots.length),
  );

  const orders = cornerSlots.map((slot, index) => ({
    slot,
    type: startingTypes[index],
    quantity: startingQuantities[index],
  }));

  const unusedTypes = unlockedTypes.filter(
    (type) => !startingTypes.includes(type),
  );

  // Na wyższych poziomach grupy oczekujących wprowadzają rodzaje,
  // których nie było w pierwszych czterech zamówieniach.
  const waitingTypes = unusedTypes.length
    ? shuffle(unusedTypes)
    : [startingTypes[0]];

  const waitingOrders = shuffle(waitingQuantities).map((quantity, index) => {
    const typeIndex = Math.floor(
      (index * waitingTypes.length) / waitingQuantities.length,
    );

    return { type: waitingTypes[typeIndex], quantity };
  });

  const requiredSushi = buildNonRepeatingSequence([
    ...shuffle(sushiForOrders(orders)),
    ...sushiForOrders(waitingOrders),
  ]);

  const feeders = Array.from({ length: feederCount }, () => []);

  requiredSushi.forEach((type, index) => {
    const feederIndex = index % feederCount;
    const lastType = feeders[feederIndex][feeders[feederIndex].length - 1];

    if (lastType === type) {
      const alternateFeederIndex = (feederIndex + 1) % feederCount;
      feeders[alternateFeederIndex].push(type);
      return;
    }

    feeders[feederIndex].push(type);
  });

  return { orders, waitingOrders, feeders };
}
