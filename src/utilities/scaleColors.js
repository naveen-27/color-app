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

  const scaledColors = [];

  for (let scale = 1; scale <= 20; scale++) {
    let scaledColor = scalingFn(scale / 20)._rgb;
    let rgb = `rgb(${Math.floor(scaledColor[0])}, ${Math.floor(
      scaledColor[1]
    )}, ${Math.floor(scaledColor[2])})`;

    scaledColors.push({ color: rgb, name: `${name} ${scale}` });
  }

  return scaledColors;
}

export default generateScaledPalette;
