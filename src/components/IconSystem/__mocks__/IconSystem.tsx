import React from 'react';

function mock(props: any) {
  return <div {...props}>icon-{props.name}</div>;
}

export default mock;
