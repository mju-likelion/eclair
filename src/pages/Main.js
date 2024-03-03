import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Main = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Button onClick={() => navigate('/login')}>로그인</Button>;
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
const Button = styled.button`
  margin: 100px auto;
  width: 200px;
  height: 100px;
  display: block;
  font-size: 24px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  border-radius: 25px;
  background-color: pink;
`;
export default Main;
