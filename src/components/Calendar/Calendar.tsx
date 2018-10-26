import '!style-loader!css-loader!react-day-picker/lib/style.css';
import React from 'react';
import DayPicker from 'react-day-picker';
import styles from './styles.css';

interface Props {
  selected?: Date;
  onSelectDate: (date: Date) => void;
}

function Calendar({ selected, onSelectDate }: Props) {
  return (
    <div className={styles.container}>
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
