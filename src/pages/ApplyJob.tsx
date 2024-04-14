import { Box, Flex } from '@radix-ui/themes';
import { Table } from 'antd';
import React from 'react';
import PageTitle from '../components/PageTitle';
import { appliedJobColumns } from '../constants';
import useAppliedJobs from '../hooks/useAppliedJobs';

const ApplyJob = () => {
  const { apliedJobs } = useAppliedJobs('userId');

  return (
    <Box>
      <Flex justify="between" align="center" mb="2">
        <PageTitle title="Applied jobs" />
      </Flex>

      {apliedJobs && (
        <Table
          pagination={false}
          columns={appliedJobColumns}
          rowKey="id"
          dataSource={apliedJobs}
        />
      )}
    </Box>
  );
};

export default ApplyJob;
