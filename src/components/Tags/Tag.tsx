import { Tag as ITag } from '@local/types';
import React from 'react';
import styles from './styles.css';

interface Props {
  tag: ITag;
  selected?: boolean;
  onSelect?: (isSelected: boolean, tag: ITag) => void;
}

function Tag({ tag, selected, onSelect }: Props) {
  function handleSelect(e: React.ChangeEvent<HTMLInputElement>) {
    if (onSelect) {
      onSelect(e.currentTarget.checked ? true : false, tag);
    }
  }

  return (
    <>
      <input
        type="checkbox"
        className={styles.checkbox}
        id={tag.id}
        onChange={handleSelect}
        checked={selected}
        data-testid="checkbox"
      />
      <label htmlFor={tag.id} className={styles.label}>
        {tag.name}
      </label>
    </>
  );
}

export default React.memo(Tag);
