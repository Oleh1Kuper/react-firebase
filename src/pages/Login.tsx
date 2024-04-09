import React from 'react';
import { Box, Heading } from '@radix-ui/themes';
import Form from '../components/Form';

const Login = () => {
  return (
    <Box className="w-[350px] bg-white p-6">
      <Heading className="text-4xl font-normal">Job portal</Heading>

      <hr className="m-4 mx-auto w-full" />

      <Form />
    </Box>
  );
};

export default Login;
