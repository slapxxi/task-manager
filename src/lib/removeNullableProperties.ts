import pickBy from 'lodash-es/pickBy';

interface Dictionary {
  [key: string]: any;
}

function removeNullableProperties(obj: Dictionary): Dictionary {
  return pickBy(obj, (value) => value !== undefined && value !== null);
}

export default removeNullableProperties;
