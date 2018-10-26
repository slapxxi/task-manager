import { polarToCartesian } from '@lib';

interface Params {
  x: number;
  y: number;
  radius: number;
  startAngle: number;
  endAngle: number;
}

function describeArc({ x, y, radius, startAngle, endAngle }: Params) {
  const start = polarToCartesian({ x, y, radius, angle: endAngle });
  const end = polarToCartesian({ x, y, radius, angle: startAngle });
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${
    end.y
  } L 50 50 L ${start.x} ${start.y} Z`;
}

export default describeArc;
