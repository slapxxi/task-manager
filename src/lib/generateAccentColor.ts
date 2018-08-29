import { Color } from 'csstype';
import { clamp } from 'lodash';
import { parseToHsl, toColorString } from 'polished';

function generateAccentColor(color: Color) {
  const { saturation, lightness, hue } = parseToHsl(color);
  if (lightness >= 0.9) {
    return toColorString({ saturation, hue, lightness: lightness - 0.1 });
  }
  if (saturation === 1) {
    return toColorString({ saturation, hue, lightness: lightness - 0.05 });
  }
  if (saturation <= 0.3) {
    return toColorString({ hue, saturation, lightness: lightness + 0.15 });
  }
  if (saturation <= 0.5) {
    return toColorString({ hue, saturation, lightness: lightness + 0.05 });
  }
  return toColorString({
    hue,
    saturation: clamp(saturation + 0.2, 1),
    lightness: lightness + 0.1,
  });
}

export default generateAccentColor;
