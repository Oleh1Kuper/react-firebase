import { Heading } from '@radix-ui/themes';
import React from 'react';

type Props = {
  title: string;
};

const PageTitle: React.FC<Props> = ({ title }) => {
  return (
    <div>
      <Heading as="h2" className="font-normal uppercase">{title}</Heading>
      <hr className="m-2 mx-auto w-full" />
    </div>
  );
};

export default PageTitle;
