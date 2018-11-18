import Icon from '@local/components/Icon/Icon';
import React, { useEffect, useState } from 'react';

type IconName =
  | 'arrow-down'
  | 'arrow-up'
  | 'book'
  | 'box'
  | 'briefcase'
  | 'cross'
  | 'flag'
  | 'list'
  | 'inbox'
  | 'settings'
  | 'star'
  | 'tag'
  | 'trash'
  | 'trashbin';

interface Props {
  name: IconName;
  [prop: string]: any;
}

function IconSystem({ name, ...rest }: Props) {
  const [glyph, setGlyph] = useState(null);

  useEffect(
    () => {
      const result = loadIcon(name);
      // @ts-ignore
      result.then((module) => setGlyph(module));
    },
    [name],
  );

  if (glyph === null) {
    return <Placeholder {...rest} />;
  }
  return <Icon glyph={glyph} {...rest} />;
}

function Placeholder(props: { [prop: string]: any }) {
  return (
    <svg {...props} viewBox="0 0 10 10" fill="lightgrey">
      <circle cx="5" cy="5" r="5" />
    </svg>
  );
}

async function loadIcon(name: IconName) {
  let result;
  switch (name) {
    case 'trash':
      result = await import(/* webpackChunkName: 'icon-trash' */ '@local/assets/trash.svg');
      break;
    case 'trashbin':
      result = await import(/* webpackChunkName: 'icon-trashbin' */ '@local/assets/trashbin.svg');
      break;
    case 'book':
      result = await import(/* webpackChunkName: 'icon-book' */ '@local/assets/book.svg');
      break;
    case 'list':
      result = await import(/* webpackChunkName: 'icon-list' */ '@local/assets/list.svg');
      break;
    case 'briefcase':
      result = await import(/* webpackChunkName: 'icon-briefcase' */ '@local/assets/briefcase.svg');
      break;
    case 'star':
      result = await import(/* webpackChunkName: 'icon-star' */ '@local/assets/star.svg');
      break;
    case 'tag':
      result = await import(/* webpackChunkName: 'icon-tag' */ '@local/assets/tag.svg');
      break;
    case 'settings':
      result = await import(/* webpackChunkName: 'icon-settings' */ '@local/assets/settings.svg');
      break;
    case 'inbox':
      result = await import(/* webpackChunkName: 'icon-inbox' */ '@local/assets/inbox.svg');
      break;
    case 'box':
      result = await import(/* webpackChunkName: 'icon-box' */ '@local/assets/box.svg');
      break;
    case 'arrow-up':
      result = await import(/* webpackChunkName: 'icon-arrow-up' */ '@local/assets/arrow_up.svg');
      break;
    case 'arrow-down':
      result = await import(/* webpackChunkName: 'icon-arrow-down' */ '@local/assets/arrow_down.svg');
      break;
    case 'cross':
      result = await import(/* webpackChunkName: 'icon-cross' */ '@local/assets/cross.svg');
      break;
    case 'flag':
      result = await import(/* webpackChunkName: 'icon-flag' */ '@local/assets/flag.svg');
      break;
    default:
      return result;
  }
  return result.default;
}

export default IconSystem;
