import { EpochTime } from '@local/types';

function fromEpochTime(time: EpochTime): Date {
  const result = new Date(0);
  result.setUTCMilliseconds(time);
  return result;
}

export default fromEpochTime;
