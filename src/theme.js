const theme = {
  breakpoints: {
    phoneMini: 0,
    phoneSmall: 360,
    phone: 390,
    phoneLarge: 430,
    tablet: 768,
    laptop: 1024,
    desktop: 1280,
    desktopLarge: 1920,
    tv4k: 3840,
  },
  colors: {
    background: "#082b30",
    text: "#fff4df",
    accent: "#e5a46f",
    beltSlot: "#233b43",
    beltCenter: "#123439",
    plate: "#fff4df",
  },
  fonts: {
    body: "system-ui, sans-serif",
  },
  spacing: {
    page: "1rem",
    pageWide: "1.5rem",
    gameGap: "1rem",
    beltGap: "2px",
  },
  sizes: {
    gameMaxWidth: "48rem",
    gameMaxWidthLarge: "64rem",
    gameMaxWidth4k: "80rem",
    beltMaxWidth: "32rem",
    beltBorder: "3px",
    plateSize: "76%",
    sushiIcon: "clamp(0.85rem, 4.2vw, 2rem)",
  },
  radii: {
    belt: "clamp(1rem, 5vw, 2rem)",
    beltCenter: "clamp(0.65rem, 3vw, 1.25rem)",
    plate: "50%",
  },
};

export default theme;
