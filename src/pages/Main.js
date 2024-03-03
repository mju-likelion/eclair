import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Main = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/login');
  }, []);

  return <></>;
};
export default Main;
