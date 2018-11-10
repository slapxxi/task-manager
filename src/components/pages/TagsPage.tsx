import TagsEditor from '@local/components/Tags/TagsEditor';
import { useStore } from '@local/hooks';
import React from 'react';

function TagsPage() {
  const { tags } = useStore();
  return (
    <div>
      <h1>Tags</h1>
      <TagsEditor tags={tags} />
    </div>
  );
}

export default TagsPage;
