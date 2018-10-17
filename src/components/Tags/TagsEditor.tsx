import { Keys } from '@lib';
import { Tag as ITag, UserCreatedTag } from '@local/types';
import { includes, last } from 'lodash';
import * as React from 'react';
import styles from './styles.css';
import Tag from './Tag';
import Tags from './Tags';

interface Props {
  tags: ITag[];
  onAddTag?: (tag: UserCreatedTag) => void;
  onRemoveTag?: (tag: ITag) => void;
  onRemoveTags?: (tags: ITag[]) => void;
  className?: string;
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
    if (this.isInputEmpty(e) && this.props.tags.length > 0) {
      if (this.state.selectedTags.length > 1) {
        if (this.props.onRemoveTags) {
          const selectedTags = this.state.selectedTags;
          return this.setState({ selectedTags: [] }, () => {
            if (this.props.onRemoveTags) {
              return this.props.onRemoveTags(
                this.props.tags.filter((t) => includes(selectedTags, t.id)),
              );
            }
          });
        }
      }
    }
    if (this.props.onRemoveTag) {
      if (this.state.selectedTags.length === 1) {
        const selectedTag = this.state.selectedTags[0];
        return this.setState({ selectedTags: [] }, () =>
          this.props.onRemoveTag!(
            this.props.tags.filter((t) => t.id === selectedTag)[0],
          ),
        );
      }
      return this.props.onRemoveTag(last(this.props.tags)!);
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
    return name.match(/[a-zA-Z]+[ ,]$/g);
  }

  private normalizeTagName(name: string) {
    return name.trim().replace(',', '');
  }
}

export default TagsEditor;
