import * as React from 'react';

interface Props {
  glyph: Glyph;
  size?: number;
  className?: string;
}

function Icon({ className, glyph, size = 100 }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={glyph.viewBox}
      className={className}
    >
      <use xlinkHref={`#${glyph.id}`} />
    </svg>
  );
}

export default Icon;
