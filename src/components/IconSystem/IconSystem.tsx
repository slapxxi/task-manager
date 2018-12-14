import React, { Suspense } from 'react';

type IconName =
  | 'arrow-down'
  | 'arrow-right'
  | 'checkmark'
  | 'arrow-up'
  | 'bars'
  | 'bell'
  | 'book'
  | 'box'
  | 'briefcase'
  | 'cog'
  | 'cross'
  | 'cloud'
  | 'dots'
  | 'flag'
  | 'inbox'
  | 'list'
  | 'logo'
  | 'plus'
  | 'search'
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
  const LazyIcon = loadIcon(name);
  return (
    <Suspense fallback={<Placeholder {...rest} />}>
      <LazyIcon {...rest} />
    </Suspense>
  );
}

function Placeholder(props: { [prop: string]: any }) {
  return (
    <svg
      {...props}
      width={props.size}
      height={props.size}
      viewBox="0 0 10 10"
      fill="none"
      strokeDasharray="2 2"
      stroke="hsl(225, 5%, 80%)"
    >
      <circle cx="5" cy="5" r="4" />
    </svg>
  );
}

function loadIcon(name: IconName) {
  switch (name) {
    case 'checkmark':
      return React.lazy(() =>
        import(/*webpackChunkName: 'checkmark-icon' */ './CheckmarkIcon'),
      );
    case 'dots':
      return React.lazy(() => import(/*webpackChunkName: 'dots-icon' */ './DotsIcon'));
    case 'arrow-down':
      return React.lazy(() =>
        import(/*webpackChunkName: 'arrow-down-icon' */ './ArrowDownIcon'),
      );
    case 'arrow-up':
      return React.lazy(() =>
        import(/*webpackChunkName: 'arrow-up-icon' */ './ArrowUpIcon'),
      );
    case 'arrow-right':
      return React.lazy(() =>
        import(/*webpackChunkName: 'arrow-right-icon' */ './ArrowRightIcon'),
      );
    case 'bell':
      return React.lazy(() => import(/*webpackChunkName: 'bell-icon' */ './BellIcon'));
    case 'cog':
      return React.lazy(() => import(/*webpackChunkName: 'cog-icon' */ './CogIcon'));
    case 'cloud':
      return React.lazy(() => import(/*webpackChunkName: 'cog-icon' */ './CloudIcon'));
    case 'inbox':
      return React.lazy(() => import(/*webpackChunkName: 'inbox-icon' */ './InboxIcon'));
    case 'plus':
      return React.lazy(() => import(/*webpackChunkName: 'plus-icon' */ './PlusIcon'));
    case 'logo':
      return React.lazy(() => import(/*webpackChunkName: 'logo-icon' */ './LogoIcon'));
    case 'star':
      return React.lazy(() => import(/*webpackChunkName: 'star-icon' */ './StarIcon'));
    case 'search':
      return React.lazy(() =>
        import(/*webpackChunkName: 'search-icon' */ './SearchIcon'),
      );
    case 'flag':
      return React.lazy(() => import(/*webpackChunkName: 'flag-icon' */ './FlagIcon'));
    case 'tag':
      return React.lazy(() => import(/*webpackChunkName: 'tag-icon' */ './TagIcon'));
    case 'list':
      return React.lazy(() => import(/*webpackChunkName: 'list-icon' */ './ListIcon'));
    case 'trashbin':
      return React.lazy(() =>
        import(/*webpackChunkName: 'trashbin-icon' */ './TrashbinIcon'),
      );
    default:
      return Placeholder;
  }
}

export default React.memo(
  IconSystem,
  (prevProps, nextProps) => prevProps.name === nextProps.name,
);
