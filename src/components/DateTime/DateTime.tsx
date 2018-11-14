import React from 'react';

interface Props {
  date: Date;
}

function DateTime({ date }: Props) {
  return <time>{date.toLocaleDateString('en')}</time>;
}

export default DateTime;
