import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../api/postLogin';
import { getApplication } from '../api/getApplication';

const Main = () => {
  const navigate = useNavigate();

  const [applicationData, setApplicationData] = useState([]);
  const [titleList, setTitleList] = useState([]);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [currentPart, setCurrentPart] = useState('web');
  const [currentPageNumber, setcurrentPageNumber] = useState(1);

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

  useEffect(() => {
    const login = async () => {
      const loginStatusCode = await postLogin();
      console.log(loginStatusCode);
      setIsLoggedin(loginStatusCode === '200');
    };
    login();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (isLoggedin) {
        const applicationData = await getApplication(
          currentPart,
          currentPageNumber,
        );
        setApplicationData(applicationData);
        setTitleList(Object.keys(applicationData?.applications[0]));
      }
    };
    fetchData();
  }, [isLoggedin, currentPart, currentPageNumber]);

  return (
    <div>
      <ButtonBox>
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
          <Title>
            {titleList.map((t) => (
              // eslint-disable-next-line react/jsx-key
              <th>{t}</th>
            ))}
            <th>자기소개서</th>
          </Title>
          <>
            {applicationData?.applications?.map((application) => (
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
                      {application.link}
                    </Link>
                  </Content>
                  <Content>
                    <GoApplicationBtn
                      onClick={() => navigate(`/${application.studentId}`)}
                    >
                      보기
                    </GoApplicationBtn>
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
`;
const Button = styled.button`
  margin: 20px 10px;
  padding: 20px;
  font-size: 24px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: ${({ $part, $curpart }) =>
    $curpart === $part ? 'pink' : '#808080'};
  color: ${({ $part, $curpart }) => ($curpart === $part ? 'white' : '#575757')};
  font-weight: ${({ $part, $curpart }) => $curpart === $part && 'bold'};
  cursor: pointer;
`;
const Title = styled.tr`
  justify-content: space-around;
  background-color: pink;
`;
const Application = styled.tr`
  border: 3px solid #ffffff;
`;
const Id = styled.td`
  font-size: 11px;
`;
const Content = styled.td`
  white-space: pre;
  text-align: center;
`;
const GoApplicationBtn = styled.button`
  background-color: #ffeef1;
  font-weight: bold;
  color: #ff798d;
  border: 1px solid #ff798d;
  border-radius: 8px;
  cursor: pointer;
`;
const Link = styled.a`
  color: #ff798d;
  font-size: 11px;
  text-align: start;
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
export default Main;
