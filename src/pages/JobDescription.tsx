import React from 'react';
import { Box, Button, Flex, Grid, Text } from '@radix-ui/themes';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import CardJob from '../components/CardJob';
import PageTitle from '../components/PageTitle';
import Spinner from '../components/Spinner';
import useAppliedJobs from '../hooks/useAppliedJobs';
import useSingleJob from '../hooks/useSingleJob';
import {
  applyJobPost
} from '../services/jobs';

const JobDescription = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { jobData, isLoad, setIsload } = useSingleJob(id!);
  const { isApplied } = useAppliedJobs('jobId', id)

  const onApply = async () => {
    setIsload(true);

    try {
      const response = await applyJobPost(jobData!);

      if (response.success) {
        navigate('/');
      }
    } catch (error) {
      toast.error(`${error}`, { position: 'top-center' });
    } finally {
      setIsload(false);
    }
  };

  return (
    jobData && (
      <>
        <PageTitle title={jobData.title} />
        <Grid columns="2">
          <Box className="col-span-2 border border-gray-300 p-2 md:col-span-1">
            <CardJob job={jobData} />

            <hr className="m-2 mx-auto w-full" />

            <Flex direction="column">
              <Text className="mb-2 text-2xl font-normal">Description</Text>
              <Text className="text-justify">{jobData.jobDescription}</Text>
            </Flex>

            {isApplied && (
              <Box className="mt-2 bg-gray-200 p-4">
                <Text>
                  You have already applied for this job. You can view your
                  application status in the applied jobs section.
                </Text>
              </Box>
            )}

            <Flex gap="3" mt="4">
              {!isApplied && (
                <Button
                  size="3"
                  radius="none"
                  className="w-20 cursor-pointer bg-[#171717] uppercase"
                  disabled={isLoad}
                  onClick={onApply}
                >
                  {isLoad ? <Spinner /> : 'Apply'}
                </Button>
              )}

              <Link className="h-full w-full" to="/">
                <Button
                  size="3"
                  radius="none"
                  className="w-20 cursor-pointer uppercase"
                  color="gray"
                  variant="outline"
                  highContrast
                >
                  Cancel
                </Button>
              </Link>
            </Flex>
          </Box>
        </Grid>
      </>
    )
  );
};

export default JobDescription;
