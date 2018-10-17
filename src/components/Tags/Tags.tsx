import { Tag as ITag } from '@local/types';
import * as React from 'react';
import styles from './styles.css';

interface RenderParams {
  tag: ITag;
}

interface Props {
  tags: ITag[];
  renderTag: (params: RenderParams) => React.ReactNode;
}

class Tags extends React.Component<Props, {}> {
  public render() {
    const { tags, renderTag } = this.props;
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
}

export default Tags;
