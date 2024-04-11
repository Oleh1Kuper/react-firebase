import { BiEditAlt } from 'react-icons/bi';
import { MdDeleteOutline } from 'react-icons/md';
import React, { useEffect, useState } from 'react';
import { Box, Button, Flex } from '@radix-ui/themes';
import PageTitle from '../../../components/PageTitle';
import { Link } from 'react-router-dom';
import { deleteJobById, getPostedJobsByUserId } from '../../../services/jobs';
import { toast } from 'react-toastify';
import { Table } from 'antd';
import { DocumentData } from 'firebase/firestore';
import Spinner from '../../../components/Spinner';

const PostedJobs = () => {
  const [jobs, setJobs] = useState<DocumentData[] | null>(null);
  const [isLoad, setIsload] = useState(false);

  const getJobs = async () => {
    const user = JSON.parse(localStorage.getItem('user')!);

    setIsload(true);

    try {
      const response = await getPostedJobsByUserId(user.id);

      if (response.success) {
        setJobs(response.data);
      }
    } catch (error) {
      toast.error(`${error}`, { position: 'top-center' });
    } finally {
      setIsload(false);
    }
  };

  const removeJob = (id: string) => async () => {
    try {
      const response = await deleteJobById(id);

      if (response.success) {
        getJobs();
        toast.success(response.message, { position: 'top-center' });
      }
    } catch (error) {
      toast.error(`${error}`, { position: 'top-center' });
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
    },
    {
      title: 'Posted On',
      dataIndex: 'postedOn',
      key: 'postedOn',
    },
    {
      title: 'Last Date to Apply',
      dataIndex: 'lastDateToApply',
      key: 'lastDateToApply',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, record: DocumentData) => (
        <Flex gap="4">
          <MdDeleteOutline
            onClick={removeJob(record.id)}
            className="cursor-pointer"
            size={20}
          />
          <Link to={`/posted-jobs/edit/${record.id}`}>
            <BiEditAlt className="cursor-pointer" size={20} />
          </Link>
        </Flex>
      ),
    },
  ];

  return (
    <Box>
      <Flex justify="between" align="center" mb="2">
        <PageTitle title="Posted jobs" />
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

      {isLoad && <Spinner />}

      {jobs && (
        <Table
          columns={columns}
          rowKey="id"
          dataSource={jobs}
        />
      )}
    </Box>
  );
};

export default PostedJobs;
