import React, { useEffect, useState } from 'react';
import PageTitle from '../../../components/PageTitle';
import { Box, Button, Tabs } from '@radix-ui/themes';
import PersonalInfo from './PersonalInfo';
import Education from './Education';
import Experience from './Experience';
import Form from 'antd/es/form/Form';
import {
  getUserProfile,
  updateUserProfile,
} from '../../../services/userProfile';
import { UserProfile } from 'firebase/auth';
import { toast } from 'react-toastify';
import Spinner from '../../../components/Spinner';
import { Flex } from 'antd';

const Profile = () => {
  const [isLoad, setIsload] = useState(false);
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const onfinish = async (data: any) => {
    setIsload(true);

    try {
      const response = await updateUserProfile(data);

      if (response.success) {
        toast.success(`${response.message}`, { position: 'top-center' });
      }
    } catch (error) {
      toast.error(`${error}`, { position: 'top-center' });
    } finally {
      setIsload(false);
    }
  };

  const fetchUser = async () => {
    const user = JSON.parse(localStorage.getItem('user')!);

    try {
      const response = await getUserProfile(user.id);

      if (response.success) {
        toast.success(`${response.message}`, { position: 'top-center' });
        setUserData(response.data);
      }
    } catch (error) {
      toast.error(`${error}`, { position: 'top-center' });
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <PageTitle title="Profile" />
      <Tabs.Root defaultValue="personalInfo">
        <Tabs.List color="gray">
          <Tabs.Trigger value="personalInfo">Personal info</Tabs.Trigger>
          <Tabs.Trigger value="education">Education</Tabs.Trigger>
          <Tabs.Trigger value="experience">Experience</Tabs.Trigger>
        </Tabs.List>

        <Box pt="3">
          {userData && (
            <Form
              onFinish={onfinish}
              layout="vertical"
              initialValues={userData}
            >
              <Tabs.Content value="personalInfo">
                <PersonalInfo />
              </Tabs.Content>

              <Tabs.Content value="education">
                <Education />
              </Tabs.Content>

              <Tabs.Content value="experience">
                <Experience />
              </Tabs.Content>

              <Flex gap={10}>
                <Button
                  size="3"
                  radius="none"
                  className="w-20 cursor-pointer bg-[#171717] uppercase"
                  type="submit"
                  disabled={isLoad}
                >
                  {isLoad ? <Spinner /> : 'Submit'}
                </Button>

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
              </Flex>
            </Form>
          )}
        </Box>
      </Tabs.Root>
    </>
  );
};

export default Profile;
