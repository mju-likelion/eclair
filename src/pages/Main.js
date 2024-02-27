import styled from 'styled-components';
import { Axios } from '../api/Axios';
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';

// 인스턴스 재생산을 방지하여 효율성을 높임
const cookies = new Cookies();

const Main = () => {
  const navigate = useNavigate();
  // const isLogin = cookies.get('accessToken');
  // console.log(isLogin);

  const onClick = async () => {
    try {
      const response = await Axios.post('/auth/logout');
      const statusCode = response.data.statusCode;

      if (statusCode === '200') {
        alert('로그아웃 됐습니다');
        navigate('/login');
      }
    } catch {
      alert('로그아웃 실패');
    }
  };

  return (
    <>
      <LogoutButton
        onClick={() => {
          onClick();
        }}
      >
        로그아웃
      </LogoutButton>
    </>
  );
};

const LogoutButton = styled.button`
  border-radius: 8px;
`;

export default Main;
