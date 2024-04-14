import React from 'react';
import { Button, Flex } from '@radix-ui/themes';
import { Modal, Table } from 'antd';
import { DocumentData } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { changeApplicationStatus } from '../services/jobs';

type Props = {
  showAppliedCandidates: boolean;
  setShowAppliedCandidates: React.Dispatch<React.SetStateAction<boolean>>;
  appiledCandidates: DocumentData[] | null;
  reloadData: (id: string) => () => Promise<void>;
};

const AppliedCandidates: React.FC<Props> = ({
  appiledCandidates,
  reloadData,
  setShowAppliedCandidates,
  showAppliedCandidates,
}) => {
  const changeStatus =
    (applicationData: DocumentData, status: string) => async () => {
      try {
        const response = await changeApplicationStatus({
          ...applicationData,
          status,
        });

        if (response.success) {
          reloadData(applicationData.jobId);
          toast.success(`${response.message}`, { position: 'top-center' });
        }
      } catch (error) {
        toast.error(`${error}`, { position: 'top-center' });
      } finally {
        setShowAppliedCandidates(false);
      }
    };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'userName',
      key: 'userName',
      render: (text: string, record: DocumentData) => {
        return (
          <Link className="underline" to={`/profile/${record.userId}`}>
            <Button
              className="cursor-pointer underline"
              variant="ghost"
              color="gray"
            >
              {text}
            </Button>
          </Link>
        );
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
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
      render: (_: any, record: DocumentData) => (
        <Flex gap="4" align="center">
          <Button
            onClick={changeStatus(
              record,
              record.status === 'aproved' ? 'rejected' : 'aproved',
            )}
            className="cursor-pointer underline"
            variant="ghost"
            color="gray"
          >
            {record.status === 'aproved' ? 'Reject' : 'Aprove'}
          </Button>
        </Flex>
      ),
    },
  ];

  return (
    <div>
      <Modal
        title="Applied Candidates"
        open={showAppliedCandidates}
        onCancel={() => setShowAppliedCandidates(false)}
        footer={null}
        width={1000}
      >
        {appiledCandidates && (
          <Table
            pagination={false}
            columns={columns}
            dataSource={appiledCandidates}
            rowKey="id"
          />
        )}
      </Modal>
    </div>
  );
};

export default AppliedCandidates;
