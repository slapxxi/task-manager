import { DateTime } from '@local/components';
import IconSystem from '@local/components/IconSystem/IconSystem';
import { differenceInCalendarDays, differenceInCalendarMonths, isToday } from 'date-fns';
import React from 'react';
import styles from './styles.css';

interface Props {
  deadline: Date;
  onChange?: (deadline: Date) => void;
  onReset?: (deadline: Date) => void;
}

function Deadline({ deadline, onChange, onReset }: Props) {
  function handleReset(e: React.MouseEvent) {
    e.stopPropagation();
    if (onReset) {
      onReset(deadline);
    }
  }

  function handleChange() {
    if (onChange) {
      onChange(deadline);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.deadline} onClick={handleChange}>
        {isToday(deadline) ? (
          <div className={styles.today}>
            <IconSystem name="star" size={16} />
            Today
          </div>
        ) : (
          <>
            Deadline: <DateTime date={deadline} />
            <button className={styles.reset} onClick={handleReset}>
              <IconSystem name="cross" size={13} />
            </button>
          </>
        )}
      </div>
      {renderDaysLeft(deadline)}
    </div>
  );
}

function renderDaysLeft(deadline: Date): React.ReactNode {
  const currentDate = new Date();
  const daysLeft = differenceInCalendarDays(deadline, currentDate);

  if (daysLeft <= 0) {
    return null;
  }

  if (daysLeft > 31) {
    const monthsLeft = differenceInCalendarMonths(deadline, currentDate);
    return (
      <div className={styles.daysLeft}>
        {monthsLeft} {pluralize(monthsLeft, 'month')} left
      </div>
    );
  }

  return (
    <div className={styles.daysLeft}>
      {daysLeft} {pluralize(daysLeft, 'day')} left
    </div>
  );
}

function pluralize(n: number, word: string): string {
  if (n === 1) {
    return `${word}`;
  }
  return `${word}s`;
}

export default React.memo(Deadline);
