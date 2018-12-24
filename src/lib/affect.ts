function affect<T>(target: T, fn: (target: T) => void): T {
  fn(target);
  return target;
}

export default affect;
