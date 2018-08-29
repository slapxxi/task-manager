import { Color } from 'csstype';
import { isEmpty, kebabCase, map } from 'lodash';

function themeToCSSVariables(theme: ColorTheme) {
  if (isEmpty(theme)) {
    return ``;
  }
  return map(theme, toCSSVariable).join(' ');
}

function toCSSVariable(value: Color, key: string) {
  return `--${kebabCase(key)}: ${value};`;
}

export default themeToCSSVariables;
