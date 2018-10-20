import { Keys, Regex } from '@lib';
import { ID, Tag as ITag, UserCreatedTag } from '@local/types';
import { includes, isEmpty, last } from 'lodash';
import * as React from 'react';
import styles from './styles.css';
import Tag from './Tag';
import Tags from './Tags';

interface Props {
  tags: ITag[];
  className?: string;
  onAddTag?: (tag: UserCreatedTag) => void;
  onRemoveTags?: (tags: ITag[]) => void;
}

interface State {
  selectedTags: ID[];
}

class TagsEditor extends React.Component<Props, State> {
  public state = { selectedTags: [] };

  public handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { onAddTag } = this.props;
    if (onAddTag) {
      const value = e.target.value;
      if (this.isValidTagName(value)) {
        onAddTag({ name: this.normalizeTagName(value) });
        e.target.value = '';
      }
    }
  };

  public handleSelect = (isSelected: boolean, tag: ITag) => {
    if (isSelected) {
      this.setState({ selectedTags: [...this.state.selectedTags, tag.id] });
    } else {
      this.setState({
        selectedTags: this.state.selectedTags.filter(
          (selectedID) => selectedID !== tag.id,
        ),
      });
    }
  };

  public handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.keyCode || e.charCode;
    if (key === Keys.enter) {
      // TODO test for various space chars
      if (e.currentTarget.value.trim() !== '') {
        if (this.props.onAddTag) {
          this.props.onAddTag({ name: e.currentTarget.value });
          this.resetInput(e);
          return;
        }
      }
    }
    if (key === Keys.backspace) {
      return this.handleRemove(e);
    }
  };

  public handleRemove = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { onRemoveTags, tags } = this.props;
    if (onRemoveTags && !isEmpty(tags) && this.isInputEmpty(e)) {
      const selectedTags = this.state.selectedTags;
      this.setState({ selectedTags: [] }, () => {
        onRemoveTags(this.matchTagsToSelected(selectedTags));
      });
    }
  };

  public render() {
    const { tags, className } = this.props;
    return (
      <div className={className}>
        <Tags
          tags={tags}
          renderTag={({ tag }) => (
            <Tag
              tag={tag}
              selected={this.isTagSelected(tag)}
              onSelect={this.handleSelect}
            />
          )}
        />
        <input
          placeholder="Tag..."
          type="text"
          onChange={this.handleChange}
          onKeyDown={this.handleKeyPress}
          className={styles.input}
          data-testid="input"
        />
      </div>
    );
  }

  private matchTagsToSelected(selectedTags: ID[]): ITag[] {
    const { tags } = this.props;
    if (isEmpty(selectedTags)) {
      return [last(tags)!];
    }
    return tags.reduce(
      (matched: ITag[], current: ITag) =>
        includes(selectedTags, current.id) ? [...matched, current] : matched,
      [],
    );
  }

  private isTagSelected(tag: ITag) {
    return includes(this.state.selectedTags, tag.id);
  }

  private isInputEmpty(e: React.KeyboardEvent<HTMLInputElement>) {
    return e.currentTarget.value === '';
  }

  private resetInput(e: React.KeyboardEvent<HTMLInputElement>) {
    e.currentTarget.value = '';
  }

  private isValidTagName(name: string) {
    return name.match(Regex.tagName);
  }

  private normalizeTagName(name: string) {
    return name.trim().replace(',', '');
  }
}

export default TagsEditor;
