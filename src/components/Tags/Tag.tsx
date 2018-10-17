import { Tag as ITag } from '@local/types';
import * as React from 'react';
import styles from './styles.css';

interface Props {
  tag: ITag;
  selected?: boolean;
  onSelect?: (isSelected: boolean, tag: ITag) => void;
}

class Tag extends React.PureComponent<Props, {}> {
  public handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (this.props.onSelect) {
      this.props.onSelect(
        e.currentTarget.checked ? true : false,
        this.props.tag,
      );
    }
  };

  public render() {
    const { tag, selected } = this.props;
    return (
      <>
        <input
          type="checkbox"
          className={styles.checkbox}
          id={tag.id}
          onChange={this.handleSelect}
          checked={selected}
          data-testid="checkbox"
        />
        <label htmlFor={tag.id} className={styles.label}>
          {tag.name}
        </label>
      </>
    );
  }
}

export default Tag;
