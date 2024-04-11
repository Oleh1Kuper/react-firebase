import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const user = JSON.parse(localStorage.getItem('user')!);
  // const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, []);

  return (
    // <Flex className="gap-2 sm:gap-5" p={{ initial: '2', sm: '4' }}>
    //   <Flex
    //     align="center"
    //     justify="center"
    //     className="height-full rounded-md bg-[#171717] p-2 text-white"
    //   >
    //     <ul className="flex flex-col gap-5">
    //       {userMenuList.map(({ title, path, icon }) => (
    //         <li
    //           key={title}
    //           className={`rounded-md p-2 ${pathname === path && 'bg-[#3c3c3c]'}`}
    //         >
    //           <Link className="flex items-center gap-2" to={path}>
    //             {icon}
    //             <span className="hidden md:block">{title}</span>
    //           </Link>
    //         </li>
    //       ))}
    //     </ul>
    //   </Flex>

    //   <Flex direction="column" className="flex-1 gap-2 sm:gap-5">
    //     <Flex
    //       justify="between"
    //       className="rounded-md bg-[#171717] p-4 text-white"
    //     >
    //       <Text size="7">Job platform</Text>
    //       <Flex gap="2" align="center">
    //         {user.name}
    //         <FaUserCircle />
    //       </Flex>
    //     </Flex>
    //     <Box className="rounded-md border border-gray-300 p-4">{<Outlet />}</Box>
    //   </Flex>
    // </Flex>
    <h1>home</h1>
  );
};

export default HomePage;
