import { ColorTheme } from '@local/types';
import { Color } from 'csstype';
import isEmpty from 'lodash-es/isEmpty';
import kebabCase from 'lodash-es/kebabCase';
import map from 'lodash-es/map';

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
