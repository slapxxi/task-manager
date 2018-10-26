import { tween } from 'popmotion';
import { useEffect, useState } from 'react';

function useAnimatedValue<T>(initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState(initialValue);
  const [animatedValue, setAnimatedValue] = useState(storedValue);
  useEffect(
    () => {
      const animation = tween({
        from: animatedValue as any,
        to: storedValue as any,
      });
      const activeAnimation = animation.start((v: T) => setAnimatedValue(v));
      return () => activeAnimation.stop!();
    },
    [storedValue],
  );
  return [animatedValue, setStoredValue];
}

export default useAnimatedValue;
