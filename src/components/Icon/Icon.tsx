import { themeToCSSVariables } from '@lib';
import { ColorTheme, Size } from '@local/types';
import * as React from 'react';

interface Props {
  glyph: Glyph;
  theme?: ColorTheme;
  size?: Size;
  [prop: string]: any;
}

function Icon({ glyph, size, theme, ...rest }: Props) {
  let dimensions = {};
  if (size) {
    size = determineSize(size);
    dimensions = { width: size, height: size };
  }
  return (
    <svg {...dimensions} viewBox={glyph.viewBox} {...rest}>
      {theme && (
        <defs>
          <style
            dangerouslySetInnerHTML={{
              __html: `#icon-${glyph.id} {${themeToCSSVariables(theme)}}`,
            }}
          />
        </defs>
      )}
      <use xlinkHref={`#${glyph.id}`} id={'icon-' + glyph.id} />
    </svg>
  );
}

function determineSize(size: Size) {
  if (typeof size === 'number') {
    return size;
  }
  switch (size) {
    case 'xsmall':
      return 36;
    case 'small':
      return 48;
    case 'medium':
      return 64;
    case 'large':
      return 96;
    case 'xlarge':
      return 192;
    default:
      return 48;
  }
}

export default Icon;
