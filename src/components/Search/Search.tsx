import IconSystem from '@local/components/IconSystem/IconSystem';
import Input from '@local/components/Input/Input';
import React from 'react';

interface Props {
  [prop: string]: any;
}

function Search({ ...rest }: Props) {
  return (
    <div {...rest}>
      <label htmlFor="search">
        <IconSystem name="search" size={20} />
      </label>
      <Input id="search" type="search" placeholder="Search..." />
    </div>
  );
}

export default Search;
