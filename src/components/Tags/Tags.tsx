import * as React from 'react';
import styles from './styles.css';

interface Props {
  tags: Tag[];
  onAddTag?: (name: string) => void;
  [prop: string]: any;
}

class Tags extends React.Component<Props, {}> {
  public handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (this.props.onAddTag) {
      const value = e.target.value;
      if (value.match(/[a-zA-Z]+[ ,]$/)) {
        this.props.onAddTag(value.replace(',', '').trim());
        e.target.value = '';
      }
    }
  };

  public render() {
    const { tags, onAddTag, ...rest } = this.props;
    return (
      <ul className={styles.tags} {...rest}>
        {onAddTag && (
          <input
            type="text"
            onChange={this.handleChange}
            className={styles.input}
          />
        )}
        {tags.map((t) => (
          <li className={styles.tag} key={t.id}>
            <input type="checkbox" className={styles.checkbox} id={t.id} />
            <label htmlFor={t.id} className={styles.label}>
              {t.name}
            </label>
          </li>
        ))}
      </ul>
    );
  }
}

export default Tags;
