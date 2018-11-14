import { Size } from '@local/types';
import React from 'react';

interface Props {
  date: Date;
  size: Size;
  className?: string;
}

function CalendarIcon({ date, size, className }: Props) {
  const day = date.getDate();
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
      <g
        strokeLinecap="round"
        fill="none"
        stroke="#000"
        strokeWidth="8"
        style={{
          fill: 'var(--primary-color, #000)',
          stroke: 'var(--primary-color, #000)',
        }}
      >
        <path
          d="M95.014,17.005c0,-2.762 -2.238,-5 -5,-5c-15.758,0 -64.27,0 -80.028,0c-2.762,0 -5,2.238 -5,5c0,14.79 0,58.218 0,73.009c0,2.762 2.238,5 5,5c15.758,0 64.27,0 80.028,0c2.762,0 5,-2.238 5,-5c0,-14.791 0,-58.219 0,-73.009Z"
          fill="none"
        />
        <path d="M4.986,29.381l90.028,0" strokeWidth="6" fill="none" />
        <text
          stroke="none"
          fontFamily="Arial"
          fontSize="60"
          fontWeight="500"
          {...getTextProps(day)}
        >
          {day}
        </text>
        <path d="M27.203,4.483l0,15.043" fill="none" />
        <path d="M72.797,4.483l0,15.043" fill="none" />
      </g>
    </svg>
  );
}

function getTextProps(day: number) {
  const y = 83;
  if (day === 31) {
    return { x: 19, y };
  }
  if (day <= 9) {
    return { x: 33, y };
  }
  if (day >= 20) {
    return { x: 17, y };
  }
  return { x: 16, y };
}

export default CalendarIcon;
