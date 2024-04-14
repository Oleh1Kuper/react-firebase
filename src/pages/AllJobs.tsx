import { MdDeleteOutline } from 'react-icons/md';
import React from 'react';
import { Box, Button, Flex } from '@radix-ui/themes';
import PageTitle from '../components/PageTitle';
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import { DocumentData } from 'firebase/firestore';
import usePostedJobs from '../hooks/usePostedJobs';
import { jobColumns } from '../constants';

const AllJobs = () => {
  const { removeJob, jobs, isLoad, changeJobStatus } = usePostedJobs();

  const columnsToRender = [
    ...jobColumns,
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_: any, record: DocumentData) => (
        <Flex gap="4" align="center">
          <MdDeleteOutline
            onClick={removeJob(record.id)}
            className="cursor-pointer"
            size={20}
          />

          <Button
            onClick={changeJobStatus(
              record,
              record.status === 'aproved' ? 'rejected' : 'aproved',
            )}
            className="cursor-pointer underline"
            variant="ghost"
            color="gray"
            loading={isLoad}
          >
            {record.status === 'aproved' ? 'Reject' : 'Aprove'}
          </Button>
        </Flex>
      ),
    },
  ];

  return (
    <Box>
      <Flex justify="between" align="center" mb="2">
        <PageTitle title="All jobs" />
        <Button
          size="3"
          radius="none"
          className="uppercase"
          type="button"
          color="gray"
          variant="outline"
          highContrast
        >
          <Link
            className="flex h-full w-full items-center"
            to="/posted-jobs/new"
          >
            New job
          </Link>
        </Button>
      </Flex>

      {jobs && (
        <Table columns={columnsToRender} rowKey="id" dataSource={jobs} />
      )}
    </Box>
  );
};

export default AllJobs;
