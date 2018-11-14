import { ID, Tag as ITag } from '@local/types';
import React from 'react';
import styles from './styles.css';

interface Props {
  tag: ITag;
  parentId?: string;
  selected?: boolean;
  onSelect?: (isSelected: boolean, tag: ITag) => void;
}

function Tag({ tag, parentId, selected, onSelect }: Props) {
  const uniqueId = generateId(parentId || '', tag.id);

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
        id={uniqueId}
        onChange={handleSelect}
        checked={selected}
        data-testid="checkbox"
      />
      <label htmlFor={uniqueId} className={styles.label}>
        {tag.name}
      </label>
    </>
  );
}

function generateId(parentId: ID, id: ID) {
  return `${parentId}-${id}`;
}

export default React.memo(Tag);
