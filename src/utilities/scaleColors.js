import chroma from "chroma-js";

function generateScaledPalette(palette) {
  let scaledPalette = palette.colors.map((color) =>
    scaleIndiviualColor(color.color, color.name)
  );

  return scaledPalette;
}

function scaleIndiviualColor(color, name) {
  const scalingFn = chroma.scale([
    chroma(color).darken(2),
    color,
    chroma(color).brighten(2),
  ]);

  const scaledColors = {
    id: name,
    colors: [],
  };

  for (let scale = 1; scale <= 15; scale++) {
    let scaledColor = scalingFn(scale / 15)._rgb;
    let hex = chroma(scaledColor).hex();
    let rgb = `rgb(${Math.floor(scaledColor[0])}, ${Math.floor(
      scaledColor[1]
    )}, ${Math.floor(scaledColor[2])})`;

    scaledColors.colors.push({ rgb: rgb, name: `${name} ${scale}`, hex: hex });
  }

  return scaledColors;
}

export { scaleIndiviualColor };
export default generateScaledPalette;
