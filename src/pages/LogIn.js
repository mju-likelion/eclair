import { Axios } from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LogIn = () => {
  const navigate = useNavigate();
  const [managerId, setManagerId] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = async (event) => {
    console.log({ managerId, password });
    try {
      const response = await Axios.post('/auth/login', {
        managerId: managerId,
        password: password,
      });
      console.log(event);
      const statusCode = response.data.statusCode;
      if (statusCode === '200') {
        navigate('/main');
        console.log('/main');
      }
    } catch (error) {
      alert('오류발생');
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      로그인
      <input value={managerId} onChange={(e) => setManagerId(e.target.value)} />
      <input value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">로그인</button>
    </form>
  );
};

export default LogIn;
