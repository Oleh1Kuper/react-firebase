import React, { useEffect, useState } from 'react';
import { Box, Button, Flex } from '@radix-ui/themes';
import PageTitle from '../components/PageTitle';
import { Table } from 'antd';
import { DocumentData } from 'firebase/firestore';
import { userColumns } from '../constants';
import { toast } from 'react-toastify';
import { getAllUsers, updateUserProfile } from '../services/userProfile';

const AllJobs = () => {
  const [users, setUsers] = useState<DocumentData[] | null>(null);
  const [isLoad, setIsload] = useState(false);

  const getUsers = async () => {
    setIsload(true);

    try {
      const response = await getAllUsers();

      if (response.success) {
        setUsers(response.data);
      }
    } catch (error) {
      toast.error(`${error}`, { position: 'top-center' });
    } finally {
      setIsload(false);
    }
  };

  const changeJobStatus = (id: string, status: string) => async () => {
    try {
      const response = await updateUserProfile({ id, status });

      if (response.success) {
        getUsers();
        toast.success(`${response.message}`, { position: 'top-center' });
      }
    } catch (error) {
      toast.error(`${error}`, { position: 'top-center' });
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const columnsToRender = [
    ...userColumns,
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_: any, record: DocumentData) => (
        <Flex gap="4" align="center">
          <Button
            onClick={changeJobStatus(
              record.id,
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
        <PageTitle title="All users" />
      </Flex>

      {users && (
        <Table columns={columnsToRender} rowKey="id" dataSource={users} />
      )}
    </Box>
  );
};

export default AllJobs;
