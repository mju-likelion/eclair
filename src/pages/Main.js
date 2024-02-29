import styled from 'styled-components';
import { Axios } from '../api/Axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getApplication } from '../api/getApplication';

const Main = ({ setIsLoggedin }) => {
  const navigate = useNavigate();

  const [applicationData, setApplicationData] = useState([]);
  const [titleList, setTitleList] = useState([]);
  const [onlyPass, setOnlyPass] = useState(false);
  const [currentPart, setCurrentPart] = useState('web');
  const [currentPageNumber, setcurrentPageNumber] = useState(1);
  const [isPassed, setIsPassed] = useState(Array(10).fill(undefined));

  const onClick = async () => {
    try {
      const response = await Axios.post('/auth/logout');
      const statusCode = response.data.statusCode;

      if (statusCode === '200') {
        setIsLoggedin(false);
        alert('로그아웃 됐습니다');
        navigate('/login');
      }
    } catch {
      alert('로그아웃 실패');
    }
  };

  const togglePass = (index, state) => {
    setIsPassed((prevstate) => {
      const newState = [...prevstate];
      newState[index] = state;
      return newState;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const applicationData = await getApplication(
        currentPart,
        currentPageNumber,
        onlyPass,
      );
      setApplicationData(applicationData);
      setTitleList(Object.keys(applicationData?.applications[0]));
    };
    fetchData();
  }, [onlyPass, currentPart, currentPageNumber]);

  useEffect(() => {
    const setIsPassValues = () => {
      const isPassedStates =
        applicationData?.applications?.map((app) => app.isPass) || [];
      setIsPassed(isPassedStates);
    };
    setIsPassValues();
  }, [applicationData]);

  function renderButtons(totalPageNumber) {
    const buttons = [];
    for (let i = 0; i < totalPageNumber; i++) {
      buttons.push(
        <PageButton
          key={i}
          $pageNumber={i + 1}
          $currentPageNumber={currentPageNumber}
          onClick={() => setcurrentPageNumber(i + 1)}
        >
          {i + 1}
        </PageButton>,
      );
    }
    return buttons;
  }

  return (
    <div>
      <LogoutButton
        onClick={() => {
          onClick();
        }}
      >
        로그아웃
      </LogoutButton>
      <ButtonBox>
        <PassButton
          $onlyPass={onlyPass}
          onClick={() => {
            setOnlyPass((prev) => !prev);
            setcurrentPageNumber(1);
          }}
        >
          {onlyPass ? '합격자 지원서' : '전체 지원서'}
        </PassButton>
        <Button
          onClick={() => {
            setCurrentPart('web');
            setcurrentPageNumber(1);
          }}
          $part="web"
          $curpart={currentPart}
        >
          Web
        </Button>
        <Button
          onClick={() => {
            setCurrentPart('server');
            setcurrentPageNumber(1);
          }}
          $part="server"
          $curpart={currentPart}
        >
          Server
        </Button>
      </ButtonBox>
      {applicationData && (
        <ContentContainer border="1">
          <Title $onlyPass={onlyPass}>
            {titleList.map((t) => (
              // eslint-disable-next-line react/jsx-key
              <th key={t}>{t}</th>
            ))}
            <th>자기소개서</th>
            <th>합/불</th>
          </Title>
          <>
            {applicationData?.applications?.map((application, index) => (
              <>
                <Application key={application.id}>
                  <Id>{application.id}</Id>
                  <Content>{application.name}</Content>
                  <Content>{application.studentId}</Content>
                  <Content>{application.phoneNumber}</Content>
                  <Content>{application.part}</Content>
                  <Content>{application.major}</Content>
                  <Content>
                    {`${application.createdAt.slice(2, 10)}\n(${application.createdAt.slice(11, 19)})`}
                  </Content>
                  <Content>
                    <Link
                      href={application.link}
                      target={currentPart === 'web' ? '_self' : '_blank'}
                    >
                      {currentPart === 'web' ? '과제 링크' : '깃허브 링크'}
                    </Link>
                  </Content>
                  <Result $isPassed={application.isPass}>
                    {String(application.isPass)}
                  </Result>
                  <Content>
                    <GoApplicationBtn
                      href={application.studentId}
                      target="_blank"
                    >
                      보기
                    </GoApplicationBtn>
                  </Content>
                  <Content>
                    <PNPButton
                      $isPassed={isPassed[index]}
                      onClick={() => togglePass(index, true)}
                    >
                      합격
                    </PNPButton>
                    <PNPButton
                      $isPassed={!isPassed[index]}
                      onClick={() => togglePass(index, false)}
                    >
                      불합격
                    </PNPButton>
                  </Content>
                </Application>
              </>
            ))}
          </>
        </ContentContainer>
      )}
      <PageNumberBox>{renderButtons(applicationData?.totalPage)}</PageNumberBox>
    </div>
  );
};

