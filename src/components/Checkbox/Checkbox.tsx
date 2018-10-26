import React from 'react';
import styles from './styles.css';

interface Props {
  value: boolean;
  size?: number;
  className?: string;
  onToggle?: (isChecked: boolean) => void;
}

function Checkbox({ value, size = 20, onToggle, className, ...rest }: Props) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (onToggle) {
      onToggle(e.currentTarget.checked);
    }
  }

  return (
    <div className={className}>
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          height: size,
        }}
      >
        <input
          className={styles.input}
          type="checkbox"
          checked={value}
          onChange={handleChange}
          {...rest}
        />
        <svg
          viewBox="0 0 100 100"
          width={size}
          height={size}
          preserveAspectRatio="none"
          clipRule="evenodd"
        >
          {value ? (
            <>
              <circle cx="50" cy="50" r="44" fill="#17f" stroke="#16f" strokeWidth="8" />
              <path
                d="M42.389 52.884L70.213 25.06l11.032 11.032L42.397 74.94l-.008-.008-.008.008-23.626-23.625 11.032-11.032 12.602 12.601z"
                fill="#fff"
              />
            </>
          ) : (
            <circle cx="50" cy="50" r="44" fill="none" stroke="#99a" strokeWidth="8" />
          )}
        </svg>
      </div>
    </div>
  );
}

export default React.memo(Checkbox);
