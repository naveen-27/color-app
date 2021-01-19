import chroma from "chroma-js";

function getContrastColor(bg) {
  const textLuminance = chroma("#edf1f2").luminance();
  const bgLuminance = chroma(bg).luminance();
  const contrast = textLuminance / bgLuminance;

  if (contrast < 4) {
    return chroma("#edf1f2").darken(5).hex();
  } else {
    return "#edf1f2";
  }
}

export default getContrastColor;
