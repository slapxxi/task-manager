import { Keys, Regex } from '@lib';
import { ID, Tag as ITag, UserCreatedTag } from '@local/types';
import { includes, isEmpty, last, pull } from 'lodash';
import React, { useState } from 'react';
import styles from './styles.css';
import Tag from './Tag';
import Tags from './Tags';

interface Props {
  tags: ITag[];
  className?: string;
  onAddTag?: (tag: UserCreatedTag) => void;
  onRemoveTags?: (tags: ITag[]) => void;
}

function TagsEditor({ tags, onAddTag, onRemoveTags, className }: Props) {
  const [selectedTags, setSelectedTags] = useState<ID[]>([]);

  function handleSelect(isSelected: boolean, tag: ITag) {
    if (isSelected) {
      setSelectedTags([...selectedTags, tag.id]);
    } else {
      setSelectedTags(pull(selectedTags, tag.id));
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (onAddTag) {
      const tagName = e.target.value;
      if (isValidTagName(tagName)) {
        onAddTag({ name: normalizeTagName(tagName) });
        e.target.value = '';
      }
    }
  }

  function handleRemove(e: React.KeyboardEvent<HTMLInputElement>) {
    if (onRemoveTags && !isEmpty(tags) && isInputEmpty(e)) {
      onRemoveTags(matchTagsToSelected(selectedTags, tags));
      setSelectedTags([]);
    }
  }

  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    const key = e.keyCode || e.charCode;
    if (key === Keys.enter) {
      if (e.currentTarget.value.trim() !== '') {
        if (onAddTag) {
          onAddTag({ name: e.currentTarget.value });
          resetInput(e);
          return;
        }
      }
    }
    if (key === Keys.backspace) {
      handleRemove(e);
      return;
    }
  }

  return (
    <div className={className}>
      <Tags
        tags={tags}
        renderTag={({ tag }) => (
          <Tag
            tag={tag}
            selected={isTagSelected(tag, selectedTags)}
            onSelect={handleSelect}
          />
        )}
      />
      <input
        placeholder="Tag..."
        type="text"
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        className={styles.input}
        data-testid="input"
      />
    </div>
  );
}

function normalizeTagName(name: string) {
  return name.trim().replace(',', '');
}

function isValidTagName(name: string) {
  return name.match(Regex.tagName);
}

function isTagSelected(tag: ITag, selectedTags: ID[]) {
  return includes(selectedTags, tag.id);
}

function matchTagsToSelected(selectedTags: ID[], tags: ITag[]) {
  if (isEmpty(selectedTags)) {
    return [last(tags)!];
  }
  return tags.reduce(
    (matched: ITag[], current: ITag) =>
      includes(selectedTags, current.id) ? [...matched, current] : matched,
    [],
  );
}

function resetInput(e: React.KeyboardEvent<HTMLInputElement>) {
  e.currentTarget.value = '';
}

function isInputEmpty(e: React.KeyboardEvent<HTMLInputElement>) {
  return e.currentTarget.value === '';
}

export default React.memo(TagsEditor);
