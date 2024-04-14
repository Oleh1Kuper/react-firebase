import { Box, Button, Grid } from '@radix-ui/themes';
import { DocumentData } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CardJob from '../components/CardJob';
import { getAllJobs } from '../services/jobs';

const HomePage = () => {
  const user = JSON.parse(localStorage.getItem('user')!);
  const navigate = useNavigate();
  const [data, setData] = useState<DocumentData[] | null>(null);

  const getData = async () => {
    try {
      const response = await getAllJobs();

      console.log(response.data);

      const approvedJobs = response.data?.filter(
        (item) => item.status === 'aproved',
      );

      setData(approvedJobs || null);
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, []);

  return (
    <Grid gap="4" columns="6">
      {data?.map((job) => (
        <Box
          key={job.id}
          className="col-span-6 border border-gray-300 p-2 md:col-span-3 lg:col-span-2"
        >
          <CardJob job={job} />

          <Link to={`/job-description/${job.id}`}>
            <Button
              size="3"
              radius="none"
              className="mt-4 w-full cursor-pointer uppercase"
              type="button"
              color="gray"
              variant="outline"
              highContrast
            >
              Apply Now
            </Button>
          </Link>
        </Box>
      ))}
    </Grid>
  );
};

export default HomePage;
