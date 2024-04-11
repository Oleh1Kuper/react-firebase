import React, { useEffect, useState } from 'react';
import PageTitle from '../../../components/PageTitle';
import { Box, Flex, Button, Grid } from '@radix-ui/themes';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Input, Select } from 'antd';
import {
  industryOptions,
  jobOptions,
  locationOptions,
} from '../../../constants';
import Spinner from '../../../components/Spinner';
import { JobType } from '../../../types/jobType';
import {
  addNewJobPost,
  editJobDetails,
  getJobById,
} from '../../../services/jobs';
import { toast } from 'react-toastify';
import { DocumentData } from 'firebase/firestore';

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jobData, setJobData] = useState<DocumentData | null>(null);
  const [isLoad, setIsload] = useState(false);

  const onFinish = async (data: JobType) => {
    setIsload(true);

    try {
      const response = id
        ? await editJobDetails({ ...data, id })
        : await addNewJobPost(data);

      if (response.success) {
        navigate('/posted-jobs');
      } else {
        toast.error(response.message, { position: 'top-center' });
      }
    } catch (error) {
      toast.error(`${error}`, { position: 'top-center' });
    } finally {
      setIsload(false);
    }
  };

  const fetchJobData = async () => {
    try {
      const response = await getJobById(id!);

      if (response.success) {
        setJobData(response.data);
      }
    } catch (error) {
      toast.error(`${error}`, { position: 'top-center' });
    }
  };

  useEffect(() => {
    if (id) {
      fetchJobData();
    }
  }, []);

  return (
    <Box>
      <PageTitle title={id ? 'Update a job post' : 'Add a new job post'} />
      {(jobData || !id) && (
        <Form
          initialValues={{
            industry: '',
            location: '',
            jobType: '',
            ...jobData,
          }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Grid columns="3" gap="4">
            <Box className="col-span-3 md:col-span-1">
              <Form.Item
                required
                label="Title"
                name="title"
                rules={[{ required: true, message: 'Title is required' }]}
              >
                <Input className="rounded-none" placeholder="Title" />
              </Form.Item>
            </Box>

            <Box className="col-span-3 md:col-span-1">
              <Form.Item
                label="Company Name"
                name="company"
                rules={[
                  { required: true, message: 'Company Name is required' },
                ]}
              >
                <Input className="rounded-none" placeholder="Company Name" />
              </Form.Item>
            </Box>

            <Box className="col-span-3 md:col-span-1">
              <Form.Item
                label="Salary"
                name="salary"
                rules={[{ required: true, message: 'Salary is required' }]}
              >
                <Input className="rounded-none" placeholder="Salary" />
              </Form.Item>
            </Box>

            <Box className="col-span-3 md:col-span-1">
              <Form.Item
                label="Last Date To Apply"
                name="lastDateToApply"
                rules={[{ required: true, message: 'Required' }]}
              >
                <Input type="date" className="rounded-none" />
              </Form.Item>
            </Box>

            <Box className="col-span-3 md:col-span-1">
              <Form.Item
                label="Notice Period"
                name="noticePeriod"
                rules={[{ required: true, message: 'Required' }]}
              >
                <Input className="rounded-none" placeholder="Notice Period" />
              </Form.Item>
            </Box>

            <Box className="col-span-3 md:col-span-1">
              <Form.Item
                label="Experience"
                name="experience"
                rules={[{ required: true, message: 'Experience is required' }]}
              >
                <Input className="rounded-none" placeholder="Experience" />
              </Form.Item>
            </Box>

            <Flex className="col-span-3 flex-wrap gap-2 md:col-span-1 md:flex-nowrap md:gap-8">
              <Box>
                <Form.Item
                  label="Industry"
                  name="industry"
                  rules={[{ required: true, message: 'Industry is required' }]}
                >
                  <Select style={{ width: 120 }} options={industryOptions} />
                </Form.Item>
              </Box>

              <Box>
                <Form.Item
                  label="Location"
                  name="location"
                  rules={[{ required: true, message: 'Location is required' }]}
                >
                  <Select style={{ width: 120 }} options={locationOptions} />
                </Form.Item>
              </Box>

              <Box>
                <Form.Item
                  label="Job Type"
                  name="jobType"
                  rules={[
                    {
                      required: true,
                      message: 'Carrier Objective is required',
                    },
                  ]}
                >
                  <Select style={{ width: 120 }} options={jobOptions} />
                </Form.Item>
              </Box>
            </Flex>

            <Box className="col-span-3">
              <Form.Item
                label="Job Description"
                name="jobDescription"
                rules={[
                  { required: true, message: 'Job Description is required' },
                ]}
              >
                <Input.TextArea
                  rows={3}
                  className="rounded-none"
                  placeholder="Job Description"
                />
              </Form.Item>
            </Box>
          </Grid>

          <Flex gap="3">
            <Button
              size="3"
              radius="none"
              className="w-20 cursor-pointer bg-[#171717] uppercase"
              type="submit"
              disabled={isLoad}
            >
              {isLoad ? <Spinner /> : 'Save'}
            </Button>

            <Link className="h-full w-full" to="/posted-jobs">
              <Button
                size="3"
                radius="none"
                className="w-20 cursor-pointer uppercase"
                type="button"
                color="gray"
                variant="outline"
                highContrast
              >
                Cancel
              </Button>
            </Link>
          </Flex>
        </Form>
      )}
    </Box>
  );
};

export default EditJob;
