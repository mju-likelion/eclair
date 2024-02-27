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
        <SubTitle>로그인</SubTitle>
        <LoginInput
          value={managerId}
          onChange={(e) => setManagerId(e.target.value)}
        />
        <LoginInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <LoginButton type="submit">로그인</LoginButton>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #161515;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
`;

const SubTitle = styled.div`
  display: flex;
  justify-content: center;
  color: white;
  font-size: 24px;
`;

const LoginInput = styled.input`
  display: block;
  border: 1px solid #db627b;
  border-radius: 8px;
  width: 200px;
  height: 30px;
  background-color: transparent;
  color: white;
`;

const LoginButton = styled.button`
  margin-top: 30px;
  border-radius: 8px;
  width: 100px;
  height: 30px;
`;

export default LogIn;
