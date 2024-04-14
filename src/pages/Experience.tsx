import { Box, Button, Grid } from '@radix-ui/themes';
import { Form, Input } from 'antd';
import React from 'react';
import { MdDeleteOutline } from 'react-icons/md';

const Experience = () => {
  return (
    <>
      <Form.List name="experience">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Grid key={key} columns="5" gap="4">
                <Box className="col-span-5 md:col-span-1">
                  <Form.Item
                    {...restField}
                    name={[name, 'company']}
                    label="Company"
                    rules={[{ required: true, message: 'Company is required' }]}
                  >
                    <Input className="rounded-none" placeholder="Company" />
                  </Form.Item>
                </Box>

                <Box className="col-span-5 md:col-span-1">
                  <Form.Item
                    {...restField}
                    name={[name, 'designation']}
                    label="Designation"
                    rules={[{ required: true, message: 'Designation is required' }]}
                  >
                    <Input className="rounded-none" placeholder="Designation" />
                  </Form.Item>
                </Box>

                <Box className="col-span-5 md:col-span-1">
                  <Form.Item
                    {...restField}
                    name={[name, 'duration']}
                    label="Duration"
                    rules={[{ required: true, message: 'Duration is required' }]}
                  >
                    <Input className="rounded-none" placeholder="Duration" />
                  </Form.Item>
                </Box>

                <Box className="col-span-4 md:col-span-1">
                  <Form.Item
                    {...restField}
                    name={[name, 'location']}
                    label="Location"
                    rules={[{ required: true, message: 'Location is required' }]}
                  >
                    <Input className="rounded-none" placeholder="Location" />
                  </Form.Item>
                </Box>

                <MdDeleteOutline
                  className="col-span-1 self-center"
                  onClick={() => remove(name)}
                />
              </Grid>
            ))}
            <Form.Item>
              <Button
                color="gray"
                variant="outline"
                highContrast
                size="3"
                radius="none"
                className="mt-2 cursor-pointer uppercase"
                onClick={() => add()}
              >
                Add experience
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Form.List name="projects">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Grid key={key} columns="5" gap="4">
                <Box className="col-span-5 md:col-span-1">
                  <Form.Item
                    {...restField}
                    name={[name, 'title']}
                    label="Title"
                    rules={[{ required: true, message: 'Title is required' }]}
                  >
                    <Input className="rounded-none" placeholder="Title" />
                  </Form.Item>
                </Box>

                <Box className="col-span-5 md:col-span-1">
                  <Form.Item
                    {...restField}
                    name={[name, 'duration']}
                    label="Duration"
                    rules={[{ required: true, message: 'Duration is required' }]}
                  >
                    <Input className="rounded-none" placeholder="Description" />
                  </Form.Item>
                </Box>

                <Box className="col-span-4 md:col-span-2">
                  <Form.Item
                    {...restField}
                    name={[name, 'description']}
                    label="Description"
                    rules={[{ required: true, message: 'Description is required' }]}
                  >
                    <Input.TextArea className="rounded-none" rows={1} />
                  </Form.Item>
                </Box>

                <MdDeleteOutline
                  className="col-span-1 self-center"
                  onClick={() => remove(name)}
                />
              </Grid>
            ))}
            <Form.Item>
              <Button
                color="gray"
                variant="outline"
                highContrast
                size="3"
                radius="none"
                className="mt-2 cursor-pointer uppercase"
                onClick={() => add()}
              >
                Add project
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </>
  );
};

export default Experience;
