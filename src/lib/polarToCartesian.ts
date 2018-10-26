interface Params {
  x: number;
  y: number;
  radius: number;
  angle: number;
}

function polarToCartesian({ x, y, radius, angle }: Params) {
  const angleInRadians = ((angle - 90) * Math.PI) / 180.0;
  return {
    x: x + radius * Math.cos(angleInRadians),
    y: y + radius * Math.sin(angleInRadians),
  };
}

export default polarToCartesian;
