import { MdDeleteOutline } from 'react-icons/md';
import React from 'react';
import { Box, Button, Grid } from '@radix-ui/themes';
import { Form, Input } from 'antd';

const Education = () => {
  return (
    <>
      <Form.List name="education">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Grid key={key} columns="4" gap="4">
                <Box className="col-span-4 md:col-span-1">
                  <Form.Item
                    {...restField}
                    name={[name, 'degree']}
                    label="Degree"
                    rules={[{ required: true, message: 'Degree is required' }]}
                  >
                    <Input className="rounded-none" placeholder="Degree" />
                  </Form.Item>
                </Box>

                <Box className="col-span-4 md:col-span-1">
                  <Form.Item
                    {...restField}
                    name={[name, 'institution']}
                    label="Institution"
                    rules={[{ required: true, message: 'Institution is required' }]}
                  >
                    <Input className="rounded-none" placeholder="Institution" />
                  </Form.Item>
                </Box>

                <Box className="col-span-3 md:col-span-1">
                  <Form.Item
                    {...restField}
                    name={[name, 'percentage']}
                    label="Percentage"
                    rules={[{ required: true, message: 'Percentage is required' }]}
                  >
                    <Input className="rounded-none" placeholder="Percentage" />
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
                Add Education
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Form.List name="skills">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Grid key={key} columns="3" gap="4">
                <Box className="col-span-3 md:col-span-1">
                  <Form.Item
                    {...restField}
                    name={[name, 'technology']}
                    label="Technology"
                    rules={[{ required: true, message: 'Technology is required' }]}
                  >
                    <Input className="rounded-none" placeholder="Degree" />
                  </Form.Item>
                </Box>

                <Box className="col-span-2 md:col-span-1">
                  <Form.Item
                    {...restField}
                    name={[name, 'rating']}
                    label="Rating"
                    rules={[{ required: true, message: 'Rating is required' }]}
                  >
                    <Input
                      className="col-span-1 rounded-none"
                      placeholder="Institution"
                    />
                  </Form.Item>
                </Box>

                <MdDeleteOutline
                  className="self-center"
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
                Add Skill
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </>
  );
};

export default Education;
