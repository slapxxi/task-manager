import { createTag, matchTasksByTags } from '@lib';
import { TasksEditor } from '@local/components';
import IconSystem from '@local/components/IconSystem/IconSystem';
import Tag from '@local/components/Tags/Tag';
import Tags from '@local/components/Tags/Tags';
import { useStore } from '@local/hooks';
import { Tag as ITag } from '@local/types';
import { isToday } from 'date-fns';
import flatten from 'lodash-es/flatten';
import includes from 'lodash-es/includes';
import sortBy from 'lodash-es/sortBy';
import uniqBy from 'lodash-es/uniqBy';
import React, { useState } from 'react';
import PageTitle from './PageTitle';
import styles from './styles.css';

function TodayPage() {
  const { tasks, actions } = useStore();
  const [selectedTags, setSelectedTags] = useState<ITag[]>([]);
  const todayTasks = tasks.filter((t) => t.deadline && isToday(t.deadline));
  const todayTags = sortBy(
    uniqBy(flatten(todayTasks.map((t) => t.tags)), 'id') as ITag[],
    'name',
  );
  const matchingTasks = matchTasksByTags(todayTasks, selectedTags);

  function handleSelectTag(isSelected: boolean, tag: ITag) {
    if (isSelected) {
      if (tag.id === 'all') {
        selectAllTags();
        return;
      }
      selectTag(tag);
      return;
    } else {
      if (tag.id === 'all') {
        deselectAllTags();
        return;
      }
      deselectTag(tag);
    }
  }

  function selectAllTags() {
    setSelectedTags(todayTags);
  }

  function selectTag(tag: ITag) {
    setSelectedTags([...selectedTags, tag]);
  }

  function deselectAllTags() {
    setSelectedTags([]);
  }

  function deselectTag(tag: ITag) {
    setSelectedTags(selectedTags.filter((t) => t.id !== tag.id));
  }

  return (
    <div className={styles.todayPage}>
      <header className={styles.header}>
        <IconSystem name="star" size={25} />
        <PageTitle className={styles.title}>Today</PageTitle>
        <IconSystem name="dots" size={20} className={styles.menu} />
      </header>
      <div className={styles.tags}>
        <Tags
          tags={[createTag({ id: 'all', name: 'All' }), ...todayTags]}
          renderTag={({ tag }) => (
            <Tag
              tag={tag}
              parentId="today-page"
              onSelect={handleSelectTag}
              selected={
                tag.id === 'all'
                  ? selectedTags.length === todayTags.length
                  : includes(selectedTags.map((t) => t.id), tag.id)
              }
            />
          )}
        />
      </div>
      <TasksEditor
        tasks={matchingTasks}
        onEdit={actions.updateTask}
        onDelete={actions.deleteTask}
      />
    </div>
  );
}

export default TodayPage;
