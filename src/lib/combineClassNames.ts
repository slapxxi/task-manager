import uniq from 'lodash-es/uniq';

type ClassName = string | undefined;

function combineClassNames(...classNames: ClassName[]): string {
  return uniq(classNames.filter((n) => n !== undefined)).join(' ');
}

export default combineClassNames;
