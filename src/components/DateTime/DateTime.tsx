import * as React from 'react';

interface Props {
  date: Date;
}

class DateTime extends React.Component<Props> {
  public render() {
    return <time>{this.props.date.toLocaleDateString('en')}</time>;
  }
}

export default DateTime;
