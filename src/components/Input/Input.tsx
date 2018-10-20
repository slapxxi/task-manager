import * as React from 'react';
import styles from './styles.css';

interface Props {
  value: string;
  forwardedRef?: React.Ref<any>;
  [prop: string]: any;
}

class Input extends React.Component<Props> {
  public render() {
    const { forwardedRef, ...rest } = this.props;
    return <input className={styles.input} ref={forwardedRef} {...rest} />;
  }
}

export default React.forwardRef((props: Props, ref) => (
  <Input {...props} forwardedRef={ref} />
));