const ContentContainer = styled.table`
  width: 100%;
`;
const ButtonBox = styled.div`
  display: flex;
  justify-content: end;
  & > button {
    margin: 20px 10px;
    padding: 20px;
    font-size: 24px;
    border: 1px solid #ccc;
    border-radius: 8px;
    cursor: pointer;
  }
`;
const PassButton = styled.button`
  background-color: ${({ $onlyPass }) => ($onlyPass ? '#aedec4' : 'pink')};
  color: ${({ $onlyPass }) => ($onlyPass === $onlyPass ? 'white' : '#8f8f8f')};
  font-weight: ${({ $onlyPass }) => ($onlyPass ? 'bold' : 500)};
`;
const Button = styled.button`
  background-color: ${({ $part, $curpart }) =>
    $curpart === $part ? 'pink' : '#808080'};
  color: ${({ $part, $curpart }) => ($curpart === $part ? 'white' : '#8f8f8f')};
  font-weight: ${({ $part, $curpart }) => $curpart === $part && 'bold'};
`;
const Title = styled.tr`
  justify-content: space-around;
  background-color: ${({ $onlyPass }) => ($onlyPass ? '#aedec4' : 'pink')};
`;
const Application = styled.tr`
  border: 3px solid #ffffff;
  text-align: center;
`;
const Id = styled.td`
  font-size: 11px;
`;
const Content = styled.td`
  white-space: pre;
`;
const Result = styled.td`
  font-weight: bold;
  color: ${({ $isPassed }) => ($isPassed ? '#aedec4' : 'pink')}};
`;
const GoApplicationBtn = styled.a`
  padding: 4px 8px;
  background-color: #ffeef1;
  color: #ff798d;
  font-weight: bold;
  border: 1px solid #ff798d;
  border-radius: 8px;
  text-decoration: none;
  cursor: pointer;
`;
const Link = styled.a`
  color: #ff798d;
  font-size: 11px;
  text-underline-position: under;
  text-decoration-thickness: 1px;
`;
const PageNumberBox = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 20px;
`;
const PageButton = styled.button`
  background-color: ${({ $pageNumber, $currentPageNumber }) =>
    $pageNumber === $currentPageNumber ? 'pink' : 'white'};
  padding: 10px;
  border: 1px solid
    ${({ $pageNumber, $currentPageNumber }) =>
      $pageNumber === $currentPageNumber ? 'white' : 'pink'};
  color: ${({ $pageNumber, $currentPageNumber }) =>
    $pageNumber === $currentPageNumber ? 'white' : 'pink'};
  border-radius: 8px;
  cursor: pointer;
`;
const PNPButton = styled.button`
  width: 50%;
  height: 40px;
  border: 1px solid #7c7c7c;
  background-color: ${({ $isPassed }) => ($isPassed ? 'pink' : '#ccc')};
  cursor: pointer;
`;
const LogoutButton = styled.button`
  border-radius: 8px;
`;

export default Main;
