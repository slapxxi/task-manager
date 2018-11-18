import { describeArc } from '@lib';
import { useAnimatedValue } from '@local/hooks';
import React, { useEffect } from 'react';
import styles from './styles.css';

interface Props {
  progress: number;
  value?: boolean;
  size?: number;
  className?: string;
  onToggle?: (isChecked: boolean) => void;
}

function ProgressCheckbox({
  value,
  progress,
  onToggle,
  className,
  size = 20,
  ...rest
}: Props) {
  const [animatedProgress, setAnimatedProgress] = useAnimatedValue(progress);

  useEffect(
    () => {
      if (progress !== animatedProgress) {
        setAnimatedProgress(progress);
      }
    },
    [progress],
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (onToggle) {
      onToggle(e.currentTarget.checked);
    }
  }

  return (
    <div className={className}>
      <div className={styles.container} style={{ height: size }}>
        <input
          className={styles.input}
          type="checkbox"
          checked={value}
          onChange={handleChange}
          {...rest}
        />
        <svg viewBox="0 0 100 100" width={size} height={size}>
          {animatedProgress === 1 ? (
            <>
              <circle cx="50" cy="50" r="44" fill="#17f" stroke="#16f" strokeWidth="8" />
              <path
                d="M42.389 52.884L70.213 25.06l11.032 11.032L42.397 74.94l-.008-.008-.008.008-23.626-23.625 11.032-11.032 12.602 12.601z"
                fill="#fff"
              />
            </>
          ) : (
            <>
              <circle cx="50" cy="50" r="44" fill="none" stroke="#99a" strokeWidth="8" />
              <path
                d={describeArc({
                  x: 50,
                  y: 50,
                  radius: 33,
                  startAngle: 0,
                  endAngle: 360 * animatedProgress,
                })}
                stroke="none"
                fill="#aab"
                strokeWidth="6"
              />
              />
            </>
          )}
        </svg>
      </div>
    </div>
  );
}

export default React.memo(ProgressCheckbox);
