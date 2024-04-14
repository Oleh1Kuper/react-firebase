import React, { useState } from 'react';
import PageTitle from '../components/PageTitle';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { actions } from '../features/notifications';
import { Alert, Tabs } from 'antd';
import { Button, Flex } from '@radix-ui/themes';
import { changeNotificationStatus } from '../services/userProfile';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const NotificationsPage = () => {
  const { readNotifications, unreadNotifications } = useAppSelector(
    (state) => state.notifications,
  );
  const dispatch = useAppDispatch();
  const [isLoad, setIsload] = useState(false);
  const [clickedNotificationId, setClickedNotificationId] = useState('');

  const changeStatus = async (id: string, status: string) => {
    setIsload(true);
    setClickedNotificationId(id);

    try {
      const response = await changeNotificationStatus(id, status);

      if (response.success) {
        toast.success(response.message, { position: 'top-center' });
        dispatch(actions.setReloadNotifications(true));
      }
    } catch (error) {
      toast.error(`${error}`, { position: 'top-center' });
    } finally {
      setIsload(false);
    }
  };

  return (
    <div>
      <PageTitle title="Notifications" />
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            key: '1',
            label: 'Unread',
            children: (
              <Flex direction="column" gap="3">
                {unreadNotifications.map((notification, i) => (
                  <Alert
                    key={i + 1}
                    message={
                      <div className="flex justify-between">
                        <Link to={notification.path}>
                          <div className="flex flex-col gap-1">
                            <span>{notification.title}</span>
                            <span>{notification.createdAt}</span>
                          </div>
                        </Link>
                        <Button
                          loading={
                            isLoad && notification.id === clickedNotificationId
                          }
                          className="cursor-pointer underline"
                          variant="ghost"
                          color="gray"
                          onClick={() => changeStatus(notification.id, 'read')}
                        >
                          Mark as read
                        </Button>
                      </div>
                    }
                  />
                ))}
              </Flex>
            ),
          },
          {
            key: '2',
            label: 'Read',
            children: (
              <Flex direction="column" gap="2">
                {readNotifications.map((notification, i) => (
                  <Alert
                    key={i + 1}
                    message={
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <span>{notification.title}</span>
                          <span>{notification.createdAt}</span>
                        </div>
                        <span
                          className="underline"
                          onClick={() =>
                            changeStatus(notification.id, 'unread')
                          }
                        >
                          Mark as unread
                        </span>
                      </div>
                    }
                  />
                ))}
              </Flex>
            ),
          },
        ]}
      />
    </div>
  );
};

export default NotificationsPage;
