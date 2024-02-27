import styled from 'styled-components';
import { Axios } from '../api/Axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LogIn = () => {
  const navigate = useNavigate();
  const [managerId, setManagerId] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log({ managerId, password });
    try {
      const response = await Axios.post('/auth/login', {
        managerId: managerId,
        password: password,
      });

      console.log(response);
      const statusCode = response.data.statusCode;
      console.log(statusCode);
      if (statusCode === '200') {
        console.log(statusCode);
        navigate('/');
      }
    } catch (error) {
      alert('오류발생');
      console.log(error);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleFormSubmit}>
        로그인
        <IdInput
          value={managerId}
          onChange={(e) => setManagerId(e.target.value)}
        />
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">로그인</button>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const IdInput = styled.input`
  display: block;
  border: 1px solid #db627b;
  border-radius: 8px;
`;

const PasswordInput = styled.input`
  display: block;
  border: 1px solid #db627b;
  border-radius: 8px;
`;

export default LogIn;
