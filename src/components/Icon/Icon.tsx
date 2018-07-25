import * as React from 'react';

interface Props {
  glyph: Glyph;
  size?: number;
}

function Icon({ glyph, size = 100 }: Props) {
  return (
    <svg width={size} height={size} viewBox={glyph.viewBox}>
      <use xlinkHref={`#${glyph.id}`} />
    </svg>
  );
}

export default Icon;
