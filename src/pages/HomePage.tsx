import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const user = JSON.parse(localStorage.getItem('user')!);
  const navigate = useNavigate();

  console.log(user);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, []);

  return <div>HomePage</div>;
};

export default HomePage;
