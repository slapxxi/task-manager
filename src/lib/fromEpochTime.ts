import affect from '@lib/affect';
import { EpochTime } from '@local/types';

function fromEpochTime(time: EpochTime): Date {
  return affect(new Date(0), (d) => d.setUTCMilliseconds(time));
}

export default fromEpochTime;
