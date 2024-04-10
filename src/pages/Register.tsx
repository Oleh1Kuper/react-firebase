import React from 'react';
import Form from '../components/Form';
import { Box, Heading } from '@radix-ui/themes';

const Register = () => {
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

export default Register;
