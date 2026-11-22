export const coinsPerCustomer = 10;

const deliveryTravelMs = 240;

export default function advanceBelt(state, elapsedMs, now) {
  const slotCount = state.belt.length;
  const belt = [state.belt[slotCount - 1], ...state.belt.slice(0, -1)];
  const beltStep = state.beltStep + 1;
  const waitingOrders = [...state.waitingOrders];
  const availablePortraits = [...state.availablePortraits];
  const deliveries = [...(state.deliveries ?? [])];

  const orders = state.orders.map((order) => {
    const { slot, type, quantity, departing, departAt, incoming = 0 } = order;

    if (departing) {
      if (now < departAt) {
        return order;
      }

      availablePortraits.push(order.portraitIndex);
      const nextOrder = waitingOrders.shift();

      if (!nextOrder) {
        return { ...order, departing: false };
      }

      return {
        ...nextOrder,
        slot,
        portraitIndex: availablePortraits.shift(),
      };
    }

    if (quantity <= incoming || belt[slot] !== type) {
      return order;
    }

    belt[slot] = null;

    deliveries.push({
      id: `${state.round}-${beltStep}-${slot}`,
      type,
      fromSlot: (slot - 1 + slotCount) % slotCount,
      cornerSlot: slot,
      moveMs: elapsedMs,
      travelMs: deliveryTravelMs,
    });

    return { ...order, incoming: incoming + 1 };
  });

  return {
    ...state,
    belt,
    beltStep,
    orders,
    waitingOrders,
    availablePortraits,
    deliveries,
  };
}
