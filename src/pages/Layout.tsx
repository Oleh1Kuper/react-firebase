import { RiNotification4Fill } from 'react-icons/ri';
import { Box, Flex, Text } from '@radix-ui/themes';
import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { BiLogOut } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { BsReverseListColumnsReverse } from 'react-icons/bs';
import { HiClipboardList } from 'react-icons/hi';
import { FaUserCircle } from 'react-icons/fa';
import { AiFillHome } from 'react-icons/ai';
import { toast, ToastContainer } from 'react-toastify';
import { getUserNofications, getUserProfile } from '../services/userProfile';
import Spinner from '../components/Spinner';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { actions } from '../features/notifications';
import { Badge } from 'antd';

const userMenuList = [
  {
    title: 'Home',
    icon: <AiFillHome />,
    path: '/',
  },
  {
    title: 'Applied Jobs',
    icon: <HiClipboardList />,
    path: '/applied-jobs',
  },
  {
    title: 'Posted Jobs',
    icon: <BsReverseListColumnsReverse />,
    path: '/posted-jobs',
  },
  {
    title: 'Profile',
    icon: <CgProfile />,
    path: '/profile',
  },
  {
    title: 'Logout',
    icon: <BiLogOut />,
    path: '/login',
  },
];

const adminMenu = [
  {
    title: 'Home',
    icon: <AiFillHome />,
    path: '/',
  },
  {
    title: 'Jobs',
    icon: <HiClipboardList />,
    path: '/admin/jobs',
  },
  {
    title: 'Users',
    icon: <CgProfile />,
    path: '/admin/users',
  },
  {
    title: 'Logout',
    icon: <BiLogOut />,
    path: '/login',
  },
];

type MenuType = {
  title: string;
  icon: React.JSX.Element;
  path: string;
};

const Layout = () => {
  const user = JSON.parse(localStorage.getItem('user')!);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [menuToRender, setMenuToRender] = useState<MenuType[] | null>(null);
  const [isLoad, setIsload] = useState(false);
  const dispatch = useAppDispatch();
  const { reloadNotifications, unreadNotifications } = useAppSelector(
    (state) => state.notifications,
  );

  const fetchUser = async () => {
    setIsload(true);

    try {
      const response = await getUserProfile(user.id);

      setMenuToRender(response.data?.isAdmin ? adminMenu : userMenuList);
    } catch (error) {
      toast.error(`${error}`, { position: 'top-center' });
    } finally {
      setIsload(false);
    }
  };

  const loadNotifications = async () => {
    try {
      await getUserNofications();
      dispatch(actions.setReloadNotifications(false));
    } catch (error) {}
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (reloadNotifications) {
      loadNotifications();
    }
  }, [reloadNotifications]);

  const logOut = (title: string) => () => {
    if (title === 'Logout') {
      localStorage.removeItem('user');
    }
  };

  return (
    <Flex className="gap-2 sm:gap-5" p={{ initial: '2', sm: '4' }}>
      <Flex
        align="center"
        justify="center"
        className="height-full rounded-md bg-[#171717] p-2 text-white"
      >
        {isLoad ? (
          <div className="p-9">
            <Spinner />
          </div>
        ) : (
          <ul className="flex flex-col gap-5">
            {menuToRender?.map(({ title, path, icon }) => (
              <li
                key={title}
                className={`rounded-md p-2 ${pathname === path && 'bg-[#3c3c3c]'}`}
                onClick={logOut(title)}
              >
                <Link
                  className="flex items-center gap-2"
                  to={title === 'Profile' ? `${path}/${user.id}` : path}
                >
                  {icon}
                  <span className="hidden md:block">{title}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Flex>

      <Flex direction="column" className="flex-1 gap-2 sm:gap-5">
        <Flex
          justify="between"
          className="rounded-md bg-[#171717] p-4 text-white"
        >
          <Text size="7">Job platform</Text>
          <Flex gap="2" align="center">
            {user?.name}
            <FaUserCircle />

            <Link to="/notifications">
              <Badge size="small" count={unreadNotifications.length}>
                <RiNotification4Fill color="white" />
              </Badge>
            </Link>
          </Flex>
        </Flex>
        <Box className="h-[83vh] overflow-auto rounded-md border border-gray-300 p-4">
          <ToastContainer />
          <Outlet />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Layout;
