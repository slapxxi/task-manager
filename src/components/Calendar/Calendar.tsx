import '!style-loader!css-loader!react-day-picker/lib/style.css';
import star from '@local/assets/star.svg';
import Button from '@local/components/Button/Button';
import Icon from '@local/components/Icon/Icon';
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
          <Icon glyph={star} size={20} className={styles.icon} /> Today
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
