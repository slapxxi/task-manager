import Button from '@local/components/Button/Button';
import IconSystem from '@local/components/IconSystem/IconSystem';
import React from 'react';

interface Props {
  [prop: string]: any;
}

function Search({ ...rest }: Props) {
  return (
    <div {...rest}>
      <Button>
        <IconSystem name="search" size={20} />
      </Button>
    </div>
  );
}

export default Search;
