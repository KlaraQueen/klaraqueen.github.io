import { coinsPerCustomer } from "../advanceBelt";

const departureDelayMs = 2000;

export default function completeDelivery(state, deliveryId, now) {
  const delivery = state.deliveries?.find(({ id }) => id === deliveryId);

  if (!delivery) {
    return state;
  }

  const customer = state.orders.find(
    ({ slot }) => slot === delivery.cornerSlot,
  );
  const quantity = customer.quantity - 1;
  const orderComplete = quantity === 0;
  const reward = orderComplete ? coinsPerCustomer : 0;

  const orders = state.orders.map((order) =>
    order === customer
      ? {
          ...order,
          quantity,
          incoming: order.incoming - 1,
          departing: orderComplete,
          departAt: orderComplete ? now + departureDelayMs : null,
        }
      : order,
  );

  return {
    ...state,
    orders,
    deliveries: state.deliveries.filter(({ id }) => id !== deliveryId),
    coins: state.coins + reward,
    score: (state.score ?? 0) + reward,
  };
}
