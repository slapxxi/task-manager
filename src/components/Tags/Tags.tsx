import { last } from 'lodash';
import * as React from 'react';
import Keys from '../../lib/keys';
import styles from './styles.css';

interface Props {
  tags: Tag[];
  onAddTag?: (name: string) => void;
  onRemoveTag?: (tag: Tag) => void;
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

  public handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.keyCode || e.charCode;
    if (key === Keys.enter) {
      if (e.currentTarget.value.trim() !== '') {
        if (this.props.onAddTag) {
          this.props.onAddTag(e.currentTarget.value);
          e.currentTarget.value = '';
          return;
        }
      }
    }
    if (key === Keys.backspace) {
      if (e.currentTarget.value === '' && this.props.onRemoveTag) {
        if (this.props.tags.length > 0) {
          return this.props.onRemoveTag(last(this.props.tags) as Tag);
        }
      }
    }
  };

  public render() {
    const { tags, onAddTag, onRemoveTag, ...rest } = this.props;
    return (
      <ul className={styles.tags} data-testid="tags" {...rest}>
        {tags.map((t) => (
          <li className={styles.tag} key={t.id}>
            <input type="checkbox" className={styles.checkbox} id={t.id} />
            <label htmlFor={t.id} className={styles.label}>
              {t.name}
            </label>
          </li>
        ))}
        {onAddTag && (
          <input
            placeholder="Tag..."
            type="text"
            onChange={this.handleChange}
            onKeyDown={this.handleKeyPress}
            className={styles.input}
            data-testid="input"
          />
        )}
      </ul>
    );
  }
}

export default Tags;
