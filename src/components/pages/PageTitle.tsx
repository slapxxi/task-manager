import React from 'react';

interface Props {
  children: React.ReactNode;
  [prop: string]: any;
}

function PageTitle({ children, ...rest }: Props) {
  return <h1 {...rest}>{children}</h1>;
}

export default PageTitle;
