import React from 'react';
import { Box, Grid } from '@radix-ui/themes';
import { Form, Input } from 'antd';

const PersonalInfo = () => {
  return (
    <Grid columns="3" gap="4">
      <Box className="col-span-3 md:col-span-1">
        <Form.Item
          required
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: 'First name is required' }]}
        >
          <Input className="rounded-none" placeholder="First Name" />
        </Form.Item>
      </Box>

      <Box className="col-span-3 md:col-span-1">
        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: 'Last name is required' }]}
        >
          <Input className="rounded-none" placeholder="Last Name" />
        </Form.Item>
      </Box>

      <Box className="col-span-3 md:col-span-1">
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Invalid email',
              pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            },
          ]}
        >
          <Input className="rounded-none" placeholder="Email" />
        </Form.Item>
      </Box>

      <Box className="col-span-3 md:col-span-1">
        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[
            {
              required: true,
              message: 'Invalid phone number',
              pattern: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
            },
          ]}
        >
          <Input className="rounded-none" placeholder="Phone Number" />
        </Form.Item>
      </Box>

      <Box className="col-span-3 md:col-span-1">
        <Form.Item
          label="Portfolio"
          name="portfolio"
          rules={[{ required: true, message: 'Portfolio is required' }]}
        >
          <Input className="rounded-none" placeholder="Portfolio" />
        </Form.Item>
      </Box>

      <Box className="col-span-3">
        <Form.Item
          label="Carrier Objective"
          name="carrierObjective"
          rules={[{ required: true, message: 'Carrier Objective is required' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
      </Box>

      <Box className="col-span-3">
        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: 'Address is required' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
      </Box>
    </Grid>
  );
};

export default PersonalInfo;
