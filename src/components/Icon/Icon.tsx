import * as React from 'react';

interface Props {
  glyph: Glyph;
  size?: number;
  [prop: string]: any;
}

function Icon({ glyph, size = 100, ...rest }: Props) {
  return (
    <svg width={size} height={size} viewBox={glyph.viewBox} {...rest}>
      <use xlinkHref={`#${glyph.id}`} />
    </svg>
  );
}

export default Icon;
