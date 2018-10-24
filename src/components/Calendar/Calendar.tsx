import '!style-loader!css-loader!react-day-picker/lib/style.css';
import * as React from 'react';
import DayPicker from 'react-day-picker';
import styles from './styles.css';

interface Props {
  selected?: Date;
  onSelectDate: (date: Date) => void;
}

class Calendar extends React.Component<Props> {
  public handleSelectDate = (date: Date) => {
    if (this.props.onSelectDate) {
      this.props.onSelectDate(date);
    }
  };

  public render() {
    return (
      <div className={styles.container}>
        <DayPicker
          selectedDays={this.props.selected}
          onDayClick={this.handleSelectDate}
          disabledDays={{ before: new Date() }}
        />
        ;
      </div>
    );
  }
}

export default Calendar;
