import { Box, Flex, Text } from '@radix-ui/themes';
import React, { useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { BiLogOut } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { BsReverseListColumnsReverse } from 'react-icons/bs';
import { HiClipboardList } from 'react-icons/hi';
import { FaUserCircle } from 'react-icons/fa';
import { AiFillHome } from 'react-icons/ai';
import { ToastContainer } from 'react-toastify';

const Layout = () => {
  const user = JSON.parse(localStorage.getItem('user')!);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, []);

  const userMenuList = [
    {
      title: 'Home',
      icon: <AiFillHome />,
      path: '/',
    },
    {
      title: 'Applied Jobs',
      icon: <HiClipboardList />,
      path: '/apply-job',
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

  return (
    <Flex className="gap-2 sm:gap-5" p={{ initial: '2', sm: '4' }}>
      <Flex
        align="center"
        justify="center"
        className="height-full rounded-md bg-[#171717] p-2 text-white"
      >
        <ul className="flex flex-col gap-5">
          {userMenuList.map(({ title, path, icon }) => (
            <li
              key={title}
              className={`rounded-md p-2 ${pathname === path && 'bg-[#3c3c3c]'}`}
            >
              <Link className="flex items-center gap-2" to={path}>
                {icon}
                <span className="hidden md:block">{title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Flex>

      <Flex direction="column" className="flex-1 gap-2 sm:gap-5">
        <Flex
          justify="between"
          className="rounded-md bg-[#171717] p-4 text-white"
        >
          <Text size="7">Job platform</Text>
          <Flex gap="2" align="center">
            {user.name}
            <FaUserCircle />
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
