import { Flex, Heading, Text } from '@radix-ui/themes';
import { DocumentData } from 'firebase/firestore';
import React from 'react';

type Props = {
  job: DocumentData;
};

const CardJob: React.FC<Props> = ({ job }) => {
  return (
    <>
      <Heading as="h3" className="font-normal">
        {job.title}
      </Heading>
      <hr className="m-2 mx-auto w-full" />

      <Flex direction="column" gap="2">
        <Flex justify="between">
          <Text>Company</Text>
          <Text>{job.company}</Text>
        </Flex>
        <Flex justify="between">
          <Text>Experience</Text>
          <Text>{job.experience}</Text>
        </Flex>
        <Flex justify="between">
          <Text>Location</Text>
          <Text className="uppercase">{job.location}</Text>
        </Flex>
        <Flex justify="between">
          <Text>Job type</Text>
          <Text className="uppercase">{job.jobType}</Text>
        </Flex>
        <Flex justify="between">
          <Text>Industry</Text>
          <Text className="uppercase">{job.industry}</Text>
        </Flex>
        <Flex justify="between">
          <Text>Salary</Text>
          <Text>{job.salary}</Text>
        </Flex>
        <Flex justify="between">
          <Text>Posted On</Text>
          <Text>{job.postedOn}</Text>
        </Flex>
        <Flex justify="between">
          <Text>Last Date To Apply</Text>
          <Text>{job.lastDateToApply}</Text>
        </Flex>
        <Flex justify="between">
          <Text>Posted by</Text>
          <Text>{job.userName}</Text>
        </Flex>
      </Flex>
    </>
  );
};

export default CardJob;
