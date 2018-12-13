import pickBy from 'lodash-es/pickBy';

function removeNullableProperties(obj: object): object {
  return pickBy(obj, (value) => value !== undefined && value !== null);
}

export default removeNullableProperties;
