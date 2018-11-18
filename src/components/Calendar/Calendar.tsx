import '!style-loader!css-loader!react-day-picker/lib/style.css';
import Button from '@local/components/Button/Button';
import IconSystem from '@local/components/IconSystem/IconSystem';
import React from 'react';
import DayPicker from 'react-day-picker';
import styles from './styles.css';

interface Props {
  selected?: Date;
  onSelectDate: (date: Date) => void;
}

function Calendar({ selected, onSelectDate }: Props) {
  function handleSelectToday() {
    onSelectDate(new Date());
  }

  return (
    <div className={styles.container}>
      <header>
        <Button onClick={handleSelectToday}>
          <IconSystem name="star" size={20} className={styles.icon} /> Today
        </Button>
      </header>
      <DayPicker
        selectedDays={selected}
        onDayClick={(date) => onSelectDate(date)}
        disabledDays={{ before: new Date() }}
      />
      ;
    </div>
  );
}

export default React.memo(Calendar);
