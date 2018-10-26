import { Tag as ITag } from '@local/types';
import React from 'react';
import styles from './styles.css';

interface Props {
  tags: ITag[];
  renderTag: (params: { tag: ITag }) => React.ReactNode;
}

function Tags({ tags, renderTag }: Props) {
  return (
    <ul className={styles.tags} data-testid="tags">
      {tags.map((tag) => (
        <li className={styles.tag} key={tag.id}>
          {renderTag && renderTag({ tag })}
        </li>
      ))}
    </ul>
  );
}

export default React.memo(Tags);
