import { createElement } from "react";
import salmonNigiri from "./images/salmon-nigiri.png";
import tunaNigiri from "./images/tunczyk.png";
import cucumberMaki from "./images/maki.png";
import shrimpNigiri from "./images/krewetki.png";
import tamagoNigiri from "./images/tamago.png";
import avocadoUramaki from "./images/awokado.png";
import { PlateImage } from "./styled";

const sushiImages = {
  salmon: { src: salmonNigiri, alt: "Salmon nigiri" },
  tuna: { src: tunaNigiri, alt: "Tuna nigiri" },
  cucumber: { src: cucumberMaki, alt: "Cucumber maki" },
  shrimp: { src: shrimpNigiri, alt: "Shrimp nigiri" },
  tamago: { src: tamagoNigiri, alt: "Tamago nigiri" },
  avocado: { src: avocadoUramaki, alt: "Avocado uramaki" },
};

export default function Plate({ type = "salmon" }) {
  return createElement(PlateImage, sushiImages[type]);
}
