import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Axios } from '../api/Axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getApplication } from '../api/getApplication';
import { postAssessment } from '../api/postAssessment';

const Main = ({ setIsLoggedin }) => {
  const [applicationData, setApplicationData] = useState([]);
  const [titleList, setTitleList] = useState([]);
  const [isPassed, setIsPassed] = useState(Array(10).fill(undefined));

  const [params] = useSearchParams();
  const navigate = useNavigate();

  const currentPageNumber = Number(params.get('pages')) || 1;
  const currentPart = params.get('parts') || 'web';
  const onlyPass = params.get('onlyPass') === 'true';

  const logout = async () => {
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

  const togglePass = async (index, newState, id) => {
    const response = await postAssessment(newState ? 'approve' : 'reject', id);
    if (response.status === 200) {
      // 기존 applicationData를 복사 후 변경된 index의 isPass에 해당하는 부분을 새로운 값으로 변경한다.
      // 변경된 application을 새로운 applicationData로 반영한다.
      setApplicationData((prevApplicationData) => {
        const updatedApplications = prevApplicationData.applications.map(
          (application, appIndex) => {
            if (appIndex === index) {
              return { ...application, isPass: !application.isPass }; // isPass 값을 반전
            }
            return application;
          },
        );
        return {
          ...prevApplicationData,
          applications: updatedApplications,
        };
      });
    } else {
      alert(response.data.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const applicationData = await getApplication(
        currentPart,
        currentPageNumber,
        onlyPass,
      );
      if (applicationData?.applications[0]) {
        setApplicationData(applicationData);
        setTitleList(Object.keys(applicationData.applications[0]));
      }
    };
    fetchData();
  }, [currentPart, currentPageNumber, onlyPass]);

  useEffect(() => {
    const setIsPassValues = () => {
      const isPassedStates =
        applicationData?.applications?.map((app) => app.isPass) || [];
      setIsPassed(isPassedStates);
    };
    setIsPassValues();
  }, [applicationData]);

  function renderButtons(totalPageNumber) {
    return (
      <PageButtons>
        {Array.from({ length: totalPageNumber }, (_, index) => (
          <PageButton
            $pageNumber={index + 1}
            $currentPageNumber={currentPageNumber}
            onClick={() =>
              navigate(
                `/?pages=${index + 1}&parts=${currentPart}&onlyPass=${onlyPass}`,
              )
            }
            key={index}
          >
            {index + 1}
          </PageButton>
        ))}
      </PageButtons>
    );
  }

  return (
    <div>
      <LogoutButton
        onClick={() => {
          logout();
        }}
      >
        로그아웃
      </LogoutButton>
      <ButtonBox>
        <PassButton
          onClick={() => {
            navigate(`/?pages=1&parts=${currentPart}&onlyPass=true`);
          }}
          $isPass={true}
          $onlyPass={onlyPass}
        >
          합격자 지원서
        </PassButton>
        <PassButton
          onClick={() => {
            navigate(`/?pages=1&parts=${currentPart}&onlyPass=false`);
          }}
          $isPass={false}
          $onlyPass={onlyPass}
        >
          전체 지원서
        </PassButton>
        <Button
          onClick={() => {
            navigate(`/?pages=1&parts=web&onlyPass=${onlyPass}`);
          }}
          $part="web"
          $curpart={currentPart}
        >
          Web
        </Button>
        <Button
          onClick={() => {
            navigate(`/?pages=1&parts=server&onlyPass=${onlyPass}`);
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
                      href={`/introduces?applicationId=${application.id}`}
                      target="_blank"
                    >
                      보기
                    </GoApplicationBtn>
                  </Content>
                  <Content>
                    <PNPButton
                      $isPassed={isPassed[index]}
                      onClick={() => togglePass(index, true, application.id)}
                    >
                      합격
                    </PNPButton>
                    <PNPButton
                      $isPassed={!isPassed[index]}
                      onClick={() => togglePass(index, false, application.id)}
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
  justify-content: space-between;
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
  background-color: ${({ $isPass, $onlyPass }) =>
    $isPass === $onlyPass ? ($isPass ? '#aedec4' : 'pink') : '#ccc'};
  color: ${({ $isPass, $onlyPass }) =>
    $isPass === $onlyPass ? 'white' : '#8f8f8f'};
  font-weight: ${({ $isPass, $onlyPass }) =>
    $isPass === $onlyPass ? 'bold' : 500};
`;
const Button = styled.button`
  background-color: ${({ $part, $curpart }) =>
    $curpart === $part ? 'pink' : '#ccc'};
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
  margin: 4px;
  padding: 4px 8px;
  background-color: #ffeef1;
  color: #ff798d;
  font-weight: bold;
  border: 1px solid #ff798d;
  border-radius: 8px;
  text-decoration: none;
  cursor: pointer;
`;
const PageNumberBox = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 20px;
`;
const PageButtons = styled.div``;
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
