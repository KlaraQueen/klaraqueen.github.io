import { createElement, useEffect, useState } from "react";
import CoinFlight from "./CoinFlight";
import { customerImages } from "./Images";
import Order from "./Order";
import { CustomerImage, CustomerStand } from "./styled";

function CustomerAtTable({ slot, imageSrc, type, quantity, departing }) {
  const [imageReady, setImageReady] = useState(false);
  const standProps = { "data-customer-slot": slot };

  useEffect(() => {
    const image = new Image();

    image.onload = () => setImageReady(true);
    image.src = imageSrc;

    return () => {
      image.onload = null;
    };
  }, [imageSrc]);

  if (!imageReady) {
    return createElement(CustomerStand, standProps);
  }

  return createElement(
    CustomerStand,
    standProps,
    departing
      ? createElement(CoinFlight)
      : createElement(Order, { type, quantity }),
    createElement(CustomerImage, {
      src: imageSrc,
      alt: "",
      "data-customer-image": true,
    }),
  );
}

export default function Customer({
  slot,
  portraitIndex,
  type,
  quantity,
  departing,
}) {
  if (quantity === 0 && !departing) {
    return createElement(CustomerStand, { "data-customer-slot": slot });
  }

  return createElement(CustomerAtTable, {
    key: portraitIndex,
    slot,
    imageSrc: customerImages[portraitIndex],
    type,
    quantity,
    departing,
  });
}
