import React, { useEffect } from 'react';
import { Box, Heading } from '@radix-ui/themes';
import Form from '../components/Form';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const user = JSON.parse(localStorage.getItem('user')!);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // navigate('/');
    }
  }, []);

  return (
    <Box className="container-page">
      <Box className="w-[350px] bg-white p-6">
        <Heading className="text-4xl font-normal">Job portal</Heading>

        <hr className="m-4 mx-auto w-full" />

        <Form />
      </Box>
    </Box>
  );
};

export default Login;
